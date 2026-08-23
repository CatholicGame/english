"use client";

import { useState } from "react";
import { StarPicker } from "./StarPicker";
import { ChatInput } from "./ChatInput";
import { useUiLang } from "@/lib/i18n";

export interface MyReview {
  rating: number;
  comment?: string;
  name?: string;
}

interface Props {
  /** The account's existing review, if any — pre-fills the form and switches
   * the submit button to "Cập nhật" instead of "Gửi", since submitting again
   * edits the same review rather than creating a duplicate (one per account,
   * enforced server-side in reviews-db.ts). */
  initial: MyReview | null;
  defaultName?: string;
  onSubmitted: (review: MyReview) => void;
}

export function ReviewForm({ initial, defaultName, onSubmitted }: Props) {
  const { t } = useUiLang();
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [name, setName] = useState(initial?.name ?? defaultName ?? "");
  const [comment, setComment] = useState(initial?.comment ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    if (!rating || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, name }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Gửi thất bại");
      onSubmitted({ rating, comment: comment.trim() || undefined, name: name.trim() || undefined });
      setDone(true);
    } catch {
      setError(t("reviews.submitFailed"));
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <p className="text-[18px] font-extrabold">{t("reviews.thanks")}</p>
        <button type="button" className="btn btn-ghost mt-2 text-[16px]" onClick={() => setDone(false)}>
          {t("reviews.editAgain")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <StarPicker value={rating} onChange={setRating} />
      <input
        className="input w-full max-w-[320px] text-center"
        placeholder={t("reviews.namePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={60}
      />
      <div className="flex w-full max-w-[320px] items-end gap-2">
        <ChatInput
          value={comment}
          onChange={setComment}
          onSend={submit}
          disabled={submitting || !rating}
          placeholder={t("reviews.commentPlaceholder")}
        />
      </div>
      {error && <p className="text-[16px] text-accent-700">{error}</p>}
      <button
        type="button"
        className="btn btn-primary w-full max-w-[320px] disabled:opacity-40"
        disabled={!rating || submitting}
        onClick={submit}
      >
        {submitting ? t("reviews.sending") : initial ? t("reviews.update") : t("reviews.submit")}
      </button>
    </div>
  );
}
