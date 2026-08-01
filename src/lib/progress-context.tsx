"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dayKey } from "./utils";

export interface ProgressEntry {
  l: number;
  t: number;
}
export type ProgressMap = Record<string, ProgressEntry>;
export type DaysMap = Record<string, number>;

interface ProgressState {
  progress: ProgressMap;
  days: DaysMap;
}

interface ProgressContextValue {
  loaded: boolean;
  progress: ProgressMap;
  days: DaysMap;
  lvl: (key: string) => number;
  grade: (key: string, ok: boolean) => void;
  streak: number;
  todayDone: number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadState(storageKey: string): ProgressState {
  let progress: ProgressMap = {};
  let days: DaysMap = {};
  try {
    progress = JSON.parse(localStorage.getItem(`${storageKey}:progress`) || "{}");
  } catch {
    progress = {};
  }
  try {
    days = JSON.parse(localStorage.getItem(`${storageKey}:days`) || "{}");
  } catch {
    days = {};
  }
  return { progress, days };
}

function persistState(storageKey: string, state: ProgressState) {
  try {
    localStorage.setItem(`${storageKey}:progress`, JSON.stringify(state.progress));
    localStorage.setItem(`${storageKey}:days`, JSON.stringify(state.days));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist
  }
}

export function ProgressProvider({
  storageKey,
  children,
}: {
  storageKey: string;
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<ProgressState>({ progress: {}, days: {} });

  useEffect(() => {
    setState(loadState(storageKey));
    setLoaded(true);
  }, [storageKey]);

  const lvl = useCallback((key: string) => state.progress[key]?.l ?? 0, [state.progress]);

  const grade = useCallback(
    (key: string, ok: boolean) => {
      setState((prev) => {
        const cur = prev.progress[key]?.l ?? 0;
        const nextProgress: ProgressMap = {
          ...prev.progress,
          [key]: { l: Math.max(0, Math.min(5, ok ? cur + 1 : cur - 1)), t: Date.now() },
        };
        const k = dayKey(new Date());
        const nextDays: DaysMap = { ...prev.days, [k]: (prev.days[k] || 0) + 1 };
        const next = { progress: nextProgress, days: nextDays };
        persistState(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (state.days[dayKey(d)]) streak++;
    else if (i > 0) break;
  }
  const todayDone = state.days[dayKey(new Date())] || 0;

  const value = useMemo<ProgressContextValue>(
    () => ({ loaded, progress: state.progress, days: state.days, lvl, grade, streak, todayDone }),
    [loaded, state.progress, state.days, lvl, grade, streak, todayDone],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
