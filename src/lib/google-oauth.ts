import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { COOKIE_NAME, decryptSession, encryptSession, sessionCookieOptions, type SessionPayload, type SessionUser } from "./session-cookie";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const REVOKE_URL = "https://oauth2.googleapis.com/revoke";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
].join(" ");

function clientId(): string {
  const v = process.env.GOOGLE_CLIENT_ID;
  if (!v) throw new Error("GOOGLE_CLIENT_ID is not set");
  return v;
}

function clientSecret(): string {
  const v = process.env.GOOGLE_CLIENT_SECRET;
  if (!v) throw new Error("GOOGLE_CLIENT_SECRET is not set");
  return v;
}

function redirectUri(): string {
  const v = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  if (!v) throw new Error("GOOGLE_OAUTH_REDIRECT_URI is not set");
  return v;
}

export function createOAuthState(): string {
  return randomBytes(16).toString("hex");
}

export function buildAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: clientId(),
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
  });
  return `${AUTH_URL}?${params.toString()}`;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
}

export async function exchangeCodeForTokens(code: string): Promise<TokenResponse> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId(),
      client_secret: clientSecret(),
      redirect_uri: redirectUri(),
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function fetchUserInfo(accessToken: string): Promise<SessionUser> {
  const res = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`userinfo fetch failed: ${res.status}`);
  const data = await res.json();
  return { sub: data.sub, email: data.email, name: data.name, picture: data.picture };
}

async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; expiresInSec: number } | null> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId(),
      client_secret: clientSecret(),
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return { accessToken: data.access_token, expiresInSec: data.expires_in };
}

export async function revokeSession(session: SessionPayload): Promise<void> {
  const token = session.rt ?? session.at;
  try {
    await fetch(`${REVOKE_URL}?${new URLSearchParams({ token })}`, { method: "POST" });
  } catch {
    // best-effort — ignore network/already-revoked errors
  }
}

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 180;

export async function writeSession(session: SessionPayload): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, encryptSession(session), sessionCookieOptions(SESSION_MAX_AGE_SEC));
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function readSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return decryptSession(raw);
}

/**
 * Returns a valid access token for the current session, refreshing it first if it's
 * expired or about to expire. Persists the refreshed token back into the session cookie.
 * Returns null if there's no session or the refresh token was rejected (caller must
 * clear the session and require re-auth).
 */
export async function getValidAccessToken(): Promise<{ accessToken: string; session: SessionPayload } | null> {
  const session = await readSession();
  if (!session) return null;

  if (Date.now() < session.exp - 60_000) {
    return { accessToken: session.at, session };
  }

  if (!session.rt) {
    await clearSession();
    return null;
  }

  const refreshed = await refreshAccessToken(session.rt);
  if (!refreshed) {
    await clearSession();
    return null;
  }

  const next: SessionPayload = {
    ...session,
    at: refreshed.accessToken,
    exp: Date.now() + refreshed.expiresInSec * 1000,
  };
  await writeSession(next);
  return { accessToken: next.at, session: next };
}
