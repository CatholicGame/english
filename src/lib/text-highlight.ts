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

function buildRegex(term: HighlightTerm): RegExp | null {
  const escaped = escapeRegExp(term.matchText.toLowerCase());
  if (!escaped) return null;
  const pattern = term.type === "translation" ? escaped : `\\b${escaped}\\b`;
  try {
    return new RegExp(pattern, "g");
  } catch {
    return null;
  }
}

/** Scans the whole page for every occurrence of every term. Longer terms are
 * matched first so a multi-word idiom wins over a shorter word inside it. */
export function findHighlightMatches(terms: HighlightTerm[]): HighlightMatch[] {
  if (terms.length === 0 || typeof document === "undefined") return [];

  const { text: corpus, nodes } = buildCorpus(document.body);
  if (!corpus) return [];
  const searchCorpus = corpus.toLowerCase();

  const sorted = [...terms].sort((a, b) => b.matchText.length - a.matchText.length);
  const occupied: Array<[number, number]> = [];
  const overlaps = (start: number, end: number) => occupied.some(([s, e]) => start < e && end > s);

  const matches: HighlightMatch[] = [];
  for (const term of sorted) {
    const regex = buildRegex(term);
    if (!regex) continue;
    let m: RegExpExecArray | null;
    let guard = 0;
    while (matches.length < MAX_MATCHES && guard++ < MAX_MATCHES_PER_TERM && (m = regex.exec(searchCorpus))) {
      const start = m.index;
      const end = start + m[0].length;
      if (m[0].length === 0) { regex.lastIndex++; continue; }
      if (!overlaps(start, end)) {
        const range = rangeFromMatch(nodes, start, end);
        if (range) {
          occupied.push([start, end]);
          matches.push({ range, key: term.key, type: term.type });
        }
      }
    }
    if (matches.length >= MAX_MATCHES) break;
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
