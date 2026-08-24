// Shared TypeScript types for the English Grammar in Use unit data. Unit
// content itself lives in grammar-units/units-<range>.ts, split by unit
// number range so a growing unit count doesn't keep enlarging one file; see
// docs/grammar-in-use-unit-authoring.md for where a new unit goes.

export type GrammarItemType = "fill_mc" | "type_fill" | "judge_correct" | "match_pairs";

export interface GrammarExample {
  en: string;
  note?: string;
  /** Vietnamese translation of `en`, shown only when the UI language is
   * Vietnamese (never mixed in for an English UI). Every example should have
   * one — this is a learner aid, not optional polish. */
  vi?: string;
}

/** A short conjugation/reference grid the book prints as a table (e.g. the
 * am/is/are + -ing rows). Rendered as an actual table, not squeezed into body
 * prose. */
export interface RuleTable {
  headers?: string[];
  /** "grid" (default) is the bordered box the book uses for a conjugation or a
   * two-column comparison. "list" is the book's indented label-and-value list
   * ("the main part: I'll call you again later"), which is a list, not a box,
   * and reads wrong inside table borders. */
  variant?: "grid" | "list";
  rows: string[][];
}

/** A paragraph of explanation. */
export interface RuleText {
  kind: "text";
  text: string;
  /** Vietnamese translation, shown only when the UI language is Vietnamese. */
  vi?: string;
}

/** The example sentences belonging to whatever was just explained, optionally
 * under the book's own sub-heading for them ("Offering to do something"). */
export interface RuleExamples {
  kind: "examples";
  /** The book's sub-heading over this group, when it prints one. */
  heading?: string;
  /** Vietnamese translation of `heading`. */
  headingVi?: string;
  items: GrammarExample[];
}

/** A verb-form grid or comparison the book prints as a table. Not translated:
 * the cells are the target grammar forms themselves, not explanation prose. */
export interface RuleTablePart {
  kind: "table";
  table: RuleTable;
}

/** The book's boxed word list (getting, becoming, changing ...), shown as
 * wrapped tags instead of a comma-separated sentence. */
export interface RuleWords {
  kind: "words";
  words: string[];
}

/** The book's illustrated example situation: a short scene, plus what somebody
 * says in it, which the book draws as a speech bubble. It is the setup for the
 * rule, not part of the explanation, so it gets its own scene card rather than
 * being the first paragraph of the prose. */
export interface RuleSituation {
  kind: "situation";
  text: string;
  vi?: string;
  /** What the people in the scene say, in order. */
  quotes?: { speaker?: string; text: string; vi?: string }[];
}

/** One piece of a rule block, in the order the book prints it.
 *
 * A block is a SEQUENCE of these rather than the fixed
 * body-then-table-then-examples shape it used to have, because the book freely
 * alternates one line of explanation, the examples belonging to that line,
 * another line, a grid, a word box. Flattening that into one prose blob plus
 * one example list at the end is what made the explanation pages read as a
 * wall of text, and it forced explanation lines to be smuggled in as fake
 * "examples" just to keep them next to the sentences they introduce. */
export type RulePart = RuleText | RuleExamples | RuleTablePart | RuleWords | RuleSituation;

export interface RuleBlock {
  label?: string; // "A", "B", "C" ... matching the book's lettered sections
  heading?: string;
  /** English counterpart of `heading` (heading is authored Vietnamese-first,
   * same convention as title/instructions elsewhere in this file). */
  headingEn?: string;
  /** A short standalone lead-in line before the block's content, e.g. "Study
   * this example situation:" - rendered on its own line instead of running
   * into the scenario text that follows it. */
  intro?: string;
  /** Vietnamese translation of `intro`, shown only when the UI language is
   * Vietnamese. */
  introVi?: string;
  /** The block's content, in the book's own order. Keep each piece as small as
   * the book keeps it: one explanation line is one `text` part, and the
   * examples that illustrate it are the `examples` part right after it. Never
   * merge several of the book's separate lines into one paragraph, and never
   * put an explanation line inside an `examples` part. */
  parts: RulePart[];
}

export interface RuleStep {
  kind: "rule";
  title: string;
  /** English counterpart of `title`, shown when the UI language is English.
   * `title` itself stays the Vietnamese default (this module was authored
   * Vietnamese-first) — omit only for units not yet given an English pass. */
  titleEn?: string;
  blocks: RuleBlock[];
}

/** One already-answered item the book prints at the top of an exercise as a
 * worked example ("1 I don't eat much during the day. I never have lunch."),
 * carrying the exact same shape as a real item so it renders as an
 * already-filled row in the same list, in the same visual language, instead of
 * being flattened into a prose blob above the exercise where a learner has to
 * work out which part of it was the answer. */
export interface WorkedExample {
  /** The book's own item number, e.g. "1". */
  label?: string;
  /** Situation/story text the example belongs to, same role as on a real item. */
  context?: string;
  /** English counterpart of `context`. Omit when the context is the book's own
   * English text, which is the usual case. */
  contextEn?: string;
  /** The sentence with `___` where the answer goes, or exactly "___" when the
   * whole answer is the sentence. */
  prompt: string;
  answer: string;
  /** See TypeFillItem.extraBlanks: a worked example can show a multi-gap
   * sentence too. */
  extraBlanks?: { answer: string; accept?: string[] }[];
}

