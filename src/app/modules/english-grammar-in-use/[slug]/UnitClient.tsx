"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getGrammarUnit,
  type AiPracticeStep,
  type FillMcStep,
  type JudgeCorrectStep,
  type MatchPairsStep,
  type RuleBlock,
  type RuleStep,
  type RuleTable,
  type TypeFillStep,
  type GrammarUnitStep,
} from "@/data/english-grammar-in-use";
import { useProgress } from "@/lib/progress-context";
import { norm } from "@/lib/utils";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import { addGlobalXP } from "@/lib/global-score";
import { AiFeedback } from "@/components/AiFeedback";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isGrammarUnitLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";
import { ActionBarScreen, useActionBar } from "@/components/ActionBar";

const MODULE_KEY = "english-grammar-in-use";

const QUIZ_LETTERS_LOWER = "abcdefghij".split("");

interface Score {
  correct: number;
  total: number;
}

function autoGrow(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

async function callAi(intent: string, payload: Record<string, unknown>) {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent, payload: { ...payload, aiLang: currentAiLang() } }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || "AI failed");
  return j.data;
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-[18px] w-[18px]">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function ContinueButton({ onClick, label = "Tiếp tục" }: { onClick: () => void; label?: string }) {
  return (
    <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={onClick}>
      {label}
    </button>
  );
}

// ---------- Rule (explanation) ----------

