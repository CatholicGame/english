"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ActionBarContext = createContext<((node: React.ReactNode) => void) | null>(null);

/** Full-height screen shell: a fixed-position header slot, a scrollable
 * content area, and a footer that's only rendered when some descendant claims
 * it via useActionBar() — so the screen's primary action (Generate, Submit,
 * Check with AI, ...) is always reachable at the bottom of the viewport
 * instead of scrolling away with the content above it. See the collocations
 * "Write" page for the reference usage, and AGENTS.md's "Action buttons stay
 * pinned" convention.
 *
 * The footer is `position: fixed` (same technique as `BottomNav`), not a
 * `flex-none` last child sized by a height calculation the way an earlier
 * version of this component did (`h-[calc(100dvh/svh - 3rem)]` on the outer
 * box, footer pinned "to the bottom of that box"). That approach re-derives
 * the footer's position from the viewport-height unit's exact value, and
 * every mobile viewport-height quirk (chrome collapse on scroll, the app's own
 * Fullscreen API toggle, gesture-nav safe areas, ...) throws that arithmetic
 * off by a different amount — the footer ends up floating above the real
 * bottom edge, fully off-screen, or overlapping content depending on the mode.
 * `fixed bottom-0` sidesteps all of that: the browser itself keeps it glued to
 * the true visible bottom edge, the same guarantee `AppHeader`'s
 * `sticky top-0` already gives the top edge — no recomputation, no drift.
 *
 * `fullViewport` (default false): the global `AppHeader` (`sticky top-0 h-12`
 * in `src/app/layout.tsx`) sits ABOVE `{children}` in normal page flow — the
 * scrollable content box still needs to size itself around that (a fixed
 * footer doesn't need to know about it, but the content scrollbar does, so it
 * doesn't reserve blank space at the bottom or clip early). Leave this false
 * for a screen rendered as normal page content. Pass `true` only when this is
 * already nested inside a `fixed inset-0` overlay that covers the whole
 * viewport itself (so AppHeader is covered, not stacked above this) — e.g.
 * VerbDetailClient's full-screen "AI Practice" overlay. */
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
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Reserve exactly as much bottom space in the scrollable content as the
  // fixed footer actually renders at (a single button vs. a stacked pair vs.
  // a chat composer row all differ), so it never overlaps the tail end of
  // scrolled content.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) {
      setFooterHeight(0);
      return;
    }
    const measure = () => setFooterHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [footer]);

  return (
    <ActionBarContext.Provider value={setFooter}>
      {/* --real-vh (set by AppHeader from window.innerHeight) instead of a
          bare 100svh: the personal UI-size slider zooms this whole subtree,
          which inflates a viewport-unit-based height by the zoom factor even
          though the unit itself is still measuring the true viewport - only
          a JS-measured height is immune to that. */}
      <div className={`flex flex-col ${fullViewport ? "h-full" : "h-[calc(var(--real-vh,100vh)-3rem)]"}`}>
        {header && <div className="flex-none">{header}</div>}
        <div className="flex min-h-0 flex-1 flex-col" style={{ paddingBottom: footer ? footerHeight : 0 }}>
          {children}
        </div>
      </div>
      {footer && (
        <div
          ref={footerRef}
          className="fixed inset-x-0 bottom-0 z-50 border-t px-4 pt-3"
          style={{
            borderColor: "var(--color-divider)",
            background: "var(--color-bg)",
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {footer}
        </div>
      )}
    </ActionBarContext.Provider>
  );
}

/** Claims the enclosing ActionBarScreen's fixed footer for `node` while this
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
  }, [setFooter, node]);
  return setFooter !== null;
}
