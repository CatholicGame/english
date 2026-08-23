"use client";

// Shown instead of the real content when a unit/lesson/verb is locked (trial
// expired and not paid) — see src/lib/content-access.ts and
// docs/subscription-interim-system.md. Embeds SubscriptionSettings directly
// so checking out doesn't require hunting through the gear-icon Settings menu
// first. Used for direct navigation to a locked detail URL; PurchaseModal
// covers the "tap a locked item in a list" case.

import { LockIcon } from "./LockIcon";
import { SubscriptionSettings } from "./SubscriptionSettings";
import { useUiLang } from "@/lib/i18n";

export function ProPaywallNotice({ what }: { what: string }) {
  const { t } = useUiLang();
  return (
    <div className="mx-auto max-w-[420px] px-4 py-10 text-center">
      <div className="mb-2 flex justify-center text-neutral-500">
        <LockIcon className="block h-8 w-8" />
      </div>
      <div className="mb-1 text-[18px] font-extrabold">{t("paywall.locked")}</div>
      <p className="mb-4 text-[15px] text-neutral-600">{t("paywall.body", { what })}</p>
      <div className="border border-[color:var(--color-divider)] text-left">
        <SubscriptionSettings />
      </div>
    </div>
  );
}
