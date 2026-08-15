// Generates the manual activation codes for a Google account email, to hand
// out after confirming a bank/QR-code payment out-of-band (no payment gateway
// is wired up yet — see src/lib/subscription-store.ts). Prints one code per
// package since the amount actually paid determines which one to send — the
// user redeems whichever code you give them in Settings -> "Gói dịch vụ" (or
// the popup shown when tapping locked content), which posts to
// /api/account/activate; the server figures out which package the code
// belongs to on its own.
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

// Keep in sync with PRICING_PLANS in src/lib/subscription-store.ts.
const PLANS = [
  { cycle: "monthly", label: "1 tháng", priceVnd: 50_000 },
  { cycle: "quarterly", label: "3 tháng", priceVnd: 130_000 },
  { cycle: "semiannual", label: "6 tháng", priceVnd: 220_000 },
  { cycle: "yearly", label: "12 tháng", priceVnd: 360_000 },
];

function codeFor(cycle) {
  const hash = createHmac("sha256", secret).update(`${email.trim().toLowerCase()}:${cycle}`).digest("hex").toUpperCase();
  const raw = hash.slice(0, 8);
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

console.log(`Email: ${email}\n`);
for (const plan of PLANS) {
  console.log(`${plan.label.padEnd(10)} ${plan.priceVnd.toLocaleString("vi-VN")}đ   ${codeFor(plan.cycle)}`);
}
console.log(`\nGửi ĐÚNG 1 mã tương ứng với gói người dùng đã thanh toán. Nhập ở Settings (bánh răng) -> Gói dịch vụ, hoặc popup hiện ra khi bấm vào nội dung bị khoá.`);
