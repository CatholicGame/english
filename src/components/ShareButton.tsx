"use client";

import { useState } from "react";
import logo from "@/assets/logo/logo.png";

interface Props {
  title: string;
  text?: string;
  getUrl: () => Promise<string> | string;
  /** Derives a full-content "card" image URL from the resolved share URL (e.g. `${url}/card`).
   * When set, this image is attached to the share instead of the bare app logo — so a native
   * share sheet (Messages, WhatsApp, Zalo) shows the actual content, not just a link. */
  getImageUrl?: (url: string) => string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

/** Fetched lazily on share (not on render) so a page with many ShareButtons
 * never pays for the image unless someone actually shares. Failure is fine —
 * the image is a nice-to-have, not required for a successful share. */
async function fetchImageFile(url: string, filename: string): Promise<File | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type || "image/png" });
  } catch {
    return null;
  }
}

// navigator.clipboard.writeText requires a secure context AND the document to
// still have focus at the moment it runs — on desktop that second condition is
// easy to lose (devtools open, a background fetch taking just long enough for
// focus to shift) in a way mobile rarely hits, so clipboard-write can throw
// there even though nothing is actually wrong. execCommand("copy") uses a plain
// text selection instead of the permissions-gated Clipboard API, so it's a
// meaningfully different code path — not just a repeat of the same failure.
function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

// navigator.share() only works within a short window after the user's click
// ("transient activation") — some browsers reject it outright once that window
// has passed. A dynamically-rendered card image can take a couple of seconds to
// generate, which was blowing past that window and making every share fail. This
// caps how long we wait for it: if it's not ready in time, share proceeds without
// the image rather than risk the whole share failing.
function withDeadline<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      () => { clearTimeout(timer); resolve(fallback); },
    );
  });
}

/** Shares via the native Web Share sheet when available, otherwise copies the link.
 * Attaches the app logo when the target share sheet supports file attachments
 * (e.g. Messages, WhatsApp) so the invite looks like more than a bare link. */
export function ShareButton({ title, text, getUrl, getImageUrl, className, style, label = "Share" }: Props) {
  const [status, setStatus] = useState<"idle" | "busy" | "copied" | "error">("idle");
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  async function handleShare() {
    setStatus("busy");
    setFailedUrl(null);

    let url: string;
    try {
      url = await getUrl();
    } catch (err) {
      console.error("ShareButton: failed to create share link", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        const base: ShareData = { title, text, url };
        const file = getImageUrl
          ? await withDeadline(fetchImageFile(getImageUrl(url), "vocabulary-builder-pro-share.png"), 1000, null)
          : await withDeadline(fetchImageFile(logo.src, "vocabulary-builder-pro.png"), 1000, null);
        const withFile: ShareData | null = file ? { ...base, files: [file] } : null;
        await navigator.share(withFile && navigator.canShare?.(withFile) ? withFile : base);
        setStatus("idle");
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          setStatus("idle");
          return;
        }
        // Native share can reject for reasons unrelated to the user (lost the
        // gesture window, platform quirk) — clipboard is the safety net.
        console.error("ShareButton: navigator.share failed, falling back to clipboard", err);
      }
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1500);
      return;
    } catch (err) {
      console.error("ShareButton: clipboard fallback failed, trying legacy copy", err);
    }

    if (legacyCopy(url)) {
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1500);
      return;
    }

    // Both the Clipboard API and execCommand failed — leave the user a way to
    // still grab the link instead of a dead-end "Failed" with nothing to do.
    console.error("ShareButton: legacy copy also failed, surfacing url for manual copy");
    setFailedUrl(url);
    setStatus("error");
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <button className={className} style={style} onClick={handleShare} disabled={status === "busy"} title="Share">
        {status === "copied" ? (
          "✅ Copied"
        ) : status === "error" ? (
          "⚠️ Failed"
        ) : status === "busy" ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Preparing…
          </span>
        ) : (
          `📤 ${label}`
        )}
      </button>
      {failedUrl && (
        <input
          readOnly
          value={failedUrl}
          onFocus={(e) => e.currentTarget.select()}
          className="input min-w-0 flex-1 basis-40 text-[11px]"
          aria-label="Share link — select and copy manually"
        />
      )}
    </span>
  );
}
