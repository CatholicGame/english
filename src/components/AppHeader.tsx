"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo/logo.png";
import { AuthStatus } from "./AuthStatus";
import { GlobalScoreBadge } from "./GlobalScoreBadge";
import { VoiceSettings } from "./VoiceSettings";
import { SubscriptionSettings } from "./SubscriptionSettings";
import { loadUiPrefs, saveUiPrefs, applyUiPrefs, DEFAULT_UI_PREFS, type UiPrefs, type FontId } from "@/lib/ui-prefs";
import { loadAiLangPrefs, saveAiLangPrefs, type AiLang } from "@/lib/ai-lang-prefs";
import { useUiLang } from "@/lib/i18n";
import { ShareButton } from "./ShareButton";
import { UserGuide } from "./UserGuide";
import { appOrigin } from "@/lib/app-url";

const FONT_OPTIONS: { id: FontId; label: string }[] = [
  { id: "archivo", label: "Archivo" },
  { id: "nunito", label: "Nunito" },
  { id: "lora", label: "Lora" },
];

const AI_LANG_OPTIONS: { id: AiLang; label: string }[] = [
  { id: "vi", label: "Tiếng Việt" },
  { id: "en", label: "English" },
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function FullscreenEnterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
    </svg>
  );
}

function FullscreenExitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block h-4 w-4">
      <path d="M9 3v3a2 2 0 0 1-2 2H4M15 3v3a2 2 0 0 0 2 2h3M21 16h-3a2 2 0 0 0-2 2v3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [prefs, setPrefs] = useState<UiPrefs>(DEFAULT_UI_PREFS);
  const [aiLang, setAiLang] = useState<AiLang>("vi");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const { lang: uiLang, setUiLang, t } = useUiLang();

  useEffect(() => {
    const p = loadUiPrefs();
    setPrefs(p);
    applyUiPrefs(p);
    setAiLang(loadAiLangPrefs().lang);
  }, []);

  // ponytail: 100vh/100svh/100dvh are always measured against the TRUE
  // browser viewport, never against an ancestor's CSS zoom - but body's
  // `zoom: var(--ui-zoom, 1)` (the personal size slider above) still scales
  // the RENDERED size of anything sized from one of those units, since the
  // element computing e.g. h-[calc(100svh-3rem)] is itself a zoomed
  // descendant. Net effect: at any zoom other than 100%, every screen built
  // on ActionBarScreen ends up genuinely taller than the real viewport by
  // exactly the zoom factor, which is what caused the double-scroll bug this
  // fixes. window.innerHeight is a plain JS/browser API, untouched by any
  // element's CSS zoom, so mirroring it into --real-vh and switching the
  // shared height calcs (ActionBar.tsx, Modal.tsx, GlobalDiscussChat.tsx,
  // each module layout.tsx) to use it instead of vh/svh/dvh sidesteps the
  // mismatch entirely, and unblocks raising the size slider's default.
  useEffect(() => {
    function syncRealVh() {
      document.documentElement.style.setProperty("--real-vh", `${window.innerHeight}px`);
    }
    syncRealVh();
    window.addEventListener("resize", syncRealVh);
    return () => window.removeEventListener("resize", syncRealVh);
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  useEffect(() => {
    if (!settingsOpen) return;
    function onClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [settingsOpen]);

  // Lock the background page while the settings menu is open, same as Modal
  // does for full-screen popups. Otherwise swiping scrolls the page behind
  // the dropdown on mobile.
  useEffect(() => {
    if (!settingsOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [settingsOpen]);

  function updatePrefs(next: Partial<UiPrefs>) {
    setPrefs((prev) => {
      const merged = { ...prev, ...next };
      saveUiPrefs(merged);
      applyUiPrefs(merged);
      return merged;
    });
  }

  if (pathname === "/login" || pathname.startsWith("/s/")) return null;

  // Admin dashboard is a separate tool, not a vocab-learning screen: none of
  // the learner chrome (dictionary shortcut, fullscreen, AI/UI/font settings,
  // guide) applies there. Keep only branding, a way back to learner mode, and
  // the account menu, since the same Google account can be both admin and learner.
  if (pathname.startsWith("/admin")) {
    return (
      <header className="sticky top-0 z-40 flex h-12 flex-none items-center gap-1.5 border-b-2 border-[color:var(--color-divider)] bg-bg px-2">
        <Link href="/admin" className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[15px] font-extrabold">
          <Image src={logo} alt="Vocabulary Builder Pro" width={22} height={22} className="h-[22px] w-[22px] flex-none rounded-full" priority />
          <span className="truncate">Admin</span>
        </Link>
        <Link href="/" className="btn btn-ghost text-[14px] font-bold">
          Chế độ học
        </Link>
        <AuthStatus />
      </header>
    );
  }

  const showBack = pathname !== "/";

  return (
    <header className="sticky top-0 z-40 flex h-12 flex-none items-center gap-1.5 border-b-2 border-[color:var(--color-divider)] bg-bg px-2">
      {showBack ? (
        <button onClick={() => router.back()} className="btn btn-ghost btn-icon" aria-label="Back">
          <BackIcon />
        </button>
      ) : (
        <span className="w-9 flex-none" />
      )}
      <Link href="/" className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[15px] font-extrabold">
        <Image src={logo} alt="Vocabulary Builder Pro" width={22} height={22} className="h-[22px] w-[22px] flex-none rounded-full" priority />
        <span className="truncate">Vocabulary Builder Pro</span>
      </Link>
      <GlobalScoreBadge className="text-[14px]" />
      <Link href="/dictionary" className="btn btn-ghost btn-icon" aria-label={t("dictionary.my")}>
        <BookIcon />
      </Link>
      <button
        className="btn btn-ghost btn-icon"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? t("fullscreen.exit") : t("fullscreen.enter")}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
      </button>
      <div ref={settingsRef} className="relative">
        <button className="btn btn-ghost btn-icon" onClick={() => setSettingsOpen((o) => !o)} aria-label={t("settings.aria")}>
          <GearIcon />
        </button>
        {settingsOpen && (
          <div
            // Full-width sheet right below the header on mobile — a narrow
            // w-64 dropdown anchored to the gear icon left a lopsided gap on
            // the opposite side of a phone-width screen. From sm: up, back to
            // the compact anchored dropdown (there's room for it to float).
            //
            // ponytail: bounded by bottom-0/bottom-4 (a second fixed edge)
            // instead of max-h-[calc(100dvh-Npx)] - a computed height sourced
            // from dvh reads wrong once the personal UI-size slider's `zoom`
            // is anything but 100%, since dvh gets measured in the zoomed
            // coordinate space while the panel's own rendered box does not,
            // so the box can end up taller than what actually fits with no
            // way to reach the rest by scrolling. Anchoring both edges needs
            // no viewport-height arithmetic at all, so it can't drift with zoom.
            className="fixed inset-x-0 top-12 bottom-0 overflow-y-auto overscroll-contain border-t border-[color:var(--color-divider)] bg-bg shadow-lg sm:inset-x-auto sm:top-14 sm:right-2 sm:bottom-4 sm:w-64 sm:border"
          >
            <div className="divider-b px-3 py-2">
              <ShareButton
                className="w-full text-left text-[14px] font-bold text-neutral-700 hover:text-accent-800"
                title="Vocabulary Builder Pro"
                text={t("settings.share.text")}
                getUrl={() => appOrigin()}
                label={t("settings.share.label")}
              />
              <button
                type="button"
                className="mt-1.5 w-full text-left text-[14px] font-bold text-neutral-700 hover:text-accent-800"
                onClick={() => {
                  setGuideOpen(true);
                  setSettingsOpen(false);
                }}
              >
                📘 {t("settings.guide")}
              </button>
              <Link
                href="/reviews"
                className="mt-1.5 block w-full text-left text-[14px] font-bold text-neutral-700 hover:text-accent-800"
                onClick={() => setSettingsOpen(false)}
              >
                {t("reviews.menuLabel")}
              </Link>
            </div>
            <div className="divider-b">
              <SubscriptionSettings />
            </div>
            <VoiceSettings />
            <div className="divider-t px-3 py-2">
              <div className="label-xs mb-1.5">{t("settings.uiLang")}</div>
              <div className="flex flex-wrap gap-1.5">
                {AI_LANG_OPTIONS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setUiLang(l.id)}
                    className="rounded-full px-2.5 py-1 text-[14px] font-bold"
                    style={{
                      background: uiLang === l.id ? "var(--color-accent)" : "var(--color-surface)",
                      color: uiLang === l.id ? "#fff" : "var(--color-text)",
                      border: uiLang === l.id ? "none" : "1px solid var(--color-divider)",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="divider-t px-3 py-2">
              <div className="label-xs mb-1.5">{t("settings.aiLang")}</div>
              <div className="flex flex-wrap gap-1.5">
                {AI_LANG_OPTIONS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setAiLang(l.id);
                      saveAiLangPrefs({ lang: l.id });
                    }}
                    className="rounded-full px-2.5 py-1 text-[14px] font-bold"
                    style={{
                      background: aiLang === l.id ? "var(--color-accent)" : "var(--color-surface)",
                      color: aiLang === l.id ? "#fff" : "var(--color-text)",
                      border: aiLang === l.id ? "none" : "1px solid var(--color-divider)",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="divider-t px-3 py-2">
              <div className="label-xs mb-1.5">{t("settings.font")}</div>
              <div className="flex flex-wrap gap-1.5">
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updatePrefs({ fontId: f.id })}
                    className="rounded-full px-2.5 py-1 text-[14px] font-bold"
                    style={{
                      background: prefs.fontId === f.id ? "var(--color-accent)" : "var(--color-surface)",
                      color: prefs.fontId === f.id ? "#fff" : "var(--color-text)",
                      border: prefs.fontId === f.id ? "none" : "1px solid var(--color-divider)",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {/* UI size slider disabled: zoom scaling broke viewport-height layout
                (see ui-prefs.ts note) across several fix commits. Keeping the
                control commented instead of deleted in case it's revisited with
                a rem-based scale instead of CSS zoom.
            <div className="divider-t px-3 py-2">
              <div className="label-xs mb-1.5">{t("settings.size", { pct: Math.round(prefs.zoom * 100) })}</div>
              <input
                type="range"
                min={0.875}
                max={1.25}
                step={0.025}
                value={prefs.zoom}
                onChange={(e) => updatePrefs({ zoom: Number(e.target.value) })}
                className="h-1 w-full accent-[var(--color-accent)]"
                aria-label="UI size"
              />
            </div>
            */}
          </div>
        )}
      </div>
      <AuthStatus />
      {guideOpen && <UserGuide onClose={() => setGuideOpen(false)} />}
    </header>
  );
}
