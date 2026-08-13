import { put, list } from "@vercel/blob";

// No ambiguous chars (0/O, 1/l/I) so ids are easy to read/type by hand.
const ID_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
const ID_LENGTH = 8;
const MAX_PAYLOAD_BYTES = 200_000;

function randomId(): string {
  let id = "";
  for (let i = 0; i < ID_LENGTH; i++) id += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  return id;
}

/** Saves a JSON-serializable payload to Vercel Blob under a short random id and
 * returns that id. Retries on pathname collisions (put() rejects same-pathname
 * writes by default). */
export async function saveShare(payload: unknown): Promise<string> {
  const body = JSON.stringify(payload);
  if (body.length > MAX_PAYLOAD_BYTES) {
    throw new Error("Share content too large");
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = randomId();
    try {
      await put(`shares/${id}.json`, body, { access: "public", contentType: "application/json", addRandomSuffix: false });
      return id;
    } catch (err) {
      if (attempt === 4) {
        console.error("saveShare: put() failed after retries", err);
        throw err;
      }
    }
  }
  throw new Error("unreachable");
}

const ID_PATTERN = /^[0-9a-zA-Z]{4,16}$/;

export async function getShare<T = unknown>(id: string): Promise<T | null> {
  if (!ID_PATTERN.test(id)) return null;
  try {
    // list() returns the blob's real CDN url, so we never depend on reconstructing
    // it from a bare pathname — that reconstruction is what was failing in prod.
    const { blobs } = await list({ prefix: `shares/${id}.json`, limit: 1 });
    const blob = blobs[0];
    if (!blob) return null;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error("getShare: lookup failed for id", id, err);
    return null;
  }
}
