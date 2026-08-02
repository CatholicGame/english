// Tracks which "Listen A Minute" lesson/step the user last had open, so the list
// page can offer a "Continue" shortcut. Separate from ProgressProvider, which only
// tracks finished lessons — this tracks the single most recent in-progress one.

const CURRENT_KEY = "listen-a-minute:current";

export interface CurrentLessonState {
  slug: string;
  step: number;
}

export function getCurrentLesson(): CurrentLessonState | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.slug !== "string" || typeof parsed?.step !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setCurrentLesson(slug: string, step: number) {
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify({ slug, step }));
  } catch {
    // localStorage unavailable — resume position just won't persist
  }
}

export function clearCurrentLesson(slug: string) {
  try {
    const cur = getCurrentLesson();
    if (cur?.slug === slug) localStorage.removeItem(CURRENT_KEY);
  } catch {
    // localStorage unavailable — nothing to clear
  }
}
