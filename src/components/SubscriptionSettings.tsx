"use client";

// Interim manual "paid" status display + redeem box — there is no payment
// gateway wired up yet (see src/lib/subscription-store.ts). After confirming a
// bank/QR transfer out-of-band, the admin runs
// scripts/generate-activation-code.mjs and sends the code here to redeem.

import { useState } from "react";
import { useSubscriptionStore } from "@/lib/use-subscription-store";

export function SubscriptionSettings() {
  const { isPro, applyServerSubscription } = useSubscriptionStore();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

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

  return (
    <div className="px-3 py-2">
      <div className="label-xs mb-1.5">Gói dịch vụ</div>
      {isPro ? (
        <div className="text-[12px] font-bold text-accent-800">✓ Đang dùng gói Pro (kích hoạt thủ công)</div>
      ) : (
        <>
          <div className="mb-1.5 text-[12px] text-neutral-600">Đã thanh toán qua QR code? Nhập mã kích hoạt được gửi cho bạn:</div>
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
        </>
      )}
    </div>
  );
}
