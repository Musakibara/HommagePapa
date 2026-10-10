/**
 * Bus d'événements « célébration ».
 *
 * Permet de déclencher une salve de confettis depuis n'importe quel composant
 * sans coupler l'interface au canvas. Purement frontend, aucun backend.
 */

export const CELEBRATE_EVENT = "hp:celebrate";

export interface CelebrateDetail {
  /** Point d'origine (coordonnées écran). Par défaut : bas-centre. */
  x?: number;
  y?: number;
  /** Nombre de particules. */
  count?: number;
}

export function celebrate(detail: CelebrateDetail = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CelebrateDetail>(CELEBRATE_EVENT, { detail }));
}
