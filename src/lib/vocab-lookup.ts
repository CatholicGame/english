import type { ListenLesson } from "@/data/listen-a-minute";

export interface VocabEntry {
  word: string;
  phonetic: string | null;
  partOfSpeech: string | null;
  definition: string | null;
  vi: string | null;
  contextSentence: string | null;
  contextSentenceVi: string | null;
  dictExample: string | null;
  found: boolean;
}

function normalizeForComparison(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const FETCH_TIMEOUT_MS = 8000;

function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

async function translateToVi(text: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (typeof translated !== "string") return null;
    // MyMemory's translation-memory cache sometimes has a source sentence
    // stored as its own "translation" — comes back identical to the input,
    // i.e. not actually translated. Treat that as a failed lookup.
    if (normalizeForComparison(translated) === normalizeForComparison(text)) return null;
    return /^\(.*\)$/.test(translated.trim()) ? translated.trim().slice(1, -1) : translated;
  } catch {
    return null;
  }
}

function findContextSentence(word: string, lesson: ListenLesson): string | null {
  const pattern = new RegExp(`\\b${word.replace(/-/g, "[- ]?")}\\b`, "i");
  return lesson.sentences.find((s) => pattern.test(s.text))?.text ?? null;
}

interface DictLookup {
  found: boolean;
  phonetic: string | null;
  partOfSpeech: string | null;
  definition: string | null;
  example: string | null;
}

async function fetchDictionary(word: string): Promise<DictLookup> {
  try {
    const res = await fetchWithTimeout(`/api/dictionary?word=${encodeURIComponent(word)}`);
    if (!res.ok) return { found: false, phonetic: null, partOfSpeech: null, definition: null, example: null };
    return await res.json();
  } catch {
    return { found: false, phonetic: null, partOfSpeech: null, definition: null, example: null };
  }
}

/** Looks up one lesson word live: English definition/phonetic from the Free
 * Dictionary API (proxied server-side, since it has no CORS headers), and a
 * Vietnamese gloss machine-translated from that *definition* rather than the
 * bare word — translating an isolated headword out of context is unreliable
 * (e.g. "dangerous" alone can come back as an unrelated cached phrase), while
 * translating the full definition sentence is consistently accurate. The
 * lesson's own sentence containing the word (translated too) is shown as the
 * real, in-context example instead of a generic dictionary one. */
export async function lookupVocabWord(word: string, lesson: ListenLesson): Promise<VocabEntry> {
  const cleanWord = word.replace(/['".,!?;:]/g, "");
  const contextSentence = findContextSentence(cleanWord, lesson);

  const dict = await fetchDictionary(cleanWord);

  const [vi, contextSentenceVi] = await Promise.all([
    dict.definition ? translateToVi(dict.definition) : translateToVi(cleanWord),
    contextSentence ? translateToVi(contextSentence) : Promise.resolve(null),
  ]);

  return {
    word: cleanWord,
    phonetic: dict.phonetic,
    partOfSpeech: dict.partOfSpeech,
    definition: dict.definition,
    vi,
    contextSentence,
    contextSentenceVi,
    dictExample: dict.example,
    found: dict.found || vi != null,
  };
}
