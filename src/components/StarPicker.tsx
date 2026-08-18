"use client";

import { useState } from "react";

const CAPTIONS: Record<number, string> = {
  1: "Rất tệ 😢",
  2: "Chưa tốt 😕",
  3: "Bình thường 😐",
  4: "Tốt 🙂",
  5: "Tuyệt vời! 🤩",
};

/** Big, tactile 1-5 star picker — the primary call-to-action on the write-a-
 * review form, not a small inline control, so it reads as "the main thing to
 * do here" rather than one field among many. */
export function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex gap-2"
        style={{ fontSize: 40, lineHeight: 1 }}
        role="radiogroup"
        aria-label="Chọn số sao đánh giá"
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={`${s} sao`}
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
      <span className={`text-[13px] font-bold ${shown ? "text-accent-700" : "text-neutral-500"}`}>
        {shown ? CAPTIONS[shown] : "Chạm vào sao để đánh giá"}
      </span>
    </div>
  );
}
