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

type PMode = "write" | "translate" | "quiz" | "examples" | "converse";

const LABELS: Record<PMode, string> = {
  write: "Write", translate: "Translate", quiz: "Quiz",
  examples: "Examples", converse: "Converse",
};

export interface ItemInfo {
  term: string; type: string; en: string; vi: string; ex: string;
}

export function AiSentencePractice({ item, moduleKey }: { item: ItemInfo; moduleKey: string }) {
  const ik = item.term;
  const il = `${item.term} (${item.type})`;
  const { appendMessages } = useAiConvoStore(moduleKey);
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
  const [qp, setQp] = useState<number | null>(null);
  const [exs, setExs] = useState<any>(null);
  const [chatIn, setChatIn] = useState("");
  const [chat, setChat] = useState<AiMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  async function callAi(intent: IntentType, payload: Record<string, unknown>) {
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent, payload }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "AI failed");
      return j.data;
    } catch (e: any) { setError(e.message); return null; }
    finally { setLoading(false); }
  }
  const sw = useCallback(async () => {
    if (!sentence.trim()) return;
    const d = await callAi("cpv_sentence_check", { term: item.term, en: item.en, vi: item.vi, ex: item.ex, sentence: sentence.trim() });
    if (d) { setResult(d); const id = appendMessages(ik, il, cid, "cpv_sentence_check", [{ role: "user", content: sentence.trim(), timestamp: Date.now() }, { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() }]); if (!cid) setCid(id); }
  }, [sentence, item, ik, il, cid, appendMessages]);

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
    }
  }, [viSentences, translations, item, ik, il, cid, appendMessages]);

  const lq = useCallback(async () => { setQp(null); const d = await callAi("cpv_context_quiz", { term: item.term, en: item.en, vi: item.vi }); if (d) setQz(d); }, [item]);
  const le = useCallback(async () => { const d = await callAi("cpv_example_gen", { term: item.term, en: item.en, vi: item.vi, count: 4 }); if (d) setExs(d); }, [item]);

  const [preview, setPreview] = useState<{ conversation: { speaker: string; text: string }[] } | null>(null);
  const [phase, setPhase] = useState<"idle" | "preview" | "practicing" | "feedback">("idle");
  const [feedback, setFeedback] = useState<Record<string, unknown> | null>(null);

  const loadPreview = useCallback(async () => {
    setLoading(true); setPhase("idle");
    const d = await callAi("cpv_conversation_preview", { terms: [{ term: item.term, en: item.en }] });
    if (d) { setPreview(d); setPhase("preview"); }
  }, [item]);

  const startPractice = useCallback(async () => {
    setChat([]); setPhase("practicing"); setFeedback(null);
    const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }] } }) });
    const j = await r.json();
    if (!j.ok) { setError(j.error); return; }
    const aiText = j.data?.content ?? JSON.stringify(j.data);
    const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
    setChat([am]);
    // Save the first AI message and get a conversation ID for grouping
    const newCid = appendMessages(ik, il, null, "cpv_conversation", [am]);
    setCid(newCid);
  }, [item, ik, il, appendMessages]);

  const sendMessage = useCallback(async () => {
    if (!chatIn.trim()) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um]; setChat(nm); setChatIn("");
    const ct = nm.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
    const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }], history: ct } }) });
    const j = await r.json();
    if (!j.ok) { setError(j.error); return; }
    const aiText = (j.data?.content ?? "").replace(/\n*```json[\s\S]*?```\n*/g, "").replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "").trim();
    const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
    setChat([...nm, am]);
    appendMessages(ik, il, cid, "cpv_conversation", [um, am]);
  }, [chatIn, chat, item, ik, il, cid, appendMessages]);

  const endAndFeedback = useCallback(async () => {
    setLoading(true);
    const ct = chat.map(m => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
    const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "cpv_conversation", payload: { terms: [{ term: item.term, en: item.en }], history: ct, end: true } }) });
    const j = await r.json();
    if (!j.ok) { setError(j.error); setLoading(false); return; }
    const xpEarned = j.data?.phrasesOk ? 20 : 8;
    const enriched = { ...j.data, xpEarned };
    setFeedback(enriched); setPhase("feedback"); setLoading(false);
    addGlobalXP(xpEarned);
    appendMessages(ik, il, cid, "cpv_conversation", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
  }, [chat, item, ik, il, cid, appendMessages]);


  function ts(m: PMode) { return { background: mode === m ? "var(--color-accent)" : "var(--color-surface)", color: mode === m ? "#fff" : "var(--color-text)", border: mode === m ? "none" : "1px solid var(--color-divider)" }; }

  const intentForMode: Record<PMode, string> = {
    write: "cpv_sentence_check", translate: "cpv_translate", quiz: "cpv_context_quiz",
    examples: "cpv_example_gen", converse: "cpv_conversation",
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">{(Object.keys(LABELS) as PMode[]).map(m => <button key={m} onClick={() => { setMode(m); setResult(null); setError(null); }} className="rounded-full px-3 py-1 text-[12px] font-bold" style={ts(m)}>{LABELS[m]}</button>)}</div>
      <div className="rounded bg-surface p-3 text-[13px] leading-relaxed"><span className="font-extrabold">{item.term}</span><span className="text-neutral-600"> — {item.vi}</span><br /><span className="text-[11px] italic text-neutral-500">Example: {item.ex}</span></div>


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
                  {r?.corrected && <p className="mt-0.5 text-[12px] text-accent-800">→ {r.corrected}</p>}
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

      {mode === "quiz" && <div className="flex flex-col gap-3">{!qz ? <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={lq}>{loading ? "Generating..." : "Generate Quiz"}</button> : <div className="flex flex-col gap-2">{qz.sentences.map((s: any, i: number) => <button key={i} disabled={qp !== null} onClick={() => setQp(i)} className="rounded border p-3 text-left text-[13px] leading-relaxed" style={{ borderColor: qp !== null ? (s.correct ? "var(--color-accent)" : qp === i ? "var(--color-accent-800)" : "var(--color-divider)") : "var(--color-divider)", background: qp !== null ? (s.correct ? "var(--color-accent-100)" : qp === i ? "var(--color-accent-100)" : "transparent") : "transparent" }}><span className="label-xs mr-2">{["A","B","C"][i]}.</span>{s.text}{qp !== null && <span className="ml-2">{s.correct ? "✅" : qp === i ? "❌" : ""}</span>}</button>)}{qp !== null && <div className="rounded bg-accent-100 p-3 text-[12px] text-accent-800">{qz.explanation}</div>}<button className="btn btn-ghost mt-1 text-[12px]" onClick={lq} disabled={loading}>New Quiz</button></div>}</div>}


      {mode === "examples" && <div className="flex flex-col gap-3">{!exs ? <button className="btn btn-primary px-4 py-2.5 text-[13px] font-extrabold" disabled={loading} onClick={le}>{loading ? "Generating..." : "Generate Examples"}</button> : <div className="flex flex-col gap-3">{exs.examples.map((ex: any, i: number) => <div key={i} className="rounded border p-3" style={{ borderColor: "var(--color-divider)" }}><span className="label-xs mb-1 block text-accent">{ex.context}</span><p className="text-[13px] leading-relaxed font-extrabold">{ex.sentence}</p><p className="mt-1 text-[11px] italic text-neutral-500">{ex.note}</p></div>)}<button className="btn btn-ghost text-[12px]" onClick={le} disabled={loading}>Refresh</button></div>}</div>}

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
              <div ref={chatEndRef} />
            </div>
            <div className="flex items-end gap-2">
              <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={loading || !chatIn.trim()} />
              <button className="btn btn-primary px-3 py-2.5 text-[13px] font-extrabold" disabled={loading || !chatIn.trim()} onClick={sendMessage}>Send</button>
              <button className="btn btn-ghost px-3 py-2.5 text-[12px]" disabled={loading || !chat.some(m => m.role === "user")} onClick={endAndFeedback}>End</button>
            </div>
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

      <AiFeedback loading={loading} result={result} error={error} onRetry={() => { mode === "write" ? sw() : mode === "translate" ? submitTranslateBatch() : mode === "quiz" ? lq() : le(); }} variant={mode === "quiz" || mode === "examples" ? "general" : "sentence"} />
      <AiConversationHistory moduleKey={moduleKey} itemKey={item.term} filterIntent={intentForMode[mode]} onContinue={handleContinue} activeConvoId={phase === "practicing" ? cid : null} />
    </div>
  );
}