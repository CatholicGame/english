// Generic local+Drive-synced note store: any module can attach several
// titled free-text notes to an arbitrary itemKey (e.g. a lesson+task pair, or
// a verb+collocation pair). Notes for a whole module are grouped under one
// moduleKey, which maps to one local storage entry and one Drive file.
// Deletions are tracked as tombstones so merging with a stale cloud copy
// can't resurrect a note that was deleted more recently than its last edit.

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export interface NoteBucket {
  notes: Note[];
  tombstones: Record<string, number>;
}

export type NotesData = Record<string, NoteBucket>;

function emptyBucket(): NoteBucket {
  return { notes: [], tombstones: {} };
}

function localStorageKey(moduleKey: string): string {
  return `${moduleKey}:notes`;
}

export function loadAllNotes(moduleKey: string): NotesData {
  try {
    const raw = localStorage.getItem(localStorageKey(moduleKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistAllNotes(moduleKey: string, data: NotesData) {
  try {
    localStorage.setItem(localStorageKey(moduleKey), JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota) — notes just won't persist locally
  }
}

export function getNotesFor(all: NotesData, itemKey: string): Note[] {
  return all[itemKey]?.notes ?? [];
}

export function withNoteSaved(all: NotesData, itemKey: string, note: Note): NotesData {
  const bucket = all[itemKey] ?? emptyBucket();
  const exists = bucket.notes.some((n) => n.id === note.id);
  const notes = exists ? bucket.notes.map((n) => (n.id === note.id ? note : n)) : [...bucket.notes, note];
  return { ...all, [itemKey]: { ...bucket, notes } };
}

export function withNoteDeleted(all: NotesData, itemKey: string, noteId: string): NotesData {
  const bucket = all[itemKey] ?? emptyBucket();
  return {
    ...all,
    [itemKey]: {
      notes: bucket.notes.filter((n) => n.id !== noteId),
      tombstones: { ...bucket.tombstones, [noteId]: Date.now() },
    },
  };
}

/** Union-merges two copies of a module's notes (e.g. this device's local copy
 * and the last copy pushed to Drive from another device), keeping the newer
 * edit of each note and honouring whichever side deleted a note more recently. */
export function mergeNotes(local: NotesData, cloud: NotesData): NotesData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: NotesData = {};
  for (const key of keys) {
    const a = local[key] ?? emptyBucket();
    const b = cloud[key] ?? emptyBucket();
    const tombstones: Record<string, number> = { ...a.tombstones };
    for (const [id, t] of Object.entries(b.tombstones)) {
      tombstones[id] = Math.max(tombstones[id] ?? 0, t);
    }
    const noteMap = new Map<string, Note>();
    for (const n of [...a.notes, ...b.notes]) {
      const existing = noteMap.get(n.id);
      if (!existing || n.updatedAt > existing.updatedAt) noteMap.set(n.id, n);
    }
    const notes = [...noteMap.values()].filter((n) => (tombstones[n.id] ?? 0) < n.updatedAt);
    out[key] = { notes, tombstones };
  }
  return out;
}

export function newNoteId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
