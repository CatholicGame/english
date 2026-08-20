// Interim manual content gating: which units/lessons/verbs stay free
// regardless of unlock status, while everything else requires the account to
// be "unlocked" — either still inside its 7-day trial or paid
// (src/lib/subscription-store.ts, see docs/subscription-interim-system.md).
// AI-practice features are intentionally NOT gated here — no request-quota
// limiting exists yet (see docs/launch-checklist.md, "Kiểm soát chi phí AI").

export const FREE_CAMBRIDGE_UNIT = 1;
export const FREE_LISTEN_LESSON_SLUG = "accidents";
export const FREE_VERB = "do";
export const FREE_IDIOM_UNIT = 1;
export const FREE_GRAMMAR_UNIT = 1;

export function isCambridgeUnitLocked(unit: number, isUnlocked: boolean): boolean {
  return !isUnlocked && unit !== FREE_CAMBRIDGE_UNIT;
}

export function isListenLessonLocked(slug: string, isUnlocked: boolean): boolean {
  return !isUnlocked && slug !== FREE_LISTEN_LESSON_SLUG;
}

export function isVerbLocked(verb: string, isUnlocked: boolean): boolean {
  return !isUnlocked && verb.toLowerCase() !== FREE_VERB;
}

export function isIdiomUnitLocked(unit: number, isUnlocked: boolean): boolean {
  return !isUnlocked && unit !== FREE_IDIOM_UNIT;
}

export function isGrammarUnitLocked(unit: number, isUnlocked: boolean): boolean {
  return !isUnlocked && unit !== FREE_GRAMMAR_UNIT;
}
