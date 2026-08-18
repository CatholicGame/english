import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { replyToReview } from "@/lib/reviews-db";

const MAX_REPLY_LEN = 1000;

export async function POST(request: NextRequest) {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (role !== "super") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  const message = typeof body?.message === "string" ? body.message : "";
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });

  await replyToReview(id, message.slice(0, MAX_REPLY_LEN));
  return NextResponse.json({ ok: true });
}
