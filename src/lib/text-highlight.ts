// Finds every occurrence of a set of saved terms (vocabulary words or saved
// translations) inside the live DOM, and returns them as Range objects — used
// with the CSS Custom Highlight API so matched text is colored without ever
// mutating the DOM (safe alongside React's own rendering).

import { VOCAB_CATEGORY_META, type VocabCategory } from "./dictionary-store";

export type HighlightType = VocabCategory | "translation";

export interface HighlightTerm {
  /** Key used to reopen the popup for this match (already cached, so no AI call). */
  key: string;
  /** Literal text to search for, matched case-insensitively. */
  matchText: string;
  type: HighlightType;
}

export interface HighlightMatch {
  range: Range;
  key: string;
  type: HighlightType;
}

const TRANSLATION_COLOR = "#607d8b";

function highlightGroupName(type: HighlightType): string {
  return type === "translation" ? "translation-lookup" : `vocab-${type}`;
}

function highlightColor(type: HighlightType): string {
  return type === "translation" ? TRANSLATION_COLOR : VOCAB_CATEGORY_META[type].color;
}

const ALL_HIGHLIGHT_TYPES: HighlightType[] = ["word", "collocation", "phrasal_verb", "idiom", "translation"];

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "SELECT", "NOSCRIPT"]);
const MAX_MATCHES = 500;
const MAX_MATCHES_PER_TERM = 200;

function isSkippedAncestor(el: Element | null): boolean {
  while (el) {
    if (SKIP_TAGS.has(el.tagName) || el.hasAttribute("data-lookup-ignore") || (el as HTMLElement).isContentEditable) return true;
    el = el.parentElement;
  }
  return false;
}

interface CorpusNode {
  node: Text;
  start: number;
  end: number;
}

function buildCorpus(root: Node): { text: string; nodes: CorpusNode[] } {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent) return NodeFilter.FILTER_REJECT;
      if (isSkippedAncestor(node.parentElement)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let text = "";
  const nodes: CorpusNode[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const textNode = n as Text;
    const content = textNode.textContent ?? "";
    const start = text.length;
    text += content;
    nodes.push({ node: textNode, start, end: start + content.length });
  }
  return { text, nodes };
}

function offsetToPosition(nodes: CorpusNode[], offset: number): { node: Text; offset: number } | null {
  for (const n of nodes) {
    if (offset >= n.start && offset <= n.end) return { node: n.node, offset: offset - n.start };
  }
  return null;
}

