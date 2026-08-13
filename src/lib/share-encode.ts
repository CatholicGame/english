// Encodes arbitrary JSON into a URL-safe string carried in the URL hash, so a
// "shared" conversation/result never touches a server — the recipient's browser
// decodes it straight out of the link. Gzip-compressed when the browser supports
// CompressionStream (keeps the shareable link shorter); falls back to plain
// base64url otherwise. A one-char version prefix ("z" | "p") tells decode which.

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([bytes.buffer as ArrayBuffer]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function gunzip(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([bytes.buffer as ArrayBuffer]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function encodeShareData(data: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  if (typeof CompressionStream !== "undefined") {
    return "z" + toBase64Url(await gzip(bytes));
  }
  return "p" + toBase64Url(bytes);
}

export async function decodeShareData<T = unknown>(encoded: string): Promise<T> {
  const version = encoded[0];
  const bytes = fromBase64Url(encoded.slice(1));
  const raw = version === "z" ? await gunzip(bytes) : bytes;
  return JSON.parse(new TextDecoder().decode(raw)) as T;
}
