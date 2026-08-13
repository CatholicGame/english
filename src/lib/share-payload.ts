import type { AiMessage, IntentType } from "./ai-convo-store";

export interface SharedConvoPayload {
  kind: "conversation";
  itemLabel: string;
  intent: IntentType;
  messages: AiMessage[];
  sharedAt: number;
}
