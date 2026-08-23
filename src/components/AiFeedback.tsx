"use client";

import { useState } from "react";
import { VocabPopup } from "./VocabPopup";
import { CopyButton } from "./CopyButton";

interface Props {
  loading: boolean;
  result: unknown;
  error: string | null;
  onRetry?: () => void;
  variant: "sentence" | "general";
}

export function AiFeedback({ loading, result, error, onRetry, variant }: Props) {
  const [vocabWord, setVocabWord] = useState<{ word: string; vi?: string; context?: string } | null>(null);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded bg-surface p-4 text-[15px] text-neutral-600">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        AI is analyzing your response...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded bg-accent-100 p-4 text-[15px] leading-relaxed text-accent-800">
        <p className="font-extrabold">Error</p>
        <p className="mt-1">{error}</p>
        {onRetry && <button className="btn btn-ghost mt-2 text-[14px]" onClick={onRetry}>Retry</button>}
      </div>
    );
  }

  if (!result) return null;

  const data = result as Record<string, unknown>;
  const vocab = data.keyVocabulary as { word: string; vi: string }[] | undefined;

  if (variant === "sentence") {
    const feedback = data.feedback as string | undefined;
    const correction = data.correction as string | undefined;
    const tip = data.tip as string | undefined;
    const alternative = data.alternative as string | undefined;
    const registerTip = data.registerTip as string | undefined;
    const correct = data.correct as boolean | undefined;
    const grammarOk = data.grammarOk as boolean | undefined;
    const naturalOk = data.naturalOk as boolean | undefined;
    const ieltsReady = data.ieltsReady as boolean | undefined;

    return (
      <div className="rounded p-4 text-[15px] leading-relaxed"
        style={{ background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}>
        {correct !== undefined && (
          <p className="mb-2 font-extrabold">
            {correct ? "✅ Correct!" : correct === false ? "❌ Needs improvement" : "⚠️ Partially correct"}
          </p>
        )}
        {feedback && <p className="mb-2">{feedback}</p>}
        {correction && (
          <p className="mb-2 flex flex-wrap items-center gap-1.5">
            <span><span className="font-extrabold">Correction: </span><span className="italic">{correction}</span></span>
            <CopyButton text={correction} className="rounded-full border px-2 py-0.5 text-[13px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
          </p>
        )}
        {tip && <p className="mb-1 text-[14px]">💡 {tip}</p>}
        {alternative && (
          <p className="flex flex-wrap items-center gap-1.5 text-[14px]">
            <span>📝 Alternative: {alternative}</span>
            <CopyButton text={alternative} className="rounded-full border px-2 py-0.5 text-[13px] font-bold" style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }} />
          </p>
        )}
        {registerTip && <p className="text-[14px]">🎓 Register: {registerTip}</p>}
        {grammarOk !== undefined && (
          <p className="mt-1 text-[14px]">Grammar: {grammarOk ? "✅" : "⚠️"} | Natural: {naturalOk ? "✅" : "⚠️"}</p>
        )}
        {ieltsReady !== undefined && (
          <p className="mt-1 text-[14px]">{ieltsReady ? "🎯 IELTS-ready register" : "🎯 Not quite academic register yet"}</p>
        )}

        {/* Key Vocabulary */}
        {vocab && vocab.length > 0 && (
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--color-accent-800)" }}>
            <span className="text-[13px] font-bold uppercase tracking-wide opacity-70">📖 Key Vocabulary</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {vocab.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setVocabWord(v)}
                  className="rounded-full border px-2.5 py-1 text-[14px] font-bold transition-colors hover:bg-white/20"
                  style={{ borderColor: "var(--color-accent-800)", color: "var(--color-accent-800)" }}
                >
                  📖 {v.word}
                </button>
              ))}
            </div>
          </div>
        )}

        {vocabWord && <VocabPopup word={vocabWord.word} context={vocabWord.context} onClose={() => setVocabWord(null)} />}
      </div>
    );
  }

  return (
    <div className="rounded bg-surface p-4 text-[15px] leading-relaxed">
      <pre className="whitespace-pre-wrap text-[13px]">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}