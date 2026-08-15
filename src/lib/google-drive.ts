import type { NotesData } from "./notes-store";
import type { AiConvoData } from "./ai-convo-store";
import type { DictionaryData } from "./dictionary-store";
import type { TranslationData } from "./translation-store";
import type { SubscriptionData } from "./subscription-store";
import type { CustomClozeData } from "./listen-custom-cloze-store";
import type { GrammarData } from "./grammar-store";
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

// ─── AI Conversations ──────────────────────────────────────────────

export function readDriveAiConvos(accessToken: string, session: SessionPayload, storageKey: string) {
  return readDriveJson<AiConvoData>(accessToken, session, `ai-convos-${storageKey}`);
}

export function writeDriveAiConvos(accessToken: string, session: SessionPayload, storageKey: string, data: AiConvoData) {
  return writeDriveJson(accessToken, session, `ai-convos-${storageKey}`, data);
}

// ─── Personal Dictionary ───────────────────────────────────────────
// Unlike the stores above, this is a single global list per user (not split
// per module), so it uses a fixed docKey instead of one qualified by storageKey.

export function readDriveDictionary(accessToken: string, session: SessionPayload) {
  return readDriveJson<DictionaryData>(accessToken, session, "dictionary");
}

export function writeDriveDictionary(accessToken: string, session: SessionPayload, data: DictionaryData) {
  return writeDriveJson(accessToken, session, "dictionary", data);
}

// ─── Saved Translations ────────────────────────────────────────────
// Also a single global list per user, kept in its own Drive file — separate
// from the personal dictionary since translations are opt-in saved, not
// auto-collected vocabulary.

export function readDriveTranslations(accessToken: string, session: SessionPayload) {
  return readDriveJson<TranslationData>(accessToken, session, "translations");
}

export function writeDriveTranslations(accessToken: string, session: SessionPayload, data: TranslationData) {
  return writeDriveJson(accessToken, session, "translations", data);
}

// ─── Subscription (dummy, pre-payment-gateway) ─────────────────────
// Single global record per user, same shape as dictionary/translations above.
// See subscription-store.ts for why this exists and its limitations.

export function readDriveSubscription(accessToken: string, session: SessionPayload) {
  return readDriveJson<SubscriptionData>(accessToken, session, "subscription");
}

export function writeDriveSubscription(accessToken: string, session: SessionPayload, data: SubscriptionData) {
  return writeDriveJson(accessToken, session, "subscription", data);
}

// ─── Listen A Minute — learner's own custom cloze picks ────────────
// One file for the whole module, keyed internally by lesson slug — same
// shape of pattern as notes-store.ts's per-module file.

export function readDriveListenCustomCloze(accessToken: string, session: SessionPayload) {
  return readDriveJson<CustomClozeData>(accessToken, session, "listen-custom-cloze");
}

export function writeDriveListenCustomCloze(accessToken: string, session: SessionPayload, data: CustomClozeData) {
  return writeDriveJson(accessToken, session, "listen-custom-cloze", data);
}

// ─── Personal Grammar Dictionary ────────────────────────────────────
// Single global list per user, same shape of pattern as dictionary/translations.

export function readDriveGrammar(accessToken: string, session: SessionPayload) {
  return readDriveJson<GrammarData>(accessToken, session, "grammar");
}

export function writeDriveGrammar(accessToken: string, session: SessionPayload, data: GrammarData) {
  return writeDriveJson(accessToken, session, "grammar", data);
}
