// Personal dictionary: every word/phrase the user has looked up (via VocabPopup)
// is cached here, keyed by normalized text. Same local+Drive-synced pattern as
// ai-convo-store.ts, but it's a single global list (not split per module) since
// it's meant to be one shared "my dictionary" across the whole app.

export interface VocabExample {
  en: string;
  vi: string;
}

/** One meaning of a word — kept short and singular, Longman-style, rather
 * than one long paragraph covering every sense at once. */
export interface VocabSense {
  pos?: string;
  vi?: string;
  en?: string;
  example?: VocabExample;
}

export type VocabCategory = "idiom" | "collocation" | "phrasal_verb" | "word";

/** Label + highlight color for each category — single source of truth shared
 * by the highlight engine, the entry badge, and the /dictionary legend. */
export const VOCAB_CATEGORY_META: Record<VocabCategory, { label: string; color: string }> = {
  idiom: { label: "Idiom", color: "#8e24aa" },
  collocation: { label: "Collocation", color: "#1e88e5" },
  phrasal_verb: { label: "Phrasal verb", color: "#43a047" },
  word: { label: "Từ vựng", color: "#f9a825" },
};

export interface VocabEntry {
  word: string;
  ipa?: string;
  category?: VocabCategory;
  senses?: VocabSense[];
  synonyms?: string[];
  /** A short, vivid hook (origin, imagery, collocation, association) meant
   * to help the word stick in memory instead of being learned by rote. */
  memoryTip?: string;
}

export interface DictionaryEntry extends VocabEntry {
  context?: string;
  createdAt: number;
  updatedAt: number;
}

export type DictionaryData = Record<string, DictionaryEntry>;

const STORAGE_KEY = "dictionary:personal";

export function normalizeWord(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

export function loadDictionary(): DictionaryData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistDictionary(data: DictionaryData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function withEntrySaved(
  all: DictionaryData,
  key: string,
  entry: Omit<DictionaryEntry, "createdAt" | "updatedAt">,
): DictionaryData {
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

export function withEntryDeleted(all: DictionaryData, key: string): DictionaryData {
  if (!all[key]) return all;
  const next = { ...all };
  delete next[key];
  return next;
}

/** Union-merge cloud and local copies, keeping the newer version of each entry. */
export function mergeDictionary(local: DictionaryData, cloud: DictionaryData): DictionaryData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: DictionaryData = {};
  for (const key of keys) {
    const a = local[key];
    const b = cloud[key];
    out[key] = !a ? b : !b ? a : a.updatedAt >= b.updatedAt ? a : b;
  }
  return out;
}
