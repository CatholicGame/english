"use client";

import { CopyButton } from "./CopyButton";

interface BandItem {
  label: string;
  band: number;
  comment: string;
}

const BAND_FIELD_LABELS: Record<string, string> = {
  taskAchievement: "Task Achievement",
  taskResponse: "Task Response",
  coherence: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range & Accuracy",
  fluency: "Fluency & Coherence",
};

function extractBands(data: Record<string, unknown>): BandItem[] {
  return Object.entries(BAND_FIELD_LABELS)
    .map(([key, label]) => {
      const v = data[key] as { band?: number; comment?: string } | undefined;
      if (!v || typeof v.band !== "number") return null;
      return { label, band: v.band, comment: v.comment ?? "" };
    })
    .filter((x): x is BandItem => x !== null);
}

interface Props {
  loading: boolean;
  result: unknown;
  error: string | null;
  onRetry?: () => void;
}

/** Shared display for IELTS-examiner style band feedback (Writing Task / Speaking Part 2). */
export function AiBandFeedback({ loading, result, error, onRetry }: Props) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded bg-surface p-4 text-[13px] text-neutral-600">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        AI examiner is scoring your response...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded bg-accent-100 p-4 text-[13px] leading-relaxed text-accent-800">
        <p className="font-extrabold">Error</p>
        <p className="mt-1">{error}</p>
        {onRetry && <button className="btn btn-ghost mt-2 text-[12px]" onClick={onRetry}>Retry</button>}
      </div>
    );
  }

  if (!result) return null;

  const data = result as Record<string, unknown>;
  const bands = extractBands(data);
  const overallBand = data.overallBand as number | undefined;
  const corrections = data.corrections as { original: string; corrected: string; explanation?: string }[] | undefined;
  const suggestions = data.suggestions as string[] | undefined;
  const rewrittenParagraph = data.rewrittenParagraph as string | undefined;
  const strengths = data.strengths as string[] | undefined;
  const improvements = data.improvements as string[] | undefined;
  const suggestedPhrases = data.suggestedPhrases as string[] | undefined;
  const modelResponse = data.modelResponse as string | undefined;
  const usedVocab = data.usedVocab as string[] | undefined;
  const vocabSuggestions = data.vocabSuggestions as { word: string; note?: string }[] | undefined;

  const border = { borderColor: "var(--color-accent-800)" };

  return (
    <div
      className="flex flex-col gap-3 rounded p-4 text-[13px] leading-relaxed"
      style={{ background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}
    >
      {overallBand != null && (
        <div className="flex items-baseline gap-2">
          <span className="label-xs text-accent-700">Estimated band</span>
          <span className="text-[28px] leading-none font-extrabold">{overallBand}</span>
        </div>
      )}

      {bands.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {bands.map((b, i) => (
            <div key={b.label} className={`flex items-start justify-between gap-3 ${i > 0 ? "border-t pt-1.5" : ""}`} style={i > 0 ? border : undefined}>
              <div>
                <span className="font-extrabold">{b.label}</span>
                {b.comment && <p className="text-[12px]">{b.comment}</p>}
              </div>
              <span className="flex-none text-[15px] font-extrabold">{b.band}</span>
            </div>
          ))}
        </div>
      )}

      {corrections && corrections.length > 0 && (
        <div className="border-t pt-2" style={border}>
          <span className="label-xs mb-1 block text-accent-700">🔧 Corrections</span>
          {corrections.map((c, i) => (
            <p key={i} className="mb-1 flex flex-wrap items-center gap-1.5 text-[12px]">
              <span>
                <span className="line-through opacity-70">{c.original}</span> → <span className="font-extrabold">{c.corrected}</span>
              </span>
              <CopyButton text={c.corrected} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={border} />
              {c.explanation && <span className="block w-full opacity-80">{c.explanation}</span>}
            </p>
          ))}
        </div>
      )}

      {((strengths && strengths.length > 0) || (improvements && improvements.length > 0)) && (
        <div className="grid grid-cols-1 gap-2 border-t pt-2 sm:grid-cols-2" style={border}>
          {strengths && strengths.length > 0 && (
            <div>
              <span className="label-xs mb-1 block text-accent-700">✅ Strengths</span>
              <ul className="list-disc pl-4 text-[12px]">
                {strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {improvements && improvements.length > 0 && (
            <div>
              <span className="label-xs mb-1 block text-accent-700">📈 To improve</span>
              <ul className="list-disc pl-4 text-[12px]">
                {improvements.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="border-t pt-2" style={border}>
          <span className="label-xs mb-1 block text-accent-700">💡 Suggestions</span>
          <ul className="list-disc pl-4 text-[12px]">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {((usedVocab && usedVocab.length > 0) || (vocabSuggestions && vocabSuggestions.length > 0)) && (
        <div className="border-t pt-2" style={border}>
          <span className="label-xs mb-1 block text-accent-700">🎓 Unit vocabulary</span>
          {usedVocab && usedVocab.length > 0 && (
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {usedVocab.map((w, i) => (
                <span key={i} className="rounded-full border px-2.5 py-1 text-[12px] font-bold" style={border}>
                  ✅ {w}
                </span>
              ))}
            </div>
          )}
          {vocabSuggestions && vocabSuggestions.length > 0 && (
            <ul className="list-disc pl-4 text-[12px]">
              {vocabSuggestions.map((v, i) => (
                <li key={i}>
                  <span className="font-extrabold">{v.word}</span>
                  {v.note ? ` — ${v.note}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {suggestedPhrases && suggestedPhrases.length > 0 && (
        <div className="border-t pt-2" style={border}>
          <span className="label-xs mb-1 block text-accent-700">📖 Try using</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPhrases.map((p, i) => (
              <span key={i} className="rounded-full border px-2.5 py-1 text-[12px] font-bold" style={border}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {rewrittenParagraph && (
        <div className="border-t pt-2" style={border}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="label-xs block text-accent-700">✍️ Improved version</span>
            <CopyButton text={rewrittenParagraph} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={border} />
          </div>
          <p className="whitespace-pre-wrap text-[12px]">{rewrittenParagraph}</p>
        </div>
      )}

      {modelResponse && (
        <div className="border-t pt-2" style={border}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="label-xs block text-accent-700">🎤 Model response</span>
            <CopyButton text={modelResponse} className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={border} />
          </div>
          <p className="whitespace-pre-wrap text-[12px]">{modelResponse}</p>
        </div>
      )}
    </div>
  );
}
