"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Halo lumineux qui suit le curseur. Activé uniquement sur les appareils à
 * pointeur fin et désactivé si l'utilisateur préfère un mouvement réduit.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;

    const apply = () => {
      frame = 0;
      node.style.transform = `translate3d(${targetX - 320}px, ${targetY - 320}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[640px] w-[640px] rounded-full opacity-0 transition-opacity duration-700 [will-change:transform] md:opacity-100"
      style={{
        background:
          "radial-gradient(circle, rgba(230,194,122,0.14) 0%, rgba(255,122,69,0.06) 40%, transparent 70%)",
      }}
    />
  );
}
