"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { reviewStats, type PublicReview } from "@/lib/reviews-shared";
import { markAskedToReview } from "@/lib/review-prompt";
import { Stars } from "@/components/Stars";
import { ReviewForm, type MyReview } from "@/components/ReviewForm";
import { useUiLang } from "@/lib/i18n";

const RATING_ROWS = [5, 4, 3, 2, 1] as const;

export default function ReviewsPage() {
  const { user } = useAuth();
  const { lang, t } = useUiLang();
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);
  const [myReview, setMyReview] = useState<MyReview | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((j) => {
        if (!j.ok) throw new Error(j.error);
        setReviews(j.reviews);
        setMyReview(j.myReview);
      })
      .catch(() => setError(true));
  }, []);

  const stats = useMemo(() => reviewStats(reviews ?? []), [reviews]);

  function handleSubmitted(review: MyReview) {
    markAskedToReview();
    setMyReview(review);
    // Optimistic local update — no realtime subscription (this app has no
    // client-side Firestore access, everything goes through /api/*), so the
    // list only reflects other people's reviews as of the last page load.
    // "__mine__" is a local-only sentinel id, replaced (not duplicated) on
    // every resubmit.
    setReviews((prev) => {
      const now = Date.now();
      const withoutMine = (prev ?? []).filter((r) => r.id !== "__mine__");
      return [{ id: "__mine__", ...review, createdAt: now, updatedAt: now }, ...withoutMine];
    });
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[1080px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
      <div className="divider-b px-4 py-6">
        <h1 className="text-[24px]">{t("reviews.title")}</h1>
      </div>

      {error && <p className="px-4 py-6 text-[15px] text-accent-700">{t("reviews.loadError")}</p>}

      {!error && reviews === null && <p className="px-4 py-6 text-[15px] text-neutral-500">{t("reviews.loading")}</p>}

      {reviews !== null && (
        <>
          <div className="divider-b flex gap-6 px-4 py-5">
            <div className="flex-none text-center">
              <div className="text-[40px] font-extrabold leading-none">{stats.average.toFixed(1)}</div>
              <Stars value={stats.average} size={16} starLabel={t("reviews.star.aria")} />
              <div className="mt-1 text-[14px] text-neutral-600">{t("reviews.count", { n: stats.count })}</div>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1">
              {RATING_ROWS.map((n) => {
                const count = stats.distribution[n];
                const pct = stats.count ? (count / stats.count) * 100 : 0;
                return (
                  <div key={n} className="flex items-center gap-2 text-[14px]">
                    <span className="w-5 flex-none text-neutral-600">{n}★</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--color-divider)" }}>
                      <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: "var(--color-accent)" }} />
                    </span>
                    <span className="w-6 flex-none text-right text-neutral-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="divider-b px-4 py-6">
            <ReviewForm initial={myReview} defaultName={user?.name} onSubmitted={handleSubmitted} />
          </div>

          <div className="flex-1 px-4 py-4">
            <h2 className="label-xs mb-3">{t("reviews.all")}</h2>
            {reviews.length === 0 && <p className="text-[15px] text-neutral-500">{t("reviews.empty")}</p>}
            <div className="flex flex-col gap-3">
              {reviews.map((r) => (
                <div key={r.id} className="border-b pb-3" style={{ borderColor: "var(--color-divider)" }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[15px] font-extrabold">{r.name || t("reviews.anonymous")}</span>
                    <span className="text-[14px] text-neutral-500">
                      {new Date(r.updatedAt).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN")}
                    </span>
                  </div>
                  <Stars value={r.rating} size={14} starLabel={t("reviews.star.aria")} />
                  {r.comment && <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed">{r.comment}</p>}
                  {r.reply && (
                    <div className="mt-2 border-l-2 pl-2.5" style={{ borderColor: "var(--color-accent)" }}>
                      <span className="label-xs text-accent">{t("reviews.replyFrom")}</span>
                      <p className="mt-0.5 whitespace-pre-wrap text-[15px] leading-relaxed">{r.reply.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
