"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useAuth } from "./auth-context";
import {
  getNotesFor,
  loadAllNotes,
  mergeNotes,
  persistAllNotes,
  withNoteDeleted,
  withNoteSaved,
  type Note,
  type NotesData,
} from "./notes-store";

interface ModuleStore {
  data: NotesData;
  listeners: Set<() => void>;
  fetchStarted: boolean;
  pushTimer: ReturnType<typeof setTimeout> | null;
}

// One shared store per moduleKey, not per component — a page like the verb
// detail view mounts one NotesList per item, and if each ran its own
// independent fetch/find-or-create against Drive, they'd race and could each
// create their own duplicate Drive file for the same moduleKey. Routing every
// NotesList for a module through this shared store means exactly one GET/PUT
// round-trip happens per module, no matter how many items are on the page.
const stores = new Map<string, ModuleStore>();

function getStore(moduleKey: string): ModuleStore {
  let store = stores.get(moduleKey);
  if (!store) {
    store = { data: loadAllNotes(moduleKey), listeners: new Set(), fetchStarted: false, pushTimer: null };
    stores.set(moduleKey, store);
  }
  return store;
}

function setData(moduleKey: string, data: NotesData) {
  const store = getStore(moduleKey);
  store.data = data;
  persistAllNotes(moduleKey, data);
  store.listeners.forEach((listener) => listener());
}

function subscribe(moduleKey: string, onStoreChange: () => void) {
  const store = getStore(moduleKey);
  store.listeners.add(onStoreChange);
  return () => store.listeners.delete(onStoreChange);
}

function pushToCloud(moduleKey: string, data: NotesData, onReauthRequired: () => void) {
  fetch(`/api/drive/notes?key=${encodeURIComponent(moduleKey)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => {
      if (r.status === 401) onReauthRequired();
    })
    .catch(() => {
      // best-effort — localStorage remains the source of truth
    });
}

/** Loads a module's notes from localStorage immediately, then — once signed
 * in — reconciles with whatever was last synced to Drive. Every save/delete
 * persists locally right away and pushes to Drive on a short debounce. One
 * store per moduleKey (e.g. "listen-a-minute", "collocations-phrasal-verbs"),
 * shared across every component that mounts this hook for that key — items
 * within it are addressed by whatever itemKey the caller chooses. */
export function useNotesStore(moduleKey: string) {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const all = useSyncExternalStore(
    (onStoreChange) => subscribe(moduleKey, onStoreChange),
    () => getStore(moduleKey).data,
    () => loadAllNotes(moduleKey),
  );

  useEffect(() => {
    if (authLoading || !authenticated) return;
    const store = getStore(moduleKey);
    if (store.fetchStarted) return;
    store.fetchStarted = true;

    fetch(`/api/drive/notes?key=${encodeURIComponent(moduleKey)}`)
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (!data) return;
        const merged = mergeNotes(getStore(moduleKey).data, data);
        setData(moduleKey, merged);
        pushToCloud(moduleKey, merged, refresh);
      })
      .catch(() => {
        // offline or not signed in — local state remains authoritative; allow
        // a later mount (e.g. after reconnecting) to retry the fetch
        store.fetchStarted = false;
      });
  }, [authLoading, authenticated, moduleKey, refresh]);

  const schedulePush = useCallback(
    (data: NotesData) => {
      if (!authenticated) return;
      const store = getStore(moduleKey);
      if (store.pushTimer) clearTimeout(store.pushTimer);
      store.pushTimer = setTimeout(() => pushToCloud(moduleKey, data, refresh), 1500);
    },
    [authenticated, moduleKey, refresh],
  );

  const getNotes = useCallback((itemKey: string) => getNotesFor(all, itemKey), [all]);

  const saveNote = useCallback(
    (itemKey: string, note: Note) => {
      const next = withNoteSaved(getStore(moduleKey).data, itemKey, note);
      setData(moduleKey, next);
      schedulePush(next);
    },
    [moduleKey, schedulePush],
  );

  const deleteNote = useCallback(
    (itemKey: string, noteId: string) => {
      const next = withNoteDeleted(getStore(moduleKey).data, itemKey, noteId);
      setData(moduleKey, next);
      schedulePush(next);
    },
    [moduleKey, schedulePush],
  );

  return { getNotes, saveNote, deleteNote };
}
