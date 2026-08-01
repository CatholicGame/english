import { VERBS } from "./basic-verbs";

export interface ModuleDef {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  itemCount: number;
  verbCount: number;
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
    itemCount: collocationsItemCount,
    verbCount: VERBS.length,
    available: true,
  },
];
