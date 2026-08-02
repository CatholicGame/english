"use client";

import { ProgressProvider } from "@/lib/progress-context";

const MODULE_KEY = "listen-a-minute";

export default function ListenAMinuteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg">{children}</div>
    </ProgressProvider>
  );
}
