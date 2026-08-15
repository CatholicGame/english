"use client";

import { useState } from "react";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiConversation } from "@/lib/ai-convo-store";
import { AiBandFeedback } from "./AiBandFeedback";
import { ConversationFeedback } from "./ConversationFeedback";
import { Modal } from "./Modal";
import { ShareButton } from "./ShareButton";
import { CopyButton } from "./CopyButton";
import { createShareLink } from "@/lib/share-client";
import type { SharedConvoPayload } from "@/lib/share-payload";

export const INTENT_LABELS: Record<string, string> = {
  cpv_sentence_check: "✍️ Write",
  cpv_paraphrase: "📝 Paraphrase",
  cpv_conversation: "💬 Converse",
  cpv_conversation_preview: "💬 Converse",
  cpv_translate: "🌐 Translate",
  cpv_translate_prompt: "🌐 Translate",
  cpv_translate_batch: "🌐 Translate",
  cpv_translate_batch_review: "🌐 Translate",
  cpv_context_quiz: "🎯 Quiz",
  cpv_example_gen: "📖 Examples",
  cpv_writing_passage: "✍️ Writing",
  cpv_writing_review: "✍️ Writing",
  cielts_vocab_sentence: "🎓 Vocab",
  cielts_writing_feedback: "📝 Writing",
  cielts_speaking_feedback: "🎤 Speaking",
  discussion: "🗣️ Discussion",
  grammar_lookup: "📐 Ngữ pháp",
};

function fmtDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function KeyVocab({ vocab }: { vocab: { word: string; vi: string }[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {vocab.map((v, i) => (
        <span key={i} className="rounded border px-2 py-1 text-[11px] font-bold leading-tight"
          style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}>
          <span className="block">📖 {v.word}</span>
          {v.vi && <span className="block text-[10px] font-normal opacity-80">{v.vi}</span>}
        </span>
      ))}
    </div>
  );
}

/** Batch translation / writing-passage review:
 * { results: [{ok, feedback, corrected, vi?, user?}], items?: [{vi, user}], overall, best?, needsWork?,
 *   keyVocabulary?, usedPhrases?, missedPhrases?, xpEarned }
 * `vi`/`user` come from a separate `items` array for the translate-batch feature, or directly on each
 * result for the writing-passage feature (the model has to do its own sentence alignment there). */
export function BatchReviewContent({ data }: { data: Record<string, unknown> }) {
  const results = data.results as { ok: boolean; feedback?: string; corrected?: string; vi?: string; user?: string }[];
  const items = data.items as { vi: string; user: string }[] | undefined;
  const overall = data.overall as string | undefined;
  const best = data.best as number | undefined;
  const needsWork = data.needsWork as number | undefined;
  const vocab = data.keyVocabulary as { word: string; vi: string }[] | undefined;
  const usedPhrases = data.usedPhrases as string[] | undefined;
  const missedPhrases = data.missedPhrases as string[] | undefined;
  const xpEarned = data.xpEarned as number | undefined;

  return (
    <div className="flex flex-col gap-2">
      {results.map((r, i) => {
        const src = items?.[i] ?? r;
        return (
          <div key={i} className="flex items-start gap-1.5">
            <span>{r.ok ? "✅" : "❌"}</span>
            <div>
              {src?.vi && <p className="text-[11px] text-neutral-500">{src.vi}</p>}
              {src?.user && <p className="italic">Your: {src.user}</p>}
              {r.feedback && <p>{r.feedback}</p>}
              {r.corrected && (
                <p className="flex flex-wrap items-center gap-1.5 italic text-accent-800">
                  <span>→ {r.corrected}</span>
                  <CopyButton text={r.corrected} className="rounded-full border px-2 py-0.5 text-[11px] font-bold not-italic" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
                </p>
              )}
            </div>
          </div>
        );
      })}
      {overall && <p className="mt-1 border-t pt-1.5" style={{ borderColor: "var(--color-divider)" }}>{overall}</p>}
      {(best != null || needsWork != null) && (
        <p className="text-[11px]">
          {best != null && <>⭐ Best: #{best + 1}&nbsp;&nbsp;</>}
          {needsWork != null && <>⚠️ Work on: #{needsWork + 1}</>}
        </p>
      )}
      {vocab && vocab.length > 0 && <KeyVocab vocab={vocab} />}
      {((usedPhrases && usedPhrases.length > 0) || (missedPhrases && missedPhrases.length > 0)) && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {usedPhrases?.map((p, i) => (
            <span key={`used-${i}`} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}>✅ {p}</span>
          ))}
          {missedPhrases?.map((p, i) => (
            <span key={`missed-${i}`} className="rounded-full border px-2 py-0.5 text-[11px] font-bold text-neutral-500" style={{ borderColor: "var(--color-divider)" }}>— {p}</span>
          ))}
        </div>
      )}
      {xpEarned != null && <p className="text-[11px] font-extrabold text-accent">+{xpEarned} XP</p>}
    </div>
  );
}

