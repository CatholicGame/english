"use client";

import { useState } from "react";

interface Props {
  text: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Copies a piece of AI-generated practice text (a correction, a model answer, a
 * rewritten paragraph...) to the clipboard. Mirrors ShareButton's status-swap
 * pattern (idle -> copied/error -> idle after 1.5s) so copy and share read as
 * one family of actions across the app. */
export function CopyButton({ text, label = "Copy", className, style }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch (err) {
      console.error("CopyButton: clipboard write failed", err);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <button type="button" className={className} style={style} onClick={handleCopy} title="Copy">
      {status === "copied" ? "✅ Copied" : status === "error" ? "⚠️ Failed" : `📋 ${label}`}
    </button>
  );
}
