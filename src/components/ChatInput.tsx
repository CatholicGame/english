"use client";

import { useEffect, useRef } from "react";

const MAX_HEIGHT_PX = 120;

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

/** Auto-growing chat textarea — Enter sends, Shift+Enter inserts a newline. */
export function ChatInput({ value, onChange, onSend, disabled, placeholder = "Your response..." }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      className="input flex-1 resize-none"
      style={{ maxHeight: MAX_HEIGHT_PX, overflowY: "auto" }}
      rows={1}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!disabled) onSend();
        }
      }}
    />
  );
}