function rangeFromMatch(nodes: CorpusNode[], start: number, end: number): Range | null {
  const startPos = offsetToPosition(nodes, start);
  const endPos = offsetToPosition(nodes, end);
  if (!startPos || !endPos) return null;
  try {
    const range = document.createRange();
    range.setStart(startPos.node, startPos.offset);
    range.setEnd(endPos.node, endPos.offset);
    return range.collapsed ? null : range;
  } catch {
    return null;
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildTranslationRegex(matchText: string): RegExp | null {
  const escaped = escapeRegExp(matchText.toLowerCase());
  if (!escaped) return null;
  try {
    return new RegExp(escaped, "g");
  } catch {
    return null;
  }
}

// ─── Inflection-tolerant word matching ───────────────────────────
// A vocab term looked up in one inflected form (e.g. "backtracks") should
// also highlight other forms of the same word wherever they appear ("backtrack",
// "backtracked", "backtracking"), not just the exact string that was searched.
// Rather than trying to enumerate every surface form of a term, both the term
// and every candidate word in the page are reduced to the same rough stem —
// if the stems match, so does the word, regardless of which form was looked up.

function collapseDoubledConsonant(s: string): string {
  const last = s[s.length - 1];
  const prev = s[s.length - 2];
  if (s.length >= 3 && last === prev && !"aeiou".includes(last)) return s.slice(0, -1);
  return s;
}

function stripTrailingE(s: string): string {
  return s.length > 2 && s.endsWith("e") ? s.slice(0, -1) : s;
}

export function stemWord(word: string): string {
  let s = word.toLowerCase();
  if (s.length > 4 && (s.endsWith("ies") || s.endsWith("ied"))) return s.slice(0, -3) + "y";
  if (s.length > 5 && s.endsWith("ing")) return stripTrailingE(collapseDoubledConsonant(s.slice(0, -3)));
  if (s.length > 4 && s.endsWith("ed")) return stripTrailingE(collapseDoubledConsonant(s.slice(0, -2)));
  if (s.length > 4 && /(?:[sxz]|ch|sh)es$/.test(s)) return s.slice(0, -2);
  if (s.length > 3 && s.endsWith("s") && !/(?:ss|us|is)$/.test(s)) return stripTrailingE(s.slice(0, -1));
  return stripTrailingE(s);
}

interface Token {
  text: string;
  start: number;
  end: number;
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const re = /[a-z0-9']+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    tokens.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return tokens;
}

/** Scans the whole page for every occurrence of every term. Longer terms are
 * matched first so a multi-word idiom wins over a shorter word inside it.
 * Vocab terms match by word stem (any inflected form); translations still
 * match as a literal substring. */
export function findHighlightMatches(terms: HighlightTerm[]): HighlightMatch[] {
  if (terms.length === 0 || typeof document === "undefined") return [];

  const { text: corpus, nodes } = buildCorpus(document.body);
  if (!corpus) return [];
  const searchCorpus = corpus.toLowerCase();

  const tokens = tokenize(searchCorpus);
  const stemIndex = new Map<string, Token[]>();
  for (const t of tokens) {
    const stem = stemWord(t.text);
    const list = stemIndex.get(stem);
    if (list) list.push(t);
    else stemIndex.set(stem, [t]);
  }

  const sorted = [...terms].sort((a, b) => b.matchText.length - a.matchText.length);
  const occupied: Array<[number, number]> = [];
  const overlaps = (start: number, end: number) => occupied.some(([s, e]) => start < e && end > s);

  const matches: HighlightMatch[] = [];
  const addMatch = (start: number, end: number, term: HighlightTerm) => {
    if (overlaps(start, end)) return;
    const range = rangeFromMatch(nodes, start, end);
    if (!range) return;
    occupied.push([start, end]);
    matches.push({ range, key: term.key, type: term.type });
  };

  for (const term of sorted) {
    if (matches.length >= MAX_MATCHES) break;

    if (term.type === "translation") {
      const regex = buildTranslationRegex(term.matchText);
      if (!regex) continue;
      let m: RegExpExecArray | null;
      let guard = 0;
      while (matches.length < MAX_MATCHES && guard++ < MAX_MATCHES_PER_TERM && (m = regex.exec(searchCorpus))) {
        if (m[0].length === 0) { regex.lastIndex++; continue; }
        addMatch(m.index, m.index + m[0].length, term);
      }
      continue;
    }

    const words = term.matchText.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;
    const wordStems = words.map(stemWord);
    let count = 0;

    if (wordStems.length === 1) {
      const candidates = stemIndex.get(wordStems[0]) ?? [];
      for (const tok of candidates) {
        if (matches.length >= MAX_MATCHES || count++ >= MAX_MATCHES_PER_TERM) break;
        addMatch(tok.start, tok.end, term);
      }
    } else {
      for (let i = 0; i + wordStems.length <= tokens.length; i++) {
        if (matches.length >= MAX_MATCHES || count >= MAX_MATCHES_PER_TERM) break;
        let ok = true;
        for (let j = 0; j < wordStems.length; j++) {
          if (stemWord(tokens[i + j].text) !== wordStems[j]) { ok = false; break; }
          if (j > 0 && !/^\s+$/.test(searchCorpus.slice(tokens[i + j - 1].end, tokens[i + j].start))) { ok = false; break; }
        }
        if (!ok) continue;
        const start = tokens[i].start;
        const end = tokens[i + wordStems.length - 1].end;
        if (overlaps(start, end)) continue;
        addMatch(start, end, term);
        count++;
      }
    }
  }
  return matches;
}

function supportsCustomHighlights(): boolean {
  return typeof CSS !== "undefined" && "highlights" in CSS && typeof (globalThis as { Highlight?: unknown }).Highlight === "function";
}

const STYLE_ELEMENT_ID = "text-highlight-styles";

/** Injects the ::highlight() styling directly into <head>, bypassing the
 * build's CSS pipeline (Lightning CSS doesn't parse ::highlight() yet). Each
 * vocab category + translations gets its own color (VOCAB_CATEGORY_META is
 * the single source of truth, shared with the entry badge/legend). */
function ensureHighlightStyles(): void {
  if (document.getElementById(STYLE_ELEMENT_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ELEMENT_ID;
  style.textContent = ALL_HIGHLIGHT_TYPES.map(
    (type) => `::highlight(${highlightGroupName(type)}){background-color:color-mix(in srgb, ${highlightColor(type)} 32%, transparent);}`,
  ).join("");
  document.head.appendChild(style);
}

export function applyCssHighlights(matches: HighlightMatch[]): void {
  if (!supportsCustomHighlights()) return;
  ensureHighlightStyles();
  const HighlightCtor = (globalThis as unknown as { Highlight: new (...ranges: Range[]) => unknown }).Highlight;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registry = (CSS as any).highlights;
  for (const type of ALL_HIGHLIGHT_TYPES) {
    const ranges = matches.filter((m) => m.type === type).map((m) => m.range);
    if (ranges.length === 0) registry.delete(highlightGroupName(type));
    else registry.set(highlightGroupName(type), new HighlightCtor(...ranges));
  }
}

export function clearCssHighlights(): void {
  if (!supportsCustomHighlights()) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registry = (CSS as any).highlights;
  for (const type of ALL_HIGHLIGHT_TYPES) registry.delete(highlightGroupName(type));
}

function getCaretRangeFromPoint(x: number, y: number): Range | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = document as any;
  if (typeof doc.caretRangeFromPoint === "function") {
    return doc.caretRangeFromPoint(x, y) as Range | null;
  }
  if (typeof doc.caretPositionFromPoint === "function") {
    const pos = doc.caretPositionFromPoint(x, y);
    if (!pos) return null;
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.collapse(true);
    return range;
  }
  return null;
}

export function findMatchAtPoint(matches: HighlightMatch[], x: number, y: number): HighlightMatch | null {
  const pointRange = getCaretRangeFromPoint(x, y);
  if (!pointRange) return null;
  for (const m of matches) {
    try {
      if (m.range.comparePoint(pointRange.startContainer, pointRange.startOffset) === 0) return m;
    } catch {
      // point's node isn't part of this range — not a match
    }
  }
  return null;
}
