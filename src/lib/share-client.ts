import { appOrigin } from "./app-url";

/** Posts a share payload to the server and returns the short public URL. */
export async function createShareLink(payload: unknown): Promise<string> {
  const res = await fetch("/api/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Share failed");
  return `${appOrigin()}/s/${json.id}`;
}
