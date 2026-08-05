import type { NotesData } from "./notes-store";
import type { SessionPayload } from "./session-cookie";

const FILES_URL = "https://www.googleapis.com/drive/v3/files";
const UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

// `docKey` is the full, domain-qualified identifier for a synced JSON blob
// (e.g. "progress-listen-a-minute" or "notes-listen-a-minute") — it doubles as
// both the Drive filename stem and the cache key in session.files, so two
// different kinds of data for the same module never collide with each other.
function fileName(docKey: string): string {
  return `${docKey}.json`;
}

function authHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

async function findFileId(accessToken: string, docKey: string): Promise<string | null> {
  const q = `name='${fileName(docKey)}' and trashed=false`;
  const params = new URLSearchParams({
    spaces: "appDataFolder",
    q,
    fields: "files(id,name,modifiedTime)",
    orderBy: "modifiedTime desc",
  });
  const res = await fetch(`${FILES_URL}?${params.toString()}`, { headers: authHeaders(accessToken) });
  if (!res.ok) throw new Error(`Drive find failed: ${res.status}`);
  const data = await res.json();
  // Concurrent find-or-create calls for the same docKey (e.g. many NotesList
  // instances mounting at once) can race and create more than one file with
  // this name — ordering by modifiedTime desc means the one with real,
  // most-recently-written content wins over an empty stray duplicate.
  return data.files?.[0]?.id ?? null;
}

async function createFile(accessToken: string, docKey: string): Promise<string> {
  const res = await fetch(FILES_URL, {
    method: "POST",
    headers: { ...authHeaders(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({ name: fileName(docKey), parents: ["appDataFolder"] }),
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

/** Resolves the Drive fileId for a docKey, preferring the session's cache and
 *  falling back to a find-or-create. Returns the fileId plus the (possibly updated)
 *  files cache to persist back into the session. */
async function resolveFileId(
  accessToken: string,
  session: SessionPayload,
  docKey: string,
): Promise<{ fileId: string; files: Record<string, string> }> {
  const files = { ...(session.files ?? {}) };
  const cached = files[docKey];
  if (cached) return { fileId: cached, files };

  let fileId = await findFileId(accessToken, docKey);
  if (!fileId) fileId = await createFile(accessToken, docKey);
  files[docKey] = fileId;
  return { fileId, files };
}

/** Generic read for a JSON blob stored in the app's Drive appDataFolder, keyed
 * by a domain-qualified docKey (e.g. "progress-listen-a-minute"). */
async function readDriveJson<T>(
  accessToken: string,
  session: SessionPayload,
  docKey: string,
): Promise<{ data: T | null; files: Record<string, string> }> {
  const { fileId, files } = await resolveFileId(accessToken, session, docKey);
  try {
    const text = await readFileContent(accessToken, fileId);
    if (!text) return { data: null, files };
    return { data: JSON.parse(text), files };
  } catch {
    // stale cached fileId (e.g. 404) — retry once with a fresh find-or-create
    delete files[docKey];
    const retry = await resolveFileId(accessToken, { ...session, files }, docKey);
    const text = await readFileContent(accessToken, retry.fileId);
    return { data: text ? JSON.parse(text) : null, files: retry.files };
  }
}

/** Generic write for a JSON blob stored in the app's Drive appDataFolder. */
async function writeDriveJson<T>(
  accessToken: string,
  session: SessionPayload,
  docKey: string,
  data: T,
): Promise<{ files: Record<string, string> }> {
  const { fileId, files } = await resolveFileId(accessToken, session, docKey);
  await writeFileContent(accessToken, fileId, JSON.stringify(data));
  return { files };
}

export interface DriveProgressData {
  progress: Record<string, { l: number; t: number }>;
  days: Record<string, number>;
}

export function readDriveProgress(accessToken: string, session: SessionPayload, storageKey: string) {
  return readDriveJson<DriveProgressData>(accessToken, session, `progress-${storageKey}`);
}

export function writeDriveProgress(
  accessToken: string,
  session: SessionPayload,
  storageKey: string,
  data: DriveProgressData,
) {
  return writeDriveJson(accessToken, session, `progress-${storageKey}`, data);
}

export function readDriveNotes(accessToken: string, session: SessionPayload, storageKey: string) {
  return readDriveJson<NotesData>(accessToken, session, `notes-${storageKey}`);
}

export function writeDriveNotes(accessToken: string, session: SessionPayload, storageKey: string, data: NotesData) {
  return writeDriveJson(accessToken, session, `notes-${storageKey}`, data);
}
