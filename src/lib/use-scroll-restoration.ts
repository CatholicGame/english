"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// Restores window scroll position when returning to a list page (e.g. after
// visiting a detail page and going back), keyed by pathname in sessionStorage
// so it survives a mobile browser reloading the tab, not just an in-memory cache.
export function useScrollRestoration() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const key = `scrollpos:${pathname}`;
    const saved = Number(sessionStorage.getItem(key));
    if (saved) window.scrollTo(0, saved);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}
