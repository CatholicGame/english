"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  extensionLanguageNotes,
  extensionSample,
  extensionTasks,
  LISTEN_LESSONS,
  type ListenLesson,
} from "@/data/listen-a-minute";
import { NotesList } from "@/components/NotesList";
import { buildClozeTemplate, parseCloze, renderClozePlain, tokenizeWords } from "@/lib/cloze";
import { clearCurrentLesson, getCurrentLesson, setCurrentLesson } from "@/lib/listen-progress";
import { useListenCustomClozeStore } from "@/lib/use-listen-custom-cloze-store";
import { useProgress } from "@/lib/progress-context";
import { norm, shuffle } from "@/lib/utils";
import { lookupVocabWord, type VocabEntry } from "@/lib/vocab-lookup";
import { useAiConvoStore } from "@/lib/use-ai-convo-store";
import type { AiConversation, AiMessage } from "@/lib/ai-convo-store";
import { addGlobalXP } from "@/lib/global-score";
import { currentAiLang } from "@/lib/ai-lang-prefs";
import { useUiLang } from "@/lib/i18n";
import { AiFeedback } from "@/components/AiFeedback";
import { AiConversationHistory } from "@/components/AiConversationHistory";
import { ChatInput } from "@/components/ChatInput";
import { ConversationFeedback } from "@/components/ConversationFeedback";
import { createShareLink } from "@/lib/share-client";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { useSubscriptionStore } from "@/lib/use-subscription-store";
import { isListenLessonLocked } from "@/lib/content-access";
import { ProPaywallNotice } from "@/components/ProPaywallNotice";

const MODULE_KEY = "listen-a-minute";
const TOTAL_STEPS = 4;
const STEP_LABELS = ["Listening", "Gap fill", "Spelling", "Extension"];
// Every lesson's audio has ~2.5s of lead-in before the actual content starts
// — skip straight past it whenever playback starts fresh (or restarts after
// finishing), rather than making the learner sit through it every time.
const INTRO_SKIP_SECONDS = 2.5;

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

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4"
    >
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function SpeakerIcon({ className = "block h-[34px] w-[34px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a7 7 0 0 1 0 14.14" />
    </svg>
  );
}

