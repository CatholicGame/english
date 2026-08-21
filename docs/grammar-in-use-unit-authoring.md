# Authoring a Grammar in Use unit

The standard for turning one unit of `docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf`
into `src/data/english-grammar-in-use.ts`. Unit 1 (`UNIT_1_PRESENT_CONTINUOUS`) is the reference
implementation — when in doubt, go read it instead of guessing. This doc exists so every later
unit gets the same treatment as Unit 1, not a rougher pass.

Every step below is a **requirement**, not a suggestion. A unit that skips the bilingual fields, the
bold/italic markup, or the verification checklist is not done — it's Unit-1-before-the-fixes, and
this app is a paid product, not a draft.

## 1. Get the source text

Only `pdftotext` is available in this environment (no `pdftoppm`/`pdfimages`/`pdfinfo`), which is also
why the `Read` tool can't render PDF pages here. Extract with layout preserved:

```bash
pdftotext -layout -f <first-page> -l <last-page> "docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf" -
```

Units run two pages each (left-page explanation, right-page exercises), so for unit `n`:

- explanation page = `12 + 2n`
- exercises page = `13 + 2n`

This held through unit 14 in practice. **Verify it, don't just trust it** — dump a couple of pages
and confirm the page opens with `Unit\n\n<n> <title>`; if a `Unit <n>` header shows up on an
unexpected page, the two-pages-per-unit assumption has broken somewhere and needs recomputing from
the nearest confirmed anchor.

`pdftotext`'s column layout is unreliable around two-column A/B answer tables — a filled-in answer
can appear to float next to the wrong item number. Don't take a "looks pre-filled" line at face
value; cross-check it against the grammar point being taught and the explicit worked example(s) the
book gives (see §3).

## 2. What to digitize, what to skip

- Every text-only exercise gets digitized.
- **Skip picture-dependent exercises** — ones where the answer can't be derived without seeing the
  book's illustration (e.g. "What's happening in the pictures?"). See
  `docs/grammar-image-extraction.md` for why image extraction was tried and abandoned (the book's
  illustrations are tiled at too low a resolution to render usably). Just omit the step entirely;
  don't fake a text-only version of a picture exercise.
- **Skip open-ended personal-writing exercises** — "Write four sentences about yourself using...",
  "Write sentences about yourself" — there's no fixed correct answer to grade against, so there's
  nothing to digitize into `answer`/`accept`. Don't just drop it silently, though: when its theme
  fits naturally, fold it into that unit's `ai_practice` instructions instead, since the AI step
  can grade free writing where exact-match can't. It doesn't have to be forced in if it genuinely
  doesn't fit — the point is the learner shouldn't lose that angle of practice entirely.
- Note the skip in a code comment or just by absence; don't leave a numbering gap unexplained.

## 3. The four parts around an exercise, each in its own field

The book prints four visually distinct things around a numbered exercise, and each has its own
field. They were once all concatenated into `passage`, which rendered as a single grey block of
run-on prose a learner had to unpick before starting — that is the bug this structure exists to
prevent, so never merge them back together.

| Field | Holds | Renders as |
|---|---|---|
| `instructions` (+`instructionsEn`) | What to do | The line under the exercise title |
| `wordBank: string[]` | The boxed list of words/phrases to choose from | A bordered box of tappable chips (tapping one fills the focused answer box) |
| `examples: WorkedExample[]` | The item(s) the book has already filled in | Already-answered rows in the same list shape as the real items |
| `passage` (+`passageEn`) | A genuine shared reading text or dialogue setup, and nothing else | A quoted "Bài đọc" block |

- **A worked example is never an `items` entry.** If item 1 is already answered in the book, the
  learner must not have to type it again. It goes in `examples` as
  `{ label, context?, prompt, answer }` — same shape as a real item, so it renders as a row of the
  same list rather than as prose the learner has to parse. Write `prompt` with `___` where the
  answer goes, exactly as you would for a real item.
- **A worked example never lives in `instructions` either.** Several early units appended
  "Ví dụ: ..." to the instruction line; that is the same mistake in a different field.
- **Per-item situation text goes in `context` (+`contextEn` only when it isn't the book's own
  English), never repeated inside each `prompt`.** Consecutive items sharing the exact same
  `context` string render as one situation card with the shared text shown once and their blanks
  listed under it, which is how the book prints "read the situation, then complete the sentences".
  Repeating the situation inside each prompt was the old shape, and where two items were two gaps
  of one sentence it also printed the other gap's answer right next to the gap being asked about.
- **Set `startNumber`** so the item-number badge matches the book's own numbering. It defaults to
  `examples.length + 1`, which is right whenever the book's worked examples are its items 1..n, so
  only set it explicitly when the numbering starts somewhere else. When the book's own numbering
  isn't a plain running count (`2a`, `13b`), put it on the item as `label` instead — never bake a
  number into the prompt text, or the item shows two conflicting numbers.
- `wordBank`, `examples` and `label` carry the book's English content, so they take no `*En`
  sibling — there is nothing to translate.

