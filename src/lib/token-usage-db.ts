import { getDb } from "./firebase-admin";

// Per-account, per-day AI token consumption — a SEPARATE collection from
// subscriptions/{email} (which only tracks the daily *call count* for the
// AI_DAILY_CALL_LIMIT gate). Token counts vary wildly per call depending on
// intent and prompt/response size, so a call-count cap alone can't answer "is
// this account's AI usage unusually expensive" — this collection exists so
// the admin dashboard can. One doc per (account, day): `ai_token_usage/{email}_{dayKey}`.

export interface DailyTokenUsage {
  email: string;
  date: string; // dayKey(), e.g. "2026-08-19"
  promptTokens: number;
  completionTokens: number;
  reasoningTokens: number;
  calls: number;
  updatedAt: number;
}

function docIdFor(email: string): string {
  return email.trim().toLowerCase();
}

function tokenUsageDocId(email: string, date: string): string {
  return `${docIdFor(email)}_${date}`;
}

/** Meant to be scheduled via Next's `after()` (see /api/ai/route.ts) so the
 * write never sits on the AI call's critical path — same pattern as
 * incrementAiUsage() in subscription-db.ts. Uses a transaction (not a plain
 * increment) so two calls landing in the same instant don't clobber each
 * other's running totals. */
export async function incrementTokenUsage(
  email: string,
  date: string,
  usage: { promptTokens: number; completionTokens: number; reasoningTokens: number },
): Promise<void> {
  const ref = getDb().collection("ai_token_usage").doc(tokenUsageDocId(email, date));
  await getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists ? (snap.data() as DailyTokenUsage) : undefined;
    const next: DailyTokenUsage = {
      email: docIdFor(email),
      date,
      promptTokens: (current?.promptTokens ?? 0) + usage.promptTokens,
      completionTokens: (current?.completionTokens ?? 0) + usage.completionTokens,
      reasoningTokens: (current?.reasoningTokens ?? 0) + usage.reasoningTokens,
      calls: (current?.calls ?? 0) + 1,
      updatedAt: Date.now(),
    };
    tx.set(ref, next);
  });
}

/** Admin dashboard only. Returns every account-day record — the dashboard
 * does date-range filtering and per-account aggregation client-side, same
 * pattern as the subscriptions/revenue/reviews tabs (fetch once, slice in
 * React state). */
export async function listTokenUsage(): Promise<DailyTokenUsage[]> {
  const snap = await getDb().collection("ai_token_usage").get();
  return snap.docs
    .filter((d) => !d.id.startsWith("guest:")) // guest AI-usage docs aren't real accounts
    .map((d) => d.data() as DailyTokenUsage);
}
