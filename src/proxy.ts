import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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

  const seen = request.cookies.get("gd_session");
  if (!seen) {
    const url = new URL("/login", request.url);
    url.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
