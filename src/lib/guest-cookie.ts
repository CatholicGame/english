import { randomUUID } from "crypto";
import { encryptPayload, decryptPayload } from "./session-cookie";
import { TRIAL_DAYS, DAY_MS } from "./subscription-store";

export interface GuestPayload {
  id: string;
  startedAt: number;
}

export const GUEST_COOKIE_NAME = "guest_id";

export function newGuestPayload(): GuestPayload {
  return { id: randomUUID(), startedAt: Date.now() };
}

export function isGuestTrialActive(payload: GuestPayload, now: number = Date.now()): boolean {
  return now < payload.startedAt + TRIAL_DAYS * DAY_MS;
}

/** Whole days left in the guest trial (0 once expired). */
export function guestDaysLeft(payload: GuestPayload, now: number = Date.now()): number {
  if (!isGuestTrialActive(payload, now)) return 0;
  return Math.max(0, Math.ceil((payload.startedAt + TRIAL_DAYS * DAY_MS - now) / DAY_MS));
}

export function encryptGuest(payload: GuestPayload): string {
  return encryptPayload(payload);
}

export function decryptGuest(value: string): GuestPayload | null {
  return decryptPayload<GuestPayload>(value);
}

export function guestCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  };
}

/** Server-only (route handlers) — mirrors readSession() in google-oauth.ts. */
export async function readGuestSession(): Promise<GuestPayload | null> {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  const raw = jar.get(GUEST_COOKIE_NAME)?.value;
  if (!raw) return null;
  return decryptGuest(raw);
}
