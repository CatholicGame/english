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

  const startedAt = Date.now();
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify(body),
  });
  // fetch() resolves on response headers, not on a fully-drained body — this is
  // time-to-first-byte only. Do NOT log this alone as "the call took Xms": for a
  // non-streaming completion the server typically only sends headers once it
  // starts flushing the body, so a fast ttfbMs next to a huge reasoning_tokens
  // count (seen previously) doesn't mean the model was fast — it means the real
  // time was spent in the res.json() below, downloading/parsing the body while
  // the model was still finishing generation server-side.
  const ttfbMs = Date.now() - startedAt;

  if (!res.ok) {
    const err = await res.text();
    console.error(`DeepSeek API error ${res.status} after ttfb=${ttfbMs}ms:`, err);
    throw new Error(`DeepSeek API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const totalMs = Date.now() - startedAt;
  const choice = data.choices?.[0];
  const content = choice?.message?.content;
  // Diagnostic: DeepSeek's reasoning models spend most of the latency on hidden
  // "thinking" tokens (reasoning_content) that never reach the visible content —
  // a slow call with a short answer and a short prompt is a strong signal this
  // is where the time went, not model/network throughput. Logged on every call
  // (not just failures) so a slow request can actually be diagnosed after the fact.
  console.log(
    `DeepSeek call: ttfb=${ttfbMs}ms total=${totalMs}ms finish_reason=${choice?.finish_reason},`,
    `reasoning_tokens=${data.usage?.completion_tokens_details?.reasoning_tokens ?? "n/a"},`,
    `reasoning_content_len=${choice?.message?.reasoning_content?.length ?? 0},`,
    `completion_tokens=${data.usage?.completion_tokens ?? "n/a"},`,
    `prompt_tokens=${data.usage?.prompt_tokens ?? "n/a"}`,
  );
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
