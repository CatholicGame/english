"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VERBS } from "@/data/basic-verbs";
import type { AllItem } from "@/lib/flatten";
import { buildAllItems } from "@/lib/flatten";
import { useProgress } from "@/lib/progress-context";
import { dueItems } from "@/lib/stats";
import { addMistakes, clearMistakes, loadMistakes } from "@/lib/mistakes-store";
import {
  MODE_LABELS,
  buildSession,
  type ChoiceQuestion,
  type MatchQuestion,
  type Mode,
  type Session,
  type TypeQuestion,
} from "@/lib/session";
import { norm, speak } from "@/lib/utils";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isVerbLocked } from "@/lib/content-access";
import { useUiLang } from "@/lib/i18n";

const SESSION_LENGTH = 12;

interface Answer {
  picked: string;
  ok: boolean;
}
interface MatchSel {
  side: "l" | "r";
  key?: string;
  en: string;
}
interface MatchState {
  sel: MatchSel | null;
  done: Record<string, boolean>;
  wrong: string | null;
}

const ACC = "var(--color-accent)";
const INK = "var(--color-text)";
const BG = "var(--color-bg)";
const SURF = "var(--color-surface)";
const LINE = "var(--color-divider)";

function SpeakerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`block ${className}`}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
    </svg>
  );
}

