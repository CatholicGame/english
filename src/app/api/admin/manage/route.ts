import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { addSubAdmin, removeSubAdmin } from "@/lib/admin-db";

// Only a super admin (ADMIN_EMAILS) may add/remove viewer sub-admins — a
// viewer must never be able to grant itself or anyone else more access.
export async function POST(request: NextRequest) {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (role !== "super") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : null;
  const action = body?.action as "add" | "remove" | undefined;
  if (!email || (action !== "add" && action !== "remove")) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (action === "add") {
    await addSubAdmin(email, session!.user.email);
  } else {
    await removeSubAdmin(email);
  }

  return NextResponse.json({ ok: true });
}
