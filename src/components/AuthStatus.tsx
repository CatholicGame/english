"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { VoiceSettings } from "./VoiceSettings";

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-4 w-4"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function AuthStatus() {
  const pathname = usePathname();
  const { loading, authenticated, user, setLoggedOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (loading || pathname === "/login") return null;

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setLoggedOut();
    window.location.href = "/login";
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-50 mx-auto flex max-w-[480px] justify-end px-2 lg:max-w-[1040px]">
      <div ref={rootRef} className="pointer-events-auto relative">
        <button
          className="btn btn-icon overflow-hidden bg-bg/90 backdrop-blur"
          onClick={() => setOpen((o) => !o)}
          aria-label="Tài khoản & cài đặt"
        >
          {authenticated && user?.picture ? (
            // eslint-disable-next-line @next/next/no-img-element -- external Google avatar, not worth next/image config for one small icon
            <img src={user.picture} alt="" className="h-full w-full rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <ProfileIcon />
          )}
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-60 border border-[color:var(--color-divider)] bg-bg shadow-lg">
            <VoiceSettings />
            <div className="divider-t px-3 py-2">
              {authenticated ? (
                <button
                  className="btn btn-ghost w-full justify-start px-0"
                  onClick={signOut}
                  disabled={signingOut}
                >
                  <LogoutIcon />
                  Đăng xuất
                </button>
              ) : (
                <a href="/login" className="btn btn-ghost w-full justify-start px-0">
                  Đăng nhập với Google
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
