// AI response language preference — which single language the AI writes
// feedback/evaluation text in. Kept separate from the practice dialogue itself
// (the conversation/discussion partner always replies in English, since that's
// the point of the exercise) — this only controls explanatory prose, and lets
// the app ask for ONE language instead of generating both EN+VI every time.

export type AiLang = "vi" | "en";

export interface AiLangPrefs {
  lang: AiLang;
}

const STORAGE_KEY = "english-ai-lang-prefs";
const DEFAULT_PREFS: AiLangPrefs = { lang: "vi" };

export function loadAiLangPrefs(): AiLangPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_PREFS;
}

export function saveAiLangPrefs(prefs: AiLangPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // quota / private mode
  }
}

/** Convenience accessor for call sites that just need to stamp a payload. */
export function currentAiLang(): AiLang {
  return loadAiLangPrefs().lang;
}
