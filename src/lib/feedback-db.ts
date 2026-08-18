// App rating + written feedback, submitted from Settings or the proactive
// in-app prompt (src/components/FeedbackPrompt.tsx) — stored in Firestore
// (not Drive) so it's readable from the admin dashboard regardless of which
// account submitted it, same reasoning as subscription-db.ts.

import { getDb } from "./firebase-admin";

export type FeedbackContext = "settings" | "prompt";

export interface FeedbackEntry {
  email: string;
  rating: number; // 1-5
  message?: string;
  context: FeedbackContext;
  createdAt: number;
}

export async function addFeedback(entry: Omit<FeedbackEntry, "createdAt">): Promise<void> {
  await getDb()
    .collection("feedback")
    .add({ ...entry, createdAt: Date.now() } satisfies FeedbackEntry);
}

/** Admin dashboard only — newest first. */
export async function listFeedback(): Promise<Array<FeedbackEntry & { id: string }>> {
  const snap = await getDb().collection("feedback").orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as FeedbackEntry) }));
}
