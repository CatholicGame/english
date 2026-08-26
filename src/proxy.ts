import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { decryptPayload, encryptPayload } from "./lib/session-cookie";
import { GUEST_COOKIE_NAME, guestCookieOptions, isGuestTrialActive, newGuestPayload, type GuestPayload } from "./lib/guest-cookie";
import { setSubscription } from "./lib/subscription-db";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  if (
    pathname === "/login" ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/s/")
  ) {
    return NextResponse.next();
  }

  if (request.cookies.get("gd_session")) {
    return NextResponse.next();
  }

  // /admin is privileged (role-gated server-side, see src/lib/admin.ts) and was
  // never meant to be guest-accessible — a no-login visitor here must still hit
  // the real /login wall, not fall through to a guest trial pass and land on a
  // silent 404 with no way to know they need to sign in.
  if (pathname.startsWith("/admin")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(url);
  }

  const guestCookie = request.cookies.get(GUEST_COOKIE_NAME);
  const guest = guestCookie ? decryptPayload<GuestPayload>(guestCookie.value) : null;

  if (guest && isGuestTrialActive(guest)) {
    return NextResponse.next();
  }

  if (!guest) {
    // First-ever visit (or an undecryptable/corrupt cookie): issue a fresh guest
    // trial and let this request through immediately instead of redirecting, so
    // an ad click lands straight on the requested page.
    const fresh = newGuestPayload();
    const res = NextResponse.next();
    res.cookies.set(GUEST_COOKIE_NAME, encryptPayload(fresh), guestCookieOptions());
    // Background record (same subscriptions/{key} shape a real account gets on
    // first login) so the admin dashboard can list guest trial activity — fired
    // via waitUntil so it never adds latency to this response.
    event.waitUntil(
      setSubscription(`guest:${fresh.id}`, { trialStartedAt: fresh.startedAt, updatedAt: Date.now() }).catch(() => {}),
    );
    return res;
  }

  const url = new URL("/login", request.url);
  url.searchParams.set("returnTo", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
