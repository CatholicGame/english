// Saved passage translations: unlike the personal dictionary (auto-saved on
// every lookup), a translation is only kept here when the user explicitly
// hits "Save" in the popup. Same local+Drive-synced pattern as
// dictionary-store.ts, but a fully separate store/file on Drive.

export interface TranslationEntry {
  text: string;
  translation: string;
  createdAt: number;
  updatedAt: number;
}

export type TranslationData = Record<string, TranslationEntry>;

const STORAGE_KEY = "dictionary:translations";

export function normalizeText(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

export function loadTranslations(): TranslationData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistTranslations(data: TranslationData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function withEntrySaved(
  all: TranslationData,
  key: string,
  entry: Omit<TranslationEntry, "createdAt" | "updatedAt">,
): TranslationData {
  const existing = all[key];
  return {
    ...all,
    [key]: {
      ...entry,
      createdAt: existing?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    },
  };
}

export function withEntryDeleted(all: TranslationData, key: string): TranslationData {
  if (!all[key]) return all;
  const next = { ...all };
  delete next[key];
  return next;
}

/** Union-merge cloud and local copies, keeping the newer version of each entry. */
export function mergeTranslations(local: TranslationData, cloud: TranslationData): TranslationData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: TranslationData = {};
  for (const key of keys) {
    const a = local[key];
    const b = cloud[key];
    out[key] = !a ? b : !b ? a : a.updatedAt >= b.updatedAt ? a : b;
  }
  return out;
}
