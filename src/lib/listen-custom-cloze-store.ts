// A learner's own "which words to blank out" pick for a Listen A Minute
// lesson's Gap fill step — alongside the author-authored default cloze
// (lesson.clozeTemplate). Keyed by lesson slug, one shared file for the whole
// module (same local+Drive-synced pattern as dictionary/translations stores).

export interface CustomClozeEntry {
  /** Word-token indices (see cloze.ts tokenizeWords) picked to hide. */
  hiddenWords: number[];
  updatedAt: number;
}

export type CustomClozeData = Record<string, CustomClozeEntry>;

const STORAGE_KEY = "listen-a-minute:custom-cloze";

export function loadCustomCloze(): CustomClozeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistCustomCloze(data: CustomClozeData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function withHiddenWordsSaved(all: CustomClozeData, slug: string, hiddenWords: number[]): CustomClozeData {
  return { ...all, [slug]: { hiddenWords, updatedAt: Date.now() } };
}

export function withCustomClozeCleared(all: CustomClozeData, slug: string): CustomClozeData {
  if (!all[slug]) return all;
  const next = { ...all };
  delete next[slug];
  return next;
}

/** Union-merge cloud and local copies, keeping the newer version per lesson. */
export function mergeCustomCloze(local: CustomClozeData, cloud: CustomClozeData): CustomClozeData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: CustomClozeData = {};
  for (const key of keys) {
    const a = local[key];
    const b = cloud[key];
    out[key] = !a ? b : !b ? a : a.updatedAt >= b.updatedAt ? a : b;
  }
  return out;
}
