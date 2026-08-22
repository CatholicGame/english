"use client";

// Floating global Q&A chat, mounted once at the root layout so it's reachable
// from any screen. Answers are kept short and outline-style (see globalChat()
// in ai-prompts.ts), not long paragraphs. Threads map directly onto
// ai-convo-store's existing "many conversations per itemKey" support: every
// thread is just another AiConversation under the single itemKey "global", so
// new/continue/delete reuse appendMessages/deleteConversation as-is, no new
// storage needed.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import { ChatInput } from "./ChatInput";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiMessage } from "@/lib/ai-convo-store";
import { currentAiLang } from "@/lib/ai-lang-prefs";

const MODULE_KEY = "global-chat";
const ITEM_KEY = "global";

async function callAi(payload: Record<string, unknown>) {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent: "global_chat", payload: { ...payload, aiLang: currentAiLang() } }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || "AI failed");
  return j.data;
}

export function GlobalDiscussChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/login" || pathname.startsWith("/s/") || pathname.startsWith("/admin")) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Hỏi đáp nhanh"
        onClick={() => setOpen(true)}
        // ponytail: bottom-20 is a fixed offset chosen to clear ActionBarScreen's
        // pinned footer (single button or chat composer row) on most screens
        // without measuring its real height. If a taller footer ever overlaps
        // this button, thread the footer height through a shared context instead.
        className="fixed bottom-20 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full text-[20px] text-white shadow-lg"
        style={{ background: "var(--color-accent)" }}
      >
        💬
      </button>
      {open && <DiscussPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function DiscussPanel({ onClose }: { onClose: () => void }) {
  const { getConvos, appendMessages, deleteConversation } = useAiConvoStore(MODULE_KEY);
  const threads = [...getConvos(ITEM_KEY)].sort((a, b) => b.updatedAt - a.updatedAt);

  const [threadId, setThreadId] = useState<string | null>(threads[0]?.id ?? null);
  const [chat, setChat] = useState<AiMessage[]>(threads[0]?.messages ?? []);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((c) => c.id === threadId) ?? null;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!historyOpen) return;
    function onClick(e: MouseEvent) {
      if (historyRef.current && !historyRef.current.contains(e.target as Node)) setHistoryOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [historyOpen]);

  function openThread(id: string | null) {
    setThreadId(id);
    setChat(id ? threads.find((c) => c.id === id)?.messages ?? [] : []);
    setError(null);
    setHistoryOpen(false);
  }

  function removeThread(id: string) {
    deleteConversation(ITEM_KEY, id);
    if (id === threadId) openThread(null);
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const um: AiMessage = { role: "user", content: input.trim(), timestamp: Date.now() };
    const nm = [...chat, um];
    setChat(nm);
    setInput("");
    setSending(true);
    setError(null);
    try {
      const history = nm.map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n");
      const d = await callAi({ history });
      const aiText = (d?.content as string | undefined) ?? "";
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      const label = activeThread?.itemLabel ?? um.content.slice(0, 40);
      const newId = appendMessages(ITEM_KEY, label, threadId, "global_chat", [um, am]);
      setThreadId(newId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal onClose={onClose} contentClassName="lg:max-w-[900px]">
      {/* ponytail: 40px is Modal's p-5 top+bottom padding, so this column exactly
          fills the sheet's 75%-of-real-viewport cap and the message list below
          stays the ONE scroller. Two nested scrollers left the inner chat list
          unscrollable on touch, so a thread stayed stuck at its first message.
          --real-vh (not a bare vh unit) for the same reason as Modal's own cap. */}
      <div className="flex h-[calc(var(--real-vh,100vh)*0.75-40px)] flex-col">
        <div className="mb-2 flex-none text-[15px] font-extrabold">💬 Hỏi đáp nhanh</div>

        <div className="mb-3 flex flex-none items-center gap-1.5">
          <button
            type="button"
            onClick={() => openThread(null)}
            className="flex-none rounded px-2.5 py-1 text-[12px] font-extrabold whitespace-nowrap"
            style={{
              background: threadId === null ? "var(--color-accent-100)" : "var(--color-surface)",
              color: threadId === null ? "var(--color-accent-800)" : "var(--color-text)",
            }}
          >
            + Mới
          </button>

          <div className="relative flex-none" ref={historyRef}>
            <button
              type="button"
              onClick={() => setHistoryOpen((v) => !v)}
              className="flex-none rounded px-2.5 py-1 text-[12px] font-extrabold whitespace-nowrap"
              style={{ background: "var(--color-surface)", color: "var(--color-text)" }}
            >
              🕘 Lịch sử{threads.length > 0 ? ` (${threads.length})` : ""}
            </button>
            {historyOpen && (
              <div
                className="absolute left-0 top-full z-10 mt-1 max-h-64 w-64 overflow-y-auto rounded-lg border shadow-lg"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-divider)" }}
              >
                {threads.length === 0 ? (
                  <p className="p-3 text-[12px] text-neutral-500">Chưa có đoạn chat nào.</p>
                ) : (
                  threads.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-1 px-2 py-1.5"
                      style={{ background: c.id === threadId ? "var(--color-accent-100)" : "transparent" }}
                    >
                      <button
                        type="button"
                        className="flex-1 truncate text-left text-[12px] font-bold"
                        style={{ color: c.id === threadId ? "var(--color-accent-800)" : "var(--color-text)" }}
                        onClick={() => openThread(c.id)}
                      >
                        {c.itemLabel || "Đoạn chat"}
                      </button>
                      <button type="button" className="text-neutral-500 hover:text-neutral-700" onClick={() => removeThread(c.id)}>
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {activeThread && <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-neutral-600">{activeThread.itemLabel}</span>}
        </div>

        <div className="mb-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {chat.length === 0 && (
            <p className="text-[13px] text-neutral-600">Đặt câu hỏi bất kỳ, mình trả lời ngắn gọn theo dạng gạch đầu dòng.</p>
          )}
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

        {error && <p className="mb-2 flex-none text-[12px] text-accent-700">{error}</p>}

        <div className="flex flex-none items-end gap-2">
          <ChatInput value={input} onChange={setInput} onSend={sendMessage} disabled={sending || !input.trim()} placeholder="Hỏi bất kỳ điều gì..." />
          <button
            className="btn btn-primary px-3 py-2.5 text-[13px] font-extrabold disabled:opacity-40"
            disabled={sending || !input.trim()}
            onClick={sendMessage}
          >
            Gửi
          </button>
        </div>
      </div>
    </Modal>
  );
}
