import type { Metadata } from "next";
import { getShare } from "@/lib/share-store";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { shareExcerpt } from "@/lib/share-excerpt";
import { AiHistoryMessage, INTENT_LABELS } from "@/components/AiConversationHistory";
import { ConversationFeedback } from "@/components/ConversationFeedback";

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getShare<SharedConvoPayload>(id);
  if (!data) return { title: "PhrasalUp" };

  const title = `${data.itemLabel} — PhrasalUp`;
  const description = shareExcerpt(data) || "Luyện tiếng Anh cùng PhrasalUp";
  return {
    title,
    description,
    openGraph: { title, description, type: "article", siteName: "PhrasalUp" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SharedConversationPage({ params }: Props) {
  const { id } = await params;
  const data = await getShare<SharedConvoPayload>(id);

  if (!data) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-[14px] font-extrabold">Link không hợp lệ hoặc đã hỏng</p>
        <p className="text-[12px] text-neutral-500">Nội dung được chia sẻ không thể đọc được.</p>
      </main>
    );
  }

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
      {data.feedback && <ConversationFeedback feedback={data.feedback} />}
      <p className="mt-2 border-t pt-2 text-center text-[11px] text-neutral-400" style={{ borderColor: "var(--color-divider)" }}>
        Shared from PhrasalUp
      </p>
    </main>
  );
}
