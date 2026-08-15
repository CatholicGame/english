"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./auth-context";
import { dayKey } from "./utils";
import { addGlobalXP } from "./global-score";
import { computeStreak } from "./stats";

export interface ProgressEntry {
  l: number;
  t: number;
  nextReview?: number; // timestamp — when this item should be reviewed next (SRS)
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

export function loadState(storageKey: string): ProgressState {
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

export function persistState(storageKey: string, state: ProgressState) {
  try {
    localStorage.setItem(`${storageKey}:progress`, JSON.stringify(state.progress));
    localStorage.setItem(`${storageKey}:days`, JSON.stringify(state.days));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist
  }
}

export function mergeProgress(local: ProgressMap, cloud: ProgressMap): ProgressMap {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: ProgressMap = {};
  for (const k of keys) {
    const a = local[k];
    const b = cloud[k];
    out[k] = !a ? b : !b ? a : a.t >= b.t ? a : b;
  }
  return out;
}

export function mergeDays(local: DaysMap, cloud: DaysMap): DaysMap {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: DaysMap = {};
  for (const k of keys) {
    out[k] = Math.max(local[k] ?? 0, cloud[k] ?? 0);
  }
  return out;
}

function pushToCloud(storageKey: string, state: ProgressState, onReauthRequired: () => void) {
  fetch(`/api/drive/progress?key=${encodeURIComponent(storageKey)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  })
    .then((r) => {
      if (r.status === 401) onReauthRequired();
    })
    .catch(() => {
      // best-effort — localStorage remains the source of truth
    });
}

// SRS intervals in milliseconds
function srsInterval(level: number): number {
  const intervals: Record<number, number> = {
    0: 0,                   // due now
    1: 4 * 60 * 60 * 1000,  // 4 hours
    2: 24 * 60 * 60 * 1000, // 1 day
    3: 3 * 24 * 60 * 60 * 1000, // 3 days
    4: 7 * 24 * 60 * 60 * 1000, // 7 days
    5: 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  return intervals[Math.max(0, Math.min(5, level))] ?? 0;
}

export function ProgressProvider({
  storageKey,
  children,
}: {
  storageKey: string;
  children: React.ReactNode;
}) {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<ProgressState>({ progress: {}, days: {} });
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(loadState(storageKey));
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (authLoading || !authenticated) return;
    let cancelled = false;

    fetch(`/api/drive/progress?key=${encodeURIComponent(storageKey)}`)
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (cancelled || !data) return;
        setState((prev) => {
          const merged: ProgressState = {
            progress: mergeProgress(prev.progress, data.progress ?? {}),
            days: mergeDays(prev.days, data.days ?? {}),
          };
          persistState(storageKey, merged);
          pushToCloud(storageKey, merged, refresh);
          return merged;
        });
      })
      .catch(() => {
        // offline or not signed in — local state remains authoritative
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, authenticated, storageKey, refresh]);

  const lvl = useCallback((key: string) => state.progress[key]?.l ?? 0, [state.progress]);

  const grade = useCallback(
    (key: string, ok: boolean) => {
      setState((prev) => {
        const cur = prev.progress[key]?.l ?? 0;
        const newLvl = Math.max(0, Math.min(5, ok ? cur + 1 : cur - 1));
        const nextProgress: ProgressMap = {
          ...prev.progress,
          [key]: {
            l: newLvl,
            t: Date.now(),
            nextReview: Date.now() + srsInterval(ok ? newLvl : 0),
          },
        };
        const k = dayKey(new Date());
        const nextDays: DaysMap = { ...prev.days, [k]: (prev.days[k] || 0) + 1 };
        const next = { progress: nextProgress, days: nextDays };
        persistState(storageKey, next);

        // Global XP
        addGlobalXP(ok ? 10 : 2);

        if (authenticated) {
          if (pushTimer.current) clearTimeout(pushTimer.current);
          pushTimer.current = setTimeout(() => pushToCloud(storageKey, next, refresh), 3000);
        }

        return next;
      });
    },
    [storageKey, authenticated, refresh],
  );

  const streak = computeStreak(state.days);
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
