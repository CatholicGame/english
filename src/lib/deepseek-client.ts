import type { PromptResult } from "./ai-prompts";

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const MODEL = "deepseek-v4-flash";

function apiKey(): string {
  const v = process.env.DEEPSEEK_API_KEY;
  if (!v) throw new Error("DEEPSEEK_API_KEY not found in environment variables");
  return v.trim();
}

export async function callDeepSeek(prompt: PromptResult) {
  const { systemPrompt, userMessage, temperature, jsonMode } = prompt;
  const body: Record<string, unknown> = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature,
    // No max_tokens cap — let DeepSeek use the model's own default/maximum output length.
  };
  // DO NOT use response_format: json_object — DeepSeek v4 handles it inconsistently
  // Instead, always extract JSON from text response

  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`DeepSeek API error ${res.status}:`, err);
    throw new Error(`DeepSeek API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content;
  if (!content) {
    console.error(
      "Empty content from DeepSeek. finish_reason:", choice?.finish_reason,
      "reasoning_content len:", choice?.message?.reasoning_content?.length ?? 0,
    );
    if (choice?.finish_reason === "length") {
      throw new Error("DeepSeek ran out of tokens before answering (finish_reason: length).");
    }
    throw new Error("Empty response from DeepSeek");
  }

  // Conversation intents return plain text
  if (jsonMode === false) return { content };

  // Extract JSON from response (handles ```json blocks, raw JSON, or wrapped text)
  const codeBlock = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const jsonStr = codeBlock ? codeBlock[1] : content.match(/\{[\s\S]*\}/)?.[0] || content;
  try { return JSON.parse(jsonStr); } catch {
    console.error("Failed to parse JSON from:", content.slice(0, 300));
    return { raw: content };
  }
}
