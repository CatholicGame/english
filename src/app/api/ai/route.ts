import { NextResponse, type NextRequest } from "next/server";
import { buildPrompt, type PromptResult } from "@/lib/ai-prompts";
import type { IntentType } from "@/lib/ai-convo-store";
import { readSession } from "@/lib/google-oauth";
import { checkAndIncrementAiUsage } from "@/lib/subscription-db";
import { AI_DAILY_CALL_LIMIT } from "@/lib/subscription-store";
import { dayKey } from "@/lib/utils";

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const MODEL = "deepseek-v4-flash";

function apiKey(): string {
  const v = process.env.DEEPSEEK_API_KEY;
  if (!v) throw new Error("DEEPSEEK_API_KEY not found in environment variables");
  return v.trim();
}

async function callDeepSeek(prompt: PromptResult) {
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

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const usage = await checkAndIncrementAiUsage(session.user.email, dayKey(new Date()), AI_DAILY_CALL_LIMIT);
  if (!usage.allowed) {
    return NextResponse.json(
      { ok: false, error: "daily_limit_reached", message: `Bạn đã dùng hết ${AI_DAILY_CALL_LIMIT} lượt AI hôm nay. Quay lại vào ngày mai nhé!` },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const { intent, payload } = body as { intent: IntentType; payload: Record<string, unknown> };

    if (!intent) {
      return NextResponse.json({ ok: false, error: "missing intent" }, { status: 400 });
    }

    let prompt: PromptResult;
    try {
      prompt = buildPrompt(intent, payload);
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }

    const result = await callDeepSeek(prompt);

    return NextResponse.json({ ok: true, data: result });
  } catch (err: any) {
    console.error("AI route error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Internal error" },
      { status: 500 },
    );
  }
}