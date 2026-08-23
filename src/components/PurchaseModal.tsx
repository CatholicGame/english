"use client";

// Popup shown wherever a learner taps locked content (see src/lib/content-access.ts) —
// reuses SubscriptionSettings so the pricing table + PayOS checkout is defined
// exactly once, whether opened here or from the Settings gear menu.

import { Modal } from "./Modal";
import { SubscriptionSettings } from "./SubscriptionSettings";
import { useUiLang } from "@/lib/i18n";

export function PurchaseModal({ onClose }: { onClose: () => void }) {
  const { t } = useUiLang();
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-1 text-[20px] font-extrabold">{t("purchase.title")}</h2>
      <p className="mb-3 text-[16px] text-neutral-600">{t("purchase.sub")}</p>
      <SubscriptionSettings />
    </Modal>
  );
}
