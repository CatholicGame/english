"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: AuthUser | null;
}

interface AuthContextValue extends AuthState {
  refresh: () => void;
  setLoggedOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ loading: true, authenticated: false, user: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setState({ loading: false, authenticated: !!d.authenticated, user: d.user ?? null });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, authenticated: false, user: null });
      });
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value: AuthContextValue = {
    ...state,
    refresh: () => setNonce((n) => n + 1),
    setLoggedOut: () => setState({ loading: false, authenticated: false, user: null }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
