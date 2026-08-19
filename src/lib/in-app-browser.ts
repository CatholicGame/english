// Google blocks its OAuth consent screen inside embedded WebViews (the
// in-app browser TikTok, Facebook, Instagram, Zalo, etc. open links in),
// showing "This browser or app may not be secure" instead of the login
// screen. Since TikTok bio-link clicks open in exactly this WebView by
// default, detect it and steer the user to their real browser before they
// hit that dead end.

const KNOWN_IN_APP_BROWSERS: { match: RegExp; name: string }[] = [
  { match: /musical_ly|BytedanceWebview|TikTok/i, name: "TikTok" },
  { match: /FBAN|FBAV|FB_IAB|FBIOS/i, name: "Facebook" },
  { match: /Instagram/i, name: "Instagram" },
  { match: /Zalo/i, name: "Zalo" },
  { match: /Line\//i, name: "LINE" },
  { match: /MicroMessenger/i, name: "WeChat" },
];

export function detectInAppBrowser(userAgent: string): string | null {
  for (const { match, name } of KNOWN_IN_APP_BROWSERS) {
    if (match.test(userAgent)) return name;
  }
  return null;
}

export function isAndroid(userAgent: string): boolean {
  return /Android/i.test(userAgent);
}

/** Best-effort escape hatch: many Android in-app WebViews honor this intent
 * and hand the current URL off to Chrome. No iOS equivalent exists. */
export function androidChromeIntentUrl(currentUrl: string): string {
  const withoutScheme = currentUrl.replace(/^https?:\/\//, "");
  return `intent://${withoutScheme}#Intent;scheme=https;package=com.android.chrome;end`;
}
