// Every "Grammar in Use" book the app digitizes, keyed by its module slug
// (= route segment under /modules and its ProgressProvider storage key). The
// unit list and unit wizard under src/app/modules/english-grammar-in-use/ are
// shared by every book and only ever reach unit data through this lookup.

import type { GrammarSection, GrammarUnit, GrammarUnitMeta } from "./grammar-units/types";
import { GRAMMAR_SECTIONS, GRAMMAR_UNITS, UNITS_META } from "./english-grammar-in-use";
import { ADV_GRAMMAR_SECTIONS, ADV_GRAMMAR_UNITS, ADV_UNITS_META } from "./advanced-grammar-in-use";

export interface GrammarBook {
  moduleSlug: string;
  title: string;
  units: GrammarUnit[];
  meta: GrammarUnitMeta[];
  sections: GrammarSection[];
}

export const GRAMMAR_BOOKS: GrammarBook[] = [
  { moduleSlug: "english-grammar-in-use", title: "English Grammar in Use", units: GRAMMAR_UNITS, meta: UNITS_META, sections: GRAMMAR_SECTIONS },
  { moduleSlug: "advanced-grammar-in-use", title: "Advanced Grammar in Use", units: ADV_GRAMMAR_UNITS, meta: ADV_UNITS_META, sections: ADV_GRAMMAR_SECTIONS },
];

export function getGrammarBook(moduleSlug: string): GrammarBook {
  return GRAMMAR_BOOKS.find((b) => b.moduleSlug === moduleSlug) ?? GRAMMAR_BOOKS[0];
}
