"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";
import type { MusicConfig } from "@/content/schema";

/**
 * Lecteur d'ambiance facultatif.
 *  - Ne démarre JAMAIS automatiquement (aucune lecture « avec son »).
 *  - Se masque si aucune piste n'est configurée.
 *  - Gère proprement les erreurs de chargement.
 */
export function MusicToggle({ music }: { music: MusicConfig }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = music.volume;
  }, [music.volume]);

  if (!music.enabled || !music.src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setFailed(true);
      setPlaying(false);
    }
  };

  return (
    <div className="inline-flex items-center">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onError={() => setFailed(true)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Mettre en pause ${music.title}` : `Écouter ${music.title}`}
        title={failed ? "Lecture audio indisponible" : music.title}
        disabled={failed}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 font-sans text-xs uppercase tracking-[0.14em] text-mist transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:text-gold-bright disabled:opacity-50"
      >
        {playing ? (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{playing ? "Pause" : "Musique"}</span>
      </button>
    </div>
  );
}
