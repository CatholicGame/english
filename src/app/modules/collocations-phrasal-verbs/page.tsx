"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { VERBS } from "@/data/basic-verbs";
import { buildAllItems } from "@/lib/flatten";
import { useProgress } from "@/lib/progress-context";
import { dueCount, learnedCount, dayBars } from "@/lib/stats";
import { loadMistakes, clearMistakes } from "@/lib/mistakes-store";
import type { AllItem } from "@/lib/flatten";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { useDashboardProgress } from "@/lib/use-dashboard-progress";
import { useUiLang } from "@/lib/i18n";

const DAILY_GOAL = 20;

const PRACTICE_MODES = [
  { mode: "flash", title: "Flashcards", sub: "Flip and recall" },
  { mode: "mc", title: "Multiple choice", sub: "Pick the meaning" },
  { mode: "type", title: "Typing", sub: "Write it out" },
  // Reverse modes quiz off the Vietnamese meaning, so they only make sense
  // when the learner actually reads Vietnamese.
  { mode: "reverseMc", title: "Reverse MC", sub: "Meaning -> term", viOnly: true },
  { mode: "reverseType", title: "Reverse type", sub: "Recall the phrase", viOnly: true },
  { mode: "match", title: "Matching", sub: "Pair four" },
  { mode: "listen", title: "Listen", sub: "Hear and choose" },
];

export default function TodayPage() {
  const router = useRouter();
  const { loaded, progress, days, todayDone } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const { lang: uiLang } = useUiLang();
  const practiceModes = useMemo(() => PRACTICE_MODES.filter((m) => !m.viOnly || uiLang === "vi"), [uiLang]);
  // Same unified streak shown on the home page — a learner shouldn't see two
  // different "streak" numbers for what feels like one continuous habit.
  const { streak } = useDashboardProgress();
  // Review/stats only ever draw from unlocked verbs — a locked-out user
  // shouldn't be quizzed on (or see progress toward) locked content via the
  // aggregate review flow.
  const unlockedVerbs = useMemo(() => VERBS.filter((v) => !isVerbLocked(v.verb, isUnlocked)), [isUnlocked]);
  const all = useMemo(() => buildAllItems(unlockedVerbs), [unlockedVerbs]);
  const [mistakes, setMistakes] = useState<AllItem[]>([]);

  const learned = learnedCount(all, progress);
  const due = dueCount(all, progress);
  const goalPct = Math.min(100, Math.round((todayDone / DAILY_GOAL) * 100));
  const week = dayBars(days, 7, 56, "var(--color-accent)", "var(--color-neutral-300)");
  const todayLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const hasMistakes = mistakes.length > 0;

  useEffect(() => {
    const m = loadMistakes("collocations-phrasal-verbs");
    if (m.length > 0) setMistakes(m);
  }, []);

  if (!loaded) return null;

  return (
    <div>
      <div className="divider-b flex items-baseline justify-between px-4 py-4">
        <h1 className="text-[30px]">Today</h1>
        <span className="label-xs">{todayLabel}</span>
      </div>

      <div className="divider-b grid grid-cols-3 gap-[2px] bg-[color:var(--color-divider)]">
        <div className="bg-bg px-4 py-3">
          <div className="text-[30px] leading-none font-extrabold">{streak}</div>
          <div className="label-xs mt-1.5">Streak</div>
        </div>
        <div className="bg-bg px-4 py-3">
          <div className="text-[30px] leading-none font-extrabold">{learned}</div>
          <div className="label-xs mt-1.5">Learned</div>
        </div>
        <div className="bg-bg px-4 py-3">
          <div className="text-[30px] leading-none font-extrabold text-accent">{due}</div>
          <div className="label-xs mt-1.5">To review</div>
        </div>
      </div>

      <div className="divider-b px-4 py-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="label-xs">Daily goal</span>
          <span className="text-[12px] tabular-nums">
            {todayDone} / {DAILY_GOAL}
          </span>
        </div>
        <div className="mb-6 h-2 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${goalPct}%` }} />
        </div>
        <div className="flex h-16 items-end justify-between gap-1">
          {week.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-stretch gap-1.5">
              <div style={{ background: d.color, height: `${d.h}px` }} />
              <span className="text-center text-[9px] tracking-wider text-neutral-600">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider-b px-4 py-4">
        <button
          className="btn btn-primary btn-block px-4 py-3 text-[15px]"
          onClick={() => router.push(`/modules/collocations-phrasal-verbs/run?mode=mix`)}
        >
          <span className="flex-1">Start review</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px] flex-none"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
        <div className="mt-2 text-[11px] text-neutral-600">{due} phrases still to master</div>

        {hasMistakes && (
          <div className="mt-3">
            <button
              className="btn btn-accent btn-block px-4 py-2.5 text-[13px]"
              onClick={() => {
                router.push(`/modules/collocations-phrasal-verbs/run?mode=mix&mistakes=1`);
              }}
            >
              <span className="flex-1">Review {mistakes.length} mistakes</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px] flex-none">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="label-xs px-4 pt-4 pb-2">Practice</div>
      <div className="divider-t grid grid-cols-2 gap-[2px] bg-[color:var(--color-divider)] lg:grid-cols-3">
        {practiceModes.map((m) => (
          <button
            key={m.mode}
            className="bg-bg p-4 text-left hover:bg-surface"
            onClick={() => router.push(`/modules/collocations-phrasal-verbs/run?mode=${m.mode}`)}
          >
            <span className="block text-[15px] font-extrabold">{m.title}</span>
            <span className="mt-1 block text-[11px] text-neutral-600">{m.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
