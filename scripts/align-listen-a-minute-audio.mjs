#!/usr/bin/env node
// Aligns each lesson's real audio to its authentic transcript so the app can sync
// script highlighting / per-sentence seeking to playback. Adds a `sentences` array
// (start/end seconds per sentence) directly onto each lesson inside its letter's
// <LETTER>.json — matching fetch-listen-a-minute.mjs's convention of augmenting the
// same per-letter JSON files in place, matched by slug.
//
// Method: transcribe the audio with Whisper (word-level timestamps), then align the
// transcript's words against our already-known canonical text via edit-distance (the
// two should match almost word-for-word — same script, same recording — aside from
// minor ASR slips like "they're" -> "they are"). A sentence's start/end timestamp is
// taken from its first/last successfully aligned word. This also naturally skips the
// spoken "ListenAMinute.com" branding intro before the real passage begins, since
// those intro words simply fail to match anything in the canonical text.
//
// Usage:
//   node scripts/align-listen-a-minute-audio.mjs [root] [--letter A] [--limit N] [--force]
//
//   root      Folder containing one subfolder per letter (default ./src/assets/listening_a_minute)
//   --letter  Only process this single letter
//   --limit   Only process the first N not-yet-aligned lessons (across the whole run)
//   --force   Re-align lessons that already have a `sentences` field
//
// Re-running resumes where it left off (already-aligned lessons are skipped), since
// each lesson takes a few seconds and 400+ lessons add up to a long batch job.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, unlinkSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { pipeline } from "@huggingface/transformers";

function parseArgs(argv) {
  const args = { root: null, letter: null, limit: Infinity, force: false, _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--letter") args.letter = argv[++i].toUpperCase();
    else if (a === "--limit") args.limit = Number(argv[++i]);
    else if (a === "--force") args.force = true;
    else args._.push(a);
  }
  if (args._[0]) args.root = args._[0];
  return args;
}

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

function tokenizeWords(text) {
  const tokens = [];
  let m;
  WORD_RE.lastIndex = 0;
  while ((m = WORD_RE.exec(text))) tokens.push({ word: m[0], start: m.index, end: m.index + m[0].length });
  return tokens;
}

function splitSentences(text) {
  const ends = [];
  const re = /[.!?]+/g;
  let m;
  while ((m = re.exec(text))) ends.push(m.index + m[0].length);
  if (!ends.length || ends[ends.length - 1] < text.length) ends.push(text.length);
  const sentences = [];
  let start = 0;
  for (const end of ends) {
    const t = text.slice(start, end).trim();
    if (t) sentences.push({ start, end, text: t });
    start = end;
  }
  return sentences;
}

function normWord(w) {
  return w.toLowerCase().replace(/[^a-z']/g, "");
}

/** Edit-distance alignment: for each canonical word, the best-matching whisper chunk index (or null). */
function alignWords(canonicalWords, whisperChunks) {
  const n = canonicalWords.length;
  const m = whisperChunks.length;
  const cw = canonicalWords.map((w) => normWord(w.word));
  const ww = whisperChunks.map((c) => normWord(c.text));

  const dp = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const subCost = cw[i - 1] === ww[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j - 1] + subCost, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
    }
  }

  const matched = new Array(n).fill(null);
  let i = n,
    j = m;
  while (i > 0 && j > 0) {
    const subCost = cw[i - 1] === ww[j - 1] ? 0 : 1;
    if (dp[i][j] === dp[i - 1][j - 1] + subCost) {
      matched[i - 1] = j - 1;
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j] + 1) {
      i--;
    } else {
      j--;
    }
  }
  return matched;
}

