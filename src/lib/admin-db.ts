import { getDb } from "./firebase-admin";

// Sub-admins added at runtime by a super admin (see src/lib/admin.ts) — unlike
// the ADMIN_EMAILS env allowlist, these need to change without a redeploy, so
// they live in Firestore instead. Collection: admins/{email}. Only role that
// exists today is "viewer" (read-only dashboard access) — anything more
// privileged stays in ADMIN_EMAILS.

export type AdminRole = "viewer";

export interface AdminRecord {
  email: string;
  role: AdminRole;
  addedBy: string;
  addedAt: number;
}

function docIdFor(email: string): string {
  return email.trim().toLowerCase();
}

export async function listSubAdmins(): Promise<AdminRecord[]> {
  const snap = await getDb().collection("admins").get();
  return snap.docs.map((doc) => doc.data() as AdminRecord);
}

export async function getSubAdmin(email: string): Promise<AdminRecord | null> {
  const snap = await getDb().collection("admins").doc(docIdFor(email)).get();
  return snap.exists ? (snap.data() as AdminRecord) : null;
}

export async function addSubAdmin(email: string, addedBy: string): Promise<void> {
  const record: AdminRecord = { email: docIdFor(email), role: "viewer", addedBy, addedAt: Date.now() };
  await getDb().collection("admins").doc(docIdFor(email)).set(record);
}

export async function removeSubAdmin(email: string): Promise<void> {
  await getDb().collection("admins").doc(docIdFor(email)).delete();
}
