import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { getMyReview, listPublicReviews, upsertReview } from "@/lib/reviews-db";

const MAX_COMMENT_LEN = 1000;
const MAX_NAME_LEN = 60;

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const [reviews, myReview] = await Promise.all([listPublicReviews(), getMyReview(session.user.email)]);
  return NextResponse.json({ ok: true, reviews, myReview });
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "invalid_rating" }, { status: 400 });
  }

  const rawComment = typeof body?.comment === "string" ? body.comment.trim() : "";
  const rawName = typeof body?.name === "string" ? body.name.trim() : "";

  await upsertReview(session.user.email, {
    rating,
    comment: rawComment ? rawComment.slice(0, MAX_COMMENT_LEN) : undefined,
    name: rawName ? rawName.slice(0, MAX_NAME_LEN) : undefined,
  });
  return NextResponse.json({ ok: true });
}
