#!/usr/bin/env node
// Builds src/data/listen-a-minute.ts (app content) from the raw per-letter JSON +
// audio produced by fetch-listen-a-minute.mjs. Audio itself is served from Vercel
// Blob (see scripts/upload-listen-a-minute-audio.mjs) rather than committed as a
// ~356MB public/ folder — each lesson's audioUrl comes from its `audioBlobUrl`.
//
// Each lesson's authentic passage has no pre-marked gaps, so this script picks ~7
// content words (length >= 5, not a stopword, one per even slice of the passage) and
// bakes them into a clozeTemplate as {{word}} markers — the same format `src/lib/cloze.ts`
// already parses. The first 5 chosen words double as the spelling-scramble words.
//
// Usage:
//   node scripts/generate-listen-a-minute-data.mjs [root]
//   root   Folder containing one subfolder per letter (default ./src/assets/listening_a_minute)
//
// Re-run this whenever the source assets change (e.g. a missing letter gets fetched),
// after scripts/upload-listen-a-minute-audio.mjs has uploaded any new/changed audio.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = process.argv[2] ? path.resolve(process.argv[2]) : path.join(REPO_ROOT, "src/assets/listening_a_minute");
const OUT_FILE = path.join(REPO_ROOT, "src/data/listen-a-minute.ts");
const BLANKS_PER_LESSON = 7;
const SPELLING_WORDS_PER_LESSON = 5;

const STOPWORDS = new Set(
  `a about above after again against all also am an and any are aren't as at be
  because been before being below between both but by can't cannot could couldn't
  did didn't do does doesn't doing don't down during each few for from further had
  hadn't has hasn't have haven't having he he'd he'll he's her here here's hers
  herself him himself his how how's i i'd i'll i'm i've if in into is isn't it
  it's its itself just let's me more most mustn't my myself no nor not now of off
  on once only or other ought our ours ourselves out over own same shan't she
  she'd she'll she's should shouldn't so some such than that that's the their
  theirs them themselves then there there's these they they'd they'll they're
  they've this those through to too under until up very was wasn't we we'd we'll
  we're we've were weren't what what's when when's where where's which while who
  who's whom why why's with won't would wouldn't you you'd you'll you're you've
  your yours yourself yourselves been being get gets got getting really quite
  still even much many every other another almost always never something someone
  anyone anything everyone everything nothing sometimes often usually maybe
  probably actually certainly perhaps like also though although because since
  while whether either neither instead rather quite pretty around towards
  within without upon per via`
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean),
);

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
}

