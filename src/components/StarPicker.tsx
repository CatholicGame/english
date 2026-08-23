"use client";

import { useState } from "react";
import { useUiLang } from "@/lib/i18n";

const CAPTION_KEYS: Record<number, string> = {
  1: "reviews.caption.1",
  2: "reviews.caption.2",
  3: "reviews.caption.3",
  4: "reviews.caption.4",
  5: "reviews.caption.5",
};

/** Big, tactile 1-5 star picker — the primary call-to-action on the write-a-
 * review form, not a small inline control, so it reads as "the main thing to
 * do here" rather than one field among many. */
export function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { t } = useUiLang();
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex gap-2"
        style={{ fontSize: 40, lineHeight: 1 }}
        role="radiogroup"
        aria-label={t("reviews.picker.aria")}
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={t("reviews.picker.starAria", { n: s })}
            className="leading-none transition-transform hover:scale-110 active:scale-95"
            style={{ color: s <= shown ? "var(--color-accent)" : "var(--color-divider)" }}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(s)}
          >
            ★
          </button>
        ))}
      </div>
      <span className={`text-[16px] font-bold ${shown ? "text-accent-700" : "text-neutral-500"}`}>
        {shown ? t(CAPTION_KEYS[shown]) : t("reviews.picker.prompt")}
      </span>
    </div>
  );
}
