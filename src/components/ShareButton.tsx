"use client";

import { useState } from "react";

interface Props {
  title: string;
  text?: string;
  getUrl: () => Promise<string> | string;
  className?: string;
  label?: string;
}

/** Shares via the native Web Share sheet when available, otherwise copies the link. */
export function ShareButton({ title, text, getUrl, className, label = "Share" }: Props) {
  const [status, setStatus] = useState<"idle" | "busy" | "copied" | "error">("idle");

  async function handleShare() {
    setStatus("busy");
    try {
      const url = await getUrl();
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        setStatus("idle");
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        setStatus("idle");
        return;
      }
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  }

  return (
    <button className={className} onClick={handleShare} disabled={status === "busy"} title="Share">
      {status === "copied" ? "✅ Copied" : status === "error" ? "⚠️ Failed" : status === "busy" ? "…" : `📤 ${label}`}
    </button>
  );
}
