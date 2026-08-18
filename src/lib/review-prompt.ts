// Shared "have we already asked this account to rate the app" flag — used by
// both the proactive prompt (FeedbackPrompt.tsx) and the full /reviews page,
// so submitting a rating from either place silences the other.

const STORAGE_KEY = "feedback:asked";

export function alreadyAskedToReview(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true; // private mode / storage unavailable — don't risk asking every load
  }
}

export function markAskedToReview() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // best-effort
  }
}
