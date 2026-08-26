import { getDb } from "./firebase-admin";
import type { SubscriptionData, BillingCycle } from "./subscription-store";

// Firestore is the entitlement source of truth (see docs/subscription-interim-system.md
// for why this replaced per-user Google Drive storage). Two collections:
//   subscriptions/{email}     — one SubscriptionData record per account
//   payos_orders/{orderCode}  — one record per checkout attempt, so the PayOS
//                                webhook (which only carries an orderCode) can
//                                look up which account/plan it belongs to, and
//                                so a retried webhook delivery is a no-op.

function docIdFor(email: string): string {
  return email.trim().toLowerCase();
}

export async function getSubscription(email: string): Promise<SubscriptionData | null> {
  const snap = await getDb().collection("subscriptions").doc(docIdFor(email)).get();
  return snap.exists ? (snap.data() as SubscriptionData) : null;
}

export async function setSubscription(email: string, data: SubscriptionData): Promise<void> {
  await getDb().collection("subscriptions").doc(docIdFor(email)).set(data);
}

/** Admin dashboard only — every other read is by-email, so this is the one
 * full collection scan in the codebase. Doc ID (already lowercased) doubles
 * as the email since SubscriptionData doesn't store it redundantly. */
export async function listSubscriptions(): Promise<Array<SubscriptionData & { email: string }>> {
  const snap = await getDb().collection("subscriptions").get();
  return snap.docs.map((doc) => ({ email: doc.id, ...(doc.data() as SubscriptionData) }));
}

/** Cheap, non-blocking read of today's /api/ai call count — a plain `.get()`,
 * not a transaction, so it's fast enough to sit in front of the (much slower)
 * AI call without adding meaningful latency. Resets whenever the stored date
 * no longer matches `today` (a dayKey() string). Since this doesn't write,
 * two concurrent requests can both read a count just under `limit` and both
 * get `allowed: true` — see incrementAiUsage() for the tradeoff this makes. */
export async function peekAiUsage(
  email: string,
  today: string,
  limit: number,
): Promise<{ allowed: boolean; count: number }> {
  const snap = await getDb().collection("subscriptions").doc(docIdFor(email)).get();
  const current = snap.exists ? (snap.data() as SubscriptionData) : undefined;
  const sameDay = current?.aiCallsDate === today;
  const count = sameDay ? (current?.aiCallsToday ?? 0) : 0;
  return { allowed: count < limit, count };
}

/** Atomically increments today's /api/ai call count. Meant to be scheduled via
 * Next's `after()` once the AI response has already been sent, so the write
 * (and its transaction round-trip) never sits on the request's critical path.
 * Deliberately paired with peekAiUsage() instead of a single check-and-increment
 * transaction: the accepted tradeoff is that a burst of concurrent requests
 * right at the limit can overshoot by a request or two (since the increment
 * for request N hasn't landed yet when request N+1 reads), in exchange for the
 * daily-limit check no longer blocking every single AI call on a Firestore
 * transaction. Uses `set(..., {merge:true})` so it never clobbers the rest of
 * the subscription record (trialStartedAt, paidUntil, ...). */
export async function incrementAiUsage(email: string, today: string): Promise<void> {
  const ref = getDb().collection("subscriptions").doc(docIdFor(email));
  await getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists ? (snap.data() as SubscriptionData) : undefined;
    const sameDay = current?.aiCallsDate === today;
    const count = sameDay ? (current?.aiCallsToday ?? 0) : 0;
    tx.set(ref, { aiCallsDate: today, aiCallsToday: count + 1, updatedAt: Date.now() }, { merge: true });
  });
}

export interface PayosOrder {
  email: string;
  cycle: BillingCycle;
  priceVnd: number;
  status: "pending" | "paid";
  createdAt: number;
  paidAt?: number;
}

export async function createPendingOrder(orderCode: string, order: Omit<PayosOrder, "status" | "createdAt">): Promise<void> {
  await getDb()
    .collection("payos_orders")
    .doc(orderCode)
    .set({ ...order, status: "pending", createdAt: Date.now() } satisfies PayosOrder);
}

