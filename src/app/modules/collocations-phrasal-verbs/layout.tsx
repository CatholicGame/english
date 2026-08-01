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
      <div className="min-h-screen bg-bg">
        <div className={`mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg ${hideNav ? "" : "pb-[74px]"}`}>
          {children}
        </div>
        {!hideNav && (
          <div className="fixed right-0 bottom-0 left-0 bg-bg">
            <div className="mx-auto max-w-[480px]">
              <BottomNav />
            </div>
          </div>
        )}
      </div>
    </ProgressProvider>
  );
}
