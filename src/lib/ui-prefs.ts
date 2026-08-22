// User display preferences (font family + UI scale), applied as CSS custom
// properties on <html> so a single change point in globals.css picks them up.

export type FontId = "archivo" | "nunito" | "lora";

export interface UiPrefs {
  fontId: FontId;
  zoom: number;
}

const STORAGE_KEY = "english-ui-prefs";
// 1.3 (not 1): text at 100% read too small without the personal size slider,
// which most people never touch. Anyone with an existing saved preference
// (including an old 1) keeps it - this default only applies to visits with
// nothing saved yet.
export const DEFAULT_UI_PREFS: UiPrefs = { fontId: "archivo", zoom: 1.3 };

export function loadUiPrefs(): UiPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_UI_PREFS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_UI_PREFS;
}

export function saveUiPrefs(prefs: UiPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // quota / private mode
  }
}

export function applyUiPrefs(prefs: UiPrefs) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--font-user", `var(--font-${prefs.fontId})`);
  document.documentElement.style.setProperty("--ui-zoom", String(prefs.zoom));
}
