export type ClozeSegment = { text: string } | { blank: string };

const BLANK_RE = /\{\{(.+?)\}\}/g;

/** Splits a passage authored with `{{answer}}` markers into text/blank segments. */
export function parseCloze(template: string): ClozeSegment[] {
  const segments: ClozeSegment[] = [];
  let last = 0;
  for (const m of template.matchAll(BLANK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) segments.push({ text: template.slice(last, idx) });
    segments.push({ blank: m[1] });
    last = idx + m[0].length;
  }
  if (last < template.length) segments.push({ text: template.slice(last) });
  return segments;
}

/** Resolves every `{{answer}}` marker to its answer — the plain listening script. */
export function renderClozePlain(template: string): string {
  return template.replace(BLANK_RE, "$1");
}
