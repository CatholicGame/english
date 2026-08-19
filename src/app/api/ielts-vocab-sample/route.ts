import { NextResponse, type NextRequest, after } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { findVocabWord } from "@/data/cambridge-vocabulary-ielts";
import { getVocabSample, setVocabSample } from "@/lib/ielts-vocab-sample-db";
import { buildPrompt } from "@/lib/ai-prompts";
import { callDeepSeek } from "@/lib/deepseek-client";
import { incrementTokenUsage } from "@/lib/token-usage-db";
import { dayKey } from "@/lib/utils";

// Shared, cached-forever AI content — deliberately NOT gated by
// AI_DAILY_CALL_LIMIT (see /api/ai/route.ts) since the benefit is shared
// across every learner rather than personal to whoever's request happens to
// be the cache miss. Safe to exempt from the per-user quota only because
// `findVocabWord` bounds the worst case to one generation per real vocab
// word, ever — an arbitrary/unknown `term` is rejected before any AI call.
export async function GET(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "reauth_required" }, { status: 401 });

  const term = request.nextUrl.searchParams.get("term");
  if (!term) return NextResponse.json({ error: "missing_term" }, { status: 400 });

  const word = findVocabWord(term);
  if (!word) return NextResponse.json({ error: "unknown_term" }, { status: 400 });

  const cached = await getVocabSample(word.term);
  if (cached) return NextResponse.json({ paragraph: cached.paragraph });

  try {
    const prompt = buildPrompt("cielts_vocab_paragraph", {
      term: word.term,
      pos: word.pos,
      en: word.en,
      usageNote: word.usageNote,
    });
    const { data, usage } = await callDeepSeek(prompt);
    const content = (data as { content?: unknown })?.content;
    const paragraph = typeof content === "string" ? content.trim() : "";
    if (!paragraph) throw new Error("empty paragraph from AI");

    const saved = await setVocabSample(word.term, paragraph);
    // Rare (once ever per vocab word, see comment above) but still a real AI
    // cost — attribute it to whoever happened to trigger the cache miss, same
    // as every /api/ai call, so the admin token-usage view stays complete.
    after(() => incrementTokenUsage(session.user.email, dayKey(new Date()), usage));
    return NextResponse.json({ paragraph: saved.paragraph });
  } catch (err) {
    console.error("ielts-vocab-sample: generation failed", err);
    return NextResponse.json({ error: "generation_failed" }, { status: 502 });
  }
}
