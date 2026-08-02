#!/usr/bin/env node
// One-time bootstrap: parses a saved copy of https://listenaminute.com/ (View Source / Save Page)
// and writes one CSV per letter folder, each row being a lesson found on that page.
//
// Usage:
//   node scripts/extract-lesson-index.mjs <source.html> --out ./docs/listening_a_minute
//
// Output: <out>/<LETTER>/<LETTER>.csv with columns slug,title,url
// The letter and slug are taken directly from the lesson's real URL
// (https://listenaminute.com/<letter>/<slug>.html) rather than guessed, since real
// slugs mix hyphens and underscores inconsistently (e.g. "cyber-bullying" vs "bad_habits").

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LINK_RE = /<a href="https:\/\/listenaminute\.com\/([a-z])\/([^"\/]+)\.html">([^<]*)<\/a>/g;

function parseArgs(argv) {
  const args = { out: "./docs/listening_a_minute", _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else args._.push(a);
  }
  return args;
}

function csvEscape(value) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourcePath = args._[0];
  if (!sourcePath) {
    console.error("Usage: node scripts/extract-lesson-index.mjs <source.html> --out <dir>");
    process.exit(1);
  }

  const html = await readFile(sourcePath, "utf8");
  const byLetter = new Map(); // LETTER -> [{slug, title, url}]

  for (const m of html.matchAll(LINK_RE)) {
    const [, letter, slug, title] = m;
    const upper = letter.toUpperCase();
    if (!byLetter.has(upper)) byLetter.set(upper, []);
    byLetter.get(upper).push({
      slug,
      title: title.trim(),
      url: `https://listenaminute.com/${letter}/${slug}.html`,
    });
  }

  let total = 0;
  for (const [letter, lessons] of [...byLetter.entries()].sort()) {
    const dir = path.join(args.out, letter);
    await mkdir(dir, { recursive: true });
    const rows = ["slug,title,url", ...lessons.map((l) => [l.slug, csvEscape(l.title), l.url].join(","))];
    await writeFile(path.join(dir, `${letter}.csv`), rows.join("\n") + "\n", "utf8");
    console.log(`${letter}: ${lessons.length} lessons`);
    total += lessons.length;
  }

  console.log(`\nTotal: ${total} lessons across ${byLetter.size} letters -> ${args.out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
