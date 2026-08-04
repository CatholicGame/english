// Free-text notes a learner writes for themselves against an extension task
// (e.g. their own draft article, research notes, lesson outline). Scoped per
// lesson + task so each unit's tasks keep separate note lists, persisted
// locally only — these are personal drafts, not progress data that needs
// cloud sync. Each task can hold several titled notes.

export interface ExtensionNote {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

const PREFIX = "listen-a-minute:extension-notes:";

function storageKey(slug: string, taskKey: string): string {
  return `${PREFIX}${slug}:${taskKey}`;
}

export function getExtensionNotes(slug: string, taskKey: string): ExtensionNote[] {
  try {
    const raw = localStorage.getItem(storageKey(slug, taskKey));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExtensionNotes(slug: string, taskKey: string, notes: ExtensionNote[]) {
  try {
    if (notes.length === 0) {
      localStorage.removeItem(storageKey(slug, taskKey));
    } else {
      localStorage.setItem(storageKey(slug, taskKey), JSON.stringify(notes));
    }
  } catch {
    // localStorage unavailable (private mode, quota) — notes just won't persist
  }
}

export function newNoteId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
