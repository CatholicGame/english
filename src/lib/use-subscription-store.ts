"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  DEFAULT_SUBSCRIPTION,
  loadSubscription,
  mergeSubscription,
  persistSubscription,
  isUnlocked as computeIsUnlocked,
  trialDaysLeft as computeTrialDaysLeft,
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

/** Fetches the Firestore-backed record and merges it into the local cache.
 * Used both on mount and to re-poll right after returning from a PayOS
 * checkout, where the webhook may land a moment after the redirect does. */
async function fetchFromServer(onReauthRequired: () => void): Promise<void> {
  const res = await fetch("/api/subscription");
  if (res.status === 401) { onReauthRequired(); return; }
  if (!res.ok) throw new Error(`fetch subscription failed: ${res.status}`);
  const { data } = await res.json();
  if (!data) return;
  setData(mergeSubscription(getStore().data, data));
}

export function useSubscriptionStore() {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const subscription = useSyncExternalStore(subscribe, () => getStore().data, () => DEFAULT_SUBSCRIPTION);

  // Fetch from the server on mount (when authenticated)
  useEffect(() => {
    if (authLoading || !authenticated) return;
    const s = getStore();
    if (s.fetchStarted) return;
    s.fetchStarted = true;

    fetchFromServer(refresh).catch(() => { s.fetchStarted = false; });
  }, [authLoading, authenticated, refresh]);

  // No account yet — check the no-login guest trial instead (see src/proxy.ts
  // and src/lib/guest-cookie.ts). Assume active until this resolves, same
  // "don't flash a paywall" reasoning as the loaded/isUnlocked default below.
  const [guestStatus, setGuestStatus] = useState<{ active: boolean; daysLeft: number } | null>(null);
  useEffect(() => {
    if (authLoading || authenticated) return;
    fetch("/api/guest/status")
      .then((res) => res.json())
      .then(setGuestStatus)
      .catch(() => {});
  }, [authLoading, authenticated]);

  // Exposed for the post-PayOS-checkout return flow, which needs to re-poll
  // outside the once-per-mount guard above (the webhook can land a beat after
  // the browser redirect back into the app).
  const refetch = useCallback(() => fetchFromServer(refresh), [refresh]);

  // updatedAt === 0 means we haven't heard from Drive yet on this device (a
  // fresh sign-in with no local cache) — assume unlocked until we know
  // otherwise instead of flashing a paywall at a legitimate trial/paid user.
  const loaded = subscription.updatedAt > 0;
  const isUnlocked = authenticated
    ? (loaded ? computeIsUnlocked(subscription) : true)
    : (guestStatus?.active ?? true);
  const trialDaysLeft = authenticated
    ? (loaded ? computeTrialDaysLeft(subscription) : 0)
    : (guestStatus?.daysLeft ?? 0);

  return { subscription, loaded, isUnlocked, trialDaysLeft, refetch };
}
