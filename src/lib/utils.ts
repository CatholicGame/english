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

function voiceScore(v: SpeechSynthesisVoice): number {
  let n = 0;
  if (/natural|neural|online/i.test(v.name)) n += 10;
  if (v.lang.toLowerCase() === "en-us") n += 2;
  else if (v.lang.toLowerCase() === "en-gb") n += 1;
  return n;
}

/** English voices available in this browser, best-sounding first. */
export async function getEnglishVoices(): Promise<SpeechSynthesisVoice[]> {
  const s = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!s) return [];
  voicesPromise ??= loadVoices(s);
  const voices = await voicesPromise;
  return voices.filter((v) => v.lang.toLowerCase().startsWith("en")).sort((a, b) => voiceScore(b) - voiceScore(a));
}

const VOICE_PREF_KEY = "englishapp:voice-uri";

export function getPreferredVoiceURI(): string | null {
  try {
    return localStorage.getItem(VOICE_PREF_KEY);
  } catch {
    return null;
  }
}

export function setPreferredVoiceURI(voiceURI: string): void {
  try {
    localStorage.setItem(VOICE_PREF_KEY, voiceURI);
  } catch {
    // localStorage unavailable — preference just won't persist
  }
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const preferred = getPreferredVoiceURI();
  const match = preferred && voices.find((v) => v.voiceURI === preferred);
  if (match) return match;

  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (english.length === 0) return undefined;
  return english.sort((a, b) => voiceScore(b) - voiceScore(a))[0];
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
    const voice = pickVoice(await voicesPromise);
    if (voice) u.voice = voice;

    s.speak(u);
  } catch {
    // speech synthesis unavailable — silently ignore
  }
}

export function stopSpeaking() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    // speech synthesis unavailable — silently ignore
  }
}
