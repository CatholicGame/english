// Topic presets for the writing-practice feature — plus any custom topics
// the learner has typed in, persisted in localStorage.
//
// Preset topics are bilingual ({vi, en}) but the storage API stays `string[]`
// (the Vietnamese label is the canonical key) — the UI localizes each preset
// for display via `topicForLang`, and custom topics pass through as-is.

const STORAGE_KEY = "cpv-writing-topics";

interface WritingTopic {
  vi: string;
  en: string;
}

const PRESET_TOPICS: WritingTopic[] = [
  { vi: "Học tập", en: "Studying" },
  { vi: "Công việc", en: "Work" },
  { vi: "Gia đình", en: "Family" },
  { vi: "Du lịch", en: "Travel" },
  { vi: "Sức khỏe", en: "Health" },
  { vi: "Mua sắm", en: "Shopping" },
  { vi: "Công nghệ", en: "Technology" },
  { vi: "Môi trường", en: "Environment" },
];

function loadCustomTopics(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomTopics(topics: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function loadTopics(): string[] {
  const custom = loadCustomTopics();
  return [...PRESET_TOPICS.map((p) => p.vi), ...custom.filter((tp) => !PRESET_TOPICS.some((p) => p.vi === tp))];
}

/** Localizes a topic for display. Presets map vi→en; custom topics pass
 * through unchanged (the learner typed them, so they're already right). */
export function topicForLang(topic: string, lang: "vi" | "en"): string {
  const preset = PRESET_TOPICS.find((p) => p.vi === topic);
  if (!preset) return topic;
  return lang === "en" ? preset.en : preset.vi;
}

export function addCustomTopic(topic: string): string[] {
  const trimmed = topic.trim();
  if (!trimmed) return loadTopics();
  const custom = loadCustomTopics();
  if (!custom.includes(trimmed) && !PRESET_TOPICS.some((p) => p.vi === trimmed)) {
    custom.push(trimmed);
    saveCustomTopics(custom);
  }
  return loadTopics();
}
