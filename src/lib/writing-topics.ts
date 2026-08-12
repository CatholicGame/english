// Topic presets for the writing-practice feature — plus any custom topics
// the learner has typed in, persisted in localStorage.

const STORAGE_KEY = "cpv-writing-topics";

const PRESET_TOPICS = [
  "Học tập",
  "Công việc",
  "Gia đình",
  "Du lịch",
  "Sức khỏe",
  "Mua sắm",
  "Công nghệ",
  "Môi trường",
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
  return [...PRESET_TOPICS, ...custom.filter((t) => !PRESET_TOPICS.includes(t))];
}

export function addCustomTopic(topic: string): string[] {
  const trimmed = topic.trim();
  if (!trimmed) return loadTopics();
  const custom = loadCustomTopics();
  if (!custom.includes(trimmed) && !PRESET_TOPICS.includes(trimmed)) {
    custom.push(trimmed);
    saveCustomTopics(custom);
  }
  return loadTopics();
}
