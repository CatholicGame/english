import { VERBS } from "./basic-verbs";
import { LISTEN_LESSONS } from "./listen-a-minute";
import { UNITS_META } from "./cambridge-vocabulary-ielts";
import { UNITS_META as IDIOM_UNITS_META } from "./idioms";
import { UNITS_META as GRAMMAR_UNITS_META } from "./english-grammar-in-use";

export interface ModuleDef {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  statsLabel: string;
  available: boolean;
}

const collocationsItemCount = VERBS.reduce((sum, v) => sum + v.items.length, 0);

export const MODULES: ModuleDef[] = [
  {
    slug: "collocations-phrasal-verbs",
    title: "Collocations & Phrasal Verbs",
    subtitle: "49 basic verbs",
    description:
      "Master the collocations and phrasal verbs built from the most common English verbs, grouped by meaning.",
    statsLabel: `${VERBS.length} verbs · ${collocationsItemCount} phrases`,
    available: true,
  },
  {
    slug: "idioms",
    title: "Idioms",
    subtitle: "25 units · 300+ idioms",
    description:
      "Learn everyday English idioms grouped by topic — meaning in English & Vietnamese, origin story, examples, then practice translating.",
    statsLabel: `${IDIOM_UNITS_META.length} units`,
    available: true,
  },
  {
    slug: "listen-a-minute",
    title: "Listen A Minute",
    subtitle: "Short listening topics",
    description:
      "Listen to a short one-minute topic, fill in the gaps, fix the spelling, then extend with speaking and writing tasks.",
    statsLabel: `${LISTEN_LESSONS.length} topics · A–Z`,
    available: true,
  },
  {
    slug: "cambridge-vocabulary-ielts-advanced",
    title: "Cambridge Vocabulary for IELTS Advanced",
    subtitle: "25 units · C1–C2",
    description:
      "Work through each unit's real listening, reading, speaking and vocabulary-building tasks from the Cambridge IELTS Advanced coursebook, fully interactive.",
    statsLabel: `${UNITS_META.length} units · ${UNITS_META.filter((u) => u.available).length} ready`,
    available: true,
  },
  {
    slug: "english-grammar-in-use",
    title: "English Grammar in Use",
    subtitle: "145 units · Intermediate",
    description:
      "Work through Raymond Murphy's classic grammar reference unit by unit: learn the rule, then practice with the book's own exercises.",
    statsLabel: `${GRAMMAR_UNITS_META.length} units · ${GRAMMAR_UNITS_META.filter((u) => u.available).length} ready`,
    available: true,
  },
];
