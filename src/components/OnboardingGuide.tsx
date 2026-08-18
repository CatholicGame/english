"use client";

// First-run welcome: shows ONCE (localStorage flag) after the learner logs in,
// walking them through the 3-stage learning path and the two "wow" features
// (select-to-lookup, looked-up words highlighted). Reuses Modal + i18n.

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useUiLang } from "@/lib/i18n";
import { Modal } from "./Modal";

const STORAGE_KEY = "english-guide-seen";

const STEPS = [
  { emoji: "👋", titleKey: "onboarding.welcome.title", bodyKey: "onboarding.welcome.body" },
  { emoji: "🔍", titleKey: "onboarding.lookup.title", bodyKey: "onboarding.lookup.body" },
  { emoji: "📌", titleKey: "onboarding.highlight.title", bodyKey: "onboarding.highlight.body" },
] as const;

export function OnboardingGuide() {
  const { loading, authenticated } = useAuth();
  const { t } = useUiLang();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (loading || !authenticated) return;
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // ignore
    }
    if (!seen) setOpen(true);
  }, [loading, authenticated]);

  function finish() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <Modal onClose={finish}>
      <div className="text-center">
        <div className="text-[34px]">{s.emoji}</div>
        <h2 className="mt-2 text-[17px] font-extrabold">{t(s.titleKey)}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{t(s.bodyKey)}</p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i === step ? "var(--color-accent)" : "var(--color-divider)" }}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button className="btn btn-ghost px-2 text-[12px] font-bold" onClick={finish}>
            {t("onboarding.skip")}
          </button>
          <button
            className="btn btn-primary px-4 py-2 text-[13px]"
            onClick={() => (isLast ? finish() : setStep((v) => v + 1))}
          >
            {isLast ? t("onboarding.done") : t("onboarding.next")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
