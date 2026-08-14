// Batch-generates Vietnamese "memory tip" hints for every collocation/phrasal-verb
// item and every Cambridge IELTS vocab word, writing src/data/memory-tips.ts.
//
// Usage:
//   node scripts/generate-memory-tips.mjs               # full run, resumable
//   node scripts/generate-memory-tips.mjs --limit=20     # only process first 20 pending items (dry run)
//   node scripts/generate-memory-tips.mjs --batch-size=10 # override items-per-API-call (default 15)
//
// Safe to re-run: keys already present in src/data/memory-tips.ts are skipped.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_PATH = path.join(ROOT, "src/data/memory-tips.ts");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const MODEL = "deepseek-v4-flash";

function apiKey() {
  const v = process.env.DEEPSEEK_API_KEY;
  if (!v) throw new Error("DEEPSEEK_API_KEY not found in .env.local / environment");
  return v.trim();
}

async function callDeepSeek(systemPrompt, userMessage, temperature) {
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey()}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from DeepSeek");
  const codeBlock = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const jsonStr = codeBlock ? codeBlock[1] : (content.match(/\[[\s\S]*\]/)?.[0] ?? content);
  return JSON.parse(jsonStr);
}

async function callWithRetry(systemPrompt, userMessage, temperature, retries = 2) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await callDeepSeek(systemPrompt, userMessage, temperature);
    } catch (e) {
      lastErr = e;
      if (attempt < retries) {
        const delay = 1500 * (attempt + 1);
        console.warn(`  retry ${attempt + 1}/${retries} after error: ${e.message} (waiting ${delay}ms)`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

const SYSTEM_PROMPT =
  "You help Vietnamese English learners memorize English collocations, phrasal verbs, and vocabulary. " +
  "For each item given (an English term, its Vietnamese meaning, and an example sentence), invent ONE short Vietnamese " +
  "memory hook. Before writing it, privately consider a few different angles for THIS word — e.g. an etymology/root " +
  "breakdown, a phonetic/keyword link (a part of the word sounds like a Vietnamese syllable, tied to an image of the " +
  "meaning), a well-known fact or joke specifically about that word, a link to a Vietnamese loanword/cognate — and pick " +
  "whichever ONE is genuinely the most interesting, vivid, and relatable, not just the most 'technically correct'.\n" +
  "- CRITICAL: the hook must connect the WORD'S FORM (its spelling, sound, a recognizable part of it, or a fact specific " +
  "to that word) to its meaning. It must NOT merely dramatize or exemplify the meaning in isolation — the learner already " +
  "has the meaning; the hook's job is to link word ⇄ meaning so the word itself becomes recallable.\n" +
  '  Self-check before answering: delete the target English word from your tip — if the rest still reads as a perfectly ' +
  "good, complete description of the concept on its own, THIS TIP IS JUST A DEFINITION IN DISGUISE. Reject it and either " +
  "find a real word-form anchor or set \"tip\" to null.\n" +
  '  Bad (rejected) example for "adolescent": "Tuổi adolescent: vừa đòi tự lập như người lớn, vừa sợ ma như trẻ con." — ' +
  "this only dramatizes what a teenager is like; it never touches the word itself, so deleting \"adolescent\" from it " +
  "changes nothing.\n" +
  '  Good example for "adolescent": "Adolescent có đuôi -escent nghĩa là \'đang trở thành\' — adolescent là \'người lớn ' +
  'còn dở dang, đang trở thành\'." — this anchors on the real suffix -escent and derives the meaning from it.\n' +
  "- Etymology breakdown (root + prefix/suffix meanings) is great when the derivation is well-known and itself fun or " +
  "illuminating — but it is NOT the default. A dry \"gốc Latin X + Y → nghĩa Z\" explanation on every single word gets " +
  "repetitive fast and stops being memorable. Across any batch, most items should NOT be etymology breakdowns.\n" +
  "- For ordinary, concrete, everyday words and phrases where no clean etymology exists, anchor on the word's SOUND or " +
  "SPELLING instead (a keyword/phonetic link, a recognizable smaller word hiding inside it, a famous fact about that " +
  "specific word) and tie that anchor to a vivid, specific image — not a generic scenario that merely illustrates the " +
  "definition.\n" +
  "- Vary the technique from word to word — don't let any one pattern dominate the list just because it's an easy formula " +
  "to repeat.\n" +
  "- A hook must be short (1 sentence, rarely 2), specific, and immediately clear on its own — not vague, and not a pun " +
  "that needs its own explanation to make sense.\n" +
  "- If nothing genuinely memorable comes to mind for a word, set \"tip\" to null for it — a confusing or contrived hook, " +
  "or one that fails the self-check above, is worse than none. It's fine and expected to skip some items.\n" +
  'Respond in JSON only: an array of objects, each {"key": "<same key as given>", "tip": "<the Vietnamese memory hook>" | null}, ' +
  "same order and count as the input list, no markdown fencing outside the JSON.";

function buildUserMessage(batch) {
  const list = batch.map(({ key, term, meaning, example }) => ({ key, term, meaning, example }));
  return `Items:\n${JSON.stringify(list, null, 2)}`;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function collectItems() {
  const verbsMod = await import(new URL("../src/data/basic-verbs.ts", import.meta.url));
  const cambridgeMod = await import(new URL("../src/data/cambridge-vocabulary-ielts.ts", import.meta.url));

  const items = [];
  for (const unit of cambridgeMod.CAMBRIDGE_UNITS) {
    for (const step of unit.steps) {
      if (step.kind !== "vocab") continue;
      for (const w of step.words) {
        items.push({
          key: `cambridge:${unit.slug}::${w.term}`,
          term: w.term,
          meaning: w.vi,
          example: w.examples?.[0]?.en ?? "",
        });
      }
    }
  }
  for (const v of verbsMod.VERBS) {
    for (const it of v.items) {
      items.push({ key: `cpv:${v.verb}::${it.term}`, term: it.term, meaning: it.vi, example: it.ex });
    }
  }
  return items;
}

async function loadExistingTips() {
  if (!existsSync(OUT_PATH)) return {};
  try {
    const mod = await import(new URL("../src/data/memory-tips.ts", import.meta.url));
    return { ...mod.MEMORY_TIPS };
  } catch {
    return {};
  }
}

function writeTips(tips) {
  const keys = Object.keys(tips).sort();
  const entries = keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(tips[k])},`).join("\n");
  const content =
    "// Generated by scripts/generate-memory-tips.mjs — do not hand-edit, rerun the script instead.\n" +
    "// Keys: `cpv:${verb}::${term}` for collocations/phrasal-verbs, `cambridge:${unitSlug}::${term}` for Cambridge IELTS vocab.\n" +
    "export const MEMORY_TIPS: Record<string, string> = {\n" +
    entries +
    "\n};\n";
  writeFileSync(OUT_PATH, content, "utf8");
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : undefined;
  const batchSizeArg = args.find((a) => a.startsWith("--batch-size="));
  const batchSize = batchSizeArg ? parseInt(batchSizeArg.split("=")[1], 10) : 15;

  const allItems = await collectItems();
  const existing = await loadExistingTips();

  let pending = allItems.filter((it) => !(it.key in existing));
  const alreadyDone = allItems.length - pending.length;
  if (limit) pending = pending.slice(0, limit);

  console.log(`Total items: ${allItems.length}, already have tips: ${alreadyDone}, generating now: ${pending.length}`);

  const batches = chunk(pending, batchSize);
  const tips = { ...existing };
  let failed = 0;
  let skippedNoTip = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Batch ${i + 1}/${batches.length} (${batch.length} items)...`);
    try {
      const result = await callWithRetry(SYSTEM_PROMPT, buildUserMessage(batch), 0.4);
      const byKey = new Map(result.map((r) => [r.key, r.tip]));
      for (const item of batch) {
        if (!byKey.has(item.key)) {
          console.warn(`  missing key in response: ${item.key}`);
          failed++;
          continue;
        }
        const tip = byKey.get(item.key);
        if (tip) {
          tips[item.key] = tip;
        } else {
          tips[item.key] = ""; // model deliberately opted out — no good mnemonic for this word
          skippedNoTip++;
        }
      }
      writeTips(tips);
    } catch (e) {
      console.error(`  batch ${i + 1} failed after retries: ${e.message}`);
      failed += batch.length;
    }
  }

  const generatedNow = Object.keys(tips).length - alreadyDone;
  console.log(
    `Done. Generated this run: ${generatedNow} (of which ${skippedNoTip} deliberately skipped as "no good tip"), ` +
      `failed/missing: ${failed}, total keys in file: ${Object.keys(tips).length} / ${allItems.length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
