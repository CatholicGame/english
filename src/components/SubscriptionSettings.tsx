"use client";

// Status + pricing for the app's trial/paid entitlement (see
// src/lib/subscription-store.ts and docs/subscription-interim-system.md).
// Tapping a plan creates a real PayOS checkout link and redirects to it;
// PayOS's own webhook grants paid access automatically once the transfer
// clears (see /api/payos/webhook) — no manual code entry. Reused both in
// Settings (gear menu) and inside PurchaseModal when tapping locked content.

import { useState } from "react";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import {
  PRICING_PLANS,
  isPaidActive,
  isTrialActive,
  trialDaysLeft as computeTrialDaysLeft,
  type PricingPlan,
  type BillingCycle,
} from "@/lib/subscription-store";

function savingsLabel(plan: PricingPlan): string | null {
  if (plan.cycle === "monthly") return null;
  const monthly = PRICING_PLANS.find((p) => p.cycle === "monthly");
  if (!monthly) return null;
  const baseline = monthly.priceVnd * plan.months;
  const pct = Math.round((1 - plan.priceVnd / baseline) * 100);
  return pct > 0 ? `Tiết kiệm ${pct}%` : null;
}

function formatVnd(n: number): string {
  return `${n.toLocaleString("vi-VN")}đ`;
}

export function SubscriptionSettings() {
  const { subscription, isUnlocked } = useSubscriptionStore();
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

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

  const paidActive = isPaidActive(subscription);
  const trialActive = isTrialActive(subscription);
  const daysLeft = computeTrialDaysLeft(subscription);
  const selectedPlan = PRICING_PLANS.find((p) => p.cycle === selectedCycle) ?? null;

  return (
    <div className="px-3 py-2">
      <div className="label-xs mb-1.5">Gói dịch vụ</div>

      {paidActive ? (
        <div className="mb-3 text-[12px] font-bold text-accent-800">
          ✓ Đã kích hoạt — dùng được đến {new Date(subscription.paidUntil!).toLocaleDateString("vi-VN")}
        </div>
      ) : trialActive ? (
        <div className="mb-3 text-[12px] font-bold text-accent-800">
          🎁 Đang dùng thử miễn phí — còn {daysLeft} ngày
        </div>
      ) : (
        <div className="mb-3 text-[12px] font-bold text-neutral-600">Hết hạn dùng thử — một số nội dung đã bị khoá.</div>
      )}

      <div className="mb-3 flex flex-col gap-1.5">
        {PRICING_PLANS.map((plan) => {
          const savings = savingsLabel(plan);
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
                  <span className="text-[13px] font-extrabold">{plan.label}</span>
                  {plan.cycle === "yearly" && (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-white uppercase">
                      Tốt nhất
                    </span>
                  )}
                </div>
                {plan.hook ? (
                  <div className="text-[10px] font-bold text-accent">{plan.hook}</div>
                ) : savings ? (
                  <div className="text-[10px] font-bold text-accent">{savings}</div>
                ) : null}
              </div>
              <div className="text-[14px] font-extrabold tabular-nums">{formatVnd(plan.priceVnd)}</div>
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
            {status === "loading" ? "Đang tạo link thanh toán..." : `Thanh toán ${formatVnd(selectedPlan.priceVnd)} qua PayOS`}
          </button>
          {status === "error" && (
            <div className="mt-1.5 text-[11px] text-red-600">Không tạo được link thanh toán, thử lại.</div>
          )}
        </div>
      )}

      {!isUnlocked && !selectedPlan && (
        <p className="text-[11px] text-neutral-600">Chọn 1 gói ở trên để thanh toán — quyền lợi sẽ tự động kích hoạt ngay sau khi chuyển khoản thành công.</p>
      )}
    </div>
  );
}
