"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  loadDictionary,
  mergeDictionary,
  persistDictionary,
  withEntryDeleted,
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
  const all = useSyncExternalStore(subscribe, () => getStore().data, () => loadDictionary());

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

  return { entries: all, getEntry, saveEntry, deleteEntry };
}
