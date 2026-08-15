// Interim manual entitlement: no payment gateway is wired up yet (a QR-code
// provider account is being set up separately), so "this person paid for
// package X" is verified with a deterministic code instead of a webhook. The
// admin computes one code per package out-of-band (scripts/generate-activation-code.mjs)
// after confirming a bank/QR transfer and sends the matching one to the user,
// who redeems it via /api/account/activate — the server figures out which
// package the code belongs to (matchActivationCode), so the user only ever
// pastes one code, never picks a plan again. See subscription-store.ts for the
// bigger picture and why this is a stopgap, not a real billing system.

import { createHmac } from "crypto";
import { PRICING_PLANS, type BillingCycle } from "./subscription-store";

function secret(): string {
  const v = process.env.ACTIVATION_CODE_SECRET;
  if (!v) throw new Error("ACTIVATION_CODE_SECRET is not set");
  return v;
}

function normalize(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function generateActivationCode(email: string, cycle: BillingCycle): string {
  const hash = createHmac("sha256", secret()).update(`${email.trim().toLowerCase()}:${cycle}`).digest("hex").toUpperCase();
  const raw = hash.slice(0, 8);
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

/** Tries every package's code for this email and returns whichever one matches
 * the submitted code, or null if none do. */
export function matchActivationCode(email: string, submitted: string): BillingCycle | null {
  const target = normalize(submitted);
  for (const plan of PRICING_PLANS) {
    if (normalize(generateActivationCode(email, plan.cycle)) === target) return plan.cycle;
  }
  return null;
}
