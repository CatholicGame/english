"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";

const GROUP_KEYS = ["all", ...Object.keys(GROUP_LABELS)];

export default function VerbsPage() {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");

  const ql = query.trim().toLowerCase();

  const listVerbs = useMemo(
    () =>
      VERBS.filter((v) => group === "all" || v.group === group).filter(
        (v) =>
          !ql ||
          v.verb.toLowerCase().includes(ql) ||
          v.items.some(
            (it) =>
              it.term.toLowerCase().includes(ql) ||
              it.en.toLowerCase().includes(ql) ||
              it.vi.toLowerCase().includes(ql),
          ),
      ),
    [group, ql],
  );

  return (
    <div>
      <div className="divider-b px-4 py-4">
        <h1 className="mb-3 text-[30px]">Verbs</h1>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search verb, phrase or meaning"
        />
      </div>

      <div className="divider-b flex gap-[2px] overflow-x-auto bg-[color:var(--color-divider)]">
        {GROUP_KEYS.map((k) => (
          <button
            key={k}
            onClick={() => setGroup(k)}
            className={`flex-none px-3.5 py-2.5 text-[11px] font-extrabold tracking-wider uppercase ${
              group === k ? "bg-ink text-bg" : "bg-bg text-ink"
            }`}
          >
            {k === "all" ? "All" : `${k} · ${GROUP_LABELS[k].split(" /")[0]}`}
          </button>
        ))}
      </div>

      {listVerbs.map((v) => {
        const done = v.items.filter((it) => lvlOf(progress, `${v.verb}::${it.term}`) >= 3).length;
        const pct = v.items.length ? Math.round((done / v.items.length) * 100) : 0;
        return (
          <Link
            key={v.verb}
            href={`/modules/collocations-phrasal-verbs/verbs/${v.verb.toLowerCase()}`}
            className="divider-b flex items-center gap-3 px-4 py-3 hover:bg-surface"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span className="text-[18px] font-extrabold tracking-tight uppercase">{v.verb}</span>
                <span className="text-[10px] tracking-wider text-accent">{v.group}</span>
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-neutral-600">
                {v.items
                  .slice(0, 3)
                  .map((it) => it.term)
                  .join(" · ")}
              </span>
            </span>
            <span className="w-11 flex-none">
              <span className="mb-1 block text-right text-[11px] tabular-nums text-neutral-600">
                {v.items.length}
              </span>
              <span className="block h-1 bg-neutral-300">
                <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
              </span>
            </span>
          </Link>
        );
      })}
      {listVerbs.length === 0 && (
        <div className="px-4 py-8 text-[13px] text-neutral-600">No match.</div>
      )}
    </div>
  );
}
