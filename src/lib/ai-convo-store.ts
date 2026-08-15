// Generic local+Drive-synced AI conversation store.
// Same pattern as notes-store.ts — every AI interaction is auto-saved
// per moduleKey, keyed by itemKey (collocation term, task key, etc.).
// One itemKey can hold many conversations (multiple practice sessions).

export type IntentType =
  | "cpv_sentence_check"
  | "cpv_paraphrase"
  | "cpv_conversation"
  | "cpv_conversation_preview"
  | "cpv_translate"
  | "cpv_translate_prompt"
  | "cpv_translate_batch"
  | "cpv_translate_batch_review"
  | "cpv_context_quiz"
  | "cpv_example_gen"
  | "text_lookup"
  | "grammar_lookup"
  | "cpv_writing_passage"
  | "cpv_writing_review"
  | "lam_opinion_feedback"
  | "discussion"
  | "cielts_writing_feedback"
  | "cielts_speaking_feedback"
  | "cielts_vocab_sentence";

export interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface AiConversation {
  id: string;
  intent: IntentType;
  itemKey: string;
  itemLabel: string;
  messages: AiMessage[];
  createdAt: number;
  updatedAt: number;
}

export type AiConvoData = Record<string, AiConversation[]>;

function localStorageKey(moduleKey: string): string {
  return `${moduleKey}:ai-convos`;
}

export function loadAiConvos(moduleKey: string): AiConvoData {
  try {
    const raw = localStorage.getItem(localStorageKey(moduleKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistAiConvos(moduleKey: string, data: AiConvoData) {
  try {
    localStorage.setItem(localStorageKey(moduleKey), JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota)
  }
}

export function getConvosFor(all: AiConvoData, itemKey: string): AiConversation[] {
  return all[itemKey] ?? [];
}

export function withMessagesAppended(
  all: AiConvoData,
  itemKey: string,
  itemLabel: string,
  convoId: string | null,
  intent: IntentType,
  messages: AiMessage[],
): AiConvoData {
  const existing = all[itemKey] ?? [];

  if (convoId) {
    const updated = existing.map((c) =>
      c.id === convoId
        ? { ...c, messages: [...c.messages, ...messages], updatedAt: Date.now() }
        : c,
    );
    return { ...all, [itemKey]: updated };
  }

  const newConvo: AiConversation = {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    intent,
    itemKey,
    itemLabel,
    messages,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return { ...all, [itemKey]: [...existing, newConvo] };
}

export function withConvoDeleted(
  all: AiConvoData,
  itemKey: string,
  convoId: string,
): AiConvoData {
  const existing = all[itemKey];
  if (!existing) return all;
  return {
    ...all,
    [itemKey]: existing.filter((c) => c.id !== convoId),
  };
}

/** Union-merge cloud and local copies, keeping the newer version of each conversation. */
export function mergeAiConvos(local: AiConvoData, cloud: AiConvoData): AiConvoData {
  const keys = new Set([...Object.keys(local), ...Object.keys(cloud)]);
  const out: AiConvoData = {};
  for (const key of keys) {
    const a = local[key] ?? [];
    const b = cloud[key] ?? [];
    const map = new Map<string, AiConversation>();
    for (const c of [...a, ...b]) {
      const existing = map.get(c.id);
      if (!existing || c.updatedAt > existing.updatedAt) map.set(c.id, c);
    }
    out[key] = [...map.values()].sort((x, y) => y.createdAt - x.createdAt);
  }
  return out;
}