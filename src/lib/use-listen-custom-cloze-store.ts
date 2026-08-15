"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  loadCustomCloze,
  mergeCustomCloze,
  persistCustomCloze,
  withCustomClozeCleared,
  withHiddenWordsSaved,
  type CustomClozeData,
} from "./listen-custom-cloze-store";

interface Store {
  data: CustomClozeData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

// Stable empty snapshot for SSR — see use-dictionary-store.ts for why this
// can't just call loadCustomCloze() again (hydration mismatch).
const EMPTY_DATA: CustomClozeData = {};

let store: Store | null = null;

function getStore(): Store {
  if (!store) {
    store = { data: loadCustomCloze(), listeners: new Set(), fetchStarted: false, pushTimer: null };
  }
  return store;
}

function setData(data: CustomClozeData) {
  const s = getStore();
  s.data = data;
  persistCustomCloze(data);
  s.listeners.forEach((l) => l());
}

function subscribe(onStoreChange: () => void) {
  const s = getStore();
  s.listeners.add(onStoreChange);
  return () => s.listeners.delete(onStoreChange);
}

function pushToCloud(data: CustomClozeData, onReauthRequired: () => void) {
  fetch("/api/drive/listen-custom-cloze", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => { if (r.status === 401) onReauthRequired(); })
    .catch(() => { /* best-effort */ });
}

export function useListenCustomClozeStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(subscribe, () => getStore().data, () => EMPTY_DATA);

  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetch("/api/drive/listen-custom-cloze")
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeCustomCloze(getStore().data, data);
        setData(merged);
      })
      .catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  const schedulePush = useCallback(
    (data: CustomClozeData) => {
      if (!authenticated) return;
      const s = getStore();
      if (s.pushTimer) clearTimeout(s.pushTimer);
      s.pushTimer = setTimeout(() => pushToCloud(data, refresh), 1500);
    },
    [authenticated, refresh],
  );

  const getEntry = useCallback((slug: string) => all[slug] ?? null, [all]);

  const saveHiddenWords = useCallback(
    (slug: string, hiddenWords: number[]) => {
      const next = withHiddenWordsSaved(getStore().data, slug, hiddenWords);
      setData(next);
      schedulePush(next);
    },
    [schedulePush],
  );

  const clearEntry = useCallback(
    (slug: string) => {
      const next = withCustomClozeCleared(getStore().data, slug);
      setData(next);
      schedulePush(next);
    },
    [schedulePush],
  );

  return { entries: all, getEntry, saveHiddenWords, clearEntry };
}
