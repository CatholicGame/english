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

/** Best-effort locale guess from the browser, used only as the FIRST-RUN
 * default (before the learner has ever picked a language in Settings) — once
 * saved, `loadAiLangPrefs()` always respects their explicit choice over this.
 * Defaults to "vi" for anything that isn't clearly an English-locale browser,
 * since the target audience is Vietnamese learners and most of them keep
 * their OS/browser in English for work while still wanting feedback in
 * Vietnamese — only skip straight to "vi" when a "vi" locale is detected. */
export function detectBrowserLang(): AiLang {
  if (typeof navigator === "undefined") return "vi";
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (langs.some((l) => l?.toLowerCase().startsWith("vi"))) return "vi";
  if (langs.some((l) => l?.toLowerCase().startsWith("en"))) return "en";
  return "vi";
}

export function loadAiLangPrefs(): AiLangPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { lang: "vi", ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return { lang: detectBrowserLang() };
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
