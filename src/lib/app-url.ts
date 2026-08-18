export function appOrigin(req?: { headers: Headers }): string {
  if (typeof window !== "undefined") return window.location.origin;
  // Explicit override (Vercel env) wins so production redirects never depend
  // on request headers.
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  // Otherwise derive from the actual request — lets local dev use
  // http://localhost:3000 automatically instead of the stale fallback.
  if (req) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const proto =
      req.headers.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "development" ? "http" : "https");
    if (host) return `${proto}://${host}`;
  }
  return "https://vocabuilderpro.vercel.app";
}
