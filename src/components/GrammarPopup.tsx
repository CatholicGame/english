"use client";

// Grammar lookup + discussion — sits alongside VocabPopup as a second action
// on any text selection. The AI first classifies whether the selection shows
// a nameable grammar structure (needs at least a full clause/sentence); if it
// does, the result is saved to the personal grammar dictionary
// (grammar-store.ts) and the popup grows a sidebar + an open chat:
//
// - Sidebar: only the saved entries that share the current lookup's grammar
//   category (grammar repeats across many sentences — Second Conditional shows
//   up again and again), so the learner immediately sees this is a REPETITION
//   of something they've already looked up. Picking an entry switches the
//   detail pane to that record.
// - Detail pane: category/explanation/example for whichever record is
//   selected, plus its own ongoing chat (reuses ChatInput + useAiConvoStore,
//   same persistence pattern as LessonDiscussion). GrammarChat is remounted
//   (via `key`) per record so each one's chat state stays independent without
//   manual reset logic.

import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { ChatInput } from "./ChatInput";
import { CopyButton } from "./CopyButton";
import { normalizeCategory, normalizeGrammarText } from "@/lib/grammar-store";
import { useGrammarStore } from "@/lib/use-grammar-store";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiMessage } from "@/lib/ai-convo-store";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { renderRich } from "@/lib/rich-text";

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
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const originalKey = normalizeGrammarText(text);
  const cachedEntry = getEntry(originalKey);

  // Ephemeral classification result for the sentence actually being looked up
  // right now — before it necessarily has a saved entry (or forever, if
  // isGrammar turns out false and nothing gets saved).
  const [freshResult, setFreshResult] = useState<ClassifyResult | null>(() =>
    cachedEntry
      ? { isGrammar: true, category: cachedEntry.category, explanation: cachedEntry.explanation, example: cachedEntry.example }
      : null,
  );
  const [loading, setLoading] = useState(() => !cachedEntry);
  const [error, setError] = useState<string | null>(null);
  const [viewingKey, setViewingKey] = useState(originalKey);

  useEffect(() => {
    if (cachedEntry) return; // already resolved above
    let cancelled = false;

    // Dedup existing category labels so the AI can reuse the exact same
    // string for the same structure instead of re-phrasing it (e.g. "So +
    // Adjective + That Clause" vs "Result Clause (so...that)") — without
    // this, the sidebar's exact-string match below never resurfaces earlier
    // lookups of the same grammar point.
    const knownCategories = Array.from(
      new Map(Object.values(entries).map((e) => [normalizeCategory(e.category), e.category])).values(),
    );

    callAi({ text, context, knownCategories })
      .then((d: ClassifyResult) => {
        if (cancelled) return;
        setFreshResult(d);
        if (d.isGrammar && d.category) {
          saveEntry(originalKey, {
            text,
            category: d.category,
            explanation: d.explanation ?? "",
            example: d.example,
            context,
            discussed: false,
          });
          appendMessages(originalKey, d.category, null, "grammar_lookup", [
            { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() },
          ]);
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
  }, [originalKey]);

  const viewingEntry = entries[viewingKey] ?? null;
  const isViewingOriginal = viewingKey === originalKey;
  const category = viewingEntry?.category ?? (isViewingOriginal ? freshResult?.category : undefined);
  const explanation = viewingEntry?.explanation ?? (isViewingOriginal ? freshResult?.explanation : undefined);
  const example = viewingEntry?.example ?? (isViewingOriginal ? freshResult?.example : undefined);
  const isGrammar = viewingEntry ? true : isViewingOriginal ? freshResult?.isGrammar : undefined;
  const note = isViewingOriginal ? freshResult?.note : undefined;

  // Only surface entries that share the CURRENT lookup's grammar category, so the
  // learner sees at a glance that this structure has come up before (a repetition),
  // rather than a browsable index of every unrelated structure ever looked up.
  const originalCategory = cachedEntry?.category ?? freshResult?.category;
  const sameCategoryEntries = Object.entries(entries)
    .filter(([, e]) => normalizeCategory(e.category) === normalizeCategory(originalCategory ?? ""))
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  const showSidebar = sameCategoryEntries.length > 1;

  return (
    <Modal onClose={onClose} contentClassName="lg:max-w-[1080px]">
      {loading && isViewingOriginal ? (
        <p className="animate-pulse text-[16px] text-neutral-600">Đang phân tích ngữ pháp...</p>
      ) : error && isViewingOriginal ? (
        <p className="text-[16px] text-accent-700">{error}</p>
      ) : isGrammar === false ? (
        <div>
          <div className="mb-1 text-[18px] font-extrabold">📐 Không có cấu trúc ngữ pháp đặc biệt</div>
          {note && <p className="text-[16px] leading-relaxed text-neutral-600">{note}</p>}
        </div>
      ) : (
        <div className="lg:flex lg:flex-row lg:gap-4">
          {showSidebar && (
            <div
              className="mb-3 lg:mb-0 lg:w-[220px] lg:flex-none lg:border-r lg:pr-4"
              style={{ borderColor: "var(--color-divider)" }}
            >
              <span className="label-xs mb-1.5 block text-neutral-600">
                🔁 Đã gặp cấu trúc này ({sameCategoryEntries.length} lần)
              </span>
              <div className="flex max-h-[160px] flex-col gap-0.5 overflow-y-auto lg:max-h-[420px]">
                {sameCategoryEntries.map(([k, e]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setViewingKey(k)}
                    className="rounded px-2 py-1 text-left text-[16px] leading-snug"
                    style={{
                      background: k === viewingKey ? "var(--color-accent-100)" : undefined,
                      color: k === viewingKey ? "var(--color-accent-800)" : "var(--color-text)",
                    }}
                  >
                    <span className="line-clamp-2">{e.text}</span>
                    {e.discussed && <span className="ml-1 text-[16px] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-3 pr-4 lg:pr-0">
            <div>
              <span className="label-xs text-accent">Cấu trúc ngữ pháp</span>
              <div className="mt-0.5 text-[19px] font-extrabold">{category}</div>
            </div>
            {explanation && <p className="text-[17px] leading-relaxed">{explanation}</p>}

            {example && (
              <div className="border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
                <span className="label-xs">Ví dụ khác</span>
                <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[17px] leading-relaxed">
                  <span>{example.en}</span>
                  <CopyButton text={example.en} className="text-[16px] font-bold text-accent" />
                </p>
                <p className="mt-0.5 text-[16px] text-neutral-600">{example.vi}</p>
              </div>
            )}

            {viewingEntry && <GrammarChat key={viewingKey} entryKey={viewingKey} text={viewingEntry.text} category={viewingEntry.category} />}
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Chat continuation for one grammar record — remounted (via the parent's
 * `key={viewingKey}`) whenever the sidebar selection changes, so each
 * record's chat state is independent without manual reset wiring. */
function GrammarChat({ entryKey, text, category }: { entryKey: string; text: string; category: string }) {
  const { getEntry, saveEntry } = useGrammarStore();
  const { getConvos, appendMessages } = useAiConvoStore(MODULE_KEY);
  const cachedConvo = getConvos(entryKey)[0];

  const [cid, setCid] = useState<string | null>(() => cachedConvo?.id ?? null);
  const [chat, setChat] = useState<AiMessage[]>(() => (cachedConvo ? cachedConvo.messages.slice(1) : []));
  const [chatIn, setChatIn] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  async function sendMessage() {
    if (!chatIn.trim()) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um];
    setChat(nm);
    setChatIn("");
    setSending(true);
    setError(null);
    try {
      const history = nm.map((m) => `${m.role === "user" ? "Student" : "Tutor"}: ${m.content}`).join("\n");
      const d = await callAi({ text, category, history });
      const aiText = (d?.content as string | undefined) ?? "";
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      const newCid = appendMessages(entryKey, category, cid, "grammar_lookup", [um, am]);
      setCid(newCid);

      const entry = getEntry(entryKey);
      if (entry && !entry.discussed) saveEntry(entryKey, { ...entry, discussed: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
      <span className="label-xs mb-2 block text-accent">🗣️ Hỏi thêm về ngữ pháp này</span>
      {chat.length > 0 && (
        <div className="mb-2 flex max-h-[240px] flex-col gap-2 overflow-y-auto">
          {chat.map((m, i) => (
            <div
              key={i}
              className="rounded p-2 text-[16px] leading-relaxed"
              style={{
                background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
              }}
            >
              <span className="label-xs mb-0.5 block">{m.role === "user" ? "Bạn" : "AI"}</span>
              <p className="whitespace-pre-wrap">{renderRich(m.content)}</p>
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
      {error && <p className="mb-2 text-[16px] text-accent-700">{error}</p>}
      <div className="flex items-end gap-2">
        <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={sending || !chatIn.trim()} />
        <button
          className="btn btn-primary px-3 py-2.5 text-[16px] font-extrabold disabled:opacity-40"
          disabled={sending || !chatIn.trim()}
          onClick={sendMessage}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
