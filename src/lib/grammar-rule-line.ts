/** Which language a line of a grammar rule page shows, and what its chip
 * reveals. Extracted from the renderer so the rule can be stated once and
 * checked (see `scripts/check-grammar-data.mjs`).
 *
 * A rule page shows ONE language at a time. Stacking English and Vietnamese on
 * every line doubles the length of the page and buries the sentence the learner
 * is meant to read, so:
 *
 * - `explanation` prose (the block heading, the intro, `text` parts, a
 *   situation's scene) reads in Vietnamese, with the book's English on the chip;
 * - `book` sentences (examples, speech bubbles) stay in English, because
 *   reading them is the point of the module, with the Vietnamese meaning on the
 *   chip;
 * - "Bản gốc" (`original`) puts the whole page in the book's English and drops
 *   the chips, so that view is single-language too;
 * - an English UI never shows Vietnamese at all.
 */
export function ruleLine(
  role: "explanation" | "book",
  en: string,
  vi: string | undefined,
  lang: string,
  original: boolean,
): { main: string; alt?: string } {
  if (lang === "en" || original || !vi) return { main: en };
  return role === "explanation" ? { main: vi, alt: en } : { main: en, alt: vi };
}
