import { shuffle } from "./utils";
import type { AllItem } from "./flatten";

export type Mode = "flash" | "mc" | "type" | "match" | "listen" | "mix";
export type SingleMode = "mc" | "type" | "listen" | "flash";

export interface FlashQuestion {
  kind: "flash";
  item: AllItem;
}
export interface ChoiceQuestion {
  kind: "mc" | "listen";
  item: AllItem;
  options: string[];
  answer: string;
}
export interface TypeQuestion {
  kind: "type";
  item: AllItem;
  answer: string;
}
export interface MatchQuestion {
  kind: "match";
  items: AllItem[];
  right: string[];
}
export type Question = FlashQuestion | ChoiceQuestion | TypeQuestion | MatchQuestion;

export interface Session {
  mode: Mode;
  label: string;
  qs: Question[];
  pool: AllItem[];
}

export const MODE_LABELS: Record<Mode, string> = {
  flash: "Flashcards",
  mc: "Multiple choice",
  type: "Typing",
  match: "Matching",
  listen: "Listen & choose",
  mix: "Mixed review",
};

const MIX_POOL: SingleMode[] = ["mc", "type", "listen"];

export function mkQuestion(mode: SingleMode, item: AllItem, pool: AllItem[]): Question {
  if (mode === "flash") return { kind: "flash", item };
  if (mode === "mc" || mode === "listen") {
    const others = shuffle(pool.filter((x) => x.key !== item.key && x.en !== item.en)).slice(0, 3);
    return { kind: mode, item, options: shuffle([item.en, ...others.map((o) => o.en)]), answer: item.en };
  }
  return { kind: "type", item, answer: item.term };
}

export function buildSession(mode: Mode, pool: AllItem[], label: string, sessionLength: number): Session | null {
  if (!pool.length) return null;

  if (mode === "match") {
    const picked = shuffle(pool).slice(0, 16);
    const qs: Question[] = [];
    for (let i = 0; i + 3 < picked.length; i += 4) {
      const four = picked.slice(i, i + 4);
      qs.push({ kind: "match", items: four, right: shuffle(four.map((x) => x.en)) });
    }
    if (!qs.length) return null;
    return { mode, label, qs, pool };
  }

  const picked = shuffle(pool).slice(0, sessionLength);
  const qs = picked.map((it) =>
    mkQuestion(mode === "mix" ? MIX_POOL[Math.floor(Math.random() * MIX_POOL.length)] : (mode as SingleMode), it, pool),
  );
  return { mode, label, qs, pool };
}
