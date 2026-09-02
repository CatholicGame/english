"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Restores window scroll position when returning to a list page (e.g. after
// visiting a detail page and going back), keyed by pathname in sessionStorage
// so it survives a mobile browser reloading the tab, not just an in-memory cache.
//
// ponytail: position is captured on click (capture phase, before Next's own
// onClick/router navigation runs) rather than continuously on 'scroll' — a
// continuous listener was still attached while the list page's own Link click
// triggered Next's default "scroll new page into view" reset, so the very
// last 'scroll' event on the way out overwrote the saved value with 0.
export function useScrollRestoration() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const key = `scrollpos:${pathname}`;
    const saved = Number(sessionStorage.getItem(key));
    if (saved) window.scrollTo(0, saved);

    function saveNow() {
      sessionStorage.setItem(key, String(window.scrollY));
    }
    document.addEventListener("click", saveNow, true);
    document.addEventListener("visibilitychange", saveNow);
    return () => {
      document.removeEventListener("click", saveNow, true);
      document.removeEventListener("visibilitychange", saveNow);
    };
  }, [pathname]);
}
