"use client";

import { useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
}

/** Dialog-style popup shared by every full-screen overlay in the app
 * (word lookup, conversation feedback, key features, ...). Vertically centered
 * with the sheet capped at 75% of the real viewport height (via --real-vh,
 * not a bare vh unit - see AppHeader's comment on why), so content never gets
 * anchored to the bottom leaving an empty top. Click the backdrop or ✕ to close.
 * While open, the background page is scroll-locked three ways so swiping/wheel
 * can never drag the page behind the sheet:
 *   1. body overflow:hidden for the whole mount,
 *   2. overscroll-behavior:contain on the scrollable sheet (no scroll chaining
 *      when the sheet's content hits its boundary),
 *   3. a non-passive touchmove listener that preventDefault()s swipes starting
 *      on the backdrop — iOS Safari can ignore body overflow:hidden, and
 *      React's synthetic touch events are passive so they can't preventDefault. */
export function Modal({ onClose, children, contentClassName }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    function onTouchMove(e: TouchEvent) {
      // Only swallow swipes that start outside the scrollable sheet — swipes
      // inside the sheet must keep working (the sheet itself scrolls).
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    }
    overlay.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => overlay.removeEventListener("touchmove", onTouchMove);
  }, []);

  return (
    <div
      ref={overlayRef}
      data-lookup-ignore
      className="fixed inset-0 z-[70] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        ref={contentRef}
        className={`divider-t relative mx-auto w-full max-w-[480px] max-h-[calc(var(--real-vh,100vh)*0.75)] overflow-y-auto bg-bg p-5 lg:max-w-[840px] ${contentClassName ?? ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: "contain" }}
      >
        <button className="absolute right-3 top-3 text-[18px] text-neutral-500 hover:text-neutral-700" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
