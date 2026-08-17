import { NextResponse, type NextRequest } from "next/server";
import { buildPrompt, type PromptResult } from "@/lib/ai-prompts";
import type { IntentType } from "@/lib/ai-convo-store";
import { readSession } from "@/lib/google-oauth";
import { checkAndIncrementAiUsage } from "@/lib/subscription-db";
import { AI_DAILY_CALL_LIMIT } from "@/lib/subscription-store";
import { dayKey } from "@/lib/utils";
import { callDeepSeek } from "@/lib/deepseek-client";

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