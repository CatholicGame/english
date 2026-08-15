"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  DEFAULT_SUBSCRIPTION,
  loadSubscription,
  mergeSubscription,
  persistSubscription,
  type SubscriptionData,
} from "./subscription-store";

interface Store {
  data: SubscriptionData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
}

let store: Store | null = null;

function getStore(): Store {
  if (!store) {
    store = { data: loadSubscription(), listeners: new Set(), fetchStarted: false };
  }
  return store;
}

function setData(data: SubscriptionData) {
  const s = getStore();
  s.data = data;
  persistSubscription(data);
  s.listeners.forEach((l) => l());
}

function subscribe(onStoreChange: () => void) {
  const s = getStore();
  s.listeners.add(onStoreChange);
  return () => s.listeners.delete(onStoreChange);
}

export function useSubscriptionStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const subscription = useSyncExternalStore(subscribe, () => getStore().data, () => DEFAULT_SUBSCRIPTION);

  // Fetch from Drive on mount (when authenticated)
  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetch("/api/drive/subscription")
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeSubscription(getStore().data, data);
        setData(merged);
      })
      .catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  // /api/account/activate already wrote the record to Drive server-side (it's
  // the source of truth for the grant) — this just mirrors that result into
  // the local cache so the UI updates immediately, without a redundant write.
  const applyServerSubscription = useCallback((data: SubscriptionData) => {
    setData(data);
  }, []);

  return { subscription, isPro: subscription.plan === "pro", applyServerSubscription };
}
