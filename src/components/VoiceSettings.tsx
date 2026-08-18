"use client";

import { useEffect, useState } from "react";
import { getEnglishVoices, getPreferredVoiceURI, setPreferredVoiceURI, speak } from "@/lib/utils";
import { useUiLang } from "@/lib/i18n";

export function VoiceSettings() {
  const { t } = useUiLang();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let cancelled = false;
    getEnglishVoices().then((list) => {
      if (cancelled) return;
      setVoices(list);
      setSelected(getPreferredVoiceURI() ?? list[0]?.voiceURI ?? "");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(voiceURI: string) {
    setSelected(voiceURI);
    setPreferredVoiceURI(voiceURI);
    speak("Hello, this is how I sound.");
  }

  if (voices.length === 0) return null;

  return (
    <div className="px-3 py-2">
      <div className="label-xs mb-1.5">{t("settings.voice")}</div>
      <select
        className="input text-[13px]"
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
      >
        {voices.map((v) => (
          <option key={v.voiceURI} value={v.voiceURI}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>
    </div>
  );
}
