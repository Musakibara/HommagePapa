"use client";

import { useEffect, useState } from "react";
import { computeCountdown, type Countdown } from "@/lib/datetime";
import { pad2 } from "@/lib/utils";

interface CountdownProps {
  /** Instant cible au format ISO (UTC), transmis par le serveur. `null` = masqué. */
  targetIso: string | null;
  celebrationMessage: string;
}

const UNITS: { key: keyof Countdown; label: string }[] = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
];

/**
 * Compte à rebours. Aucune valeur n'est calculée au rendu serveur : l'affichage
 * démarre après montage pour éviter tout décalage d'hydratation.
 */
export function Countdown({ targetIso, celebrationMessage }: CountdownProps) {
  const [state, setState] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!targetIso) return;
    const target = new Date(targetIso);
    if (Number.isNaN(target.getTime())) return;

    const tick = () => setState(computeCountdown(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  if (!targetIso) return null;

  if (state?.isPast) {
    return (
      <p
        className="text-shine mx-auto max-w-2xl text-center font-serif text-3xl sm:text-4xl"
        role="status"
      >
        {celebrationMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {UNITS.map((unit) => {
        const value = state ? (state[unit.key] as number) : null;
        return (
          <div
            key={unit.key}
            className="glass-card relative overflow-hidden rounded-[var(--radius-card)] px-4 py-8 text-center"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 -top-10 h-16 opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(230,194,122,0.7), transparent)",
              }}
            />
            <span
              className="relative block font-serif text-4xl tabular-nums leading-none text-ivory sm:text-5xl"
              aria-hidden={value === null || undefined}
            >
              {value === null ? "--" : pad2(value)}
            </span>
            <span className="eyebrow relative mt-4 block text-gold/80">{unit.label}</span>
          </div>
        );
      })}
    </div>
  );
}
