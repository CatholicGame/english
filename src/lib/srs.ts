// Shared spaced-repetition scheduling engine (SM-2-lite) — a real per-item
// ease factor that grows/shrinks with performance, instead of a fixed
// level -> interval lookup table. Used by progress-context.tsx (Collocations
// /Phrasal verbs review) and the personal dictionary review flow, so both
// converge on the same math instead of each inventing its own.
//
// Classic SM-2 grades each review on a 0-5 self-rated quality scale; neither
// UI here asks the learner to rate their own confidence, so grading is
// binary (right/wrong) — "wrong" is treated as SM-2 quality=2 (fail),
// "right" as quality=4 (good), using SM-2's own ease-factor delta formula:
// EF' = EF + (0.1 - (5-q)*(0.08+(5-q)*0.02)).

export interface SrsState {
  ease: number;
  interval: number; // days
  reps: number; // consecutive correct reps since the last lapse
  lapses: number; // total times failed, ever
  nextReview: number; // ms epoch
}

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;
const DAY_MS = 24 * 60 * 60 * 1000;
// Short relearning step after a lapse (mirrors Anki's default "again" delay)
// before the item re-enters normal day-scale intervals.
const RELEARN_MS = 4 * 60 * 60 * 1000;

export function initSrsState(now: number = Date.now()): SrsState {
  return { ease: DEFAULT_EASE, interval: 0, reps: 0, lapses: 0, nextReview: now };
}

export function gradeSrs(prev: SrsState | undefined, ok: boolean, now: number = Date.now()): SrsState {
  const state = prev ?? initSrsState(now);
  if (!ok) {
    return {
      ease: Math.max(MIN_EASE, state.ease - 0.32),
      interval: 0,
      reps: 0,
      lapses: state.lapses + 1,
      nextReview: now + RELEARN_MS,
    };
  }
  const reps = state.reps + 1;
  const interval = reps === 1 ? 1 : reps === 2 ? 6 : Math.round(state.interval * state.ease);
  return { ease: state.ease, interval, reps, lapses: state.lapses, nextReview: now + interval * DAY_MS };
}

export function isDueSrs(state: SrsState | undefined, now: number = Date.now()): boolean {
  return !state || state.nextReview <= now;
}
