"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { Modal } from "@/components/Modal";
import { trackEvent } from "@/lib/firebase-client";
import { useUiLang } from "@/lib/i18n";

interface Feature {
  emoji: string;
  /** Static title used as-is (same word in both UI languages). */
  title?: string;
  /** Dictionary key for a title that differs between UI languages. */
  titleKey?: string;
  bodyKey: string;
  badgeKey?: string;
}

const FEATURES: Feature[] = [
  {
    emoji: "🧩",
    title: "Collocations & Phrasal Verbs",
    bodyKey: "feature.cpv.body",
  },
  {
    emoji: "📖",
    title: "Cambridge Vocabulary for IELTS Advanced",
    bodyKey: "feature.cambridge.body",
  },
  {
    emoji: "🎧",
    title: "Listen A Minute",
    bodyKey: "feature.listen.body",
  },
  {
    emoji: "💬",
    title: "Idiom",
    bodyKey: "feature.idiom.body",
    badgeKey: "feature.idiom.badge",
  },
  {
    emoji: "🔍",
    titleKey: "feature.lookup.title",
    bodyKey: "feature.lookup.body",
  },
  {
    emoji: "🔥",
    titleKey: "feature.streak.title",
    bodyKey: "feature.streak.body",
  },
];

export function LoginScreen() {
  const searchParams = useSearchParams();
  const { t } = useUiLang();
  const returnTo = searchParams.get("returnTo") ?? "/";
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center bg-bg px-4 lg:max-w-[880px] lg:flex-row lg:items-center lg:gap-16 lg:border-x-2 lg:border-[color:var(--color-divider)] lg:px-8">
      <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
        <Image
          src={logo}
          alt="Vocabulary Builder Pro"
          width={220}
          height={220}
          className="h-36 w-36 rounded-full lg:h-52 lg:w-52"
          priority
        />
        <h1 className="mt-4 text-[30px] lg:text-[40px]">Vocabulary Builder Pro</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-600 lg:mt-4 lg:max-w-[440px] lg:text-[15px]">
          {t("login.subtitle")}
        </p>
        <button
          className="btn btn-ghost mt-3 px-0 text-[13px] font-bold text-accent-800"
          onClick={() => setShowFeatures(true)}
        >
          {t("login.features")}
        </button>
      </div>
      <div className="lg:w-[320px] lg:flex-none">
        <a
          href={`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`}
          onClick={() => trackEvent("login", { method: "google" })}
          className="btn btn-primary mt-6 w-full px-4 py-3 lg:mt-0"
        >
          {t("auth.signin")}
        </a>
        <p className="mt-3 text-center text-[11px] text-neutral-500 lg:text-left">
          {t("login.bySigningIn")}{" "}
          <Link href="/terms" className="underline">{t("login.terms")}</Link> {t("login.and")}{" "}
          <Link href="/privacy" className="underline">{t("login.privacy")}</Link>.
        </p>
      </div>
      {showFeatures && (
        <Modal onClose={() => setShowFeatures(false)} contentClassName="lg:max-w-[720px]">
          <h2 className="mb-1 text-[20px] font-extrabold">{t("login.why")}</h2>
          <p className="mb-4 text-[13px] leading-relaxed text-neutral-600">
            {t("login.whyBody")}
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f.bodyKey} className="divider-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">{f.emoji}</span>
                  <span className="text-[14px] font-extrabold">{f.titleKey ? t(f.titleKey) : f.title}</span>
                  {f.badgeKey && <span className="label-xs text-accent">{t(f.badgeKey)}</span>}
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">{t(f.bodyKey)}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
