"use client";

// Proactive "how do you like the app?" prompt — shown at most once per
// account, only once the learner has actually used the app enough to have an
// opinion (streak >= MIN_STREAK), so it never interrupts someone who just
// signed up. Asking is a one-time thing (submit or dismiss both set the same
// localStorage flag) rather than a recurring nag, since there's already an
// always-available entry point in Settings for anyone who wants to rate later.

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useDashboardProgress } from "@/lib/use-dashboard-progress";
import { FeedbackModal } from "./FeedbackModal";

const STORAGE_KEY = "feedback:asked";
const MIN_STREAK = 3;
const SHOW_DELAY_MS = 1500;

function alreadyAsked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true; // private mode / storage unavailable — don't risk asking every load
  }
}

function markAsked() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // best-effort
  }
}

export function FeedbackPrompt() {
  const { authenticated } = useAuth();
  const { loaded, streak } = useDashboardProgress();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!authenticated || !loaded || streak < MIN_STREAK || alreadyAsked()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [authenticated, loaded, streak]);

  if (!open) return null;

  return (
    <FeedbackModal
      context="prompt"
      onSubmitted={markAsked}
      onClose={() => {
        markAsked();
        setOpen(false);
      }}
    />
  );
}
