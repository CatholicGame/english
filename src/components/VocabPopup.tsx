"use client";

import { useEffect, useState } from "react";

interface VocabEntry {
  word: string;
  ipa?: string;
  pos?: string;
  definitionEn?: string;
  definitionVi?: string;
  synonyms?: string[];
  examples?: { en: string; vi: string }[];
  note?: string;
}

interface Props {
  word: string;
  context?: string;
  onClose: () => void;
}

export function VocabPopup({ word, context, onClose }: Props) {
  const [data, setData] = useState<VocabEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (context) {
      // AI-powered lookup with context
      fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "cpv_vocab_lookup", payload: { word, context } }),
      })
        .then(r => r.json())
        .then(j => { if (!cancelled && j.ok) setData(j.data); else if (!cancelled) setData({ word }); setLoading(false); })
        .catch(() => { if (!cancelled) setData({ word }); setLoading(false); });
    } else {
      // Fallback to free dictionary API
      fetch(`/api/dictionary?word=${encodeURIComponent(word)}`)
        .then(r => r.json())
        .then(d => {
          if (!cancelled) {
            setData(d.found ? { word, ipa: d.phonetic, pos: d.partOfSpeech, definitionEn: d.definition, examples: d.example ? [{ en: d.example, vi: "" }] : [] } : { word });
            setLoading(false);
          }
        })
        .catch(() => { if (!cancelled) { setData({ word }); setLoading(false); } });
    }
    return () => { cancelled = true; };
  }, [word, context]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center pb-16" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative mx-3 w-full max-w-[420px] max-h-[75vh] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
        style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute right-3 top-3 text-[18px] text-neutral-400 hover:text-neutral-600" onClick={onClose}>✕</button>

        {loading ? (
          <p className="text-[13px] text-neutral-500 animate-pulse">Analyzing "{word}"...</p>
        ) : (
          <>
            {/* Header */}
            <div className="mb-4 pr-6">
              <h2 className="text-[22px] font-bold text-[#1a1a1a]">{data?.word || word}</h2>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                {data?.ipa && <span className="text-[14px] text-[#666]">{data.ipa}</span>}
                {data?.pos && <span className="text-[13px] italic text-[#16a34a]">{data.pos}</span>}
              </div>
            </div>

            {/* Vietnamese definition */}
            {data?.definitionVi && (
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Nghĩa</span>
                <p className="mt-0.5 text-[15px] text-[#1a1a1a]">{data.definitionVi}</p>
              </div>
            )}

            {/* English definition */}
            {data?.definitionEn && (
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Definition</span>
                <p className="mt-0.5 text-[14px] leading-relaxed text-[#333]">{data.definitionEn}</p>
              </div>
            )}

            {/* Synonyms */}
            {data?.synonyms && data.synonyms.length > 0 && (
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Synonyms</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {data.synonyms.map((s, i) => (
                    <span key={i} className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[12px] text-[#555]">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {data?.examples && data.examples.length > 0 && (
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Examples</span>
                {data.examples.map((ex, i) => (
                  <div key={i} className="mt-1.5 rounded bg-[#f8f8f8] p-2.5">
                    <p className="text-[13px] italic leading-relaxed text-[#444]">"{ex.en}"</p>
                    {ex.vi && <p className="mt-0.5 text-[12px] text-[#888]">{ex.vi}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Usage note */}
            {data?.note && (
              <div className="rounded bg-[#fff8e1] p-2.5 text-[12px] leading-relaxed text-[#8d6e00]">
                💡 {data.note}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}