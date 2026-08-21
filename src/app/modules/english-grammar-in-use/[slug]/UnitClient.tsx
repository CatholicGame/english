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
  type RuleExamples,
  type RulePart,
  type RuleSituation,
  type RuleStep,
  type RuleTable,
  type TypeFillItem,
  type TypeFillStep,
  type WorkedExample,
  type GrammarUnitStep,
} from "@/data/english-grammar-in-use";
import { useProgress } from "@/lib/progress-context";
import { norm } from "@/lib/utils";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import { addGlobalXP } from "@/lib/global-score";
import { AiFeedback } from "@/components/AiFeedback";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { useUiLang, type TranslateFn } from "@/lib/i18n";
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

/** vi is the default (this module is authored Vietnamese-first); en is shown
 * only when the UI language is English, falling back to vi if a unit hasn't
 * been given an English pass yet. */
function loc(vi: string, en: string | undefined, lang: string): string {
  return lang === "en" ? en ?? vi : vi;
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

/** Vietnamese gloss under an English line, shown only on a Vietnamese UI. */
function ViLine({ text }: { text?: string }) {
  const { lang } = useUiLang();
  if (lang === "en" || !text) return null;
  return <span className="mt-0.5 block text-[12.5px] text-neutral-500 italic">{renderRich(text)}</span>;
}

function RuleTableView({ table }: { table: RuleTable }) {
  // The book's indented label-and-value list ("the main part: I'll call you
  // again later") is a list, not a box: borders around it read as a grid of
  // data and lose the "this is one idea broken in two" shape.
  if (table.variant === "list") {
    return (
      <div className="border-l-2 pl-3" style={{ borderColor: "var(--color-accent-300)" }}>
        {table.rows.map((row, i) => (
          <div key={i} className={`flex flex-wrap gap-x-3 text-[13.5px] leading-relaxed ${i > 0 ? "mt-1" : ""}`}>
            <span className="min-w-[110px] flex-none text-neutral-500">{renderRich(row[0])}</span>
            <span className="min-w-0 flex-1">{renderRich(row[1])}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      className="overflow-hidden overflow-x-auto rounded-md border"
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

/** The book's illustrated setup: the scene, then what the people in it say,
 * drawn as speech bubbles. Kept visually separate from the explanation, since
 * it is the thing being explained, not part of the explanation. */
function RuleSituationView({ part }: { part: RuleSituation }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)" }}>
      <p className="text-[13.5px] leading-relaxed text-neutral-700">
        {renderRich(part.text)}
        <ViLine text={part.vi} />
      </p>
      {part.quotes?.map((q, i) => (
        <div key={i} className="mt-2.5">
          {q.speaker && <span className="label-xs mb-0.5 block text-neutral-500">{q.speaker}</span>}
          <div
            className="relative inline-block rounded-xl border px-3 py-2 text-[13.5px] leading-relaxed"
            style={{ borderColor: "var(--color-accent-300)", background: "var(--color-accent-100)", color: "var(--color-accent-800)" }}
          >
            {renderRich(q.text)}
            <span
              className="absolute -bottom-[6px] left-5 h-[10px] w-[10px] rotate-45 border-r border-b"
              style={{ borderColor: "var(--color-accent-300)", background: "var(--color-accent-100)" }}
            />
          </div>
          <ViLine text={q.vi} />
        </div>
      ))}
    </div>
  );
}

function RuleExamplesView({ part }: { part: RuleExamples }) {
  const { lang } = useUiLang();
  const showVi = lang !== "en";
  return (
    <div>
      {part.heading && (
        <span className="label-xs mb-1 block text-accent">
          {part.heading}
          {showVi && part.headingVi && (
            <span className="ml-1.5 font-normal text-neutral-500 normal-case">({part.headingVi})</span>
          )}
        </span>
      )}
      <ul className="flex flex-col gap-1.5">
        {part.items.map((ex, j) => (
          <li key={j} className="border-l-2 border-neutral-300 pl-2.5 text-[13.5px]">
            <div>
              {renderRich(ex.en)}
              {ex.note && <span className="ml-1.5 text-neutral-500">({renderRich(ex.note)})</span>}
            </div>
            <ViLine text={ex.vi} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RulePartView({ part }: { part: RulePart }) {
  switch (part.kind) {
    case "situation":
      return <RuleSituationView part={part} />;
    case "text":
      return (
        <p className="text-[13.5px] leading-relaxed text-neutral-700">
          {renderRich(part.text)}
          <ViLine text={part.vi} />
        </p>
      );
    case "table":
      return <RuleTableView table={part.table} />;
    case "words":
      return (
        <div className="flex flex-wrap gap-1.5">
          {part.words.map((w, k) => (
            <span
              key={k}
              className="rounded-full border px-2.5 py-1 text-[12px]"
              style={{ borderColor: "var(--color-divider)", color: "var(--color-neutral-700)" }}
            >
              {w}
            </span>
          ))}
        </div>
      );
    case "examples":
      return <RuleExamplesView part={part} />;
  }
}

function RuleBlockView({ block: b }: { block: RuleBlock }) {
  const { lang } = useUiLang();
  const showVi = lang !== "en";

  return (
    <div className="overflow-hidden rounded-lg bg-surface">
      {(b.label || b.heading) && (
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "var(--color-accent)" }}>
          {b.label && (
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/25 text-[12px] font-extrabold text-white">
              {b.label}
            </span>
          )}
          {b.heading && (
            <span className="text-[14px] leading-snug font-extrabold text-white">{loc(b.heading, b.headingEn, lang)}</span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2.5 p-3">
        {b.intro && (
          <p className="text-[12.5px] font-bold text-neutral-500">
            {b.intro}
            {showVi && b.introVi && <span className="ml-1.5 font-normal">({b.introVi})</span>}
          </p>
        )}
        {b.parts.map((part, i) => (
          <RulePartView key={i} part={part} />
        ))}
      </div>
    </div>
  );
}

function RuleStepView({ step, onNext }: { step: RuleStep; onNext: (score?: Score) => void }) {
  const { t } = useUiLang();
  const inlineAction = usePinnedAction(
    <button className="btn btn-primary btn-block px-4 py-3" onClick={() => onNext()}>
      {t("grammar.toPractice")}
    </button>,
  );
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="flex flex-col gap-4">
        {step.blocks.map((b, i) => (
          <RuleBlockView key={i} block={b} />
        ))}
      </div>
      {inlineAction}
    </div>
  );
}

// ---------- Shared exercise chrome ----------

/** The book prints four separate things around a numbered exercise: its own
 * numbered title, the instruction line, an optional word box, and an optional
 * reading passage. Each gets its own visual treatment here, because a learner
 * scans for "what do I have to do" and "what do I choose from" separately.
 * They used to be concatenated into one `passage` string and rendered as a
 * single grey block, which is unreadable at a glance. */
type ChromeStep = {
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  passage?: string;
  passageEn?: string;
  wordBank?: string[];
};

function ExerciseHeader({ step, onPickWord }: { step: ChromeStep; onPickWord?: (word: string) => void }) {
  const { lang, t } = useUiLang();
  const passage = loc(step.passage ?? "", step.passageEn, lang);
  return (
    <div className="mb-4">
      <h2 className="text-[15px] leading-snug font-extrabold">{loc(step.title, step.titleEn, lang)}</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">
        {renderRich(loc(step.instructions, step.instructionsEn, lang))}
      </p>
      {passage && (
        <div
          className="mt-3 rounded-md border-l-[3px] bg-surface px-3 py-2.5 text-[13px] leading-relaxed"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <span className="label-xs mb-1 block text-neutral-500">{t("grammar.reading")}</span>
          {passage.split("\n").map((line, k) => (
            <p key={k} className={line ? "" : "h-2"}>
              {renderRich(line)}
            </p>
          ))}
        </div>
      )}
      {step.wordBank && step.wordBank.length > 0 && (
        <div
          className="mt-3 rounded-xl border-2 px-3 py-2.5"
          style={{ borderColor: "var(--color-accent-300)", background: "var(--color-accent-100)" }}
        >
          <span className="label-xs mb-1.5 block text-accent-800">{t("grammar.wordBank")}</span>
          <div className="flex flex-wrap gap-1.5">
            {step.wordBank.map((w) =>
              onPickWord ? (
                <button
                  key={w}
                  onClick={() => onPickWord(w)}
                  className="rounded-full border bg-surface px-2.5 py-1 text-[12.5px] font-bold"
                  style={{ borderColor: "var(--color-accent-300)" }}
                >
                  {w}
                </button>
              ) : (
                <span
                  key={w}
                  className="rounded-full border bg-surface px-2.5 py-1 text-[12.5px] font-bold"
                  style={{ borderColor: "var(--color-accent-300)" }}
                >
                  {w}
                </span>
              ),
            )}
          </div>
          {onPickWord && <p className="mt-1.5 text-[11px] text-neutral-500">{t("grammar.wordBankHint")}</p>}
        </div>
      )}
    </div>
  );
}

type ItemTone = "idle" | "correct" | "wrong" | "example";

const TONE_BADGE: Record<ItemTone, React.CSSProperties> = {
  idle: { background: "var(--color-accent-100)", color: "var(--color-accent-800)" },
  correct: { background: "var(--color-text)", color: "var(--color-bg)" },
  wrong: { background: "var(--color-accent)", color: "var(--color-bg)" },
  example: { background: "var(--color-neutral-300)", color: "var(--color-neutral-700)" },
};

/** One numbered row: the book's own item number in a badge, then the item's
 * content. The number is always shown, so any item can be cross-referenced
 * against the printed book. */
function ItemRow({ label, tone = "idle", children }: { label: string; tone?: ItemTone; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 py-1.5">
      <span
        className="mt-[3px] flex h-[22px] min-w-[22px] flex-none items-center justify-center rounded-full px-1 text-[11px] font-extrabold tabular-nums"
        style={TONE_BADGE[tone]}
      >
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** The sentence with its gap: an actual blank line while unanswered, the answer
 * written into the gap once it is known. Showing the completed sentence (rather
 * than only "Answer: has a break" underneath) is the point of a gap-fill: the
 * learner reads the finished sentence back. */
function PromptLine({ prompt, renderBlank }: { prompt: string; renderBlank?: (blank: number) => React.ReactNode }) {
  const parts = prompt.split("___");
  const gaps = parts.length - 1;
  return (
    <span className="text-[14px] leading-relaxed">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 &&
            (renderBlank?.(i - 1) ?? (
              <span
                className="mx-1 inline-block w-[72px] border-b-2 border-dashed text-center align-middle text-[10px] leading-[14px] font-extrabold text-accent"
                style={{ borderColor: "var(--color-accent-300)" }}
              >
                {gaps > 1 ? i : ""}
              </span>
            ))}
          {renderRich(part)}
        </span>
      ))}
    </span>
  );
}

function FilledAnswer({ text, tone }: { text: string; tone: "correct" | "wrong" | "example" }) {
  const style: React.CSSProperties =
    tone === "wrong"
      ? { background: "var(--color-accent-100)", color: "var(--color-accent-800)" }
      : { background: "var(--color-neutral-300)", color: "var(--color-text)" };
  return (
    <strong className="mx-0.5 rounded px-1 py-[1px] font-extrabold" style={style}>
      {text}
    </strong>
  );
}

/** What the learner actually typed or picked, shown only when it was wrong:
 * the completed sentence above already carries the right answer. */
function YourAnswer({ text, label }: { text: string | null; label?: number }) {
  const { t } = useUiLang();
  if (!text?.trim()) return null;
  return (
    <div className="mt-0.5 text-[12px] text-neutral-500">
      {label != null && <span className="mr-1 font-extrabold">{label}</span>}
      {t("grammar.yourAnswer")} <span className="line-through">{text}</span>
    </div>
  );
}

/** Groups consecutive items sharing the exact same `context` string, so a story
 * the book prints once with several blanks in it is rendered once with several
 * blanks in it, instead of being repeated in full under every single blank. */
type Contextual = { context?: string; contextEn?: string };

function groupByContext<T extends Contextual>(items: T[]): { item: T; from: number; items: T[] }[] {
  const groups: { item: T; from: number; items: T[] }[] = [];
  items.forEach((item, index) => {
    const last = groups[groups.length - 1];
    if (last && item.context && last.item.context === item.context) last.items.push(item);
    else groups.push({ item, from: index, items: [item] });
  });
  return groups;
}

/** A situation card: the shared story/setup, then the blanks belonging to it.
 * Items with no context render bare, with no card around them. */
function ContextGroup({ of, children }: { of: Contextual; children: React.ReactNode }) {
  const { lang } = useUiLang();
  if (!of.context) return <>{children}</>;
  return (
    <div className="mb-3 overflow-hidden rounded-lg border" style={{ borderColor: "var(--color-divider)" }}>
      <p className="bg-surface px-3 py-2 text-[13px] leading-relaxed text-neutral-700">
        {renderRich(loc(of.context, of.contextEn, lang))}
      </p>
      <div className="px-3 py-1.5">{children}</div>
    </div>
  );
}

/** The item(s) the book has already filled in at the top of an exercise,
 * rendered as answered rows of the very same list the learner is about to work
 * through, so the shape of the task is obvious without reading prose. */
function WorkedExamples({ examples }: { examples?: WorkedExample[] }) {
  const { t } = useUiLang();
  if (!examples || examples.length === 0) return null;
  return (
    <div className="mb-4 rounded-lg border border-dashed px-3 py-2" style={{ borderColor: "var(--color-divider)" }}>
      <span className="label-xs mb-1 block text-neutral-500">{t("grammar.example")}</span>
      {groupByContext(examples).map((group, gi) => (
        <ContextGroup key={gi} of={group.item}>
          {group.items.map((ex, k) => (
            <ItemRow key={k} label={ex.label ?? String(group.from + k + 1)} tone="example">
              <PromptLine prompt={ex.prompt} renderBlank={() => <FilledAnswer text={ex.answer} tone="example" />} />
            </ItemRow>
          ))}
        </ContextGroup>
      ))}
    </div>
  );
}

/** Score plus primary action, pinned to the bottom of the viewport. The score
 * used to sit at the very end of the scrollable content, which on a 19-item
 * exercise meant scrolling past everything to find out how you did. */
function PracticeFooter({
  checked,
  done,
  total,
  correct,
  canCheck = true,
  onCheck,
  onContinue,
}: {
  checked: boolean;
  done?: number;
  total?: number;
  correct?: number;
  canCheck?: boolean;
  onCheck?: () => void;
  onContinue: () => void;
}) {
  const { t } = useUiLang();
  if (!checked) {
    return (
      <>
        {total != null && done != null && (
          <div className="mb-1.5 text-center text-[11px] tabular-nums text-neutral-500">
            {t("grammar.filledCount", { done, total })}
          </div>
        )}
        <button className="btn btn-primary btn-block px-4 py-3 disabled:opacity-40" disabled={!canCheck} onClick={onCheck}>
          {t("grammar.check")}
        </button>
      </>
    );
  }
  return (
    <>
      {correct != null && total != null && (
        <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[12px]">
          <span className="label-xs text-neutral-500">{t("grammar.result")}</span>
          <span className="font-extrabold text-accent">{t("grammar.scoreCorrect", { correct, total })}</span>
        </div>
      )}
      <button className="btn btn-primary btn-block px-4 py-3" onClick={onContinue}>
        {t("grammar.continue")}
      </button>
    </>
  );
}

/** Pins a step's primary action to the viewport bottom, returning the node to
 * render inline instead when there is no ActionBarScreen to pin to. */
function usePinnedAction(node: React.ReactNode): React.ReactNode {
  return useActionBar(node) ? null : <div className="mt-4">{node}</div>;
}

// ---------- Multiple choice fill-in ----------

/** The gap sentence, from the book's text before and after the gap. Either side
 * can be empty (the gap opens or ends the sentence) or start with punctuation
 * that closes the sentence, so the parts are joined without leaving a stray
 * space at the edges or in front of a full stop. */
function mcSentence(it: { before: string; after: string }): string {
  return [it.before, "___", it.after]
    .filter((part) => part !== "")
    .join(" ")
    .replace(/\s+([.,;:!?])/g, "$1");
}

function FillMcStepView({ step, onNext }: { step: FillMcStep; onNext: (score?: Score) => void }) {
  const [picked, setPicked] = useState<(string | null)[]>(() => step.items.map(() => null));
  const [checked, setChecked] = useState(false);
  const allPicked = picked.every((p) => p !== null);
  const correctCount = picked.filter((p, i) => p === step.items[i].answer).length;
  const startNumber = step.startNumber ?? (step.examples?.length ?? 0) + 1;

  const inlineAction = usePinnedAction(
    <PracticeFooter
      checked={checked}
      done={picked.filter((p) => p !== null).length}
      total={step.items.length}
      correct={correctCount}
      canCheck={allPicked}
      onCheck={() => setChecked(true)}
      onContinue={() => onNext({ correct: correctCount, total: step.items.length })}
    />,
  );

  return (
    <div className="flex flex-1 flex-col p-4">
      <ExerciseHeader step={step} />
      <WorkedExamples examples={step.examples} />
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {groupByContext(step.items).map((group, gi) => (
          <ContextGroup key={gi} of={group.item}>
            {group.items.map((it, k) => {
              const i = group.from + k;
              const chosen = picked[i];
              const tone: ItemTone = !checked ? "idle" : chosen === it.answer ? "correct" : "wrong";
              return (
                <ItemRow key={i} label={it.label ?? String(startNumber + i)} tone={tone}>
                  <PromptLine
                    prompt={mcSentence(it)}
                    renderBlank={
                      checked
                        ? () => <FilledAnswer text={it.answer} tone={tone === "wrong" ? "wrong" : "correct"} />
                        : chosen
                          ? () => <FilledAnswer text={chosen} tone="correct" />
                          : undefined
                    }
                  />
                  {!checked && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {it.options.map((o) => {
                        const isPicked = chosen === o;
                        return (
                          <button
                            key={o}
                            className="rounded-full border px-3 py-1.5 text-[13px] font-bold"
                            style={{
                              borderColor: isPicked ? "var(--color-accent)" : "var(--color-divider)",
                              background: isPicked ? "var(--color-accent-100)" : "var(--color-surface)",
                              color: isPicked ? "var(--color-accent-800)" : "var(--color-text)",
                            }}
                            onClick={() => setPicked((prev) => prev.map((p, n) => (n === i ? o : p)))}
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {checked && tone === "wrong" && <YourAnswer text={chosen} />}
                </ItemRow>
              );
            })}
          </ContextGroup>
        ))}
      </div>
      {inlineAction}
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

  const inlineAction = usePinnedAction(
    allDone ? (
      <PracticeFooter
        checked
        correct={step.left.length}
        total={step.left.length + mistakes}
        onContinue={() => onNext({ correct: step.left.length, total: step.left.length + mistakes })}
      />
    ) : null,
  );

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
      <ExerciseHeader step={step} />
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-1.5">
          {step.left.map((text, i) => (
            <button
              key={i}
              disabled={doneLeft[i] !== undefined}
              style={styleFor("l", i)}
              className="rounded-md border px-2.5 py-2 text-left text-[12.5px] leading-snug"
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
              className="rounded-md border px-2.5 py-2 text-left text-[12.5px] leading-snug"
              onClick={() => pick("r", i)}
            >
              <span className="mr-1.5 opacity-60">{QUIZ_LETTERS_LOWER[i]}</span>
              {text}
            </button>
          ))}
        </div>
      </div>
      {inlineAction}
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

/** An item's gaps, in the order they appear in `prompt`: the first is the
 * item's own answer, the rest come from `extraBlanks`. */
function blanksOf(item: TypeFillItem): { answer: string; accept?: string[] }[] {
  return [{ answer: item.answer, accept: item.accept }, ...(item.extraBlanks ?? [])];
}

function TypeFillStepView({ step, onNext }: { step: TypeFillStep; onNext: (score?: Score) => void }) {
  const { t } = useUiLang();
  const blanks = useMemo(() => step.items.map(blanksOf), [step]);
  const [inputs, setInputs] = useState<string[][]>(() => blanks.map((b) => b.map(() => "")));
  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState<[number, number]>([0, 0]);
  const startNumber = step.startNumber ?? (step.examples?.length ?? 0) + 1;

  const total = blanks.reduce((n, b) => n + b.length, 0);
  const done = inputs.reduce((n, row) => n + row.filter((v) => v.trim()).length, 0);
  const correctCount = blanks.reduce(
    (n, row, i) => n + row.filter((b, j) => matchesAnswer(inputs[i][j], b)).length,
    0,
  );

  function setInput(i: number, j: number, value: string) {
    setInputs((prev) => prev.map((row, k) => (k === i ? row.map((v, n) => (n === j ? value : v)) : row)));
  }

  const inlineAction = usePinnedAction(
    <PracticeFooter
      checked={checked}
      done={done}
      total={total}
      correct={correctCount}
      onCheck={() => setChecked(true)}
      onContinue={() => onNext({ correct: correctCount, total })}
    />,
  );

  return (
    <div className="flex flex-1 flex-col p-4">
      <ExerciseHeader step={step} onPickWord={checked ? undefined : (w) => setInput(focused[0], focused[1], w)} />
      <WorkedExamples examples={step.examples} />
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
        {groupByContext(step.items).map((group, gi) => (
          <ContextGroup key={gi} of={group.item}>
            {group.items.map((it, k) => {
              const i = group.from + k;
              const row = blanks[i];
              const okAt = (j: number) => checked && matchesAnswer(inputs[i][j], row[j]);
              const allOk = row.every((_, j) => okAt(j));
              const tone: ItemTone = !checked ? "idle" : allOk ? "correct" : "wrong";
              return (
                <ItemRow key={i} label={it.label ?? String(startNumber + i)} tone={tone}>
                  {/* A prompt that is nothing but the gap ("write the whole
                      question") has no sentence to show yet - the input below
                      IS the line - so only render it once there's an answer. */}
                  {(checked || it.prompt.trim() !== "___") && (
                    <PromptLine
                      prompt={it.prompt}
                      renderBlank={
                        checked ? (j) => <FilledAnswer text={row[j].answer} tone={okAt(j) ? "correct" : "wrong"} /> : undefined
                      }
                    />
                  )}
                  {!checked &&
                    row.map((_, j) => (
                      <div key={j} className="mt-1 flex items-center gap-1.5">
                        {row.length > 1 && <span className="w-3 flex-none text-[11px] font-extrabold text-accent">{j + 1}</span>}
                        <input
                          className="input flex-1"
                          value={inputs[i][j]}
                          onFocus={() => setFocused([i, j])}
                          onChange={(e) => setInput(i, j, e.target.value)}
                          placeholder={t("grammar.answerPlaceholder")}
                        />
                      </div>
                    ))}
                  {checked &&
                    row.map((_, j) =>
                      okAt(j) ? null : <YourAnswer key={j} text={inputs[i][j]} label={row.length > 1 ? j + 1 : undefined} />,
                    )}
                </ItemRow>
              );
            })}
          </ContextGroup>
        ))}
      </div>
      {inlineAction}
    </div>
  );
}

// ---------- Judge + correct ----------

/** "Are the underlined verbs OK? Correct them where necessary." Two decisions
 * per item: is it right, and if not what should it be. Scored as one point,
 * awarded only when both halves are right, so guessing "sai" and typing
 * anything doesn't earn credit. */
function JudgeCorrectStepView({ step, onNext }: { step: JudgeCorrectStep; onNext: (score?: Score) => void }) {
  const { t } = useUiLang();
  const [verdicts, setVerdicts] = useState<(boolean | null)[]>(() => step.items.map(() => null));
  const [fixes, setFixes] = useState<string[]>(() => step.items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const startNumber = step.startNumber ?? 1;

  function isRight(i: number): boolean {
    const it = step.items[i];
    if (verdicts[i] !== !it.ok) return false; // verdict[i] === true means learner said "needs fixing"
    if (it.ok) return true;
    return matchesAnswer(fixes[i], { answer: it.correction ?? "", accept: it.accept });
  }

  const correctCount = step.items.filter((_, i) => isRight(i)).length;
  const allAnswered = verdicts.every((v, i) => v !== null && (v === false || fixes[i].trim() !== ""));

  const inlineAction = usePinnedAction(
    <PracticeFooter
      checked={checked}
      done={verdicts.filter((v) => v !== null).length}
      total={step.items.length}
      correct={correctCount}
      canCheck={allAnswered}
      onCheck={() => setChecked(true)}
      onContinue={() => onNext({ correct: correctCount, total: step.items.length })}
    />,
  );

  return (
    <div className="flex flex-1 flex-col p-4">
      <ExerciseHeader step={step} />
      <div className="flex flex-col gap-1">
        {step.items.map((it, i) => {
          const parts = it.sentence.split(it.underlined);
          const ok = checked && isRight(i);
          const tone: ItemTone = !checked ? "idle" : ok ? "correct" : "wrong";
          return (
            <ItemRow key={i} label={it.label ?? String(startNumber + i)} tone={tone}>
              <div className="text-[14px] leading-relaxed">
                {parts[0]}
                <span
                  className="font-extrabold underline decoration-2 underline-offset-2"
                  style={checked && !it.ok ? { color: "var(--color-accent)" } : undefined}
                >
                  {it.underlined}
                </span>
                {parts.slice(1).join(it.underlined)}
              </div>
              {!checked && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {[
                    { label: t("grammar.judgeOk"), value: false },
                    { label: t("grammar.judgeFix"), value: true },
                  ].map((opt) => {
                    const picked = verdicts[i] === opt.value;
                    return (
                      <button
                        key={opt.label}
                        className="rounded-full border px-3 py-1 text-[12px] font-bold"
                        style={{
                          borderColor: picked ? "var(--color-accent)" : "var(--color-divider)",
                          background: picked ? "var(--color-accent-100)" : "var(--color-surface)",
                          color: picked ? "var(--color-accent-800)" : "var(--color-text)",
                        }}
                        onClick={() => setVerdicts((prev) => prev.map((v, k) => (k === i ? opt.value : v)))}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {!checked && verdicts[i] === true && (
                <input
                  className="input mt-1.5"
                  value={fixes[i]}
                  onChange={(e) => setFixes((prev) => prev.map((v, k) => (k === i ? e.target.value : v)))}
                  placeholder={t("grammar.fixPlaceholder", { text: it.underlined })}
                />
              )}
              {checked && (
                <div className="mt-1 text-[12.5px]">
                  {it.ok ? (
                    <span className="text-neutral-500">{t("grammar.alreadyCorrect")}</span>
                  ) : (
                    <>
                      <span className="text-neutral-500">{t("grammar.answerLabel")} </span>
                      <FilledAnswer text={it.correction ?? ""} tone={ok ? "correct" : "wrong"} />
                    </>
                  )}
                  {!ok && verdicts[i] === true && <YourAnswer text={fixes[i]} />}
                </div>
              )}
            </ItemRow>
          );
        })}
      </div>
      {inlineAction}
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
  const { t } = useUiLang();
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
    <button className="btn btn-primary btn-block px-4 py-3" onClick={() => onNext()}>
      {t("grammar.completeUnit")}
    </button>
  ) : (
    <button
      className="btn btn-primary btn-block px-4 py-3 disabled:opacity-40"
      disabled={!sentence.trim() || loading}
      onClick={submit}
    >
      {loading ? t("grammar.grading") : t("grammar.submitToAi")}
    </button>
  );
  const inlineAction = usePinnedAction(footerContent);

  return (
    <div className="flex flex-1 flex-col p-4">
      <ExerciseHeader step={step} />
      <textarea
        className="input min-h-[90px] w-full resize-none"
        value={sentence}
        disabled={!!result}
        onChange={(e) => setSentence(e.target.value)}
        onInput={autoGrow}
        placeholder={t("grammar.writeSentencePlaceholder")}
      />
      {(loading || !!error || result != null) && (
        <div className="mt-3">
          <AiFeedback loading={loading} result={result} error={error} onRetry={submit} variant="sentence" />
        </div>
      )}
      {result != null && xpEarned != null && (
        <div className="mt-2 text-[13px] font-extrabold text-accent">+{xpEarned} XP</div>
      )}
      {inlineAction}
    </div>
  );
}

// ---------- Wizard shell ----------

function stepKindLabel(kind: GrammarUnitStep["kind"], t: TranslateFn): string {
  switch (kind) {
    case "rule":
      return t("grammar.stepKind.rule");
    case "ai_practice":
      return t("grammar.stepKind.aiPractice");
    default:
      return t("grammar.stepKind.practice");
  }
}

export function UnitClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { lang, t } = useUiLang();
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
        <p className="text-[13px] text-neutral-600">{t("grammar.unitNotFound")}</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/english-grammar-in-use")}>
          {t("grammar.allUnits")}
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
    const sub = pct >= 90 ? t("grammar.scoreExcellent") : pct >= 70 ? t("grammar.scoreGood") : t("grammar.scoreReview");
    return (
      <div className="flex min-h-screen flex-col">
        <div className="divider-b px-4 pt-8 pb-6">
          <div className="label-xs text-accent">{t("grammar.unitComplete")}</div>
          <div className="mt-2 text-[30px] leading-tight font-extrabold">{unit.title}</div>
          <div className="mt-3 text-[64px] leading-[0.95] font-extrabold tracking-tight">{pct}%</div>
          <div className="mt-2 text-[13px] text-neutral-600">
            {sub} {t("grammar.correctInPractice", { correct: tally.correct, total: tally.total })}
          </div>
        </div>
        <div className="flex gap-[2px] p-4">
          <button
            className="btn btn-secondary flex-1 justify-center px-4 py-3"
            onClick={() => router.push("/modules/english-grammar-in-use")}
          >
            {t("grammar.allUnits")}
          </button>
          <button className="btn btn-primary flex-1 justify-center px-4 py-3" onClick={restart}>
            {t("grammar.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <ActionBarScreen
      header={
        <>
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={goBack} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
              <BackIcon />
            </button>
            <div className="h-1.5 flex-1 bg-neutral-300">
              <div className="h-full bg-accent" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
            </div>
            <button
              className="flex flex-none items-center gap-1 text-[11px] tabular-nums text-neutral-600 hover:text-accent"
              onClick={() => setShowStepList(true)}
              aria-label={t("grammar.stepListAria")}
            >
              <ListIcon />
              {stepIndex + 1}/{steps.length}
            </button>
          </div>
          <div className="divider-b flex items-center justify-between gap-3 px-4 pb-2">
            <span className="label-xs truncate text-accent">
              Unit {unit.unit} · {unit.title} · {stepKindLabel(step.kind, t)}
            </span>
            <button
              className="btn btn-ghost flex-none px-0 text-[11px]"
              onClick={() => router.push("/modules/english-grammar-in-use")}
            >
              {t("grammar.exit")}
            </button>
          </div>
        </>
      }
    >
      {showStepList && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[1040px]">
            <div className="divider-b flex items-center justify-between px-4 py-3">
              <span className="text-[16px] font-extrabold">{t("grammar.stepListTitle")}</span>
              <button className="btn btn-ghost" onClick={() => setShowStepList(false)}>
                {t("grammar.close")}
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
                      <span className="block text-[14px] font-extrabold">{loc(s.title, s.titleEn, lang)}</span>
                      <span className="label-xs mt-0.5 block text-neutral-600">{stepKindLabel(s.kind, t)}</span>
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
