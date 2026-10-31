import { Sparkles } from "lucide-react";

/**
 * Garde-fou de diffusion.
 *
 * Tant que `site.showDemoContent` vaut `true`, des textes et messages
 * d'exemple sont affichés. Ce repère discret évite de les prendre pour des
 * contenus définitifs. Il disparaît dès que l'option passe à `false`.
 */
export function DemoBanner() {
  return (
    <p
      role="note"
      className="glass fixed bottom-5 left-5 z-[85] flex max-w-[15rem] items-center gap-2 rounded-full px-3.5 py-2 font-sans text-[0.62rem] uppercase tracking-[0.16em] text-mist sm:bottom-8 sm:left-8"
    >
      <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
      <span className="hidden sm:inline">Aperçu — certains textes sont des exemples</span>
      <span className="sm:hidden">Aperçu</span>
    </p>
  );
}
