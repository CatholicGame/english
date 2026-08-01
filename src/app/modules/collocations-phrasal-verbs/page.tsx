"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { VERBS } from "@/data/basic-verbs";
import { buildAllItems } from "@/lib/flatten";
import { useProgress } from "@/lib/progress-context";
import { dueCount, learnedCount, dayBars } from "@/lib/stats";

const DAILY_GOAL = 20;

const PRACTICE_MODES = [
  { mode: "flash", title: "Flashcards", sub: "Flip and recall" },
  { mode: "mc", title: "Multiple choice", sub: "Pick the meaning" },
  { mode: "fill", title: "Fill in", sub: "Complete the sentence" },
  { mode: "type", title: "Typing", sub: "Write it out" },
  { mode: "match", title: "Matching", sub: "Pair four" },
  { mode: "listen", title: "Listen", sub: "Hear and choose" },
];

export default function TodayPage() {
  const router = useRouter();
  const { loaded, progress, days, streak, todayDone } = useProgress();
  const all = useMemo(() => buildAllItems(VERBS), []);

  const learned = learnedCount(all, progress);
  const due = dueCount(all, progress);
  const goalPct = Math.min(100, Math.round((todayDone / DAILY_GOAL) * 100));
  const week = dayBars(days, 7, 56, "var(--color-accent)", "var(--color-neutral-300)");
  const todayLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

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
      </div>

      <div className="label-xs px-4 pt-4 pb-2">Practice</div>
      <div className="divider-t grid grid-cols-2 gap-[2px] bg-[color:var(--color-divider)]">
        {PRACTICE_MODES.map((m) => (
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
