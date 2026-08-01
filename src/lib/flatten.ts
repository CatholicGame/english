import type { Verb, VerbItem } from "@/data/basic-verbs";

export interface AllItem extends VerbItem {
  verb: string;
  group: string;
  vIdx: number;
  key: string;
}

export function buildAllItems(verbs: Verb[]): AllItem[] {
  const all: AllItem[] = [];
  verbs.forEach((v, vIdx) => {
    v.items.forEach((it) => {
      all.push({ ...it, verb: v.verb, group: v.group, vIdx, key: `${v.verb}::${it.term}` });
    });
  });
  return all;
}
