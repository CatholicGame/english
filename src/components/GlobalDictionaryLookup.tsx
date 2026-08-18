"use client";

// App-wide "select text to look it up" affordance. Mounted once at the root
// layout so any page's text can be selected to open the same AI-powered
// VocabPopup that used to be wired up only inside the Collocation
// conversation chat. Also runs a highlight engine that re-colors every saved
// vocabulary word/translation wherever it appears on the page, and reopens
// the cached result on tap — with zero DOM mutation, via the CSS Custom
// Highlight API (https://developer.mozilla.org/docs/Web/API/CSS_Custom_Highlight_API).

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useDictionaryStore } from "@/lib/use-dictionary-store";
import { normalizeWord } from "@/lib/dictionary-store";
import { useTranslationStore } from "@/lib/use-translation-store";
import { useGrammarStore } from "@/lib/use-grammar-store";
import { useUiLang } from "@/lib/i18n";
import {
  applyCssHighlights,
  clearCssHighlights,
  findHighlightMatches,
  findMatchAtPoint,
  type HighlightMatch,
  type HighlightTerm,
} from "@/lib/text-highlight";
import { VocabPopup } from "./VocabPopup";
import { GrammarPopup } from "./GrammarPopup";

const MIN_LEN = 2;
const MAX_LEN = 400;
const CONTEXT_MAX_LEN = 400;
const IGNORED_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);
const RESCAN_DEBOUNCE_MS = 400;
const SELECTION_SETTLE_MS = 300;

interface Pill {
  word: string;
  context?: string;
  x: number;
  y: number;
}

function isIgnored(node: Node | null): boolean {
  let el = node instanceof HTMLElement ? node : node?.parentElement ?? null;
  while (el) {
    if (IGNORED_TAGS.has(el.tagName) || el.isContentEditable || el.hasAttribute("data-lookup-ignore")) return true;
    el = el.parentElement;
  }
  return false;
}

function findContext(node: Node | null): string | undefined {
  const el = node instanceof Element ? node : node?.parentElement ?? null;
  const container = el?.closest("p,li,td,th,blockquote,div,span,h1,h2,h3,h4,button,label");
  const text = container?.textContent?.trim();
  return text ? text.slice(0, CONTEXT_MAX_LEN) : undefined;
}