const WORD_RE = /[A-Za-z][A-Za-z'-]*/g;

function pickBlanks(text, targetCount) {
  const tokens = [];
  let m;
  WORD_RE.lastIndex = 0;
  while ((m = WORD_RE.exec(text))) {
    tokens.push({ word: m[0], start: m.index, end: m.index + m[0].length });
  }
  if (tokens.length === 0) return [];

  const chunkSize = tokens.length / targetCount;
  const chosen = [];
  const usedWords = new Set();

  for (let c = 0; c < targetCount; c++) {
    const from = Math.floor(c * chunkSize);
    const to = c === targetCount - 1 ? tokens.length : Math.floor((c + 1) * chunkSize);
    let best = null;
    for (let i = Math.max(from, 1); i < to; i++) {
      const t = tokens[i];
      const lower = t.word.toLowerCase().replace(/[^a-z']/g, "");
      if (t.word.length < 5) continue;
      if (STOPWORDS.has(lower)) continue;
      if (usedWords.has(lower)) continue;
      if (!best || t.word.length > best.word.length) best = t;
    }
    if (best) {
      chosen.push(best);
      usedWords.add(best.word.toLowerCase().replace(/[^a-z']/g, ""));
    }
  }
  return chosen;
}

function buildClozeTemplate(text, chosen) {
  let out = text;
  for (const t of [...chosen].sort((a, b) => b.start - a.start)) {
    out = out.slice(0, t.start) + `{{${t.word}}}` + out.slice(t.end);
  }
  return out;
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

// Whisper's per-word timestamps trend a little late relative to the true audio, so
// tap-to-play-a-sentence clipped the first word or two and bled slightly past the
// last one. A fixed lead-in wasn't enough — it was capped at the *previous*
// sentence's un-padded end, so it often couldn't use most of the natural pause
// between sentences. Instead, chain each start to right after the previous
// sentence's own (already-padded) end, claiming nearly the whole gap as lead-in;
// only the very first sentence (no predecessor to anchor on) uses a fixed nudge.
const FIRST_SENTENCE_LEAD_IN = 0.15;
const GAP_BUFFER = 0.05;
const END_LEAD_OUT = 0.15;

function padSentenceTimings(sentences) {
  const out = [];
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const nextStart = i < sentences.length - 1 ? sentences[i + 1].start : s.end;
    const start =
      i === 0
        ? Math.max(0, s.start - FIRST_SENTENCE_LEAD_IN)
        : Math.max(0, Math.min(out[i - 1].end + GAP_BUFFER, s.start));
    const end = Math.max(start + 0.3, Math.min(s.end - END_LEAD_OUT, nextStart));
    out.push({ text: s.text, start: round2(start), end: round2(end) });
  }
  return out;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

const letters = readdirSync(root)
  .filter((f) => statSync(path.join(root, f)).isDirectory())
  .sort();

const allLessons = [];
let missingBlobUrl = 0;

for (const letter of letters) {
  const jsonPath = path.join(root, letter, `${letter}.json`);
  if (!existsSync(jsonPath)) continue;
  const data = JSON.parse(readFileSync(jsonPath, "utf8"));

  for (const lesson of data.lessons ?? []) {
    const text = decodeEntities(lesson.text).trim();
    const chosen = pickBlanks(text, BLANKS_PER_LESSON);

    if (!lesson.audioBlobUrl) {
      missingBlobUrl++;
      console.error(`missing audioBlobUrl for ${lesson.slug} — run scripts/upload-listen-a-minute-audio.mjs first`);
    }

    allLessons.push({
      letter,
      slug: lesson.slug,
      title: decodeEntities(lesson.title),
      audioUrl: lesson.audioBlobUrl ?? "",
      clozeTemplate: buildClozeTemplate(text, chosen),
      spellingWords: chosen.slice(0, SPELLING_WORDS_PER_LESSON).map((t) => t.word.toLowerCase()),
      sentences: padSentenceTimings(lesson.sentences ?? []),
    });
  }
}

const header = `// Auto-generated by scripts/generate-listen-a-minute-data.mjs from
// src/assets/listening_a_minute/*/*.json (the real "Listen A Minute" source texts +
// audio). Do not hand-edit — re-run that script if the source assets change.
// Each lesson's clozeTemplate blanks ~${BLANKS_PER_LESSON} content words out of the
// authentic passage (marked as {{word}}), spread evenly through the text.

export interface ListenSentence {
  text: string;
  start: number;
  end: number;
}

export interface ListenLesson {
  letter: string;
  slug: string;
  title: string;
  audioUrl: string;
  clozeTemplate: string;
  spellingWords: string[];
  /** Per-sentence audio timing, derived from a Whisper alignment pass. Empty until
   * scripts/align-listen-a-minute-audio.mjs has processed this lesson. */
  sentences: ListenSentence[];
}

export const LISTEN_LESSONS: ListenLesson[] = [
`;

const body = allLessons
  .map(
    (l) =>
      `  {\n` +
      `    letter: "${l.letter}",\n` +
      `    slug: "${esc(l.slug)}",\n` +
      `    title: "${esc(l.title)}",\n` +
      `    audioUrl: "${esc(l.audioUrl)}",\n` +
      `    clozeTemplate:\n      "${esc(l.clozeTemplate)}",\n` +
      `    spellingWords: [${l.spellingWords.map((w) => `"${esc(w)}"`).join(", ")}],\n` +
      `    sentences: [${l.sentences
        .map((s) => `{ text: "${esc(s.text)}", start: ${s.start}, end: ${s.end} }`)
        .join(", ")}],\n` +
      `  },\n`,
  )
  .join("");

const footer = `];

export interface ExtensionTask {
  key: string;
  label: string;
}

export function extensionTasks(title: string): ExtensionTask[] {
  const topic = title.toLowerCase();
  return [
    {
      key: "vocab",
      label: \`Pick 3–4 words from the passage above and look them up. Note any common collocations or word pairings you find.\`,
    },
    {
      key: "research",
      label: \`Search online for more information about \${topic}. Be ready to share what you learn with a partner next lesson.\`,
    },
    {
      key: "writing",
      label: \`Write a short article (150+ words) about \${topic}. Read it aloud to your classmates next lesson.\`,
    },
    {
      key: "poster",
      label: \`Design a poster about \${topic}. Present it to your classmates next lesson.\`,
    },
    {
      key: "own-lesson",
      label: \`Create your own mini English lesson on \${topic}. Mix a few different activity types and include at least one activity you found online.\`,
    },
  ];
}
`;

writeFileSync(OUT_FILE, header + body + footer);

console.log(`lessons: ${allLessons.length}`);
console.log(`missing audioBlobUrl: ${missingBlobUrl}`);
console.log(`wrote ${path.relative(REPO_ROOT, OUT_FILE)}`);
