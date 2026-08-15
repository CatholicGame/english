// Interim manual content gating: which units/lessons/verbs stay free as a
// trial while everything else requires the Pro entitlement
// (src/lib/subscription-store.ts, see docs/subscription-interim-system.md).
// AI-practice features are intentionally NOT gated here — no request-quota
// limiting exists yet (see docs/launch-checklist.md, "Kiểm soát chi phí AI").

export const FREE_CAMBRIDGE_UNIT = 1;
export const FREE_LISTEN_LESSON_SLUG = "accidents";
export const FREE_VERB = "do";

export function isCambridgeUnitLocked(unit: number, isPro: boolean): boolean {
  return !isPro && unit !== FREE_CAMBRIDGE_UNIT;
}

export function isListenLessonLocked(slug: string, isPro: boolean): boolean {
  return !isPro && slug !== FREE_LISTEN_LESSON_SLUG;
}

export function isVerbLocked(verb: string, isPro: boolean): boolean {
  return !isPro && verb.toLowerCase() !== FREE_VERB;
}
