"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UNITS_META, idiomUnitItems, idiomProgressKey } from "@/data/idioms";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isIdiomUnitLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { progress } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => UNITS_META.find((u) => u.slug === slug), [slug]);
  const items = useMemo(() => idiomUnitItems(slug), [slug]);

  if (!unit) {
    return (
      <div className="p-4">
        <p className="text-[15px] text-neutral-600">Unit not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/idioms")}>
          All units
        </button>
      </div>
    );
  }

  if (isIdiomUnitLocked(unit.unit, isUnlocked)) {
    return <ProPaywallNotice what={`Unit "${unit.title}"`} />;
  }

  const learned = items.filter((it) => lvlOf(progress, idiomProgressKey(slug, it.slug)) >= 3).length;
  const pct = items.length ? Math.round((learned / items.length) * 100) : 0;

  return (
    <div>
      <div className="divider-b px-4 pt-3 pb-4">
        <button className="btn btn-ghost mb-2" onClick={() => router.push("/modules/idioms")}>
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
          All units
        </button>
        <h1 className="text-[26px]">
          <span className="mr-1.5 text-neutral-600">{unit.unit}.</span>
          {unit.title}
        </h1>
        <div className="label-xs mt-2 text-accent">{unit.titleVi}</div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="label-xs">Đã học</span>
          <span className="text-[13px] tabular-nums text-neutral-600">
            {learned}/{items.length} từ · {pct}%
          </span>
        </div>
        <div className="mt-1 h-1.5 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {items.length === 0 && (
        <div className="px-4 py-8 text-[15px] text-neutral-600">
          Nội dung unit này đang được soạn, vui lòng quay lại sau.
        </div>
      )}

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
        {items.map((it) => {
          const lvl = lvlOf(progress, idiomProgressKey(slug, it.slug));
          return (
            <Link
              key={it.slug}
              href={`/modules/idioms/${slug}/${it.slug}`}
              className="divider-b flex items-center gap-3 px-4 py-3 hover:bg-surface"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-extrabold leading-snug">{it.term}</span>
                <span className="mt-0.5 block truncate text-[14px] text-neutral-600">{it.vi}</span>
              </span>
              <span className="flex flex-none gap-0.5">
                {[0, 1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className="block h-1.5 w-1.5"
                    style={{ background: n < lvl ? "var(--color-accent)" : "var(--color-neutral-300)" }}
                  />
                ))}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
