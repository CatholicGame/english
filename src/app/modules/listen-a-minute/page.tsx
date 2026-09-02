"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LISTEN_LESSONS, type ListenLesson } from "@/data/listen-a-minute";
import { getCurrentLesson } from "@/lib/listen-progress";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isListenLessonLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useScrollRestoration } from "@/lib/use-scroll-restoration";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4 flex-none transition-transform"
      style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function ListenAMinutePage() {
  useScrollRestoration();
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState<{ slug: string; step: number } | null>(null);
  const [showPurchase, setShowPurchase] = useState(false);
  const ql = query.trim().toLowerCase();

  useEffect(() => {
    setCurrent(getCurrentLesson());
  }, []);

  const total = LISTEN_LESSONS.length;
  const doneCount = useMemo(() => LISTEN_LESSONS.filter((l) => lvlOf(progress, l.slug) > 0).length, [progress]);
  const donePct = total ? Math.round((doneCount / total) * 100) : 0;

  const currentLesson = useMemo(
    () => (current ? LISTEN_LESSONS.find((l) => l.slug === current.slug) : undefined),
    [current],
  );
  const showContinue =
    currentLesson && lvlOf(progress, currentLesson.slug) === 0 && !isListenLessonLocked(currentLesson.slug, isUnlocked);

  const sorted = useMemo(() => [...LISTEN_LESSONS].sort((a, b) => a.title.localeCompare(b.title)), []);

  const filtered = useMemo(() => sorted.filter((l) => !ql || l.title.toLowerCase().includes(ql)), [sorted, ql]);

  const groups = useMemo(() => {
    const map = new Map<string, ListenLesson[]>();
    for (const lesson of filtered) {
      const list = map.get(lesson.letter);
      if (list) list.push(lesson);
      else map.set(lesson.letter, [lesson]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const searching = ql.length > 0;

  function toggleLetter(letter: string) {
    setCollapsed((c) => ({ ...c, [letter]: !c[letter] }));
  }

  function setAllCollapsed(value: boolean) {
    const next: Record<string, boolean> = {};
    for (const [letter] of groups) next[letter] = value;
    setCollapsed(next);
  }

  return (
    <div className="flex-1 lg:flex lg:flex-row lg:items-stretch lg:gap-8 lg:px-4 lg:py-6">
      <div className="divider-b px-4 py-4 lg:w-[300px] lg:flex-none lg:sticky lg:top-6 lg:self-stretch lg:border-r-2 lg:border-b-0 lg:border-[color:var(--color-divider)] lg:py-0 lg:pl-0 lg:pr-6">
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
        <h1 className="mb-3 text-[30px]">Listen A Minute</h1>

        <div className="mb-3">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="label-xs">Progress</span>
            <span className="text-[16px] tabular-nums text-neutral-600">
              {doneCount}/{total} · {donePct}%
            </span>
          </div>
          <div className="h-1.5 bg-neutral-300">
            <div className="h-full bg-accent" style={{ width: `${donePct}%` }} />
          </div>
        </div>

        {showContinue && currentLesson && (
          <Link
            href={`/modules/listen-a-minute/${currentLesson.slug}`}
            className="mb-3 block bg-accent-100 px-4 py-3 text-accent-800 hover:bg-accent-200"
          >
            <span className="label-xs mb-0.5 block text-accent-700">Continue</span>
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-extrabold">{currentLesson.title}</span>
              <span className="text-[16px] tabular-nums">Step {current!.step}/4</span>
            </span>
          </Link>
        )}

        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a topic"
        />
        <div className="mt-2 flex gap-4">
          <button className="btn btn-ghost px-0 text-[16px]" onClick={() => setAllCollapsed(false)}>
            Expand all
          </button>
          <button className="btn btn-ghost px-0 text-[16px]" onClick={() => setAllCollapsed(true)}>
            Collapse all
          </button>
        </div>
      </div>

      <div className="lg:flex-1">
        {groups.map(([letter, lessons]) => {
          const open = searching || !collapsed[letter];
          return (
            <div key={letter}>
              <button
                onClick={() => toggleLetter(letter)}
                className="divider-b flex w-full items-center justify-between px-4 py-2 text-left hover:bg-surface"
                disabled={searching}
              >
                <span className="label-xs text-accent">{letter}</span>
                {!searching && <ChevronIcon open={open} />}
              </button>
              {open && (
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
                  {lessons.map((lesson) => {
                    const done = lvlOf(progress, lesson.slug) > 0;
                    const locked = isListenLessonLocked(lesson.slug, isUnlocked);
                    const body = (
                      <>
                        <span className="text-[19px] font-extrabold">{lesson.title}</span>
                        {done ? (
                          <span className="label-xs text-accent">Done</span>
                        ) : locked ? (
                          <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                            <LockIcon />
                            Khoá
                          </span>
                        ) : null}
                      </>
                    );
                    return locked ? (
                      <button
                        key={lesson.slug}
                        onClick={() => setShowPurchase(true)}
                        className="divider-b flex w-full items-center justify-between gap-3 px-4 py-3 pl-6 text-left opacity-50 hover:opacity-70"
                      >
                        {body}
                      </button>
                    ) : (
                      <Link
                        key={lesson.slug}
                        href={`/modules/listen-a-minute/${lesson.slug}`}
                        className="divider-b flex items-center justify-between gap-3 px-4 py-3 pl-6 hover:bg-surface"
                      >
                        {body}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div className="px-4 py-8 text-[16px] text-neutral-600">No match.</div>}
      </div>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
