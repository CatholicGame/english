"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./auth-context";
import {
  NOTES_STORAGE_KEY,
  getExtensionNotes,
  loadAllNotes,
  mergeExtensionNotes,
  persistAllNotes,
  withNoteDeleted,
  withNoteSaved,
  type ExtensionNote,
  type ExtensionNotesData,
} from "./extension-notes";

function pushToCloud(data: ExtensionNotesData) {
  fetch(`/api/drive/notes?key=${encodeURIComponent(NOTES_STORAGE_KEY)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {
    // best-effort — localStorage remains the source of truth
  });
}

/** Loads extension notes from localStorage immediately, then — once signed
 * in — reconciles with whatever was last synced to Drive, mirroring how
 * ProgressProvider handles progress. Every save/delete persists locally right
 * away and pushes to Drive on a short debounce. */
export function useExtensionNotes() {
  const { loading: authLoading, authenticated } = useAuth();
  const [all, setAll] = useState<ExtensionNotesData>(() => loadAllNotes());
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (authLoading || !authenticated) return;
    let cancelled = false;

    fetch(`/api/drive/notes?key=${encodeURIComponent(NOTES_STORAGE_KEY)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(({ data }) => {
        if (cancelled || !data) return;
        setAll((prev) => {
          const merged = mergeExtensionNotes(prev, data);
          persistAllNotes(merged);
          pushToCloud(merged);
          return merged;
        });
      })
      .catch(() => {
        // offline or not signed in — local state remains authoritative
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, authenticated]);

  const schedulePush = useCallback(
    (data: ExtensionNotesData) => {
      if (!authenticated) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => pushToCloud(data), 1500);
    },
    [authenticated],
  );

  const getNotes = useCallback((slug: string, taskKey: string) => getExtensionNotes(all, slug, taskKey), [all]);

  const saveNote = useCallback(
    (slug: string, taskKey: string, note: ExtensionNote) => {
      setAll((prev) => {
        const next = withNoteSaved(prev, slug, taskKey, note);
        persistAllNotes(next);
        schedulePush(next);
        return next;
      });
    },
    [schedulePush],
  );

  const deleteNote = useCallback(
    (slug: string, taskKey: string, noteId: string) => {
      setAll((prev) => {
        const next = withNoteDeleted(prev, slug, taskKey, noteId);
        persistAllNotes(next);
        schedulePush(next);
        return next;
      });
    },
    [schedulePush],
  );

  return { getNotes, saveNote, deleteNote };
}
