"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { Modal } from "@/components/Modal";
import { trackEvent } from "@/lib/firebase-client";
import { useUiLang, STRINGS } from "@/lib/i18n";

interface BaseFeature {
  emoji: string;
  /** Static title used as-is (same word in both UI languages). */
  title?: string;
  /** Dictionary key for a title that differs between UI languages. */
  titleKey?: string;
}

/** A learning module — shown as "Why learn this?" then "How the app helps",
 * each rendered in both EN and VI. */
interface ModuleFeature extends BaseFeature {
  kind: "module";
  whyKey: string;
  howKey: string;
}

/** A supporting capability — shown as a single EN + VI block. */
interface SimpleFeature extends BaseFeature {
  kind: "simple";
  bodyKey: string;
}

type Feature = ModuleFeature | SimpleFeature;

interface FeatureGroup {
  /** Dictionary key for the stage label. */
  stageKey: string;
  /** Dictionary key for the stage summary line. */
  stageDescKey: string;
  features: Feature[];
}

/** Renders a dictionary entry in BOTH languages (EN block then VI block), each
 * tagged with a tiny language badge — English learners get the original text
 * plus a Vietnamese check, instead of a single-language block. */
function BilingualBlock({ entry }: { entry: { vi: string; en: string } }) {
  return (
    <div className="mt-1 flex flex-col gap-1">
      <p className="text-[12px] leading-relaxed text-neutral-700">
        <span className="mr-1.5 inline-block rounded bg-neutral-100 px-1 py-px align-middle text-[9px] font-extrabold text-neutral-500">EN</span>
        {entry.en}
      </p>
      <p className="text-[12px] leading-relaxed text-neutral-600">
        <span className="mr-1.5 inline-block rounded bg-neutral-100 px-1 py-px align-middle text-[9px] font-extrabold text-neutral-500">VI</span>
        {entry.vi}
      </p>
    </div>
  );
}

/** Organized as a learning path — vocabulary foundation → natural
 * communication → IELTS-level mastery — plus supporting systems. Every module
 * first answers "why learn this?" before explaining how the app makes it
 * effective, so it reads as pedagogy, not a dry feature list. */
const FEATURE_GROUPS: FeatureGroup[] = [
  {
    stageKey: "feature.stage.vocab",
    stageDescKey: "feature.stage.vocab.desc",
    features: [
      { kind: "module", emoji: "🧩", title: "Collocations & Phrasal Verbs", whyKey: "feature.cpv.why", howKey: "feature.cpv.how" },
      { kind: "simple", emoji: "🔍", titleKey: "feature.lookup.title", bodyKey: "feature.lookup.body" },
    ],
  },
  {
    stageKey: "feature.stage.communicate",
    stageDescKey: "feature.stage.communicate.desc",
    features: [
      { kind: "module", emoji: "💬", title: "Idioms", whyKey: "feature.idiom.why", howKey: "feature.idiom.how" },
      { kind: "module", emoji: "🎧", title: "Listen A Minute", whyKey: "feature.listen.why", howKey: "feature.listen.how" },
    ],
  },
  {
    stageKey: "feature.stage.ielts",
    stageDescKey: "feature.stage.ielts.desc",
    features: [
      { kind: "module", emoji: "📖", title: "Cambridge Vocabulary for IELTS Advanced", whyKey: "feature.cambridge.why", howKey: "feature.cambridge.how" },
    ],
  },
  {
    stageKey: "feature.stage.system",
    stageDescKey: "feature.stage.system.desc",
    features: [
      { kind: "simple", emoji: "🧭", titleKey: "feature.allinone.title", bodyKey: "feature.allinone.body" },
      { kind: "simple", emoji: "📌", titleKey: "feature.highlight.title", bodyKey: "feature.highlight.body" },
      { kind: "simple", emoji: "🔥", titleKey: "feature.streak.title", bodyKey: "feature.streak.body" },
    ],
  },
];

const UI_LANG_OPTIONS: { id: "vi" | "en"; label: string }[] = [
  { id: "vi", label: "Tiếng Việt" },
  { id: "en", label: "English" },
];

export function LoginScreen() {
  const searchParams = useSearchParams();
  const { lang, setUiLang, t } = useUiLang();
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
        <div className="mt-4 flex items-center justify-center gap-1.5 lg:justify-start">
          <span className="text-[11px] font-bold text-neutral-500">{t("login.interfaceLang")}:</span>
          {UI_LANG_OPTIONS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setUiLang(l.id)}
              className="rounded-full px-2.5 py-1 text-[12px] font-bold"
              style={{
                background: lang === l.id ? "var(--color-accent)" : "var(--color-surface)",
                color: lang === l.id ? "#fff" : "var(--color-text)",
                border: lang === l.id ? "none" : "1px solid var(--color-divider)",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      {showFeatures && (
        <Modal onClose={() => setShowFeatures(false)} contentClassName="lg:max-w-[720px]">
          <h2 className="mb-1 text-[20px] font-extrabold">{t("login.why")}</h2>
          <p className="mb-4 text-[13px] leading-relaxed text-neutral-600">
            {t("login.whyBody")}
          </p>
          <div className="flex flex-col gap-4">
            {FEATURE_GROUPS.map((g) => (
              <div key={g.stageKey} className="divider-b pb-3 last:border-b-0 last:pb-0">
                <div className="mb-1 text-[13px] font-extrabold text-accent">{t(g.stageKey)}</div>
                <p className="mb-2 text-[11px] leading-relaxed text-neutral-500">{t(g.stageDescKey)}</p>
                <div className="flex flex-col gap-3">
                  {g.features.map((f) => (
                    <div key={f.kind === "module" ? f.whyKey : f.bodyKey}>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{f.emoji}</span>
                        <span className="text-[13px] font-extrabold">{f.titleKey ? t(f.titleKey) : f.title}</span>
                      </div>
                      {f.kind === "module" ? (
                        <div className="mt-1.5 flex flex-col gap-2">
                          <div>
                            <div className="text-[10px] font-extrabold uppercase tracking-wide text-accent">{t("feature.whyLabel")}</div>
                            <BilingualBlock entry={STRINGS[f.whyKey] ?? { vi: "", en: "" }} />
                          </div>
                          <div>
                            <div className="text-[10px] font-extrabold uppercase tracking-wide text-accent">{t("feature.howLabel")}</div>
                            <BilingualBlock entry={STRINGS[f.howKey] ?? { vi: "", en: "" }} />
                          </div>
                        </div>
                      ) : (
                        <BilingualBlock entry={STRINGS[f.bodyKey] ?? { vi: "", en: "" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
