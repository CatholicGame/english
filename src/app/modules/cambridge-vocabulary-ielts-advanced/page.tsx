"use client";

import Link from "next/link";
import { UNITS_META } from "@/data/cambridge-vocabulary-ielts";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isCambridgeUnitLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";

export default function CambridgeUnitsPage() {
  const { progress } = useProgress();
  const { isPro } = useSubscriptionStore();
  const total = UNITS_META.length;
  const doneCount = UNITS_META.filter((u) => lvlOf(progress, u.slug) > 0).length;
  const donePct = total ? Math.round((doneCount / total) * 100) : 0;

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

      <div className="lg:flex-1">
        <div className="label-xs px-4 pt-4 pb-2 lg:px-0">Units</div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
          {UNITS_META.map((u) => {
            const done = lvlOf(progress, u.slug) > 0;
            const locked = u.available && isCambridgeUnitLocked(u.unit, isPro);
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
                  ) : locked ? (
                    <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                      <LockIcon />
                      Pro
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-[12px] text-neutral-600">{u.topics}</div>
                <div className="mt-1.5 text-[11px] text-neutral-600">
                  Test practice: <span className="text-accent">{u.testPractice}</span>
                </div>
              </>
            );
            return u.available && !locked ? (
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
      </div>
    </div>
  );
}