// Minimal inline markup for rule content: **bold** for the grammar form being
// taught (matching how the book bolds it inside example sentences and the
// conjugation table), *italic* for a spoken-emphasis or terminology word
// (e.g. *now*, *not*, the *present continuous*). Not general markdown —
// just these two patterns, applied to body/example/table text.
function renderRich(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function RuleTableView({ table }: { table: RuleTable }) {
  return (
    <div
      className="mt-2.5 overflow-hidden overflow-x-auto rounded-md border"
      style={{ borderColor: "var(--color-accent-300)", background: "var(--color-accent-100)" }}
    >
      <table className="w-full border-collapse text-[13px]">
        {table.headers && (
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  className="border-b px-2.5 py-1.5 text-left font-extrabold text-accent-800"
                  style={{ borderColor: "var(--color-accent-300)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-2.5 py-1.5 leading-relaxed ${i < table.rows.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "var(--color-accent-300)" }}
                >
                  {renderRich(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuleBlockView({ block: b }: { block: RuleBlock }) {
  return (
    <div className="overflow-hidden rounded-lg bg-surface">
      {(b.label || b.heading) && (
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "var(--color-accent)" }}>
          {b.label && (
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/25 text-[12px] font-extrabold text-white">
              {b.label}
            </span>
          )}
          {b.heading && <span className="text-[14px] leading-snug font-extrabold text-white">{b.heading}</span>}
        </div>
      )}
      <div className="p-3">
        {b.intro && <p className="mb-1.5 text-[12.5px] font-bold text-neutral-500">{b.intro}</p>}
        {b.body.split("\n\n").map((para, k) => (
          <p key={k} className={`text-[13.5px] leading-relaxed text-neutral-700 ${k > 0 ? "mt-2" : ""}`}>
            {renderRich(para)}
          </p>
        ))}
        {b.table && <RuleTableView table={b.table} />}
        {b.wordList && b.wordList.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {b.wordList.map((w, k) => (
              <span
                key={k}
                className="rounded-full border px-2.5 py-1 text-[12px]"
                style={{ borderColor: "var(--color-divider)", color: "var(--color-neutral-700)" }}
              >
                {w}
              </span>
            ))}
          </div>
        )}
        {b.examples.length > 0 && (
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {b.examples.map((ex, j) => (
              <li key={j} className="border-l-2 border-neutral-300 pl-2.5 text-[13.5px]">
                {renderRich(ex.en)}
                {ex.note && <span className="ml-1.5 text-neutral-500">({renderRich(ex.note)})</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RuleStepView({ step, onNext }: { step: RuleStep; onNext: (score?: Score) => void }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="flex flex-col gap-4">
        {step.blocks.map((b, i) => (
          <RuleBlockView key={i} block={b} />
        ))}
      </div>
      <ContinueButton onClick={() => onNext()} label="Sang phần thực hành" />
    </div>
  );
}

// ---------- Multiple choice fill-in ----------

function FillMcStepView({ step, onNext }: { step: FillMcStep; onNext: (score?: Score) => void }) {
  const [picked, setPicked] = useState<(string | null)[]>(() => step.items.map(() => null));
  const [checked, setChecked] = useState(false);
  const allPicked = picked.every((p) => p !== null);
  const correctCount = picked.filter((p, i) => p === step.items[i].answer).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      {step.passage && (
        <div className="mb-4 bg-surface p-3 text-[13px] leading-relaxed whitespace-pre-line">{step.passage}</div>
      )}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {step.items.map((it, i) => (
          <div key={i} className="mb-4">
            <div className="mb-2 text-[14px] leading-relaxed">
              {it.before} <span className="font-extrabold text-accent-700">{picked[i] ?? "____"}</span> {it.after}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {it.options.map((o) => {
                const isAnswer = o === it.answer;
                const isPicked = picked[i] === o;
                let style: React.CSSProperties = {
                  borderColor: "var(--color-divider)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                };
                if (checked) {
                  if (isAnswer) style = { borderColor: "var(--color-text)", background: "var(--color-text)", color: "var(--color-bg)" };
                  else if (isPicked) style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                  else style = { borderColor: "var(--color-divider)", background: "var(--color-bg)", color: "var(--color-neutral-600)" };
                } else if (isPicked) {
                  style = { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
                }
                return (
                  <button
                    key={o}
                    disabled={checked}
                    style={style}
                    className="border px-3 py-1.5 text-[13px] font-bold"
                    onClick={() => {
                      const next = [...picked];
                      next[i] = o;
                      setPicked(next);
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Kết quả</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} đúng
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button
          className="btn btn-primary btn-block mt-auto px-4 py-3 disabled:opacity-40"
          disabled={!allPicked}
          onClick={() => setChecked(true)}
        >
          Kiểm tra
        </button>
      )}
    </div>
  );
}

// ---------- Match pairs (two columns, tap to connect) ----------

interface PairSel {
  side: "l" | "r";
  index: number;
}

function MatchPairsStepView({ step, onNext }: { step: MatchPairsStep; onNext: (score?: Score) => void }) {
  const [sel, setSel] = useState<PairSel | null>(null);
  const [doneLeft, setDoneLeft] = useState<Record<number, number>>({});
  const [wrong, setWrong] = useState<{ l: number; r: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const matchedRight = new Set(Object.values(doneLeft));
  const allDone = Object.keys(doneLeft).length === step.left.length;

  function pick(side: "l" | "r", index: number) {
    if (wrong) return;
    if (side === "l" && doneLeft[index] !== undefined) return;
    if (side === "r" && matchedRight.has(index)) return;
    if (!sel || sel.side === side) {
      setSel({ side, index });
      return;
    }
    const leftIndex = side === "l" ? index : sel.index;
    const rightIndex = side === "r" ? index : sel.index;
    const correct = step.answers[leftIndex] === step.right[rightIndex];
    setSel(null);
    if (correct) {
      setDoneLeft((prev) => ({ ...prev, [leftIndex]: rightIndex }));
    } else {
      setMistakes((m) => m + 1);
      setWrong({ l: leftIndex, r: rightIndex });
      setTimeout(() => setWrong(null), 650);
    }
  }

  function styleFor(side: "l" | "r", index: number) {
    const isDone = side === "l" ? doneLeft[index] !== undefined : matchedRight.has(index);
    const isWrong = wrong && (side === "l" ? wrong.l === index : wrong.r === index);
    const isSel = sel?.side === side && sel.index === index;
    if (isDone) return { borderColor: "var(--color-text)", background: "var(--color-text)", color: "var(--color-bg)" };
    if (isWrong) return { borderColor: "var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" };
    if (isSel) return { borderColor: "var(--color-accent)", background: "var(--color-accent)", color: "var(--color-bg)" };
    return { borderColor: "var(--color-divider)", background: "var(--color-surface)", color: "var(--color-text)" };
  }

  return (
    <div className="flex flex-1 flex-col p-4 lg:mx-auto lg:w-full lg:max-w-[640px]">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-1.5">
          {step.left.map((text, i) => (
            <button
              key={i}
              disabled={doneLeft[i] !== undefined}
              style={styleFor("l", i)}
              className="border px-2.5 py-2 text-left text-[12.5px] leading-snug"
              onClick={() => pick("l", i)}
            >
              <span className="mr-1.5 opacity-60">{i + 1}</span>
              {text}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {step.right.map((text, i) => (
            <button
              key={i}
              disabled={matchedRight.has(i)}
              style={styleFor("r", i)}
              className="border px-2.5 py-2 text-left text-[12.5px] leading-snug"
              onClick={() => pick("r", i)}
            >
              <span className="mr-1.5 opacity-60">{QUIZ_LETTERS_LOWER[i]}</span>
              {text}
            </button>
          ))}
        </div>
      </div>
      {allDone && (
        <div className="mt-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Kết quả</span>
          <span className="font-extrabold">
            {step.left.length}/{step.left.length + mistakes} lần chạm đúng
          </span>
        </div>
      )}
      {allDone && (
        <ContinueButton onClick={() => onNext({ correct: step.left.length, total: step.left.length + mistakes })} />
      )}
    </div>
  );
}

// ---------- Type-in fill ----------

/** The book prints one answer, but a written question or clause has several
 * equally correct forms (contracted vs full, "anybody" vs "anyone"), so an item
 * can carry extra accepted wordings. norm() strips apostrophes and case, so
 * "I'm"/"I am" really are distinct strings and must both be listed. */
function matchesAnswer(input: string, item: { answer: string; accept?: string[] }): boolean {
  const v = norm(input);
  if (!v) return false;
  return v === norm(item.answer) || (item.accept ?? []).some((a) => norm(a) === v);
}

function TypeFillStepView({ step, onNext }: { step: TypeFillStep; onNext: (score?: Score) => void }) {
  const [inputs, setInputs] = useState<string[]>(() => step.items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const correctCount = inputs.filter((v, i) => matchesAnswer(v, step.items[i])).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      {step.passage && (
        <div className="mb-4 bg-surface p-3 text-[13px] leading-relaxed whitespace-pre-line">{step.passage}</div>
      )}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {step.items.map((it, i) => {
          const ok = checked && matchesAnswer(inputs[i], it);
          const bad = checked && !ok;
          return (
            <div key={i} className="mb-3">
              <div className="mb-1 text-[14px] leading-relaxed">{it.prompt}</div>
              <input
                className="input"
                style={{ borderColor: bad ? "var(--color-accent)" : ok ? "var(--color-text)" : undefined }}
                disabled={checked}
                value={inputs[i]}
                onChange={(e) => {
                  const next = [...inputs];
                  next[i] = e.target.value;
                  setInputs(next);
                }}
                placeholder="Điền câu trả lời"
              />
              {bad && (
                <div className="mt-1 text-[12px] text-accent-700">
                  Đáp án: <span className="font-extrabold">{it.answer}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {checked && (
        <div className="mb-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Kết quả</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} đúng
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setChecked(true)}>
          Kiểm tra
        </button>
      )}
    </div>
  );
}

// ---------- Judge + correct ----------

/** "Are the underlined verbs OK? Correct them where necessary." Two decisions
 * per item: is it right, and if not what should it be. Scored as one point,
 * awarded only when both halves are right, so guessing "sai" and typing
 * anything doesn't earn credit. */
function JudgeCorrectStepView({ step, onNext }: { step: JudgeCorrectStep; onNext: (score?: Score) => void }) {
  const [verdicts, setVerdicts] = useState<(boolean | null)[]>(() => step.items.map(() => null));
  const [fixes, setFixes] = useState<string[]>(() => step.items.map(() => ""));
  const [checked, setChecked] = useState(false);

  function isRight(i: number): boolean {
    const it = step.items[i];
    if (verdicts[i] !== !it.ok) return false; // verdict[i] === true means learner said "needs fixing"
    if (it.ok) return true;
    return matchesAnswer(fixes[i], { answer: it.correction ?? "", accept: it.accept });
  }

  const correctCount = step.items.filter((_, i) => isRight(i)).length;
  const allAnswered = verdicts.every((v, i) => v !== null && (v === false || fixes[i].trim() !== ""));

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      <div className="flex flex-col gap-4">
        {step.items.map((it, i) => {
          const parts = it.sentence.split(it.underlined);
          const ok = checked && isRight(i);
          const bad = checked && !ok;
          return (
            <div key={i} className="border-l-2 pl-3" style={{ borderColor: bad ? "var(--color-accent)" : "var(--color-divider)" }}>
              <div className="text-[14px] leading-relaxed">
                {parts[0]}
                <span className="font-extrabold underline decoration-2 underline-offset-2">{it.underlined}</span>
                {parts.slice(1).join(it.underlined)}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  { label: "Đúng rồi", value: false },
                  { label: "Cần sửa", value: true },
                ].map((opt) => {
                  const picked = verdicts[i] === opt.value;
                  return (
                    <button
                      key={opt.label}
                      disabled={checked}
                      className="rounded-full border px-3 py-1 text-[12px] font-bold"
                      style={{
                        borderColor: picked ? "var(--color-accent)" : "var(--color-divider)",
                        background: picked ? "var(--color-accent-100)" : "var(--color-surface)",
                        color: picked ? "var(--color-accent-800)" : "var(--color-text)",
                      }}
                      onClick={() => {
                        const next = [...verdicts];
                        next[i] = opt.value;
                        setVerdicts(next);
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {verdicts[i] === true && (
                <input
                  className="input mt-1.5"
                  disabled={checked}
                  value={fixes[i]}
                  onChange={(e) => {
                    const next = [...fixes];
                    next[i] = e.target.value;
                    setFixes(next);
                  }}
                  placeholder={`Sửa "${it.underlined}" thành...`}
                />
              )}
              {bad && (
                <div className="mt-1 text-[12px] text-accent-700">
                  {it.ok ? (
                    <>
                      Câu này <span className="font-extrabold">đúng rồi</span>.
                    </>
                  ) : (
                    <>
                      Đáp án: <span className="font-extrabold">{it.correction}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {checked && (
        <div className="mt-4 mb-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
          <span className="label-xs mb-0.5 block">Kết quả</span>
          <span className="font-extrabold">
            {correctCount}/{step.items.length} đúng
          </span>
        </div>
      )}
      {checked ? (
        <ContinueButton onClick={() => onNext({ correct: correctCount, total: step.items.length })} />
      ) : (
        <button
          className="btn btn-primary btn-block mt-auto px-4 py-3 disabled:opacity-40"
          disabled={!allAnswered}
          onClick={() => setChecked(true)}
        >
          Kiểm tra
        </button>
      )}
    </div>
  );
}

// ---------- AI practice ----------

function AiPracticeStepView({
  step,
  unitTitle,
  itemKey,
  onNext,
}: {
  step: AiPracticeStep;
  unitTitle: string;
  itemKey: string;
  onNext: (score?: Score) => void;
}) {
  const { appendMessages, getConvos } = useAiConvoStore(MODULE_KEY);
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [cid, setCid] = useState<string | null>(() => {
    const convos = getConvos(itemKey);
    return convos.length ? convos[convos.length - 1].id : null;
  });

  async function submit() {
    if (!sentence.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const d = await callAi("grammar_sentence_check", {
        title: unitTitle,
        ruleSummary: step.ruleSummary,
        sentence: sentence.trim(),
      });
      setResult(d);
      const xp = d.correct ? 10 : 2;
      setXpEarned(xp);
      addGlobalXP(xp);
      const id = appendMessages(itemKey, unitTitle, cid, "grammar_sentence_check", [
        { role: "user", content: sentence.trim(), timestamp: Date.now() },
        { role: "assistant", content: JSON.stringify(d), timestamp: Date.now() },
      ]);
      if (!cid) setCid(id);
    } catch (e: any) {
      setError(e.message || "AI failed");
    } finally {
      setLoading(false);
    }
  }

  const footerContent = result ? (
    <ContinueButton onClick={() => onNext()} label="Hoàn thành unit" />
  ) : (
    <button
      className="btn btn-primary btn-block px-4 py-3 disabled:opacity-40"
      disabled={!sentence.trim() || loading}
      onClick={submit}
    >
      {loading ? "Đang chấm..." : "Nộp câu cho AI"}
    </button>
  );
  useActionBar(footerContent);

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      <textarea
        className="input min-h-[90px] w-full resize-none"
        value={sentence}
        disabled={!!result}
        onChange={(e) => setSentence(e.target.value)}
        onInput={autoGrow}
        placeholder="Viết câu của bạn ở đây..."
      />
      {(loading || !!error || result != null) && (
        <div className="mt-3">
          <AiFeedback loading={loading} result={result} error={error} onRetry={submit} variant="sentence" />
        </div>
      )}
      {result != null && xpEarned != null && (
        <div className="mt-2 text-[13px] font-extrabold text-accent">+{xpEarned} XP</div>
      )}
    </div>
  );
}

// ---------- Wizard shell ----------

const STEP_KIND_LABELS: Record<GrammarUnitStep["kind"], string> = {
  rule: "Học",
  fill_mc: "Thực hành",
  type_fill: "Thực hành",
  judge_correct: "Thực hành",
  match_pairs: "Thực hành",
  ai_practice: "Luyện AI",
};

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => getGrammarUnit(slug), [slug]);

  const [stepIndex, setStepIndex] = useState(0);
  // Keyed by step index rather than accumulated, because the step menu lets a
  // learner jump back and redo an exercise: a running total would count that
  // step twice and push the final percentage past what they actually scored.
  const [scores, setScores] = useState<Record<number, Score>>({});
  const [finished, setFinished] = useState(false);
  const [showStepList, setShowStepList] = useState(false);

  const tally = Object.values(scores).reduce(
    (a, s) => ({ correct: a.correct + s.correct, total: a.total + s.total }),
    { correct: 0, total: 0 },
  );

  if (!unit) {
    return (
      <div className="p-4">
        <p className="text-[13px] text-neutral-600">Không tìm thấy unit này.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/english-grammar-in-use")}>
          Tất cả unit
        </button>
      </div>
    );
  }

  if (isGrammarUnitLocked(unit.unit, isUnlocked)) {
    return <ProPaywallNotice what={`Unit ${unit.unit}: ${unit.title}`} />;
  }

  const steps = unit.steps;
  const step = steps[stepIndex];

  function goBack() {
    if (stepIndex === 0) {
      router.push("/modules/english-grammar-in-use");
      return;
    }
    setStepIndex((i) => i - 1);
  }

  function handleNext(score?: Score) {
    const at = stepIndex;
    if (score) setScores((prev) => ({ ...prev, [at]: score }));
    if (stepIndex + 1 >= steps.length) {
      grade(unit!.slug, true);
      setFinished(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function restart() {
    setStepIndex(0);
    setScores({});
    setFinished(false);
  }

  if (finished) {
    const pct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 100;
    const sub = pct >= 90 ? "Xuất sắc." : pct >= 70 ? "Khá tốt." : "Nên xem lại quy tắc.";
    return (
      <div className="flex min-h-screen flex-col">
        <div className="divider-b px-4 pt-8 pb-6">
          <div className="label-xs text-accent">Đã hoàn thành unit</div>
          <div className="mt-2 text-[30px] leading-tight font-extrabold">{unit.title}</div>
          <div className="mt-3 text-[64px] leading-[0.95] font-extrabold tracking-tight">{pct}%</div>
          <div className="mt-2 text-[13px] text-neutral-600">
            {sub} {tally.correct}/{tally.total} câu đúng trong các bài thực hành.
          </div>
        </div>
        <div className="flex gap-[2px] p-4">
          <button
            className="btn btn-secondary flex-1 justify-center px-4 py-3"
            onClick={() => router.push("/modules/english-grammar-in-use")}
          >
            Tất cả unit
          </button>
          <button className="btn btn-primary flex-1 justify-center px-4 py-3" onClick={restart}>
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <ActionBarScreen
      header={
        <>
          <div className="divider-b flex items-center gap-3 px-4 py-3">
            <button onClick={goBack} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
              <BackIcon />
            </button>
            <div className="h-1.5 flex-1 bg-neutral-300">
              <div className="h-full bg-accent" style={{ width: `${(stepIndex / steps.length) * 100}%` }} />
            </div>
          </div>
          <div className="px-4 pt-3">
            <span className="label-xs block text-accent">
              Unit {unit.unit} · {unit.title} — {STEP_KIND_LABELS[step.kind]}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 pt-2">
            <button
              className="btn btn-ghost px-0 text-[11px]"
              onClick={() => router.push("/modules/english-grammar-in-use")}
            >
              Thoát
            </button>
            <button
              className="flex items-center gap-1 text-[11px] tabular-nums text-neutral-600 hover:text-accent"
              onClick={() => setShowStepList(true)}
              aria-label="Danh sách các phần trong unit"
            >
              <ListIcon />
              {stepIndex + 1}/{steps.length}
            </button>
          </div>
        </>
      }
    >
      {showStepList && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[1040px]">
            <div className="divider-b flex items-center justify-between px-4 py-3">
              <span className="text-[16px] font-extrabold">Các phần trong unit</span>
              <button className="btn btn-ghost" onClick={() => setShowStepList(false)}>
                Đóng
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {steps.map((s, i) => {
                const done = scores[i] !== undefined;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setStepIndex(i);
                      setShowStepList(false);
                    }}
                    className="divider-b flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface"
                    style={i === stepIndex ? { background: "var(--color-accent-100)" } : undefined}
                  >
                    <span className="label-xs w-6 flex-none text-neutral-600">{i + 1}</span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-extrabold">{s.title}</span>
                      <span className="label-xs mt-0.5 block text-neutral-600">{STEP_KIND_LABELS[s.kind]}</span>
                    </span>
                    {done && (
                      <span className="label-xs flex-none text-accent">
                        {scores[i].correct}/{scores[i].total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {step.kind === "rule" && <RuleStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "fill_mc" && <FillMcStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "type_fill" && <TypeFillStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "judge_correct" && <JudgeCorrectStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "match_pairs" && <MatchPairsStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "ai_practice" && (
          <AiPracticeStepView key={stepIndex} step={step} unitTitle={unit.title} itemKey={unit.slug} onNext={handleNext} />
        )}
      </div>
    </ActionBarScreen>
  );
}
