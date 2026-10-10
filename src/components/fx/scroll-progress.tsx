"use client";

import { useEffect, useState } from "react";

/** Fine barre de progression du défilement, en haut de la page. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left"
      style={{
        transform: `scaleX(${progress})`,
        background:
          "linear-gradient(to right, var(--color-gold-bright), var(--color-gold), var(--color-ember))",
        boxShadow: "0 0 12px rgba(230,194,122,0.6)",
        transition: "transform 120ms linear",
      }}
    />
  );
}
