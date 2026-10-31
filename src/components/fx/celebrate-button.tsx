"use client";

import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";

/**
 * Bouton flottant « Célébrer » : déclenche une salve de confettis.
 *
 * Il s'efface sur les sections marquées `data-calm` (la lettre, les messages,
 * la conclusion) pour laisser toute la place à l'émotion.
 */
export function CelebrateButton() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-calm]"),
    );
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setCalm(visible.size > 0);
      },
      { threshold: 0.05 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        celebrate({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 130 });
      }}
      tabIndex={calm ? -1 : undefined}
      aria-hidden={calm || undefined}
      className={cn(
        "glass group fixed bottom-5 right-5 z-[85] inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-gold-bright transition-all duration-500 hover:text-ivory sm:bottom-8 sm:right-8",
        calm && "pointer-events-none translate-y-2 opacity-0",
      )}
      aria-label="Lancer une célébration"
      title="Célébrer !"
    >
      <PartyPopper className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
      <span className="hidden sm:inline">Célébrer</span>
    </button>
  );
}
