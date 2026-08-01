export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function norm(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(s: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const existing = s.getVoices();
  if (existing.length > 0) return Promise.resolve(existing);
  return new Promise((resolve) => {
    const onChange = () => {
      s.removeEventListener("voiceschanged", onChange);
      resolve(s.getVoices());
    };
    s.addEventListener("voiceschanged", onChange);
    // Some browsers never fire voiceschanged if voices were already cached.
    setTimeout(() => resolve(s.getVoices()), 500);
  });
}

function bestEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (english.length === 0) return undefined;

  const score = (v: SpeechSynthesisVoice) => {
    let n = 0;
    if (/natural|neural|online/i.test(v.name)) n += 10;
    if (v.lang.toLowerCase() === "en-us") n += 2;
    else if (v.lang.toLowerCase() === "en-gb") n += 1;
    return n;
  };

  return english.sort((a, b) => score(b) - score(a))[0];
}

export async function speak(text: string) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.88;

    voicesPromise ??= loadVoices(s);
    const voice = bestEnglishVoice(await voicesPromise);
    if (voice) u.voice = voice;

    s.speak(u);
  } catch {
    // speech synthesis unavailable — silently ignore
  }
}
