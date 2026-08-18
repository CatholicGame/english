import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { addFeedback, type FeedbackContext } from "@/lib/feedback-db";

const MAX_MESSAGE_LEN = 2000;

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "invalid_rating" }, { status: 400 });
  }

  const rawMessage = typeof body?.message === "string" ? body.message.trim() : "";
  const message = rawMessage ? rawMessage.slice(0, MAX_MESSAGE_LEN) : undefined;
  const context: FeedbackContext = body?.context === "prompt" ? "prompt" : "settings";

  await addFeedback({ email: session.user.email, rating, message, context });
  return NextResponse.json({ ok: true });
}
