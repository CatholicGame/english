#!/usr/bin/env node
// Fetches lesson pages from listenaminute.com (READ text + mp3 audio) for the
// per-letter CSVs produced by extract-lesson-index.mjs. Server-side fetch is
// required — the site sends no CORS headers, so a browser page can't read the
// response cross-origin.
//
// Expected input layout (as produced by extract-lesson-index.mjs):
//   docs/listening_a_minute/A/A.csv   (columns: slug,title,url)
//   docs/listening_a_minute/B/B.csv
//   ...
//
// Usage:
//   node scripts/fetch-listen-a-minute.mjs [root] [--letter A] [--delay 500]
//
//   root       Folder containing one subfolder per letter (default ./docs/listening_a_minute)
//   --letter   Only process this single letter (e.g. --letter A)
//   --delay    Milliseconds between requests (default 500)
//
// Output per letter:
//   <root>/<LETTER>/<LETTER>.json   { letter, lessons: [{ slug, title, url, audioFile, text }] }
//   <root>/<LETTER>/audios/<slug>.mp3
// Re-running merges into the existing JSON instead of duplicating entries
// (matched by slug), so partial/incremental runs are safe.

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = { root: "./docs/listening_a_minute", letter: null, delay: 500, _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--letter") args.letter = argv[++i].toUpperCase();
    else if (a === "--delay") args.delay = Number(argv[++i]);
    else args._.push(a);
  }
  if (args._[0]) args.root = args._[0];
  return args;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rows = [];
  for (const line of lines.slice(1)) {
    // simple CSV split that respects one level of double-quoted fields
    const cells = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (c === '"') {
          inQuotes = false;
        } else {
          cur += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        cells.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    cells.push(cur);
    const [slug, title, url] = cells;
    if (slug && url) rows.push({ slug, title: title ?? slug, url });
  }
  return rows;
}

const ENTITIES = {
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&amp;": "&",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&#x2026;": "…",
};

function decodeEntities(str) {
  return str.replace(/&#x2026;|&[a-z]+;/gi, (m) => ENTITIES[m] ?? m);
}

function extractReadText(html) {
  const afterRead = html.split(/<h3>\s*READ\s*<\/h3>/i)[1];
  if (!afterRead) return null;
  const tableMatch = afterRead.match(/<table[\s\S]*?<\/table>/i);
  const scope = tableMatch ? tableMatch[0] : afterRead;
  const paragraphs = [...scope.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, "").trim()),
  );
  const text = paragraphs.filter(Boolean).join("\n\n");
  return text || null;
}

function extractAudioSrc(html) {
  const audioBlock = html.match(/<div[^>]*class="audio"[^>]*>[\s\S]*?<\/div>/i)?.[0] ?? html;
  const mp3 = audioBlock.match(/<source[^>]+src="([^"]+\.mp3)"/i);
  return mp3?.[1] ?? null;
}

async function fetchLesson({ slug, title, url }) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const html = await res.text();

  const text = extractReadText(html);
  if (!text) throw new Error(`Could not find READ section in ${url}`);

  const audioSrc = extractAudioSrc(html);
  const audioUrl = audioSrc ? new URL(audioSrc, url) : null;

  return { slug, title, url, text, audioUrl };
}

async function downloadAudio(audioUrl, destPath) {
  const res = await fetch(audioUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${audioUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

/** Merges freshly-fetched lessons into the letter's existing JSON, keyed by slug. */
async function mergeLetterJson(jsonPath, letter, newLessons) {
  let existing = { letter, lessons: [] };
  try {
    existing = JSON.parse(await readFile(jsonPath, "utf8"));
  } catch {
    // no existing file yet — starting fresh
  }

  const bySlug = new Map(existing.lessons.map((l) => [l.slug, l]));
  for (const lesson of newLessons) bySlug.set(lesson.slug, lesson);

  const lessons = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  await writeFile(jsonPath, JSON.stringify({ letter, lessons }, null, 2), "utf8");
}

async function processLetter(root, letter, delay, summary) {
  const dir = path.join(root, letter);
  const csvPath = path.join(dir, `${letter}.csv`);
  const audioDir = path.join(dir, "audios");

  let rows;
  try {
    rows = parseCsv(await readFile(csvPath, "utf8"));
  } catch {
    console.log(`[${letter}] no ${letter}.csv found, skipping`);
    return;
  }
  if (rows.length === 0) return;

  await mkdir(audioDir, { recursive: true });

  const fetched = [];
  for (const [i, row] of rows.entries()) {
    process.stdout.write(`[${letter} ${i + 1}/${rows.length}] ${row.slug} ... `);
    try {
      const lesson = await fetchLesson(row);

      let audioFile = null;
      if (lesson.audioUrl) {
        audioFile = `${lesson.slug}.mp3`;
        await downloadAudio(lesson.audioUrl, path.join(audioDir, audioFile));
      }

      fetched.push({ slug: lesson.slug, title: lesson.title, url: lesson.url, audioFile, text: lesson.text });
      summary.push({ letter, slug: lesson.slug, audioFile, error: null });
      console.log(audioFile ? "ok (text + audio)" : "ok (text only, no audio found)");
    } catch (err) {
      summary.push({ letter, slug: row.slug, audioFile: null, error: err.message });
      console.log(`FAILED: ${err.message}`);
    }
    if (delay > 0 && i < rows.length - 1) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  if (fetched.length > 0) {
    await mergeLetterJson(path.join(dir, `${letter}.json`), letter, fetched);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let letters;
  if (args.letter) {
    letters = [args.letter];
  } else {
    letters = (await readdir(args.root, { withFileTypes: true }))
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  }

  if (letters.length === 0) {
    console.error(`No letter folders found under ${args.root}`);
    process.exit(1);
  }

  const summary = [];
  for (const letter of letters) {
    await processLetter(args.root, letter, args.delay, summary);
  }

  await writeFile(path.join(args.root, "_summary.json"), JSON.stringify(summary, null, 2), "utf8");

  const ok = summary.filter((r) => !r.error).length;
  console.log(`\nDone: ${ok}/${summary.length} succeeded. See ${path.join(args.root, "_summary.json")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
