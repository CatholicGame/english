import type { AllItem } from "./flatten";

const KEY_PREFIX = "english-mistakes";

export function loadMistakes(moduleKey: string): AllItem[] {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}:${moduleKey}`);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

export function saveMistakes(moduleKey: string, items: AllItem[]) {
  try {
    // Keep only last 30 unique items
    const seen = new Set<string>();
    const unique = items.filter((i) => (seen.has(i.key) ? false : (seen.add(i.key), true))).slice(0, 30);
    localStorage.setItem(`${KEY_PREFIX}:${moduleKey}`, JSON.stringify(unique));
  } catch { /* quota */ }
}

export function addMistakes(moduleKey: string, newItems: AllItem[]) {
  const existing = loadMistakes(moduleKey);
  saveMistakes(moduleKey, [...newItems, ...existing]);
}

export function clearMistakes(moduleKey: string) {
  try {
    localStorage.removeItem(`${KEY_PREFIX}:${moduleKey}`);
  } catch { /* ignore */ }
}