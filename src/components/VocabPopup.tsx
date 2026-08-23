"use client";

import { useEffect, useState } from "react";
import { normalizeWord, type VocabEntry } from "@/lib/dictionary-store";
import { useDictionaryStore } from "@/lib/use-dictionary-store";
import { normalizeText, type TranslationEntry } from "@/lib/translation-store";
import { useTranslationStore } from "@/lib/use-translation-store";
import { VocabEntryDetail } from "./VocabEntryDetail";
import { TranslationDetail } from "./TranslationDetail";
import { Modal } from "./Modal";

interface Props {
  word: string;
  context?: string;
  onClose: () => void;
}

type Result =
  | { type: "vocab"; data: VocabEntry }
  | { type: "translation"; data: TranslationEntry };

function hasSenses(entry: VocabEntry): boolean {
  return Boolean(entry.senses && entry.senses.length > 0);
}

export function VocabPopup({ word, context, onClose }: Props) {
  const { getEntry: getVocabEntry, saveEntry: saveVocabEntry } = useDictionaryStore();
  const { getEntry: getTranslationEntry, saveEntry: saveTranslationEntry, deleteEntry: deleteTranslationEntry } = useTranslationStore();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  const vocabKey = normalizeWord(word);
  const translationKey = normalizeText(word);

  useEffect(() => {
    let cancelled = false;

    const cachedVocab = getVocabEntry(vocabKey);
    if (cachedVocab) {
      setResult({ type: "vocab", data: cachedVocab });
      setLoading(false);
      return;
    }
    const cachedTranslation = getTranslationEntry(translationKey);
    if (cachedTranslation) {
      setResult({ type: "translation", data: cachedTranslation });
      setLoading(false);
      return;
    }

    if (context) {
      // AI classifies the selection itself: vocabulary (dictionary-style) vs.
      // an ordinary sentence/passage (just needs translating).
      fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "text_lookup", payload: { word, context } }),
      })
        .then(r => r.json())
        .then(j => {
          if (cancelled) return;
          if (j.ok && j.data?.type === "translation") {
            const data: TranslationEntry = { text: j.data.text || word, translation: j.data.translation ?? "", createdAt: 0, updatedAt: 0 };
            setResult({ type: "translation", data });
          } else {
            const entry: VocabEntry = j.ok && j.data?.type === "vocab" ? j.data : { word };
            setResult({ type: "vocab", data: entry });
            if (hasSenses(entry)) saveVocabEntry(vocabKey, { ...entry, context });
          }
          setLoading(false);
        })
        .catch(() => { if (!cancelled) { setResult({ type: "vocab", data: { word } }); setLoading(false); } });
    } else {
      // Fallback to free dictionary API (no AI context available) — always vocabulary.
      fetch(`/api/dictionary?word=${encodeURIComponent(word)}`)
        .then(r => r.json())
        .then(d => {
          if (cancelled) return;
          const entry: VocabEntry = d.found
            ? {
                word,
                category: "word",
                ipa: d.phonetic,
                senses: [{ pos: d.partOfSpeech, en: d.definition, example: d.example ? { en: d.example, vi: "" } : undefined }],
              }
            : { word };
          setResult({ type: "vocab", data: entry });
          setLoading(false);
          if (hasSenses(entry)) saveVocabEntry(vocabKey, entry);
        })
        .catch(() => { if (!cancelled) { setResult({ type: "vocab", data: { word } }); setLoading(false); } });
    }
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, context]);

  const savedTranslation = result?.type === "translation" ? getTranslationEntry(translationKey) : null;

  return (
    <Modal onClose={onClose}>
      {loading || !result ? (
        <p className="text-[16px] text-neutral-600 animate-pulse">Đang tra &quot;{word}&quot;...</p>
      ) : result.type === "translation" ? (
        <TranslationDetail
          text={result.data.text}
          translation={result.data.translation}
          saved={Boolean(savedTranslation)}
          onSave={() => saveTranslationEntry(translationKey, { text: result.data.text, translation: result.data.translation })}
          onDelete={() => deleteTranslationEntry(translationKey)}
        />
      ) : (
        <VocabEntryDetail data={result.data} fallbackWord={word} />
      )}
    </Modal>
  );
}
