"use client";

import { useMemo, useState } from "react";
import { useDictionaryStore } from "@/lib/use-dictionary-store";
import { useTranslationStore } from "@/lib/use-translation-store";
import { VOCAB_CATEGORY_META, type VocabCategory } from "@/lib/dictionary-store";
import { VocabEntryDetail, CategoryBadge } from "@/components/VocabEntryDetail";

type Tab = "vocab" | "translations";

export default function DictionaryPage() {
  const [tab, setTab] = useState<Tab>("vocab");
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[720px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[24px]">Từ điển của tôi</h1>
        <p className="mt-1 text-[13px] text-neutral-600">
          Chọn (bôi đen) bất kỳ từ hay đoạn văn tiếng Anh nào trên trang để tra cứu — AI sẽ tự nhận biết đó là từ vựng hay câu cần dịch.
        </p>
      </div>

      <div className="divider-b flex px-4">
        {([
          { id: "vocab", label: "Từ vựng" },
          { id: "translations", label: "Đoạn đã dịch" },
        ] as const).map((t) => (
          <button
            key={t.id}
            type="button"
            className="px-3 py-3 text-[13px] font-extrabold"
            style={{
              color: tab === t.id ? "var(--color-accent)" : "var(--color-neutral-600)",
              borderBottom: tab === t.id ? "2px solid var(--color-accent)" : "2px solid transparent",
            }}
            onClick={() => { setTab(t.id); setQuery(""); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="divider-b px-4 py-3">
        <input
          className="input w-full"
          placeholder={tab === "vocab" ? "Tìm từ đã lưu..." : "Tìm đoạn đã dịch..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 px-4 py-4">
        {tab === "vocab" ? <VocabTab query={query} /> : <TranslationsTab query={query} />}
      </div>
    </div>
  );
}

function VocabTab({ query }: { query: string }) {
  const { entries, deleteEntry } = useDictionaryStore();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(entries)
      .filter(([key]) => !q || key.includes(q))
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  }, [entries, query]);

  if (list.length === 0) {
    return (
      <p className="text-[13px] text-neutral-500">
        {query ? "Không tìm thấy từ nào." : "Bạn chưa tra từ nào. Hãy bôi đen bất kỳ từ tiếng Anh nào trên trang để tra và lưu."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-1 flex flex-wrap gap-x-3 gap-y-1">
        {(Object.keys(VOCAB_CATEGORY_META) as VocabCategory[]).map((c) => (
          <CategoryBadge key={c} category={c} />
        ))}
      </div>
      {list.map(([key, entry]) => (
        <div key={key} className="border border-transparent bg-surface p-3">
          <button
            type="button"
            className="flex w-full items-baseline justify-between gap-3 text-left"
            onClick={() => setOpenKey((k) => (k === key ? null : key))}
          >
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[16px] font-extrabold">{entry.word}</span>
              <CategoryBadge category={entry.category} />
              {entry.senses?.[0]?.pos && <span className="text-[12px] italic text-neutral-600">{entry.senses[0].pos}</span>}
            </span>
            <span className="label-xs whitespace-nowrap text-accent">{openKey === key ? "Thu gọn" : "Xem"}</span>
          </button>
          {entry.senses?.[0]?.vi && openKey !== key && (
            <p className="mt-1 truncate text-[13px] text-neutral-700">{entry.senses[0].vi}</p>
          )}
          {openKey === key && (
            <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
              <VocabEntryDetail data={entry} fallbackWord={entry.word} />
              <button
                type="button"
                className="btn btn-ghost mt-2 text-[12px] text-red-600"
                onClick={() => { deleteEntry(key); setOpenKey(null); }}
              >
                Xoá khỏi từ điển
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TranslationsTab({ query }: { query: string }) {
  const { entries, deleteEntry } = useTranslationStore();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(entries)
      .filter(([key]) => !q || key.toLowerCase().includes(q))
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  }, [entries, query]);

  if (list.length === 0) {
    return (
      <p className="text-[13px] text-neutral-500">
        {query ? "Không tìm thấy đoạn nào." : "Bạn chưa lưu đoạn dịch nào. Bôi đen 1 câu/đoạn văn, bấm \"Lưu bản dịch\" để giữ lại ở đây."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {list.map(([key, entry]) => (
        <div key={key} className="border border-transparent bg-surface p-3">
          <p className="text-[14px] leading-relaxed">{entry.text}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-700">{entry.translation}</p>
          <button
            type="button"
            className="btn btn-ghost mt-2 text-[12px] text-red-600"
            onClick={() => deleteEntry(key)}
          >
            Xoá bản dịch
          </button>
        </div>
      ))}
    </div>
  );
}
