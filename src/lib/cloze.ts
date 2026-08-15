export type ClozeSegment = { text: string } | { blank: string };

const BLANK_RE = /\{\{(.+?)\}\}/g;

/** Splits a passage authored with `{{answer}}` markers into text/blank segments. */
export function parseCloze(template: string): ClozeSegment[] {
  const segments: ClozeSegment[] = [];
  let last = 0;
  for (const m of template.matchAll(BLANK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) segments.push({ text: template.slice(last, idx) });
    segments.push({ blank: m[1] });
    last = idx + m[0].length;
  }
  if (last < template.length) segments.push({ text: template.slice(last) });
  return segments;
}

/** Resolves every `{{answer}}` marker to its answer — the plain listening script. */
export function renderClozePlain(template: string): string {
  return template.replace(BLANK_RE, "$1");
}

export interface WordToken {
  text: string;
  /** 0-based index among word tokens only (punctuation/whitespace get `null`) —
   * stable regardless of surrounding punctuation, used as the storage key for
   * a learner's own picked words (see listen-custom-cloze-store.ts). */
  wordIndex: number | null;
}

const WORD_RE = /[A-Za-z']+/g;

/** Splits plain text into word / non-word runs, numbering only the words —
 * the building block for letting a learner tap their own words to blank out. */
export function tokenizeWords(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  let last = 0;
  let wordIndex = 0;
  for (const m of text.matchAll(WORD_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push({ text: text.slice(last, idx), wordIndex: null });
    tokens.push({ text: m[0], wordIndex: wordIndex++ });
    last = idx + m[0].length;
  }
  if (last < text.length) tokens.push({ text: text.slice(last), wordIndex: null });
  return tokens;
}

/** Builds a `{{word}}`-marked cloze template (parseable by `parseCloze`) from
 * plain text plus the set of word-token indices a learner picked to hide. */
export function buildClozeTemplate(text: string, hiddenWordIndexes: Set<number>): string {
  return tokenizeWords(text)
    .map((t) => (t.wordIndex !== null && hiddenWordIndexes.has(t.wordIndex) ? `{{${t.text}}}` : t.text))
    .join("");
}
