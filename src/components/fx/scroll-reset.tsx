"use client";

import { useEffect } from "react";

/**
 * Sur un site « une seule page », un rechargement doit ramener en haut de
 * page (première section). Sans ce composant, le navigateur restaure
 * l'ancienne position de défilement et, si une ancre (`#histoire`,
 * `#souvenirs`, …) traîne dans l'URL, y recale la vue avec un décalage.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      // Empêche le navigateur de restaurer l'ancienne position au F5.
      window.history.scrollRestoration = "manual";
    }

    // Retire l'ancre de l'URL pour que le rechargement démarre sur le héros.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // Filet de sécurité : toujours se poser tout en haut.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}