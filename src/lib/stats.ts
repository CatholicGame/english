import { dayKey } from "./utils";
import type { AllItem } from "./flatten";
import type { DaysMap, ProgressMap } from "./progress-context";

export function lvlOf(progress: ProgressMap, key: string): number {
  return progress[key]?.l ?? 0;
}

export function dueItems(all: AllItem[], progress: ProgressMap): AllItem[] {
  const due = all.filter((i) => lvlOf(progress, i.key) < 3);
  return due.length ? due : all;
}

export function dueCount(all: AllItem[], progress: ProgressMap): number {
  return all.filter((i) => lvlOf(progress, i.key) < 3).length;
}

export function learnedCount(all: AllItem[], progress: ProgressMap): number {
  return all.filter((i) => lvlOf(progress, i.key) >= 3).length;
}

export interface DayBar {
  h: number;
  color: string;
  label: string;
}

export function dayBars(
  days: DaysMap,
  n: number,
  heightPx: number,
  activeColor: string,
  paleColor: string,
): DayBar[] {
  const out: DayBar[] = [];
  let max = 1;
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    max = Math.max(max, days[dayKey(d)] || 0);
  }
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const v = days[dayKey(d)] || 0;
    out.push({
      h: Math.max(3, Math.round((v / max) * heightPx)),
      color: v ? activeColor : paleColor,
      label: "SMTWTFS"[d.getDay()],
    });
  }
  return out;
}

export interface MasteryBucket {
  label: string;
  n: number;
  pct: number;
  color: string;
}

export function masteryBuckets(
  all: AllItem[],
  progress: ProgressMap,
  colors: { pale: string; learning: string; known: string; mastered: string },
): MasteryBucket[] {
  const levels = all.map((i) => lvlOf(progress, i.key));
  const tot = Math.max(1, levels.length);
  const buckets: [string, number, string][] = [
    ["New", levels.filter((l) => l === 0).length, colors.pale],
    ["Learning", levels.filter((l) => l > 0 && l < 3).length, colors.learning],
    ["Known", levels.filter((l) => l >= 3 && l < 5).length, colors.known],
    ["Mastered", levels.filter((l) => l === 5).length, colors.mastered],
  ];
  return buckets.map(([label, n, color]) => ({ label, n, pct: Math.round((n / tot) * 100), color }));
}

export interface GroupStat {
  label: string;
  n: string;
  pct: number;
}

export function groupStats(
  all: AllItem[],
  progress: ProgressMap,
  groupLabels: Record<string, string>,
): GroupStat[] {
  return Object.keys(groupLabels).map((g) => {
    const items = all.filter((i) => i.group === g);
    const done = items.filter((i) => lvlOf(progress, i.key) >= 3).length;
    return {
      label: `${g} · ${groupLabels[g]}`,
      n: `${done}/${items.length}`,
      pct: items.length ? Math.round((done / items.length) * 100) : 0,
    };
  });
}
