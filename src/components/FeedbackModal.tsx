"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { ChatInput } from "./ChatInput";
import type { FeedbackContext } from "@/lib/feedback-db";

const STARS = [1, 2, 3, 4, 5];

interface Props {
  context: FeedbackContext;
  onClose: () => void;
  /** Called once the feedback is successfully submitted (before the "thanks"
   * screen shows) — lets a caller (e.g. the proactive prompt) remember this
   * account has already been asked, without knowing anything about the API. */
  onSubmitted?: () => void;
}

export function FeedbackModal({ context, onClose, onSubmitted }: Props) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    if (!rating || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, message, context }),
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Gửi thất bại");
      onSubmitted?.();
      setDone(true);
    } catch {
      setError("Gửi phản hồi thất bại, thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Modal onClose={onClose}>
        <h2 className="text-[17px] font-extrabold">Cảm ơn bạn! 🙏</h2>
        <p className="mt-2 text-[13px] text-neutral-600">Góp ý của bạn giúp app ngày càng tốt hơn.</p>
        <button type="button" className="btn btn-primary mt-4 w-full" onClick={onClose}>
          Đóng
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[17px] font-extrabold">Bạn thấy app thế nào?</h2>
      <p className="mt-1 text-[13px] text-neutral-600">Đánh giá và góp ý giúp mình cải thiện app tốt hơn mỗi ngày.</p>

      <div className="mt-4 flex justify-center gap-1.5 text-[32px] leading-none">
        {STARS.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`${s} sao`}
            onClick={() => setRating(s)}
            style={{ color: s <= rating ? "var(--color-accent)" : "var(--color-divider)" }}
          >
            ★
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-end gap-2">
        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={submit}
          disabled={submitting || !rating}
          placeholder="Góp ý thêm (không bắt buộc)..."
        />
      </div>

      {error && <p className="mt-2 text-[13px] text-accent-700">{error}</p>}

      <button
        type="button"
        className="btn btn-primary mt-4 w-full disabled:opacity-40"
        disabled={!rating || submitting}
        onClick={submit}
      >
        {submitting ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </Modal>
  );
}
