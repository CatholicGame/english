import { getDb } from "./firebase-admin";

// One AI-generated Writing Task 2 sample paragraph per vocab word, shared
// across every learner — generated once (on whichever user's request happens
// to be the cache miss) and reused forever after, instead of costing one AI
// call per user per word. Collection: ielts_vocab_samples/{term}.

export interface VocabSample {
  term: string;
  paragraph: string;
  generatedAt: number;
}

function docIdFor(term: string): string {
  return term.trim().toLowerCase();
}

export async function getVocabSample(term: string): Promise<VocabSample | null> {
  const snap = await getDb().collection("ielts_vocab_samples").doc(docIdFor(term)).get();
  return snap.exists ? (snap.data() as VocabSample) : null;
}

export async function setVocabSample(term: string, paragraph: string): Promise<VocabSample> {
  const data: VocabSample = { term: docIdFor(term), paragraph, generatedAt: Date.now() };
  await getDb().collection("ielts_vocab_samples").doc(docIdFor(term)).set(data);
  return data;
}
