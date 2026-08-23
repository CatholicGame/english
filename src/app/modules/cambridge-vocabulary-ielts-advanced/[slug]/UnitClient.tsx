"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCambridgeUnit,
  type FillMcStep,
  type ListeningClozeStep,
  type ReadingTfNgStep,
  type RevealPairsStep,
  type SortStep,
  type SpeakingStep,
  type TypeFillStep,
  type UnitStep,
  type VocabStep,
  type VocabWord,
  type WritingTaskStep,
} from "@/data/cambridge-vocabulary-ielts";
import { parseCloze } from "@/lib/cloze";
import { useProgress } from "@/lib/progress-context";
import { norm, speak } from "@/lib/utils";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiConversation, AiMessage } from "@/lib/ai-convo-store";
import { addGlobalXP } from "@/lib/global-score";
import { AiFeedback } from "@/components/AiFeedback";
import { AiBandFeedback } from "@/components/AiBandFeedback";
import { AiConversationHistory } from "@/components/AiConversationHistory";
import { ChatInput } from "@/components/ChatInput";
import { ConversationFeedback } from "@/components/ConversationFeedback";
import { createShareLink } from "@/lib/share-client";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { useUiLang } from "@/lib/i18n";
import { CopyButton } from "@/components/CopyButton";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isCambridgeUnitLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";
import { WritingChartView } from "@/components/IeltsChart";
import { ActionBarScreen, useActionBar } from "@/components/ActionBar";

const MODULE_KEY = "cambridge-vocabulary-ielts-advanced";

interface Score {
  correct: number;
  total: number;
}

function autoGrow(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

// Debounced localStorage draft persistence, same pattern as the Collocations write page
// (cpv-writing-draft) — keeps in-progress AI-practice text if the student navigates away
// before submitting, so it isn't lost.
function loadDraft<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveDraft(key: string, draft: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // localStorage unavailable
  }
}

function clearDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // localStorage unavailable
  }
}

async function callAi(intent: string, payload: Record<string, unknown>) {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent, payload: { ...payload, aiLang: currentAiLang() } }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || "AI failed");
  return j.data;
}

