"use client";

// Full user guide opened from the gear menu (AppHeader). Walks a learner
// through the 3-stage learning path, practice modes, the AI, lookup/highlight,
// and payment. All copy lives in the i18n dictionary so it stays bilingual.

import { Modal } from "./Modal";
import { useUiLang } from "@/lib/i18n";

const GUIDE_SECTIONS = [
  { titleKey: "guide.start.title", bodyKey: "guide.start.body" },
  { titleKey: "guide.practice.title", bodyKey: "guide.practice.body" },
  { titleKey: "guide.ai.title", bodyKey: "guide.ai.body" },
  { titleKey: "guide.lookup.title", bodyKey: "guide.lookup.body" },
  { titleKey: "guide.payment.title", bodyKey: "guide.payment.body" },
] as const;

export function UserGuide({ onClose }: { onClose: () => void }) {
  const { t } = useUiLang();
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-1 text-[17px] font-extrabold">{t("guide.title")}</h2>
      <p className="mb-3 text-[12px] text-neutral-600">{t("guide.subtitle")}</p>
      <div className="flex flex-col gap-3">
        {GUIDE_SECTIONS.map((s) => (
          <div key={s.titleKey} className="divider-b pb-3 last:border-b-0 last:pb-0">
            <div className="mb-1 text-[13px] font-extrabold text-accent">{t(s.titleKey)}</div>
            <p className="text-[12px] leading-relaxed text-neutral-600">{t(s.bodyKey)}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
