"use client";

// Proactive "how do you like the app?" prompt — mounted on the home page
// only (src/app/page.tsx), so it never interrupts someone mid-exercise.
// Gated on real usage (streak >= MIN_STREAK, from the same unified
// cross-module activity log as the home page's own streak number) rather
// than days-since-signup or just being logged in — someone who signed up but
// never actually practiced anything has no informed opinion to give yet.
// Submits into the same public reviews collection as the /reviews page (see
// reviews-db.ts) — this is a lower-friction shortcut to the same rating, not
// a separate private feedback channel.

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDashboardProgress } from "@/lib/use-dashboard-progress";
import { alreadyAskedToReview, markAskedToReview, snoozeReviewPrompt } from "@/lib/review-prompt";
import { useUiLang } from "@/lib/i18n";
import { Modal } from "./Modal";
import { ReviewForm } from "./ReviewForm";

const MIN_STREAK = 2;
const SHOW_DELAY_MS = 1500;

export function FeedbackPrompt() {
  const { authenticated, user } = useAuth();
  const { loaded, streak } = useDashboardProgress();
  const { t } = useUiLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!authenticated || !loaded || streak < MIN_STREAK || alreadyAskedToReview()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [authenticated, loaded, streak]);

  if (!open) return null;

  function notNow() {
    snoozeReviewPrompt();
    setOpen(false);
  }

  function neverAgain() {
    markAskedToReview();
    setOpen(false);
  }

  function submitted() {
    markAskedToReview();
    setOpen(false);
  }

  return (
    <Modal onClose={notNow}>
      <h2 className="text-center text-[20px] font-extrabold">{t("reviews.prompt.title")}</h2>
      <p className="mt-1 text-center text-[16px] text-neutral-600">{t("reviews.prompt.body")}</p>
      <div className="mt-4">
        <ReviewForm initial={null} defaultName={user?.name} onSubmitted={submitted} />
      </div>
      <button type="button" className="btn btn-ghost mt-3 w-full text-center text-[16px] text-neutral-500" onClick={neverAgain}>
        {t("reviews.neverAgain")}
      </button>
    </Modal>
  );
}