// ---------- Web Speech API (not in the standard TS DOM lib) ----------

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultLike[];
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | undefined {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition;
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SpeakerIcon({ className = "h-[34px] w-[34px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`block ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[34px] w-[34px]"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 bg-accent-100 px-4 py-3 text-[14px] leading-relaxed text-accent-800">
      <span className="label-xs mb-0.5 block text-accent-700">Test tip</span>
      {children}
    </div>
  );
}

function ContinueButton({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) {
  return (
    <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={onClick}>
      {label}
    </button>
  );
}

// ---------- Vocabulary deep-dive cards ----------

function ChipRow({ label, items, tone }: { label: string; items: string[]; tone: "neutral" | "accent" }) {
  if (!items.length) return null;
  return (
    <div className="mb-3">
      <div className="label-xs mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className="border px-2.5 py-1 text-[14px] font-bold"
            style={
              tone === "accent"
                ? { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" }
                : { borderColor: "var(--color-divider)", background: "var(--color-bg)", color: "var(--color-text)" }
            }
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function IeltsVocabSample({ word }: { word: VocabWord }) {
  const { t } = useUiLang();
  const [paragraph, setParagraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ielts-vocab-sample?term=${encodeURIComponent(word.term)}`);
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "AI failed");
      setParagraph(j.paragraph);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      {!paragraph && (
        <button className="btn btn-secondary" disabled={loading} onClick={load}>
          {loading ? t("unit.sampleLoading") : t("unit.sampleButton")}
        </button>
      )}
      {error && <p className="mt-1.5 text-[13px] text-red-600">{error}</p>}
      {paragraph && (
        <div className="bg-surface p-3 text-[15px] leading-relaxed">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="label-xs text-accent">{t("unit.sampleLabel")}</span>
            <CopyButton
              text={paragraph}
              className="rounded-full border px-2 py-0.5 text-[13px] font-bold"
              style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}
            />
          </div>
          {paragraph}
        </div>
      )}
    </div>
  );
}

type VocabPMode = "write" | "translate" | "converse" | "discussion";

const VOCAB_MODE_LABELS: Record<VocabPMode, string> = {
  write: "Write",
  translate: "Translate",
  converse: "Converse",
  discussion: "Discussion",
};

const VOCAB_INTENT_FOR_MODE: Record<VocabPMode, string> = {
  write: "cielts_vocab_sentence",
  translate: "cpv_translate",
  converse: "cpv_conversation",
  discussion: "discussion",
};

function VocabAiPractice({ word }: { word: VocabWord }) {
  const { t } = useUiLang();
  const ik = word.term;
  const il = `${word.term} (${word.pos})`;
  const writeDraftKey = `${MODULE_KEY}:draft:vocab-write:${word.term}`;
  const translateDraftKey = `${MODULE_KEY}:draft:vocab-translate:${word.term}`;
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const [mode, setMode] = useState<VocabPMode>("write");
  const [cid, setCid] = useState<string | null>(null);

  // Write mode
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const draft = loadDraft<{ sentence: string }>(writeDraftKey);
    if (draft?.sentence) setSentence(draft.sentence);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (sentence.trim()) saveDraft(writeDraftKey, { sentence });
      else clearDraft(writeDraftKey);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence]);

  async function check() {
    if (!sentence.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await callAi("cielts_vocab_sentence", {
        term: word.term,
        pos: word.pos,
        en: word.en,
        usageNote: word.usageNote,
        sentence: sentence.trim(),
      });
      setResult(data);
      const id = appendMessages(ik, il, cid, "cielts_vocab_sentence", [
        { role: "user", content: sentence.trim(), timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(data), timestamp: Date.now() },
      ]);
      if (!cid) setCid(id);
      clearDraft(writeDraftKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setLoading(false);
    }
  }

  // Translate mode
  const [viSentences, setViSentences] = useState<string[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [batchResult, setBatchResult] = useState<Record<string, unknown> | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);

  useEffect(() => {
    const draft = loadDraft<{ viSentences: string[]; translations: string[] }>(translateDraftKey);
    if (draft?.viSentences?.length) {
      setViSentences(draft.viSentences);
      setTranslations(draft.translations ?? new Array(draft.viSentences.length).fill(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (viSentences.length && !batchResult) saveDraft(translateDraftKey, { viSentences, translations });
      else clearDraft(translateDraftKey);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viSentences, translations, batchResult]);

  async function loadTranslate() {
    setViSentences([]);
    setTranslations([]);
    setBatchResult(null);
    setBatchError(null);
    setBatchLoading(true);
    try {
      const d = await callAi("cpv_translate_batch", { term: word.term, vi: word.vi });
      if (d?.sentences) {
        setViSentences(d.sentences);
        setTranslations(new Array(d.sentences.length).fill(""));
      }
    } catch (e) {
      setBatchError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setBatchLoading(false);
    }
  }

  async function submitTranslateBatch() {
    setBatchLoading(true);
    setBatchError(null);
    try {
      const items = viSentences.map((vi, i) => ({ vi, user: translations[i] || "" }));
      const d = await callAi("cpv_translate_batch_review", { term: word.term, en: word.en, items });
      const results = Array.isArray(d.results) ? (d.results as { ok: boolean }[]) : [];
      const xpEarned = results.reduce((sum, r) => sum + (r.ok ? 10 : 2), 0);
      const enriched = { ...d, items, xpEarned };
      setBatchResult(enriched);
      addGlobalXP(xpEarned);
      clearDraft(translateDraftKey);
      appendMessages(ik, il, cid, "cpv_translate", [
        { role: "user", content: "Submitted 5 translations", timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() },
      ]);
    } catch (e) {
      setBatchError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setBatchLoading(false);
    }
  }

  // Converse mode
  const [preview, setPreview] = useState<{ conversation: { speaker: string; text: string }[] } | null>(null);
  const [phase, setPhase] = useState<"idle" | "preview" | "practicing" | "feedback">("idle");
  const [chat, setChat] = useState<AiMessage[]>([]);
  const [chatIn, setChatIn] = useState("");
  const [feedback, setFeedback] = useState<Record<string, unknown> | null>(null);
  const [convLoading, setConvLoading] = useState(false);
  const [chatBusy, setChatBusy] = useState<"send" | "end" | null>(null);
  const [convError, setConvError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  async function loadPreview() {
    setConvLoading(true);
    setConvError(null);
    setPhase("idle");
    try {
      const d = await callAi("cpv_conversation_preview", { terms: [{ term: word.term, en: word.en }] });
      setPreview(d);
      setPhase("preview");
    } catch (e) {
      setConvError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setConvLoading(false);
    }
  }

  async function startPractice() {
    setChat([]);
    setPhase("practicing");
    setFeedback(null);
    setConvLoading(true);
    setConvError(null);
    try {
      const d = await callAi("cpv_conversation", { terms: [{ term: word.term, en: word.en }] });
      const aiText = (d?.content as string | undefined) ?? JSON.stringify(d);
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([am]);
      const newCid = appendMessages(ik, il, null, "cpv_conversation", [am]);
      setCid(newCid);
    } catch (e) {
      setConvError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setConvLoading(false);
    }
  }

  async function sendMessage() {
    if (!chatIn.trim()) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um];
    setChat(nm);
    setChatIn("");
    setChatBusy("send");
    setConvLoading(true);
    setConvError(null);
    const ct = nm.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
    try {
      const d = await callAi("cpv_conversation", { terms: [{ term: word.term, en: word.en }], history: ct });
      const aiText = ((d?.content as string | undefined) ?? "")
        .replace(/\n*```json[\s\S]*?```\n*/g, "")
        .replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "")
        .trim();
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      appendMessages(ik, il, cid, "cpv_conversation", [um, am]);
    } catch (e) {
      setConvError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setChatBusy(null);
      setConvLoading(false);
    }
  }

  async function endAndFeedback() {
    setChatBusy("end");
    setConvLoading(true);
    setConvError(null);
    try {
      const ct = chat.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const d = (await callAi("cpv_conversation", { terms: [{ term: word.term, en: word.en }], history: ct, end: true })) as Record<string, unknown>;
      const xpEarned = d?.phrasesOk ? 20 : 8;
      const enriched = { ...d, xpEarned };
      setFeedback(enriched);
      setPhase("feedback");
      addGlobalXP(xpEarned);
      appendMessages(ik, il, cid, "cpv_conversation", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
    } catch (e) {
      setConvError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setChatBusy(null);
      setConvLoading(false);
    }
  }

  const handleContinue = useCallback((convo: AiConversation) => {
    setCid(convo.id);
    setMode("converse");
    setPhase("practicing");
    setFeedback(null);
    // Filter to only user + assistant messages (skip system)
    const msgs = convo.messages.filter((m) => m.role === "user" || m.role === "assistant");
    setChat(msgs);
  }, []);

  // Discussion mode — open-ended chat about the word (no target-phrase requirement).
  // The STUDENT always speaks first here (unlike Converse) — no AI-initiated opening
  // line, since a discussion is meant to start from whatever the student wants to
  // ask or bring up.
  const discTopic = `the word "${word.term}" (meaning: ${word.en})`;
  const [discChat, setDiscChat] = useState<AiMessage[]>([]);
  const [discPhase, setDiscPhase] = useState<"practicing" | "feedback">("practicing");
  const [discFeedback, setDiscFeedback] = useState<Record<string, unknown> | null>(null);
  const [discCid, setDiscCid] = useState<string | null>(null);
  const [discChatIn, setDiscChatIn] = useState("");
  const [discBusy, setDiscBusy] = useState<"send" | "end" | null>(null);
  const [discError, setDiscError] = useState<string | null>(null);
  const discEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    discEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discChat]);

  async function sendDiscMessage() {
    if (!discChatIn.trim()) return;
    const um: AiMessage = { role: "user", content: discChatIn.trim(), timestamp: Date.now() };
    const nm = [...discChat, um];
    setDiscChat(nm);
    setDiscChatIn("");
    setDiscBusy("send");
    setConvLoading(true);
    setDiscError(null);
    const ct = nm.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
    try {
      const d = await callAi("discussion", { topic: discTopic, history: ct });
      const aiText = ((d?.content as string | undefined) ?? "")
        .replace(/\n*```json[\s\S]*?```\n*/g, "")
        .replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "")
        .trim();
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setDiscChat([...nm, am]);
      const newCid = appendMessages(ik, il, discCid, "discussion", [um, am]);
      if (!discCid) setDiscCid(newCid);
    } catch (e) {
      setDiscError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setDiscBusy(null);
      setConvLoading(false);
    }
  }

  async function endDiscussion() {
    setDiscBusy("end");
    setConvLoading(true);
    setDiscError(null);
    try {
      const ct = discChat.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const d = (await callAi("discussion", { topic: discTopic, history: ct, end: true })) as Record<string, unknown>;
      const xpEarned = d?.wellDone ? 20 : 8;
      const enriched = { ...d, xpEarned };
      setDiscFeedback(enriched);
      setDiscPhase("feedback");
      addGlobalXP(xpEarned);
      appendMessages(ik, il, discCid, "discussion", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
    } catch (e) {
      setDiscError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setDiscBusy(null);
      setConvLoading(false);
    }
  }

  const handleContinueDiscussion = useCallback((convo: AiConversation) => {
    setDiscCid(convo.id);
    setMode("discussion");
    setDiscPhase("practicing");
    setDiscFeedback(null);
    setDiscChat(convo.messages.filter((m) => m.role === "user" || m.role === "assistant"));
  }, []);

  function ts(m: VocabPMode) {
    return {
      background: mode === m ? "var(--color-accent)" : "var(--color-surface)",
      color: mode === m ? "#fff" : "var(--color-text)",
      border: mode === m ? "none" : "1px solid var(--color-divider)",
    };
  }

  return (
    <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
      <div className="label-xs mb-2 text-accent">🎓 Practice with AI</div>
      <div className="mb-3 flex flex-wrap gap-1">
        {(Object.keys(VOCAB_MODE_LABELS) as VocabPMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="rounded-full px-3 py-1 text-[14px] font-bold"
            style={ts(m)}
          >
            {VOCAB_MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {mode === "write" && (
        <div className="flex flex-col gap-3">
          <textarea
            className="input min-h-[70px] resize-none overflow-hidden"
            placeholder={`Write a sentence using "${word.term}" in an IELTS-style context...`}
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onInput={autoGrow}
          />
          <button
            className="btn btn-primary px-4 py-2 text-[15px] font-extrabold disabled:opacity-40"
            disabled={loading || !sentence.trim()}
            onClick={check}
          >
            {loading ? "Checking..." : "Check with AI"}
          </button>
          <AiFeedback loading={loading} result={result} error={error} onRetry={check} variant="sentence" />
        </div>
      )}

      {mode === "translate" && (
        <div className="flex flex-col gap-3">
          {viSentences.length === 0 ? (
            <button
              className="btn btn-primary px-4 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
              disabled={batchLoading}
              onClick={loadTranslate}
            >
              {batchLoading ? "Generating..." : "Generate 5 Sentences"}
            </button>
          ) : !batchResult ? (
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-neutral-600">Translate each sentence using &quot;{word.term}&quot;.</p>
              {viSentences.map((s, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="rounded bg-accent-100 px-3 py-2 text-[15px] leading-relaxed font-medium text-accent-800">
                    <span className="label-xs mr-2 text-accent-700">{i + 1}.</span>
                    {s}
                  </div>
                  <textarea
                    className="input min-h-[40px] resize-none overflow-hidden text-[15px]"
                    rows={1}
                    placeholder="Your English translation..."
                    value={translations[i] || ""}
                    onChange={(e) => {
                      const next = [...translations];
                      next[i] = e.target.value;
                      setTranslations(next);
                    }}
                    onInput={autoGrow}
                  />
                </div>
              ))}
              <button
                className="btn btn-primary px-4 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
                disabled={batchLoading || translations.every((t) => !t.trim())}
                onClick={submitTranslateBatch}
              >
                {batchLoading ? "Reviewing..." : "Submit All & Get Feedback"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-extrabold">📝 Results</p>
                {typeof batchResult.xpEarned === "number" && (
                  <span className="text-[14px] font-extrabold text-accent">+{batchResult.xpEarned} XP</span>
                )}
              </div>
              {viSentences.map((s, i) => {
                const results = batchResult.results as { ok: boolean; feedback?: string; corrected?: string }[] | undefined;
                const r = results?.[i];
                return (
                  <div
                    key={i}
                    className="rounded border p-3"
                    style={{ borderColor: r?.ok ? "var(--color-accent)" : "var(--color-accent-800)" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[14px] font-extrabold">
                        {i + 1}. {s}
                      </span>
                      <span className="text-[14px]">{r?.ok ? "✅" : "❌"}</span>
                    </div>
                    <p className="mt-1 text-[14px] italic text-neutral-500">Your: {translations[i]}</p>
                    {r?.feedback && <p className="mt-1 text-[14px]">{r.feedback}</p>}
                    {r?.corrected && (
                      <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[14px] text-accent-800">
                        <span>→ {r.corrected}</span>
                        <CopyButton text={r.corrected} className="rounded-full border px-2 py-0.5 text-[13px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
                      </p>
                    )}
                  </div>
                );
              })}
              {typeof batchResult.overall === "string" && (
                <div className="rounded bg-accent-100 p-3 text-[15px] leading-relaxed text-accent-800">{batchResult.overall}</div>
              )}
              <button className="btn btn-ghost text-[14px]" onClick={loadTranslate} disabled={batchLoading}>
                New set
              </button>
            </div>
          )}
          <AiFeedback loading={batchLoading} result={null} error={batchError} onRetry={loadTranslate} variant="general" />
        </div>
      )}

      {mode === "converse" && (
        <div className="flex flex-col gap-3">
          {phase === "idle" && (
            <button
              className="btn btn-primary px-4 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
              disabled={convLoading}
              onClick={loadPreview}
            >
              {convLoading ? "Generating..." : "Generate Sample Conversation"}
            </button>
          )}

          {phase === "preview" && preview && (
            <div className="flex flex-col gap-3">
              <div className="rounded bg-accent-100 p-3 text-[15px] leading-relaxed">
                <span className="label-xs mb-2 block text-accent-700">Sample conversation</span>
                {preview.conversation.map((line, i) => (
                  <p key={i} className="mb-1">
                    <span className="font-extrabold">{line.speaker}:</span> {line.text}
                  </p>
                ))}
              </div>
              <button
                className="btn btn-primary px-4 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
                disabled={convLoading}
                onClick={startPractice}
              >
                {convLoading ? "Starting..." : "Start Practice"}
              </button>
            </div>
          )}

          {phase === "practicing" && (
            <div className="flex flex-col gap-3">
              <div
                className="flex max-h-[300px] flex-col gap-3 overflow-y-auto rounded border p-3"
                style={{ borderColor: "var(--color-divider)" }}
              >
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className="rounded p-2.5 text-[15px] leading-relaxed"
                    style={{
                      background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)",
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                    }}
                  >
                    <span className="label-xs mb-0.5 block">{m.role === "user" ? "You" : "Partner"}</span>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))}
                {chatBusy === "send" && (
                  <div className="rounded p-2.5" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                    <span className="label-xs mb-1 block">Partner</span>
                    <span className="inline-flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              {chatBusy === "end" ? (
                <div className="flex items-center justify-center gap-2 rounded border p-3 text-[14px] text-neutral-600" style={{ borderColor: "var(--color-divider)" }}>
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing your conversation...
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={convLoading || !chatIn.trim()} />
                  <button
                    className="btn btn-primary px-3 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
                    disabled={convLoading || !chatIn.trim()}
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                  <button className="btn btn-ghost px-3 py-2.5 text-[14px]" disabled={convLoading || !chat.some((m) => m.role === "user")} onClick={endAndFeedback}>
                    End
                  </button>
                </div>
              )}
            </div>
          )}

          {phase === "feedback" && feedback && (
            <ConversationFeedback
              messages={chat}
              feedback={feedback}
              onReset={() => {
                setPhase("idle");
                setPreview(null);
                setFeedback(null);
                setChat([]);
              }}
              share={{
                title: word.term,
                text: `💬 Converse · ${word.term}`,
                getUrl: () => {
                  const payload: SharedConvoPayload = {
                    kind: "conversation",
                    itemLabel: word.term,
                    intent: "cpv_conversation",
                    messages: chat,
                    feedback,
                    sharedAt: Date.now(),
                  };
                  return createShareLink(payload);
                },
                getImageUrl: (url) => `${url}/card`,
              }}
            />
          )}
          {convError && <AiFeedback loading={false} result={null} error={convError} variant="general" />}
        </div>
      )}

      {mode === "discussion" && (
        <div className="flex flex-col gap-3">
          {discPhase === "practicing" && (
            <div className="flex flex-col gap-3">
              {discChat.length === 0 && (
                <p className="text-[14px] text-neutral-600">
                  {t("discussion.prompt", { term: word.term })}
                </p>
              )}
              <div
                className="flex max-h-[300px] flex-col gap-3 overflow-y-auto rounded border p-3"
                style={{ borderColor: "var(--color-divider)" }}
              >
                {discChat.map((m, i) => (
                  <div
                    key={i}
                    className="rounded p-2.5 text-[15px] leading-relaxed"
                    style={{
                      background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)",
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                    }}
                  >
                    <span className="label-xs mb-0.5 block">{m.role === "user" ? "You" : "Partner"}</span>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))}
                {discBusy === "send" && (
                  <div className="rounded p-2.5" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                    <span className="label-xs mb-1 block">Partner</span>
                    <span className="inline-flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </span>
                  </div>
                )}
                <div ref={discEndRef} />
              </div>
              {discBusy === "end" ? (
                <div className="flex items-center justify-center gap-2 rounded border p-3 text-[14px] text-neutral-600" style={{ borderColor: "var(--color-divider)" }}>
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing your discussion...
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <ChatInput value={discChatIn} onChange={setDiscChatIn} onSend={sendDiscMessage} disabled={convLoading || !discChatIn.trim()} />
                  <button
                    className="btn btn-primary px-3 py-2.5 text-[15px] font-extrabold disabled:opacity-40"
                    disabled={convLoading || !discChatIn.trim()}
                    onClick={sendDiscMessage}
                  >
                    Send
                  </button>
                  <button className="btn btn-ghost px-3 py-2.5 text-[14px]" disabled={convLoading || !discChat.some((m) => m.role === "user")} onClick={endDiscussion}>
                    End
                  </button>
                </div>
              )}
            </div>
          )}

          {discPhase === "feedback" && discFeedback && (
            <ConversationFeedback
              messages={discChat}
              feedback={discFeedback}
              onReset={() => {
                setDiscPhase("practicing");
                setDiscFeedback(null);
                setDiscChat([]);
                setDiscCid(null);
              }}
              share={{
                title: word.term,
                text: `🗣️ Discussion · ${word.term}`,
                getUrl: () => {
                  const payload: SharedConvoPayload = {
                    kind: "conversation",
                    itemLabel: word.term,
                    intent: "discussion",
                    messages: discChat,
                    feedback: discFeedback,
                    sharedAt: Date.now(),
                  };
                  return createShareLink(payload);
                },
                getImageUrl: (url) => `${url}/card`,
              }}
            />
          )}
          {discError && <AiFeedback loading={false} result={null} error={discError} variant="general" />}
        </div>
      )}

      <AiConversationHistory
        moduleKey={MODULE_KEY}
        itemKey={word.term}
        filterIntent={VOCAB_INTENT_FOR_MODE[mode]}
        onContinue={mode === "discussion" ? handleContinueDiscussion : handleContinue}
        activeConvoId={mode === "discussion" ? (discPhase === "practicing" ? discCid : null) : (phase === "practicing" ? cid : null)}
      />
    </div>
  );
}

function VocabStepView({ step, onNext }: { step: VocabStep; onNext: (score?: Score) => void }) {
  const { t } = useUiLang();
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(true);
  const w = step.words[i];
  const last = i === step.words.length - 1;

  function goTo(next: number) {
    setRevealed(true);
    setI(next);
  }

  // Claim ActionBarScreen's own pinned footer instead of hardcoding a second
  // `fixed inset-x-0 bottom-0` bar with a guessed pb-[96px] reservation on the
  // scroll content: a static guess drifts out of sync with the bar's real
  // rendered height (grows with the personal size slider, font choice, ...),
  // silently clipping the last bit of content - exactly the "can't reach the
  // Check with AI button" bug this replaces. useActionBar measures the real
  // height via ResizeObserver and reserves exactly that, every time.
  useActionBar(
    <div className="mx-auto flex max-w-[480px] gap-0.5 lg:max-w-[min(90vw,2400px)]">
      <button className="btn btn-secondary flex-1 justify-center px-4 py-3" disabled={i === 0} onClick={() => goTo(Math.max(0, i - 1))}>
        Previous
      </button>
      <button
        className="btn btn-primary flex-1 justify-center px-4 py-3"
        onClick={() => {
          if (last) {
            onNext();
            return;
          }
          goTo(i + 1);
        }}
      >
        {last ? "Continue" : "Next word"}
      </button>
    </div>,
  );

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="min-w-0 text-[15px] text-neutral-700">{step.instructions ?? "Study each card, then move to the next word."}</span>
        <select
          className="input label-xs w-auto max-w-full py-1"
          aria-label="Jump to word"
          value={i}
          onChange={(e) => goTo(Number(e.target.value))}
        >
          {step.words.map((word, idx) => (
            <option key={word.term} value={idx}>
              {idx + 1}/{step.words.length} · {word.term}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-surface p-5 lg:flex lg:flex-row lg:items-start lg:gap-8 lg:p-8">
        <div className="lg:w-[300px] lg:flex-none lg:sticky lg:top-6">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <span className="label-xs block text-accent">{w.pos}</span>
              <span className="text-[26px] leading-tight font-extrabold tracking-tight text-balance">{w.term}</span>
              <span className="mt-0.5 block text-[15px] text-neutral-600">{w.ipa}</span>
            </div>
            <button className="btn btn-icon flex-none" onClick={() => speak(w.term)} aria-label="Play pronunciation">
              <SpeakerIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-[15px] leading-relaxed text-neutral-700">{w.en}</div>

          {!revealed && (
            <button className="btn btn-primary btn-block mt-4 px-4 py-3" onClick={() => setRevealed(true)}>
              {t("unit.explain")}
            </button>
          )}
        </div>

        {revealed && (
          <div key={i} className="animate-pop mt-4 lg:mt-0 lg:flex-1">
            <div className="mb-4 border-l-2 border-accent pl-3">
              <div className="text-[15px] leading-relaxed text-neutral-700">{w.usageNote}</div>
              <div className="mt-1 text-[17px] font-extrabold text-accent-700">{w.vi}</div>
            </div>

            <div className="label-xs mb-2 text-accent">{t("unit.keyIdea")}</div>
            <ChipRow label={t("unit.synonyms")} items={w.synonyms} tone="neutral" />
            <ChipRow label={t("unit.antonyms")} items={w.antonyms} tone="accent" />

            <div className="label-xs mb-2 text-accent">{t("unit.examples")}</div>
            {w.examples.map((ex, idx) => (
              <div key={idx} className="mb-2 text-[15px] leading-relaxed">
                <div>{ex.en}</div>
                <div className="text-neutral-600">→ {ex.vi}</div>
              </div>
            ))}

            <div className="mt-3 text-[15px] leading-relaxed font-bold">👉 {w.summary}</div>

            <div className="mt-3 bg-accent-100 px-3 py-2.5 text-[14px] leading-relaxed text-accent-800">
              <span className="label-xs mb-0.5 block text-accent-700">🎯 IELTS tip</span>
              {w.ieltsTip}
            </div>

            <IeltsVocabSample word={w} />

            <VocabAiPractice word={w} />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Listening + cloze notes ----------

function ListeningClozeStepView({ step, onNext }: { step: ListeningClozeStep; onNext: (score?: Score) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const segments = useMemo(() => parseCloze(step.template), [step.template]);
  const blanks = useMemo(() => segments.filter((s): s is { blank: string } => "blank" in s).map((s) => s.blank), [segments]);
  const blankIndexBySegment = useMemo(() => {
    const arr: number[] = [];
    let n = 0;
    for (const s of segments) {
      if ("blank" in s) {
        arr.push(n);
        n += 1;
      } else {
        arr.push(-1);
      }
    }
    return arr;
  }, [segments]);
  const [inputs, setInputs] = useState<string[]>(() => blanks.map(() => ""));
  const [checked, setChecked] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  const correctCount = inputs.filter((v, i) => norm(v) === norm(blanks[i])).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[15px] text-neutral-700">{step.instructions}</div>
      <div className="lg:flex lg:flex-row lg:items-start lg:gap-8">
        <div className="mb-4 flex flex-col items-center gap-2 bg-surface px-4 py-6 lg:mb-0 lg:w-[300px] lg:flex-none lg:sticky lg:top-6">
          <audio
            ref={audioRef}
            src={step.audioUrl}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          <button
            className="btn btn-primary flex h-[64px] w-[64px] items-center justify-center p-0"
            onClick={() => {
              const el = audioRef.current;
              if (!el) return;
              if (el.paused) el.play();
              else el.pause();
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <PauseIcon /> : <SpeakerIcon />}
          </button>
          <div className="label-xs">{playing ? "Playing…" : "Tap to listen"}</div>
        </div>
        <div className="lg:flex-1">
          <button className="btn btn-secondary mb-4 lg:hidden" onClick={() => setShowScript((v) => !v)}>
            {showScript ? "Hide script" : "Show script"}
          </button>
          <div
            className={`mb-4 bg-surface p-4 text-[15px] leading-relaxed whitespace-pre-wrap lg:block ${showScript ? "block" : "hidden"}`}
          >
            {step.script}
          </div>
          <div className="mb-4 bg-surface p-4 text-[17px] leading-loose whitespace-pre-wrap text-pretty">
            {segments.map((s, i) => {
              if ("text" in s) return <span key={i}>{s.text}</span>;
              const idx = blankIndexBySegment[i];
              const ok = checked && norm(inputs[idx]) === norm(blanks[idx]);
              return (
                <input
                  key={i}
                  className="input mx-1 inline-block w-[120px]"
                  style={{
                    display: "inline-block",
                    borderColor: checked ? (ok ? "var(--color-text)" : "var(--color-accent)") : undefined,
                  }}
                  disabled={checked}
                  value={inputs[idx]}
                  onChange={(e) => {
                    const next = [...inputs];
                    next[idx] = e.target.value;
                    setInputs(next);
                  }}
                  placeholder="..."
                />
              );
            })}
          </div>
        </div>
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Score</span>
          <span className="font-extrabold">
            {correctCount}/{blanks.length} correct
          </span>
        </div>
      )}
      {step.tip && !checked && <Tip>{step.tip}</Tip>}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: blanks.length })} />
      ) : (
        <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setChecked(true)}>
          Check
        </button>
      )}
    </div>
  );
}

// ---------- Sort into two buckets ----------

function SortStepView({ step, onNext }: { step: SortStep; onNext: (score?: Score) => void }) {
  const [assigned, setAssigned] = useState<Record<string, 0 | 1 | undefined>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pool = step.items.filter((it) => assigned[it.term] === undefined);
  const bucketItems = (b: 0 | 1) => step.items.filter((it) => assigned[it.term] === b);
  const allAssigned = pool.length === 0;
  const correctCount = step.items.filter((it) => assigned[it.term] === it.bucket).length;

  function assign(b: 0 | 1) {
    if (!selected) return;
    setAssigned((a) => ({ ...a, [selected]: b }));
    setSelected(null);
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[15px] text-neutral-700">{step.instructions}</div>

      <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-3">
        {!checked && pool.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5 lg:mb-0 lg:flex-col lg:flex-nowrap lg:items-start">
            {pool.map((it) => (
              <button
                key={it.term}
                onClick={() => setSelected((s) => (s === it.term ? null : it.term))}
                className="border px-3 py-1.5 text-[15px] font-bold"
                style={{
                  borderColor: selected === it.term ? "var(--color-accent)" : "var(--color-divider)",
                  background: selected === it.term ? "var(--color-accent-100)" : "var(--color-surface)",
                  color: selected === it.term ? "var(--color-accent-800)" : "var(--color-text)",
                }}
              >
                {it.term}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 lg:contents">
          {([0, 1] as const).map((b) => (
          <button
            key={b}
            disabled={checked || !selected}
            onClick={() => assign(b)}
            className="min-h-[160px] border border-dashed border-[color:var(--color-divider)] bg-bg p-2 text-left align-top disabled:opacity-100"
          >
            <div className="label-xs mb-2 text-accent">{step.buckets[b]}</div>
            <div className="flex flex-wrap gap-1">
              {bucketItems(b).map((it) => {
                const wrong = checked && it.bucket !== b;
                return (
                  <span
                    key={it.term}
                    className="border px-2 py-1 text-[14px] font-bold"
                    style={
                      checked
                        ? wrong
                          ? { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" }
                          : { borderColor: "var(--color-text)", background: "var(--color-text)", color: "var(--color-bg)" }
                        : { borderColor: "var(--color-divider)", background: "var(--color-surface)" }
                    }
                  >
                    {it.term}
                  </span>
                );
              })}
            </div>
          </button>
        ))}
        </div>
      </div>

      {checked && (
        <div className="mt-4 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Score</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} correct
          </span>
        </div>
      )}

      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button
          className="btn btn-primary btn-block mt-4 px-4 py-3 disabled:opacity-40"
          disabled={!allAssigned}
          onClick={() => setChecked(true)}
        >
          Check
        </button>
      )}
    </div>
  );
}

// ---------- Type the answer ----------

function TypeFillStepView({ step, onNext }: { step: TypeFillStep; onNext: (score?: Score) => void }) {
  const [inputs, setInputs] = useState<string[]>(() => step.items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const correctCount = inputs.filter((v, i) => norm(v) === norm(step.items[i].answer)).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[15px] text-neutral-700">{step.instructions}</div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {step.items.map((it, i) => {
          const ok = checked && norm(inputs[i]) === norm(it.answer);
          const bad = checked && !ok;
          return (
            <div key={i} className="mb-3">
              <div className="mb-1 text-[17px] font-extrabold">{it.prompt}</div>
              <input
                className="input"
                style={{ borderColor: bad ? "var(--color-accent)" : ok ? "var(--color-text)" : undefined }}
                disabled={checked}
                value={inputs[i]}
                onChange={(e) => {
                  const next = [...inputs];
                  next[i] = e.target.value;
                  setInputs(next);
                }}
                placeholder="Type the negative form"
              />
              {bad && (
                <div className="mt-1 text-[14px] text-accent-700">
                  Answer: <span className="font-extrabold">{it.answer}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Score</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} correct
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setChecked(true)}>
          Check
        </button>
      )}
    </div>
  );
}

// ---------- Multiple choice fill-in ----------

function FillMcStepView({ step, onNext }: { step: FillMcStep; onNext: (score?: Score) => void }) {
  const [picked, setPicked] = useState<(string | null)[]>(() => step.items.map(() => null));
  const [checked, setChecked] = useState(false);
  const allPicked = picked.every((p) => p !== null);
  const correctCount = picked.filter((p, i) => p === step.items[i].answer).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[15px] text-neutral-700">{step.instructions}</div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {step.items.map((it, i) => (
          <div key={i} className="mb-4">
            <div className="mb-2 text-[16px] leading-relaxed">
              {it.before} <span className="font-extrabold text-accent-700">{picked[i] ?? "____"}</span> {it.after}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {it.options.map((o) => {
                const isAnswer = o === it.answer;
                const isPicked = picked[i] === o;
                let style: React.CSSProperties = {
                  borderColor: "var(--color-divider)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                };
                if (checked) {
                  if (isAnswer) style = { borderColor: "var(--color-text)", background: "var(--color-text)", color: "var(--color-bg)" };
                  else if (isPicked) style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                  else style = { borderColor: "var(--color-divider)", background: "var(--color-bg)", color: "var(--color-neutral-600)" };
                } else if (isPicked) {
                  style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                }
                return (
                  <button
                    key={o}
                    disabled={checked}
                    style={style}
                    className="border px-3 py-1.5 text-[15px] font-bold"
                    onClick={() => {
                      const next = [...picked];
                      next[i] = o;
                      setPicked(next);
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Score</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} correct
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button
          className="btn btn-primary btn-block mt-auto px-4 py-3 disabled:opacity-40"
          disabled={!allPicked}
          onClick={() => setChecked(true)}
        >
          Check
        </button>
      )}
    </div>
  );
}

// ---------- Reading: True / False / Not given ----------

function ReadingTfNgStepView({ step, onNext }: { step: ReadingTfNgStep; onNext: (score?: Score) => void }) {
  const OPTIONS = ["True", "False", "Not given"] as const;
  const [picked, setPicked] = useState<(string | null)[]>(() => step.questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const [showPassage, setShowPassage] = useState(true);
  const allPicked = picked.every((p) => p !== null);
  const correctCount = picked.filter((p, i) => p === step.questions[i].answer).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="lg:flex lg:flex-row lg:items-start lg:gap-8">
        <div className="lg:w-[380px] lg:flex-none lg:sticky lg:top-4">
          <button className="btn btn-secondary mb-3 lg:hidden" onClick={() => setShowPassage((v) => !v)}>
            {showPassage ? "Hide passage" : "Show passage"}
          </button>
          <div
            className={`mb-4 max-h-[280px] overflow-y-auto bg-surface p-4 lg:mb-0 lg:block lg:max-h-[calc(var(--real-vh,100vh)-140px)] ${showPassage ? "block" : "hidden"}`}
          >
            <div className="mb-2 text-[16px] font-extrabold">{step.passageTitle}</div>
            <div className="text-[15px] leading-relaxed whitespace-pre-line text-neutral-800">{step.passage}</div>
          </div>
        </div>
        <div className="lg:flex-1">
          {step.questions.map((q, i) => {
            const ok = checked && picked[i] === q.answer;
            return (
              <div key={i} className="mb-4">
                <div className="mb-2 text-[15px] leading-relaxed">
                  <span className="mr-1.5 text-neutral-600">{i + 1}.</span>
                  {q.text}
                </div>
                <div className="flex gap-1.5">
                  {OPTIONS.map((o) => {
                    const isAnswer = o === q.answer;
                    const isPicked = picked[i] === o;
                    let style: React.CSSProperties = {
                      borderColor: "var(--color-divider)",
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                    };
                    if (checked) {
                      if (isAnswer) style = { borderColor: "var(--color-text)", background: "var(--color-text)", color: "var(--color-bg)" };
                      else if (isPicked) style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                      else style = { borderColor: "var(--color-divider)", background: "var(--color-bg)", color: "var(--color-neutral-600)" };
                    } else if (isPicked) {
                      style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                    }
                    return (
                      <button
                        key={o}
                        disabled={checked}
                        style={style}
                        className="flex-1 border px-2 py-1.5 text-[14px] font-bold"
                        onClick={() => {
                          const next = [...picked];
                          next[i] = o;
                          setPicked(next);
                        }}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
                {checked && (
                  <div className={`mt-1.5 text-[14px] leading-relaxed ${ok ? "text-neutral-600" : "text-accent-700"}`}>
                    “{q.justification}”
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Score</span>
          <span className="font-extrabold">
            {correctCount}/{step.questions.length} correct
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.questions.length })} />
      ) : (
        <button
          className="btn btn-primary btn-block mt-auto px-4 py-3 disabled:opacity-40"
          disabled={!allPicked}
          onClick={() => setChecked(true)}
        >
          Check
        </button>
      )}
    </div>
  );
}

// ---------- Tap to reveal paraphrase pairs ----------

function RevealPairsStepView({ step, onNext }: { step: RevealPairsStep; onNext: (score?: Score) => void }) {
  const [revealed, setRevealed] = useState<boolean[]>(() => step.pairs.map(() => false));

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[15px] text-neutral-700">{step.instructions}</div>
      <div className="flex flex-col gap-px bg-[color:var(--color-divider)] lg:grid lg:grid-cols-2 lg:gap-2 lg:bg-transparent">
        {step.pairs.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              const next = [...revealed];
              next[i] = !next[i];
              setRevealed(next);
            }}
            className="bg-surface p-3 text-left lg:border lg:border-[color:var(--color-divider)]"
          >
            <div className="text-[16px] font-extrabold">{p.prompt}</div>
            {revealed[i] ? (
              <div className="mt-1 text-[15px] leading-relaxed text-accent-700">{p.reveal}</div>
            ) : (
              <div className="label-xs mt-1">Tap to reveal</div>
            )}
          </button>
        ))}
      </div>
      <ContinueButton onClick={() => onNext()} />
    </div>
  );
}

// ---------- Speaking practice timer ----------

interface VocabPoolItem {
  term: string;
  en: string;
}

function SpeakingStepView({
  step,
  onNext,
  itemKey,
  unitVocab,
}: {
  step: SpeakingStep;
  onNext: (score?: Score) => void;
  itemKey: string;
  unitVocab: VocabPoolItem[];
}) {
  const [phase, setPhase] = useState<"idle" | "prep" | "speak" | "done">("idle");
  const [secondsLeft, setSecondsLeft] = useState(step.prepSeconds);
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef<HTMLTextAreaElement>(null);
  const phaseRef = useRef(phase);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<unknown>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const draftKey = `${MODULE_KEY}:draft:speaking:${itemKey}`;

  useEffect(() => {
    const draft = loadDraft<{ transcript: string }>(draftKey);
    if (draft?.transcript) setTranscript(draft.transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (transcript.trim()) saveDraft(draftKey, { transcript });
      else clearDraft(draftKey);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [transcript]);

  useEffect(() => {
    setVoiceSupported(!!getSpeechRecognitionCtor());
  }, []);

  function startRecognition() {
    const SR = getSpeechRecognitionCtor();
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = "";
    rec.onresult = (e) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript + " ";
        else interimText += res[0].transcript;
      }
      setTranscript(finalText.trim());
      setInterim(interimText);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicError("Microphone access denied — type your answer instead.");
      }
    };
    rec.onend = () => {
      if (phaseRef.current === "speak") {
        try {
          rec.start();
        } catch {
          // already running or mic unavailable — leave it stopped
        }
      }
    };
    try {
      rec.start();
      recognitionRef.current = rec;
    } catch {
      setMicError("Couldn't start the microphone — type your answer instead.");
    }
  }

  function stopRecognition() {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }

  useEffect(() => {
    if (phase === "speak") startRecognition();
    else stopRecognition();
    return () => stopRecognition();
  }, [phase]);

  async function getFeedback() {
    if (!transcript.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    try {
      const data = await callAi("cielts_speaking_feedback", {
        prompt: step.prompt,
        bullets: step.bullets,
        transcript: transcript.trim(),
        vocabPool: unitVocab,
      });
      setAiResult(data);
      const id = appendMessages(itemKey, step.title, cid, "cielts_speaking_feedback", [
        { role: "user", content: transcript.trim(), timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(data), timestamp: Date.now() },
      ]);
      if (!cid) setCid(id);
      clearDraft(draftKey);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setAiLoading(false);
    }
  }

  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    const t = setTimeout(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setPhase((p) => (p === "prep" ? "speak" : "done"));
        return phase === "prep" ? step.talkSeconds : 0;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, secondsLeft, step.talkSeconds]);

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }

  // Only claimed once the transcript + "Get AI Feedback"/Continue buttons are
  // actually on screen (the "done" phase) — idle/prep/speak stay footer-less,
  // unchanged, since that's a focused full-screen countdown with nothing to pin.
  const footerContent =
    phase === "done" ? (
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-primary btn-block px-4 py-2 text-[15px] font-extrabold disabled:opacity-40"
          disabled={aiLoading || !transcript.trim()}
          onClick={getFeedback}
        >
          {aiLoading ? "Scoring..." : "Get AI Feedback"}
        </button>
        <ContinueButton
          onClick={() => {
            clearDraft(draftKey);
            onNext();
          }}
        />
      </div>
    ) : null;
  const footerClaimed = useActionBar(footerContent);

  return (
    <div className="flex flex-1 flex-col p-4 lg:mx-auto lg:w-full lg:max-w-[960px]">
      <div className="mb-4 bg-surface p-4">
        <div className="label-xs mb-2 text-accent">Cue card</div>
        <div className="mb-3 text-[18px] font-extrabold leading-snug">{step.prompt}</div>
        <div className="mb-1 text-[14px] text-neutral-600">You should talk about:</div>
        <ul className="list-disc pl-5 text-[15px] leading-relaxed">
          {step.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      {phase === "idle" && (
        <button
          className="btn btn-primary btn-block px-4 py-3"
          onClick={() => {
            setSecondsLeft(step.prepSeconds);
            setTranscript("");
            setInterim("");
            setMicError(null);
            setPhase("prep");
          }}
        >
          Start 1-minute preparation
        </button>
      )}

      {(phase === "prep" || phase === "speak") && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-bg py-8">
          <div className="label-xs text-accent">{phase === "prep" ? "Preparation time" : "Speak now"}</div>
          <div className="text-[56px] leading-none font-extrabold tabular-nums">{fmt(secondsLeft)}</div>
          {phase === "speak" && voiceSupported && !micError && (
            <div className="flex items-center gap-1.5 text-[14px] text-neutral-600">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
              Listening — speak into your microphone
            </div>
          )}
          {phase === "speak" && !voiceSupported && (
            <p className="max-w-[280px] text-center text-[14px] text-neutral-600">
              Voice recognition isn&apos;t supported in this browser — you&apos;ll be able to type what you said afterwards.
            </p>
          )}
          {phase === "speak" && micError && (
            <p className="max-w-[280px] text-center text-[14px] text-accent-700">{micError}</p>
          )}
          {phase === "speak" && (transcript || interim) && (
            <p className="max-h-[100px] max-w-[320px] overflow-y-auto text-center text-[15px] leading-relaxed text-neutral-700">
              {transcript} <span className="text-neutral-400">{interim}</span>
            </p>
          )}
          {phase === "prep" ? (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSecondsLeft(step.talkSeconds);
                setPhase("speak");
              }}
            >
              Start speaking now
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setPhase("done")}>
              Stop
            </button>
          )}
        </div>
      )}

      {phase === "done" && (
        <>
          <Tip>{step.tip}</Tip>
          <div className="mb-4 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
            <div className="label-xs mb-2 text-accent">🎓 Get AI feedback on your answer</div>
            <p className="mb-2 text-[14px] text-neutral-600">
              {transcript
                ? "Here's what we picked up while you were speaking — fix anything that was mis-heard, then get feedback."
                : "Type what you said and an AI examiner will score it."}
            </p>
            <textarea
              ref={transcriptRef}
              className="input mb-2 min-h-[100px] resize-none overflow-hidden"
              placeholder="Type what you said..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="mt-3">
              <AiBandFeedback loading={aiLoading} result={aiResult} error={aiError} onRetry={getFeedback} />
            </div>
            <AiConversationHistory moduleKey={MODULE_KEY} itemKey={itemKey} filterIntent="cielts_speaking_feedback" />
          </div>
          {!footerClaimed && footerContent}
        </>
      )}
    </div>
  );
}

// ---------- Writing task (Task 1 chart / Task 2 essay) ----------

function WritingTaskStepView({
  step,
  onNext,
  itemKey,
  unitVocab,
}: {
  step: WritingTaskStep;
  onNext: (score?: Score) => void;
  itemKey: string;
  unitVocab: VocabPoolItem[];
}) {
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const wordCount = draft.trim() === "" ? 0 : draft.trim().split(/\s+/).length;
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<unknown>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const taskNumber = /2/.test(step.taskLabel) ? 2 : 1;
  const draftKey = `${MODULE_KEY}:draft:writing:${itemKey}`;

  useEffect(() => {
    const d = loadDraft<{ draft: string }>(draftKey);
    if (d?.draft) setDraft(d.draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (draft.trim()) saveDraft(draftKey, { draft });
      else clearDraft(draftKey);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  async function getFeedback() {
    if (!draft.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    try {
      const data = await callAi("cielts_writing_feedback", {
        taskNumber,
        prompt: step.prompt,
        chartRows: step.chartRows,
        draft: draft.trim(),
        vocabPool: unitVocab,
      });
      setAiResult(data);
      const id = appendMessages(itemKey, step.title, cid, "cielts_writing_feedback", [
        { role: "user", content: draft.trim(), timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(data), timestamp: Date.now() },
      ]);
      if (!cid) setCid(id);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setAiLoading(false);
    }
  }

  // Both "Get AI Feedback" and "Show model answer"/"Continue" are simultaneously
  // available once there's a draft — stacked together in the pinned footer so
  // neither requires scrolling past the (auto-growing) textarea to reach, and
  // the "Scoring..." state stays visible instead of scrolling off with it.
  const footerContent = (
    <div className="flex flex-col gap-2">
      <button
        className="btn btn-primary btn-block px-4 py-2 text-[15px] font-extrabold disabled:opacity-40"
        disabled={aiLoading || !draft.trim()}
        onClick={getFeedback}
      >
        {aiLoading ? "Scoring..." : "Get AI Feedback"}
      </button>
      {showModel ? (
        <ContinueButton
          onClick={() => {
            clearDraft(draftKey);
            onNext();
          }}
        />
      ) : (
        <button className="btn btn-secondary btn-block px-4 py-3" onClick={() => setShowModel(true)}>
          Show model answer
        </button>
      )}
    </div>
  );
  const footerClaimed = useActionBar(footerContent);

  return (
    <div className="flex flex-1 flex-col p-4 lg:mx-auto lg:w-full lg:max-w-[1080px]">
      <div className="mb-4 bg-surface p-4">
        <div className="label-xs mb-2 text-accent">{step.taskLabel}</div>
        <div className="mb-3 text-[16px] leading-relaxed font-extrabold">{step.prompt}</div>
        {step.chart ? (
          <div className="border border-[color:var(--color-divider)] bg-bg p-3">
            {step.chartCaption && <div className="label-xs mb-3">{step.chartCaption}</div>}
            <WritingChartView chart={step.chart} />
          </div>
        ) : (
          step.chartRows &&
          step.chartRows.length > 0 && (
            <div className="border border-[color:var(--color-divider)] bg-bg p-3">
              {step.chartCaption && <div className="label-xs mb-2">{step.chartCaption}</div>}
              <ul className="flex flex-col gap-1 text-[15px] leading-relaxed">
                {step.chartRows.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      <textarea
        className="input mb-2 min-h-[180px] resize-none overflow-hidden"
        placeholder={`Write at least ${step.minWords} words...`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onInput={autoGrow}
      />
      <div className="label-xs mb-4 text-right">{wordCount} words</div>

      <div className="mb-4 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
        <div className="label-xs mb-2 text-accent">🎓 Get AI feedback on your draft</div>
        <div className="mt-3">
          <AiBandFeedback loading={aiLoading} result={aiResult} error={aiError} onRetry={getFeedback} />
        </div>
        <AiConversationHistory moduleKey={MODULE_KEY} itemKey={itemKey} filterIntent="cielts_writing_feedback" />
      </div>

      {showModel && (
        <div className="mb-3 bg-accent-100 p-4 text-[15px] leading-relaxed whitespace-pre-wrap text-accent-800">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="label-xs block text-accent-700">Model answer</span>
            <CopyButton text={step.modelAnswer} className="rounded-full border px-2 py-0.5 text-[13px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
          </div>
          {step.modelAnswer}
        </div>
      )}
      {showModel && <Tip>{step.tip}</Tip>}

      {!footerClaimed && footerContent}
    </div>
  );
}

// ---------- Wizard shell ----------

const STEP_KIND_LABELS: Record<UnitStep["kind"], string> = {
  vocab: "Vocabulary",
  listening_cloze: "Listening",
  sort: "Matching",
  type_fill: "Fill in",
  fill_mc: "Multiple choice",
  reading_tfng: "Reading",
  reveal_pairs: "Paraphrase",
  speaking: "Speaking",
  writing_task: "Writing",
};

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4"
    >
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => getCambridgeUnit(slug), [slug]);

  const [stepIndex, setStepIndex] = useState(0);
  const [tally, setTally] = useState<Score>({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [showStepList, setShowStepList] = useState(false);

  if (!unit) {
    return (
      <div className="p-4">
        <p className="text-[15px] text-neutral-600">Unit not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/cambridge-vocabulary-ielts-advanced")}>
          All units
        </button>
      </div>
    );
  }

  if (isCambridgeUnitLocked(unit.unit, isUnlocked)) {
    return <ProPaywallNotice what={`Unit ${unit.unit}: ${unit.title}`} />;
  }

  const steps: UnitStep[] = unit.steps;
  const step = steps[stepIndex];
  const unitVocab: VocabPoolItem[] = steps
    .filter((s): s is VocabStep => s.kind === "vocab")
    .flatMap((s) => s.words.map((w) => ({ term: w.term, en: w.en })));

  function goBack() {
    if (stepIndex === 0) {
      router.push("/modules/cambridge-vocabulary-ielts-advanced");
      return;
    }
    setStepIndex((i) => i - 1);
  }

  function handleNext(score?: Score) {
    const nextTally = score ? { correct: tally.correct + score.correct, total: tally.total + score.total } : tally;
    setTally(nextTally);
    if (stepIndex + 1 >= steps.length) {
      grade(unit!.slug, true);
      setFinished(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function restart() {
    setStepIndex(0);
    setTally({ correct: 0, total: 0 });
    setFinished(false);
  }

  if (finished) {
    const pct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 100;
    const sub = pct >= 90 ? "Excellent work." : pct >= 70 ? "Solid work." : "Worth another look.";
    return (
      <div className="flex min-h-screen flex-col">
        <div className="divider-b px-4 pt-8 pb-6">
          <div className="label-xs text-accent">Unit complete</div>
          <div className="mt-2 text-[30px] leading-tight font-extrabold">{unit.title}</div>
          <div className="mt-3 text-[64px] leading-[0.95] font-extrabold tracking-tight">{pct}%</div>
          <div className="mt-2 text-[15px] text-neutral-600">
            {sub} {tally.correct}/{tally.total} across the graded exercises.
          </div>
        </div>
        <div className="flex gap-[2px] p-4">
          <button
            className="btn btn-secondary flex-1 justify-center px-4 py-3"
            onClick={() => router.push("/modules/cambridge-vocabulary-ielts-advanced")}
          >
            All units
          </button>
          <button className="btn btn-primary flex-1 justify-center px-4 py-3" onClick={restart}>
            Redo unit
          </button>
        </div>
      </div>
    );
  }

  // ponytail: fixed inset-0 + fullViewport (not the plain in-flow return this
  // used to be) so this screen's own height never depends on subtracting
  // AppHeader's assumed 3rem - any rounding drift in that assumption (any
  // zoom, real browser zoom included, not just the app's own --ui-zoom) was
  // exactly what caused the double-scroll bug. inset-0 needs no such
  // assumption: 0 is 0 regardless of zoom. Same pattern VerbDetailClient's AI
  // Practice overlay already uses successfully.
  return (
    <div className="fixed inset-0 z-[60] bg-bg">
      <div className="mx-auto h-full max-w-[480px] lg:max-w-[min(90vw,2400px)]">
        <ActionBarScreen
          fullViewport
          header={
            <>
              <div className="divider-b flex items-center gap-3 px-4 py-3">
                <button onClick={goBack} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
                  <BackIcon />
                </button>
                <div className="h-1.5 flex-1 bg-neutral-300">
                  <div className="h-full bg-accent" style={{ width: `${(stepIndex / steps.length) * 100}%` }} />
                </div>
              </div>
              <div className="px-4 pt-3">
                <span className="label-xs block text-accent">
                  Unit {unit.unit} · {unit.title} — {step.title}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 pt-2">
                <button
                  className="btn btn-ghost px-0 text-[13px]"
                  onClick={() => router.push("/modules/cambridge-vocabulary-ielts-advanced")}
                >
                  ← Thoát
                </button>
                <div className="flex flex-none items-center gap-3">
                  <button
                    className="flex items-center gap-1 text-[13px] tabular-nums text-neutral-600 hover:text-accent"
                    onClick={() => setShowStepList(true)}
                    aria-label="Jump to exercise"
                  >
                    <ListIcon />
                    {stepIndex + 1}/{steps.length}
                  </button>
                  {stepIndex + 1 < steps.length && (
                    <button className="btn btn-ghost px-0 text-[13px]" onClick={() => handleNext()}>
                      Skip →
                    </button>
                  )}
                </div>
              </div>
            </>
          }
        >
          {showStepList && (
            <div className="fixed inset-0 z-[60] bg-bg">
              <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[min(90vw,2400px)]">
                <div className="divider-b flex items-center justify-between px-4 py-3">
                  <span className="text-[18px] font-extrabold">Exercises in this unit</span>
                  <button className="btn btn-ghost" onClick={() => setShowStepList(false)}>
                    Close
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {steps.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setStepIndex(i);
                        setShowStepList(false);
                      }}
                      className="divider-b flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface"
                      style={i === stepIndex ? { background: "var(--color-accent-100)" } : undefined}
                    >
                      <span className="label-xs w-6 flex-none text-neutral-600">{i + 1}</span>
                      <span className="flex-1">
                        <span className="block text-[16px] font-extrabold">{s.title}</span>
                        <span className="label-xs mt-0.5 block text-neutral-600">{STEP_KIND_LABELS[s.kind]}</span>
                      </span>
                      {i < stepIndex && <span className="label-xs text-accent">Done</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scrollable step content. Most step kinds render their own "Continue"
              button inline here, unchanged — only Writing/Speaking tasks (long
              textarea + AI feedback) claim the pinned footer below, via
              useActionBar() in WritingTaskStepView/SpeakingStepView.
              overscroll-contain: without it, scrolling past this div's own end
              (e.g. reaching the bottom of a vocab card) chains the wheel/touch
              scroll to the page behind it, which visibly moves even though the
              outer layout is sized to never need to. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {step.kind === "vocab" && <VocabStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "listening_cloze" && <ListeningClozeStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "sort" && <SortStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "type_fill" && <TypeFillStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "fill_mc" && <FillMcStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "reading_tfng" && <ReadingTfNgStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "reveal_pairs" && <RevealPairsStepView key={stepIndex} step={step} onNext={handleNext} />}
            {step.kind === "speaking" && (
              <SpeakingStepView
                key={stepIndex}
                step={step}
                onNext={handleNext}
                itemKey={`${unit.slug}:${step.title}`}
                unitVocab={unitVocab}
              />
            )}
            {step.kind === "writing_task" && (
              <WritingTaskStepView
                key={stepIndex}
                step={step}
                onNext={handleNext}
                itemKey={`${unit.slug}:${step.title}`}
                unitVocab={unitVocab}
              />
            )}
          </div>
        </ActionBarScreen>
      </div>
    </div>
  );
}
