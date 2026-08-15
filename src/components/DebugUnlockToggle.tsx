"use client";

// DEBUG ONLY — lets you force-lock or force-unlock content from Settings
// while there's no real payment gateway yet (see src/lib/subscription-store.ts
// `debugOverride` and docs/subscription-interim-system.md). The real 7-day
// trial clock keeps counting in the background regardless of this toggle —
// clearing the override always reveals the true trial/paid state. Remove this
// component (and `debugOverride` itself) once real payment ships.

import { useSubscriptionStore } from "@/lib/use-subscription-store";

export function DebugUnlockToggle() {
  const { subscription, setDebugOverride } = useSubscriptionStore();
  const override = subscription.debugOverride;

  function toggle(value: "locked" | "unlocked") {
    setDebugOverride(override === value ? null : value);
  }

  return (
    <div className="px-3 py-2">
      <div className="label-xs mb-1.5">🧪 Debug (trước khi có thanh toán thật)</div>
      <div className="flex gap-1.5">
        <button
          onClick={() => toggle("unlocked")}
          className="rounded-full px-2.5 py-1 text-[12px] font-bold"
          style={{
            background: override === "unlocked" ? "var(--color-accent)" : "var(--color-surface)",
            color: override === "unlocked" ? "#fff" : "var(--color-text)",
            border: override === "unlocked" ? "none" : "1px solid var(--color-divider)",
          }}
        >
          {override === "unlocked" ? "✓ Đang ép mở khoá" : "Ép mở khoá"}
        </button>
        <button
          onClick={() => toggle("locked")}
          className="rounded-full px-2.5 py-1 text-[12px] font-bold"
          style={{
            background: override === "locked" ? "var(--color-accent)" : "var(--color-surface)",
            color: override === "locked" ? "#fff" : "var(--color-text)",
            border: override === "locked" ? "none" : "1px solid var(--color-divider)",
          }}
        >
          {override === "locked" ? "✓ Đang ép khoá" : "Ép khoá"}
        </button>
      </div>
      {override && (
        <p className="mt-1.5 text-[11px] text-neutral-600">
          Trial 7 ngày vẫn chạy ngầm bình thường — bấm lại nút đang bật để quay về trạng thái thật.
        </p>
      )}
    </div>
  );
}
