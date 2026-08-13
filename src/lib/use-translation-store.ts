"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  loadTranslations,
  mergeTranslations,
  persistTranslations,
  withEntryDeleted,
  withEntrySaved,
  type TranslationData,
  type TranslationEntry,
} from "./translation-store";

interface Store {
  data: TranslationData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

let store: Store | null = null;

function getStore(): Store {
  if (!store) {
    store = { data: loadTranslations(), listeners: new Set(), fetchStarted: false, pushTimer: null };
  }
  return store;
}

function setData(data: TranslationData) {
  const s = getStore();
  s.data = data;
  persistTranslations(data);
  s.listeners.forEach((l) => l());
}

function subscribe(onStoreChange: () => void) {
  const s = getStore();
  s.listeners.add(onStoreChange);
  return () => s.listeners.delete(onStoreChange);
}

function pushToCloud(data: TranslationData, onReauthRequired: () => void) {
  fetch("/api/drive/translations", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => { if (r.status === 401) onReauthRequired(); })
    .catch(() => { /* best-effort */ });
}

export function useTranslationStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(subscribe, () => getStore().data, () => loadTranslations());

  // Fetch from Drive on mount (when authenticated)
  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetch("/api/drive/translations")
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeTranslations(getStore().data, data);
        setData(merged);
        pushToCloud(merged, refresh);
      })
      .catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  const schedulePush = useCallback(
    (data: TranslationData) => {
      if (!authenticated) return;
      const s = getStore();
      if (s.pushTimer) clearTimeout(s.pushTimer);
      s.pushTimer = setTimeout(() => pushToCloud(data, refresh), 1500);
    },
    [authenticated, refresh],
  );

  const getEntry = useCallback((key: string) => all[key] ?? null, [all]);

  const saveEntry = useCallback(
    (key: string, entry: Omit<TranslationEntry, "createdAt" | "updatedAt">) => {
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