function buildSentenceTimings(text, whisperChunks, totalDuration) {
  const words = tokenizeWords(text);
  const sentences = splitSentences(text);
  const matched = alignWords(words, whisperChunks);

  // bucket each word index into its sentence by char offset
  const wordSentenceIdx = words.map((w) => sentences.findIndex((s) => w.start >= s.start && w.start < s.end));

  const out = sentences.map((s) => ({ text: s.text, start: null, end: null }));
  for (let wi = 0; wi < words.length; wi++) {
    const si = wordSentenceIdx[wi];
    if (si === -1 || matched[wi] == null) continue;
    const [s, e] = whisperChunks[matched[wi]].timestamp;
    const end = e ?? s;
    if (out[si].start == null || s < out[si].start) out[si].start = s;
    if (out[si].end == null || end > out[si].end) out[si].end = end;
  }

  // fall back for any sentence with no matched word: interpolate from neighbours,
  // proportional to its share of the total word count
  const totalWords = words.length || 1;
  let cursor = 0;
  for (let si = 0; si < out.length; si++) {
    const wordCount = wordSentenceIdx.filter((x) => x === si).length;
    if (out[si].start == null || out[si].end == null) {
      const prevEnd = si > 0 ? (out[si - 1].end ?? 0) : 0;
      const shareStart = (cursor / totalWords) * totalDuration;
      const shareEnd = ((cursor + wordCount) / totalWords) * totalDuration;
      out[si].start = out[si].start ?? Math.max(prevEnd, shareStart);
      out[si].end = out[si].end ?? Math.max(out[si].start + 0.5, shareEnd);
    }
    cursor += wordCount;
  }
  // last sentence should reach the true end of the file
  if (out.length) out[out.length - 1].end = totalDuration;

  return out.map((s) => ({ text: s.text, start: round2(s.start), end: round2(s.end) }));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function readWavPCM(filePath) {
  const buf = readFileSync(filePath);
  let offset = 12;
  let dataOffset = -1,
    dataSize = 0;
  while (offset < buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    if (id === "data") {
      dataOffset = offset + 8;
      dataSize = size;
      break;
    }
    offset += 8 + size + (size % 2);
  }
  if (dataOffset === -1) throw new Error("no data chunk found in wav");
  const numSamples = dataSize / 2;
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) out[i] = buf.readInt16LE(dataOffset + i * 2) / 32768;
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = args.root ? path.resolve(args.root) : path.join(process.cwd(), "src/assets/listening_a_minute");
  const tmpDir = mkdtempSync(path.join(tmpdir(), "lam-align-"));

  console.log("loading whisper-tiny.en...");
  const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny.en");

  const letters = readdirSync(root)
    .filter((f) => statSync(path.join(root, f)).isDirectory())
    .filter((f) => !args.letter || f === args.letter)
    .sort();

  let processed = 0;
  let skipped = 0;

  outer: for (const letter of letters) {
    const jsonPath = path.join(root, letter, `${letter}.json`);
    if (!existsSync(jsonPath)) continue;
    const data = JSON.parse(readFileSync(jsonPath, "utf8"));
    let dirty = false;

    for (const lesson of data.lessons ?? []) {
      if (lesson.sentences && !args.force) {
        skipped++;
        continue;
      }
      if (processed >= args.limit) break;

      const text = decodeEntities(lesson.text).trim();
      const audioPath = path.join(root, letter, "audios", lesson.audioFile);
      const wavPath = path.join(tmpDir, `${letter}-${lesson.slug}.wav`);

      try {
        execFileSync(ffmpegPath, ["-y", "-loglevel", "error", "-i", audioPath, "-ar", "16000", "-ac", "1", "-f", "wav", wavPath]);
        const pcm = readWavPCM(wavPath);
        const totalDuration = pcm.length / 16000;

        const result = await transcriber(pcm, { return_timestamps: "word", chunk_length_s: 30 });
        const sentences = buildSentenceTimings(text, result.chunks, totalDuration);

        lesson.sentences = sentences;
        dirty = true;
        processed++;
        console.log(`[${letter}] ${lesson.slug}: ${sentences.length} sentences, ${totalDuration.toFixed(1)}s (${processed} done)`);
      } catch (e) {
        console.error(`[${letter}] ${lesson.slug}: FAILED - ${e.message}`);
      } finally {
        if (existsSync(wavPath)) unlinkSync(wavPath);
      }
    }

    if (dirty) writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    if (processed >= args.limit) break outer;
  }

  console.log(`\nDone. Aligned ${processed} lessons this run, ${skipped} already had timings.`);
}

main();
