"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

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

export function AuthStatus() {
  const pathname = usePathname();
  const { loading, authenticated, user, setLoggedOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  if (loading || pathname === "/login") return null;

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setLoggedOut();
    window.location.href = "/login";
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-50 mx-auto flex max-w-[480px] justify-end px-2">
      <div className="pointer-events-auto flex items-center gap-1 bg-bg/90 backdrop-blur">
        {authenticated ? (
          <>
            {user?.picture && (
              // eslint-disable-next-line @next/next/no-img-element -- external Google avatar, not worth next/image config for one small icon
              <img src={user.picture} alt="" className="h-7 w-7 rounded-full" referrerPolicy="no-referrer" />
            )}
            <button
              className="btn btn-ghost btn-icon"
              onClick={signOut}
              disabled={signingOut}
              aria-label="Đăng xuất"
              title="Đăng xuất"
            >
              <LogoutIcon />
            </button>
          </>
        ) : (
          <a href="/login" className="btn btn-ghost">
            Đăng nhập
          </a>
        )}
      </div>
    </div>
  );
}
