"use client";

import { useState } from "react";
import Link from "next/link";
import { MODULES } from "@/data/modules";
import { GlobalScoreBadge } from "@/components/GlobalScoreBadge";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useDashboardProgress, type DashboardProgress } from "@/lib/use-dashboard-progress";
import { useSubscriptionStore } from "@/lib/use-subscription-store";

function moduleStatLabel(slug: string, d: DashboardProgress): string | null {
  if (!d.loaded) return null;
  switch (slug) {
    case "collocations-phrasal-verbs":
      return d.collocationsDue > 0 ? `${d.collocationsDue} cụm từ cần ôn hôm nay` : "Đã ôn hết cho hôm nay ✓";
    case "cambridge-vocabulary-ielts-advanced":
      return `Đã hoàn thành ${d.cambridgeDone}/${d.cambridgeTotal} unit`;
    case "listen-a-minute":
      return `Đã học ${d.listenDone}/${d.listenTotal} bài`;
    default:
      return null;
  }
}

export default function HomePage() {
  const dashboard = useDashboardProgress();
  const { trialDaysLeft } = useSubscriptionStore();
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[1040px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[30px]">Vocabulary Builder Pro</h1>
        <p className="mt-1 text-[13px] text-neutral-600">Choose a topic to start practicing.</p>
      </div>

      {trialDaysLeft > 0 && (
        <div className="divider-b flex items-center justify-between gap-3 bg-accent-100 px-4 py-2.5">
          <span className="text-[12px] font-bold text-accent-800">
            🎁 Còn {trialDaysLeft} ngày dùng thử — mọi nội dung đang mở khoá
          </span>
          <button
            className="btn btn-primary flex-none px-3 py-1.5 text-[11px]"
            onClick={() => setShowPurchase(true)}
          >
            Xem gói
          </button>
        </div>
      )}

      <div className="divider-b px-4 py-4">
        <div className="label-xs mb-2">Tổng quan</div>
        <div className="grid grid-cols-3 gap-[2px] bg-[color:var(--color-divider)]">
          <div className="bg-bg px-3 py-3">
            <div className="text-[24px] leading-none font-extrabold">🔥 {dashboard.streak}</div>
            <div className="label-xs mt-1.5">Ngày liên tiếp</div>
          </div>
          <Link href="/dictionary" className="bg-bg px-3 py-3 hover:bg-surface">
            <div className="text-[24px] leading-none font-extrabold">{dashboard.wordsSaved}</div>
            <div className="label-xs mt-1.5">Từ đã lưu</div>
          </Link>
          <div className="bg-bg px-3 py-3">
            <GlobalScoreBadge className="text-[24px] leading-none font-extrabold" />
            <div className="label-xs mt-1.5">Tổng XP</div>
          </div>
        </div>
        <div className="mt-3 flex h-8 items-end justify-between gap-1">
          {dashboard.weekBars.map((bar, i) => (
            <div key={i} className="flex flex-1 flex-col items-stretch gap-1">
              <div style={{ background: bar.color, height: `${bar.h}px` }} />
              <span className="text-center text-[9px] tracking-wider text-neutral-600">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="label-xs mb-2">Topics</div>
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
          {MODULES.map((m) =>
            m.available ? (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                className="block border border-transparent bg-surface p-4 transition-colors hover:border-accent"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[19px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap text-accent">{m.subtitle}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{m.description}</p>
                <div className="mt-3 text-[11px] font-bold text-accent-800">
                  {moduleStatLabel(m.slug, dashboard) ?? m.statsLabel}
                </div>
              </Link>
            ) : (
              <div key={m.slug} className="border border-dashed border-neutral-400 p-4 opacity-60">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[19px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap">Soon</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{m.description}</p>
              </div>
            ),
          )}
        </div>
      </div>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
