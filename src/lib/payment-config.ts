// Bank transfer / dynamic QR details — the account with a QR-code provider is
// still being set up (see docs/subscription-interim-system.md). Fill in
// BANK_TRANSFER once it's ready and PurchaseModal/SubscriptionSettings
// automatically start rendering a real, pre-filled QR code — no other code
// change needed. Until then they fall back to a "manual transfer" note.

import type { BillingCycle } from "./subscription-store";

export interface BankTransferConfig {
  /** VietQR bank BIN code — https://vietqr.io/danh-sach-ngan-hang */
  bankBin: string;
  accountNumber: string;
  /** Unaccented, exactly as printed on the bank account. */
  accountName: string;
}

// TODO: paste the real bank/QR-provider details here once the account is ready.
export const BANK_TRANSFER: BankTransferConfig | null = null;

/** VietQR "quick link" image: scanning it in any Vietnamese banking app
 * pre-fills the amount and transfer content, so the payer never has to type
 * anything by hand. */
export function vietQrImageUrl(config: BankTransferConfig, amountVnd: number, note: string): string {
  const params = new URLSearchParams({
    amount: String(amountVnd),
    addInfo: note,
    accountName: config.accountName,
  });
  return `https://img.vietqr.io/image/${config.bankBin}-${config.accountNumber}-compact2.png?${params.toString()}`;
}

/** Short transfer-content note so a manual (or later, automated) reconciliation
 * can match an incoming transfer to "this account + this package" — most
 * banking apps truncate long transfer content, so keep it short. */
export function transferNote(email: string, cycle: BillingCycle): string {
  const handle = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);
  return `PHRASALUP ${handle} ${cycle.toUpperCase()}`;
}
