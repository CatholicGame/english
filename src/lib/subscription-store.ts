// Dummy/interim entitlement record — there is no payment gateway wired up yet
// (the QR-code payment provider account is being set up separately), so "has
// this person paid" is tracked manually: after confirming a bank/QR transfer
// out-of-band, the admin generates an activation code (scripts/generate-activation-code.mjs)
// and the user redeems it via /api/account/activate. The record is then synced
// through the same personal-Drive appDataFolder pattern as the dictionary/
// translations stores (see google-drive.ts), so it survives a refresh and
// follows the user across devices — but note it is NOT a real source of truth
// for billing (the client could edit its own local copy). Replace this whole
// module with server-side webhook-driven entitlement once a real payment
// gateway is integrated.

export type SubscriptionPlan = "free" | "pro";

export interface SubscriptionData {
  plan: SubscriptionPlan;
  /** How this plan was granted — always "manual_dummy" until a real gateway exists. */
  source: "manual_dummy" | "none";
  activatedAt?: number;
  note?: string;
  updatedAt: number;
}

const STORAGE_KEY = "subscription:status";

export const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  plan: "free",
  source: "none",
  updatedAt: 0,
};

export function loadSubscription(): SubscriptionData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SUBSCRIPTION, ...JSON.parse(raw) } : DEFAULT_SUBSCRIPTION;
  } catch {
    return DEFAULT_SUBSCRIPTION;
  }
}

export function persistSubscription(data: SubscriptionData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function withPlanActivated(note: string): SubscriptionData {
  return {
    plan: "pro",
    source: "manual_dummy",
    activatedAt: Date.now(),
    note,
    updatedAt: Date.now(),
  };
}

/** Cloud always wins over the free default (there's only ever one writer of a
 * "pro" grant — the activation route — so no genuine conflict to resolve; just
 * keep whichever record is newer). */
export function mergeSubscription(local: SubscriptionData, cloud: SubscriptionData): SubscriptionData {
  return cloud.updatedAt >= local.updatedAt ? cloud : local;
}
