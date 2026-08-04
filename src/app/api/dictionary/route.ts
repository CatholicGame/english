import { NextResponse, type NextRequest } from "next/server";

interface DictDefinition {
  definition: string;
  example?: string;
}
interface DictMeaning {
  partOfSpeech: string;
  definitions: DictDefinition[];
}
interface DictEntry {
  phonetic?: string;
  phonetics?: { text?: string }[];
  meanings?: DictMeaning[];
}

// The Free Dictionary API has no CORS headers, so the browser can't call it
// directly from the client — this route proxies it server-side instead.
export async function GET(request: NextRequest) {
  const word = request.nextUrl.searchParams.get("word");
  if (!word) return NextResponse.json({ error: "missing word" }, { status: 400 });

  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  if (!res.ok) return NextResponse.json({ found: false });

  const data: DictEntry[] = await res.json();
  const entry = data[0];
  const phonetic = entry?.phonetic || entry?.phonetics?.find((p) => p.text)?.text || null;
  const meaning = entry?.meanings?.[0];
  // Wiktionary-sourced entries sometimes prefix a definition with a bracketed
  // gloss tag like "(heading)" — noise for a learner-facing definition.
  const definition = meaning?.definitions?.[0]?.definition?.replace(/^\([^)]*\)\s*/, "") ?? null;
  const example = meaning?.definitions?.find((d) => d.example)?.example ?? null;

  return NextResponse.json({
    found: true,
    phonetic,
    partOfSpeech: meaning?.partOfSpeech ?? null,
    definition,
    example,
  });
}
