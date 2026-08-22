import { ProgressProvider } from "@/lib/progress-context";

const MODULE_KEY = "english-grammar-in-use";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      {/* ponytail: min-h-screen double-counted AppHeader's in-flow 3rem (sticky,
          not fixed), making the document 3rem taller than the viewport and
          producing a stray outer page scrollbar alongside ActionBarScreen's own
          inner scroll region. --real-vh (not a bare vh unit) for the same zoom
          reason documented in AppHeader.tsx. */}
      <div className="mx-auto flex min-h-[calc(var(--real-vh,100vh)-3rem)] w-full max-w-[480px] flex-col bg-bg lg:max-w-[1560px] lg:border-x-2 lg:border-[color:var(--color-divider)]">
        {children}
      </div>
    </ProgressProvider>
  );
}
