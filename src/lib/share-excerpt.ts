import type { SharedConvoPayload } from "./share-payload";

/** One-line summary used for both the OG/meta description and the share image —
 * prefers a progress bullet (always English, safe for image fonts) over a raw
 * message snippet so link previews highlight the feedback, not just the chat. */
export function shareExcerpt(data: SharedConvoPayload): string {
  const progress = data.feedback?.progress;
  const firstProgress = Array.isArray(progress) ? progress.find((p) => typeof p === "string" && p.trim()) : undefined;
  if (typeof firstProgress === "string") return firstProgress.trim();
  const firstUser = data.messages.find((m) => m.role === "user");
  const text = (firstUser ?? data.messages[0])?.content ?? "";
  return text.length > 140 ? text.slice(0, 140) + "…" : text;
}

/** Short English style/suggestion line from the feedback, if any — shown as a
 * secondary highlight in the share image. */
export function shareFeedbackHighlight(data: SharedConvoPayload): string | null {
  const f = data.feedback;
  if (!f) return null;
  const styleHighlight = f.styleHighlight;
  if (typeof styleHighlight === "string" && styleHighlight.trim()) return styleHighlight.trim();
  const style = f.style;
  const firstStyle = Array.isArray(style) ? style.find((s) => typeof s === "string" && s.trim()) : undefined;
  return typeof firstStyle === "string" ? firstStyle.trim() : null;
}
