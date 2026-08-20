"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getGrammarUnit,
  type AiPracticeStep,
  type FillMcStep,
  type RuleStep,
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

function ContinueButton({ onClick, label = "Tiếp tục" }: { onClick: () => void; label?: string }) {
  return (
    <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={onClick}>
      {label}
    </button>
  );
}

// ---------- Rule (explanation) ----------

function RuleStepView({ step, onNext }: { step: RuleStep; onNext: (score?: Score) => void }) {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="flex flex-col gap-5">
        {step.blocks.map((b, i) => (
          <div key={i} className="border-l-2 pl-3" style={{ borderColor: "var(--color-accent)" }}>
            {(b.label || b.heading) && (
              <div className="mb-1.5 flex items-baseline gap-2">
                {b.label && <span className="label-xs flex-none text-accent">{b.label}</span>}
                {b.heading && <span className="text-[14px] font-extrabold">{b.heading}</span>}
              </div>
            )}
            <p className="text-[13.5px] leading-relaxed text-neutral-700">{b.body}</p>
            {b.examples.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {b.examples.map((ex, j) => (
                  <li key={j} className="border-l-2 border-neutral-300 pl-2.5 text-[13.5px] italic">
                    {ex.en}
                    {ex.note && <span className="ml-1.5 not-italic text-neutral-500">({ex.note})</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
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

// ---------- Type-in fill ----------

function TypeFillStepView({ step, onNext }: { step: TypeFillStep; onNext: (score?: Score) => void }) {
  const [inputs, setInputs] = useState<string[]>(() => step.items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const correctCount = inputs.filter((v, i) => norm(v) === norm(step.items[i].answer)).length;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-3 text-[13px] text-neutral-700">{step.instructions}</div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {step.items.map((it, i) => {
          const ok = checked && norm(inputs[i]) === norm(it.answer);
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
  ai_practice: "Luyện AI",
};

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const unit = useMemo(() => getGrammarUnit(slug), [slug]);

  const [stepIndex, setStepIndex] = useState(0);
  const [tally, setTally] = useState<Score>({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

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
    const nextTally = score ? { correct: tally.correct + score.correct, total: tally.total + score.total } : tally;
    setTally(nextTally);
    if (stepIndex + 1 >= steps.length) {
      grade(unit!.slug, true);
      setFinished(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function restart() {
    setStepIndex(0);
    setTally({ correct: 0, total: 0 });
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
            <span className="text-[11px] tabular-nums text-neutral-600">
              {stepIndex + 1}/{steps.length}
            </span>
          </div>
        </>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        {step.kind === "rule" && <RuleStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "fill_mc" && <FillMcStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "type_fill" && <TypeFillStepView key={stepIndex} step={step} onNext={handleNext} />}
        {step.kind === "ai_practice" && (
          <AiPracticeStepView key={stepIndex} step={step} unitTitle={unit.title} itemKey={unit.slug} onNext={handleNext} />
        )}
      </div>
    </ActionBarScreen>
  );
}
