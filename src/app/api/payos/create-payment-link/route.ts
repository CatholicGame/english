import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { getPayOS } from "@/lib/payos-client";
import { createPendingOrder, getOrder } from "@/lib/subscription-db";
import { PRICING_PLANS, type BillingCycle } from "@/lib/subscription-store";
import { appOrigin } from "@/lib/app-url";

// orderCode must be a number PayOS will echo back unchanged in the webhook —
// a ms-epoch timestamp is unique enough in practice, checked against Firestore
// below just in case two requests land in the same millisecond.
async function uniqueOrderCode(): Promise<number> {
  for (let i = 0; i < 5; i++) {
    const candidate = Date.now() + i;
    if (!(await getOrder(String(candidate)))) return candidate;
  }
  throw new Error("Could not allocate a unique PayOS orderCode");
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const cycle: BillingCycle | undefined = body?.cycle;
  const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
  if (!plan) return NextResponse.json({ ok: false, error: "invalid_cycle" }, { status: 400 });

  const orderCode = await uniqueOrderCode();
  // Description is capped at 9 chars by PayOS for non-linked bank accounts, so
  // it's just an opaque reference — the real email/plan mapping lives in
  // Firestore (payos_orders), looked up by orderCode when the webhook arrives.
  const description = `VB${String(orderCode).slice(-7)}`;
  const origin = appOrigin();

  const paymentLink = await getPayOS().paymentRequests.create({
    orderCode,
    amount: plan.priceVnd,
    description,
    returnUrl: `${origin}/?payos=success`,
    cancelUrl: `${origin}/?payos=cancel`,
  });

  await createPendingOrder(String(orderCode), {
    email: session.user.email,
    cycle: plan.cycle,
    priceVnd: plan.priceVnd,
  });

  return NextResponse.json({
    ok: true,
    checkoutUrl: paymentLink.checkoutUrl,
    qrCode: paymentLink.qrCode,
    orderCode,
  });
}