/** Sentence check / vocab sentence: { correct, grammarOk, naturalOk, feedback, correction, tip, alternative, keyVocabulary } */
function SentenceCheckContent({ data }: { data: Record<string, unknown> }) {
  const correct = data.correct as boolean | undefined;
  const feedback = data.feedback as string | undefined;
  const correction = data.correction as string | undefined;
  const tip = data.tip as string | undefined;
  const alternative = data.alternative as string | undefined;
  const vocab = data.keyVocabulary as { word: string; vi: string }[] | undefined;

  return (
    <div className="flex flex-col gap-1">
      {correct !== undefined && <p className="font-extrabold">{correct ? "✅ Correct!" : "❌ Needs improvement"}</p>}
      {feedback && <p>{feedback}</p>}
      {correction && (
        <p className="flex flex-wrap items-center gap-1.5 italic text-accent-800">
          <span>→ {correction}</span>
          <CopyButton text={correction} className="rounded-full border px-2 py-0.5 text-[11px] font-bold not-italic" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
        </p>
      )}
      {tip && <p className="text-[11px]">💡 {tip}</p>}
      {alternative && <p className="text-[11px]">📝 {alternative}</p>}
      {vocab && vocab.length > 0 && <KeyVocab vocab={vocab} />}
    </div>
  );
}

/** Grammar classification (see GrammarPopup.tsx / ai-prompts.ts `grammarLookup`):
 * { isGrammar, category?, explanation?, example?, note? } */
