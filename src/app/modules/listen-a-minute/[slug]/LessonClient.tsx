"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { extensionTasks, LISTEN_LESSONS } from "@/data/listen-a-minute";
import { parseCloze, renderClozePlain } from "@/lib/cloze";
import { clearCurrentLesson, getCurrentLesson, setCurrentLesson } from "@/lib/listen-progress";
import { useProgress } from "@/lib/progress-context";
import { norm, shuffle } from "@/lib/utils";

const TOTAL_STEPS = 4;
const STEP_LABELS = ["Listening", "Gap fill", "Spelling", "Extension"];

function scrambleWord(word: string): string {
  const letters = word.split("");
  let out = shuffle(letters).join("");
  let guard = 0;
  while (out.toLowerCase() === word.toLowerCase() && guard < 5) {
    out = shuffle(letters).join("");
    guard++;
  }
  return out;
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[18px] w-[18px]"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[34px] w-[34px]"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-[34px] w-[34px]"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

export function LessonClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const lesson = useMemo(() => LISTEN_LESSONS.find((l) => l.slug === slug), [slug]);

  const [step, setStep] = useState(() => {
    const cur = getCurrentLesson();
    return cur && cur.slug === slug && cur.step >= 1 && cur.step <= TOTAL_STEPS ? cur.step : 1;
  });
  const [showScript, setShowScript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeSentence, setActiveSentence] = useState(-1);
  const boundEndRef = useRef<number | null>(null);
  const boundWatchRef = useRef<number | null>(null);
  const playGenRef = useRef(0);

  const segments = useMemo(() => (lesson ? parseCloze(lesson.clozeTemplate) : []), [lesson]);
  const blankAnswers = useMemo(
    () => segments.filter((s): s is { blank: string } => "blank" in s).map((s) => s.blank),
    [segments],
  );
  const blankIndexBySegment = useMemo(() => {
    const arr: number[] = [];
    let n = 0;
    for (const s of segments) {
      if ("blank" in s) {
        arr.push(n);
        n += 1;
      } else {
        arr.push(-1);
      }
    }
    return arr;
  }, [segments]);
  const [gapInputs, setGapInputs] = useState<string[]>(() => blankAnswers.map(() => ""));
  const [gapSubmitted, setGapSubmitted] = useState(false);

  const scrambled = useMemo(
    () => (lesson ? lesson.spellingWords.map(scrambleWord) : []),
    [lesson],
  );
  const [spellInputs, setSpellInputs] = useState<string[]>(() => (lesson ? lesson.spellingWords.map(() => "") : []));
  const [spellSubmitted, setSpellSubmitted] = useState(false);

  const tasks = useMemo(() => (lesson ? extensionTasks(lesson.title) : []), [lesson]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(
    () => () => {
      audioRef.current?.pause();
      if (boundWatchRef.current != null) cancelAnimationFrame(boundWatchRef.current);
    },
    [],
  );

  useEffect(() => {
    if (lesson) setCurrentLesson(lesson.slug, step);
  }, [lesson, step]);

  if (!lesson) {
    return (
      <div className="p-4">
        <p className="text-[13px] text-neutral-600">Lesson not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/listen-a-minute")}>
          All topics
        </button>
      </div>
    );
  }

  function stopBoundWatch() {
    if (boundWatchRef.current != null) {
      cancelAnimationFrame(boundWatchRef.current);
      boundWatchRef.current = null;
    }
  }

  // timeupdate only fires a few times a second, which let playback bleed ~0.5s
  // past a sentence's end before the check ran — requestAnimationFrame checks the
  // bound every frame instead, so playback stops right at the boundary.
  function watchBound() {
    const el = audioRef.current;
    if (!el) return;
    if (boundEndRef.current != null && el.currentTime >= boundEndRef.current) {
      el.pause();
      boundEndRef.current = null;
      boundWatchRef.current = null;
      return;
    }
    boundWatchRef.current = requestAnimationFrame(watchBound);
  }

  function playSentence(i: number) {
    const el = audioRef.current;
    const sentence = lesson!.sentences[i];
    if (!el || !sentence) return;
    stopBoundWatch();
    boundEndRef.current = sentence.end;
    const gen = ++playGenRef.current;
    // wait for the seek to actually land before playing — starting playback in the
    // same tick as setting currentTime can begin a beat before the seek settles,
    // clipping the first word or two of the sentence.
    const onSeeked = () => {
      el.removeEventListener("seeked", onSeeked);
      if (playGenRef.current !== gen) return;
      el.play();
      boundWatchRef.current = requestAnimationFrame(watchBound);
    };
    el.addEventListener("seeked", onSeeked);
    el.currentTime = sentence.start;
  }

  function onAudioTimeUpdate() {
    const el = audioRef.current;
    if (!el) return;
    const t = el.currentTime;
    setActiveSentence(lesson!.sentences.findIndex((s) => t >= s.start && t < s.end));
  }

  function goBack() {
    audioRef.current?.pause();
    if (step === 1) {
      router.push("/modules/listen-a-minute");
      return;
    }
    setStep((s) => s - 1);
  }

  function finish() {
    grade(lesson!.slug, true);
    clearCurrentLesson(lesson!.slug);
    router.push("/modules/listen-a-minute");
  }

  const gapCorrect = gapInputs.filter((v, i) => norm(v) === norm(blankAnswers[i])).length;
  const spellCorrect = spellInputs.filter((v, i) => norm(v) === norm(lesson.spellingWords[i])).length;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="divider-b flex items-center gap-3 px-4 py-3">
        <button onClick={goBack} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
          <BackIcon />
        </button>
        <div className="h-1.5 flex-1 bg-neutral-300">
          <div className="h-full bg-accent" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
        <span className="w-9 flex-none text-right text-[11px] tabular-nums text-neutral-600">
          {step}/{TOTAL_STEPS}
        </span>
      </div>
      <div className="label-xs px-4 pt-3 text-accent">
        {lesson.title} · Step {step}: {STEP_LABELS[step - 1]}
      </div>

      {step === 1 && (
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-4 flex flex-col items-center gap-3 bg-surface px-4 py-8">
            <audio
              ref={audioRef}
              src={lesson.audioUrl}
              onPlay={() => setPlaying(true)}
              onPause={() => {
                setPlaying(false);
                stopBoundWatch();
              }}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={onAudioTimeUpdate}
            />
            <button
              className="btn btn-primary flex h-[72px] w-[72px] items-center justify-center p-0"
              onClick={() => {
                const el = audioRef.current;
                if (!el) return;
                if (el.paused) {
                  boundEndRef.current = null;
                  playGenRef.current++;
                  stopBoundWatch();
                  el.play();
                } else {
                  el.pause();
                }
              }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <SpeakerIcon />}
            </button>
            <div className="label-xs">{playing ? "Playing…" : "Tap to listen"}</div>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowScript((v) => !v)}>
            {showScript ? "Hide script" : "Show script"}
          </button>
          {showScript && lesson.sentences.length > 0 && (
            <div className="mt-3 flex flex-col gap-px bg-[color:var(--color-divider)] text-[14px] leading-relaxed">
              {lesson.sentences.map((s, i) => (
                <button
                  key={i}
                  onClick={() => playSentence(i)}
                  className="px-4 py-2.5 text-left"
                  style={{
                    background: i === activeSentence ? "var(--color-accent-100)" : "var(--color-surface)",
                    color: i === activeSentence ? "var(--color-accent-800)" : "var(--color-text)",
                  }}
                >
                  {s.text}
                </button>
              ))}
            </div>
          )}
          {showScript && lesson.sentences.length === 0 && (
            <div className="mt-3 bg-surface p-4 text-[14px] leading-relaxed">
              {renderClozePlain(lesson.clozeTemplate)}
            </div>
          )}
          <button
            className="btn btn-primary btn-block mt-auto px-4 py-3"
            onClick={() => {
              audioRef.current?.pause();
              setStep(2);
            }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-4 bg-surface p-4 text-[16px] leading-loose text-pretty">
            {segments.map((s, i) => {
              if ("text" in s) return <span key={i}>{s.text}</span>;
              const idx = blankIndexBySegment[i];
              const ok = gapSubmitted && norm(gapInputs[idx]) === norm(blankAnswers[idx]);
              return (
                <input
                  key={i}
                  className="input mx-1 inline-block w-[104px]"
                  style={{
                    display: "inline-block",
                    borderColor: gapSubmitted ? (ok ? "var(--color-text)" : "var(--color-accent)") : undefined,
                  }}
                  disabled={gapSubmitted}
                  value={gapInputs[idx]}
                  onChange={(e) => {
                    const next = [...gapInputs];
                    next[idx] = e.target.value;
                    setGapInputs(next);
                  }}
                  placeholder="..."
                />
              );
            })}
          </div>
          {gapSubmitted ? (
            <>
              <div className="mb-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
                <span className="label-xs mb-0.5 block">Score</span>
                <span className="font-extrabold">
                  {gapCorrect}/{blankAnswers.length} correct
                </span>
              </div>
              <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setStep(3)}>
                Continue
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setGapSubmitted(true)}>
              Check
            </button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 text-[13px] text-neutral-700">
            Unscramble the letters to spell each word correctly.
          </div>
          {lesson.spellingWords.map((word, i) => {
            const ok = spellSubmitted && norm(spellInputs[i]) === norm(word);
            const bad = spellSubmitted && !ok;
            return (
              <div key={i} className="mb-3">
                <div className="label-xs mb-1 tracking-widest">{scrambled[i].toUpperCase()}</div>
                <input
                  className="input"
                  style={{ borderColor: bad ? "var(--color-accent)" : ok ? "var(--color-text)" : undefined }}
                  disabled={spellSubmitted}
                  value={spellInputs[i]}
                  onChange={(e) => {
                    const next = [...spellInputs];
                    next[i] = e.target.value;
                    setSpellInputs(next);
                  }}
                  placeholder="Type the correct spelling"
                />
                {bad && (
                  <div className="mt-1 text-[12px] text-accent-700">
                    Answer: <span className="font-extrabold">{word}</span>
                  </div>
                )}
              </div>
            );
          })}
          {spellSubmitted ? (
            <>
              <div className="mb-3 bg-accent-100 px-4 py-3 text-[13px] leading-relaxed text-accent-800">
                <span className="label-xs mb-0.5 block">Score</span>
                <span className="font-extrabold">
                  {spellCorrect}/{lesson.spellingWords.length} correct
                </span>
              </div>
              <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setStep(4)}>
                Continue
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={() => setSpellSubmitted(true)}>
              Check
            </button>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-3 text-[13px] text-neutral-700">
            Extend what you have learned with these follow-up tasks.
          </div>
          {tasks.map((t) => (
            <label key={t.key} className="divider-b flex items-start gap-3 py-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 flex-none accent-[var(--color-accent)]"
                checked={!!checked[t.key]}
                onChange={(e) => setChecked((c) => ({ ...c, [t.key]: e.target.checked }))}
              />
              <span className="text-[13px] leading-relaxed">{t.label}</span>
            </label>
          ))}
          <button className="btn btn-primary btn-block mt-auto px-4 py-3" onClick={finish}>
            Finish lesson
          </button>
        </div>
      )}
    </div>
  );
}
