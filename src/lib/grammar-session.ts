"use client";

// Where a learner is inside one English Grammar in Use unit, kept across
// reloads.
//
// A unit is 5-6 steps and ~28 scored blanks (15-25 minutes of work), all of
// which used to live in plain `useState` inside the wizard: locking the phone,
// switching app or a stray back gesture threw the whole session away, and so
// did stepping back one screen to re-read the rule page. That last one matters
// most, because re-reading the rule page is exactly what the book itself tells
// the learner to do ("If your answers are not correct, study the left-hand page
// again to see what went wrong", To the student, p.viii) - the UI was punishing
// the study loop the book prescribes.
//
// Everything lives under one localStorage key holding a map of slug -> session,
// pruned to the most recently touched MAX_SESSIONS so 145 units cannot slowly
// eat the quota. Pure helpers (withoutStep / prune / continuable) are exported
// separately so scripts/check-grammar-data.mjs can assert them without a DOM.

export interface StepScore {
  correct: number;
  total: number;
}

export interface GrammarSession {
  /** Which step of the unit the learner was on. */
  stepIndex: number;
  finished: boolean;
  /** Whether progress-context's grade() has already run for this session, so
   * reaching the end a second time (after redoing one exercise from the
   * summary) does not award XP or bump the SRS level twice. */
  graded: boolean;
  scores: Record<number, StepScore>;
  /** `${stepIndex}:${slot}` -> that one exercise's own answer state (what was
   * picked or typed, whether it has been checked). Opaque here on purpose:
   * each step view keeps owning the shape of its own answers, this only
   * stores the blob. */
  steps: Record<string, unknown>;
  /** Last touched, for pruning and for the unit list's "continue" card. */
  t: number;
}

const KEY = "english-grammar-sessions";
const MAX_SESSIONS = 8;

export function emptySession(): GrammarSession {
  return { stepIndex: 0, finished: false, graded: false, scores: {}, steps: {}, t: 0 };
}

/** Forgets one exercise entirely (its score and every answer in it), so it
 * starts blank the next time it is rendered. */
export function withoutStep(s: GrammarSession, index: number): GrammarSession {
  const scores = { ...s.scores };
  delete scores[index];
  const prefix = `${index}:`;
  const steps = Object.fromEntries(Object.entries(s.steps).filter(([k]) => !k.startsWith(prefix)));
  return { ...s, scores, steps };
}

/** Keeps only the `max` most recently touched sessions. */
export function prune(map: Record<string, GrammarSession>, max = MAX_SESSIONS): Record<string, GrammarSession> {
  const slugs = Object.keys(map);
  if (slugs.length <= max) return map;
  const keep = slugs.sort((a, b) => (map[b]?.t ?? 0) - (map[a]?.t ?? 0)).slice(0, max);
  return Object.fromEntries(keep.map((slug) => [slug, map[slug]]));
}

/** Whether a session is worth offering as "continue where you left off":
 * merely opening a unit and leaving is not, actually answering something is. */
export function continuable(s: GrammarSession): boolean {
  return !s.finished && (s.stepIndex > 0 || Object.keys(s.steps).length > 0);
}

let cache: Record<string, GrammarSession> | null = null;

function all(): Record<string, GrammarSession> {
  if (!cache) {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      cache = raw && typeof raw === "object" ? (raw as Record<string, GrammarSession>) : {};
    } catch {
      cache = {}; // private mode, or a corrupt value from an older build
    }
  }
  return cache;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // quota / private mode: the session just won't survive a reload
  }
}

/** Read only from an effect or an event handler, never during render: it
 * touches localStorage, which the server has no equivalent of. */
export function readSession(slug: string): GrammarSession | undefined {
  return all()[slug];
}

export function updateSession(slug: string, fn: (s: GrammarSession) => GrammarSession) {
  const map = all();
  const next: GrammarSession = { ...fn(map[slug] ?? emptySession()), t: Date.now() };
  cache = prune({ ...map, [slug]: next });
  persist();
}

export function dropSession(slug: string) {
  const map = { ...all() };
  delete map[slug];
  cache = map;
  persist();
}

/** The unit the learner was last in the middle of, for the unit list's
 * "continue" card. Finished and barely-started units are not offered. */
export function latestUnfinished(): { slug: string; stepIndex: number } | null {
  const open = Object.entries(all()).filter(([, s]) => continuable(s));
  if (open.length === 0) return null;
  const [slug, s] = open.sort((a, b) => b[1].t - a[1].t)[0];
  return { slug, stepIndex: s.stepIndex };
}
