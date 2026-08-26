// Self-check for the guest-trial cookie (src/lib/guest-cookie.ts): the 7-day
// expiry boundary src/proxy.ts relies on to let a no-login visitor through vs.
// redirect to /login, plus a wire-format sanity check for the AES-256-GCM
// encrypt/decrypt shape shared with src/lib/session-cookie.ts.
//
// guest-cookie.ts itself isn't imported directly: it has relative imports
// without file extensions (correct for the Next.js/TS build, which uses
// moduleResolution "bundler"), and there's no TS loader wired up for plain
// Node scripts here (see check-grammar-data.mjs) — Node's ESM resolver
// requires explicit extensions for relative imports. subscription-store.ts
// has no imports of its own, so it can be imported directly like
// grammar-rule-line.ts is in check-grammar-data.mjs.
//
// Run: node --env-file=.env.local scripts/check-guest-cookie.mjs
// (needs COOKIE_ENCRYPTION_KEY — same key gd_session uses)

import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from "node:crypto";
import { TRIAL_DAYS, DAY_MS } from "../src/lib/subscription-store.ts";

const errors = [];
function check(cond, message) {
  if (!cond) errors.push(message);
}

function getKey() {
  const raw = process.env.COOKIE_ENCRYPTION_KEY;
  if (!raw) throw new Error("COOKIE_ENCRYPTION_KEY is not set");
  return Buffer.from(raw, "base64");
}

// Mirrors encryptPayload()/decryptPayload() in session-cookie.ts.
function encryptPayload(payload) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString("base64url");
}
function decryptPayload(value) {
  try {
    const buf = Buffer.from(value, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", getKey(), buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    const plaintext = Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]);
    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    return null;
  }
}

// Mirrors newGuestPayload()/isGuestTrialActive() in guest-cookie.ts.
function newGuestPayload() {
  return { id: randomUUID(), startedAt: Date.now() };
}
function isGuestTrialActive(payload, now = Date.now()) {
  return now < payload.startedAt + TRIAL_DAYS * DAY_MS;
}

check(TRIAL_DAYS === 7, `guest trial is meant to be 7 days, TRIAL_DAYS is ${TRIAL_DAYS}`);

const payload = newGuestPayload();
check(typeof payload.id === "string" && payload.id.length > 0, "newGuestPayload() should generate a non-empty id");

const roundTripped = decryptPayload(encryptPayload(payload));
check(
  roundTripped?.id === payload.id && roundTripped?.startedAt === payload.startedAt,
  `encrypt/decrypt round-trip should be lossless, got ${JSON.stringify(roundTripped)}`,
);
check(decryptPayload("not-a-valid-cookie-value") === null, "decryptPayload() should return null for a corrupt value, not throw");

const now = Date.now();
check(isGuestTrialActive({ id: "x", startedAt: now }, now), "trial should be active at day 0");
check(isGuestTrialActive({ id: "x", startedAt: now - 6 * DAY_MS }, now), "trial should still be active at day 6");
check(!isGuestTrialActive({ id: "x", startedAt: now - 8 * DAY_MS }, now), "trial should be expired at day 8");

if (errors.length) {
  console.error(`${errors.length} problem(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("guest-cookie: OK");
