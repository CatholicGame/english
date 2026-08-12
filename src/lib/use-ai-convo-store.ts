"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  getConvosFor,
  loadAiConvos,
  mergeAiConvos,
  persistAiConvos,
  withMessagesAppended,
  withConvoDeleted,
  type AiConvoData,
  type AiConversation,
  type AiMessage,
  type IntentType,
} from "./ai-convo-store";

interface ModuleStore {
  data: AiConvoData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

const stores = new Map<string, ModuleStore>();

function getStore(moduleKey: string): ModuleStore {
  let store = stores.get(moduleKey);
  if (!store) {
    store = { data: loadAiConvos(moduleKey), listeners: new Set(), fetchStarted: false, pushTimer: null };
    stores.set(moduleKey, store);
  }
  return store;
}

function setData(moduleKey: string, data: AiConvoData) {
  const store = getStore(moduleKey);
  store.data = data;
  persistAiConvos(moduleKey, data);
  store.listeners.forEach((l) => l());
}

function subscribe(moduleKey: string, onStoreChange: () => void) {
  const store = getStore(moduleKey);
  store.listeners.add(onStoreChange);
  return () => store.listeners.delete(onStoreChange);
}

function pushToCloud(moduleKey: string, data: AiConvoData, onReauthRequired: () => void) {
  fetch(`/api/drive/ai-convos?key=${encodeURIComponent(moduleKey)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => { if (r.status === 401) onReauthRequired(); })
    .catch(() => { /* best-effort */ });
}

export function useAiConvoStore(moduleKey: string) {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(
    (onStoreChange) => subscribe(moduleKey, onStoreChange),
    () => getStore(moduleKey).data,
    () => loadAiConvos(moduleKey),
  );

  // Fetch from Drive on mount (when authenticated)
  useEffect(() => {
    if (authLoading || !authenticated) return;
    const store = getStore(moduleKey);
    if (store.fetchStarted) return;
    store.fetchStarted = true;

    fetch(`/api/drive/ai-convos?key=${encodeURIComponent(moduleKey)}`)
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeAiConvos(getStore(moduleKey).data, data);
        setData(moduleKey, merged);
        pushToCloud(moduleKey, merged, refresh);
      })
      .catch(() => { store.fetchStarted = false; });
  }, [authLoading, authenticated, moduleKey, refresh]);

  const schedulePush = useCallback(
    (data: AiConvoData) => {
      if (!authenticated) return;
      const store = getStore(moduleKey);
      if (store.pushTimer) clearTimeout(store.pushTimer);
      store.pushTimer = setTimeout(() => pushToCloud(moduleKey, data, refresh), 1500);
    },
    [authenticated, moduleKey, refresh],
  );

  const getConvos = useCallback((itemKey: string) => getConvosFor(all, itemKey), [all]);

  const appendMessages = useCallback(
    (itemKey: string, itemLabel: string, convoId: string | null, intent: IntentType, msgs: AiMessage[]) => {
      const next = withMessagesAppended(getStore(moduleKey).data, itemKey, itemLabel, convoId, intent, msgs);
      setData(moduleKey, next);
      schedulePush(next);
      // Return the convo id (new or existing) so caller can continue appending
      const convos = next[itemKey] ?? [];
      return convos[convos.length - 1]?.id ?? null;
    },
    [moduleKey, schedulePush],
  );

  const deleteConversation = useCallback(
    (itemKey: string, convoId: string) => {
      const next = withConvoDeleted(getStore(moduleKey).data, itemKey, convoId);
      setData(moduleKey, next);
      schedulePush(next);
    },
    [moduleKey, schedulePush],
  );

  const clearAllForItem = useCallback(
    (itemKey: string) => {
      const store = getStore(moduleKey);
      const next = { ...store.data };
      delete next[itemKey];
      setData(moduleKey, next);
      schedulePush(next);
    },
    [moduleKey, schedulePush],
  );

  return { conversations: all, getConvos, appendMessages, deleteConversation, clearAllForItem };
}