export function RunClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loaded, progress, grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const { lang } = useUiLang();
  const showVi = lang !== "en";
  // Same rule as the Today hub: never quiz on Pro-locked verbs, even via a
  // hand-crafted verbs= param — filtering the pool here means locked items
  // simply aren't there to match against.
  const unlockedVerbs = useMemo(() => VERBS.filter((v) => !isVerbLocked(v.verb, isUnlocked)), [isUnlocked]);
  const all = useMemo(() => buildAllItems(unlockedVerbs), [unlockedVerbs]);

  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [qi, setQi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [input, setInput] = useState("");
  const [ans, setAns] = useState<Answer | null>(null);
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [missed, setMissed] = useState<AllItem[]>([]);
  const [finished, setFinished] = useState(false);
  const spokenKey = useRef<string | null>(null);

  const spKey = searchParams.toString();

  function startSession(mode: Mode, pool: AllItem[], label: string) {
    setSession(buildSession(mode, pool, label, SESSION_LENGTH));
    setQi(0);
    setFlipped(false);
    setInput("");
    setAns(null);
    setMatchState(null);
    setCorrect(0);
    setWrong(0);
    setMissed([]);
    setFinished(false);
  }

  useEffect(() => {
    if (!loaded) return;
    const mode = (searchParams.get("mode") as Mode) || "mix";
    const verbParam = searchParams.get("verb");
    const verbsParam = searchParams.get("verbs");
    const mistakesParam = searchParams.get("mistakes");

    let pool: AllItem[];
    if (mistakesParam) {
      pool = loadMistakes("collocations-phrasal-verbs");
      if (pool.length === 0) pool = dueItems(all, progress); // fallback
      else clearMistakes("collocations-phrasal-verbs");
    } else if (verbsParam) {
      const verbList = verbsParam.split(",").map((s) => s.trim().toUpperCase());
      pool = all.filter((i) => verbList.includes(i.verb));
    } else if (verbParam) {
      pool = all.filter((i) => i.verb === verbParam);
    } else {
      pool = dueItems(all, progress);
    }

    const label = mistakesParam
      ? "Review mistakes"
      : verbsParam
        ? verbsParam.split(",").map((s) => s.trim().toUpperCase()).join(", ")
        : verbParam || MODE_LABELS[mode];

    startSession(mode, pool, label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, spKey]);

  function handleGrade(item: AllItem, ok: boolean) {
    grade(item.key, ok);
    if (ok) setCorrect((c) => c + 1);
    else {
      setWrong((w) => w + 1);
      setMissed((m) => [...m, item]);
    }
  }

  function next() {
    if (!session) return;
    if (qi + 1 >= session.qs.length) {
      setFinished(true);
      return;
    }
    setQi((i) => i + 1);
    setFlipped(false);
    setInput("");
    setAns(null);
    setMatchState(null);
  }

  const q = session ? session.qs[qi] : null;

  useEffect(() => {
    if (q && q.kind === "listen" && !ans && spokenKey.current !== q.item.key) {
      spokenKey.current = q.item.key;
      const t = setTimeout(() => speak(q.item.term), 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, ans]);

  function pickMatch(side: "l" | "r", payload: { key?: string; en: string }) {
    if (!q || q.kind !== "match") return;
    const cur = matchState || { sel: null, done: {}, wrong: null };
    if (payload.key && cur.done[payload.key]) return;
    if (!cur.sel || cur.sel.side === side) {
      setMatchState({ ...cur, sel: { side, ...payload }, wrong: null });
      return;
    }
    const a = cur.sel;
    const b: MatchSel = { side, ...payload };
    const termSel = a.side === "l" ? a : b;
    const meanSel = a.side === "l" ? b : a;
    const target = q.items.find((x) => x.key === termSel.key);
    if (target && target.en === meanSel.en) {
      const done = { ...cur.done, [target.key]: true };
      handleGrade(target, true);
      setMatchState({ sel: null, done, wrong: null });
      if (Object.keys(done).length === q.items.length) {
        setTimeout(next, 650);
      }
    } else {
      if (target) handleGrade(target, false);
      setMatchState({ ...cur, sel: null, wrong: side === "l" ? `l:${payload.key}` : `r:${payload.en}` });
      setTimeout(() => {
        setMatchState((c) => (c && c.wrong ? { ...c, wrong: null } : c));
      }, 650);
    }
  }

  function goHome() {
    router.push("/modules/collocations-phrasal-verbs");
  }

  function submitWrite() {
    if (!q || q.kind !== "type") return;
    if (ans) {
      next();
      return;
    }
    if (!input.trim()) return;
    const answerText = q.answer;
    const ok = norm(input) === norm(answerText) || norm(input) === norm(q.item.term);
    setAns({ picked: input, ok });
    handleGrade(q.item, ok);
    if (ok) setTimeout(() => next(), 850);
  }

  function skipWrite() {
    if (!q || q.kind !== "type") return;
    if (!ans) handleGrade(q.item, false);
    next();
  }

  if (!loaded || session === undefined) return null;

  if (session === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-[14px] text-neutral-600">Not enough phrases to start this session yet.</p>
        <button className="btn btn-secondary" onClick={goHome}>
          Back to Today
        </button>
      </div>
    );
  }

  if (finished) {
    const rt = correct + wrong;
    const rPct = rt ? Math.round((correct / rt) * 100) : 0;
    const rSub = rPct >= 90 ? "Excellent session." : rPct >= 70 ? "Solid work." : "Keep going.";
    const seen = new Set<string>();
    const missedUnique = missed.filter((m) => (seen.has(m.key) ? false : (seen.add(m.key), true))).slice(0, 6);

    // Save missed items for later review
    const allMissed = missed.filter((m, i, arr) => arr.findIndex((x) => x.key === m.key) === i);
    if (allMissed.length > 0) {
      addMistakes("collocations-phrasal-verbs", allMissed);
    }

    return (
      <div className="flex min-h-screen flex-col">
        <div className="divider-b px-4 pt-8 pb-6">
          <div className="label-xs text-accent">Session complete</div>
          <div className="mt-2 text-[76px] leading-[0.95] font-extrabold tracking-tight">{rPct}%</div>
          <div className="mt-2 text-[13px] text-neutral-600">{rSub}</div>
        </div>
        <div className="divider-b grid grid-cols-2 gap-[2px] bg-[color:var(--color-divider)]">
          <div className="bg-bg p-4">
            <div className="text-[26px] leading-none font-extrabold">{correct}</div>
            <div className="label-xs mt-1.5">Correct</div>
          </div>
          <div className="bg-bg p-4">
            <div className="text-[26px] leading-none font-extrabold text-accent">{wrong}</div>
            <div className="label-xs mt-1.5">Missed</div>
          </div>
        </div>
        {missedUnique.length > 0 && (
          <div className="flex-1">
            <div className="label-xs px-4 pt-4 pb-2">Review these</div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
              {missedUnique.map((m) => (
                <div key={m.key} className="divider-t px-4 py-3">
                  <div className="text-[15px] font-extrabold">{m.term}</div>
                  <div className="mt-0.5 text-[12px] leading-relaxed text-neutral-700">{m.en}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-[2px] p-4">
          <button className="btn btn-secondary flex-1 justify-start px-4 py-3" onClick={goHome}>
            Done
          </button>
          {allMissed.length > 0 && (
            <button
              className="btn btn-accent flex-1 justify-start px-4 py-3"
              onClick={() => {
                startSession("mix", allMissed, "Retry missed");
                clearMistakes("collocations-phrasal-verbs");
              }}
            >
              Retry {allMissed.length} missed
            </button>
          )}
          <button
            className="btn btn-primary flex-1 justify-start px-4 py-3"
            onClick={() => startSession(session.mode, session.pool, session.label)}
          >
            Again
          </button>
        </div>
      </div>
    );
  }

  const runPct = Math.round((qi / session.qs.length) * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="divider-b flex items-center gap-3 px-4 py-3">
        <button onClick={goHome} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="h-1.5 flex-1 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${runPct}%` }} />
        </div>
        <span className="w-9 flex-none text-right text-[11px] tabular-nums text-neutral-600">
          {qi + 1}/{session.qs.length}
        </span>
      </div>
      <div className="label-xs px-4 pt-3 text-accent">{MODE_LABELS[session.mode]}</div>

      {q?.kind === "flash" && (
        // lg:flex-none on both this wrapper and the card below: without it, `flex-1`
        // stretches the card to fill the whole remaining viewport height on a tall
        // desktop window (min-h-screen further up), leaving a huge empty gap around
        // the short "Tap to reveal" text and pushing the grade buttons below the fold.
        <div className="flex flex-1 flex-col p-4 lg:mx-auto lg:w-full lg:max-w-[640px] lg:flex-none">
          <button
            onClick={() => {
              if (!flipped) speak(q.item.term);
              setFlipped(!flipped);
            }}
            className="animate-pop flex flex-1 w-full flex-col justify-center gap-3 bg-surface p-6 text-left lg:flex-none lg:min-h-[280px]"
          >
            <span className="text-[30px] leading-tight font-extrabold tracking-tight text-balance">
              {q.item.term}
            </span>
            {flipped ? (
              <span className="block">
                <span className="mb-4 mt-2 block h-0.5 bg-[color:var(--color-divider)]" />
                <span className="block text-[15px] leading-relaxed">{q.item.en}</span>
                {showVi && <span className="mt-1 block text-[13px] leading-relaxed text-neutral-600">{q.item.vi}</span>}
                <span className="mt-4 block border-l-2 border-[color:var(--color-divider)] pl-3 text-[13px] leading-relaxed">
                  {q.item.ex}
                  {showVi && q.item.ex_vi && <span className="mt-0.5 block text-neutral-500">{q.item.ex_vi}</span>}
                </span>
              </span>
            ) : (
              <span className="label-xs">Tap to reveal</span>
            )}
          </button>
          <div className="mt-4 flex gap-0.5">
            <button
              className="btn btn-secondary flex-1 justify-start px-4 py-3 text-accent-700"
              onClick={() => {
                handleGrade(q.item, false);
                next();
              }}
            >
              Again
            </button>
            <button
              className="btn btn-primary flex-1 justify-start px-4 py-3"
              onClick={() => {
                handleGrade(q.item, true);
                next();
              }}
            >
              I know it
            </button>
          </div>
        </div>
      )}

      {(q?.kind === "mc" || q?.kind === "listen") &&
        (() => {
          const cq = q as ChoiceQuestion;
          const isReverse = session.mode === "reverseMc";
          const promptText = isReverse ? cq.item.vi : cq.item.term;
          const hint = ans
            ? ans.ok
              ? "Correct"
              : "Not quite"
            : cq.kind === "listen"
              ? "Tap to hear again"
              : isReverse
                ? "Which phrase?"
                : "What does it mean?";
          return (
            <div className="flex flex-1 flex-col p-4">
              <div className="lg:flex lg:flex-row lg:items-start lg:gap-8">
                <div className="mb-4 bg-surface px-4 py-6 lg:mb-0 lg:w-[300px] lg:flex-none lg:sticky lg:top-6">
                  {cq.kind === "listen" ? (
                    <button
                      className="btn btn-primary flex h-[72px] w-[72px] items-center justify-center p-0"
                      onClick={() => speak(cq.item.term)}
                    >
                      <SpeakerIcon className="h-[34px] w-[34px]" />
                    </button>
                  ) : (
                    <div className={`leading-tight font-extrabold tracking-tight text-balance ${isReverse ? "text-[17px]" : "text-[28px]"}`}>
                      {promptText}
                    </div>
                  )}
                  <div className="label-xs mt-3">{hint}</div>
                </div>
                <div className="lg:flex-1">
                  {cq.options.map((o) => {
                    let bg = SURF,
                      bc = LINE,
                      fg = INK;
                    if (ans) {
                      if (o === cq.answer) {
                        bg = INK;
                        bc = INK;
                        fg = BG;
                      } else if (o === ans.picked) {
                        bg = "var(--color-accent-100)";
                        bc = ACC;
                        fg = "var(--color-accent-800)";
                      } else {
                        fg = "var(--color-neutral-600)";
                        bg = BG;
                      }
                    }
                    return (
                      <button
                        key={o}
                        style={{ borderColor: bc, background: bg, color: fg }}
                        className="mb-0.5 w-full border p-3 text-left text-[14px] leading-snug"
                        onClick={() => {
                          if (ans) {
                            next();
                            return;
                          }
                          const ok = o === cq.answer;
                          setAns({ picked: o, ok });
                          handleGrade(cq.item, ok);
                          setTimeout(() => next(), ok ? 750 : 1700);
                        }}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

      {q?.kind === "type" &&
        (() => {
          const wq = q as TypeQuestion;
          const isReverse = session.mode === "reverseType";
          const hint = ans ? (ans.ok ? "Correct" : "See the answer below") : "Write the phrase";
          return (
            <div className="flex flex-1 flex-col p-4">
              <div className="lg:flex lg:flex-row lg:items-start lg:gap-8">
                <div className="mb-4 bg-surface p-4 lg:mb-0 lg:w-[300px] lg:flex-none lg:sticky lg:top-6">
                  <div>
                    {isReverse ? (
                      <>
                        <div className="text-[19px] leading-snug font-extrabold text-pretty">{wq.item.vi}</div>
                        <div className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">{wq.item.en}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-[19px] leading-snug font-extrabold text-pretty">{wq.item.en}</div>
                        <div className="mt-1.5 text-[14px] leading-relaxed text-neutral-600">{wq.item.vi}</div>
                      </>
                    )}
                  </div>
                  <div className="label-xs mt-3">{hint}</div>
                </div>
                <div className="lg:flex-1">
                  <input
                    className="input"
                    style={{
                      minHeight: 48,
                      fontSize: 16,
                      borderColor: ans ? (ans.ok ? INK : ACC) : LINE,
                      color: ans && !ans.ok ? "var(--color-accent-800)" : INK,
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitWrite();
                    }}
                    placeholder="Type here"
                  />
                  {ans && !ans.ok && (
                    <div className="mt-2 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
                      <span className="label-xs mb-0.5 block">Answer</span>
                      <span className="font-extrabold">{wq.answer}</span>
                    </div>
                  )}
                  <button className="btn btn-primary btn-block mt-3 px-4 py-3" onClick={submitWrite}>
                    {ans ? "Continue" : "Check"}
                  </button>
                  <button className="btn btn-ghost mt-2" onClick={skipWrite}>
                    Skip
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {q?.kind === "match" &&
        (() => {
          const mq = q as MatchQuestion;
          const ms: MatchState = matchState || { sel: null, done: {}, wrong: null };
          const style = (done: boolean, sel: boolean, isWrong: boolean) =>
            done
              ? { bg: INK, bc: INK, fg: BG }
              : isWrong
                ? { bg: "var(--color-accent-100)", bc: ACC, fg: "var(--color-accent-800)" }
                : sel
                  ? { bg: ACC, bc: ACC, fg: BG }
                  : { bg: SURF, bc: LINE, fg: INK };
          return (
            <div className="flex-1 p-4 lg:mx-auto lg:w-full lg:max-w-[640px]">
              <div className="mb-4 text-[13px] text-neutral-700">Tap a phrase, then its meaning.</div>
              {mq.items.map((it, i) => {
                const right = mq.right[i];
                const rOwner = mq.items.find((x) => x.en === right);
                const lDone = !!ms.done[it.key];
                const rDone = !!(rOwner && ms.done[rOwner.key]);
                const lSel = !!(ms.sel && ms.sel.side === "l" && ms.sel.key === it.key);
                const rSel = !!(ms.sel && ms.sel.side === "r" && ms.sel.en === right);
                const lWrong = ms.wrong === `l:${it.key}`;
                const rWrong = ms.wrong === `r:${right}`;
                const lSty = style(lDone, lSel, lWrong);
                const rSty = style(rDone, rSel, rWrong);
                return (
                  <div key={it.key} className="mb-0.5 flex gap-0.5">
                    <button
                      onClick={() => pickMatch("l", { key: it.key, en: it.en })}
                      style={{ background: lSty.bg, borderColor: lSty.bc, color: lSty.fg }}
                      className="flex-[0_0_42%] border p-3 text-left text-[13px] leading-tight font-extrabold"
                    >
                      {it.term}
                    </button>
                    <button
                      onClick={() => pickMatch("r", { key: rOwner?.key, en: right })}
                      style={{ background: rSty.bg, borderColor: rSty.bc, color: rSty.fg }}
                      className="flex-1 border p-3 text-left text-[12px] leading-snug"
                    >
                      {right}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })()}
    </div>
  );
}