export async function getOrder(orderCode: string): Promise<PayosOrder | null> {
  const snap = await getDb().collection("payos_orders").doc(orderCode).get();
  return snap.exists ? (snap.data() as PayosOrder) : null;
}

/** Marks a pending order as paid, atomically, so a duplicate/retried webhook
 * delivery for the same orderCode is a safe no-op (returns false the second
 * time instead of extending paid access twice). */
export async function markOrderPaidOnce(orderCode: string): Promise<boolean> {
  const ref = getDb().collection("payos_orders").doc(orderCode);
  return getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || (snap.data() as PayosOrder).status === "paid") return false;
    tx.update(ref, { status: "paid", paidAt: Date.now() });
    return true;
  });
}

// --- PayPal (international/USD checkout) ------------------------------------
// Parallel bookkeeping for the PayPal option: same shape and flow as
// payos_orders, but keyed by PayPal's own order id (returned when the order is
// created, echoed back as `token` on the approval redirect, and needed by the
// capture call), and priced in USD since PayPal has no VND. Money only moves on
// capture — "paid" is set server-side right after PayPal confirms a capture
// completed, never by the client.

export interface PaypalOrder {
  email: string;
  cycle: BillingCycle;
  priceUsd: number;
  status: "pending" | "paid";
  createdAt: number;
  paidAt?: number;
}

export async function createPendingPaypalOrder(
  paypalOrderId: string,
  order: Omit<PaypalOrder, "status" | "createdAt">,
): Promise<void> {
  await getDb()
    .collection("paypal_orders")
    .doc(paypalOrderId)
    .set({ ...order, status: "pending", createdAt: Date.now() } satisfies PaypalOrder);
}

export async function getPaypalOrder(paypalOrderId: string): Promise<PaypalOrder | null> {
  const snap = await getDb().collection("paypal_orders").doc(paypalOrderId).get();
  return snap.exists ? (snap.data() as PaypalOrder) : null;
}

/** Same idempotency guard as markOrderPaidOnce, for the capture step: a
 * repeated capture (double-click, tab refresh on the return URL, retried
 * redirect) must never extend paid access twice. */
export async function markPaypalOrderPaidOnce(paypalOrderId: string): Promise<boolean> {
  const ref = getDb().collection("paypal_orders").doc(paypalOrderId);
  return getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || (snap.data() as PaypalOrder).status === "paid") return false;
    tx.update(ref, { status: "paid", paidAt: Date.now() });
    return true;
  });
}

// --- Revenue (admin dashboard only) -----------------------------------------

export type RevenueOrder =
  | { id: string; method: "payos"; email: string; cycle: BillingCycle; amount: number; currency: "VND"; paidAt: number }
  | { id: string; method: "paypal"; email: string; cycle: BillingCycle; amount: number; currency: "USD"; paidAt: number };

/** Admin dashboard only — the two order collections are the actual money
 * ledger (subscriptions/{email} only tracks entitlement, not what was paid),
 * so this is where "how much have we made" has to be read from. */
export async function listPaidOrders(): Promise<RevenueOrder[]> {
  const [payosSnap, paypalSnap] = await Promise.all([
    getDb().collection("payos_orders").where("status", "==", "paid").get(),
    getDb().collection("paypal_orders").where("status", "==", "paid").get(),
  ]);

  const payos: RevenueOrder[] = payosSnap.docs.map((doc) => {
    const d = doc.data() as PayosOrder;
    return { id: doc.id, method: "payos", email: d.email, cycle: d.cycle, amount: d.priceVnd, currency: "VND", paidAt: d.paidAt ?? d.createdAt };
  });
  const paypal: RevenueOrder[] = paypalSnap.docs.map((doc) => {
    const d = doc.data() as PaypalOrder;
    return { id: doc.id, method: "paypal", email: d.email, cycle: d.cycle, amount: d.priceUsd, currency: "USD", paidAt: d.paidAt ?? d.createdAt };
  });

  return [...payos, ...paypal].sort((a, b) => b.paidAt - a.paidAt);
}
