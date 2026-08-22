// User display preferences (font family + UI scale), applied as CSS custom
// properties on <html> so a single change point in globals.css picks them up.

export type FontId = "archivo" | "nunito" | "lora";

export interface UiPrefs {
  fontId: FontId;
  zoom: number;
}

const STORAGE_KEY = "english-ui-prefs";
// ponytail: back to 1 - raising this to 1.3 by default made every screen
// built on ActionBarScreen/Modal genuinely overflow the real viewport by the
// zoom factor. CSS `zoom` scales ANY length value rendered within its
// subtree, including an explicit height/max-height computed from a "correct"
// measurement (vh, dvh, or even a JS-measured --real-vh) - only offsets on a
// position:fixed element (anchored to the true viewport, not to zoom's
// scaled coordinate space) are safe from this, which is why the settings
// dropdown fix holds at any zoom but the scrollable content areas don't.
// Fixing that for real needs the app's font sizes off zoom entirely (a
// rem-based scale), not a bigger default multiplier - out of scope here.
export const DEFAULT_UI_PREFS: UiPrefs = { fontId: "archivo", zoom: 1 };

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
