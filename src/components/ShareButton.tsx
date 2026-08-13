"use client";

import { useState } from "react";
import logo from "@/assets/logo/logo.png";

interface Props {
  title: string;
  text?: string;
  getUrl: () => Promise<string> | string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

/** Fetched lazily on share (not on render) so a page with many ShareButtons
 * never pays for the logo unless someone actually shares. Failure is fine —
 * the logo is a nice-to-have, not required for a successful share. */
async function fetchLogoFile(): Promise<File | null> {
  try {
    const res = await fetch(logo.src);
    const blob = await res.blob();
    return new File([blob], "phrasalup.png", { type: blob.type || "image/png" });
  } catch {
    return null;
  }
}

/** Shares via the native Web Share sheet when available, otherwise copies the link.
 * Attaches the app logo when the target share sheet supports file attachments
 * (e.g. Messages, WhatsApp) so the invite looks like more than a bare link. */
export function ShareButton({ title, text, getUrl, className, style, label = "Share" }: Props) {
  const [status, setStatus] = useState<"idle" | "busy" | "copied" | "error">("idle");

  async function handleShare() {
    setStatus("busy");
    try {
      const url = await getUrl();
      if (typeof navigator !== "undefined" && navigator.share) {
        const base: ShareData = { title, text, url };
        const file = await fetchLogoFile();
        const withLogo: ShareData | null = file ? { ...base, files: [file] } : null;
        await navigator.share(withLogo && navigator.canShare?.(withLogo) ? withLogo : base);
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
    <button className={className} style={style} onClick={handleShare} disabled={status === "busy"} title="Share">
      {status === "copied" ? "✅ Copied" : status === "error" ? "⚠️ Failed" : status === "busy" ? "…" : `📤 ${label}`}
    </button>
  );
}