## 4. Choosing the step kind

| Step kind | Use for | Do NOT use for |
|---|---|---|
| `rule` | The left-page grammar explanation (lettered A/B/C/D blocks) | — |
| `type_fill` | "Complete the sentence" / "write a question" — one typed answer per item | Choosing between 2-3 given options |
| `fill_mc` | Choosing one word/phrase from a short list of options, per blank | "Which goes with which" matching (see `match_pairs`) |
| `judge_correct` | "Are the underlined verbs OK? Correct them where necessary" | Anything without the judge-then-fix two-step structure |
| `match_pairs` | "The sentences on the right follow those on the left, which goes with which?" — a numbered left column and lettered right column | Never model this as `fill_mc` with every item repeating the full option pool — that's the exact bug this step kind was created to fix |
| `ai_practice` | The closing "write 2-3 sentences, get AI feedback" step every unit ends with | — |

`match_pairs` exists specifically because modeling a two-column matching exercise as `fill_mc`
duplicates the entire option list under every single item, producing a huge, repetitive UI. If an
exercise is fundamentally "pair these two lists up", it's `match_pairs`, full stop.

## 5. Rule block structure

A `RuleBlock` is the book's lettered section (A, B, C ...), and its content is an ORDERED
`parts: RulePart[]` array, not a fixed prose-then-examples shape. This is the part of the module
that has been got wrong most often, so read this before writing one.

Block-level fields:

- `label` — "A"/"B"/"C"/"D", matching the book's lettered sections.
- `heading` (Vietnamese) + `headingEn` — a short Vietnamese label summarizing the block's point.
  This is *not* a translation of the book's own (often terse) heading; write a clear one.
- `intro` + `introVi` — the short standalone lead-in line the book prints above the block, e.g.
  "Study this example situation:". Only set this when the block genuinely has one; most B/C/D
  blocks don't.

Then one `parts` entry per thing the book actually prints, **in the book's own order**:

