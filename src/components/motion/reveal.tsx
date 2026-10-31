"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Délai avant l'apparition, en secondes. */
  delay?: number;
  /** Décalage vertical initial, en pixels. */
  y?: number;
  /** Longueur de l'animation, en secondes. */
  duration?: number;
}

/** Marge basse : l'élément apparaît un peu avant d'atteindre le bord. */
const BOTTOM_INSET = 80;

/**
 * Apparition douce au défilement.
 *
 * Le contenu reste visible dans le HTML si JavaScript est absent : les styles
 * d'entrée ne s'appliquent que lorsque le navigateur active `scripting`.
 * L'observateur ajoute simplement la classe `is-visible` à l'approche.
 *
 * Un contrôle au défilement sert de filet de sécurité : un saut d'ancre ou un
 * défilement très rapide peut traverser une section sans qu'elle soit jamais
 * intersectante, et l'observateur ne se déclencherait alors jamais — le texte
 * resterait invisible en remontant. Le contrôle révèle aussi les éléments
 * déjà dépassés.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let done = false;

    const cleanup = () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };

    const show = () => {
      if (done) return;
      done = true;
      node.classList.add("is-visible");
      cleanup();
    };

    const check = () => {
      const rect = node.getBoundingClientRect();
      // Dans la zone visible, ou déjà dépassé (saut d'ancre, défilement vif).
      if (rect.top < window.innerHeight - BOTTOM_INSET || rect.bottom < 0) {
        show();
      }
    };

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        check();
      });
    }

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show();
        }
      },
      { rootMargin: `0px 0px -${BOTTOM_INSET}px 0px` },
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return cleanup;
  }, []);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
