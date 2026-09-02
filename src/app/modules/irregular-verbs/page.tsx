"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IRREGULAR_VERBS, type IrregularVerb } from "@/data/irregular-verbs";
import { CopyButton } from "@/components/CopyButton";

export default function IrregularVerbsPage() {
  const [query, setQuery] = useState("");
  const [openBase, setOpenBase] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return IRREGULAR_VERBS;
    return IRREGULAR_VERBS.filter(
      (v) =>
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.participle.toLowerCase().includes(q) ||
        v.vi.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[1080px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <Link href="/" className="btn btn-ghost mb-2 px-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block h-4 w-4 flex-none"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Home
        </Link>
        <h1 className="text-[24px]">Động từ bất quy tắc</h1>
        <p className="mt-1 text-[16px] text-neutral-600">
          {IRREGULAR_VERBS.length} động từ bất quy tắc thông dụng nhất. Bấm vào một từ để xem nghĩa và ví dụ cho cả 3 dạng.
        </p>
      </div>

      <div className="divider-b px-4 py-3">
        <input
          className="input w-full"
          placeholder="Tìm theo động từ hoặc nghĩa tiếng Việt..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 px-4 py-4">
        {list.length === 0 ? (
          <p className="text-[16px] text-neutral-500">Không tìm thấy động từ nào.</p>
        ) : (
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
            {list.map((v) => (
              <VerbCard
                key={v.base}
                verb={v}
                open={openBase === v.base}
                onToggle={() => setOpenBase((k) => (k === v.base ? null : v.base))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VerbCard({ verb, open, onToggle }: { verb: IrregularVerb; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-transparent bg-surface p-3">
      <button type="button" className="flex w-full items-start justify-between gap-3 text-left" onClick={onToggle}>
        <span className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[19px] font-extrabold">{verb.base}</span>
            <span className="text-[16px] text-neutral-600">{verb.past}</span>
            <span className="text-[16px] text-neutral-600">{verb.participle}</span>
          </span>
          <p className="mt-1 truncate text-[16px] text-neutral-700">{verb.vi}</p>
        </span>
        <span className="label-xs flex-none whitespace-nowrap text-accent">{open ? "Thu gọn" : "Xem"}</span>
      </button>

      {open && (
        <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--color-divider)" }}>
          <p className="text-[16px] leading-relaxed text-neutral-700">{verb.en}</p>

          <div className="mt-3 flex flex-col gap-3">
            <FormExample label={verb.base} en={verb.exBase} vi={verb.exBaseVi} />
            <FormExample label={verb.past} en={verb.exPast} vi={verb.exPastVi} />
            <FormExample label={verb.participle} en={verb.exParticiple} vi={verb.exParticipleVi} />
          </div>
        </div>
      )}
    </div>
  );
}

function FormExample({ label, en, vi }: { label: string; en: string; vi: string }) {
  return (
    <div className="pl-2.5" style={{ borderLeft: "2px solid var(--color-divider)" }}>
      <span className="label-xs text-accent">{label}</span>
      <div className="mt-0.5 flex items-start justify-between gap-2">
        <p className="text-[16px] italic leading-relaxed">&quot;{en}&quot;</p>
        <CopyButton text={en} className="btn btn-ghost flex-none px-1.5 py-0.5 text-[14px]" />
      </div>
      <p className="mt-0.5 text-[16px] text-neutral-600">{vi}</p>
    </div>
  );
}
