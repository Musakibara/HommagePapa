import type { GalleryItemInput } from "./schema";

/* ==========================================================================
   GALERIE DE SOUVENIRS
   --------------------------------------------------------------------------
   ⚠️  Aucune photographie personnelle n'est fournie : chaque `image.src` vaut
   `null` et affiche un cadre de remplacement. Déposez vos fichiers dans
   `public/images/`, puis remplacez `src` par le chemin (ex. "/images/papa.jpg").
   `category` doit correspondre à un `id` défini dans
   `site.gallery.categories` (src/content/site.ts).
   ========================================================================== */

export const gallery = [
  {
    id: "portrait-jeune",
    image: {
      src: null,
      alt: "Portrait de jeunesse — emplacement à remplacer",
      caption: "Une jeunesse à raconter",
      focal: "center",
    },
    category: "jeunesse",
    year: "—",
    isDemo: true,
  },
  {
    id: "famille-table",
    image: {
      src: null,
      alt: "Repas de famille — emplacement à remplacer",
      caption: "Autour de la même table",
      focal: "center",
    },
    category: "famille",
    year: "—",
    isDemo: true,
  },
  {
    id: "voyage",
    image: {
      src: null,
      alt: "Voyage — emplacement à remplacer",
      caption: "Sur les routes, ensemble",
      focal: "center",
    },
    category: "voyages",
    year: "—",
    isDemo: true,
  },
  {
    id: "celebration",
    image: {
      src: null,
      alt: "Célébration — emplacement à remplacer",
      caption: "Une fête dont on se souvient",
      focal: "center",
    },
    category: "celebrations",
    year: "—",
    isDemo: true,
  },
  {
    id: "moment",
    image: {
      src: null,
      alt: "Moment partagé — emplacement à remplacer",
      caption: "Un instant simple, précieux",
      focal: "center",
    },
    category: "moments",
    year: "—",
    isDemo: true,
  },
  {
    id: "portrait-aujourdhui",
    image: {
      src: null,
      alt: "Portrait récent — emplacement à remplacer",
      caption: "Tel qu'il est aujourd'hui",
      focal: "center",
    },
    category: "famille",
    year: "—",
    isDemo: true,
  },
] satisfies GalleryItemInput[];
