"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loadGlobalScore, saveGlobalScore, type GlobalScoreData } from "./global-score";

interface GlobalScoreContextValue {
  xp: number;
  addXP: (amount: number) => void;
}

const Ctx = createContext<GlobalScoreContextValue | null>(null);

export function GlobalScoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<GlobalScoreData>({ xp: 0 });

  useEffect(() => {
    setData(loadGlobalScore());
    const handler = (e: Event) => {
      setData((e as CustomEvent<GlobalScoreData>).detail);
    };
    window.addEventListener("global-xp-changed", handler);
    return () => window.removeEventListener("global-xp-changed", handler);
  }, []);

  const addXP = useCallback((amount: number) => {
    setData((prev) => {
      const next = { xp: Math.max(0, prev.xp + amount) };
      saveGlobalScore(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ xp: data.xp, addXP }), [data.xp, addXP]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGlobalScore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGlobalScore must be used within a GlobalScoreProvider");
  return ctx;
}