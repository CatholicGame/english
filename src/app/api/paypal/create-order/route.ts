import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { createPayPalOrder } from "@/lib/paypal-client";
import { createPendingPaypalOrder } from "@/lib/subscription-db";
import { PRICING_PLANS, type BillingCycle } from "@/lib/subscription-store";
import { appOrigin } from "@/lib/app-url";

// Mirror of /api/payos/create-payment-link for the international (USD) path.
// Creates a PayPal order server-side (PAYPAL_SECRET never leaves the server),
// records the pending order in Firestore keyed by PayPal's order id, and hands
// the browser the hosted approval URL. The money doesn't move until
// /api/paypal/capture is called after the buyer approves — see that route.
export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const cycle: BillingCycle | undefined = body?.cycle;
  const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
  if (!plan) return NextResponse.json({ ok: false, error: "invalid_cycle" }, { status: 400 });

  const origin = appOrigin(request);
  const { paypalOrderId, approveUrl } = await createPayPalOrder(
    plan.priceUsd,
    `${origin}/?paypal=success`,
    `${origin}/?paypal=cancel`,
  );

  await createPendingPaypalOrder(paypalOrderId, {
    email: session.user.email,
    cycle: plan.cycle,
    priceUsd: plan.priceUsd,
  });

  return NextResponse.json({ ok: true, approveUrl, paypalOrderId });
}
