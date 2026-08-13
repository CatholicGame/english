"use client";

import { useState } from "react";
import { ShareButton } from "./ShareButton";

interface Props {
  feedback: Record<string, unknown>;
  onReset?: () => void;
  /** Shows a Share button (chat + this feedback) when provided — omit for read-only views like the public share page. */
  share?: { title: string; text?: string; getUrl: () => Promise<string> | string };
}

const TEXT = {
  en: {
    heading: "Feedback",
    phrasesOk: "✅ Correct phrase usage!",
    phrasesNeedsWork: "⚠️ Phrase usage needs work",
    grammar: "Grammar:",
    tryAgain: "Try Again",
  },
  vi: {
    heading: "Nhận xét",
    phrasesOk: "✅ Dùng đúng cụm từ!",
    phrasesNeedsWork: "⚠️ Cách dùng cụm từ cần cải thiện",
    grammar: "Ngữ pháp:",
    tryAgain: "Thử lại",
  },
};

/** Renders the end-of-conversation AI feedback with an EN/VI tab toggle when a
 * Vietnamese translation (`feedback.vi`) is present. Shared by every "Converse"
 * practice flow so the two copies never drift out of sync. */
export function ConversationFeedback({ feedback, onReset, share }: Props) {
  const vi = feedback.vi as Record<string, unknown> | undefined;
  const [lang, setLang] = useState<"en" | "vi">("en");
  const t = TEXT[lang];

  const grammarIssues = (lang === "vi" && Array.isArray(vi?.grammarIssues) ? vi?.grammarIssues : feedback.grammarIssues) as string[] | undefined;
  const naturalness = lang === "vi" ? vi?.naturalness ?? feedback.naturalness : feedback.naturalness;
  const tip = lang === "vi" ? vi?.tip ?? feedback.tip : feedback.tip;
  const encouragement = lang === "vi" ? vi?.encouragement ?? feedback.encouragement : feedback.encouragement;

  return (
    <div className="rounded border bg-surface p-4 text-[13px] leading-relaxed" style={{ borderColor: "var(--color-divider)" }}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="label-xs text-accent">{t.heading}</span>
        <div className="flex items-center gap-2">
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
              label="Share"
            />
          )}
        </div>
      </div>
      {feedback.phrasesOk !== undefined && (
        <p className="mb-2 font-extrabold">{feedback.phrasesOk ? t.phrasesOk : t.phrasesNeedsWork}</p>
      )}
      {Array.isArray(grammarIssues) && grammarIssues.length > 0 && (
        <div className="mb-2">
          <span className="font-extrabold">{t.grammar}</span>
          <ul className="list-disc pl-4 text-[12px]">
            {grammarIssues.map((g, i) => <li key={i}>{String(g)}</li>)}
          </ul>
        </div>
      )}
      {naturalness != null && <p className="mb-1 text-[12px]">🗣 {String(naturalness)}</p>}
      {tip != null && <p className="mb-1 text-[12px]">💡 {String(tip)}</p>}
      {encouragement != null && <p className="text-[12px] italic">{String(encouragement)}</p>}
      {onReset && <button className="btn btn-ghost mt-3 text-[12px]" onClick={onReset}>{t.tryAgain}</button>}
    </div>
  );
}
