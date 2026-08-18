import { NextResponse, type NextRequest } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal-client";
import {
  getPaypalOrder,
  getSubscription,
  markPaypalOrderPaidOnce,
  setSubscription,
} from "@/lib/subscription-db";
import { withPaidExtended, DEFAULT_SUBSCRIPTION, PRICING_PLANS } from "@/lib/subscription-store";

// Safety-net counterpart of /api/paypal/capture. PayPal only *approves* in the
// browser; money moves when WE call capture on return, so the webhook is NOT
// what grants access in the happy path — it covers the gap where the capture
// succeeded at PayPal but our Firestore write (or the browser round trip) never
// completed: the webhook retries the same idempotent grant, so a paid user is
// never left locked. Called server-to-server with NO session — authenticity
// comes from PayPal's verify-webhook-signature API (PAYPAL_WEBHOOK_ID), the
// same "no session → central Firestore" pattern as the PayOS webhook.
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });

  const verified = await verifyPayPalWebhookSignature(request.headers, body);
  if (!verified) return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });

  try {
    if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      // The capture resource carries the parent order id; our Firestore doc is
      // keyed by exactly that id, so this is the correlation that survives the
      // no-session webhook — same trick as payos_orders/{orderCode}.
      const orderId = body.resource?.supplementary_data?.related_ids?.order_id;
      const order = orderId ? await getPaypalOrder(orderId) : null;
      if (order) {
        const firstTime = await markPaypalOrderPaidOnce(orderId);
        if (firstTime) {
          const plan = PRICING_PLANS.find((p) => p.cycle === order.cycle);
          const current = await getSubscription(order.email);
          const updated = withPaidExtended(
            current ?? DEFAULT_SUBSCRIPTION,
            order.cycle,
            `Thanh toán qua PayPal (webhook) — gói ${plan?.label ?? order.cycle} (order ${orderId})`,
          );
          await setSubscription(order.email, updated);
        }
      }
      // Unknown/expired order or already paid (capture-on-return won the race):
      // ack anyway so PayPal stops retrying — nothing more to grant.
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Signature already verified above — a failure here is our own
    // Firestore/config problem, not an invalid request.
    console.error("paypal webhook: Firestore step failed", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}