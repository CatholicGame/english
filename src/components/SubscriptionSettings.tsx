"use client";

// Status + pricing for the app's trial/paid entitlement (see
// src/lib/subscription-store.ts and docs/subscription-interim-system.md).
// Two payment options, picked after choosing a plan:
//   - PayOS: VND, for Vietnamese users (bank transfer / QR code).
//   - PayPal: USD, for international users (hosted PayPal approval).
// Both grant access automatically via their own server-side confirmation
// (PayOS webhook / PayPal capture — see /api/payos/webhook and
// /api/paypal/capture); no manual code entry. Reused both in Settings (gear
// menu) and inside PurchaseModal when tapping locked content.

import { useState } from "react";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { useUiLang } from "@/lib/i18n";
import {
  PRICING_PLANS,
  isPaidActive,
  isTrialActive,
  trialDaysLeft as computeTrialDaysLeft,
  type PricingPlan,
  type BillingCycle,
} from "@/lib/subscription-store";

/** Returns the % saving vs. buying month-to-month, or null when not applicable. */
function savingsPct(plan: PricingPlan): number | null {
  if (plan.cycle === "monthly") return null;
  const monthly = PRICING_PLANS.find((p) => p.cycle === "monthly");
  if (!monthly) return null;
  const baseline = monthly.priceVnd * plan.months;
  const pct = Math.round((1 - plan.priceVnd / baseline) * 100);
  return pct > 0 ? pct : null;
}

function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}

function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function SubscriptionSettings() {
  const { subscription, isUnlocked } = useSubscriptionStore();
  const { lang, t } = useUiLang();
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [paypalStatus, setPaypalStatus] = useState<"idle" | "loading" | "error">("idle");

  async function checkout() {
    if (!selectedCycle || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/payos/create-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycle: selectedCycle }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        return;
      }
      window.location.href = json.checkoutUrl;
    } catch {
      setStatus("error");
    }
  }

  async function checkoutPaypal() {
    if (!selectedCycle || paypalStatus === "loading") return;
    setPaypalStatus("loading");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycle: selectedCycle }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setPaypalStatus("error");
        return;
      }
      // PayPal-hosted approval page — after approving, PayPal redirects back to
      // /?paypal=success&token=<orderId>, where /api/paypal/capture charges it.
      window.location.href = json.approveUrl;
    } catch {
      setPaypalStatus("error");
    }
  }

  const paidActive = isPaidActive(subscription);
  const trialActive = isTrialActive(subscription);
  const daysLeft = computeTrialDaysLeft(subscription);
  const selectedPlan = PRICING_PLANS.find((p) => p.cycle === selectedCycle) ?? null;

  return (
    <div className="px-3 py-2">
      <div className="label-xs mb-1.5">{t("subs.plan")}</div>

      {paidActive ? (
        <div className="mb-3 text-[12px] font-bold text-accent-800">
          {t("subs.activeUntil", { date: new Date(subscription.paidUntil!).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN") })}
        </div>
      ) : trialActive ? (
        <div className="mb-3 text-[12px] font-bold text-accent-800">
          {t("subs.trialLeft", { n: daysLeft })}
        </div>
      ) : (
        <div className="mb-3 text-[12px] font-bold text-neutral-600">{t("subs.trialExpired")}</div>
      )}

      <div className="mb-3 rounded bg-accent-100 px-3 py-2 text-[12px] leading-relaxed font-bold text-accent-800">
        {t("subs.valueHook")}
      </div>

      <div className="mb-3 flex flex-col gap-1.5">
        {PRICING_PLANS.map((plan) => {
          const savings = savingsPct(plan);
          const selected = plan.cycle === selectedCycle;
          return (
            <button
              key={plan.cycle}
              type="button"
              onClick={() => { setSelectedCycle(selected ? null : plan.cycle); if (status === "error") setStatus("idle"); }}
              className="flex items-center justify-between border px-3 py-2 text-left"
              style={{
                borderColor: selected ? "var(--color-accent)" : "var(--color-divider)",
                background: selected ? "var(--color-surface)" : undefined,
              }}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-extrabold">{t(`plan.${plan.cycle}`)}</span>
                  {plan.cycle === "yearly" && (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-white uppercase">
                      {t("subs.bestValue")}
                    </span>
                  )}
                </div>
                {plan.hook ? (
                  <div className="text-[10px] font-bold text-accent">{t(`plan_hook.${plan.cycle}`)}</div>
                ) : savings != null ? (
                  <div className="text-[10px] font-bold text-accent">{t("subs.savePct", { pct: savings })}</div>
                ) : null}
              </div>
              <div className="text-right">
                <div className="text-[14px] font-extrabold tabular-nums">{formatVnd(plan.priceVnd)}</div>
                <div className="text-[10px] font-bold text-neutral-500 tabular-nums">{formatUsd(plan.priceUsd)}</div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary btn-block px-4 py-2.5 text-[13px]"
            onClick={checkout}
            disabled={status === "loading"}
          >
            {status === "loading" ? t("subs.creatingLink") : t("subs.payPayos", { price: formatVnd(selectedPlan.priceVnd) })}
          </button>
          {status === "error" && (
            <div className="mt-1.5 text-[11px] text-red-600">{t("subs.payosError")}</div>
          )}

          <div className="my-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
            <span className="h-px flex-1 bg-[color:var(--color-divider)]" />
            {t("subs.or")}
            <span className="h-px flex-1 bg-[color:var(--color-divider)]" />
          </div>

          <button
            type="button"
            className="btn btn-block px-4 py-2.5 text-[13px]"
            style={{ background: "#ffc439", color: "#003087", borderColor: "var(--color-divider)" }}
            onClick={checkoutPaypal}
            disabled={paypalStatus === "loading"}
          >
            {paypalStatus === "loading" ? t("subs.creatingPaypal") : t("subs.payPaypal", { price: formatUsd(selectedPlan.priceUsd) })}
          </button>
          {paypalStatus === "error" && (
            <div className="mt-1.5 text-[11px] text-red-600">{t("subs.paypalError")}</div>
          )}
        </div>
      )}

      {!isUnlocked && !selectedPlan && (
        <p className="text-[11px] text-neutral-600">{t("subs.footer")}</p>
      )}
    </div>
  );
}
