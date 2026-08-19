"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ActionBarContext = createContext<((node: React.ReactNode) => void) | null>(null);

/** Full-height screen shell: a fixed header, a scrollable content area, and a
 * footer that's only rendered when some descendant claims it via useActionBar() —
 * so the screen's primary action (Generate, Submit, Check with AI, ...) is
 * always reachable at the bottom of the viewport instead of scrolling away with
 * the content above it. See the collocations "Write" page for the reference
 * usage, and AGENTS.md's "Action buttons stay pinned" convention. */
export function ActionBarScreen({ header, children }: { header?: React.ReactNode; children: React.ReactNode }) {
  const [footer, setFooter] = useState<React.ReactNode>(null);
  return (
    <ActionBarContext.Provider value={setFooter}>
      <div className="flex h-dvh flex-col">
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
