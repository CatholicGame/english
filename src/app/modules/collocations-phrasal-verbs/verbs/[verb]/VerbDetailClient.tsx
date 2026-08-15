"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NotesList } from "@/components/NotesList";
import { AiSentencePractice } from "@/components/AiSentencePractice";
import { GROUP_LABELS, VERBS } from "@/data/basic-verbs";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { speak } from "@/lib/utils";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";

const SpeakerIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`block ${className}`}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
  </svg>
);


function AiSection({ item }: { item: { term: string; type: string; en: string; vi: string; ex: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 border-t pt-2" style={{ borderColor: "var(--color-divider)" }}>
      <button
        className="text-[11px] font-extrabold text-accent hover:underline"
        onClick={() => setOpen(true)}
      >
        🤖 Practice with AI
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[720px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <div>
                <span className="text-[16px] font-extrabold">🤖 AI Practice</span>
                <span className="ml-2 text-[13px] text-neutral-600">{item.term}</span>
              </div>
              <button className="btn btn-ghost text-[13px]" onClick={() => setOpen(false)}>
                ✕ Close
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <AiSentencePractice item={item} moduleKey="collocations-phrasal-verbs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function VerbDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const [tab, setTab] = useState<"coll" | "phr">("coll");

  const verb = useMemo(() => VERBS.find((v) => v.verb.toLowerCase() === slug.toLowerCase()), [slug]);

  if (!verb) {
    return (
      <div className="p-4">
        <p className="text-[13px] text-neutral-600">Verb not found.</p>
        <button
          className="btn btn-ghost mt-3"
          onClick={() => router.push("/modules/collocations-phrasal-verbs/verbs")}
        >
          All verbs
        </button>
      </div>
    );
  }

  if (isVerbLocked(verb.verb, isUnlocked)) {
    return <ProPaywallNotice what={`Động từ "${verb.verb}"`} />;
  }

  const items = verb.items.filter((it) => (tab === "coll" ? it.type !== "phrasal_verb" : it.type === "phrasal_verb"));

  return (
    <div>
      <div className="divider-b px-4 pt-3 pb-4">
        <button
          className="btn btn-ghost mb-2"
          onClick={() => router.push("/modules/collocations-phrasal-verbs/verbs")}
        >
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
          All verbs
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-[38px] uppercase">{verb.verb}</h1>
          <button
            className="btn btn-secondary btn-icon justify-center"
            onClick={() => speak(verb.verb)}
            aria-label="Pronounce"
          >
            <SpeakerIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="label-xs mt-2 text-accent">
          {verb.group} · {GROUP_LABELS[verb.group]}
        </div>
        <p className="mt-3 text-[14px] leading-relaxed">{verb.def_en}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{verb.def_vi}</p>
      </div>

      <div className="divider-b flex gap-[2px] bg-[color:var(--color-divider)]">
        <button
          onClick={() => setTab("coll")}
          className={`flex-1 px-4 py-2.75 text-[11px] font-extrabold tracking-wider uppercase ${
            tab === "coll" ? "bg-ink text-bg" : "bg-bg text-neutral-600"
          }`}
        >
          Collocations
        </button>
        <button
          onClick={() => setTab("phr")}
          className={`flex-1 px-4 py-2.75 text-[11px] font-extrabold tracking-wider uppercase ${
            tab === "phr" ? "bg-ink text-bg" : "bg-bg text-neutral-600"
          }`}
        >
          Phrasal verbs
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
        {items.map((it) => {
          const lvl = lvlOf(progress, `${verb.verb}::${it.term}`);
          return (
            <div key={it.term} className="divider-b px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[16px] font-extrabold">{it.term}</span>
                <span className="flex flex-none items-center gap-2">
                  <span className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className="block h-1.5 w-1.5"
                        style={{ background: n < lvl ? "var(--color-accent)" : "var(--color-neutral-300)" }}
                      />
                    ))}
                  </span>
                  <button
                    className="flex h-[26px] w-[26px] items-center justify-center text-neutral-600 hover:text-accent"
                    onClick={() => speak(it.term)}
                    aria-label="Pronounce"
                  >
                    <SpeakerIcon className="h-4 w-4" />
                  </button>
                </span>
              </div>
              <div className="mt-1 text-[13px] leading-relaxed">{it.en}</div>
              <div className="mt-0.5 text-[12px] leading-relaxed text-neutral-600">{it.vi}</div>
              <div className="mt-2 border-l-2 border-[color:var(--color-divider)] pl-3 text-[12px] leading-relaxed text-neutral-700">
                {it.ex}
              </div>
              <NotesList moduleKey="collocations-phrasal-verbs" itemKey={`${verb.verb}::${it.term}`} />
              <AiSection item={it} />
            </div>
          );
        })}
      </div>
      {items.length === 0 && (
        <div className="px-4 py-8 text-[13px] text-neutral-600">Nothing listed here for this verb.</div>
      )}

      <div className="p-4">
        <button
          className="btn btn-primary btn-block px-4 py-3 tracking-wide uppercase"
          onClick={() =>
            router.push(`/modules/collocations-phrasal-verbs/run?mode=mix&verb=${encodeURIComponent(verb.verb)}`)
          }
        >
          Practice {verb.verb}
        </button>
      </div>
    </div>
  );
}
