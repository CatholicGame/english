// Structural self-check for the English Grammar in Use unit data
// (src/data/english-grammar-in-use.ts + src/data/grammar-units/units-*.ts).
//
// Run: node scripts/check-grammar-data.mjs
//
// The exercise data is hand-authored one unit at a time (145 units in the book,
// a handful shipped so far), so the shape a renderer depends on is easy to
// break by hand. This asserts the invariants the UnitClient renderer relies on
// and that AGENTS.md describes, and exits non-zero with the offending unit,
// exercise and item when one is violated.
//
// Each `export const UNIT_...: GrammarUnit = { ... };` body is plain JSON, so
// it is read with a regex + JSON.parse rather than by importing TypeScript (no
// loader/bundler is wired up for scripts here). Unit content is split across
// src/data/grammar-units/units-<range>.ts files, so every file in that
// directory matching units-*.ts is scanned.

import { readFileSync, readdirSync } from "node:fs";
import { ruleLine } from "../src/lib/grammar-rule-line.ts";

const UNITS_DIR = "src/data/grammar-units";
const SRCS = readdirSync(UNITS_DIR)
  .filter((f) => /^units-[\d-]+\.ts$/.test(f))
  .sort()
  .map((f) => `${UNITS_DIR}/${f}`);
const PRACTICE = ["fill_mc", "type_fill", "judge_correct", "match_pairs"];
const errors = [];

function check(cond, message) {
  if (!cond) errors.push(message);
}

// A rule page must read in ONE language at a time. Every branch of that choice
// is checked here, because getting one wrong shows the learner the wrong
// language (or both at once, which is what this replaced).
for (const [label, got, want] of [
  ["vi explanation", ruleLine("explanation", "EN", "VI", "vi", false), { main: "VI", alt: "EN" }],
  ["vi book sentence", ruleLine("book", "EN", "VI", "vi", false), { main: "EN", alt: "VI" }],
  ["original explanation", ruleLine("explanation", "EN", "VI", "vi", true), { main: "EN" }],
  ["original book sentence", ruleLine("book", "EN", "VI", "vi", true), { main: "EN" }],
  ["english UI explanation", ruleLine("explanation", "EN", "VI", "en", false), { main: "EN" }],
  ["english UI book sentence", ruleLine("book", "EN", "VI", "en", false), { main: "EN" }],
  ["untranslated explanation", ruleLine("explanation", "EN", undefined, "vi", false), { main: "EN" }],
  ["untranslated book sentence", ruleLine("book", "EN", undefined, "vi", false), { main: "EN" }],
]) {
  check(
    JSON.stringify(got) === JSON.stringify(want),
    `ruleLine ${label}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`,
  );
}

check(SRCS.length > 0, `${UNITS_DIR}: no units-*.ts files found - has the file layout changed?`);
const blocks = [];
for (const src of SRCS) {
  const text = readFileSync(src, "utf8");
  const found = [...text.matchAll(/^export const (UNIT_[A-Z0-9_]+): GrammarUnit = (\{[\s\S]*?\r?\n\});\r?$/gm)];
  check(found.length > 0, `${src}: no unit blocks found - has the file format changed?`);
  blocks.push(...found);
}

