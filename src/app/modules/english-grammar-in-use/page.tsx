"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GRAMMAR_SECTIONS, UNITS_META } from "@/data/english-grammar-in-use";
import { useProgress } from "@/lib/progress-context";
import { lvlOf } from "@/lib/stats";
import { fold } from "@/lib/utils";
import { useUiLang } from "@/lib/i18n";
import { latestUnfinished } from "@/lib/grammar-session";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isGrammarUnitLocked } from "@/lib/content-access";
import { LockIcon } from "@/components/LockIcon";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useScrollRestoration } from "@/lib/use-scroll-restoration";

export default function GrammarUnitsPage() {
  useScrollRestoration();
  const { progress } = useProgress();
  const { lang, t } = useUiLang();
  const { isUnlocked } = useSubscriptionStore();
  const [showPurchase, setShowPurchase] = useState(false);
  const [query, setQuery] = useState("");
  // localStorage, so it can only be read after mount.
  const [resume, setResume] = useState<{ slug: string; stepIndex: number } | null>(null);
  useEffect(() => setResume(latestUnfinished()), []);

  const total = UNITS_META.length;
  const doneCount = UNITS_META.filter((u) => lvlOf(progress, u.slug) > 0).length;
  const donePct = total ? Math.round((doneCount / total) * 100) : 0;
  const resumeUnit = resume && UNITS_META.find((u) => u.slug === resume.slug);

  // Search matches the unit number, its title, and its chapter name, because a
  // learner looking for "câu điều kiện" or "present perfect" does not know
  // which of the 145 numbers that is. The book itself expects this: "The units
  // are not in order of difficulty ... Use the Contents and/or Index to find
  // which unit deals with the point you are interested in" (To the student).
  const q = fold(query);
  const sections = GRAMMAR_SECTIONS.map((section) => {
    const inSection = UNITS_META.filter((u) => u.unit >= section.from && u.unit <= section.to);
    const name = lang === "en" ? section.en : section.vi;
    const sectionHit = q !== "" && (fold(name).includes(q) || fold(section.en).includes(q));
    const units = !q
      ? inSection
      : inSection.filter(
          (u) => sectionHit || String(u.unit).startsWith(q) || fold(u.title).includes(q) || fold(u.topic).includes(q),
        );
    return { ...section, name, units, done: inSection.filter((u) => lvlOf(progress, u.slug) > 0).length, of: inSection.length };
  });
  const nothingFound = sections.every((s) => s.units.length === 0);

  return (
    <div className="flex-1 lg:flex lg:flex-row lg:items-stretch lg:gap-8 lg:px-4 lg:py-6">
      <div className="divider-b px-4 py-4 lg:w-[300px] lg:flex-none lg:sticky lg:top-6 lg:self-stretch lg:border-r-2 lg:border-b-0 lg:border-[color:var(--color-divider)] lg:py-0 lg:pl-0 lg:pr-6">
        <Link href="/" className="btn btn-ghost mb-2 px-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block h-4 w-4 flex-none"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Home
        </Link>
        <h1 className="mb-1 text-[26px]">English Grammar in Use</h1>
        <p className="mb-3 text-[16px] text-neutral-600">{t("grammar.list.intro")}</p>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="label-xs">{t("grammar.list.progress")}</span>
          <span className="text-[16px] tabular-nums text-neutral-600">
            {doneCount}/{total} · {donePct}%
          </span>
        </div>
        <div className="h-1.5 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${donePct}%` }} />
        </div>
      </div>

      <div className="lg:flex-1">
        {/* Unit left half-finished: the session is kept now, so the way back
            into it should be one tap and not a hunt through 145 rows. */}
        {resumeUnit && (
          <div className="px-4 pt-4 lg:px-0">
            <Link
              href={`/modules/english-grammar-in-use/${resumeUnit.slug}`}
              className="flex items-center gap-3 rounded-lg border-2 px-3 py-2.5"
              style={{ borderColor: "var(--color-accent)", background: "var(--color-accent-100)" }}
            >
              <span className="min-w-0 flex-1">
                <span className="label-xs block text-accent-800">
                  {t("grammar.list.continueAt", { step: resume!.stepIndex + 1 })}
                </span>
                <span className="mt-0.5 block truncate text-[17px] font-extrabold">
                  <span className="mr-1.5 text-neutral-600">{resumeUnit.unit}.</span>
                  {resumeUnit.title}
                </span>
              </span>
              <span className="label-xs flex-none text-accent">{t("grammar.list.continue")}</span>
            </Link>
          </div>
        )}

        <div className="px-4 pt-4 pb-2 lg:px-0">
          <div className="label-xs mb-2">{t("grammar.list.units")}</div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("grammar.list.search")}
            className="input w-full"
          />
        </div>

        {nothingFound && <div className="px-4 py-3 text-[16px] text-neutral-500">{t("grammar.list.empty")}</div>}

        {sections.map((section) =>
          section.units.length === 0 ? null : (
            <div key={section.from}>
              {/* The book's own Contents chapter, kept visible while scrolling
                  so it is always clear which part of the book this is. */}
              <div
                className="divider-b sticky top-12 z-10 flex items-baseline justify-between gap-3 px-4 py-1.5"
                style={{ background: "var(--color-bg)" }}
              >
                <span className="label-xs truncate text-accent">{section.name}</span>
                <span className="label-xs flex-none tabular-nums text-neutral-500">
                  {section.done}/{section.of}
                </span>
              </div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
                {section.units.map((u) => {
                  const done = lvlOf(progress, u.slug) > 0;
                  // The SRS date grade() already writes for every finished unit
                  // was never surfaced anywhere, so a unit stayed "Xong" forever
                  // and nothing ever suggested going back to it.
                  const due = done && (progress[u.slug]?.nextReview ?? Infinity) <= Date.now();
                  const locked = u.available && isGrammarUnitLocked(u.unit, isUnlocked);
                  const body = (
                    <>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[18px] font-extrabold">
                          <span className="mr-1.5 text-neutral-600">{u.unit}.</span>
                          {u.title}
                        </span>
                        {!u.available ? (
                          <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                            <LockIcon />
                            {t("grammar.list.soon")}
                          </span>
                        ) : locked ? (
                          <span className="label-xs flex items-center gap-1 whitespace-nowrap text-neutral-500">
                            <LockIcon />
                            {t("grammar.list.locked")}
                          </span>
                        ) : due ? (
                          <span className="label-xs whitespace-nowrap text-accent">{t("grammar.list.due")}</span>
                        ) : done ? (
                          <span className="label-xs whitespace-nowrap text-accent">{t("grammar.list.done")}</span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-[16px] text-neutral-600">{u.topic}</div>
                    </>
                  );
                  if (locked) {
                    return (
                      <button
                        key={u.slug}
                        onClick={() => setShowPurchase(true)}
                        className="divider-b block w-full px-4 py-3 text-left opacity-50 hover:opacity-70"
                      >
                        {body}
                      </button>
                    );
                  }
                  return u.available ? (
                    <Link
                      key={u.slug}
                      href={`/modules/english-grammar-in-use/${u.slug}`}
                      className="divider-b block px-4 py-3 hover:bg-surface"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div key={u.slug} className="divider-b px-4 py-3 opacity-50">
                      {body}
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>
      {showPurchase && <PurchaseModal onClose={() => setShowPurchase(false)} />}
    </div>
  );
}
