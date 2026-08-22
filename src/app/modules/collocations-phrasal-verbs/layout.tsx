"use client";

import { usePathname } from "next/navigation";
import { ProgressProvider } from "@/lib/progress-context";
import { BottomNav } from "@/components/BottomNav";

const MODULE_KEY = "collocations-phrasal-verbs";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hidden on any focused single-task screen with its own big text input —
  // a fixed bottom tab bar sits on top of the mobile keyboard here, eating
  // the little vertical space left for the prompt text + textarea (see the
  // "write" page's translate-a-passage flow).
  const hideNav = pathname.endsWith("/run") || pathname.endsWith("/write");

  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      {/* ponytail: min-h-screen double-counted AppHeader's in-flow 3rem (sticky,
          not fixed) on ActionBarScreen-based screens (e.g. write/page.tsx),
          adding a stray outer page scrollbar next to its own inner scroll
          region. Harmless on the plain-scroll pages sharing this layout, since
          the replacement still fills the same visible space. --real-vh (not a
          bare vh unit) for the same zoom reason documented in AppHeader.tsx. */}
      <div className="min-h-[calc(var(--real-vh,100vh)-3rem)] bg-bg lg:mx-auto lg:flex lg:w-full lg:max-w-[1560px] lg:flex-row lg:items-start lg:border-x-2 lg:border-[color:var(--color-divider)]">
        {!hideNav && (
          <div className="fixed right-0 bottom-0 left-0 bg-bg lg:sticky lg:inset-auto lg:top-12 lg:h-[calc(var(--real-vh,100vh)-3rem)] lg:w-[220px] lg:flex-none lg:border-r-2 lg:border-[color:var(--color-divider)]">
            <div className="mx-auto max-w-[480px] lg:mx-0 lg:h-full lg:max-w-none">
              <BottomNav />
            </div>
          </div>
        )}
        <div
          className={`mx-auto flex min-h-[calc(var(--real-vh,100vh)-3rem)] w-full max-w-[480px] flex-col bg-bg lg:mx-0 lg:max-w-none lg:flex-1 ${
            hideNav ? "" : "pb-[74px] lg:pb-0"
          }`}
        >
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}
