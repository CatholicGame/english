import { VOCAB_CATEGORY_META, type VocabCategory, type VocabEntry } from "@/lib/dictionary-store";

export function CategoryBadge({ category }: { category?: VocabCategory }) {
  const meta = VOCAB_CATEGORY_META[category ?? "word"];
  return (
    <span
      className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide"
      style={{ color: meta.color }}
    >
      <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: meta.color }} />
      {meta.label}
    </span>
  );
}

export function VocabEntryDetail({ data, fallbackWord }: { data: VocabEntry | null; fallbackWord: string }) {
  const senses = data?.senses ?? [];

  return (
    <>
      {/* Header */}
      <div className="mb-4 pr-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-[22px] font-extrabold">{data?.word || fallbackWord}</h2>
          <CategoryBadge category={data?.category} />
        </div>
        {data?.ipa && <span className="text-[15px] text-neutral-600">{data.ipa}</span>}
      </div>

      {/* Senses — one short, numbered idea per meaning, Longman-style */}
      {senses.length > 0 && (
        <ol className="flex flex-col gap-3">
          {senses.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[1px] flex-none text-[15px] font-extrabold text-neutral-500">{i + 1}.</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  {s.pos && <span className="label-xs text-accent">{s.pos}</span>}
                  {s.vi && <span className="text-[16px] font-bold">{s.vi}</span>}
                </div>
                {s.en && <p className="mt-0.5 text-[15px] leading-relaxed text-neutral-700">{s.en}</p>}
                {s.example && (
                  <div className="mt-1.5 pl-2.5" style={{ borderLeft: "2px solid var(--color-divider)" }}>
                    <p className="text-[15px] italic leading-relaxed">&quot;{s.example.en}&quot;</p>
                    {s.example.vi && <p className="mt-0.5 text-[14px] text-neutral-600">{s.example.vi}</p>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* Synonyms */}
      {data?.synonyms && data.synonyms.length > 0 && (
        <div className="mt-4">
          <span className="label-xs">Synonyms</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.synonyms.map((s, i) => (
              <span key={i} className="border px-2 py-0.5 text-[14px]" style={{ borderColor: "var(--color-divider)" }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Memory tip */}
      {data?.memoryTip && (
        <div className="mt-4 bg-accent-100 p-3 text-[15px] leading-relaxed text-accent-700">
          <span className="label-xs mb-1 block text-accent-700">🧠 Mẹo nhớ</span>
          {data.memoryTip}
        </div>
      )}
    </>
  );
}
