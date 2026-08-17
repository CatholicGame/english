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

/** Atomically checks + increments today's /api/ai call count for an account,
 * so concurrent requests can't race past the daily limit. Resets the counter
 * whenever the stored date no longer matches `today` (a dayKey() string).
 * Uses `set(..., {merge:true})` so it never clobbers the rest of the
 * subscription record (trialStartedAt, paidUntil, ...). */
export async function checkAndIncrementAiUsage(
  email: string,
  today: string,
  limit: number,
): Promise<{ allowed: boolean; count: number }> {
  const ref = getDb().collection("subscriptions").doc(docIdFor(email));
  return getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists ? (snap.data() as SubscriptionData) : undefined;
    const sameDay = current?.aiCallsDate === today;
    const count = sameDay ? (current?.aiCallsToday ?? 0) : 0;

    if (count >= limit) return { allowed: false, count };

    const next = count + 1;
    tx.set(ref, { aiCallsDate: today, aiCallsToday: next, updatedAt: Date.now() }, { merge: true });
    return { allowed: true, count: next };
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
