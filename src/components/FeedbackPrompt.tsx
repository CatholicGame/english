"use client";

// Proactive "how do you like the app?" prompt — shown at most once per
// account, only once the learner has actually used the app enough to have an
// opinion (streak >= MIN_STREAK), so it never interrupts someone who just
// signed up. Asking is a one-time thing (submit or dismiss both set the same
// localStorage flag) rather than a recurring nag, since there's already an
// always-available entry point (Settings -> /reviews) for anyone who wants
// to rate later. Submits into the same public reviews collection as the
// /reviews page (see reviews-db.ts) — this is just a lower-friction shortcut
// to the same rating, not a separate private feedback channel.

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDashboardProgress } from "@/lib/use-dashboard-progress";
import { alreadyAskedToReview, markAskedToReview } from "@/lib/review-prompt";
import { Modal } from "./Modal";
import { ReviewForm } from "./ReviewForm";

const MIN_STREAK = 3;
const SHOW_DELAY_MS = 1500;

export function FeedbackPrompt() {
  const { authenticated, user } = useAuth();
  const { loaded, streak } = useDashboardProgress();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!authenticated || !loaded || streak < MIN_STREAK || alreadyAskedToReview()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [authenticated, loaded, streak]);

  if (!open) return null;

  function close() {
    markAskedToReview();
    setOpen(false);
  }

  return (
    <Modal onClose={close}>
      <h2 className="text-center text-[17px] font-extrabold">Bạn thấy app thế nào?</h2>
      <p className="mt-1 text-center text-[13px] text-neutral-600">Đánh giá của bạn sẽ hiển thị công khai cho mọi người dùng khác.</p>
      <div className="mt-4">
        <ReviewForm initial={null} defaultName={user?.name} onSubmitted={close} />
      </div>
    </Modal>
  );
}
