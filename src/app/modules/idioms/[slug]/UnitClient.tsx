"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NotesList } from "@/components/NotesList";
import { AiSentencePractice } from "@/components/AiSentencePractice";
import { UNITS_META, idiomUnitItems, type IdiomItem } from "@/data/idioms";
import { useProgress } from "@/lib/progress-context";
import { speak } from "@/lib/utils";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isIdiomUnitLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";

const SpeakerIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`block ${className}`}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
  </svg>
);

function AiSection({ item }: { item: IdiomItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 border-t pt-2" style={{ borderColor: "var(--color-divider)" }}>
      <button className="text-[11px] font-extrabold text-accent hover:underline" onClick={() => setOpen(true)}>
        🤖 Practice with AI
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[720px]">
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <div>
                <span className="text-[16px] font-extrabold">🤖 AI Practice</span>
                <span className="ml-2 text-[13px] text-neutral-600">{item.term}</span>
              </div>
              <button className="btn btn-ghost text-[13px]" onClick={() => setOpen(false)}>
                ✕ Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <AiSentencePractice item={item} moduleKey="idioms" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => UNITS_META.find((u) => u.slug === slug), [slug]);
  const items = useMemo(() => idiomUnitItems(slug), [slug]);

  if (!unit) {
    return (
      <div className="p-4">
        <p className="text-[13px] text-neutral-600">Unit not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/idioms")}>
          All units
        </button>
      </div>
    );
  }

  if (isIdiomUnitLocked(unit.unit, isUnlocked)) {
    return <ProPaywallNotice what={`Unit "${unit.title}"`} />;
  }

  function finish() {
    grade(unit!.slug, true);
    router.push("/modules/idioms");
  }

  return (
    <div>
      <div className="divider-b px-4 pt-3 pb-4">
        <button className="btn btn-ghost mb-2" onClick={() => router.push("/modules/idioms")}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block h-4 w-4 flex-none"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          All units
        </button>
        <h1 className="text-[26px]">
          <span className="mr-1.5 text-neutral-600">{unit.unit}.</span>
          {unit.title}
        </h1>
        <div className="label-xs mt-2 text-accent">{unit.titleVi}</div>
      </div>

      {items.length === 0 && (
        <div className="px-4 py-8 text-[13px] text-neutral-600">
          Nội dung unit này đang được soạn, vui lòng quay lại sau.
        </div>
      )}

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
        {items.map((it) => (
          <div key={it.term} className="divider-b px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <span className="text-[16px] font-extrabold">{it.term}</span>
              <button
                className="flex h-[26px] w-[26px] flex-none items-center justify-center text-neutral-600 hover:text-accent"
                onClick={() => speak(it.term)}
                aria-label="Pronounce"
              >
                <SpeakerIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-1 text-[13px] leading-relaxed">{it.en}</div>
            <div className="mt-0.5 text-[12px] leading-relaxed text-neutral-600">{it.vi}</div>

            <div className="mt-2.5">
              <div className="label-xs mb-1 text-accent">📜 Nguồn gốc</div>
              <p className="text-[12px] leading-relaxed text-neutral-700">{it.origin}</p>
            </div>

            <div className="mt-2.5 flex flex-col gap-1.5">
              <div className="label-xs mb-0.5 text-accent">✏️ Ví dụ</div>
              {it.examples.map((ex, i) => (
                <div key={i} className="border-l-2 border-[color:var(--color-divider)] pl-3 text-[12px] leading-relaxed">
                  <div className="text-neutral-800">{ex.en}</div>
                  <div className="text-neutral-500">{ex.vi}</div>
                </div>
              ))}
            </div>

            <NotesList moduleKey="idioms" itemKey={it.term} />
            <AiSection item={it} />
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="p-4">
          <button className="btn btn-primary btn-block px-4 py-3 tracking-wide uppercase" onClick={finish}>
            Hoàn thành unit
          </button>
        </div>
      )}
    </div>
  );
}
