// Public app reviews (Play Store style) — every signed-in user can read
// everyone else's rating/comment, unlike feedback-db.ts's predecessor which
// was admin-only. One review per account: keyed internally by email (via a
// query, not the Firestore doc id, so the doc id never encodes the email)
// and upserted, so revising a rating edits the same entry instead of piling
// up duplicates. `email` is stored for moderation (see listReviewsForAdmin/
// deleteReview) but is stripped from every public-facing read.
//
// Types + reviewStats() live in reviews-shared.ts, not here, so client
// components can use them without pulling firebase-admin (Node-only) into
// the browser bundle.

import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebase-admin";
import type { ReviewEntry, PublicReview, ReviewReply } from "./reviews-shared";

export type { ReviewEntry, PublicReview, ReviewReply } from "./reviews-shared";

function toPublicReview(id: string, data: ReviewEntry): PublicReview {
  const { rating, comment, name, createdAt, updatedAt, reply } = data;
  return { id, rating, comment, name, createdAt, updatedAt, reply };
}

async function findReviewDocId(email: string): Promise<string | null> {
  const snap = await getDb().collection("reviews").where("email", "==", email).limit(1).get();
  return snap.empty ? null : snap.docs[0].id;
}

export async function upsertReview(
  email: string,
  input: { rating: number; comment?: string; name?: string },
): Promise<void> {
  const db = getDb();
  const existingId = await findReviewDocId(email);
  const now = Date.now();

  if (existingId) {
    const existing = (await db.collection("reviews").doc(existingId).get()).data() as ReviewEntry | undefined;
    await db
      .collection("reviews")
      .doc(existingId)
      // Preserve any existing owner reply — revising your own rating must
      // not silently wipe out a developer response already attached to it.
      .set({ ...input, email, reply: existing?.reply, createdAt: existing?.createdAt ?? now, updatedAt: now });
  } else {
    await db.collection("reviews").add({ ...input, email, createdAt: now, updatedAt: now });
  }
}

export async function getMyReview(email: string): Promise<PublicReview | null> {
  const id = await findReviewDocId(email);
  if (!id) return null;
  const snap = await getDb().collection("reviews").doc(id).get();
  return toPublicReview(id, snap.data() as ReviewEntry);
}

/** Public listing — every field except `email`, most-recently-updated first
 * (an edited rating resurfaces, same as Play Store). */
export async function listPublicReviews(limit = 200): Promise<PublicReview[]> {
  const snap = await getDb().collection("reviews").orderBy("updatedAt", "desc").limit(limit).get();
  return snap.docs.map((doc) => toPublicReview(doc.id, doc.data() as ReviewEntry));
}

// ─── Admin moderation ──────────────────────────────────────────────

export async function listReviewsForAdmin(limit = 500): Promise<Array<PublicReview & { email: string }>> {
  const snap = await getDb().collection("reviews").orderBy("updatedAt", "desc").limit(limit).get();
  return snap.docs.map((doc) => {
    const data = doc.data() as ReviewEntry & { email: string };
    return { ...toPublicReview(doc.id, data), email: data.email };
  });
}

export async function deleteReview(id: string): Promise<void> {
  await getDb().collection("reviews").doc(id).delete();
}

/** Sets (or, with an empty message, clears) the single owner reply on a
 * review — Play Store only ever shows one editable developer response per
 * review, so this replaces rather than appends. `FieldValue.delete()` is
 * required (not just omitting the field) to actually remove it under
 * `merge: true` — omitting it would just leave the previous reply in place. */
export async function replyToReview(id: string, message: string): Promise<void> {
  const trimmed = message.trim();
  const reply: ReviewReply | ReturnType<typeof FieldValue.delete> = trimmed
    ? { message: trimmed, updatedAt: Date.now() }
    : FieldValue.delete();
  await getDb().collection("reviews").doc(id).set({ reply }, { merge: true });
}
