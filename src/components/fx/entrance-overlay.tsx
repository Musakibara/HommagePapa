"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Clé de session : l'intro ne joue qu'une fois par onglet/session. */
const STORAGE_KEY = "hp:intro-seen";

/** Durée pendant laquelle l'intro reste à l'écran avant la levée du rideau. */
const HOLD_MS = 2350;

/** Durée de la levée du rideau. */
const EXIT_MS = 950;

const RING_RADIUS = 92;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Phase = "idle" | "active" | "exiting" | "done";

interface EntranceOverlayProps {
  /** Nom du site, révélé mot à mot (ex. « Hommage à Papa »). */
  siteName: string;
  /** Phrase sous le titre (ex. « Une célébration de la vie »). */
  tagline: string;
  /** Lettre centrale du monogramme (ex. « M »). */
  monogram: string;
}

/**
 * « L'Ouverture » — accueil plein écran joué une fois par session.
 *
 * Séquence : anneau dessiné autour du monogramme, mot révélé, filet or,
 * puis rideau qui se lève. Skippable au clic ou avec Échap, et ignoré
 * entièrement si l'utilisateur préfère des mouvements réduits.
 *
 * L'état est décidé après le premier rendu (via requestAnimationFrame)
 * afin que le HTML servi par le serveur reste identique au premier rendu
 * client (pas de flash, pas de mismatch d'hydratation).
 */
export function EntranceOverlay({
  siteName,
  tagline,
  monogram,
}: EntranceOverlayProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raf = requestAnimationFrame(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);

      if (reduced || alreadySeen) {
        setPhase("done");
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("active");
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== "active") return;
    const timer = window.setTimeout(() => setPhase("exiting"), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const skip = useCallback(() => {
    setPhase((current) => (current === "active" ? "exiting" : current));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  if (phase === "done") return null;

  const words = siteName.split(/(\s+)/).filter((part) => part.trim().length > 0);
  const ringStyle = {
    "--ring-c": `${RING_CIRCUMFERENCE}px`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "entrance-overlay",
        phase === "active" && "is-active",
        phase === "exiting" && "is-exiting",
      )}
      onPointerDown={skip}
      role="presentation"
      aria-hidden="true"
      data-intro
    >
      {phase !== "idle" ? (
        <div className="entrance-stage">
          <div className="entrance-emblem">
            <svg
              className="entrance-ring"
              viewBox="0 0 200 200"
              style={ringStyle}
              aria-hidden="true"
            >
              <circle
                className="entrance-ring-rotate"
                cx="100"
                cy="100"
                r={RING_RADIUS}
                fill="none"
                stroke="url(#entrance-ring-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE}
              />
              <defs>
                <linearGradient
                  id="entrance-ring-grad"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0" stopColor="#ffe7ae" />
                  <stop offset="0.55" stopColor="#e6c27a" />
                  <stop offset="1" stopColor="#ff7a45" />
                </linearGradient>
              </defs>
            </svg>
            <em className="entrance-monogram" style={{ animationDelay: "0.15s" }}>
              <span className="text-shine">{monogram}</span>
            </em>
          </div>

          <p className="entrance-eyebrow" style={{ animationDelay: "0.95s" }}>
            {tagline}
          </p>

          <h2 className="entrance-wordmark">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="entrance-word"
                style={{ animationDelay: `${1.05 + index * 0.16}s` }}
              >
                {word}
              </span>
            ))}
          </h2>

          <span
            className="entrance-line"
            style={{ animationDelay: "1.85s" }}
            aria-hidden="true"
          />
        </div>
      ) : null}

      <div className="entrance-ember" aria-hidden="true" />
    </div>
  );
}