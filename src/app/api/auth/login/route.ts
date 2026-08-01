import { NextResponse, type NextRequest } from "next/server";
import { buildAuthUrl, createOAuthState } from "@/lib/google-oauth";

const SHORT_LIVED = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/api/auth", maxAge: 300 };

export async function GET(request: NextRequest) {
  const returnTo = request.nextUrl.searchParams.get("returnTo") ?? "/";
  const state = createOAuthState();

  const res = NextResponse.redirect(buildAuthUrl(state));
  res.cookies.set("g_oauth_state", state, SHORT_LIVED);
  res.cookies.set("g_oauth_return", returnTo, SHORT_LIVED);
  return res;
}
