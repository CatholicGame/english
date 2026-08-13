import type { AiMessage, IntentType } from "./ai-convo-store";

export interface SharedConvoPayload {
  kind: "conversation";
  itemLabel: string;
  intent: IntentType;
  messages: AiMessage[];
  /** End-of-conversation AI evaluation, when shared right after "End" — see ConversationFeedback. */
  feedback?: Record<string, unknown>;
  sharedAt: number;
}
