#!/usr/bin/env node
// Downloads audio from a SoundCloud link as mp3 (or another format supported
// by yt-dlp's --audio-format). By default expects a single track URL (a
// `?in=.../sets/...` reference is ignored, only that one track is fetched).
// Pass --playlist with a `.../sets/<set-slug>` URL to download every track in
// the set in one go.
//
// First run downloads a local yt-dlp binary into ./.bin (kept out of git via
// .gitignore) — no system-wide install required. ffmpeg is supplied by the
// project's existing ffmpeg-static dependency.
//
// Usage:
//   node scripts/download-soundcloud-audio.mjs <soundcloud-url> [--out dir] [--format mp3] [--name filename]
//   node scripts/download-soundcloud-audio.mjs <soundcloud-sets-url> --playlist [--out dir] [--format mp3]
//
//   --out       Output directory (default ./downloads)
//   --format    Audio format passed to yt-dlp --audio-format (default mp3)
//   --name      Output filename without extension, single-track mode only (default: track title)
//   --playlist  Download every track in a `.../sets/<slug>` playlist instead of one track;
//               files are named "<index> - <title>.<ext>" so they sort in playlist order
//
// Only download audio you have the right to use — check the track's license
// and SoundCloud's terms before redistributing anything you pull down here.

import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import YTDlpWrapPkg from "yt-dlp-wrap";
import ffmpegPath from "ffmpeg-static";

// yt-dlp-wrap is CJS with `exports.default = YTDlpWrap`; Node's ESM interop
// binds a default import to the whole `{ default, __esModule }` object here,
// not the class itself, so unwrap it explicitly.
const YTDlpWrap = YTDlpWrapPkg.default ?? YTDlpWrapPkg;

function parseArgs(argv) {
  const args = { out: "./downloads", format: "mp3", name: null, playlist: false, _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--format") args.format = argv[++i];
    else if (a === "--name") args.name = argv[++i];
    else if (a === "--playlist") args.playlist = true;
    else args._.push(a);
  }
  args.url = args._[0];
  return args;
}

async function ensureYtDlp() {
  const binDir = path.join(process.cwd(), ".bin");
  const binPath = path.join(binDir, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");
  if (!existsSync(binPath)) {
    mkdirSync(binDir, { recursive: true });
    console.log("Downloading yt-dlp binary (first run only)...");
    await YTDlpWrap.downloadFromGithub(binPath);
  }
  return binPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url) {
    console.error("Usage: node scripts/download-soundcloud-audio.mjs <soundcloud-url> [--out dir] [--format mp3] [--name filename]");
    process.exit(1);
  }

  mkdirSync(args.out, { recursive: true });

  const binPath = await ensureYtDlp();
  const ytDlp = new YTDlpWrap(binPath);

  const outputTemplate = args.playlist
    ? path.join(args.out, "%(playlist_index)02d - %(title)s.%(ext)s")
    : args.name
    ? path.join(args.out, `${args.name}.%(ext)s`)
    : path.join(args.out, "%(title)s.%(ext)s");

  const ytDlpArgs = [
    args.url,
    args.playlist ? "--yes-playlist" : "--no-playlist",
    "-x",
    "--audio-format",
    args.format,
    "--ffmpeg-location",
    ffmpegPath,
    "-o",
    outputTemplate,
  ];

  console.log(`Downloading ${args.playlist ? "playlist" : "audio"} from ${args.url} -> ${args.out}`);

  await new Promise((resolve, reject) => {
    ytDlp
      .exec(ytDlpArgs)
      .on("progress", (p) => {
        if (p.percent != null) {
          process.stdout.write(`\r${p.percent.toFixed(1)}% of ${p.totalSize ?? "?"} ETA ${p.eta ?? "?"}   `);
        }
      })
      .on("ytDlpEvent", (type, data) => {
        if (type !== "download") console.log(`[${type}]${data}`);
      })
      .on("error", reject)
      .on("close", () => resolve());
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nFailed:", err.message ?? err);
  process.exit(1);
});
