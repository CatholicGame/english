"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { loadTopics, addCustomTopic, topicForLang } from "@/lib/writing-topics";
import { useUiLang, type UiLang } from "@/lib/i18n";
import { addGlobalXP } from "@/lib/global-score";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiConversation, IntentType } from "@/lib/ai-convo-store";
import { AiConversationHistory, BatchReviewContent } from "@/components/AiConversationHistory";
import { ActionBarScreen, useActionBar } from "@/components/ActionBar";
import { Modal } from "@/components/Modal";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";

const MODULE_KEY = "collocations-phrasal-verbs";
const GROUP_KEYS = ["all", ...Object.keys(GROUP_LABELS)];
const DRAFT_KEY = "cpv-writing-draft";

interface Term {
  term: string;
  en: string;
  vi: string;
}

interface Draft {
  sessionId: string;
  // Conversation id of the pending history record created when the passage was
  // generated — carried through the draft so reloading mid-write and later
  // submitting updates that SAME record instead of leaving an orphaned pending
  // one and creating a second, resolved one.
  cid: string | null;
  topic: string;
  wordCount: number;
  terms: Term[];
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

/** The topic/verb picker + "Generate Passage" action. A separate component
 * (not inlined in WritePage) so useActionBar() attaches to the ActionBarScreen
 * this is rendered inside — a hook can only see a Provider that's already an
 * ancestor in the React tree, not one its own caller is about to render. */
function SelectContent({
  topics, selectedTopic, setSelectedTopic, newTopic, setNewTopic, onAddTopic,
  wordCount, setWordCount, query, setQuery, group, setGroup, listVerbs,
  selected, onToggleVerb, isUnlocked, t, lang, error, loading, onGenerate,
  onContinueWriting, activeCid,
}: {
  onContinueWriting: (convo: AiConversation) => void;
  activeCid: string | null;
  topics: string[];
  selectedTopic: string | null;
  setSelectedTopic: (v: string) => void;
  newTopic: string;
  setNewTopic: (v: string) => void;
  onAddTopic: () => void;
  wordCount: number;
  setWordCount: (v: number) => void;
  query: string;
  setQuery: (v: string) => void;
  group: string;
  setGroup: (v: string) => void;
  listVerbs: typeof VERBS;
  selected: Set<string>;
  onToggleVerb: (verb: string) => void;
  isUnlocked: boolean;
  t: (key: string) => string;
  lang: UiLang;
  error: string | null;
  loading: boolean;
  onGenerate: () => void;
}) {
  const footerContent = (
    <>
      <button
        className="btn btn-primary btn-block px-4 py-2.5 text-[13px] lg:text-[15px] font-extrabold disabled:opacity-40"
        disabled={loading || selected.size === 0 || !selectedTopic}
        onClick={onGenerate}
      >
        {loading ? "Generating..." : "Generate Passage"}
      </button>
      {!loading && (selected.size === 0 || !selectedTopic) && (
        <p className="mt-2 text-center text-[11px] lg:text-[13px] text-neutral-500">
          {!selectedTopic && selected.size === 0
            ? t("write.promptTopicAndGroup")
            : !selectedTopic
              ? t("write.promptTopic")
              : t("write.promptGroup")}
        </p>
      )}
    </>
  );
  useActionBar(footerContent);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 lg:px-6">
      <div className="flex flex-col gap-4">
        <div>
          <span className="label-xs mb-2 block text-neutral-600">Topic</span>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((tp) => (
              <button
                key={tp}
                onClick={() => setSelectedTopic(tp)}
                className="rounded-full px-3 py-1.5 text-[12px] lg:text-[14px] font-bold"
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
              className="input flex-1 text-[12px] lg:text-[14px]"
              placeholder="Add a custom topic..."
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onAddTopic()}
            />
            <button className="btn btn-ghost px-3 text-[12px] lg:text-[14px] font-extrabold" onClick={onAddTopic} disabled={!newTopic.trim()}>
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
          <p className="mb-2 text-[11px] lg:text-[13px] text-neutral-500">{t("write.groupHelp")}</p>
          <input className="input mb-2" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search verb, phrase or meaning" />
          <div className="mb-2 flex gap-1.5 overflow-x-auto">
            {GROUP_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => setGroup(k)}
                className={`flex-none px-3 py-1.5 text-[11px] lg:text-[13px] font-extrabold tracking-wider uppercase ${group === k ? "bg-ink text-bg" : "bg-surface text-ink"}`}
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
                  onClick={() => onToggleVerb(v.verb)}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left ${locked ? "opacity-50 hover:opacity-70" : "hover:bg-surface"}`}
                  style={{ borderBottom: "1px solid var(--color-divider)" }}
                >
                  <span className={`flex h-5 w-5 flex-none items-center justify-center border-2 ${isSel ? "border-accent bg-accent text-bg" : "border-neutral-400"}`}>
                    {isSel && <CheckIcon className="h-3 w-3" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[13px] lg:text-[15px] font-extrabold uppercase tracking-tight">{v.verb}</span>
                      <span className="text-[10px] lg:text-[12px] tracking-wider text-accent">{v.group}</span>
                      {locked && (
                        <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                          <LockIcon />
                          {t("lock.badge")}
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-[11px] lg:text-[13px] text-neutral-600">{v.items.slice(0, 3).map((it) => it.term).join(" · ")}</span>
                  </span>
                  <span className="flex-none text-[11px] lg:text-[13px] tabular-nums text-neutral-500">{v.items.length}</span>
                </button>
              );
            })}
            {listVerbs.length === 0 && <p className="px-3 py-4 text-[12px] lg:text-[14px] text-neutral-500">No match.</p>}
          </div>
          <p className="mt-2 text-[11px] lg:text-[13px] text-neutral-500">
            {selected.size} verb group{selected.size === 1 ? "" : "s"} selected. The AI will pick whichever expressions fit the passage best.
          </p>
        </div>

        {error && (
          <div className="rounded bg-accent-100 p-4 text-[13px] lg:text-[15px] leading-relaxed text-accent-800">
            <p className="font-extrabold">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <AiConversationHistory
          moduleKey={MODULE_KEY}
          itemKey="__writing__"
          filterIntent="cpv_writing_passage"
          onContinue={onContinueWriting}
          activeConvoId={activeCid}
        />
      </div>
    </div>
  );
}

/** The generated passage + translation textarea + "Submit & Get Feedback"
 * action, rendered inside the full-screen writing overlay. Same
 * separate-component-for-useActionBar reasoning as SelectContent above. */
function WritingContent({
  terms, passage, translation, setTranslation, error, loading, onSubmit,
}: {
  terms: Term[];
  passage: string;
  translation: string;
  setTranslation: (v: string) => void;
  error: string | null;
  loading: boolean;
  onSubmit: () => void;
}) {
  const footerContent = (
    <>
      {loading && (
        <div className="mb-2 flex items-center gap-2 text-[12px] lg:text-[14px] font-bold text-accent-800">
          <span className="inline-block h-3 w-3 flex-none animate-spin rounded-full border-2 border-accent-800 border-t-transparent" />
          AI is reviewing your writing...
        </div>
      )}
      <button
        className="btn btn-primary btn-block px-4 py-2.5 text-[13px] lg:text-[15px] font-extrabold disabled:opacity-40"
        disabled={loading || !translation.trim()}
        onClick={onSubmit}
      >
        {loading ? "Reviewing..." : "Submit & Get Feedback"}
      </button>
    </>
  );
  useActionBar(footerContent);
  const [showTerms, setShowTerms] = useState(true);

  return (
    // Three independent regions, not one shared page scroll — keywords stay
    // fixed, the passage and the textarea each scroll within their own bounds.
    // min-h-0 is what lets the children actually shrink and scroll instead of
    // overflowing the viewport when the keyboard opens.
    <div className="flex min-h-0 flex-1 flex-col gap-2 px-4 py-3">
      {/* Expanded by default; still collapsible for a passage using many
          phrases (a full verb group's worth) whose expanded row would
          otherwise wrap across 2-3 lines and eat space the passage/textarea need. */}
      <div className="flex-none">
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] lg:text-[13px] font-bold text-accent-800"
          onClick={() => setShowTerms((v) => !v)}
        >
          🔑 {terms.length} target phrase{terms.length === 1 ? "" : "s"}
          <span className="text-[9px] lg:text-[11px]">{showTerms ? "▲" : "▼"}</span>
        </button>
        {showTerms && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {terms.map((t) => (
              <span key={t.term} className="rounded-full border px-2.5 py-1 text-[11px] lg:text-[13px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}>
                {t.term}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="max-h-[calc(var(--real-vh,100vh)*0.3)] flex-none overflow-y-auto rounded bg-accent-100 p-3 text-[13px] lg:text-[15px] leading-relaxed text-accent-800">{passage}</div>

      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        <textarea
          className="input min-h-0 flex-1 resize-none overflow-y-auto lg:text-[16px]"
          placeholder="Translate the passage into English..."
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
        <p className="flex-none text-[11px] lg:text-[13px] text-neutral-500">
          {translation.trim() ? translation.trim().split(/\s+/).length : 0} words · 💾 Draft is saved automatically
        </p>

        {error && (
          <div className="flex-none rounded bg-accent-100 p-4 text-[13px] lg:text-[15px] leading-relaxed text-accent-800">
            <p className="font-extrabold">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WritePage() {
  const router = useRouter();
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const { isUnlocked } = useSubscriptionStore();
  const { lang, t } = useUiLang();
  const [writing, setWriting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPurchase, setShowPurchase] = useState(false);

  // Topic/verb picker
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [wordCount, setWordCount] = useState(100);

  // In-progress writing attempt
  const [sessionId, setSessionId] = useState("");
  const [cid, setCid] = useState<string | null>(null);
  const [terms, setTerms] = useState<Term[]>([]);
  const [passage, setPassage] = useState("");
  const [translation, setTranslation] = useState("");

  // Result popup — shown right after submit; past results are reopened the
  // same way from History (AiConversationHistory has its own view-record popup).
  const [resultModal, setResultModal] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setTopics(loadTopics());
    const draft = loadDraft();
    if (draft) {
      setSessionId(draft.sessionId);
      setCid(draft.cid ?? null);
      setSelectedTopic(draft.topic);
      setWordCount(draft.wordCount);
      setTerms(draft.terms);
      setPassage(draft.passage);
      setTranslation(draft.translation);
      setWriting(true);
    }
  }, []);

  // Debounced draft auto-save while writing
  useEffect(() => {
    if (!writing) return;
    const timer = setTimeout(() => {
      saveDraft({ sessionId, cid, topic: selectedTopic ?? "", wordCount, terms, passage, translation });
    }, 800);
    return () => clearTimeout(timer);
  }, [writing, sessionId, cid, selectedTopic, wordCount, terms, passage, translation]);

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
      const finalTerms = chosen.length > 0 ? chosen : pool;
      setTerms(finalTerms);
      setPassage(d.passage);
      setTranslation("");
      setSessionId(newSessionId());
      // Saved immediately (not just on submit) so an attempt that's generated
      // but never finished still shows up in History — flagged "unresolved"
      // (see isWritingUnresolved in AiConversationHistory.tsx) until submit()
      // appends a review to this same conversation.
      const newCid = appendMessages(
        "__writing__",
        `Viết: ${selectedTopic} (${finalTerms.map((tm) => tm.term).join(", ")})`,
        null,
        "cpv_writing_passage",
        [{ role: "assistant", content: JSON.stringify({ passage: d.passage, terms: finalTerms, topic: selectedTopic, wordCount }), timestamp: Date.now() }],
      );
      setCid(newCid);
      setWriting(true);
    }
  }, [selected, selectedTopic, wordCount, lang, appendMessages]);

  const submit = useCallback(async () => {
    if (!translation.trim()) return;
    const d = await callAi("cpv_writing_review", { terms, passage, translation: translation.trim() });
    if (d) {
      const results = Array.isArray(d.results) ? (d.results as { ok: boolean }[]) : [];
      const usedPhrases = Array.isArray(d.usedPhrases) ? (d.usedPhrases as string[]) : [];
      const xpEarned = results.reduce((sum, r) => sum + (r.ok ? 10 : 2), 0) + usedPhrases.length * 5;
      const enriched = { ...d, xpEarned };
      addGlobalXP(xpEarned);
      clearDraft();
      appendMessages(
        "__writing__",
        `Viết: ${selectedTopic ?? ""} (${terms.map((tm) => tm.term).join(", ")})`,
        cid,
        "cpv_writing_passage",
        [
          { role: "user", content: translation.trim(), timestamp: Date.now() },
          { role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() },
        ],
      );
      setWriting(false);
      setResultModal(enriched);
    }
  }, [translation, terms, passage, selectedTopic, cid, appendMessages]);

  // Reopens the writing overlay on an unresolved (not-yet-submitted) history
  // record — see AiConversationHistory's "✍️ Continue writing" button. The
  // passage/terms/topic/wordCount were persisted on generate(); translation
  // resumes from the local draft only if it's for this same conversation
  // (otherwise it belongs to a different, now-abandoned attempt).
  const resumeWriting = useCallback(
    (convo: AiConversation) => {
      const first = convo.messages.find((m) => m.role === "assistant");
      if (!first) return;
      let parsed: { passage?: string; terms?: Term[]; topic?: string; wordCount?: number };
      try {
        parsed = JSON.parse(first.content);
      } catch {
        return;
      }
      if (!parsed.passage || !Array.isArray(parsed.terms)) return;
      const existingDraft = loadDraft();
      setCid(convo.id);
      setSelectedTopic(parsed.topic ?? selectedTopic);
      setWordCount(parsed.wordCount ?? wordCount);
      setTerms(parsed.terms);
      setPassage(parsed.passage);
      setTranslation(existingDraft?.cid === convo.id ? existingDraft.translation : "");
      setSessionId(existingDraft?.cid === convo.id ? existingDraft.sessionId : newSessionId());
      setError(null);
      setWriting(true);
    },
    [selectedTopic, wordCount],
  );

  function discardDraft() {
    clearDraft();
    setWriting(false);
    setCid(null);
    setSelected(new Set());
    setError(null);
  }

  function closeResult() {
    setResultModal(null);
    // Same as the old "Write another" button: clear the picked verbs (topic
    // stays) so the next attempt starts from a clean selection.
    setSelected(new Set());
  }

  // ponytail: fixed inset-0 + fullViewport, same fix as the Cambridge /
  // Grammar in Use exercise screens - avoids ActionBarScreen's non-fullViewport
  // height calc, which assumed AppHeader is exactly 3rem and drifted under zoom.
  return (
    <>
      <div className="fixed inset-0 z-[60] bg-bg">
        <div className="mx-auto h-full max-w-[480px] lg:max-w-[min(90vw,2400px)]">
          <ActionBarScreen
            fullViewport
            header={
              <div className="flex flex-none items-center justify-between px-4 pt-4 pb-1 lg:px-6 lg:pt-6">
                <h1 className="text-[26px]">✍️ Write</h1>
                <button className="text-[11px] lg:text-[13px] font-bold text-accent-800 underline hover:text-accent" onClick={() => router.back()}>
                  Back
                </button>
              </div>
            }
          >
            <SelectContent
              topics={topics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              newTopic={newTopic}
              setNewTopic={setNewTopic}
              onAddTopic={handleAddTopic}
              wordCount={wordCount}
              setWordCount={setWordCount}
              query={query}
              setQuery={setQuery}
              group={group}
              setGroup={setGroup}
              listVerbs={listVerbs}
              selected={selected}
              onToggleVerb={toggleVerb}
              isUnlocked={isUnlocked}
              t={t}
              lang={lang}
              error={writing ? null : error}
              loading={loading && !writing}
              onGenerate={generate}
              onContinueWriting={resumeWriting}
              activeCid={writing ? cid : null}
            />
          </ActionBarScreen>
        </div>
      </div>

      {writing && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto h-full max-w-[480px] lg:max-w-[min(90vw,2400px)]">
            <ActionBarScreen
              fullViewport
              header={
                <div className="flex flex-none items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--color-divider)" }}>
                  <span className="text-[12px] lg:text-[14px] text-neutral-600">
                    Topic: <span className="font-extrabold text-ink">{topicForLang(selectedTopic ?? "", lang)}</span> · ~{wordCount} words
                  </span>
                  <button className="text-[11px] lg:text-[13px] font-bold text-accent-800 underline hover:text-accent" onClick={discardDraft}>
                    Close
                  </button>
                </div>
              }
            >
              <WritingContent
                terms={terms}
                passage={passage}
                translation={translation}
                setTranslation={setTranslation}
                error={error}
                loading={loading}
                onSubmit={submit}
              />
            </ActionBarScreen>
          </div>
        </div>
      )}

      {resultModal && (
        <Modal onClose={closeResult}>
          <div className="mb-3">
            <span className="label-xs text-neutral-500">✍️ Write</span>
            <h3 className="text-[14px] lg:text-[16px] font-extrabold">📝 Results</h3>
          </div>
          <BatchReviewContent data={resultModal} />
          <button className="btn btn-primary btn-block mt-4 px-4 py-2.5 text-[13px] lg:text-[15px] font-extrabold" onClick={closeResult}>
            Done
          </button>
        </Modal>
      )}

      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </>
  );
}
