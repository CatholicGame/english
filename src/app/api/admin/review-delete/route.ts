import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { deleteReview } from "@/lib/reviews-db";

export async function POST(request: NextRequest) {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (role !== "super") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });

  await deleteReview(id);
  return NextResponse.json({ ok: true });
}
