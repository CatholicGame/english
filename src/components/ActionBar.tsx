"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ActionBarContext = createContext<((node: React.ReactNode) => void) | null>(null);

/** Full-height screen shell: a fixed header, a scrollable content area, and a
 * footer that's only rendered when some descendant claims it via useActionBar() —
 * so the screen's primary action (Generate, Submit, Check with AI, ...) is
 * always reachable at the bottom of the viewport instead of scrolling away with
 * the content above it. See the collocations "Write" page for the reference
 * usage, and AGENTS.md's "Action buttons stay pinned" convention.
 *
 * `fullViewport` (default false): the global `AppHeader` (`sticky top-0 h-12`
 * in `src/app/layout.tsx`) sits ABOVE `{children}` in normal page flow and
 * takes up real space that a bare `h-dvh` box doesn't know about — nesting one
 * below it without accounting for those 3rem overflows the actual viewport by
 * exactly that much, silently pushing the footer below the fold (it's still
 * "pinned to the bottom of the box", just a box that's 3rem taller than what's
 * visible). Leave this false for a screen rendered as normal page content.
 * Pass `true` only when this is already nested inside a `fixed inset-0`
 * overlay that covers the whole viewport itself (so AppHeader is covered, not
 * stacked above this) — e.g. VerbDetailClient's full-screen "AI Practice" overlay. */
export function ActionBarScreen({
  header,
  children,
  fullViewport = false,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  fullViewport?: boolean;
}) {
  const [footer, setFooter] = useState<React.ReactNode>(null);
  return (
    <ActionBarContext.Provider value={setFooter}>
      <div className={`flex flex-col ${fullViewport ? "h-dvh" : "h-[calc(100dvh-3rem)]"}`}>
        {header && <div className="flex-none">{header}</div>}
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {footer && (
          <div className="flex-none border-t px-4 py-3" style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)" }}>
            {footer}
          </div>
        )}
      </div>
    </ActionBarContext.Provider>
  );
}

/** Claims the enclosing ActionBarScreen's sticky footer for `node` while this
 * component is mounted with a non-null node, releasing it on unmount or when
 * node becomes null (e.g. a mode switch that has no action right now). Only one
 * claim is active at a time per screen — that matches the usual case of "one
 * primary action for whatever's currently on screen" (mode tabs, wizard steps).
 *
 * Returns whether an enclosing ActionBarScreen was actually found. A shared
 * component (e.g. AiSentencePractice) that's sometimes hosted full-screen and
 * sometimes embedded partway down an ordinary content page should render
 * `node` inline itself when this is false — pinning to the viewport bottom
 * only makes sense for a screen genuinely dedicated to that one action, not a
 * button buried in the middle of a long scrolling page. */
export function useActionBar(node: React.ReactNode | null): boolean {
  const setFooter = useContext(ActionBarContext);
  useEffect(() => {
    if (!setFooter) return;
    setFooter(node);
    return () => setFooter(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFooter, node]);
  return setFooter !== null;
}
