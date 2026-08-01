import { NextResponse, type NextRequest } from "next/server";
import { exchangeCodeForTokens, fetchUserInfo } from "@/lib/google-oauth";
import { COOKIE_NAME, encryptSession, sessionCookieOptions } from "@/lib/session-cookie";

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 180;

function safeReturnTo(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("g_oauth_state")?.value;
  const returnTo = safeReturnTo(request.cookies.get("g_oauth_return")?.value);

  if (!code || !state || !expectedState || state !== expectedState) {
    return new NextResponse("Invalid OAuth state", { status: 400 });
  }

  const tokens = await exchangeCodeForTokens(code);
  const user = await fetchUserInfo(tokens.access_token);

  const res = NextResponse.redirect(new URL(returnTo, request.url));
  res.cookies.set(
    COOKIE_NAME,
    encryptSession({
      at: tokens.access_token,
      rt: tokens.refresh_token,
      exp: Date.now() + tokens.expires_in * 1000,
      user,
    }),
    sessionCookieOptions(SESSION_MAX_AGE_SEC),
  );
  res.cookies.delete("g_oauth_state");
  res.cookies.delete("g_oauth_return");
  return res;
}
