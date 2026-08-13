"use client";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
}

/** Bottom-sheet-style popup shared by every full-screen overlay in the app
 * (word lookup, conversation feedback, ...). Click the backdrop or ✕ to close. */
export function Modal({ onClose, children, contentClassName }: Props) {
  return (
    <div data-lookup-ignore className="fixed inset-0 z-[70] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`divider-t relative mx-auto w-full max-w-[480px] max-h-[75vh] overflow-y-auto bg-bg p-5 lg:max-w-[560px] ${contentClassName ?? ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-3 top-3 text-[18px] text-neutral-500 hover:text-neutral-700" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}
