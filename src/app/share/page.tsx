"use client";

import { useEffect, useState } from "react";
import { decodeShareData } from "@/lib/share-encode";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { AiHistoryMessage, INTENT_LABELS } from "@/components/AiConversationHistory";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; data: SharedConvoPayload };

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function SharePage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    const match = window.location.hash.match(/#d=(.+)$/);
    const encoded = match?.[1];
    Promise.resolve()
      .then(() => {
        if (!encoded) throw new Error("missing share data");
        return decodeShareData<SharedConvoPayload>(encoded);
      })
      .then((data) => setState({ status: "ok", data }))
      .catch(() => setState({ status: "error" }));
  }, []);

  if (state.status === "loading") {
    return (
      <main className="flex flex-1 items-center justify-center p-6 text-[13px] text-neutral-500">
        Loading shared content…
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-[14px] font-extrabold">Link không hợp lệ hoặc đã hỏng</p>
        <p className="text-[12px] text-neutral-500">Nội dung được chia sẻ không thể đọc được.</p>
      </main>
    );
  }

  const { data } = state;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-3 p-3">
      <div className="border-b pb-2" style={{ borderColor: "var(--color-divider)" }}>
        <span className="label-xs text-neutral-500">
          {INTENT_LABELS[data.intent] || data.intent} · {fmtDate(data.sharedAt)}
        </span>
        <h1 className="text-[16px] font-extrabold">{data.itemLabel}</h1>
      </div>
      <div className="flex flex-col gap-2">
        {data.messages.map((m, i) => (
          <div
            key={i}
            className="max-w-[92%] rounded p-2.5 text-[13px] leading-relaxed"
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
      <p className="mt-2 border-t pt-2 text-center text-[11px] text-neutral-400" style={{ borderColor: "var(--color-divider)" }}>
        Shared from PhrasalUp
      </p>
    </main>
  );
}
