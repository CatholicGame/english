// Interim manual entitlement: no payment gateway is wired up yet (a QR-code
// provider account is being set up separately), so "this person paid" is
// verified with a deterministic code instead of a webhook. The admin computes
// it out-of-band (scripts/generate-activation-code.mjs) after confirming a
// bank/QR transfer and sends it to the user, who redeems it via
// /api/account/activate. See subscription-store.ts for the bigger picture and
// why this is a stopgap, not a real billing system.

import { createHmac } from "crypto";

function secret(): string {
  const v = process.env.ACTIVATION_CODE_SECRET;
  if (!v) throw new Error("ACTIVATION_CODE_SECRET is not set");
  return v;
}

function normalize(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function generateActivationCode(email: string): string {
  const hash = createHmac("sha256", secret()).update(email.trim().toLowerCase()).digest("hex").toUpperCase();
  const raw = hash.slice(0, 8);
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function verifyActivationCode(email: string, submitted: string): boolean {
  return normalize(submitted) === normalize(generateActivationCode(email));
}
