// Types + pure helpers shared between the server-only Firestore layer
// (reviews-db.ts, which imports firebase-admin — Node-only) and client
// components (the /reviews page needs `reviewStats` without pulling
// firebase-admin into the browser bundle).

export interface ReviewReply {
  message: string;
  updatedAt: number;
}

export interface ReviewEntry {
  rating: number; // 1-5
  comment?: string;
  name?: string; // display name the reviewer chose to show; absent = "Ẩn danh"
  createdAt: number;
  updatedAt: number;
  /** A single official reply from the app owner — Play Store style, one
   * editable response per review, set via the admin dashboard only. */
  reply?: ReviewReply;
}

export type PublicReview = ReviewEntry & { id: string };

export function reviewStats(reviews: Array<{ rating: number }>): {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
} {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  for (const r of reviews) {
    const rating = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[rating] += 1;
    sum += r.rating;
  }
  return { count: reviews.length, average: reviews.length ? sum / reviews.length : 0, distribution };
}
