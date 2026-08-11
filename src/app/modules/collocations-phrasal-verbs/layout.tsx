"use client";

import { usePathname } from "next/navigation";
import { ProgressProvider } from "@/lib/progress-context";
import { BottomNav } from "@/components/BottomNav";

const MODULE_KEY = "collocations-phrasal-verbs";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname.endsWith("/run");

  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      <div className="min-h-screen bg-bg lg:mx-auto lg:flex lg:w-full lg:max-w-[1040px] lg:flex-row lg:items-start lg:border-x-2 lg:border-[color:var(--color-divider)]">
        {!hideNav && (
          <div className="fixed right-0 bottom-0 left-0 bg-bg lg:sticky lg:inset-auto lg:top-0 lg:h-screen lg:w-[220px] lg:flex-none lg:border-r-2 lg:border-[color:var(--color-divider)]">
            <div className="mx-auto max-w-[480px] lg:mx-0 lg:h-full lg:max-w-none">
              <BottomNav />
            </div>
          </div>
        )}
        <div
          className={`mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg pt-12 lg:mx-0 lg:max-w-none lg:flex-1 lg:pt-0 ${
            hideNav ? "" : "pb-[74px] lg:pb-0"
          }`}
        >
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}
