"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiConversation, AiMessage, IntentType } from "@/lib/ai-convo-store";
import { AiFeedback } from "./AiFeedback";
import { AiConversationHistory } from "./AiConversationHistory";
import { ChatInput } from "./ChatInput";
import { ConversationFeedback } from "./ConversationFeedback";
import { addGlobalXP } from "@/lib/global-score";
import { createShareLink } from "@/lib/share-client";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { useUiLang } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";

type PMode = "write" | "translate" | "quiz" | "examples" | "converse" | "discussion";

const QUIZ_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const LABELS: Record<PMode, string> = {
  write: "Write", translate: "Translate", quiz: "Quiz",
  examples: "Examples", converse: "Converse", discussion: "Discussion",
};

export interface ItemInfo {
  term: string; type: string; en: string; vi: string; ex: string;
}

// Debounced localStorage draft persistence for in-progress Write/Translate text —
// without this, navigating away before submitting (e.g. after generating the 5
// translate sentences but before answering) silently loses that state, forcing a
// re-generate. Same pattern as Cambridge's inline practice draft persistence.
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

export function AiSentencePractice({ item, moduleKey, showItemInfo = true }: { item: ItemInfo; moduleKey: string; showItemInfo?: boolean }) {
  const ik = item.term;
  const il = `${item.term} (${item.type})`;
  const { appendMessages } = useAiConvoStore(moduleKey);
  const { t } = useUiLang();
  const [mode, setMode] = useState<PMode>("write");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [sentence, setSentence] = useState("");
  const [translations, setTranslations] = useState<string[]>([]);
  const [viSentences, setViSentences] = useState<string[]>([]);
  const [batchResult, setBatchResult] = useState<any>(null);
  const [qz, setQz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizCount, setQuizCount] = useState(5);
  const [exs, setExs] = useState<any>(null);
  const [chatIn, setChatIn] = useState("");
  const [chat, setChat] = useState<AiMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const writeDraftKey = `${moduleKey}:draft:write:${item.term}`;
  const translateDraftKey = `${moduleKey}:draft:translate:${item.term}`;

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  // Restore any in-progress draft on mount.
  useEffect(() => {
    const wd = loadDraft<{ sentence: string }>(writeDraftKey);
    if (wd?.sentence) setSentence(wd.sentence);
    const td = loadDraft<{ viSentences: string[]; translations: string[] }>(translateDraftKey);
    if (td?.viSentences?.length) {
      setViSentences(td.viSentences);
      setTranslations(td.translations ?? new Array(td.viSentences.length).fill(""));
    }
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

  useEffect(() => {
    const t = setTimeout(() => {
      if (viSentences.length && !batchResult) saveDraft(translateDraftKey, { viSentences, translations });
      else clearDraft(translateDraftKey);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viSentences, translations, batchResult]);

  async function callAi(intent: IntentType, payload: Record<string, unknown>) {
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent, payload: { ...payload, aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "AI failed");
      return j.data;
    } catch (e: any) { setError(e.message); return null; }
    finally { setLoading(false); }
  }
  const sw = useCallback(async () => {
    if (!sentence.trim()) return;
    const d = await callAi("cpv_sentence_check", { term: item.term, en: item.en, vi: item.vi, ex: item.ex, sentence: sentence.trim() });
    if (d) { setResult(d); const id = appendMessages(ik, il, cid, "cpv_sentence_check", [{ role: "user", content: sentence.trim(), timestamp: Date.now() }, { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() }]); if (!cid) setCid(id); clearDraft(writeDraftKey); }
  }, [sentence, item, ik, il, cid, appendMessages, writeDraftKey]);

  const loadTranslate = useCallback(async () => {
    setViSentences([]); setTranslations([]); setBatchResult(null); setResult(null);
    const d = await callAi("cpv_translate_batch", { term: item.term, vi: item.vi });
    if (d?.sentences) { setViSentences(d.sentences); setTranslations(new Array(d.sentences.length).fill("")); }
  }, [item]);

  const submitTranslateBatch = useCallback(async () => {
    const items = viSentences.map((vi, i) => ({ vi, user: translations[i] || "" }));
    const d = await callAi("cpv_translate_batch_review", {
      term: item.term, en: item.en, items,
    });
    if (d) {
      const results = Array.isArray(d.results) ? d.results as { ok: boolean }[] : [];
      const xpEarned = results.reduce((sum, r) => sum + (r.ok ? 10 : 2), 0);
      const enriched = { ...d, items, xpEarned };
      setBatchResult(enriched);
      addGlobalXP(xpEarned);
      appendMessages(ik, il, cid, "cpv_translate", [
        { role: "user", content: "Submitted 5 translations", timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() },
      ]);
      clearDraft(translateDraftKey);
    }
  }, [viSentences, translations, item, ik, il, cid, appendMessages, translateDraftKey]);

  const quizSavedRef = useRef(false);
  const lq = useCallback(async () => {
    setQz(null); setQuizAnswers([]); quizSavedRef.current = false;
    const d = await callAi("cpv_context_quiz", { term: item.term, en: item.en, vi: item.vi, count: quizCount });
    if (d?.questions) { setQz(d); setQuizAnswers(new Array(d.questions.length).fill(null)); }
  }, [item, quizCount]);
  const pickQuizAnswer = useCallback((qi: number, oi: number) => {
    setQuizAnswers((prev) => { if (prev[qi] != null) return prev; const next = [...prev]; next[qi] = oi; return next; });
  }, []);
  const le = useCallback(async () => {
    const d = await callAi("cpv_example_gen", { term: item.term, en: item.en, vi: item.vi, count: 4 });
    if (d) {
      setExs(d);
      appendMessages(ik, il, null, "cpv_example_gen", [
        { role: "user", content: "Generate example sentences", timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() },
      ]);
    }
  }, [item, ik, il, appendMessages]);

  // Persist a completed quiz (questions + answers + score) so it survives a refresh
  // and syncs to Drive, like every other AI result. The quiz is an evaluation, so it
  // also awards XP (10 per correct / 2 per incorrect).
  useEffect(() => {
    if (!qz || quizSavedRef.current) return;
    if (quizAnswers.length === 0 || quizAnswers.some((a) => a === null)) return;
    quizSavedRef.current = true;
    const total = qz.questions.length;
    const score = quizAnswers.filter((a, qi) => a === qz.questions[qi].answerIndex).length;
    const xpEarned = score * 10 + (total - score) * 2;
    const enriched = { ...qz, userAnswers: quizAnswers, score, total, xpEarned };
    addGlobalXP(xpEarned);
    appendMessages(ik, il, null, "cpv_context_quiz", [
      { role: "user", content: `Answered ${total} quiz questions`, timestamp: Date.now() },
      { role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() },
    ]);
  }, [qz, quizAnswers, ik, il, appendMessages]);

  const [preview, setPreview] = useState<{ conversation: { speaker: string; text: string }[] } | null>(null);
  const [phase, setPhase] = useState<"idle" | "preview" | "practicing" | "feedback">("idle");
  const [feedback, setFeedback] = useState<Record<string, unknown> | null>(null);

  const loadPreview = useCallback(async () => {
    setLoading(true); setPhase("idle");
    const d = await callAi("cpv_conversation_preview", { terms: [{ term: item.term, en: item.en }] });
    if (d) { setPreview(d); setPhase("preview"); }
  }, [item]);

  const [chatBusy, setChatBusy] = useState<"send" | "end" | null>(null);

  const startPractice = useCallback(async () => {
    setChat([]); setPhase("practicing"); setFeedback(null); setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }], aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) { setError(j.error); return; }
      const aiText = j.data?.content ?? JSON.stringify(j.data);
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([am]);
      // Save the first AI message and get a conversation ID for grouping
      const newCid = appendMessages(ik, il, null, "cpv_conversation", [am]);
      setCid(newCid);
    } finally {
      setLoading(false);
    }
  }, [item, ik, il, appendMessages]);

  const sendMessage = useCallback(async () => {
    if (!chatIn.trim()) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um]; setChat(nm); setChatIn(""); setError(null);
    setChatBusy("send"); setLoading(true);
    try {
      const ct = nm.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }], history: ct, aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) { setError(j.error); return; }
      const aiText = (j.data?.content ?? "").replace(/\n*```json[\s\S]*?```\n*/g, "").replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "").trim();
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      appendMessages(ik, il, cid, "cpv_conversation", [um, am]);
    } finally {
      setChatBusy(null); setLoading(false);
    }
  }, [chatIn, chat, item, ik, il, cid, appendMessages]);

  const endAndFeedback = useCallback(async () => {
    setChatBusy("end"); setLoading(true); setError(null);
    try {
      const ct = chat.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }], history: ct, end: true, aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) { setError(j.error); return; }
      const xpEarned = j.data?.phrasesOk ? 20 : 8;
      const enriched = { ...j.data, xpEarned };
      setFeedback(enriched); setPhase("feedback");
      addGlobalXP(xpEarned);
      appendMessages(ik, il, cid, "cpv_conversation", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
    } finally {
      setChatBusy(null); setLoading(false);
    }
  }, [chat, item, ik, il, cid, appendMessages]);


  // Discussion — open-ended chat about the term/topic (no target-phrase requirement,
  // unlike Converse), same shape as Converse so it can reuse ConversationFeedback/history.
  // Unlike Converse, the STUDENT always speaks first here — there's no AI-initiated
  // opening line, since a discussion is meant to start from whatever the student
  // wants to ask or bring up, not a scripted prompt.
  const [discChat, setDiscChat] = useState<AiMessage[]>([]);
  const [discPhase, setDiscPhase] = useState<"practicing" | "feedback">("practicing");
  const [discFeedback, setDiscFeedback] = useState<Record<string, unknown> | null>(null);
  const [discCid, setDiscCid] = useState<string | null>(null);
  const [discChatIn, setDiscChatIn] = useState("");
  const [discBusy, setDiscBusy] = useState<"send" | "end" | null>(null);
  const [discError, setDiscError] = useState<string | null>(null);
  const discEndRef = useRef<HTMLDivElement>(null);
  const discTopic = `the phrase "${item.term}" (meaning: ${item.en})`;

  useEffect(() => { discEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [discChat]);

  const sendDiscMessage = useCallback(async () => {
    if (!discChatIn.trim()) return;
    const um: AiMessage = { role: "user", content: discChatIn.trim(), timestamp: Date.now() };
    const nm = [...discChat, um]; setDiscChat(nm); setDiscChatIn(""); setDiscError(null);
    setDiscBusy("send"); setLoading(true);
    try {
      const ct = nm.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "discussion", payload: { topic: discTopic, history: ct, aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) { setDiscError(j.error); return; }
      const aiText = (j.data?.content ?? "").replace(/\n*```json[\s\S]*?```\n*/g, "").replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "").trim();
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setDiscChat([...nm, am]);
      const newCid = appendMessages(ik, il, discCid, "discussion", [um, am]);
      if (!discCid) setDiscCid(newCid);
    } finally {
      setDiscBusy(null); setLoading(false);
    }
  }, [discChatIn, discChat, discTopic, ik, il, discCid, appendMessages]);

  const endDiscussion = useCallback(async () => {
    setDiscBusy("end"); setLoading(true); setDiscError(null);
    try {
      const ct = discChat.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "discussion", payload: { topic: discTopic, history: ct, end: true, aiLang: currentAiLang() } }) });
      const j = await r.json();
      if (!j.ok) { setDiscError(j.error); return; }
      const xpEarned = j.data?.wellDone ? 20 : 8;
      const enriched = { ...j.data, xpEarned };
      setDiscFeedback(enriched); setDiscPhase("feedback");
      addGlobalXP(xpEarned);
      appendMessages(ik, il, discCid, "discussion", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
    } finally {
      setDiscBusy(null); setLoading(false);
    }
  }, [discChat, discTopic, ik, il, discCid, appendMessages]);

  const handleContinueDiscussion = useCallback((convo: AiConversation) => {
    setDiscCid(convo.id);
    setMode("discussion");
    setDiscPhase("practicing");
    setDiscFeedback(null);
    setDiscChat(convo.messages.filter(m => m.role === "user" || m.role === "assistant"));
  }, []);

  function ts(m: PMode) { return { background: mode === m ? "var(--color-accent)" : "var(--color-surface)", color: mode === m ? "#fff" : "var(--color-text)", border: mode === m ? "none" : "1px solid var(--color-divider)" }; }

  const intentForMode: Record<PMode, string> = {
    write: "cpv_sentence_check", translate: "cpv_translate", quiz: "cpv_context_quiz",
    examples: "cpv_example_gen", converse: "cpv_conversation", discussion: "discussion",
  };

  const handleContinue = useCallback((convo: AiConversation) => {
    setCid(convo.id);
    setMode("converse");
    setPhase("practicing");
    setFeedback(null);
    // Filter to only user + assistant messages (skip system)
    const msgs = convo.messages.filter(m => m.role === "user" || m.role === "assistant");
    setChat(msgs);
  }, []);

  const quizDone = !!qz && quizAnswers.length > 0 && quizAnswers.every((a) => a !== null);
  const quizScore = quizDone ? quizAnswers.filter((a, qi) => a === qz.questions[qi].answerIndex).length : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">{(Object.keys(LABELS) as PMode[]).map(m => <button key={m} onClick={() => { setMode(m); setResult(null); setError(null); }} className="rounded-full px-3 py-1 text-[12px] font-bold" style={ts(m)}>{LABELS[m]}</button>)}</div>
      {showItemInfo && <div className="rounded bg-surface p-3 text-[13px] leading-relaxed"><span className="font-extrabold">{item.term}</span><span className="text-neutral-600"> — {item.vi}</span><br /><span className="text-[11px] italic text-neutral-500">Example: {item.ex}</span></div>}


      {mode === "write" && <div className="flex flex-col gap-3"><textarea className="input min-h-[80px] resize-y" placeholder={`Write a sentence using "${item.term}"...`} value={sentence} onChange={e => setSentence(e.target.value)} /><button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold disabled:opacity-40" disabled={loading || !sentence.trim()} onClick={sw}>{loading ? "Checking..." : "Check with AI"}</button></div>}

      {mode === "translate" && <div className="flex flex-col gap-3">
        {viSentences.length === 0 ? (
          <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={loadTranslate}>
            {loading ? "Generating..." : "Generate 5 Sentences"}
          </button>
        ) : !batchResult ? (
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-neutral-600">Translate each sentence using "{item.term}".</p>
            {viSentences.map((s, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="rounded bg-accent-100 px-3 py-2 text-[13px] leading-relaxed text-accent-800 font-medium">
                  <span className="label-xs mr-2 text-accent-700">{i + 1}.</span>{s}
                </div>
                <input
                  className="input text-[13px]"
                  placeholder="Your English translation..."
                  value={translations[i] || ""}
                  onChange={e => {
                    const next = [...translations];
                    next[i] = e.target.value;
                    setTranslations(next);
                  }}
                />
              </div>
            ))}
            <button
              className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold disabled:opacity-40"
              disabled={loading || translations.every(t => !t.trim())}
              onClick={submitTranslateBatch}
            >
              {loading ? "Reviewing..." : "Submit All & Get Feedback"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-extrabold">📝 Results</p>
              {batchResult?.xpEarned != null && <span className="text-[12px] font-extrabold text-accent">+{batchResult.xpEarned} XP</span>}
            </div>
            {viSentences.map((s, i) => {
              const r = batchResult?.results?.[i];
              return (
                <div key={i} className="rounded border p-3" style={{ borderColor: r?.ok ? "var(--color-accent)" : "var(--color-accent-800)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[12px] font-extrabold">{i + 1}. {s}</span>
                    <span className="text-[12px]">{r?.ok ? "✅" : "❌"}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-neutral-500 italic">Your: {translations[i]}</p>
                  {r?.feedback && <p className="mt-1 text-[12px]">{r.feedback}</p>}
                  {r?.corrected && (
                    <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-accent-800">
                      <span>→ {r.corrected}</span>
                      <CopyButton text={r.corrected} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
                    </p>
                  )}
                </div>
              );
            })}
            {batchResult?.overall && (
              <div className="rounded bg-accent-100 p-3 text-[13px] leading-relaxed text-accent-800">{batchResult.overall}</div>
            )}
            {batchResult?.best != null && (
              <p className="text-[12px]">⭐ Best: sentence #{batchResult.best + 1} &nbsp;|&nbsp; ⚠️ Work on: #{batchResult.needsWork + 1}</p>
            )}
            <button className="btn btn-ghost text-[12px]" onClick={loadTranslate} disabled={loading}>New set</button>
          </div>
        )}
      </div>}

      {mode === "quiz" && <div className="flex flex-col gap-3">{!qz ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label className="text-[12px] font-bold text-neutral-600" htmlFor="quiz-count">Number of questions</label>
            <input
              id="quiz-count"
              type="number"
              min={2}
              max={10}
              value={quizCount}
              onChange={e => setQuizCount(Math.min(10, Math.max(2, Number(e.target.value) || 5)))}
              className="input w-16 text-center text-[13px]"
            />
          </div>
          <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={lq}>{loading ? "Generating..." : "Generate Quiz"}</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {qz.questions.map((q: any, qi: number) => {
            const picked = quizAnswers[qi];
            return (
              <div key={qi} className="flex flex-col gap-2">
                <p className="text-[13px] leading-relaxed font-extrabold">{qi + 1}. {q.question}</p>
                <div className="flex flex-col gap-1.5">
                  {q.options.map((opt: string, oi: number) => (
                    <button
                      key={oi}
                      disabled={picked !== null}
                      onClick={() => pickQuizAnswer(qi, oi)}
                      className="rounded border p-2.5 text-left text-[13px] leading-relaxed"
                      style={{
                        borderColor: picked !== null ? (oi === q.answerIndex ? "var(--color-accent)" : oi === picked ? "var(--color-accent-800)" : "var(--color-divider)") : "var(--color-divider)",
                        background: picked !== null ? (oi === q.answerIndex ? "var(--color-accent-100)" : oi === picked ? "var(--color-accent-100)" : "transparent") : "transparent",
                      }}
                    >
                      <span className="label-xs mr-2">{QUIZ_LETTERS[oi]}.</span>{opt}
                      {picked !== null && oi === q.answerIndex && <span className="ml-2">✅</span>}
                      {picked !== null && oi === picked && oi !== q.answerIndex && <span className="ml-2">❌</span>}
                    </button>
                  ))}
                </div>
                {picked !== null && <div className="rounded bg-accent-100 p-2.5 text-[12px] text-accent-800">{q.explanation}</div>}
              </div>
            );
          })}
          {quizDone && (
            <div className="rounded bg-accent-100 p-3 text-[13px] font-extrabold text-accent-800">
              Score: {quizScore}/{qz.questions.length}
              <span className="ml-2 text-accent">+{quizScore * 10 + (qz.questions.length - quizScore) * 2} XP</span>
            </div>
          )}
          <button className="btn btn-ghost mt-1 text-[12px]" onClick={lq} disabled={loading}>New Quiz</button>
        </div>
      )}</div>}


      {mode === "examples" && <div className="flex flex-col gap-3">{!exs ? <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={le}>{loading ? "Generating..." : "Generate Examples"}</button> : <div className="flex flex-col gap-3">{exs.examples.map((ex: any, i: number) => (
        <div key={i} className="rounded border p-3" style={{ borderColor: "var(--color-divider)" }}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="label-xs block text-accent">{ex.context}</span>
            <CopyButton text={ex.sentence} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }} />
          </div>
          <p className="text-[13px] leading-relaxed font-extrabold">{ex.sentence}</p>
          <p className="mt-1 text-[11px] italic text-neutral-500">{ex.note}</p>
        </div>
      ))}<button className="btn btn-ghost text-[12px]" onClick={le} disabled={loading}>Refresh</button></div>}</div>}

      {mode === "converse" && <div className="flex flex-col gap-3">
        {/* Phase: Idle — show Generate Sample button */}
        {phase === "idle" && (
          <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={loadPreview}>
            {loading ? "Generating..." : "Generate Sample Conversation"}
          </button>
        )}

        {/* Phase: Preview — show sample + start practice button */}
        {phase === "preview" && preview && (
          <div className="flex flex-col gap-3">
            <div className="rounded bg-accent-100 p-3 text-[13px] leading-relaxed">
              <span className="label-xs mb-2 block text-accent-700">Sample conversation</span>
              {preview.conversation.map((line, i) => (
                <p key={i} className="mb-1"><span className="font-extrabold">{line.speaker}:</span> {line.text}</p>
              ))}
            </div>
            <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={startPractice}>
              {loading ? "Starting..." : "Start Practice"}
            </button>
          </div>
        )}

        {/* Phase: Practicing */}
        {phase === "practicing" && (
          <div className="flex flex-col gap-3">
            <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto rounded border p-3" style={{ borderColor: "var(--color-divider)" }}>
              {chat.map((m, i) => (
                <div key={i} className="rounded p-2.5 text-[13px] leading-relaxed group relative"
                  style={{ background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <span className="label-xs mb-0.5 block">{m.role === "user" ? "You" : "Partner"}</span>
                  <p className="whitespace-pre-wrap select-text">{m.content}</p>
                </div>
              ))}
              {chatBusy === "send" && (
                <div className="rounded p-2.5" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                  <span className="label-xs mb-1 block">Partner</span>
                  <span className="inline-flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {chatBusy === "end" ? (
              <div className="flex items-center justify-center gap-2 rounded border p-3 text-[12px] text-neutral-600" style={{ borderColor: "var(--color-divider)" }}>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Analyzing your conversation...
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={loading || !chatIn.trim()} />
                <button className="btn btn-primary px-3 py-2.5 text-[13px] font-extrabold" disabled={loading || !chatIn.trim()} onClick={sendMessage}>Send</button>
                <button className="btn btn-ghost px-3 py-2.5 text-[12px]" disabled={loading || !chat.some(m => m.role === "user")} onClick={endAndFeedback}>End</button>
              </div>
            )}
          </div>
        )}

        {/* Phase: Feedback */}
        {phase === "feedback" && feedback && (
          <ConversationFeedback
            messages={chat}
            feedback={feedback}
            onReset={() => { setPhase("idle"); setPreview(null); setFeedback(null); setChat([]); }}
            share={{
              title: item.term,
              text: `💬 Converse · ${item.term}`,
              getUrl: () => {
                const payload: SharedConvoPayload = {
                  kind: "conversation",
                  itemLabel: item.term,
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
      </div>}

      {mode === "discussion" && <div className="flex flex-col gap-3">
        {discPhase === "practicing" && (
          <div className="flex flex-col gap-3">
            {discChat.length === 0 && (
              <p className="text-[12px] text-neutral-600">
                {t("discussion.prompt", { term: item.term })}
              </p>
            )}
            <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto rounded border p-3" style={{ borderColor: "var(--color-divider)" }}>
              {discChat.map((m, i) => (
                <div key={i} className="rounded p-2.5 text-[13px] leading-relaxed group relative"
                  style={{ background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <span className="label-xs mb-0.5 block">{m.role === "user" ? "You" : "Partner"}</span>
                  <p className="whitespace-pre-wrap select-text">{m.content}</p>
                </div>
              ))}
              {discBusy === "send" && (
                <div className="rounded p-2.5" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                  <span className="label-xs mb-1 block">Partner</span>
                  <span className="inline-flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </span>
                </div>
              )}
              <div ref={discEndRef} />
            </div>
            {discBusy === "end" ? (
              <div className="flex items-center justify-center gap-2 rounded border p-3 text-[12px] text-neutral-600" style={{ borderColor: "var(--color-divider)" }}>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Analyzing your discussion...
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <ChatInput value={discChatIn} onChange={setDiscChatIn} onSend={sendDiscMessage} disabled={loading || !discChatIn.trim()} />
                <button className="btn btn-primary px-3 py-2.5 text-[13px] font-extrabold" disabled={loading || !discChatIn.trim()} onClick={sendDiscMessage}>Send</button>
                <button className="btn btn-ghost px-3 py-2.5 text-[12px]" disabled={loading || !discChat.some(m => m.role === "user")} onClick={endDiscussion}>End</button>
              </div>
            )}
          </div>
        )}

        {discPhase === "feedback" && discFeedback && (
          <ConversationFeedback
            messages={discChat}
            feedback={discFeedback}
            onReset={() => { setDiscPhase("practicing"); setDiscFeedback(null); setDiscChat([]); setDiscCid(null); }}
            share={{
              title: item.term,
              text: `🗣️ Discussion · ${item.term}`,
              getUrl: () => {
                const payload: SharedConvoPayload = {
                  kind: "conversation",
                  itemLabel: item.term,
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
      </div>}

      <AiFeedback loading={loading} result={result} error={error} onRetry={() => { mode === "write" ? sw() : mode === "translate" ? submitTranslateBatch() : mode === "quiz" ? lq() : le(); }} variant={mode === "quiz" || mode === "examples" ? "general" : "sentence"} />
      <AiConversationHistory
        moduleKey={moduleKey}
        itemKey={item.term}
        filterIntent={intentForMode[mode]}
        onContinue={mode === "discussion" ? handleContinueDiscussion : handleContinue}
        activeConvoId={mode === "discussion" ? (discPhase === "practicing" ? discCid : null) : (phase === "practicing" ? cid : null)}
      />
    </div>
  );
}