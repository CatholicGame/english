"use client";

// Cross-module "Tổng quan" data for the home page — the app's 3 practice
// modules each keep their own independent activity log (see progress-context.tsx),
// so there is no single number anywhere for "have I studied today" across all
// of them. This hook merges the 3 logs into one unified streak (a day counts
// if ANY module was used that day) plus each module's own most meaningful
// progress number, so the home page can show one trustworthy picture instead
// of requiring the learner to open each module to piece it together.

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth-context";
import { useDictionaryStore } from "./use-dictionary-store";
import { useSubscriptionStore } from "./use-subscription-store";
import { loadState, persistState, mergeProgress, mergeDays, type ProgressMap, type DaysMap } from "./progress-context";
import { computeStreak, dayBars, dueCount, lvlOf, type DayBar } from "./stats";
import { buildAllItems } from "./flatten";
import { isVerbLocked } from "./content-access";
import { VERBS } from "@/data/basic-verbs";
import { UNITS_META } from "@/data/cambridge-vocabulary-ielts";
import { LISTEN_LESSONS } from "@/data/listen-a-minute";
import { allIdiomItems } from "@/data/idioms";
import { UNITS_META as GRAMMAR_UNITS_META } from "@/data/english-grammar-in-use";

const MODULE_KEYS = {
  collocations: "collocations-phrasal-verbs",
  cambridge: "cambridge-vocabulary-ielts-advanced",
  listen: "listen-a-minute",
  idioms: "idioms",
  grammar: "english-grammar-in-use",
} as const;

type ModuleId = keyof typeof MODULE_KEYS;
type Snapshot = { progress: ProgressMap; days: DaysMap };
type Snapshots = Record<ModuleId, Snapshot>;

function loadAllSnapshots(): Snapshots {
  return {
    collocations: loadState(MODULE_KEYS.collocations),
    cambridge: loadState(MODULE_KEYS.cambridge),
    listen: loadState(MODULE_KEYS.listen),
    idioms: loadState(MODULE_KEYS.idioms),
    grammar: loadState(MODULE_KEYS.grammar),
  };
}

export interface DashboardProgress {
  loaded: boolean;
  streak: number;
  weekBars: DayBar[];
  wordsSaved: number;
  collocationsDue: number;
  cambridgeDone: number;
  cambridgeTotal: number;
  listenDone: number;
  listenTotal: number;
  idiomsLearned: number;
  idiomsTotal: number;
  grammarDone: number;
  grammarTotal: number;
}

export function useDashboardProgress(): DashboardProgress {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const { isUnlocked } = useSubscriptionStore();
  const { entries } = useDictionaryStore();
  const [snapshots, setSnapshots] = useState<Snapshots | null>(null);

  useEffect(() => {
    setSnapshots(loadAllSnapshots());
  }, []);

  // Best-effort refresh from Drive so a device that hasn't opened a given
  // module yet still shows that module's real progress, not just "0".
  useEffect(() => {
    if (authLoading || !authenticated) return;
    let cancelled = false;

    (Object.keys(MODULE_KEYS) as ModuleId[]).forEach((id) => {
      const storageKey = MODULE_KEYS[id];
      fetch(`/api/drive/progress?key=${encodeURIComponent(storageKey)}`)
        .then((r) => {
          if (r.status === 401) refresh();
          return r.ok ? r.json() : Promise.reject(r);
        })
        .then(({ data }) => {
          if (cancelled || !data) return;
          setSnapshots((prev) => {
            const base = prev ?? loadAllSnapshots();
            const merged: Snapshot = {
              progress: mergeProgress(base[id].progress, data.progress ?? {}),
              days: mergeDays(base[id].days, data.days ?? {}),
            };
            persistState(storageKey, merged);
            return { ...base, [id]: merged };
          });
        })
        .catch(() => {
          // offline or not signed in — local snapshot remains authoritative
        });
    });

    return () => {
      cancelled = true;
    };
  }, [authLoading, authenticated, refresh]);

  const unifiedDays = useMemo(() => {
    if (!snapshots) return {} as DaysMap;
    return mergeDays(
      mergeDays(
        mergeDays(mergeDays(snapshots.collocations.days, snapshots.cambridge.days), snapshots.listen.days),
        snapshots.idioms.days,
      ),
      snapshots.grammar.days,
    );
  }, [snapshots]);

  const streak = useMemo(() => computeStreak(unifiedDays), [unifiedDays]);
  const weekBars = useMemo(
    () => dayBars(unifiedDays, 7, 40, "var(--color-accent)", "var(--color-neutral-300)"),
    [unifiedDays],
  );

  const collocationsDue = useMemo(() => {
    if (!snapshots) return 0;
    const unlockedVerbs = VERBS.filter((v) => !isVerbLocked(v.verb, isUnlocked));
    return dueCount(buildAllItems(unlockedVerbs), snapshots.collocations.progress);
  }, [snapshots, isUnlocked]);

  const cambridgeDone = useMemo(() => {
    if (!snapshots) return 0;
    return UNITS_META.filter((u) => lvlOf(snapshots.cambridge.progress, u.slug) > 0).length;
  }, [snapshots]);

  const listenDone = useMemo(() => {
    if (!snapshots) return 0;
    return LISTEN_LESSONS.filter((l) => lvlOf(snapshots.listen.progress, l.slug) > 0).length;
  }, [snapshots]);

  const idiomItems = useMemo(() => allIdiomItems(), []);

  const idiomsLearned = useMemo(() => {
    if (!snapshots) return 0;
    return idiomItems.filter((it) => lvlOf(snapshots.idioms.progress, it.key) >= 3).length;
  }, [snapshots, idiomItems]);

  const grammarDone = useMemo(() => {
    if (!snapshots) return 0;
    return GRAMMAR_UNITS_META.filter((u) => lvlOf(snapshots.grammar.progress, u.slug) > 0).length;
  }, [snapshots]);

  return {
    loaded: snapshots !== null,
    streak,
    weekBars,
    wordsSaved: Object.keys(entries).length,
    collocationsDue,
    cambridgeDone,
    cambridgeTotal: UNITS_META.length,
    listenDone,
    listenTotal: LISTEN_LESSONS.length,
    idiomsLearned,
    idiomsTotal: idiomItems.length,
    grammarDone,
    grammarTotal: GRAMMAR_UNITS_META.length,
  };
}
