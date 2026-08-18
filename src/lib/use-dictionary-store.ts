"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  loadDictionary,
  mergeDictionary,
  persistDictionary,
  withEntryDeleted,
  withEntryReviewed,
  withEntrySaved,
  type DictionaryData,
  type DictionaryEntry,
} from "./dictionary-store";

interface Store {
  data: DictionaryData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

// A stable empty snapshot for SSR: the server never has access to
// localStorage, so it always renders the "no data yet" state. Returning a
// fresh object here (e.g. by calling loadDictionary() again) would both warn
// ("getServerSnapshot should be cached") and cause a hydration mismatch,
// since React re-invokes this during client hydration and would get the
// user's *real* saved data instead of the empty state the server rendered.
const EMPTY_DATA: DictionaryData = {};

let store: Store | null = null;

function getStore(): Store {
  if (!store) {
    store = { data: loadDictionary(), listeners: new Set(), fetchStarted: false, pushTimer: null };
  }
  return store;
}

function setData(data: DictionaryData) {
  const s = getStore();
  s.data = data;
  persistDictionary(data);
  s.listeners.forEach((l) => l());
}

function subscribe(onStoreChange: () => void) {
  const s = getStore();
  s.listeners.add(onStoreChange);
  return () => s.listeners.delete(onStoreChange);
}

function pushToCloud(data: DictionaryData, onReauthRequired: () => void) {
  fetch("/api/drive/dictionary", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => { if (r.status === 401) onReauthRequired(); })
    .catch(() => { /* best-effort */ });
}

export function useDictionaryStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(subscribe, () => getStore().data, () => EMPTY_DATA);

  // Fetch from Drive on mount (when authenticated)
  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetch("/api/drive/dictionary")
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeDictionary(getStore().data, data);
        setData(merged);
        pushToCloud(merged, refresh);
      })
      .catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  const schedulePush = useCallback(
    (data: DictionaryData) => {
      if (!authenticated) return;
      const s = getStore();
      if (s.pushTimer) clearTimeout(s.pushTimer);
      s.pushTimer = setTimeout(() => pushToCloud(data, refresh), 1500);
    },
    [authenticated, refresh],
  );

  const getEntry = useCallback((key: string) => all[key] ?? null, [all]);

  const saveEntry = useCallback(
    (key: string, entry: Omit<DictionaryEntry, "createdAt" | "updatedAt">) => {
      const next = withEntrySaved(getStore().data, key, entry);
      setData(next);
      schedulePush(next);
    },
    [schedulePush],
  );

  const deleteEntry = useCallback(
    (key: string) => {
      const next = withEntryDeleted(getStore().data, key);
      setData(next);
      schedulePush(next);
    },
    [schedulePush],
  );

  const reviewEntry = useCallback(
    (key: string, ok: boolean) => {
      const next = withEntryReviewed(getStore().data, key, ok);
      setData(next);
      schedulePush(next);
    },
    [schedulePush],
  );

  return { entries: all, getEntry, saveEntry, deleteEntry, reviewEntry };
}
