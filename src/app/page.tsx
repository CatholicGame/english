"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MODULES } from "@/data/modules";
import { GlobalScoreBadge } from "@/components/GlobalScoreBadge";
import { PurchaseModal } from "@/components/PurchaseModal";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import { useDashboardProgress, type DashboardProgress } from "@/lib/use-dashboard-progress";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isPaidActive } from "@/lib/subscription-store";
import { useUiLang, type TranslateFn } from "@/lib/i18n";

/** Polls a few times after returning from a hosted checkout (PayOS or PayPal)
 * — the payment confirmation can land a beat after the browser redirect does,
 * so a single refetch on mount can still show the old state. `isPaidNow` reads
 * the live store (not a stale closure) so the loop can stop the moment access
 * is granted instead of always running to the timeout. For PayPal, the capture
 * call (the step that actually charges the buyer) is also fired from here,
 * before polling. */
interface PaymentReturnFlow {
  provider: "payos" | "paypal";
  outcome: "success" | "cancel";
  /** PayPal's order id, appended to the return URL as `token` by PayPal. */
  paypalToken?: string;
}

function usePaymentReturn(refetch: () => Promise<void>, isPaidNow: () => boolean) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Captured once via the lazy initializer (render time, not an effect) — the
  // outcomes are pure derived state from the URL, not side effects.
  const [flow] = useState<PaymentReturnFlow | null>(() => {
    const payos = searchParams.get("payos");
    if (payos) return { provider: "payos", outcome: payos === "success" ? "success" : "cancel" };
    const paypal = searchParams.get("paypal");
    if (paypal) {
      return {
        provider: "paypal",
        outcome: paypal === "success" ? "success" : "cancel",
        paypalToken: searchParams.get("token") ?? undefined,
      };
    }
    return null;
  });
  const [status, setStatus] = useState<"idle" | "confirming" | "confirmed" | "timeout" | "cancelled">(() =>
    flow ? (flow.outcome === "cancel" ? "cancelled" : "confirming") : "idle",
  );

  useEffect(() => {
    if (!flow) return;
    router.replace("/", { scroll: false });
    if (flow.outcome !== "success") return;

    let cancelled = false;
    (async () => {
      if (flow.provider === "paypal" && flow.paypalToken) {
        // PayPal doesn't charge until we capture the approved order — do it
        // before polling so the first refetch already sees the new paidUntil.
        try {
          await fetch("/api/paypal/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: flow.paypalToken }),
          });
        } catch {
          // fall through to the polling loop; the timeout message covers it
        }
      }
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
  }, [flow, router, refetch, isPaidNow]);

  return status;
}

function moduleStatLabel(slug: string, d: DashboardProgress, t: TranslateFn): string | null {
  if (!d.loaded) return null;
  switch (slug) {
    case "collocations-phrasal-verbs":
      return d.collocationsDue > 0
        ? t("stat.collocationsDue", { n: d.collocationsDue })
        : t("stat.collocationsDone");
    case "cambridge-vocabulary-ielts-advanced":
      return t("stat.cambridgeDone", { done: d.cambridgeDone, total: d.cambridgeTotal });
    case "listen-a-minute":
      return t("stat.listenDone", { done: d.listenDone, total: d.listenTotal });
    case "idioms":
      return t("stat.idiomsLearned", { done: d.idiomsLearned, total: d.idiomsTotal });
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

function HomePageContent() {
  const dashboard = useDashboardProgress();
  const { subscription, trialDaysLeft, refetch } = useSubscriptionStore();
  const { t } = useUiLang();
  const [showPurchase, setShowPurchase] = useState(false);

  const subscriptionRef = useRef(subscription);
  useEffect(() => { subscriptionRef.current = subscription; }, [subscription]);
  const isPaidNow = useCallback(() => isPaidActive(subscriptionRef.current), []);
  const paymentStatus = usePaymentReturn(refetch, isPaidNow);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[min(90vw,2400px)] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[30px]">Vocabulary Builder Pro</h1>
        <p className="mt-1 text-[16px] text-neutral-600">Choose a topic to start practicing.</p>
      </div>

      {paymentStatus !== "idle" && (
        <div className="divider-b bg-accent-100 px-4 py-2.5 text-[16px] font-bold text-accent-800">
          {t(`pay.${paymentStatus}`)}
        </div>
      )}

      {trialDaysLeft > 0 && (
        <div className="divider-b flex items-center justify-between gap-3 bg-accent-100 px-4 py-2.5">
          <span className="text-[16px] font-bold text-accent-800">
            {t("home.trialLeft", { n: trialDaysLeft })}
          </span>
          <button
            className="btn btn-primary flex-none px-3 py-1.5 text-[16px]"
            onClick={() => setShowPurchase(true)}
          >
            {t("home.viewPlans")}
          </button>
        </div>
      )}

      <div className="divider-b px-4 py-4">
        <div className="label-xs mb-2">{t("home.overview")}</div>
        <div className="grid grid-cols-3 gap-[2px] bg-[color:var(--color-divider)]">
          <div className="bg-bg px-3 py-3">
            <div className="text-[24px] leading-none font-extrabold">🔥 {dashboard.streak}</div>
            <div className="label-xs mt-1.5">{t("home.streak")}</div>
          </div>
          <Link href="/dictionary" className="bg-bg px-3 py-3 hover:bg-surface">
            <div className="text-[24px] leading-none font-extrabold">{dashboard.wordsSaved}</div>
            <div className="label-xs mt-1.5">{t("home.wordsSaved")}</div>
          </Link>
          <div className="bg-bg px-3 py-3">
            <GlobalScoreBadge className="text-[24px] leading-none font-extrabold" />
            <div className="label-xs mt-1.5">{t("home.totalXp")}</div>
          </div>
        </div>
        <div className="mt-3 flex h-8 items-end justify-between gap-1">
          {dashboard.weekBars.map((bar, i) => (
            <div key={i} className="flex flex-1 flex-col items-stretch gap-1">
              <div style={{ background: bar.color, height: `${bar.h}px` }} />
              <span className="text-center text-[16px] tracking-wider text-neutral-600">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="label-xs mb-2">Topics</div>
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3 xl:grid-cols-3">
          {MODULES.map((m) =>
            m.available ? (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                className="block border border-transparent bg-surface p-4 transition-colors hover:border-accent"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[21px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap text-accent">{m.subtitle}</span>
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-700">{m.description}</p>
                <div className="mt-3 text-[16px] font-bold text-accent-800">
                  {moduleStatLabel(m.slug, dashboard, t) ?? m.statsLabel}
                </div>
              </Link>
            ) : (
              <div key={m.slug} className="border border-dashed border-neutral-400 p-4 opacity-60">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[21px]">{m.title}</h2>
                  <span className="label-xs whitespace-nowrap">Soon</span>
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-neutral-700">{m.description}</p>
              </div>
            ),
          )}
        </div>
      </div>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
      <FeedbackPrompt />
    </div>
  );
}
