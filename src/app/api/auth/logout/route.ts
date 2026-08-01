import { NextResponse } from "next/server";
import { readSession, revokeSession } from "@/lib/google-oauth";
import { COOKIE_NAME } from "@/lib/session-cookie";

export async function POST() {
  const session = await readSession();
  if (session) await revokeSession(session);

  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
