"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

/**
 * Apparition douce au défilement. Désactivée automatiquement si l'utilisateur
 * préfère des animations réduites (le contenu reste immédiatement visible).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
