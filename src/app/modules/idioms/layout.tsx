import { ProgressProvider } from "@/lib/progress-context";

const MODULE_KEY = "idioms";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-bg lg:max-w-[1040px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
        {children}
      </div>
    </ProgressProvider>
  );
}
