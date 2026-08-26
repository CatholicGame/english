import { NextResponse, type NextRequest, after } from "next/server";
import { buildPrompt, type PromptResult } from "@/lib/ai-prompts";
import type { IntentType } from "@/lib/ai-convo-store";
import { readSession } from "@/lib/google-oauth";
import { isGuestTrialActive, readGuestSession } from "@/lib/guest-cookie";
import { peekAiUsage, incrementAiUsage } from "@/lib/subscription-db";
import { incrementTokenUsage } from "@/lib/token-usage-db";
import { AI_DAILY_CALL_LIMIT } from "@/lib/subscription-store";
import { dayKey } from "@/lib/utils";
import { callDeepSeek } from "@/lib/deepseek-client";

export async function POST(request: NextRequest) {
  // Diagnostic: breaks down where a slow /api/ai call actually spends its time —
  // session/Firestore checks before the model call, vs callDeepSeek itself (which
  // logs its own ttfb/total split — see deepseek-client.ts) — so a 20s report
  // can be traced to a phase instead of assumed to be "the model is slow".
  const requestStartedAt = Date.now();
  const session = await readSession();
  let usageKey: string;
  if (session) {
    usageKey = session.user.email;
  } else {
    const guest = await readGuestSession();
    if (!guest || !isGuestTrialActive(guest)) {
      return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });
    }
    usageKey = `guest:${guest.id}`;
  }
  const afterSessionMs = Date.now() - requestStartedAt;

  const today = dayKey(new Date());
  const usage = await peekAiUsage(usageKey, today, AI_DAILY_CALL_LIMIT);
  if (!usage.allowed) {
    return NextResponse.json(
      { ok: false, error: "daily_limit_reached", message: `Bạn đã dùng hết ${AI_DAILY_CALL_LIMIT} lượt AI hôm nay. Quay lại vào ngày mai nhé!` },
      { status: 429 },
    );
  }
  const afterUsageCheckMs = Date.now() - requestStartedAt;

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

    const { data: result, usage } = await callDeepSeek(prompt);
    const totalRouteMs = Date.now() - requestStartedAt;
    console.log(
      `/api/ai [${intent}]: total=${totalRouteMs}ms`,
      `(session=${afterSessionMs}ms, usage_check=${afterUsageCheckMs - afterSessionMs}ms,`,
      `parse_and_deepseek=${totalRouteMs - afterUsageCheckMs}ms)`,
    );

    // Deferred until after the response is sent, so these Firestore round-trips
    // never add latency to the AI call itself — see incrementAiUsage() and
    // incrementTokenUsage().
    after(() =>
      Promise.all([
        incrementAiUsage(usageKey, today),
        incrementTokenUsage(usageKey, today, usage),
      ]),
    );

    return NextResponse.json({ ok: true, data: result });
  } catch (err: any) {
    console.error("AI route error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Internal error" },
      { status: 500 },
    );
  }
}