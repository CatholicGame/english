import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { capturePayPalOrder } from "@/lib/paypal-client";
import {
  getPaypalOrder,
  getSubscription,
  markPaypalOrderPaidOnce,
  setSubscription,
} from "@/lib/subscription-db";
import { withPaidExtended, DEFAULT_SUBSCRIPTION, PRICING_PLANS } from "@/lib/subscription-store";

// The international counterpart of the PayOS webhook — called by the browser
// when PayPal redirects back to /?paypal=success&token=<orderId> after the
// buyer approves. Unlike PayOS (which sends a server-to-server webhook that
// moves the money itself), PayPal only *approves* here — the actual charge
// happens inside THIS call, so granting access is synchronous with the capture.
// Authenticated by our own session cookie (the same browser that started the
// order), and the order's email is checked against the session so nobody else
// can capture it.
export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const paypalOrderId: string | undefined = body?.orderId;
  if (!paypalOrderId) return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });

  const order = await getPaypalOrder(paypalOrderId);
  if (!order) return NextResponse.json({ ok: false, error: "unknown_order" }, { status: 404 });
  if (order.email !== session.user.email) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const completed = await capturePayPalOrder(paypalOrderId);
  if (!completed) {
    // Not a fresh completion (already captured by an earlier attempt, cancelled,
    // expired, ...). If Firestore already shows paid, this is just a benign
    // retry of the return redirect — answer ok so the client can stop polling.
    const alreadyPaid = order.status === "paid";
    return NextResponse.json(
      { ok: alreadyPaid, error: alreadyPaid ? undefined : "capture_failed" },
      { status: alreadyPaid ? 200 : 400 },
    );
  }

  const firstTime = await markPaypalOrderPaidOnce(paypalOrderId);
  if (firstTime) {
    const plan = PRICING_PLANS.find((p) => p.cycle === order.cycle);
    const current = await getSubscription(order.email);
    const updated = withPaidExtended(
      current ?? DEFAULT_SUBSCRIPTION,
      order.cycle,
      `Thanh toán qua PayPal — gói ${plan?.label ?? order.cycle} (order ${paypalOrderId})`,
    );
    await setSubscription(order.email, updated);
  }

  return NextResponse.json({ ok: true });
}
