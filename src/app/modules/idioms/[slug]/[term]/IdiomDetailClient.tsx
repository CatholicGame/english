"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { NotesList } from "@/components/NotesList";
import { AiSentencePractice } from "@/components/AiSentencePractice";
import { UNITS_META, idiomItem, idiomProgressKey } from "@/data/idioms";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
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

export function IdiomDetailClient({ slug, termSlug }: { slug: string; termSlug: string }) {
  const router = useRouter();
  const { progress, grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => UNITS_META.find((u) => u.slug === slug), [slug]);
  const it = useMemo(() => idiomItem(slug, termSlug), [slug, termSlug]);

  if (!unit || !it) {
    return (
      <div className="p-4">
        <p className="text-[13px] text-neutral-600">Idiom not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push(`/modules/idioms/${slug}`)}>
          Back to unit
        </button>
      </div>
    );
  }

  if (isIdiomUnitLocked(unit.unit, isUnlocked)) {
    return <ProPaywallNotice what={`Unit "${unit.title}"`} />;
  }

  const key = idiomProgressKey(slug, it.slug);
  const lvl = lvlOf(progress, key);
  const learned = lvl >= 3;

  return (
    <div>
      <div className="divider-b px-4 pt-3 pb-4">
        <button className="btn btn-ghost mb-2" onClick={() => router.push(`/modules/idioms/${slug}`)}>
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
          {unit.title}
        </button>
        <div className="flex items-start gap-3">
          <h1 className="text-[24px] leading-tight">{it.term}</h1>
          <button
            className="btn btn-secondary btn-icon flex-none justify-center"
            onClick={() => speak(it.term)}
            aria-label="Pronounce"
          >
            <SpeakerIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className="block h-1.5 w-1.5"
                style={{ background: n < lvl ? "var(--color-accent)" : "var(--color-neutral-300)" }}
              />
            ))}
          </span>
          {learned && <span className="label-xs text-accent">Đã thuộc</span>}
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="label-xs mb-1 text-accent">📖 Khái niệm</div>
        <p className="text-[14px] leading-relaxed">{it.en}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{it.vi}</p>

        <div className="mt-4">
          <div className="label-xs mb-1 text-accent">📜 Nguồn gốc</div>
          <p className="text-[13px] leading-relaxed text-neutral-700">{it.origin}</p>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <div className="label-xs text-accent">✏️ Ví dụ</div>
          {it.examples.map((ex, i) => (
            <div key={i} className="border-l-2 border-[color:var(--color-divider)] pl-3 text-[13px] leading-relaxed">
              <div className="text-neutral-800">{ex.en}</div>
              <div className="text-neutral-500">{ex.vi}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
          <div className="label-xs mb-2 text-accent">🧠 Bạn có nhớ thành ngữ này không?</div>
          <div className="flex gap-2">
            <button
              className="btn btn-secondary flex-1 px-3 py-2 text-[13px]"
              onClick={() => grade(key, false)}
            >
              🔁 Cần ôn lại
            </button>
            <button
              className="btn btn-primary flex-1 px-3 py-2 text-[13px]"
              onClick={() => grade(key, true)}
            >
              ✅ Đã nhớ
            </button>
          </div>
        </div>

        <NotesList moduleKey="idioms" itemKey={key} />

        <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
          <div className="label-xs mb-2 text-accent">🤖 Luyện tập với AI</div>
          <AiSentencePractice item={it} moduleKey="idioms" />
        </div>
      </div>
    </div>
  );
}