for (const [, name, json] of blocks) {
  let unit;
  try {
    unit = JSON.parse(json);
  } catch (e) {
    errors.push(`${name}: body is not plain JSON (${e.message})`);
    continue;
  }
  const at = (step, extra = "") => `Unit ${unit.unit} "${step.title}"${extra}`;

  // Step order: rule, then auto-graded practice, then the AI step.
  const kinds = unit.steps.map((s) => s.kind);
  check(kinds[0] === "rule", `Unit ${unit.unit}: first step is "${kinds[0]}", expected "rule"`);
  check(
    kinds[kinds.length - 1] === "ai_practice",
    `Unit ${unit.unit}: last step is "${kinds[kinds.length - 1]}", expected "ai_practice"`,
  );
  check(
    kinds.slice(1, -1).every((k) => PRACTICE.includes(k)),
    `Unit ${unit.unit}: steps between the rule and the AI step must be practice steps, got ${kinds.join(", ")}`,
  );

  for (const step of unit.steps) {
    if (step.kind === "rule") {
      for (const block of step.blocks) {
        const at = `Unit ${unit.unit} rule block ${block.label}`;
        check(block.parts?.length > 0, `${at}: has no parts`);
        for (const [i, part] of (block.parts ?? []).entries()) {
          // An explanation line inside an example list is the shape the parts
          // model exists to prevent: it renders as a sentence to imitate.
          if (part.kind === "examples") {
            check(part.items.length > 0, `${at} part ${i}: empty examples list`);
            for (const ex of part.items) {
              check(
                !(/:\s*$/.test(ex.en) && !ex.note),
                `${at} part ${i}: "${ex.en}" is an explanation line, not an example - make it a text part`,
              );
            }
          }
          if (part.kind === "text") check(part.text.trim() !== "", `${at} part ${i}: empty text`);
          if (part.kind === "table") {
            const widths = new Set(part.table.rows.map((r) => r.length));
            check(widths.size === 1, `${at} part ${i}: table rows have differing column counts`);
          }
        }
      }
      continue;
    }
    if (!PRACTICE.includes(step.kind)) continue;

    // The book's exercise number heads the title, for cross-referencing.
    check(
      new RegExp(`^${unit.unit}\\.\\d+ · `).test(step.title),
      `${at(step)}: title must start with "${unit.unit}.<n> · "`,
    );

    // `passage` is for genuine shared reading context only. A word bank goes in
    // `wordBank` and a worked example in `examples`, or they render as one
    // unscannable grey block again.
    if (step.passage) {
      check(
        !/(Word bank|Danh sách|Chọn từ|Ví dụ|Example)/.test(step.passage),
        `${at(step)}: passage carries a word bank or a worked example - use wordBank / examples instead`,
      );
    }

    // One typed gap per answer, or the renderer shows a gap with nothing to
    // fill it (or an answer with nowhere to go).
    const rows = [
      ...(step.examples ?? []).map((e) => ["example", e]),
      ...(step.items ?? []).map((it) => ["item", it]),
    ];
    for (const [i, item] of rows.entries()) {
      const [kind, it] = item;
      if (typeof it.prompt !== "string") continue;
      const gaps = (it.prompt.match(/___/g) ?? []).length;
      const answers = 1 + (it.extraBlanks?.length ?? 0);
      check(
        gaps === answers,
        `${at(step, ` ${kind} #${i}`)}: ${gaps} gap(s) in the prompt but ${answers} answer(s)`,
      );
      check(
        !(it.accept ?? []).includes(it.answer),
        `${at(step, ` ${kind} #${i}`)}: accept[] repeats the answer itself`,
      );
    }

    // A typed answer must never start with a bare apostrophe ("'ve been
    // waiting"): a learner cannot naturally type that as a whole answer, so the
    // full form is the answer and the contraction goes in accept[]. Worked
    // examples are exempt - they are displayed, never typed, so they keep the
    // book's own contracted form.
    for (const [i, item] of (step.items ?? []).entries()) {
      const answers = [item.answer, ...(item.extraBlanks ?? []).map((b) => b.answer)];
      for (const answer of answers) {
        check(
          !(typeof answer === "string" && answer.startsWith("'")),
          `${at(step, ` item #${i}`)}: answer "${answer}" starts with a bare apostrophe - put the full form in answer and the contraction in accept[]`,
        );
      }
    }

    // Item numbering must be unique within an exercise, whether it comes from
    // explicit labels or from startNumber.
    const start = step.startNumber ?? (step.examples?.length ?? 0) + 1;
    const labels = (step.items ?? []).map((it, i) => it.label ?? String(start + i));
    check(
      new Set(labels).size === labels.length,
      `${at(step)}: duplicate item numbers (${labels.join(", ")})`,
    );
  }
}

if (errors.length) {
  console.error(`${errors.length} problem(s) in ${UNITS_DIR}:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`${UNITS_DIR}: ${blocks.length} units OK`);
