// Gating for the proactive "how do you like the app?" prompt (FeedbackPrompt.tsx).
// Two independent localStorage signals, both optional:
//   - "feedback:asked"       permanent opt-out — set by submitting a review
//                            (from the prompt OR the full /reviews page) or by
//                            explicitly choosing "Không hiển thị lại". Never
//                            asks again after this, though Settings -> /reviews
//                            always stays available for rating any time.
//   - "feedback:snoozedUntil" a soft "not now" — set when the learner just
//                            closes the prompt without an explicit choice.
//                            Re-eligible after SNOOZE_MS so it isn't a nag on
//                            every single home-page visit, but isn't gone
//                            forever like the hard opt-out either.

const ASKED_KEY = "feedback:asked";
const SNOOZE_KEY = "feedback:snoozedUntil";
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export function alreadyAskedToReview(): boolean {
  try {
    if (localStorage.getItem(ASKED_KEY) === "1") return true;
    const snoozedUntil = Number(localStorage.getItem(SNOOZE_KEY) ?? 0);
    return Date.now() < snoozedUntil;
  } catch {
    return true; // private mode / storage unavailable — don't risk asking every load
  }
}

/** Permanent opt-out — submitting a review or choosing "Không hiển thị lại". */
export function markAskedToReview() {
  try {
    localStorage.setItem(ASKED_KEY, "1");
  } catch {
    // best-effort
  }
}

/** Soft dismiss — ask again after SNOOZE_MS instead of never again. */
export function snoozeReviewPrompt() {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
  } catch {
    // best-effort
  }
}
