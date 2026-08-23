import { ProgressProvider } from "@/lib/progress-context";

const MODULE_KEY = "cambridge-vocabulary-ielts-advanced";

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider storageKey={MODULE_KEY}>
      {/* ponytail: min-h-screen here double-counted AppHeader's own in-flow 3rem
          (sticky, not fixed, so it already occupies flow height above this div) -
          the page ended up 3rem taller than the viewport, so the whole document
          scrolled a few px even though ActionBarScreen's inner region already
          confines its own scrolling to the same height. Matching that height
          here keeps this div's minimum from ever exceeding what's actually left
          below the header. --real-vh (not a bare vh unit) for the same zoom
          reason documented in AppHeader.tsx. */}
      <div className="mx-auto flex min-h-[calc(var(--real-vh,100vh)-3rem)] w-full max-w-[480px] flex-col bg-bg lg:max-w-[min(90vw,2400px)] lg:border-x-2 lg:border-[color:var(--color-divider)]">
        {children}
      </div>
    </ProgressProvider>
  );
}
