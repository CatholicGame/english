#!/usr/bin/env node
// Uploads each lesson's mp3 to Vercel Blob (public access) and records the resulting
// CDN URL back onto the lesson inside its letter's <LETTER>.json, as `audioBlobUrl` —
// same in-place-augmentation convention as the `sentences` field from the alignment
// script. generate-listen-a-minute-data.mjs prefers this URL over the local public/
// copy, so the ~356MB of audio never needs to be committed to the git repo / deployed
// as static Next.js assets.
//
// Requires BLOB_READ_WRITE_TOKEN (created via `vercel blob create-store ... --yes`,
// which also writes it into .env.local for local runs).
//
// Usage:
//   node --env-file=.env.local scripts/upload-listen-a-minute-audio.mjs [root] [--letter A] [--force]

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

function parseArgs(argv) {
  const args = { root: null, letter: null, force: false, _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--letter") args.letter = argv[++i].toUpperCase();
    else if (a === "--force") args.force = true;
    else args._.push(a);
  }
  if (args._[0]) args.root = args._[0];
  return args;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set. Run with: node --env-file=.env.local scripts/upload-listen-a-minute-audio.mjs");
    process.exit(1);
  }

  const args = parseArgs(process.argv.slice(2));
  const root = args.root ? path.resolve(args.root) : path.join(process.cwd(), "src/assets/listening_a_minute");

  const letters = readdirSync(root)
    .filter((f) => statSync(path.join(root, f)).isDirectory())
    .filter((f) => !args.letter || f === args.letter)
    .sort();

  let uploaded = 0;
  let skipped = 0;

  for (const letter of letters) {
    const jsonPath = path.join(root, letter, `${letter}.json`);
    if (!existsSync(jsonPath)) continue;
    const data = JSON.parse(readFileSync(jsonPath, "utf8"));
    let dirty = false;

    for (const lesson of data.lessons ?? []) {
      if (lesson.audioBlobUrl && !args.force) {
        skipped++;
        continue;
      }
      const filePath = path.join(root, letter, "audios", lesson.audioFile);
      const file = readFileSync(filePath);
      const blob = await put(`listen-a-minute/${lesson.audioFile}`, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "audio/mpeg",
      });
      lesson.audioBlobUrl = blob.url;
      dirty = true;
      uploaded++;
      console.log(`[${letter}] ${lesson.slug}: ${blob.url} (${uploaded} uploaded)`);
    }

    if (dirty) writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  }

  console.log(`\nDone. Uploaded ${uploaded} files this run, ${skipped} already had a blob URL.`);
}

main();
