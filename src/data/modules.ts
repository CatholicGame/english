import { VERBS } from "./basic-verbs";
import { LISTEN_LESSONS } from "./listen-a-minute";

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
    slug: "listen-a-minute",
    title: "Listen A Minute",
    subtitle: "Short listening topics",
    description:
      "Listen to a short one-minute topic, fill in the gaps, fix the spelling, then extend with speaking and writing tasks.",
    statsLabel: `${LISTEN_LESSONS.length} topics · A–Z`,
    available: true,
  },
];
