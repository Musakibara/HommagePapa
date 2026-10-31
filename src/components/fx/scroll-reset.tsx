"use client";

import { useEffect } from "react";

/**
 * Sur un site « une seule page », un rechargement sans ancre doit ramener en
 * haut de page. En revanche, un lien profond (`/#messages`, `/#histoire`) doit
 * rester fonctionnel : on ne supprime jamais le hash de l'URL.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      // Empêche le navigateur de restaurer l'ancienne position au F5.
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
