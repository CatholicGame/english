"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useUiLang } from "@/lib/i18n";

const GROUP_KEYS = ["all", ...Object.keys(GROUP_LABELS)];

const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={`block ${className}`}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function VerbsPage() {
  const router = useRouter();
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const { lang: uiLang } = useUiLang();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showPurchase, setShowPurchase] = useState(false);

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

  function toggleVerb(verb: string) {
    if (isVerbLocked(verb, isUnlocked)) {
      setShowPurchase(true);
      return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(verb)) next.delete(verb);
      else next.add(verb);
      return next;
    });
  }

  function startPractice(mode: string) {
    const verbs = [...selected].join(",");
    router.push(`/modules/collocations-phrasal-verbs/run?mode=${mode}&verbs=${encodeURIComponent(verbs)}`);
  }

  function exitSelecting() {
    setSelecting(false);
    setSelected(new Set());
  }

  return (
    <div className="lg:flex lg:flex-row lg:items-stretch lg:gap-8 lg:px-4 lg:py-6">
      <div className="lg:w-[280px] lg:flex-none lg:sticky lg:top-6 lg:self-stretch lg:border-r-2 lg:border-[color:var(--color-divider)] lg:pr-6">
        <div className="divider-b px-4 py-4 lg:border-b-0 lg:px-0 lg:py-0">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-[30px]">Verbs</h1>
            <div className="flex items-center gap-2">
              <Link
                href="/modules/collocations-phrasal-verbs/write"
                className="btn btn-ghost px-2 py-1 text-[16px] font-extrabold tracking-wider uppercase"
              >
                ✍️ Write
              </Link>
              <button
                onClick={() => (selecting ? exitSelecting() : setSelecting(true))}
                className={`btn text-[16px] font-extrabold tracking-wider uppercase ${
                  selecting ? "btn-primary px-3 py-1.5" : "btn-ghost px-2 py-1"
                }`}
              >
                {selecting ? "Done" : "Select"}
              </button>
            </div>
          </div>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search verb, phrase or meaning"
          />
        </div>

        <div className="divider-b flex gap-[2px] overflow-x-auto bg-[color:var(--color-divider)] lg:mt-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:bg-transparent">
          {GROUP_KEYS.map((k) => (
            <button
              key={k}
              onClick={() => setGroup(k)}
              className={`flex-none px-3.5 py-2.5 text-[16px] font-extrabold tracking-wider uppercase lg:text-left ${
                group === k ? "bg-ink text-bg" : "bg-bg text-ink"
              }`}
            >
              {k === "all" ? "All" : `${k} · ${GROUP_LABELS[k].split(" /")[0]}`}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:flex-1">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
          {listVerbs.map((v) => {
            const done = v.items.filter((it) => lvlOf(progress, `${v.verb}::${it.term}`) >= 3).length;
            const pct = v.items.length ? Math.round((done / v.items.length) * 100) : 0;
            const isSel = selected.has(v.verb);
            const locked = isVerbLocked(v.verb, isUnlocked);

            const nameRow = (
              <span className="flex items-baseline gap-2">
                <span className="text-[20px] font-extrabold tracking-tight uppercase">{v.verb}</span>
                <span className="text-[16px] tracking-wider text-accent">{v.group}</span>
                {locked && (
                  <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                    <LockIcon />
                    Khoá
                  </span>
                )}
              </span>
            );

            if (selecting) {
              return (
                <button
                  key={v.verb}
                  onClick={() => toggleVerb(v.verb)}
                  className={`divider-b flex items-center gap-3 px-4 py-3 text-left ${locked ? "opacity-50 hover:opacity-70" : "hover:bg-surface"}`}
                >
                  <span className={`flex h-5 w-5 flex-none items-center justify-center border-2 ${
                    isSel ? "border-accent bg-accent text-bg" : "border-neutral-400"
                  }`}>
                    {isSel && <CheckIcon className="h-3 w-3" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    {nameRow}
                    <span className="mt-0.5 block truncate text-[16px] text-neutral-600">
                      {v.items.slice(0, 3).map((it) => it.term).join(" · ")}
                    </span>
                  </span>
                  <span className="w-11 flex-none">
                    <span className="mb-1 block text-right text-[16px] tabular-nums text-neutral-600">
                      {v.items.length}
                    </span>
                    <span className="block h-1 bg-neutral-300">
                      <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
                    </span>
                  </span>
                </button>
              );
            }

            const body = (
              <>
                <span className="min-w-0 flex-1">
                  {nameRow}
                  <span className="mt-0.5 block truncate text-[16px] text-neutral-600">
                    {v.items
                      .slice(0, 3)
                      .map((it) => it.term)
                      .join(" · ")}
                  </span>
                </span>
                <span className="w-11 flex-none">
                  <span className="mb-1 block text-right text-[16px] tabular-nums text-neutral-600">
                    {v.items.length}
                  </span>
                  <span className="block h-1 bg-neutral-300">
                    <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
                  </span>
                </span>
              </>
            );

            return locked ? (
              <button
                key={v.verb}
                onClick={() => setShowPurchase(true)}
                className="divider-b flex w-full items-center gap-3 px-4 py-3 text-left opacity-50 hover:opacity-70"
              >
                {body}
              </button>
            ) : (
              <Link
                key={v.verb}
                href={`/modules/collocations-phrasal-verbs/verbs/${v.verb.toLowerCase()}`}
                className="divider-b flex items-center gap-3 px-4 py-3 hover:bg-surface"
              >
                {body}
              </Link>
            );
          })}
        </div>
        {listVerbs.length === 0 && (
          <div className="px-4 py-8 text-[16px] text-neutral-600">No match.</div>
        )}
      </div>

      {/* Practice bar */}
      {selecting && selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[color:var(--color-divider)] bg-bg px-3 py-2.5 lg:static lg:bottom-auto lg:left-auto lg:right-auto lg:border-t-0 lg:border-l-2 lg:px-6 lg:py-0">
          <div className="lg:sticky lg:top-6 lg:flex lg:flex-col lg:gap-3">
            <span className="mb-2 block text-[16px] font-extrabold lg:text-center">
              {selected.size} verb{selected.size > 1 ? "s" : ""}
            </span>
            <div className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
              {[
                { mode: "mix", label: "Mix" },
                { mode: "mc", label: "MC" },
                { mode: "type", label: "Type" },
                // Reverse modes quiz off the Vietnamese meaning, so they only
                // make sense when the learner actually reads Vietnamese.
                ...(uiLang === "vi" ? [{ mode: "reverseMc", label: "Rev MC" }, { mode: "reverseType", label: "Rev type" }] : []),
                { mode: "flash", label: "Flash" },
              ].map((m) => (
                <button
                  key={m.mode}
                  className="btn btn-primary flex-none px-3 py-2 text-[16px] font-extrabold tracking-wide uppercase"
                  onClick={() => startPractice(m.mode)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
