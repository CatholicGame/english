// Global score — accumulates XP across all modules.
// Stored in localStorage under a common key for the whole app.

const STORAGE_KEY = "english-global-score";

export interface GlobalScoreData {
  xp: number;
}

export function loadGlobalScore(): GlobalScoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { xp: 0 };
}

export function saveGlobalScore(data: GlobalScoreData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* quota / private mode */ }
}

export function addGlobalXP(amount: number): GlobalScoreData {
  const data = loadGlobalScore();
  data.xp = Math.max(0, data.xp + amount);
  saveGlobalScore(data);
  // Dispatch custom event so React contexts can re-render
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("global-xp-changed", { detail: data }));
  }
  return data;
}