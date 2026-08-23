"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useUiLang } from "@/lib/i18n";

// Warn once Drive free space gets low enough that our own writes (small, but
// still real files in appDataFolder) risk failing — see
// src/lib/google-drive.ts getDriveStorageQuota. Unlimited-storage accounts
// (limit === null) never warn.
const LOW_FREE_BYTES = 200 * 1024 * 1024; // 200 MB

function fmtGb(bytes: number): string {
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export function DriveQuotaWarning() {
  const { authenticated } = useAuth();
  const { t } = useUiLang();
  const [freeBytes, setFreeBytes] = useState<number | null>(null);

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    fetch("/api/drive/quota")
      .then((r) => (r.ok ? r.json() : null))
      .then((q: { limit: number | null; usage: number } | null) => {
        if (cancelled || !q || q.limit == null) return;
        setFreeBytes(q.limit - q.usage);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [authenticated]);

  if (freeBytes == null || freeBytes > LOW_FREE_BYTES) return null;

  return (
    <div
      className="px-3 py-2 text-center text-[16px] font-bold"
      style={{
        background: "var(--color-accent-100)",
        color: "var(--color-accent-800)",
        borderBottom: "2px solid var(--color-accent-300)",
      }}
    >
      {t("quota.low", { gb: fmtGb(Math.max(freeBytes, 0)) })} {t("quota.cleanup")}
    </div>
  );
}
