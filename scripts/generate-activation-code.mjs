// Generates the manual activation code for a Google account email, to hand out
// after confirming a bank/QR-code payment out-of-band (no payment gateway is
// wired up yet — see src/lib/subscription-store.ts). The user redeems the code
// in Settings -> "Gói dịch vụ", which posts to /api/account/activate.
//
// Usage:
//   node scripts/generate-activation-code.mjs user@gmail.com

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createHmac } from "node:crypto";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/generate-activation-code.mjs <email>");
  process.exit(1);
}

const secret = process.env.ACTIVATION_CODE_SECRET;
if (!secret) {
  console.error("ACTIVATION_CODE_SECRET is not set in .env.local");
  process.exit(1);
}

const hash = createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").toUpperCase();
const raw = hash.slice(0, 8);
const code = `${raw.slice(0, 4)}-${raw.slice(4)}`;

console.log(`Email:      ${email}`);
console.log(`Code:       ${code}`);
console.log(`Redeem at:  Settings (gear icon) -> Gói dịch vụ, after signing in with this Google account.`);
