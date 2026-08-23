"use client";

import { useState } from "react";
import Link from "next/link";
import { UNITS_META } from "@/data/english-grammar-in-use";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isGrammarUnitLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";

export default function GrammarUnitsPage() {
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const [showPurchase, setShowPurchase] = useState(false);
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
        <h1 className="mb-1 text-[26px]">English Grammar in Use</h1>
        <p className="mb-3 text-[15px] text-neutral-600">
          Mỗi unit đi theo đúng sách: học quy tắc ngữ pháp, rồi thực hành với chính bài tập trong sách, kết thúc bằng
          một câu luyện viết được AI chấm.
        </p>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="label-xs">Tiến độ</span>
          <span className="text-[13px] tabular-nums text-neutral-600">
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
            const locked = u.available && isGrammarUnitLocked(u.unit, isUnlocked);
            const body = (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[17px] font-extrabold">
                    <span className="mr-1.5 text-neutral-600">{u.unit}.</span>
                    {u.title}
                  </span>
                  {done ? (
                    <span className="label-xs whitespace-nowrap text-accent">Xong</span>
                  ) : !u.available ? (
                    <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                      <LockIcon />
                      Sắp có
                    </span>
                  ) : locked ? (
                    <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                      <LockIcon />
                      Khoá
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-[14px] text-neutral-600">{u.topic}</div>
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
            return u.available ? (
              <Link
                key={u.slug}
                href={`/modules/english-grammar-in-use/${u.slug}`}
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
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
