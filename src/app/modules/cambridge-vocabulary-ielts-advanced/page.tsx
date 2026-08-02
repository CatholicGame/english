"use client";

import Link from "next/link";
import { UNITS_META } from "@/data/cambridge-vocabulary-ielts";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-3.5 w-3.5 flex-none"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function CambridgeUnitsPage() {
  const { progress } = useProgress();
  const total = UNITS_META.length;
  const doneCount = UNITS_META.filter((u) => lvlOf(progress, u.slug) > 0).length;
  const donePct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="flex-1">
      <div className="divider-b px-4 py-4">
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
        <h1 className="mb-1 text-[26px]">Cambridge Vocabulary for IELTS Advanced</h1>
        <p className="mb-3 text-[13px] text-neutral-600">
          Every unit follows the coursebook: learn the wordlist, work through real listening / reading / speaking
          tasks, then finish with the unit&rsquo;s IELTS test practice.
        </p>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="label-xs">Progress</span>
          <span className="text-[11px] tabular-nums text-neutral-600">
            {doneCount}/{total} · {donePct}%
          </span>
        </div>
        <div className="h-1.5 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${donePct}%` }} />
        </div>
      </div>

      <div className="label-xs px-4 pt-4 pb-2">Units</div>
      {UNITS_META.map((u) => {
        const done = lvlOf(progress, u.slug) > 0;
        const body = (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[15px] font-extrabold">
                <span className="mr-1.5 text-neutral-600">{u.unit}.</span>
                {u.title}
              </span>
              {done ? (
                <span className="label-xs whitespace-nowrap text-accent">Done</span>
              ) : !u.available ? (
                <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                  <LockIcon />
                  Soon
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-[12px] text-neutral-600">{u.topics}</div>
            <div className="mt-1.5 text-[11px] text-neutral-600">
              Test practice: <span className="text-accent">{u.testPractice}</span>
            </div>
          </>
        );
        return u.available ? (
          <Link
            key={u.slug}
            href={`/modules/cambridge-vocabulary-ielts-advanced/${u.slug}`}
            className="divider-b block px-4 py-3 hover:bg-surface"
          >
            {body}
          </Link>
        ) : (
          <div key={u.slug} className="divider-b px-4 py-3 opacity-50">
            {body}
          </div>
        );
      })}
    </div>
  );
}
