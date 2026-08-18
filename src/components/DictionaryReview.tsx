"use client";

import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { VocabEntryDetail, CategoryBadge } from "./VocabEntryDetail";
import { addGlobalXP } from "@/lib/global-score";
import { shuffle } from "@/lib/utils";
import type { DictionaryData } from "@/lib/dictionary-store";

const SESSION_LENGTH = 20;
const XP_OK = 10;
const XP_MISS = 2;

interface Props {
  entries: DictionaryData;
  dueKeys: string[];
  onReview: (key: string, ok: boolean) => void;
  onClose: () => void;
}

export function DictionaryReview({ entries, dueKeys, onReview, onClose }: Props) {
  const [queue] = useState(() => shuffle(dueKeys).slice(0, SESSION_LENGTH));
  // An entry can vanish mid-session (deleted, or a Drive merge dropped it) —
  // deriving the live queue from current `entries` on every render means a
  // removed item is simply skipped, no separate "detect and advance" effect.
  const liveQueue = useMemo(() => queue.filter((k) => entries[k]), [queue, entries]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const key = liveQueue[index];
  const entry = key ? entries[key] : null;
  const done = index >= liveQueue.length;

  const handleGrade = (ok: boolean) => {
    onReview(key, ok);
    addGlobalXP(ok ? XP_OK : XP_MISS);
    setXpEarned((x) => x + (ok ? XP_OK : XP_MISS));
    if (ok) setCorrect((c) => c + 1);
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  const progressLabel = useMemo(() => `${Math.min(index + 1, liveQueue.length)}/${liveQueue.length}`, [index, liveQueue.length]);

  if (liveQueue.length === 0) {
    return (
      <Modal onClose={onClose}>
        <h2 className="text-[18px] font-extrabold">Ôn tập từ điển</h2>
        <p className="mt-2 text-[13px] text-neutral-600">Không có từ nào đến hạn ôn tập ngay bây giờ — quay lại sau nhé!</p>
      </Modal>
    );
  }

  if (done) {
    return (
      <Modal onClose={onClose}>
        <h2 className="text-[18px] font-extrabold">Xong! 🎉</h2>
        <p className="mt-2 text-[14px]">
          Đã ôn {liveQueue.length} từ, nhớ đúng {correct}/{liveQueue.length}.
        </p>
        <p className="mt-1 text-[14px] font-extrabold text-accent">+{xpEarned} XP</p>
        <button type="button" className="btn btn-primary mt-4 w-full" onClick={onClose}>
          Đóng
        </button>
      </Modal>
    );
  }

  if (!entry) return null;

  return (
    <Modal onClose={onClose}>
      <div className="mb-3 flex items-center justify-between">
        <span className="label-xs text-neutral-500">{progressLabel}</span>
        <span className="label-xs text-neutral-500">Nhớ đúng {correct}</span>
      </div>

      {!revealed ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <h2 className="text-[26px] font-extrabold">{entry.word}</h2>
            <CategoryBadge category={entry.category} />
          </div>
          {entry.ipa && <span className="text-[13px] text-neutral-600">{entry.ipa}</span>}
          <button type="button" className="btn btn-primary mt-2 px-6" onClick={() => setRevealed(true)}>
            Xem đáp án
          </button>
        </div>
      ) : (
        <>
          <VocabEntryDetail data={entry} fallbackWord={entry.word} />
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              className="flex-1 border py-2.5 text-[13px] font-extrabold text-red-600"
              style={{ borderColor: "var(--color-divider)" }}
              onClick={() => handleGrade(false)}
            >
              😕 Chưa nhớ
            </button>
            <button
              type="button"
              className="btn btn-primary flex-1 py-2.5 text-[13px]"
              onClick={() => handleGrade(true)}
            >
              😊 Nhớ rồi
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
