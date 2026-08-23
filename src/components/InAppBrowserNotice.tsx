"use client";

import { useEffect, useState } from "react";
import { androidChromeIntentUrl, detectInAppBrowser, isAndroid } from "@/lib/in-app-browser";
import { useUiLang } from "@/lib/i18n";

/** Warns and offers an escape hatch when the page is loaded inside a
 * WebView-based in-app browser (TikTok, Facebook, Zalo, ...) where Google's
 * OAuth consent screen refuses to load. Renders nothing outside that case. */
export function InAppBrowserNotice() {
  const { t } = useUiLang();
  const [app, setApp] = useState<string | null>(null);
  const [android, setAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setApp(detectInAppBrowser(ua));
    setAndroid(isAndroid(ua));
  }, []);

  if (!app) return null;

  return (
    <div
      className="mb-4 w-full rounded-xl border p-3 text-[16px] leading-relaxed"
      style={{ borderColor: "var(--color-accent)", background: "var(--color-surface)" }}
    >
      <p className="font-bold text-accent-800">{t("login.inAppWarning", { app })}</p>
      {android ? (
        <a
          href={androidChromeIntentUrl(window.location.href)}
          className="btn btn-primary mt-2 inline-block px-3 py-1.5 text-[16px]"
        >
          {t("login.inAppOpenChrome")}
        </a>
      ) : (
        <p className="mt-1 text-neutral-600">{t("login.inAppIosHint")}</p>
      )}
    </div>
  );
}
