import type { ReactNode } from "react";

/** Minimal inline markup for AI-generated text: **bold** and *italic*, nothing
 * else. Not general markdown, just enough to stop chat/feedback bubbles from
 * showing literal asterisks when the model emphasizes a word. Plain text
 * (including embedded "\n") passes through untouched, so callers keep using
 * their own `whitespace-pre-wrap` class for line breaks. */
export function renderRich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
