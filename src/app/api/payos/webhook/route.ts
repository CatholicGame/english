import { NextResponse, type NextRequest } from "next/server";
import { getPayOS } from "@/lib/payos-client";
import { getOrder, getSubscription, markOrderPaidOnce, setSubscription } from "@/lib/subscription-db";
import { withPaidExtended, DEFAULT_SUBSCRIPTION, PRICING_PLANS } from "@/lib/subscription-store";

// PayOS's webhook-URL confirmation flow may probe reachability with a plain
// GET before sending its signed test payload via POST — without this, Next.js
// returns 405 for GET on a POST-only route, which reads as "unreachable".
export async function GET() {
  return NextResponse.json({ ok: true });
}

// No session cookie here — PayOS calls this server-to-server. Authenticity
// comes from the HMAC signature (checksum key), not our auth cookie. See
// docs/subscription-interim-system.md for why entitlement lives in Firestore
// (not the payer's own Drive) specifically so this route can grant it.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });

  let data;
  try {
    data = await getPayOS().webhooks.verify(body);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }

  if (body.success !== true) {
    // Not a successful-payment notification (e.g. payOS's own webhook-URL
    // validation ping) — signature checked out, nothing to grant.
    return NextResponse.json({ ok: true });
  }

  try {
    const orderCode = String(data.orderCode);
    const order = await getOrder(orderCode);
    if (!order) {
      // Unknown order (or from before this system existed) — ack anyway so
      // payOS doesn't retry forever over something we can never resolve.
      return NextResponse.json({ ok: true });
    }

    const firstTime = await markOrderPaidOnce(orderCode);
    if (firstTime) {
      const plan = PRICING_PLANS.find((p) => p.cycle === order.cycle);
      const current = await getSubscription(order.email);
      const updated = withPaidExtended(
        current ?? DEFAULT_SUBSCRIPTION,
        order.cycle,
        `Thanh toán qua PayOS — gói ${plan?.label ?? order.cycle} (orderCode ${orderCode})`,
      );
      await setSubscription(order.email, updated);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Signature already verified above — a failure here is our own
    // Firestore/config problem, not an invalid request. Logged so it shows up
    // in Vercel's function logs instead of surfacing as a bare 500.
    console.error("payos webhook: Firestore step failed", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