export function GlobalDictionaryLookup() {
  const [pill, setPill] = useState<Pill | null>(null);
  const [active, setActive] = useState<{ kind: "vocab" | "grammar"; word: string; context?: string } | null>(null);
  const pathname = usePathname();
  const { entries: vocabEntries } = useDictionaryStore();
  const { entries: translationEntries } = useTranslationStore();
  const { entries: grammarEntries } = useGrammarStore();
  const matchesRef = useRef<HighlightMatch[]>([]);
  const rescanRef = useRef<() => void>(() => {});
  const { t } = useUiLang();

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() ?? "";
    if (!selection || selection.rangeCount === 0 || text.length < MIN_LEN || text.length > MAX_LEN) return;
    if (isIgnored(selection.anchorNode)) return;

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    setPill({
      word: text,
      context: findContext(selection.anchorNode),
      x: Math.min(Math.max(rect.left + rect.width / 2, 70), window.innerWidth - 70),
      y: Math.min(rect.bottom + 8, window.innerHeight - 60),
    });
  }, []);

  useEffect(() => {
    function onSelectEnd(e: Event) {
      if (isIgnored(e.target as Node)) return;
      // Defer so window.getSelection() reflects the selection that just finished.
      setTimeout(handleSelection, 0);
    }
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (isIgnored(e.target as Node)) return;
      setPill(null);
    }
    document.addEventListener("mouseup", onSelectEnd);
    document.addEventListener("touchend", onSelectEnd);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mouseup", onSelectEnd);
      document.removeEventListener("touchend", onSelectEnd);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [handleSelection]);

  // Mobile text selection (long-press + drag handles) doesn't reliably finish
  // by the time touchend fires — the native selection UI keeps adjusting the
  // range well after that event. `selectionchange` is the one event that
  // fires through every stage of that gesture, so debounce on it as the
  // primary trigger; touchend/mouseup above just make desktop feel snappier.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onSelectionChange() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleSelection, SELECTION_SETTLE_MS);
    }
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
      if (timer) clearTimeout(timer);
    };
  }, [handleSelection]);

  // Re-color every saved vocab word / saved translation wherever it appears,
  // and remember their Ranges so a tap can reopen the cached result.
  useEffect(() => {
    const vocabTerms: HighlightTerm[] = Object.entries(vocabEntries).flatMap(([key, entry]) => {
      const type = entry.category ?? "word";
      const terms: HighlightTerm[] = [{ key, matchText: key, type }];
      for (const syn of entry.synonyms ?? []) {
        if (normalizeWord(syn) !== key) terms.push({ key, matchText: syn, type });
      }
      return terms;
    });
    const translationTerms: HighlightTerm[] = Object.keys(translationEntries).map((key) => ({ key, matchText: key, type: "translation" }));
    const grammarTerms: HighlightTerm[] = Object.entries(grammarEntries).map(([key, entry]) => ({ key, matchText: entry.text, type: "grammar" }));
    const terms = [...vocabTerms, ...translationTerms, ...grammarTerms];

    let timer: ReturnType<typeof setTimeout> | null = null;
    function rescan() {
      const matches = findHighlightMatches(terms);
      matchesRef.current = matches;
      applyCssHighlights(matches);
    }
    rescanRef.current = rescan;
    function scheduleRescan() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(rescan, RESCAN_DEBOUNCE_MS);
    }

    if (terms.length === 0) {
      matchesRef.current = [];
      clearCssHighlights();
      return;
    }

    scheduleRescan();
    const observer = new MutationObserver(scheduleRescan);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [vocabEntries, translationEntries, grammarEntries, pathname]);

  // Tap on a highlighted span (no active drag-selection) reopens the cached result.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (isIgnored(e.target as Node)) return;
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) return;
      // The debounced rescan (RESCAN_DEBOUNCE_MS after the last DOM mutation)
      // can leave matchesRef.current holding stale Range objects whose
      // underlying text node has since been mutated in place by React (e.g.
      // a word list item swapping content) — the Range still auto-tracks
      // that node/offset, so it now silently points at different text than
      // the term it was matched against. Rescanning synchronously right
      // before hit-testing guarantees matches always reflect the live DOM.
      rescanRef.current();
      if (matchesRef.current.length === 0) return;
      const match = findMatchAtPoint(matchesRef.current, e.clientX, e.clientY);
      if (match) {
        setPill(null);
        setActive({ kind: match.type === "grammar" ? "grammar" : "vocab", word: match.key });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => () => clearCssHighlights(), []);

  return (
    <>
      {pill && (
        <div
          data-lookup-ignore
          className="fixed z-[65] flex items-center gap-1 border bg-bg px-3 py-1.5 shadow-lg"
          style={{ left: pill.x, top: pill.y, transform: "translateX(-50%)", borderColor: "var(--color-divider)" }}
        >
          <span className="max-w-[120px] truncate text-[12px] font-extrabold">{pill.word}</span>
          <button
            className="bg-accent px-2.5 py-0.5 text-[11px] font-extrabold whitespace-nowrap text-white"
            onClick={() => { setActive({ kind: "vocab", word: pill.word, context: pill.context }); setPill(null); }}
          >
            {t("lookup.lookup")}
          </button>
          <button
            className="whitespace-nowrap px-2.5 py-0.5 text-[11px] font-extrabold text-white"
            style={{ background: "#00897b" }}
            onClick={() => { setActive({ kind: "grammar", word: pill.word, context: pill.context }); setPill(null); }}
          >
            {t("lookup.grammar")}
          </button>
          <button className="text-[14px] text-neutral-500 hover:text-neutral-700" onClick={() => setPill(null)}>✕</button>
        </div>
      )}
      {active?.kind === "vocab" && <VocabPopup word={active.word} context={active.context} onClose={() => setActive(null)} />}
      {active?.kind === "grammar" && <GrammarPopup text={active.word} context={active.context} onClose={() => setActive(null)} />}
    </>
  );
}
