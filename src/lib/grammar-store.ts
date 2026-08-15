// Personal "grammar dictionary": every sentence/clause the user has sent
// through the Grammar lookup (see GrammarPopup.tsx) is cached here, keyed by
// normalized text — same local+Drive-synced pattern as dictionary-store.ts.
// Unlike the vocab dictionary, entries also carry a `category` (the AI's
// grammar classification, e.g. "Second Conditional") so later lookups can
// surface earlier discussions of the same structure as a reminder.

export interface GrammarEntry {
  /** The exact sentence/clause that was analyzed. */
  text: string;
  /** AI-assigned grammar term, e.g. "Present Perfect Continuous". */
  category: string;
  explanation: string;
  example?: { en: string; vi: string };
  context?: string;
  /** True once the learner has sent at least one follow-up question about it. */
  discussed: boolean;
  createdAt: number;
  updatedAt: number;
}

export type GrammarData = Record<string, GrammarEntry>;

const STORAGE_KEY = "grammar:personal";

export function normalizeGrammarText(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

export function normalizeCategory(c: string): string {
  return c.toLowerCase().trim().replace(/\s+/g, " ");
}

export function loadGrammar(): GrammarData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistGrammar(data: GrammarData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function withEntrySaved(
  all: GrammarData,
  key: string,
  entry: Omit<GrammarEntry, "createdAt" | "updatedAt">,
): GrammarData {
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

export function withEntryDeleted(all: GrammarData, key: string): GrammarData {
  if (!all[key]) return all;
  const next = { ...all };
  delete next[key];
  return next;
}

/** Every OTHER entry sharing the same (normalized) grammar category — used to
 * remind the learner "you've discussed this structure before". */
export function findSimilarByCategory(all: GrammarData, category: string, excludeKey?: string): [string, GrammarEntry][] {
  const target = normalizeCategory(category);
  if (!target) return [];
  return Object.entries(all)
    .filter(([key, e]) => key !== excludeKey && normalizeCategory(e.category) === target)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
}

/** Union-merge cloud and local copies, keeping the newer version of each entry. */
export function mergeGrammar(local: GrammarData, cloud: GrammarData): GrammarData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: GrammarData = {};
  for (const key of keys) {
    const a = local[key];
    const b = cloud[key];
    out[key] = !a ? b : !b ? a : a.updatedAt >= b.updatedAt ? a : b;
  }
  return out;
}
