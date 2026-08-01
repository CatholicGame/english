import type { SessionPayload } from "./session-cookie";

const FILES_URL = "https://www.googleapis.com/drive/v3/files";
const UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

function fileName(storageKey: string): string {
  return `progress-${storageKey}.json`;
}

function authHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

async function findFileId(accessToken: string, storageKey: string): Promise<string | null> {
  const q = `name='${fileName(storageKey)}' and trashed=false`;
  const params = new URLSearchParams({ spaces: "appDataFolder", q, fields: "files(id,name)" });
  const res = await fetch(`${FILES_URL}?${params.toString()}`, { headers: authHeaders(accessToken) });
  if (!res.ok) throw new Error(`Drive find failed: ${res.status}`);
  const data = await res.json();
  return data.files?.[0]?.id ?? null;
}

async function createFile(accessToken: string, storageKey: string): Promise<string> {
  const res = await fetch(FILES_URL, {
    method: "POST",
    headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({ name: fileName(storageKey), parents: ["appDataFolder"] }),
  });
  if (!res.ok) throw new Error(`Drive create failed: ${res.status}`);
  const data = await res.json();
  return data.id;
}

async function writeFileContent(accessToken: string, fileId: string, content: string): Promise<void> {
  const res = await fetch(`${UPLOAD_URL}/${fileId}?uploadType=media`, {
    method: "PATCH",
    headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
    body: content,
  });
  if (!res.ok) throw new Error(`Drive write failed: ${res.status}`);
}

async function readFileContent(accessToken: string, fileId: string): Promise<string> {
  const res = await fetch(`${FILES_URL}/${fileId}?alt=media`, { headers: authHeaders(accessToken) });
  if (!res.ok) throw new Error(`Drive read failed: ${res.status}`);
  return res.text();
}

/** Resolves the Drive fileId for a storageKey, preferring the session's cache and
 *  falling back to a find-or-create. Returns the fileId plus the (possibly updated)
 *  files cache to persist back into the session. */
async function resolveFileId(
  accessToken: string,
  session: SessionPayload,
  storageKey: string,
): Promise<{ fileId: string; files: Record<string, string> }> {
  const files = { ...(session.files ?? {}) };
  const cached = files[storageKey];
  if (cached) return { fileId: cached, files };

  let fileId = await findFileId(accessToken, storageKey);
  if (!fileId) fileId = await createFile(accessToken, storageKey);
  files[storageKey] = fileId;
  return { fileId, files };
}

export interface DriveProgressData {
  progress: Record<string, { l: number; t: number }>;
  days: Record<string, number>;
}

export async function readDriveProgress(
  accessToken: string,
  session: SessionPayload,
  storageKey: string,
): Promise<{ data: DriveProgressData | null; files: Record<string, string> }> {
  const { fileId, files } = await resolveFileId(accessToken, session, storageKey);
  try {
    const text = await readFileContent(accessToken, fileId);
    if (!text) return { data: null, files };
    return { data: JSON.parse(text), files };
  } catch {
    // stale cached fileId (e.g. 404) — retry once with a fresh find-or-create
    delete files[storageKey];
    const retry = await resolveFileId(accessToken, { ...session, files }, storageKey);
    const text = await readFileContent(accessToken, retry.fileId);
    return { data: text ? JSON.parse(text) : null, files: retry.files };
  }
}

export async function writeDriveProgress(
  accessToken: string,
  session: SessionPayload,
  storageKey: string,
  data: DriveProgressData,
): Promise<{ files: Record<string, string> }> {
  const { fileId, files } = await resolveFileId(accessToken, session, storageKey);
  await writeFileContent(accessToken, fileId, JSON.stringify(data));
  return { files };
}