| `kind` | Use for | Fields |
|---|---|---|
| `text` | One line or paragraph of explanation | `text` (English, the book's prose) + `vi` |
| `examples` | The example sentences illustrating the line above it | `items: GrammarExample[]`, optional `heading` + `headingVi` for the book's own sub-heading over a group ("Offering to do something") |
| `table` | A verb-conjugation grid or two-column comparison | `table: { headers?, rows, variant? }` |
| `words` | The book's boxed word list (getting, becoming, changing ...) | `words: string[]` |
| `situation` | The book's illustrated setup: the scene, plus what people in it say | `text` + `vi`, optional `quotes: [{ speaker?, text, vi? }]` |

The rules that matter:

- **One explanation line, then the examples for that line, then the next line.** The book
  alternates; so must the parts array. A block that is one giant `text` followed by one giant
  `examples` list is the wall-of-text shape this model replaced, even if every sentence is present.
- **Never put an explanation line inside an `examples` part.** Lines like "We also use used to for
  things that were true, but are not true any more:" or "Compare:" are `text` parts. Smuggling them
  in as a fake example renders them as a sentence for the learner to imitate. `npm run
  check:grammar` fails on any example ending in a colon without a `note`, which catches the common
  case, but a prose line without a colon still has to be spotted by eye.
- **`situation` is for the setup, not the explanation.** Several blocks carry a "Study this example
  situation:" intro and then open straight into explanation; those have no `situation` part. Only
  use it when the first thing the book shows is the scene itself. If the scene includes somebody
  speaking (the book draws a speech bubble), split it: the scene goes in `text`, the utterance goes
  in `quotes`.
- **`table.variant`**: `"grid"` (the default) is the bordered box for a conjugation or a two-column
  comparison. `"list"` is the book's indented label-and-value list ("the main part: I'll call you
  again later"), which is a list and reads wrong inside table borders. Never translate table cells:
  they're the target grammar forms themselves, not explanation prose.
- `GrammarExample` needs `en` (required), `note?` (the book's own parenthetical, e.g. "not I try"),
  and **`vi`** (a natural Vietnamese translation of the sentence — required, not optional polish;
  see §6). Use `note` for the book's "(not ...)" warnings rather than folding them into the
  sentence.

Unit 25 block A is the reference for a fully structured block (scene with a speech bubble, an
explanation line, an indented two-part list, a form/warning pair, and the examples), and unit 21
block B is the reference for sub-headed example groups.

## 6. Bilingual coverage — the rule that actually matters

The UI language setting (`useUiLang()`) must be respected **everywhere** in a unit, not just the
rule/theory section. Two different conventions apply depending on which half of the content you're
touching, and mixing them up is the single most common mistake made while building this module:

**Grammar explanation content is English-first.** A rule part's `text`, the block's `intro`, and `GrammarExample.en` are the
book's own English prose — that never changes. Add the Vietnamese explanation as the sibling field
(the part's own `vi`, `introVi`, `GrammarExample.vi`). Rendered: Vietnamese UI shows English + a muted
Vietnamese line underneath; English UI shows English only, nothing Vietnamese mixed in.

**Instructional/UI-facing content is Vietnamese-first.** `title`, `instructions`, `passage`, and
`heading` on every step are authored in Vietnamese by default (that's how this module started), so
the English counterpart is the one that has to be explicitly added: `titleEn`, `instructionsEn`,
`passageEn`, `headingEn`. **A unit is not complete until every one of these has its `*En` sibling
filled in.** Skipping this is exactly the mistake that had to be fixed after the first pass on Unit
1 — the theory section was bilingual but the exercises still showed Vietnamese instructions under an
English UI setting. Don't repeat it.

Rendering both conventions goes through the same two primitives in `UnitClient.tsx`:

- `loc(vi, en, lang)` — returns `en` when `lang === "en"` (falling back to `vi` if `en` is
  missing), otherwise `vi`. Use for every `title`/`instructions`/`passage`/`heading`.
- `showVi = lang !== "en"` — gates the Vietnamese *addition* fields (a part's `vi`, `introVi`,
  `GrammarExample.vi`). Never show these when the UI language is English.

Generic exercise chrome (button labels like "Check"/"Result", placeholders, score-summary text) is
**not** per-unit data — it's already covered by the `grammar.*` keys in `src/lib/i18n.ts`'s
`STRINGS` dictionary via `t()`. Don't hardcode a new instance of "Kiểm tra" or "Kết quả" anywhere;
if a new piece of shared chrome text is needed, add a `grammar.*` key there once and it's fixed for
every unit, not just the one you're authoring.

## 7. Bold/italic markup

`renderRich()` in `UnitClient.tsx` parses a small non-markdown inline syntax applied to
rule part `text`/`vi`, `table` cells, `GrammarExample.en`/`vi`, `instructions`, `passage`, and item
`prompt`/`before`/`after` text:

- `**bold**` → the grammar form actually being taught, every time it appears — in the table, in
  running prose, and inside every example sentence. Bold the whole inflected verb phrase as one
  span (`**'s having**`, `**isn't raining**`), not each word separately, matching how the book
  itself bolds it.
- `*italic*` → a single word carrying spoken/contrastive emphasis or a grammar term name (*now*,
  *not*, the *present continuous*).

Match the book's own emphasis choices — don't invent new ones and don't skip them. If the book
bolds the target form in an example, bold it here too.

## 8. Other content rules

- **One book sentence with several gaps in it stays one item**, with one `___` per gap in `prompt`:
  the first gap takes `answer`/`accept`, the rest go in `extraBlanks: [{ answer, accept? }]`, in
  order. Each gap gets its own numbered answer box and scores separately. Do NOT split it into one
  item per gap — that reprints the whole sentence for every gap with the other gaps already filled
  in, handing the learner the answers they are supposed to produce (units 6, 13, 15 and 16 all
  shipped that way once and had to be merged back).
  When the book itself numbers two *separate* sentences `2a`/`2b`, they stay two items: give them
  the book's numbers via `label` and the shared situation via `context`.
- **`answer` must never start with a bare leading apostrophe** (`"'ve been waiting"`). A learner
  can't naturally type that as a whole answer. Put the full form as `answer` (`"have been
  waiting"`) and the contraction in `accept` (`["'ve been waiting"]`).
- **`JudgeCorrectItem.underlined` must be an exact substring of `sentence`** — character for
  character, or the highlighting breaks at render time.
- Every `TypeFillItem`/`FillMcItem` that could reasonably be answered with a contraction *or* the
  full form should list both — one in `answer`, the rest in `accept`.
- No em dash (`—`), en dash, or arrows in anything authored for this module (or anywhere else in the
  app) — see the top-level writing-style rule in `AGENTS.md`. Use a period, comma, colon, or
  semicolon instead.

## 9. Verification checklist before calling a unit done

Run all of these — they've each caught a real mistake made while building this module:

1. `npx tsc --noEmit` clean.
2. `npm run check:grammar` (`scripts/check-grammar-data.mjs`) clean — it asserts the structural
   rules a type can't: step order, the exercise-number title prefix, one gap per answer, no word
   bank or worked example hiding in `passage`, and unique item numbers within an exercise.
3. `**`/`*` marker balance: `**` count even, and single `*` count (after stripping `**...**` spans)
   even, within the unit's source range. A mismatched marker renders literal asterisks.
4. Every `JudgeCorrectItem.underlined` is a substring of its `sentence` (see §8).
5. No `answer` field starts with a bare `'` (see §8).
6. Grep the unit's block for Vietnamese-only fields missing their `*En`/`*Vi` sibling — every
   `title`/`instructions`/`passage`/`heading` needs an `*En`, every rule part `text`/`intro`/example needs a
   `*Vi`/`vi`.
7. If you touched `UnitClient.tsx` itself, grep it for raw Vietnamese characters
   (`[À-ỹ]`) outside of comments — there should be none; everything user-facing routes through
   `t()` or `loc()`.

If you're only adding a new unit's data (not touching the component), steps 1-6 are the ones that
matter; step 7 only applies when the shared rendering code changes.