function PauseIcon({ className = "block h-[34px] w-[34px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function formatTime(t: number): string {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VocabList({ lesson }: { lesson: ListenLesson }) {
  const [entries, setEntries] = useState<(VocabEntry | null)[]>(() => lesson.spellingWords.map(() => null));

  useEffect(() => {
    let cancelled = false;
    lesson.spellingWords.forEach((w, i) => {
      lookupVocabWord(w, lesson).then((entry) => {
        if (cancelled) return;
        setEntries((prev) => prev.map((e, j) => (j === i ? entry : e)));
      });
    });
    return () => {
      cancelled = true;
    };
  }, [lesson]);

  return (
    <div className="flex flex-col gap-5">
      {entries.map((e, i) =>
        !e ? (
          <div key={i} className="divider-b pb-4 text-[15px] text-neutral-500 last:border-b-0">
            {lesson.spellingWords[i]} — đang tra từ điển…
          </div>
        ) : (
        <div key={i} className="divider-b pb-4 last:border-b-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[18px] font-extrabold">{e.word}</span>
            {e.phonetic && <span className="text-[15px] text-neutral-600">{e.phonetic}</span>}
            {e.partOfSpeech && <span className="text-[14px] italic text-neutral-600">{e.partOfSpeech}</span>}
          </div>
          {e.definition && <div className="mt-1.5 text-[15px] leading-relaxed">{e.definition}</div>}
          {e.vi && (
            <div className="mt-1.5 text-[15px] leading-relaxed text-accent-700">
              <span className="font-extrabold">Nghĩa: </span>
              {e.vi}
            </div>
          )}
          {e.contextSentence ? (
            <div className="mt-2 bg-surface p-2.5 text-[15px] leading-relaxed">
              <span className="label-xs mb-1 block">Ví dụ trong bài</span>
              <span className="italic">&ldquo;{e.contextSentence}&rdquo;</span>
              {e.contextSentenceVi && <div className="mt-0.5 text-neutral-600">→ {e.contextSentenceVi}</div>}
            </div>
          ) : (
            e.dictExample && (
              <div className="mt-2 bg-surface p-2.5 text-[15px] leading-relaxed">
                <span className="label-xs mb-1 block">Ví dụ</span>
                <span className="italic">&ldquo;{e.dictExample}&rdquo;</span>
              </div>
            )
          )}
          {!e.found && (
            <div className="mt-1.5 text-[14px] text-neutral-500">Không tra được nghĩa cho từ này.</div>
          )}
        </div>
        ),
      )}
    </div>
  );
}

// AI discussion partner for the lesson's topic — same shared "discussion" intent
// used by the other AI-practice modules (collocations/phrasal verbs, Cambridge
// IELTS advanced), reusing ConversationFeedback/AiConversationHistory so history
// rendering never drifts from the live view.
function LessonDiscussion({ lesson }: { lesson: ListenLesson }) {
  const { t } = useUiLang();
  const { appendMessages } = useAiConvoStore(MODULE_KEY);
  const [chat, setChat] = useState<AiMessage[]>([]);
  const [phase, setPhase] = useState<"practicing" | "feedback">("practicing");
  const [feedback, setFeedback] = useState<Record<string, unknown> | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [chatIn, setChatIn] = useState("");
  const [busy, setBusy] = useState<"send" | "end" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const topic = lesson.title;
  const ik = lesson.slug;
  const il = lesson.title;

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  async function callAi(payload: Record<string, unknown>) {
    const r = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "discussion", payload: { ...payload, aiLang: currentAiLang() } }),
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "AI failed");
    return j.data;
  }

  async function sendMessage() {
    if (!chatIn.trim()) return;
    const um: AiMessage = { role: "user", content: chatIn.trim(), timestamp: Date.now() };
    const nm = [...chat, um]; setChat(nm); setChatIn(""); setError(null);
    setBusy("send"); setLoading(true);
    try {
      const ct = nm.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const d = await callAi({ topic, history: ct });
      const aiText = ((d?.content as string | undefined) ?? "")
        .replace(/\n*```json[\s\S]*?```\n*/g, "")
        .replace(/\n*\{[\s\S]*"summary"[\s\S]*\}\n*$/g, "")
        .trim();
      const am: AiMessage = { role: "assistant", content: aiText, timestamp: Date.now() };
      setChat([...nm, am]);
      const newCid = appendMessages(ik, il, cid, "discussion", [um, am]);
      if (!cid) setCid(newCid);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setBusy(null); setLoading(false);
    }
  }

  async function endDiscussion() {
    setBusy("end"); setLoading(true); setError(null);
    try {
      const ct = chat.map((m) => `${m.role === "user" ? "Student" : "Partner"}: ${m.content}`).join("\n");
      const d = (await callAi({ topic, history: ct, end: true })) as Record<string, unknown>;
      const xpEarned = d?.wellDone ? 20 : 8;
      const enriched = { ...d, xpEarned };
      setFeedback(enriched); setPhase("feedback");
      addGlobalXP(xpEarned);
      appendMessages(ik, il, cid, "discussion", [{ role: "assistant", content: JSON.stringify(enriched), timestamp: Date.now() }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI failed");
    } finally {
      setBusy(null); setLoading(false);
    }
  }

  const handleContinue = useCallback((convo: AiConversation) => {
    setCid(convo.id);
    setPhase("practicing");
    setFeedback(null);
    setChat(convo.messages.filter((m) => m.role === "user" || m.role === "assistant"));
  }, []);

  return (
    <div className="mt-2 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
      <div className="label-xs mb-2 text-accent">🗣️ Discuss with AI</div>

      {phase === "practicing" && (
        <div className="flex flex-col gap-3">
          {chat.length === 0 && (
            <p className="text-[14px] text-neutral-600">
              {t("discussion.prompt", { term: lesson.title })}
            </p>
          )}
          <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto rounded border p-3" style={{ borderColor: "var(--color-divider)" }}>
            {chat.map((m, i) => (
              <div key={i} className="rounded p-2.5 text-[15px] leading-relaxed"
                style={{ background: m.role === "user" ? "var(--color-accent-100)" : "var(--color-surface)", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                <span className="label-xs mb-0.5 block">{m.role === "user" ? "You" : "Partner"}</span>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
            {busy === "send" && (
              <div className="rounded p-2.5" style={{ background: "var(--color-surface)", alignSelf: "flex-start" }}>
                <span className="label-xs mb-1 block">Partner</span>
                <span className="inline-flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {busy === "end" ? (
            <div className="flex items-center justify-center gap-2 rounded border p-3 text-[14px] text-neutral-600" style={{ borderColor: "var(--color-divider)" }}>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Analyzing your discussion...
            </div>
          ) : (
            <div className="flex items-end gap-2">
              <ChatInput value={chatIn} onChange={setChatIn} onSend={sendMessage} disabled={loading || !chatIn.trim()} />
              <button className="btn btn-primary px-3 py-2.5 text-[15px] font-extrabold disabled:opacity-40" disabled={loading || !chatIn.trim()} onClick={sendMessage}>Send</button>
              <button className="btn btn-ghost px-3 py-2.5 text-[14px]" disabled={loading || !chat.some((m) => m.role === "user")} onClick={endDiscussion}>End</button>
            </div>
          )}
        </div>
      )}

      {phase === "feedback" && feedback && (
        <ConversationFeedback
          messages={chat}
          feedback={feedback}
          onReset={() => { setPhase("practicing"); setFeedback(null); setChat([]); setCid(null); }}
          share={{
            title: lesson.title,
            text: `🗣️ Discussion · ${lesson.title}`,
            getUrl: () => {
              const payload: SharedConvoPayload = {
                kind: "conversation",
                itemLabel: lesson.title,
                intent: "discussion",
                messages: chat,
                feedback,
                sharedAt: Date.now(),
              };
              return createShareLink(payload);
            },
            getImageUrl: (url) => `${url}/card`,
          }}
        />
      )}
      {error && <AiFeedback loading={false} result={null} error={error} variant="general" />}

      <AiConversationHistory
        moduleKey={MODULE_KEY}
        itemKey={lesson.slug}
        filterIntent="discussion"
        onContinue={handleContinue}
        activeConvoId={phase === "practicing" ? cid : null}
      />
    </div>
  );
}

export function LessonClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { grade } = useProgress();
  const { isUnlocked } = useSubscriptionStore();
  const lesson = useMemo(() => LISTEN_LESSONS.find((l) => l.slug === slug), [slug]);

  const [step, setStep] = useState(() => {
    const cur = getCurrentLesson();
    return cur && cur.slug === slug && cur.step >= 1 && cur.step <= TOTAL_STEPS ? cur.step : 1;
  });
  const [showStepList, setShowStepList] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSentence, setActiveSentence] = useState(-1);
  const boundEndRef = useRef<number | null>(null);
  const boundWatchRef = useRef<number | null>(null);
  const playGenRef = useRef(0);
  // Gap-fill: pause while a blank is focused, resume after — but only if we're
  // the ones who paused it (not if the learner had already paused manually),
  // and only once focus actually leaves the whole gap-fill group (tabbing
  // straight from one blank to the next shouldn't blip the audio back on).
  const pausedForGapRef = useRef(false);

  // Learner's own "which words to blank out" pick, alongside the
  // author-authored default cloze — see listen-custom-cloze-store.ts.
  const { getEntry, saveHiddenWords, clearEntry } = useListenCustomClozeStore();
  const customEntry = getEntry(slug);
  const hasCustomCloze = !!customEntry && customEntry.hiddenWords.length > 0;
  const [clozeVersion, setClozeVersion] = useState<"default" | "custom">("default");
  const [pickerMode, setPickerMode] = useState(false);
  const [pickedWords, setPickedWords] = useState<Set<number>>(new Set());

  const plainText = useMemo(() => (lesson ? renderClozePlain(lesson.clozeTemplate) : ""), [lesson]);
  const activeTemplate = useMemo(() => {
    if (!lesson) return "";
    if (clozeVersion === "custom" && customEntry) {
      return buildClozeTemplate(plainText, new Set(customEntry.hiddenWords));
    }
    return lesson.clozeTemplate;
  }, [lesson, plainText, clozeVersion, customEntry]);

  const segments = useMemo(() => (lesson ? parseCloze(activeTemplate) : []), [lesson, activeTemplate]);
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

  // Switching between the default and personal cloze changes which/how many
  // blanks exist — start that version fresh rather than keeping stale answers.
  // Done as a direct action (not a useEffect reacting to clozeVersion) so the
  // reset happens in the same event as the switch, not a follow-up render.
  function changeClozeVersion(v: "default" | "custom") {
    const template =
      v === "custom" && customEntry ? buildClozeTemplate(plainText, new Set(customEntry.hiddenWords)) : lesson?.clozeTemplate ?? "";
    const blankCount = parseCloze(template).filter((s) => "blank" in s).length;
    setGapInputs(Array(blankCount).fill(""));
    setGapSubmitted(false);
    setClozeVersion(v);
  }

  function openPicker() {
    setPickedWords(new Set(customEntry?.hiddenWords ?? []));
    setPickerMode(true);
  }

  // Word picker: tap toggles one word; press-and-drag across several words
  // applies the same toggle direction to all of them in one gesture (like
  // dragging to select/deselect a range of checkboxes) — the direction is
  // decided once, from the first word touched, so a drag started on a picked
  // word erases the range and a drag started on an unpicked word fills it in.
  const dragRef = useRef<{ active: boolean; mode: "add" | "remove" } | null>(null);

  function applyPick(wordIndex: number, mode: "add" | "remove") {
    setPickedWords((prev) => {
      const has = prev.has(wordIndex);
      if ((mode === "add") === has) return prev;
      const next = new Set(prev);
      if (mode === "add") next.add(wordIndex);
      else next.delete(wordIndex);
      return next;
    });
  }

  function startWordDrag(wordIndex: number) {
    const mode: "add" | "remove" = pickedWords.has(wordIndex) ? "remove" : "add";
    dragRef.current = { active: true, mode };
    applyPick(wordIndex, mode);
  }

  function dragOverWord(wordIndex: number) {
    if (dragRef.current?.active) applyPick(wordIndex, dragRef.current.mode);
  }

  useEffect(() => {
    if (!pickerMode) return;
    function endDrag() {
      dragRef.current = null;
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragRef.current?.active) return;
      const touch = e.touches[0];
      if (!touch) return;
      e.preventDefault();
      const el = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
      const idxAttr = el?.closest("[data-word-index]")?.getAttribute("data-word-index");
      if (idxAttr != null) dragOverWord(Number(idxAttr));
    }
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
    document.addEventListener("touchcancel", endDrag);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
      document.removeEventListener("touchcancel", endDrag);
      document.removeEventListener("touchmove", onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerMode]);

  function saveCustomCloze() {
    saveHiddenWords(slug, [...pickedWords]);
    changeClozeVersion("custom");
    setPickerMode(false);
  }

  function deleteCustomCloze() {
    clearEntry(slug);
    if (clozeVersion === "custom") changeClozeVersion("default");
    setPickerMode(false);
  }

  const scrambled = useMemo(
    () => (lesson ? lesson.spellingWords.map(scrambleWord) : []),
    [lesson],
  );
  const [spellInputs, setSpellInputs] = useState<string[]>(() => (lesson ? lesson.spellingWords.map(() => "") : []));
  const [spellSubmitted, setSpellSubmitted] = useState(false);

  const tasks = useMemo(() => (lesson ? extensionTasks(lesson.title) : []), [lesson]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [sampleKey, setSampleKey] = useState<string | null>(null);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      if (boundWatchRef.current != null) clearInterval(boundWatchRef.current);
    },
    [],
  );

  useEffect(() => {
    if (lesson) setCurrentLesson(lesson.slug, step);
  }, [lesson, step]);

  if (!lesson) {
    return (
      <div className="p-4">
        <p className="text-[15px] text-neutral-600">Lesson not found.</p>
        <button className="btn btn-ghost mt-3" onClick={() => router.push("/modules/listen-a-minute")}>
          All topics
        </button>
      </div>
    );
  }

  if (isListenLessonLocked(lesson.slug, isUnlocked)) {
    return <ProPaywallNotice what={`Bài "${lesson.title}"`} />;
  }

  function stopBoundWatch() {
    if (boundWatchRef.current != null) {
      clearInterval(boundWatchRef.current);
      boundWatchRef.current = null;
    }
  }

  // requestAnimationFrame seemed like the precise choice, but mobile browsers
  // suspend/throttle rAF once the tab isn't actively painting (backgrounded, screen
  // dimmed, low-power mode…) while the <audio> element keeps playing regardless —
  // so the bound was silently never checked and sentences ran past their end on
  // phones. setInterval keeps firing in those cases; onAudioTimeUpdate below is a
  // second, independent backstop tied to the media clock rather than rendering.
  function checkBound() {
    const el = audioRef.current;
    if (!el) return;
    if (boundEndRef.current != null && el.currentTime >= boundEndRef.current) {
      el.pause();
      boundEndRef.current = null;
      stopBoundWatch();
    }
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
      boundWatchRef.current = window.setInterval(checkBound, 50);
    };
    el.addEventListener("seeked", onSeeked);
    el.currentTime = sentence.start;
  }

  function onAudioTimeUpdate() {
    const el = audioRef.current;
    if (!el) return;
    checkBound();
    const t = el.currentTime;
    setCurrentTime(t);
    setActiveSentence(lesson!.sentences.findIndex((s) => t >= s.start && t < s.end));
  }

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      if (el.ended) el.currentTime = 0;
      if (el.currentTime < INTRO_SKIP_SECONDS) el.currentTime = INTRO_SKIP_SECONDS;
      boundEndRef.current = null;
      playGenRef.current++;
      stopBoundWatch();
      el.play();
    } else {
      el.pause();
    }
  }

  function seekTo(t: number) {
    const el = audioRef.current;
    if (!el) return;
    boundEndRef.current = null;
    playGenRef.current++;
    stopBoundWatch();
    el.currentTime = t;
    setCurrentTime(t);
  }

  function handleGapFocus() {
    const el = audioRef.current;
    if (el && !el.paused) {
      el.pause();
      pausedForGapRef.current = true;
    }
  }

  function handleGapBlur() {
    // Defer so the newly-focused element (if any) is already active by the
    // time we check it.
    setTimeout(() => {
      const stillInGapFill = (document.activeElement as HTMLElement | null)?.dataset.gapInput === "true";
      if (stillInGapFill) return;
      if (pausedForGapRef.current) {
        audioRef.current?.play();
        pausedForGapRef.current = false;
      }
    }, 0);
  }

  function goBack() {
    audioRef.current?.pause();
    if (step === 1) {
      router.push("/modules/listen-a-minute");
      return;
    }
    setStep((s) => s - 1);
  }

  // Unrestricted jump, like the exercise menu in the Cambridge Vocabulary
  // module — no completion gating, since re-visiting an earlier step (or
  // skipping ahead) is a legitimate way to use this lesson, not a cheat.
  function jumpToStep(target: number) {
    audioRef.current?.pause();
    setStep(target);
    setShowStepList(false);
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
      {/* Sticky right below AppHeader (h-12) — top-0 would collide with it,
          since AppHeader is also sticky top-0 with a higher z-index and would
          render on top of (hiding) this block once scrolled. */}
      <div className="sticky top-12 z-30 bg-bg">
        <div className="divider-b flex items-center gap-3 px-4 py-3">
          <button onClick={goBack} className="relative h-[18px] w-[18px] flex-none text-neutral-600 hover:text-accent">
            <BackIcon />
          </button>
          <div className="h-1.5 flex-1 bg-neutral-300">
            <div className="h-full bg-accent" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
          <button
            className="flex flex-none items-center gap-1 text-[13px] tabular-nums text-neutral-600 hover:text-accent"
            onClick={() => setShowStepList(true)}
            aria-label="Jump to step"
          >
            <ListIcon />
            {step}/{TOTAL_STEPS}
          </button>
        </div>
        <div className="label-xs px-4 pt-3 text-accent">
          {lesson.title} · Step {step}: {STEP_LABELS[step - 1]}
        </div>

        {showStepList && (
          <div className="fixed inset-0 z-[60] bg-bg">
            <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[1080px]">
              <div className="divider-b flex items-center justify-between px-4 py-3">
                <span className="text-[18px] font-extrabold">Steps in this lesson</span>
                <button className="btn btn-ghost" onClick={() => setShowStepList(false)}>
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {STEP_LABELS.map((label, i) => {
                  const target = i + 1;
                  return (
                    <button
                      key={label}
                      onClick={() => jumpToStep(target)}
                      className="divider-b flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface"
                      style={target === step ? { background: "var(--color-accent-100)" } : undefined}
                    >
                      <span className="label-xs w-6 flex-none text-neutral-600">{target}</span>
                      <span className="flex-1 text-[16px] font-extrabold">{label}</span>
                      {target < step && <span className="label-xs text-accent">Done</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <audio
          ref={audioRef}
          src={lesson.audioUrl}
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            stopBoundWatch();
          }}
          onEnded={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={onAudioTimeUpdate}
        />
        <div className="divider-b flex items-center gap-3 px-4 py-2.5">
          <button
            className="flex h-8 w-8 flex-none items-center justify-center text-accent"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <PauseIcon className="block h-5 w-5" /> : <SpeakerIcon className="block h-5 w-5" />}
          </button>
          <span className="w-8 flex-none text-right text-[13px] tabular-nums text-neutral-600">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="h-1 flex-1 accent-[var(--color-accent)]"
            aria-label="Seek audio"
          />
          <span className="w-8 flex-none text-[13px] tabular-nums text-neutral-600">{formatTime(duration)}</span>
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-1 flex-col p-4 pb-[96px]">
          {/* No separate play button here — the persistent scrubber bar above
              (sticky under the header, visible on every step) already covers
              play/pause plus seeking, so a second big "Tap to listen" control
              here was pure duplication. */}
          <div className="lg:mx-auto lg:w-full lg:max-w-[1080px]">
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-secondary lg:hidden" onClick={() => setShowScript((v) => !v)}>
                  {showScript ? "Hide script" : "Show script"}
                </button>
                {/* On mobile this group only appears once the script is shown/being
                    picked (showScript toggle above is lg:hidden). On desktop the
                    script is unconditionally visible (`lg:block` further down),
                    but showScript itself never becomes true there since its only
                    toggle button doesn't render at that breakpoint — `lg:contents`
                    keeps this group visible on desktop regardless, instead of it
                    being permanently unreachable (bug: "Tạo bài fill" never showed
                    on desktop since showScript could never flip true). */}
                <div className={showScript || pickerMode ? "contents" : "hidden lg:contents"}>
                  {pickerMode ? (
                    <>
                      <button className="btn btn-primary px-3 py-1.5 text-[14px]" onClick={saveCustomCloze}>
                        Lưu ({pickedWords.size} từ)
                      </button>
                      <button className="btn btn-ghost px-3 py-1.5 text-[14px]" onClick={() => setPickerMode(false)}>
                        Huỷ
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-ghost px-3 py-1.5 text-[14px]" onClick={openPicker}>
                      ✂️ Tạo bài fill của tôi
                    </button>
                  )}
                </div>
                {!pickerMode && hasCustomCloze && (
                  <button className="btn btn-ghost px-3 py-1.5 text-[14px] text-accent-700" onClick={deleteCustomCloze}>
                    Xoá bản của tôi
                  </button>
                )}
              </div>

              {pickerMode ? (
                <div className="mt-3 bg-surface p-4 text-[17px] leading-[2] text-pretty select-none" style={{ touchAction: "pan-y" }}>
                  <p className="label-xs mb-2">Chạm hoặc kéo qua các từ bạn muốn ẩn đi để tự luyện fill-in-the-blank:</p>
                  {tokenizeWords(plainText).map((t, i) =>
                    t.wordIndex === null ? (
                      <span key={i}>{t.text}</span>
                    ) : (
                      <button
                        key={i}
                        type="button"
                        data-word-index={t.wordIndex}
                        onMouseDown={() => startWordDrag(t.wordIndex!)}
                        onMouseEnter={() => dragOverWord(t.wordIndex!)}
                        onTouchStart={() => startWordDrag(t.wordIndex!)}
                        className="inline rounded px-0.5"
                        style={
                          pickedWords.has(t.wordIndex)
                            ? { background: "var(--color-accent)", color: "#fff" }
                            : undefined
                        }
                      >
                        {t.text}
                      </button>
                    ),
                  )}
                </div>
              ) : (
                <>
                  {lesson.sentences.length > 0 && (
                    <div className={`mt-3 lg:mt-0 lg:block ${showScript ? "block" : "hidden"}`}>
                      {lesson.sentences.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => playSentence(i)}
                          className="divider-b block w-full px-4 py-2.5 text-left text-[17px] leading-relaxed"
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
                  {lesson.sentences.length === 0 && (
                    <div
                      className={`mt-3 bg-surface p-4 text-[17px] leading-relaxed lg:mt-0 lg:block ${showScript ? "block" : "hidden"}`}
                    >
                      {renderClozePlain(lesson.clozeTemplate)}
                    </div>
                  )}
                </>
              )}
          </div>
          <div className="fixed inset-x-0 bottom-0 bg-bg">
            <div className="divider-t mx-auto max-w-[480px] p-4 lg:max-w-[1080px]">
              <button
                className="btn btn-primary btn-block px-4 py-3"
                onClick={() => {
                  audioRef.current?.pause();
                  setStep(2);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
        <div className="flex flex-1 flex-col p-4 pb-[96px]">
          {hasCustomCloze && (
            <div className="mb-3 flex gap-1.5 lg:mx-auto lg:w-full lg:max-w-[1080px]">
              {(["default", "custom"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => changeClozeVersion(v)}
                  className="flex-1 px-3 py-1.5 text-[14px] font-extrabold tracking-wide uppercase"
                  style={{
                    background: clozeVersion === v ? "var(--color-ink)" : "var(--color-bg)",
                    color: clozeVersion === v ? "var(--color-bg)" : "var(--color-ink)",
                    border: "1px solid var(--color-divider)",
                  }}
                >
                  {v === "default" ? "Mặc định" : "Của tôi"}
                </button>
              ))}
            </div>
          )}
          <div className="mb-4 bg-surface p-4 text-[18px] leading-[2.75] text-pretty lg:mx-auto lg:max-w-[1080px]">
            {segments.map((s, i) => {
              if ("text" in s) return <span key={i}>{s.text}</span>;
              const idx = blankIndexBySegment[i];
              const ok = gapSubmitted && norm(gapInputs[idx]) === norm(blankAnswers[idx]);
              return (
                <input
                  key={i}
                  data-gap-input="true"
                  className="input mx-1 my-1.5 inline-block w-[104px]"
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
                  onFocus={handleGapFocus}
                  onBlur={handleGapBlur}
                  placeholder="..."
                />
              );
            })}
          </div>
          {gapSubmitted && (
            <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
              <span className="label-xs mb-0.5 block">Score</span>
              <span className="font-extrabold">
                {gapCorrect}/{blankAnswers.length} correct
              </span>
            </div>
          )}
        </div>
        <div className="fixed inset-x-0 bottom-0 bg-bg">
          <div className="divider-t mx-auto max-w-[480px] p-4 lg:max-w-[1080px]">
            {gapSubmitted ? (
              <div className="flex gap-3">
                <button className="btn btn-secondary flex-1 px-4 py-3" onClick={() => setGapSubmitted(false)}>
                  Redo
                </button>
                <button className="btn btn-primary flex-1 px-4 py-3" onClick={() => setStep(3)}>
                  Continue
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-block px-4 py-3" onClick={() => setGapSubmitted(true)}>
                Check
              </button>
            )}
          </div>
        </div>
        </>
      )}

      {step === 3 && (
        <div className="flex flex-1 flex-col p-4 pb-[96px]">
          <div className="mb-2 text-[15px] text-neutral-700">
            Unscramble the letters to spell each word correctly.
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
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
                    <div className="mt-1 text-[14px] text-accent-700">
                      Answer: <span className="font-extrabold">{word}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {spellSubmitted && (
            <div className="mb-3 bg-accent-100 px-4 py-3 text-[15px] leading-relaxed text-accent-800">
              <span className="label-xs mb-0.5 block">Score</span>
              <span className="font-extrabold">
                {spellCorrect}/{lesson.spellingWords.length} correct
              </span>
            </div>
          )}
          <div className="fixed inset-x-0 bottom-0 bg-bg">
            <div className="divider-t mx-auto max-w-[480px] p-4 lg:max-w-[1080px]">
              {spellSubmitted ? (
                <button className="btn btn-primary btn-block px-4 py-3" onClick={() => setStep(4)}>
                  Continue
                </button>
              ) : (
                <button className="btn btn-primary btn-block px-4 py-3" onClick={() => setSpellSubmitted(true)}>
                  Check
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-1 flex-col p-4 pb-[96px]">
          <div className="mb-3 text-[15px] text-neutral-700">
            Extend what you have learned with these follow-up tasks.
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
            {tasks.map((t) => (
              <div key={t.key} className="divider-b py-3">
                <div className="flex items-start gap-3">
                  <label className="flex flex-1 items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 flex-none accent-[var(--color-accent)]"
                      checked={!!checked[t.key]}
                      onChange={(e) => setChecked((c) => ({ ...c, [t.key]: e.target.checked }))}
                    />
                    <span className="text-[15px] leading-relaxed">{t.label}</span>
                  </label>
                  <button
                    type="button"
                    className="btn btn-ghost flex-none self-start px-3 py-1 text-[14px]"
                    onClick={() => setSampleKey(t.key)}
                  >
                    Show
                  </button>
                </div>
                <NotesList moduleKey="listen-a-minute" itemKey={`${lesson.slug}:${t.key}`} />
              </div>
            ))}
          </div>
          <LessonDiscussion lesson={lesson} />
          <div className="fixed inset-x-0 bottom-0 bg-bg">
            <div className="divider-t mx-auto max-w-[480px] p-4 lg:max-w-[1080px]">
              <button className="btn btn-primary btn-block px-4 py-3" onClick={finish}>
                Finish lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {sampleKey && (
        <div className="fixed inset-0 z-[60] bg-bg">
          <div className="mx-auto flex h-full max-w-[480px] flex-col lg:max-w-[1080px]">
            <div className="divider-b flex items-center justify-between px-4 py-3">
              <span className="text-[18px] font-extrabold">{sampleKey === "vocab" ? "Từ vựng trong bài" : "Sample"}</span>
              <button className="btn btn-ghost" onClick={() => setSampleKey(null)}>
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sampleKey === "vocab" ? (
                <VocabList lesson={lesson} />
              ) : (
                <>
                  <div className="whitespace-pre-wrap text-[16px] leading-relaxed">
                    {extensionSample(sampleKey, lesson)}
                  </div>
                  {extensionLanguageNotes(sampleKey).length > 0 && (
                    <div className="divider-t mt-5 pt-4">
                      <div className="label-xs mb-2">Collocations, phrasal verbs & idioms</div>
                      <div className="flex flex-col gap-2.5">
                        {extensionLanguageNotes(sampleKey).map((n, i) => (
                          <div key={i} className="text-[15px] leading-relaxed">
                            <span className="font-extrabold">{n.phrase}</span>{" "}
                            <span className="text-[13px] italic text-neutral-600">({n.type})</span>
                            <span className="text-accent-700"> — {n.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
