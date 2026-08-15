// Entitlement record: every new account gets a 7-day free trial with everything
// unlocked (starting the moment the account is first seen — stamped server-side,
// see /api/drive/subscription), then locked content (src/lib/content-access.ts)
// reverts to its normal free/locked split until the user pays for a duration-based
// package. There is no payment gateway wired up yet (see docs/subscription-interim-system.md)
// — paying still means a manual bank/QR transfer confirmed out-of-band, after which
// the admin issues an activation code (scripts/generate-activation-code.mjs) tied to
// the specific package purchased, redeemed via /api/account/activate.

export type BillingCycle = "monthly" | "quarterly" | "semiannual" | "yearly";

export interface PricingPlan {
  cycle: BillingCycle;
  label: string;
  months: number;
  priceVnd: number;
  /** Short, relatable "this costs about as much as X" hook shown next to the
   * price — makes the number feel light instead of abstract. */
  hook?: string;
}

export const TRIAL_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

// 1 month is deliberately the most expensive per-month rate — longer
// commitments get a steadily bigger discount (13% / 27% / 40% off the
// monthly rate) to make the longer packages the obviously better deal.
export const PRICING_PLANS: PricingPlan[] = [
  { cycle: "monthly", label: "1 tháng", months: 1, priceVnd: 50_000, hook: "🧋 bằng 1 cốc trà sữa" },
  { cycle: "quarterly", label: "3 tháng", months: 3, priceVnd: 130_000 },
  { cycle: "semiannual", label: "6 tháng", months: 6, priceVnd: 220_000 },
  { cycle: "yearly", label: "12 tháng", months: 12, priceVnd: 360_000, hook: "☕ Chưa tới 1.000đ/ngày" },
];

export interface SubscriptionData {
  /** Set once, server-side, the first time this account is ever seen — never reset. */
  trialStartedAt: number;
  /** Timestamp when paid access runs out; absent if never paid. */
  paidUntil?: number;
  lastCycle?: BillingCycle;
  note?: string;
  updatedAt: number;
}

export const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  trialStartedAt: 0,
  updatedAt: 0,
};

export function isTrialActive(data: SubscriptionData, now: number = Date.now()): boolean {
  return data.trialStartedAt > 0 && now < data.trialStartedAt + TRIAL_DAYS * DAY_MS;
}

export function isPaidActive(data: SubscriptionData, now: number = Date.now()): boolean {
  return data.paidUntil != null && now < data.paidUntil;
}

export function isUnlocked(data: SubscriptionData, now: number = Date.now()): boolean {
  return isTrialActive(data, now) || isPaidActive(data, now);
}

/** Whole days left in the trial (0 once expired or never started). */
export function trialDaysLeft(data: SubscriptionData, now: number = Date.now()): number {
  if (!isTrialActive(data, now)) return 0;
  return Math.max(0, Math.ceil((data.trialStartedAt + TRIAL_DAYS * DAY_MS - now) / DAY_MS));
}

function addMonths(ts: number, months: number): number {
  const d = new Date(ts);
  d.setMonth(d.getMonth() + months);
  return d.getTime();
}

/** Extends paid access by the purchased package — stacks on top of any
 * remaining paid time instead of resetting it, so renewing early doesn't lose
 * the unused balance. */
export function withPaidExtended(
  current: SubscriptionData,
  cycle: BillingCycle,
  note: string,
  now: number = Date.now(),
): SubscriptionData {
  const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
  const months = plan?.months ?? 1;
  const base = Math.max(current.paidUntil ?? 0, now);
  return { ...current, paidUntil: addMonths(base, months), lastCycle: cycle, note, updatedAt: now };
}

export function loadSubscription(): SubscriptionData {
  try {
    const raw = localStorage.getItem("subscription:status");
    return raw ? { ...DEFAULT_SUBSCRIPTION, ...JSON.parse(raw) } : DEFAULT_SUBSCRIPTION;
  } catch {
    return DEFAULT_SUBSCRIPTION;
  }
}

export function persistSubscription(data: SubscriptionData) {
  try {
    localStorage.setItem("subscription:status", JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

/** trialStartedAt: earliest wins (never shorten someone's trial by merging).
 * paidUntil: latest wins. Everything else follows whichever side is newer. */
export function mergeSubscription(local: SubscriptionData, cloud: SubscriptionData): SubscriptionData {
  const trialStartedAt =
    local.trialStartedAt > 0 && cloud.trialStartedAt > 0
      ? Math.min(local.trialStartedAt, cloud.trialStartedAt)
      : local.trialStartedAt || cloud.trialStartedAt;
  const paidUntil = Math.max(local.paidUntil ?? 0, cloud.paidUntil ?? 0) || undefined;
  const newer = local.updatedAt >= cloud.updatedAt ? local : cloud;
  return {
    trialStartedAt,
    paidUntil,
    lastCycle: newer.lastCycle,
    note: newer.note,
    updatedAt: Math.max(local.updatedAt, cloud.updatedAt),
  };
}
