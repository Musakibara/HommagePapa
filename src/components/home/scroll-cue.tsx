"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ScrollCue({ label, targetId }: { label: string; targetId: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-mist transition-colors hover:text-gold-bright sm:flex"
    >
      <span className="eyebrow">{label}</span>
      <motion.span
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 group-hover:border-gold/50"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.span>
    </a>
  );
}
