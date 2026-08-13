"use client";

import { useState } from "react";
import type { AiMessage } from "@/lib/ai-convo-store";
import { ShareButton } from "./ShareButton";

interface Correction {
  wrong: string;
  correct: string;
}

interface Turn {
  comment?: string;
  corrections?: Correction[];
  betterExample?: string;
}

interface SuggestionGroup {
  category: string;
  phrases: string[];
}

interface Props {
  messages: AiMessage[];
  feedback: Record<string, unknown>;
  onReset?: () => void;
  /** Shows a Share button (chat + this feedback) when provided — omit for read-only views like the public share page. */
  share?: { title: string; text?: string; getUrl: () => Promise<string> | string; getImageUrl?: (url: string) => string };
}

const TEXT = {
  en: {
    heading: "Feedback",
    phrasesOk: "✅ Correct phrase usage!",
    phrasesNeedsWork: "⚠️ Phrase usage needs work",
    aiFeedback: "AI Feedback",
    betterExample: "📖 Try instead",
    styleTitle: "🗣 Delivery & Style",
    suggestionsTitle: "💡 Suggestions to practice",
    progressTitle: "🌟 Progress",
    tryAgain: "Try Again",
  },
  vi: {
    heading: "Nhận xét",
    phrasesOk: "✅ Dùng đúng cụm từ!",
    phrasesNeedsWork: "⚠️ Cách dùng cụm từ cần cải thiện",
    aiFeedback: "Nhận xét của AI",
    betterExample: "📖 Thử câu này",
    styleTitle: "🗣 Cách diễn đạt",
    suggestionsTitle: "💡 Gợi ý luyện tập",
    progressTitle: "🌟 Tiến bộ",
    tryAgain: "Thử lại",
  },
};

/** Renders the full end-of-conversation review: the transcript with each
 * student reply immediately followed by that reply's own feedback (so a
 * correction always sits next to the sentence it corrects), then a closing
 * summary (style, suggestions, progress). One EN/VI toggle drives both the
 * per-turn comments and the summary. Shared by every "Converse" practice flow
 * — live screen, history popup, and the public share page/image — so they
 * never drift apart. */
export function ConversationFeedback({ messages, feedback, onReset, share }: Props) {
  const vi = feedback.vi as Record<string, unknown> | undefined;
  const [lang, setLang] = useState<"en" | "vi">("en");
  const t = TEXT[lang];

  const turns = Array.isArray(feedback.turns) ? (feedback.turns as Turn[]) : [];
  const turnsViComments = Array.isArray(vi?.turns) ? (vi?.turns as string[]) : [];

  const style = (lang === "vi" && Array.isArray(vi?.style) ? vi?.style : feedback.style) as string[] | undefined;
  const styleHighlight = (lang === "vi" ? vi?.styleHighlight : feedback.styleHighlight) as string | undefined;
  const suggestions = (lang === "vi" && Array.isArray(vi?.suggestions) ? vi?.suggestions : feedback.suggestions) as SuggestionGroup[] | undefined;
  const progress = (lang === "vi" && Array.isArray(vi?.progress) ? vi?.progress : feedback.progress) as string[] | undefined;

  let userTurnIndex = -1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end gap-2">
        {vi && (
          <div className="flex gap-1">
            {(["en", "vi"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
                style={{
                  background: lang === l ? "var(--color-accent)" : "var(--color-surface)",
                  color: lang === l ? "#fff" : "var(--color-text)",
                  border: lang === l ? "none" : "1px solid var(--color-divider)",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        {share && (
          <ShareButton
            className="rounded-full border px-2 py-0.5 text-[11px] font-bold"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            title={share.title}
            text={share.text}
            getUrl={share.getUrl}
            getImageUrl={share.getImageUrl}
            label="Share"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          const turn = isUser ? turns[++userTurnIndex] : undefined;
          const comment = turn && lang === "vi" ? turnsViComments[userTurnIndex] ?? turn.comment : turn?.comment;
          return (
            <div key={i} className="flex flex-col" style={{ alignItems: isUser ? "flex-end" : "flex-start" }}>
              <div
                className="max-w-[92%] rounded p-2.5 text-[13px] leading-relaxed"
                style={{ background: isUser ? "var(--color-accent-100)" : "var(--color-surface)" }}
              >
                <span className="label-xs mb-0.5 block">{isUser ? "You" : m.role === "assistant" ? "AI" : "System"}</span>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
              {turn && ((turn.corrections && turn.corrections.length > 0) || comment || turn.betterExample) && (
                <div
                  className="mt-1 max-w-[92%] rounded border-l-2 p-2 text-[12px] leading-relaxed"
                  style={{ borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}
                >
                  <span className="label-xs mb-0.5 block text-accent-700">{t.aiFeedback}</span>
                  {turn.corrections?.map((c, j) => (
                    <p key={j}>❌ &quot;{c.wrong}&quot; → <span className="font-bold">✅ &quot;{c.correct}&quot;</span></p>
                  ))}
                  {comment && <p className={turn.corrections && turn.corrections.length > 0 ? "mt-1" : ""}>{comment}</p>}
                  {turn.betterExample && (
                    <p className="mt-1">
                      <span className="font-bold">{t.betterExample}:</span> &quot;{turn.betterExample}&quot;
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded border bg-surface p-4 text-[13px] leading-relaxed" style={{ borderColor: "var(--color-divider)" }}>
        <span className="label-xs mb-2 block text-accent">{t.heading}</span>

        {feedback.phrasesOk !== undefined && (
          <p className="mb-3 font-extrabold">{feedback.phrasesOk ? t.phrasesOk : t.phrasesNeedsWork}</p>
        )}

        {((style && style.length > 0) || styleHighlight) && (
          <div className="mb-3">
            <p className="mb-1.5 font-extrabold">{t.styleTitle}</p>
            {style && style.length > 0 && (
              <ul className="list-disc pl-4 text-[12px]">
                {style.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
            {styleHighlight && (
              <p className="mt-1 text-[12px] font-bold" style={{ color: "var(--color-accent)" }}>✅ {styleHighlight}</p>
            )}
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="mb-3">
            <p className="mb-1.5 font-extrabold">{t.suggestionsTitle}</p>
            <div className="flex flex-col gap-1.5">
              {suggestions.map((sug, i) => (
                <div key={i}>
                  <p className="text-[12px] font-bold">{sug.category}</p>
                  <ul className="list-disc pl-4 text-[12px]">
                    {sug.phrases?.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {progress && progress.length > 0 && (
          <div className="mb-1">
            <p className="mb-1.5 font-extrabold">{t.progressTitle}</p>
            <ul className="list-disc pl-4 text-[12px] italic">
              {progress.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}

        {typeof feedback.xpEarned === "number" && (
          <p className="mt-2 text-[11px] font-extrabold text-accent">+{feedback.xpEarned} XP</p>
        )}
        {onReset && <button className="btn btn-ghost mt-3 text-[12px]" onClick={onReset}>{t.tryAgain}</button>}
      </div>
    </div>
  );
}
