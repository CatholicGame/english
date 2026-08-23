"use client";

import { useMemo } from "react";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { buildAllItems } from "@/lib/flatten";
import { useProgress } from "@/lib/progress-context";
import { dayBars, groupStats, masteryBuckets } from "@/lib/stats";

export default function ProgressPage() {
  const { loaded, progress, days } = useProgress();
  const all = useMemo(() => buildAllItems(VERBS), []);

  if (!loaded) return null;

  const fortnight = dayBars(days, 14, 88, "var(--color-accent)", "var(--color-neutral-300)");
  const mastery = masteryBuckets(all, progress, {
    pale: "var(--color-neutral-300)",
    learning: "var(--color-accent-300)",
    known: "var(--color-accent-500)",
    mastered: "var(--color-accent)",
  });
  const groups = groupStats(all, progress, GROUP_LABELS);

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 13);
  const fromLabel = fromDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div>
      <div className="divider-b px-4 py-4">
        <h1 className="text-[30px]">Progress</h1>
      </div>

      <div className="divider-b px-4 py-4">
        <div className="label-xs mb-3">Last 14 days</div>
        <div className="flex h-[88px] items-end gap-[3px]">
          {fortnight.map((d, i) => (
            <div key={i} className="flex-1" style={{ background: d.color, height: `${d.h}px` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] tracking-wider text-neutral-600 uppercase">
          <span>{fromLabel}</span>
          <span>Today</span>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="divider-b px-4 py-4 lg:border-b-0">
          <div className="label-xs mb-3">Mastery</div>
          {mastery.map((m) => (
            <div key={m.label} className="mb-3">
              <div className="mb-1 flex justify-between text-[14px]">
                <span>{m.label}</span>
                <span className="tabular-nums text-neutral-600">{m.n}</span>
              </div>
              <div className="h-1.5 bg-neutral-300">
                <div className="h-full" style={{ background: m.color, width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-4">
          <div className="label-xs mb-3">By group</div>
          {groups.map((g) => (
            <div key={g.label} className="mb-3">
              <div className="mb-1 flex justify-between gap-3 text-[14px]">
                <span className="truncate">{g.label}</span>
                <span className="flex-none tabular-nums text-neutral-600">{g.n}</span>
              </div>
              <div className="h-1.5 bg-neutral-300">
                <div className="h-full bg-accent" style={{ width: `${g.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