function GrammarAnalysisContent({ data }: { data: Record<string, unknown> }) {
  const isGrammar = data.isGrammar as boolean;
  const category = data.category as string | undefined;
  const explanation = data.explanation as string | undefined;
  const example = data.example as { en: string; vi: string } | undefined;
  const note = data.note as string | undefined;

  if (!isGrammar) {
    return (
      <div>
        <p className="font-extrabold">📐 Không có cấu trúc ngữ pháp đặc biệt</p>
        {note && <p className="mt-0.5">{note}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {category && <p className="font-extrabold text-accent-800">📐 {category}</p>}
      {explanation && <p>{explanation}</p>}
      {example && (
        <p className="text-[11px] text-neutral-600">
          {example.en} — {example.vi}
        </p>
      )}
    </div>
  );
}

/** Renders an assistant message's saved content. Assistant messages are stored as
 * JSON.stringify(data) — plain-text conversation replies fail to JSON.parse and
 * fall through to raw text. */
export function AiHistoryMessage({ content }: { content: string }) {
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }
  if (typeof data !== "object" || data === null) {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }
  const obj = data as Record<string, unknown>;
  if (Array.isArray(obj.results)) return <BatchReviewContent data={obj} />;
  if (obj.overallBand !== undefined) return <AiBandFeedback loading={false} result={obj} error={null} />;
  if (obj.isGrammar !== undefined) return <GrammarAnalysisContent data={obj} />;
  if (obj.feedback !== undefined || obj.correction !== undefined || obj.correct !== undefined) {
    return <SentenceCheckContent data={obj} />;
  }
  return <pre className="whitespace-pre-wrap text-[11px]">{JSON.stringify(obj, null, 2)}</pre>;
}

interface Props {
  moduleKey: string;
  itemKey: string;
  filterIntent?: string;
  onContinue?: (convo: AiConversation) => void;
  /** id of the conversation currently open for live practicing, if any — hides
   * "Continue this conversation" for that record so it can't be reopened on itself. */
  activeConvoId?: string | null;
}

/** End-of-conversation evaluations are appended as a regular assistant message
 * (see `endAndFeedback`) so they persist across refresh, but they aren't a chat
 * turn — this shape check lets history separate "what was said" from "how it went". */
function parseFeedbackContent(content: string): Record<string, unknown> | null {
  try {
    const d = JSON.parse(content);
    if (d && typeof d === "object" && (d.phrasesOk !== undefined || d.turns !== undefined || d.style !== undefined)) {
      return d as Record<string, unknown>;
    }
  } catch {
    // not JSON — an ordinary chat reply
  }
  return null;
}

/** Most recent feedback for a conversation (a re-continued conversation can be
 * ended more than once). */
function findFeedback(c: AiConversation): Record<string, unknown> | null {
  for (let i = c.messages.length - 1; i >= 0; i--) {
    const f = c.messages[i].role === "assistant" ? parseFeedbackContent(c.messages[i].content) : null;
    if (f) return f;
  }
  return null;
}

async function buildShareUrl(c: AiConversation): Promise<string> {
  const feedback = findFeedback(c) ?? undefined;
  const messages = feedback ? c.messages.filter((m) => !parseFeedbackContent(m.content)) : c.messages;
  const payload: SharedConvoPayload = {
    kind: "conversation",
    itemLabel: c.itemLabel,
    intent: c.intent,
    messages,
    feedback,
    sharedAt: Date.now(),
  };
  return createShareLink(payload);
}

export function AiConversationHistory({ moduleKey, itemKey, filterIntent, onContinue, activeConvoId }: Props) {
  const { getConvos, deleteConversation, clearAllForItem } = useAiConvoStore(moduleKey);
  const allConvos = getConvos(itemKey);
  const convos = filterIntent ? allConvos.filter(c => c.intent === filterIntent) : allConvos;
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [viewingFeedback, setViewingFeedback] = useState<AiConversation | null>(null);

  if (convos.length === 0) return null;

  return (
    <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="label-xs text-neutral-600">📚 History ({convos.length})</span>
        {!confirmClear ? (
          <button
            className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
            style={{ borderColor: "var(--color-divider)", color: "var(--color-neutral-600)" }}
            onClick={() => setConfirmClear(true)}
          >
            🗑️ Clear all
          </button>
        ) : (
          <span className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-accent-800">Sure?</span>
            <button
              className="rounded-full border px-2 py-0.5 text-[11px] font-extrabold"
              style={{ borderColor: "var(--color-accent-800)", background: "var(--color-accent-800)", color: "#fff" }}
              onClick={() => { clearAllForItem(itemKey); setConfirmClear(false); }}
            >
              Yes
            </button>
            <button
              className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
              style={{ borderColor: "var(--color-divider)", color: "var(--color-text)" }}
              onClick={() => setConfirmClear(false)}
            >
              No
            </button>
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {convos.map((c) => {
          const feedback = findFeedback(c);
          const displayMessages = feedback ? c.messages.filter((m) => !parseFeedbackContent(m.content)) : c.messages;
          return (
          <div key={c.id} className="rounded border p-2.5" style={{ borderColor: "var(--color-divider)" }}>
            <div className="flex items-center justify-between">
              <button
                className="text-[12px] font-extrabold text-left hover:text-accent"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                {INTENT_LABELS[c.intent] || c.intent} · {fmtDate(c.createdAt)}
              </button>
              <span className="flex items-center gap-2">
                {feedback && (
                  <button
                    className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
                    style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}
                    onClick={() => setViewingFeedback(c)}
                  >
                    🎯 Feedback
                  </button>
                )}
                <ShareButton
                  className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
                  style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
                  title={c.itemLabel}
                  text={`${INTENT_LABELS[c.intent] || c.intent} · ${c.itemLabel}`}
                  getUrl={() => buildShareUrl(c)}
                  getImageUrl={(url) => `${url}/card`}
                  label="Share"
                />
                {confirmDeleteId === c.id ? (
                  <span className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-accent-800">Sure?</span>
                    <button
                      className="rounded-full border px-2 py-0.5 text-[11px] font-extrabold"
                      style={{ borderColor: "var(--color-accent-800)", background: "var(--color-accent-800)", color: "#fff" }}
                      onClick={() => { deleteConversation(itemKey, c.id); setConfirmDeleteId(null); }}
                    >
                      Yes
                    </button>
                    <button
                      className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
                      style={{ borderColor: "var(--color-divider)", color: "var(--color-text)" }}
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      No
                    </button>
                  </span>
                ) : (
                  <button
                    className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
                    style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}
                    onClick={() => setConfirmDeleteId(c.id)}
                    title="Delete"
                  >
                    🗑️ Delete
                  </button>
                )}
              </span>
            </div>
            {c.messages.length > 0 && (
              <p className="mt-1 truncate text-[11px] text-neutral-500">
                {c.messages[0].content.slice(0, 80)}...
              </p>
            )}
            {expanded === c.id && (
              <>
                <div className="mt-3 flex max-h-[300px] flex-col gap-2 overflow-y-auto border-t pt-2">
                  {displayMessages.map((m, i) => (
                    <div
                      key={i}
                      className="rounded p-2 text-[12px] leading-relaxed"
                      style={{
                        background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)",
                        alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <span className="label-xs mb-0.5 block">
                        {m.role === "user" ? "You" : m.role === "assistant" ? "AI" : "System"}
                      </span>
                      {m.role === "assistant" ? <AiHistoryMessage content={m.content} /> : <p className="whitespace-pre-wrap">{m.content}</p>}
                    </div>
                  ))}
                </div>
                {(c.intent === "cpv_conversation" || c.intent === "discussion" || c.intent === "grammar_lookup") &&
                  onContinue &&
                  c.id !== activeConvoId && (
                  <button
                    className="btn btn-primary mt-2 w-full px-3 py-1.5 text-[12px] font-extrabold"
                    onClick={() => { setExpanded(null); onContinue(c); }}
                  >
                    💬 Continue this conversation
                  </button>
                )}
              </>
            )}
          </div>
          );
        })}
      </div>
      {viewingFeedback && (() => {
        const feedback = findFeedback(viewingFeedback);
        if (!feedback) return null;
        const displayMessages = viewingFeedback.messages.filter((m) => !parseFeedbackContent(m.content));
        return (
          <Modal onClose={() => setViewingFeedback(null)}>
            <div className="mb-3">
              <span className="label-xs text-neutral-500">{INTENT_LABELS[viewingFeedback.intent] || viewingFeedback.intent}</span>
              <h3 className="text-[14px] font-extrabold">{viewingFeedback.itemLabel}</h3>
            </div>
            <ConversationFeedback
              messages={displayMessages}
              feedback={feedback}
              share={{
                title: viewingFeedback.itemLabel,
                text: `${INTENT_LABELS[viewingFeedback.intent] || viewingFeedback.intent} · ${viewingFeedback.itemLabel}`,
                getUrl: () => buildShareUrl(viewingFeedback),
                getImageUrl: (url) => `${url}/card`,
              }}
            />
          </Modal>
        );
      })()}
    </div>
  );
}