"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  loadGrammar,
  mergeGrammar,
  persistGrammar,
  withEntryDeleted,
  withEntrySaved,
  type GrammarData,
  type GrammarEntry,
} from "./grammar-store";

interface Store {
  data: GrammarData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

// Stable empty snapshot for SSR — see use-dictionary-store.ts for why this
// can't just call loadGrammar() again (hydration mismatch).
const EMPTY_DATA: GrammarData = {};

let store: Store | null = null;

function getStore(): Store {
  if (!store) {
    store = { data: loadGrammar(), listeners: new Set(), fetchStarted: false, pushTimer: null };
  }
  return store;
}

function setData(data: GrammarData) {
  const s = getStore();
  s.data = data;
  persistGrammar(data);
  s.listeners.forEach((l) => l());
}

function subscribe(onStoreChange: () => void) {
  const s = getStore();
  s.listeners.add(onStoreChange);
  return () => s.listeners.delete(onStoreChange);
}

function pushToCloud(data: GrammarData, onReauthRequired: () => void) {
  fetch("/api/drive/grammar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => { if (r.status === 401) onReauthRequired(); })
    .catch(() => { /* best-effort */ });
}

export function useGrammarStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(subscribe, () => getStore().data, () => EMPTY_DATA);

  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetch("/api/drive/grammar")
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeGrammar(getStore().data, data);
        setData(merged);
        pushToCloud(merged, refresh);
      })
      .catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  const schedulePush = useCallback(
    (data: GrammarData) => {
      if (!authenticated) return;
      const s = getStore();
      if (s.pushTimer) clearTimeout(s.pushTimer);
      s.pushTimer = setTimeout(() => pushToCloud(data, refresh), 1500);
    },
    [authenticated, refresh],
  );

  const getEntry = useCallback((key: string) => all[key] ?? null, [all]);

  const saveEntry = useCallback(
    (key: string, entry: Omit<GrammarEntry, "createdAt" | "updatedAt">) => {
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
