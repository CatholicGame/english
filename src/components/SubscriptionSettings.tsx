"use client";

// Status + pricing + redeem box for the app's trial/paid entitlement — there
// is no payment gateway wired up yet (see src/lib/subscription-store.ts and
// docs/subscription-interim-system.md). Tapping a plan reveals a QR code once
// src/lib/payment-config.ts has real bank details (falls back to a "coming
// soon, message the admin" note until then). After confirming a transfer
// out-of-band, the admin runs scripts/generate-activation-code.mjs and sends
// the matching code here to redeem. Reused both in Settings (gear menu) and
// inside PurchaseModal when tapping locked content.

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import {
  PRICING_PLANS,
  isPaidActive,
  isTrialActive,
  trialDaysLeft as computeTrialDaysLeft,
  type PricingPlan,
  type BillingCycle,
} from "@/lib/subscription-store";
import { BANK_TRANSFER, vietQrImageUrl, transferNote } from "@/lib/payment-config";
import { CopyButton } from "./CopyButton";

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
  const { user } = useAuth();
  const { subscription, isUnlocked, applyServerSubscription } = useSubscriptionStore();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle | null>(null);

  async function redeem() {
    if (!code.trim() || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/account/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        return;
      }
      applyServerSubscription(json.subscription);
      setCode("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const paidActive = isPaidActive(subscription);
  const trialActive = isTrialActive(subscription);
  const daysLeft = computeTrialDaysLeft(subscription);
  const selectedPlan = PRICING_PLANS.find((p) => p.cycle === selectedCycle) ?? null;
  const note = selectedPlan && user ? transferNote(user.email, selectedPlan.cycle) : "";

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
              onClick={() => setSelectedCycle(selected ? null : plan.cycle)}
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
        <div className="mb-3 border p-3" style={{ borderColor: "var(--color-divider)" }}>
          {BANK_TRANSFER ? (
            <>
              {/* Dynamic VietQR image (amount + content baked in) — a plain
                  <img>, not next/image, since the URL is generated per plan/user
                  and isn't a static local asset. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vietQrImageUrl(BANK_TRANSFER, selectedPlan.priceVnd, note)}
                alt={`QR chuyển khoản ${formatVnd(selectedPlan.priceVnd)}`}
                className="mx-auto mb-2 h-auto w-full max-w-[220px]"
              />
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-neutral-600">Số tiền</span>
                <span className="font-extrabold tabular-nums">{formatVnd(selectedPlan.priceVnd)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[12px]">
                <span className="text-neutral-600">Nội dung CK</span>
                <span className="flex items-center gap-1.5">
                  <span className="font-extrabold">{note}</span>
                  <CopyButton text={note} label="Copy" className="text-[11px] font-bold text-accent" />
                </span>
              </div>
            </>
          ) : (
            <p className="text-[12px] text-neutral-600">
              🚧 Đang hoàn tất kênh chuyển khoản QR tự động cho gói {selectedPlan.label}. Nhắn cho admin để được hướng
              dẫn chuyển khoản thủ công trong lúc chờ.
            </p>
          )}
        </div>
      )}

      {!isUnlocked && (
        <p className="mb-2 text-[11px] text-neutral-600">
          Sau khi chuyển khoản theo gói đã chọn, bạn sẽ nhận được mã kích hoạt để nhập bên dưới.
        </p>
      )}

      <div className="label-xs mb-1.5">Đã thanh toán? Nhập mã kích hoạt</div>
      <div className="flex gap-1.5">
        <input
          className="input flex-1 text-[13px]"
          placeholder="XXXX-XXXX"
          value={code}
          onChange={(e) => { setCode(e.target.value); if (status === "error") setStatus("idle"); }}
          onKeyDown={(e) => { if (e.key === "Enter") redeem(); }}
        />
        <button className="btn btn-primary px-3 py-1.5 text-[12px]" onClick={redeem} disabled={status === "loading"}>
          Kích hoạt
        </button>
      </div>
      {status === "error" && <div className="mt-1 text-[11px] text-red-600">Mã không đúng, thử lại.</div>}
    </div>
  );
}
