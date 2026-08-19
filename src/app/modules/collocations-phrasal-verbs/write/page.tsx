"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { loadTopics, addCustomTopic, topicForLang } from "@/lib/writing-topics";
import { useUiLang } from "@/lib/i18n";
import { addGlobalXP } from "@/lib/global-score";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { IntentType } from "@/lib/ai-convo-store";
import { AiConversationHistory, BatchReviewContent } from "@/components/AiConversationHistory";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";

const MODULE_KEY = "collocations-phrasal-verbs";
const GROUP_KEYS = ["all", ...Object.keys(GROUP_LABELS)];
const DRAFT_KEY = "cpv-writing-draft";

interface Draft {
  sessionId: string;
  topic: string;
  wordCount: number;
  terms: { term: string; en: string; vi: string }[];
  passage: string;
  translation: string;
}

function newSessionId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(draft: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // localStorage unavailable
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // localStorage unavailable
  }
}

const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={`block ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WritePage() {
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const { isUnlocked } = useSubscriptionStore();
  const { lang, t } = useUiLang();
  const [phase, setPhase] = useState<"select" | "write" | "result">("select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPurchase, setShowPurchase] = useState(false);

  // Select phase
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [wordCount, setWordCount] = useState(100);

  // Write phase
  const [sessionId, setSessionId] = useState("");
  const [terms, setTerms] = useState<{ term: string; en: string; vi: string }[]>([]);
  const [passage, setPassage] = useState("");
  const [translation, setTranslation] = useState("");

  // Result phase
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setTopics(loadTopics());
    const draft = loadDraft();
    if (draft) {
      setSessionId(draft.sessionId);
      setSelectedTopic(draft.topic);
      setWordCount(draft.wordCount);
      setTerms(draft.terms);
      setPassage(draft.passage);
      setTranslation(draft.translation);
      setPhase("write");
    }
  }, []);

  // Debounced draft auto-save while writing
  useEffect(() => {
    if (phase !== "write") return;
    const t = setTimeout(() => {
      saveDraft({ sessionId, topic: selectedTopic ?? "", wordCount, terms, passage, translation });
    }, 800);
    return () => clearTimeout(t);
  }, [phase, sessionId, selectedTopic, wordCount, terms, passage, translation]);

  const ql = query.trim().toLowerCase();
  const listVerbs = useMemo(
    () =>
      VERBS.filter((v) => group === "all" || v.group === group).filter(
        (v) =>
          !ql ||
          v.verb.toLowerCase().includes(ql) ||
          v.items.some((it) => it.term.toLowerCase().includes(ql) || it.en.toLowerCase().includes(ql) || it.vi.toLowerCase().includes(ql)),
      ),
    [group, ql],
  );

  function toggleVerb(verb: string) {
    if (isVerbLocked(verb, isUnlocked)) {
      setShowPurchase(true);
      return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(verb)) next.delete(verb);
      else next.add(verb);
      return next;
    });
  }

  function handleAddTopic() {
    const trimmed = newTopic.trim();
    if (!trimmed) return;
    setTopics(addCustomTopic(trimmed));
    setSelectedTopic(trimmed);
    setNewTopic("");
  }

  async function callAi(intent: IntentType, payload: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent, payload }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "AI failed");
      return j.data;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const generate = useCallback(async () => {
    if (!selectedTopic || selected.size === 0) return;
    const chosenVerbs = VERBS.filter((v) => selected.has(v.verb));
    const pool = chosenVerbs.flatMap((v) => v.items.map((it) => ({ term: it.term, en: it.en, vi: it.vi })));
    const d = await callAi("cpv_writing_passage", { pool, topic: topicForLang(selectedTopic, lang), wordCount });
    if (d?.passage) {
      // The AI picks whichever subset of the pool fits the passage best. Resolve
      // its chosen terms back against the pool so we grade against exactly what it used.
      const chosenSet = new Set(Array.isArray(d.chosenPhrases) ? d.chosenPhrases : []);
      const chosen = pool.filter((p) => chosenSet.has(p.term));
      setTerms(chosen.length > 0 ? chosen : pool);
      setPassage(d.passage);
      setTranslation("");
      setSessionId(newSessionId());
      setPhase("write");
    }
  }, [selected, selectedTopic, wordCount]);

  const submit = useCallback(async () => {
    if (!translation.trim()) return;
    const d = await callAi("cpv_writing_review", { terms, passage, translation: translation.trim() });
    if (d) {
      const results = Array.isArray(d.results) ? (d.results as { ok: boolean }[]) : [];
      const usedPhrases = Array.isArray(d.usedPhrases) ? (d.usedPhrases as string[]) : [];
      const xpEarned = results.reduce((sum, r) => sum + (r.ok ? 10 : 2), 0) + usedPhrases.length * 5;
      const enriched = { ...d, xpEarned };
      setResult(enriched);
      setPhase("result");
      addGlobalXP(xpEarned);
      clearDraft();
      appendMessages(
        "__writing__",
        `Viết: ${selectedTopic ?? ""} (${terms.map((t) => t.term).join(", ")})`,
        null,
        "cpv_writing_review",
        [
          { role: "user", content: translation.trim(), timestamp: Date.now() },
          { role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() },
        ],
      );
    }
  }, [translation, terms, passage, selectedTopic, appendMessages]);

  function resetToSelect() {
    setPhase("select");
    setSelected(new Set());
    setResult(null);
    setError(null);
  }

  function discardDraft() {
    clearDraft();
    resetToSelect();
  }

  if (phase === "write") {
    // calc(100dvh - 3rem), not h-dvh: the global AppHeader (src/app/layout.tsx,
    // "sticky top-0 h-12") sits above this page in normal flow and takes up
    // real space a bare h-dvh box doesn't know about — without subtracting it,
    // this box overflows the actual viewport by exactly 3rem and the footer
    // below ends up just past the bottom of the screen.
    // svh, not dvh — see ActionBar.tsx's ActionBarScreen for why: dvh
    // recomputes as the mobile browser's chrome collapses/expands mid-scroll,
    // visibly dragging this box's flex-positioned footer along with it.
    return (
      <div className="flex h-[calc(100svh-3rem)] flex-col overflow-hidden">
        <div className="flex flex-none items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--color-divider)" }}>
          <span className="text-[12px] text-neutral-600">
            Topic: <span className="font-extrabold text-ink">{topicForLang(selectedTopic ?? "", lang)}</span> · ~{wordCount} words
          </span>
          <button className="text-[11px] text-neutral-400 hover:text-accent-800" onClick={discardDraft}>
            Discard, start new
          </button>
        </div>

        {/* Three independent regions, not one shared page scroll — keywords stay
            fixed, the passage and the textarea each scroll within their own bounds.
            min-h-0 on this flex column (and on the textarea wrapper below) is what
            lets the children actually shrink and scroll instead of overflowing the
            viewport when the keyboard opens. */}
        <div className="flex min-h-0 flex-1 flex-col gap-2 px-4 py-3">
          <div className="flex flex-none flex-wrap gap-1.5">
            {terms.map((t) => (
              <span key={t.term} className="rounded-full border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}>
                {t.term}
              </span>
            ))}
          </div>

          <div className="max-h-[30vh] flex-none overflow-y-auto rounded bg-accent-100 p-3 text-[13px] leading-relaxed text-accent-800">{passage}</div>

          <div className="flex min-h-0 flex-1 flex-col gap-1.5">
            <textarea
              className="input min-h-0 flex-1 resize-none overflow-y-auto"
              placeholder="Translate the passage into English..."
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
            <p className="flex-none text-[11px] text-neutral-500">
              {translation.trim() ? translation.trim().split(/\s+/).length : 0} words · 💾 Draft is saved automatically
            </p>

            {error && (
              <div className="flex-none rounded bg-accent-100 p-4 text-[13px] leading-relaxed text-accent-800">
                <p className="font-extrabold">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer, not the end of scrollable content — always visible above
            the keyboard, and doubles as a visible "AI is working" indicator instead
            of a button label the user has to scroll down to notice. */}
        <div
          className="flex-none border-t px-4 pt-3"
          style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)", paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        >
          {loading && (
            <div className="mb-2 flex items-center gap-2 text-[12px] font-bold text-accent-800">
              <span className="inline-block h-3 w-3 flex-none animate-spin rounded-full border-2 border-accent-800 border-t-transparent" />
              AI is reviewing your writing...
            </div>
          )}
          <button
            className="btn btn-primary btn-block px-4 py-2.5 text-[13px] font-extrabold disabled:opacity-40"
            disabled={loading || !translation.trim()}
            onClick={submit}
          >
            {loading ? "Reviewing..." : "Submit & Get Feedback"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "select") {
    // calc(100dvh - 3rem), not h-dvh: the global AppHeader (src/app/layout.tsx,
    // "sticky top-0 h-12") sits above this page in normal flow and takes up
    // real space a bare h-dvh box doesn't know about — without subtracting it,
    // this box overflows the actual viewport by exactly 3rem and the footer
    // below ends up just past the bottom of the screen.
    // svh, not dvh — see ActionBar.tsx's ActionBarScreen for why: dvh
    // recomputes as the mobile browser's chrome collapses/expands mid-scroll,
    // visibly dragging this box's flex-positioned footer along with it.
    return (
      <div className="flex h-[calc(100svh-3rem)] flex-col overflow-hidden">
        <div className="flex-none px-4 pt-4 pb-1 lg:px-6 lg:pt-6">
          <h1 className="text-[26px]">✍️ Write</h1>
        </div>

        {/* min-h-0 is required here: without it, a flex column child defaults to
            min-height:auto (≈ its content's height) and never actually shrinks
            to fit the remaining space, so overflow-y-auto never kicks in — the
            box just grows past the viewport and the whole page scrolls instead,
            dragging the "Generate Passage" footer down with it. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 lg:px-6">
          <div className="flex flex-col gap-4">
            <div>
              <span className="label-xs mb-2 block text-neutral-600">Topic</span>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setSelectedTopic(tp)}
                    className="rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{
                      background: selectedTopic === tp ? "var(--color-accent)" : "var(--color-surface)",
                      color: selectedTopic === tp ? "#fff" : "var(--color-text)",
                      border: selectedTopic === tp ? "none" : "1px solid var(--color-divider)",
                    }}
                  >
                    {topicForLang(tp, lang)}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-1.5">
                <input
                  className="input flex-1 text-[12px]"
                  placeholder="Add a custom topic..."
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
                />
                <button className="btn btn-ghost px-3 text-[12px] font-extrabold" onClick={handleAddTopic} disabled={!newTopic.trim()}>
                  Add
                </button>
              </div>
            </div>

            <div>
              <span className="label-xs mb-1 block text-neutral-600">Length: ~{wordCount} words</span>
              <input
                type="range"
                min={50}
                max={200}
                step={25}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="h-1 w-full accent-[var(--color-accent)]"
                aria-label="Target word count"
              />
            </div>

            <div>
              <span className="label-xs mb-2 block text-neutral-600">Verb groups to draw from</span>
              <p className="mb-2 text-[11px] text-neutral-500">{t("write.groupHelp")}</p>
              <input className="input mb-2" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search verb, phrase or meaning" />
              <div className="mb-2 flex gap-1.5 overflow-x-auto">
                {GROUP_KEYS.map((k) => (
                  <button
                    key={k}
                    onClick={() => setGroup(k)}
                    className={`flex-none px-3 py-1.5 text-[11px] font-extrabold tracking-wider uppercase ${group === k ? "bg-ink text-bg" : "bg-surface text-ink"}`}
                  >
                    {k === "all" ? "All" : k}
                  </button>
                ))}
              </div>
              <div className="max-h-[320px] overflow-y-auto rounded border" style={{ borderColor: "var(--color-divider)" }}>
                {listVerbs.map((v) => {
                  const isSel = selected.has(v.verb);
                  const locked = isVerbLocked(v.verb, isUnlocked);
                  return (
                    <button
                      key={v.verb}
                      onClick={() => toggleVerb(v.verb)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left ${locked ? "opacity-50 hover:opacity-70" : "hover:bg-surface"}`}
                      style={{ borderBottom: "1px solid var(--color-divider)" }}
                    >
                      <span className={`flex h-5 w-5 flex-none items-center justify-center border-2 ${isSel ? "border-accent bg-accent text-bg" : "border-neutral-400"}`}>
                        {isSel && <CheckIcon className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[13px] font-extrabold uppercase tracking-tight">{v.verb}</span>
                          <span className="text-[10px] tracking-wider text-accent">{v.group}</span>
                          {locked && (
                            <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                              <LockIcon />
                              {t("lock.badge")}
                            </span>
                          )}
                        </span>
                        <span className="block truncate text-[11px] text-neutral-600">{v.items.slice(0, 3).map((it) => it.term).join(" · ")}</span>
                      </span>
                      <span className="flex-none text-[11px] tabular-nums text-neutral-500">{v.items.length}</span>
                    </button>
                  );
                })}
                {listVerbs.length === 0 && <p className="px-3 py-4 text-[12px] text-neutral-500">No match.</p>}
              </div>
              <p className="mt-2 text-[11px] text-neutral-500">
                {selected.size} verb group{selected.size === 1 ? "" : "s"} selected. The AI will pick whichever expressions fit the passage best.
              </p>
            </div>

            {error && (
              <div className="rounded bg-accent-100 p-4 text-[13px] leading-relaxed text-accent-800">
                <p className="font-extrabold">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div
          className="flex-none border-t px-4 pt-3 lg:px-6"
          style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)", paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <button
            className="btn btn-primary btn-block px-4 py-2.5 text-[13px] font-extrabold disabled:opacity-40"
            disabled={loading || selected.size === 0 || !selectedTopic}
            onClick={generate}
          >
            {loading ? "Generating..." : "Generate Passage"}
          </button>
          {!loading && (selected.size === 0 || !selectedTopic) && (
            <p className="mt-2 text-center text-[11px] text-neutral-500">
              {!selectedTopic && selected.size === 0
                ? t("write.promptTopicAndGroup")
                : !selectedTopic
                  ? t("write.promptTopic")
                  : t("write.promptGroup")}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 lg:px-6 lg:py-6">
      <h1 className="text-[26px]">✍️ Write</h1>

      {phase === "result" && result && (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-extrabold">📝 Results</p>
          <div className="rounded bg-surface p-3 text-[13px] leading-relaxed">
            <BatchReviewContent data={result} />
          </div>
          <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" onClick={resetToSelect}>
            Write another
          </button>
        </div>
      )}

      <AiConversationHistory moduleKey={MODULE_KEY} itemKey="__writing__" filterIntent="cpv_writing_review" />
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
