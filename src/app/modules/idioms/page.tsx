"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UNITS_META, idiomUnitItems, idiomProgressKey } from "@/data/idioms";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isIdiomUnitLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";

const LEARNED_LVL = 3;

export default function IdiomUnitsPage() {
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const [showPurchase, setShowPurchase] = useState(false);

  const unitStats = useMemo(
    () =>
      UNITS_META.map((u) => {
        const items = idiomUnitItems(u.slug);
        const learned = items.filter((it) => lvlOf(progress, idiomProgressKey(u.slug, it.slug)) >= LEARNED_LVL).length;
        return { ...u, itemCount: items.length, learned };
      }),
    [progress],
  );

  const total = unitStats.reduce((sum, u) => sum + u.itemCount, 0);
  const doneCount = unitStats.reduce((sum, u) => sum + u.learned, 0);
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
        <h1 className="mb-1 text-[26px]">Idioms</h1>
        <p className="mb-3 text-[13px] text-neutral-600">
          Học thành ngữ tiếng Anh theo chủ đề — mỗi idiom có khái niệm (Anh &amp; Việt), nguồn gốc, ví dụ, rồi luyện
          dịch với AI.
        </p>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="label-xs">Đã học</span>
          <span className="text-[11px] tabular-nums text-neutral-600">
            {doneCount}/{total} từ · {donePct}%
          </span>
        </div>
        <div className="h-1.5 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${donePct}%` }} />
        </div>
      </div>

      <div className="lg:flex-1">
        <div className="label-xs px-4 pt-4 pb-2 lg:px-0">Units</div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
          {unitStats.map((u) => {
            const locked = isIdiomUnitLocked(u.unit, isUnlocked);
            const unitPct = u.itemCount ? Math.round((u.learned / u.itemCount) * 100) : 0;
            const body = (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-extrabold">
                    <span className="mr-1.5 text-neutral-600">{u.unit}.</span>
                    {u.title}
                  </span>
                  {locked ? (
                    <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                      <LockIcon />
                      Khoá
                    </span>
                  ) : (
                    <span className="label-xs whitespace-nowrap text-accent">
                      {u.learned}/{u.itemCount}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-neutral-600">{u.titleVi}</div>
                <div className="mt-1.5 h-1 bg-neutral-300">
                  <div className="h-full bg-accent" style={{ width: `${unitPct}%` }} />
                </div>
              </>
            );
            if (locked) {
              return (
                <button
                  key={u.slug}
                  onClick={() => setShowPurchase(true)}
                  className="divider-b block w-full px-4 py-3 text-left opacity-50 hover:opacity-70"
                >
                  {body}
                </button>
              );
            }
            return (
              <Link key={u.slug} href={`/modules/idioms/${u.slug}`} className="divider-b block px-4 py-3 hover:bg-surface">
                {body}
              </Link>
            );
          })}
        </div>
      </div>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
