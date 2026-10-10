"use client";

import { PartyPopper } from "lucide-react";
import { celebrate } from "@/lib/celebrate";

/** Bouton flottant « Célébrer » : déclenche une salve de confettis. */
export function CelebrateButton() {
  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        celebrate({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 130 });
      }}
      className="glass group fixed bottom-5 right-5 z-[85] inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-gold-bright transition-colors hover:text-ivory sm:bottom-8 sm:right-8"
      aria-label="Lancer une célébration"
      title="Célébrer !"
    >
      <PartyPopper className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
      <span className="hidden sm:inline">Célébrer</span>
    </button>
  );
}
