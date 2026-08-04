// Free-text notes a learner writes for themselves against an extension task
// (e.g. their own draft article, research notes, lesson outline). Scoped per
// lesson + task, held in one JSON blob so the whole set can sync to Google
// Drive the same way listen-progress does. Deletions are tracked as
// tombstones so a merge with a stale cloud copy can't resurrect a note that
// was deleted more recently than its last edit.

export interface ExtensionNote {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export interface NoteBucket {
  notes: ExtensionNote[];
  tombstones: Record<string, number>;
}

export type ExtensionNotesData = Record<string, NoteBucket>;

export const NOTES_STORAGE_KEY = "listen-a-minute";
const LOCAL_KEY = "listen-a-minute:extension-notes";

function bucketKey(slug: string, taskKey: string): string {
  return `${slug}:${taskKey}`;
}

function emptyBucket(): NoteBucket {
  return { notes: [], tombstones: {} };
}

export function loadAllNotes(): ExtensionNotesData {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistAllNotes(data: ExtensionNotesData) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota) — notes just won't persist locally
  }
}

export function getExtensionNotes(all: ExtensionNotesData, slug: string, taskKey: string): ExtensionNote[] {
  return all[bucketKey(slug, taskKey)]?.notes ?? [];
}

export function withNoteSaved(
  all: ExtensionNotesData,
  slug: string,
  taskKey: string,
  note: ExtensionNote,
): ExtensionNotesData {
  const key = bucketKey(slug, taskKey);
  const bucket = all[key] ?? emptyBucket();
  const exists = bucket.notes.some((n) => n.id === note.id);
  const notes = exists ? bucket.notes.map((n) => (n.id === note.id ? note : n)) : [...bucket.notes, note];
  return { ...all, [key]: { ...bucket, notes } };
}

export function withNoteDeleted(
  all: ExtensionNotesData,
  slug: string,
  taskKey: string,
  noteId: string,
): ExtensionNotesData {
  const key = bucketKey(slug, taskKey);
  const bucket = all[key] ?? emptyBucket();
  return {
    ...all,
    [key]: {
      notes: bucket.notes.filter((n) => n.id !== noteId),
      tombstones: { ...bucket.tombstones, [noteId]: Date.now() },
    },
  };
}

/** Union-merges two copies of the notes data (e.g. this device's local copy and
 * the last copy pushed to Drive from another device), keeping the newer edit
 * of each note and honouring whichever side deleted a note more recently. */
export function mergeExtensionNotes(local: ExtensionNotesData, cloud: ExtensionNotesData): ExtensionNotesData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: ExtensionNotesData = {};
  for (const key of keys) {
    const a = local[key] ?? emptyBucket();
    const b = cloud[key] ?? emptyBucket();
    const tombstones: Record<string, number> = { ...a.tombstones };
    for (const [id, t] of Object.entries(b.tombstones)) {
      tombstones[id] = Math.max(tombstones[id] ?? 0, t);
    }
    const noteMap = new Map<string, ExtensionNote>();
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
