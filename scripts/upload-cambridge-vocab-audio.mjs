#!/usr/bin/env node
// Uploads the Cambridge Vocabulary for IELTS Advanced CD tracks (raw files sit in the
// gitignored downloads/ folder) to Vercel Blob and writes a track-number -> URL manifest
// to content/topics/03-cambridge-vocabulary-ielts-advanced/audio-manifest.json, so unit
// content in src/data/cambridge-vocabulary-ielts.ts can reference a stable CDN URL instead
// of committing ~45MB of audio into the repo or shipping it as static Next.js assets.
// Same convention as scripts/upload-listen-a-minute-audio.mjs.
//
// Requires BLOB_READ_WRITE_TOKEN (already present in .env.local for this project).
//
// Usage:
//   node --env-file=.env.local scripts/upload-cambridge-vocab-audio.mjs [--force]

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const DOWNLOADS_DIR = path.join(process.cwd(), "downloads");
const MANIFEST_PATH = path.join(
  process.cwd(),
  "content/topics/03-cambridge-vocabulary-ielts-advanced/audio-manifest.json",
);
const TRACK_RE = /^(\d{2})\s*-\s*.+\.mp3$/i;

function parseArgs(argv) {
  return { force: argv.includes("--force") };
}

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "BLOB_READ_WRITE_TOKEN is not set. Run with: node --env-file=.env.local scripts/upload-cambridge-vocab-audio.mjs",
    );
    process.exit(1);
  }
  if (!existsSync(DOWNLOADS_DIR)) {
    console.error(`downloads/ folder not found at ${DOWNLOADS_DIR}`);
    process.exit(1);
  }

  const { force } = parseArgs(process.argv.slice(2));
  const manifest = loadManifest();

  const files = readdirSync(DOWNLOADS_DIR)
    .filter((f) => TRACK_RE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const track = file.match(TRACK_RE)[1];
    if (manifest[track] && !force) {
      skipped++;
      continue;
    }
    const filePath = path.join(DOWNLOADS_DIR, file);
    const data = readFileSync(filePath);
    const blob = await put(`cambridge-vocabulary-ielts/track-${track}.mp3`, data, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "audio/mpeg",
    });
    manifest[track] = blob.url;
    uploaded++;
    console.log(`Track ${track}: ${blob.url} (${uploaded} uploaded)`);
  }

  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`\nDone. Uploaded ${uploaded} files this run, ${skipped} already had a blob URL.`);
  console.log(`Manifest written to ${MANIFEST_PATH}`);
}

main();
