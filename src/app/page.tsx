"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MODULES } from "@/data/modules";
import { GlobalScoreBadge } from "@/components/GlobalScoreBadge";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useDashboardProgress, type DashboardProgress } from "@/lib/use-dashboard-progress";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isPaidActive } from "@/lib/subscription-store";

/** Polls a few times after returning from PayOS's hosted checkout — the
 * webhook that actually grants paid access can land a beat after the browser
 * redirect does, so a single refetch on mount can still show the old state.
 * `isPaidNow` reads the live store (not a stale closure) so the loop can stop
 * the moment the webhook lands instead of always running to the timeout. */
function usePayosReturn(refetch: () => Promise<void>, isPaidNow: () => boolean) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Captured once via the lazy initializer (render time, not an effect) — the
  // "cancel" outcome is pure derived state from the URL, not a side effect.
  const [payosParam] = useState(() => searchParams.get("payos"));
  const [status, setStatus] = useState<"idle" | "confirming" | "confirmed" | "timeout" | "cancelled">(
    () => (payosParam === "cancel" ? "cancelled" : payosParam === "success" ? "confirming" : "idle"),
  );

  useEffect(() => {
    if (!payosParam) return;
    router.replace("/", { scroll: false });
    if (payosParam !== "success") return;

    let cancelled = false;
    (async () => {
      for (let i = 0; i < 6; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        if (cancelled) return;
        try {
          await refetch();
        } catch {
          // ignore, just try again next tick
        }
        if (isPaidNow()) { setStatus("confirmed"); return; }
      }
      if (!cancelled) setStatus((s) => (s === "confirming" ? "timeout" : s));
    })();
    return () => { cancelled = true; };
  }, [payosParam, router, refetch, isPaidNow]);

  return status;
}

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
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}

const PAYOS_STATUS_LABEL: Record<"confirming" | "confirmed" | "timeout" | "cancelled", string> = {
  confirming: "⏳ Đang xác nhận thanh toán...",
  confirmed: "✅ Thanh toán thành công — đã kích hoạt gói của bạn!",
  timeout: "Thanh toán đang được xử lý — quyền lợi sẽ tự động cập nhật trong giây lát, thử tải lại trang nếu chưa thấy.",
  cancelled: "Bạn đã huỷ thanh toán.",
};

function HomePageContent() {
  const dashboard = useDashboardProgress();
  const { subscription, trialDaysLeft, refetch } = useSubscriptionStore();
  const [showPurchase, setShowPurchase] = useState(false);

  const subscriptionRef = useRef(subscription);
  useEffect(() => { subscriptionRef.current = subscription; }, [subscription]);
  const isPaidNow = useCallback(() => isPaidActive(subscriptionRef.current), []);
  const payosStatus = usePayosReturn(refetch, isPaidNow);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[1040px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[30px]">Vocabulary Builder Pro</h1>
        <p className="mt-1 text-[13px] text-neutral-600">Choose a topic to start practicing.</p>
      </div>

      {payosStatus !== "idle" && (
        <div className="divider-b bg-accent-100 px-4 py-2.5 text-[12px] font-bold text-accent-800">
          {PAYOS_STATUS_LABEL[payosStatus]}
        </div>
      )}

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
