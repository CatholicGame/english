import type { SharedConvoPayload } from "./share-payload";

/** One-line summary used for both the OG/meta description and the share image —
 * prefers the AI's encouragement line (always English, safe for image fonts) over
 * a raw message snippet so link previews highlight the feedback, not just the chat. */
export function shareExcerpt(data: SharedConvoPayload): string {
  const encouragement = data.feedback?.encouragement;
  if (typeof encouragement === "string" && encouragement.trim()) return encouragement.trim();
  const firstUser = data.messages.find((m) => m.role === "user");
  const text = (firstUser ?? data.messages[0])?.content ?? "";
  return text.length > 140 ? text.slice(0, 140) + "…" : text;
}

/** Short English tip/naturalness line from the feedback, if any — shown as a
 * secondary highlight in the share image. */
export function shareFeedbackHighlight(data: SharedConvoPayload): string | null {
  const f = data.feedback;
  if (!f) return null;
  const line = f.tip ?? f.naturalness;
  return typeof line === "string" && line.trim() ? line.trim() : null;
}