/** Chrome every practice exercise can carry, mirroring the parts the book
 * prints around its numbered items:
 *  - `wordBank`: the boxed list of words/phrases to choose from,
 *  - `examples`: the item(s) the book has already filled in,
 *  - `passage`: genuine shared reading context (a text to read, a dialogue),
 *  - `startNumber`: where the book's own numbering picks up.
 * They used to be crammed into `passage` as one run-on string, which rendered
 * as an undifferentiated grey block a learner could not scan. Keep them apart. */
interface ExerciseChrome {
  wordBank?: string[];
  examples?: WorkedExample[];
  /** ONLY a real shared context (a reading text, a dialogue setup). Never a
   * word bank and never a worked example: those have their own fields. */
  passage?: string;
  /** English counterpart of `passage`. Omit when the passage is already the
   * book's own English text. */
  passageEn?: string;
  /** The book's own item number for items[0]. Defaults to 1, or to
   * examples.length + 1 when the exercise opens with worked examples. */
  startNumber?: number;
}

export interface FillMcItem {
  /** The book's own item number when it is not a plain running count (e.g.
   * "13a"). Falls back to the derived running number. */
  label?: string;
  /** Situation/story the item belongs to. Consecutive items sharing the exact
   * same string are rendered as one group under a single copy of it, the way
   * the book prints one story with several blanks in it, instead of repeating
   * the whole story inside every item. */
  context?: string;
  /** English counterpart of `context`. Omit when the context is the book's own
   * English text, which is the usual case. */
  contextEn?: string;
  before: string;
  after: string;
  options: string[];
  answer: string;
  /** Other options in `options` that are also correct, for the rare item where
   * the book's own answer key allows more than one form (e.g. "is or are").
   * See TypeFillItem.accept for the same idea on a typed answer. */
  accept?: string[];
}

export interface FillMcStep extends ExerciseChrome {
  kind: "fill_mc";
  title: string;
  titleEn?: string;
  instructions: string;
  /** English counterpart of `instructions`. */
  instructionsEn?: string;
  items: FillMcItem[];
}

export interface TypeFillItem {
  /** See FillMcItem.label. */
  label?: string;
  /** See FillMcItem.context. */
  context?: string;
  /** See FillMcItem.contextEn. */
  contextEn?: string;
  /** The sentence to complete, with `___` marking the blank. Exactly "___"
   * when the exercise asks for a whole sentence rather than a gap in one
   * ("Write questions", "Ask her") - the blank line is then dropped and only
   * the answer box is shown. */
  prompt: string;
  answer: string;
  /** Other wordings that are equally correct. The book prints one answer, but
   * exercises that ask the learner to write a whole question or sentence
   * ("Write questions", "Ask her") have several natural correct forms, and
   * exact-matching only the printed one marks good answers wrong. */
  accept?: string[];
  /** Gaps 2..n, when the book prints ONE sentence with several gaps in it
   * ("How long ___ (you / drive) when the accident ___ (happen)?"). `prompt`
   * then holds one `___` per gap: the first takes `answer`/`accept`, the rest
   * take these in order, and every gap is typed and scored on its own.
   * Splitting such a sentence into one item per gap instead (which is what an
   * earlier pass did) means printing the whole sentence again for each gap
   * with the other gaps already filled in, which hands the learner the very
   * answers they are supposed to produce. */
  extraBlanks?: { answer: string; accept?: string[] }[];
}

export interface TypeFillStep extends ExerciseChrome {
  kind: "type_fill";
  title: string;
  titleEn?: string;
  instructions: string;
  /** English counterpart of `instructions`. */
  instructionsEn?: string;
  items: TypeFillItem[];
}

/** The book's recurring "Are the underlined verbs OK? Correct them where
 * necessary" exercise: the learner first judges whether the highlighted part is
 * right, and only writes a correction when it isn't. Squeezing this into
 * type_fill would throw away the judgement half, which is the point of it. */
export interface JudgeCorrectItem {
  /** See FillMcItem.label. */
  label?: string;
  sentence: string;
  /** The exact substring of `sentence` the book underlines. */
  underlined: string;
  ok: boolean;
  /** Replacement for `underlined`, required when ok is false. */
  correction?: string;
  accept?: string[];
}

export interface JudgeCorrectStep {
  kind: "judge_correct";
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  /** The book's own item number for items[0]. */
  startNumber?: number;
  items: JudgeCorrectItem[];
}

export interface AiPracticeStep {
  kind: "ai_practice";
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  ruleSummary: string; // short EN description of the grammar point, sent to the AI for grading context
}

/** The book's "the sentences on the right follow those on the left, which
 * goes with which?" exercise: a numbered left column and a lettered right
 * column, printed in independent (non-corresponding) orders. `left` and
 * `right` are each shown in the book's own printed order; `answers[i]` is the
 * exact string from `right` that pairs with `left[i]`. Rendered as a
 * tap-left-then-tap-right matching UI, not as fill_mc's repeated-option-list
 * (which duplicates the whole option pool under every single item). */
export interface MatchPairsStep {
  kind: "match_pairs";
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  left: string[];
  right: string[];
  answers: string[];
}

export type GrammarUnitStep = RuleStep | FillMcStep | TypeFillStep | JudgeCorrectStep | MatchPairsStep | AiPracticeStep;

export interface GrammarUnitMeta {
  unit: number;
  slug: string;
  title: string;
  topic: string;
  available: boolean;
}

export interface GrammarUnit {
  unit: number;
  slug: string;
  title: string;
  topic: string;
  steps: GrammarUnitStep[];
}

