"use client";

// Grammar lookup + discussion — sits alongside VocabPopup as a second action
// on any text selection. The AI first classifies whether the selection shows
// a nameable grammar structure (needs at least a full clause/sentence); if it
// does, the result is saved to the personal grammar dictionary
// (grammar-store.ts) and the popup turns into an open chat so the learner can
// ask follow-up questions, backed by the same ai-convo-store persistence used
// everywhere else. Past entries sharing the same grammar category are listed
// as a reminder ("you've seen this structure before").

import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { ChatInput } from "./ChatInput";
import { CopyButton } from "./CopyButton";
import { findSimilarByCategory, normalizeGrammarText } from "@/lib/grammar-store";
import { useGrammarStore } from "@/lib/use-grammar-store";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiMessage } from "@/lib/ai-convo-store";
import { currentAiLang } from "@/lib/ai-lang-prefs";

const MODULE_KEY = "grammar-lookup";

interface ClassifyResult {
  isGrammar: boolean;
  category?: string;
  explanation?: string;
  example?: { en: string; vi: string };
  note?: string;
}

interface Props {
  text: string;
  context?: string;
  onClose: () => void;
}

async function callAi(payload: Record<string, unknown>) {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent: "grammar_lookup", payload: { ...payload, aiLang: currentAiLang() } }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || "AI failed");
  return j.data;
}

export function GrammarPopup({ text, context, onClose }: Props) {
  const { entries, getEntry, saveEntry } = useGrammarStore();
  const { getConvos, appendMessages } = useAiConvoStore(MODULE_KEY);
  const key = normalizeGrammarText(text);

  // Resolved synchronously from cache (lazy initializers, not an effect) —
  // avoids a redundant AI call and a set-state-in-effect for the common case
  // of reopening an already-classified sentence.
  const cachedEntry = getEntry(key);
  const cachedConvo = getConvos(key)[0];

  const [result, setResult] = useState<ClassifyResult | null>(() =>
    cachedEntry
      ? { isGrammar: true, category: cachedEntry.category, explanation: cachedEntry.explanation, example: cachedEntry.example }
      : null,
  );
  const [loading, setLoading] = useState(() => !cachedEntry);
  const [error, setError] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(() => cachedConvo?.id ?? null);
  const [chat, setChat] = useState<AiMessage[]>(() => (cachedConvo ? cachedConvo.messages.slice(1) : []));
  const [chatIn, setChatIn] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cachedEntry) return; // already resolved above
    let cancelled = false;

    callAi({ text, context })
      .then((d: ClassifyResult) => {
        if (cancelled) return;
        setResult(d);
        if (d.isGrammar && d.category) {
          saveEntry(key, {
            text,
            category: d.category,
            explanation: d.explanation ?? "",
            example: d.example,
            context,
            discussed: false,
          });
          const newCid = appendMessages(key, d.category, null, "grammar_lookup", [
            { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() },
          ]);
          setCid(newCid);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "AI failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  async function sendMessage() {
    if (!chatIn.trim() || !result?.category) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um];
    setChat(nm);
    setChatIn("");
    setSending(true);
    setError(null);
    try {
      const history = nm.map((m) => `${m.role === "user" ? "Student" : "Tutor"}: ${m.content}`).join("\n");
      const d = await callAi({ text, category: result.category, history });
      const aiText = (d?.content as string | undefined) ?? "";
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      const newCid = appendMessages(key, result.category, cid, "grammar_lookup", [um, am]);
      setCid(newCid);

      const entry = getEntry(key);
      if (entry && !entry.discussed) saveEntry(key, { ...entry, discussed: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setSending(false);
    }
  }

  const similar = result?.isGrammar && result.category ? findSimilarByCategory(entries, result.category, key) : [];

  return (
    <Modal onClose={onClose}>
      {loading ? (
        <p className="animate-pulse text-[13px] text-neutral-600">Đang phân tích ngữ pháp...</p>
      ) : error ? (
        <p className="text-[13px] text-accent-700">{error}</p>
      ) : !result ? null : !result.isGrammar ? (
        <div>
          <div className="mb-1 text-[15px] font-extrabold">📐 Không có cấu trúc ngữ pháp đặc biệt</div>
          {result.note && <p className="text-[13px] leading-relaxed text-neutral-600">{result.note}</p>}
        </div>
      ) : (
        <div className="flex flex-col gap-3 pr-4">
          <div>
            <span className="label-xs text-accent">Cấu trúc ngữ pháp</span>
            <div className="mt-0.5 text-[16px] font-extrabold">{result.category}</div>
          </div>
          <p className="text-[14px] leading-relaxed">{result.explanation}</p>

          {result.example && (
            <div className="border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
              <span className="label-xs">Ví dụ khác</span>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[14px] leading-relaxed">
                <span>{result.example.en}</span>
                <CopyButton text={result.example.en} className="text-[11px] font-bold text-accent" />
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-600">{result.example.vi}</p>
            </div>
          )}

          {similar.length > 0 && (
            <div className="border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
              <span className="label-xs mb-1.5 block text-neutral-600">
                🔁 Bạn đã từng gặp cấu trúc này ({similar.length})
              </span>
              <div className="flex flex-col gap-1">
                {similar.map(([k, e]) => (
                  <div key={k} className="rounded bg-surface px-2.5 py-1.5 text-[12px] leading-relaxed">
                    <p className="truncate">{e.text}</p>
                    {e.discussed && <span className="text-[10px] font-bold text-accent">✓ Đã thảo luận</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
            <span className="label-xs mb-2 block text-accent">🗣️ Hỏi thêm về ngữ pháp này</span>
            {chat.length > 0 && (
              <div className="mb-2 flex max-h-[240px] flex-col gap-2 overflow-y-auto">
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className="rounded p-2 text-[12px] leading-relaxed"
                    style={{
                      background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)",
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                    }}
                  >
                    <span className="label-xs mb-0.5 block">{m.role === "user" ? "Bạn" : "AI"}</span>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))}
                {sending && (
                  <div className="rounded p-2" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                    <span className="inline-flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
            <div className="flex items-end gap-2">
              <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={sending || !chatIn.trim()} />
              <button
                className="btn btn-primary px-3 py-2.5 text-[13px] font-extrabold disabled:opacity-40"
                disabled={sending || !chatIn.trim()}
                onClick={sendMessage}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
