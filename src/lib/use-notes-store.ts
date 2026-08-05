"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
 * in — reconciles with whatever was last synced to Drive, mirroring how
 * ProgressProvider handles progress. Every save/delete persists locally right
 * away and pushes to Drive on a short debounce. One store per moduleKey (e.g.
 * "listen-a-minute", "collocations-phrasal-verbs") — items within it are
 * addressed by whatever itemKey the caller chooses. */
export function useNotesStore(moduleKey: string) {
  const { loading: authLoading, authenticated, refresh } = useAuth();
  const [all, setAll] = useState<NotesData>(() => loadAllNotes(moduleKey));
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (authLoading || !authenticated) return;
    let cancelled = false;

    fetch(`/api/drive/notes?key=${encodeURIComponent(moduleKey)}`)
      .then((r) => {
        if (r.status === 401) refresh();
        return r.ok ? r.json() : Promise.reject(r);
      })
      .then(({ data }) => {
        if (cancelled || !data) return;
        setAll((prev) => {
          const merged = mergeNotes(prev, data);
          persistAllNotes(moduleKey, merged);
          pushToCloud(moduleKey, merged, refresh);
          return merged;
        });
      })
      .catch(() => {
        // offline or not signed in — local state remains authoritative
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, authenticated, moduleKey, refresh]);

  const schedulePush = useCallback(
    (data: NotesData) => {
      if (!authenticated) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => pushToCloud(moduleKey, data, refresh), 1500);
    },
    [authenticated, moduleKey, refresh],
  );

  const getNotes = useCallback((itemKey: string) => getNotesFor(all, itemKey), [all]);

  const saveNote = useCallback(
    (itemKey: string, note: Note) => {
      setAll((prev) => {
        const next = withNoteSaved(prev, itemKey, note);
        persistAllNotes(moduleKey, next);
        schedulePush(next);
        return next;
      });
    },
    [moduleKey, schedulePush],
  );

  const deleteNote = useCallback(
    (itemKey: string, noteId: string) => {
      setAll((prev) => {
        const next = withNoteDeleted(prev, itemKey, noteId);
        persistAllNotes(moduleKey, next);
        schedulePush(next);
        return next;
      });
    },
    [moduleKey, schedulePush],
  );

  return { getNotes, saveNote, deleteNote };
}
