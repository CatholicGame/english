"use client";

// Shown instead of the real content when a unit/lesson/verb is locked (trial
// expired and not paid) — see src/lib/content-access.ts and
// docs/subscription-interim-system.md. Embeds SubscriptionSettings directly
// so redeeming an activation code doesn't require hunting through the
// gear-icon Settings menu first. Used for direct navigation to a locked
// detail URL; PurchaseModal covers the "tap a locked item in a list" case.

import { LockIcon } from "./LockIcon";
import { SubscriptionSettings } from "./SubscriptionSettings";

export function ProPaywallNotice({ what }: { what: string }) {
  return (
    <div className="mx-auto max-w-[420px] px-4 py-10 text-center">
      <div className="mb-2 flex justify-center text-neutral-500">
        <LockIcon className="block h-8 w-8" />
      </div>
      <div className="mb-1 text-[16px] font-extrabold">Nội dung này đã bị khoá</div>
      <p className="mb-4 text-[13px] text-neutral-600">
        {what} chỉ mở trong thời gian dùng thử hoặc khi đã kích hoạt gói trả phí. Nếu bạn đã thanh toán qua QR code,
        nhập mã kích hoạt bên dưới để mở khoá.
      </p>
      <div className="border border-[color:var(--color-divider)] text-left">
        <SubscriptionSettings />
      </div>
    </div>
  );
}
