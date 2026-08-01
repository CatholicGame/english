import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export interface SessionUser {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export interface SessionPayload {
  at: string;
  rt?: string;
  exp: number;
  user: SessionUser;
  files?: Record<string, string>;
}

const COOKIE_NAME = "gd_session";

function getKey(): Buffer {
  const raw = process.env.COOKIE_ENCRYPTION_KEY;
  if (!raw) throw new Error("COOKIE_ENCRYPTION_KEY is not set");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error("COOKIE_ENCRYPTION_KEY must decode to 32 bytes");
  return key;
}

export function encryptSession(payload: SessionPayload): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString("base64url");
}

export function decryptSession(value: string): SessionPayload | null {
  try {
    const buf = Buffer.from(value, "base64url");
    const iv = buf.subarray(0, 12);
    const authTag = buf.subarray(12, 28);
    const ciphertext = buf.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export { COOKIE_NAME };
