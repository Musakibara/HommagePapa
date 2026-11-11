import type { GalleryItemInput } from "./schema";

/* ==========================================================================
   GALERIE DE SOUVENIRS
   --------------------------------------------------------------------------
   Les photographies sont déposées dans `public/images/`. Chaque `alt` décrit
   l'image pour les lecteurs d'écran : n'hésitez pas à les préciser au fil de
   vos souvenirs. `category` doit correspondre à un `id` défini dans
   `site.gallery.categories` (src/content/site.ts).
   ========================================================================== */

export const gallery = [
  {
    id: "portrait-force-tranquille",
    image: {
      src: "/images/1791647243618.jpg",
      alt: "Portrait de Jean Paul",
      caption: "La force tranquille",
      focal: "center",
    },
    category: "jeunesse",
    isDemo: false,
  },
  {
    id: "souvenir-01",
    image: {
      src: "/images/1791647255387.jpg",
      alt: "Souvenir de famille",
      caption: "Un moment partagé",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-02",
    image: {
      src: "/images/1791647265589.jpg",
      alt: "Souvenir de famille",
      caption: "Ensemble",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-03",
    image: {
      src: "/images/1791647282263.jpg",
      alt: "Portrait de Jean Paul",
      caption: "Un regard qui rassure",
      focal: "center",
    },
    category: "jeunesse",
    isDemo: false,
  },
  {
    id: "souvenir-04",
    image: {
      src: "/images/1791647507469.jpg",
      alt: "La famille réunie",
      caption: "Les siens autour de lui",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-05",
    image: {
      src: "/images/1791647512184.jpg",
      alt: "Un moment de famille",
      caption: "Une journée ordinaire devenue précieuse",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-06",
    image: {
      src: "/images/1791647515783.jpg",
      alt: "Souvenir de famille",
      caption: "Le temps suspendu",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-07",
    image: {
      src: "/images/1791647524239.jpg",
      alt: "Souvenir de famille",
      caption: "Un sourire complice",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-08",
    image: {
      src: "/images/1791647525800.jpg",
      alt: "Portrait de famille",
      caption: "Une présence",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-09",
    image: {
      src: "/images/1791647537208.jpg",
      alt: "Souvenir de famille",
      caption: "Les années qui passent",
      focal: "center",
    },
    category: "jeunesse",
    isDemo: false,
  },
  {
    id: "souvenir-10",
    image: {
      src: "/images/1791647549248.jpg",
      alt: "La famille réunie",
      caption: "Toujours entouré",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-11",
    image: {
      src: "/images/1791647551286.jpg",
      alt: "Un moment de fête en famille",
      caption: "Un jour de fête",
      focal: "center",
    },
    category: "celebrations",
    isDemo: false,
  },
  {
    id: "souvenir-12",
    image: {
      src: "/images/1791647555121.jpg",
      alt: "Souvenir de famille",
      caption: "À ses côtés",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-13",
    image: {
      src: "/images/1791647556774.jpg",
      alt: "Portrait de famille",
      caption: "Un instant de joie",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-14",
    image: {
      src: "/images/1791647566286.jpg",
      alt: "Souvenir de famille",
      caption: "Le temps partagé",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-15",
    image: {
      src: "/images/1791647571280.jpg",
      alt: "Grande réunion de famille",
      caption: "La famille réunie",
      focal: "center",
    },
    category: "celebrations",
    isDemo: false,
  },
  {
    id: "souvenir-16",
    image: {
      src: "/images/1791647574441.jpg",
      alt: "Un moment de célébration",
      caption: "Une fête dont on se souvient",
      focal: "center",
    },
    category: "celebrations",
    isDemo: false,
  },
  {
    id: "souvenir-17",
    image: {
      src: "/images/1791647616554.jpg",
      alt: "Souvenir de famille",
      caption: "Un moment simple, précieux",
      focal: "center",
    },
    category: "moments",
    isDemo: false,
  },
  {
    id: "souvenir-18",
    image: {
      src: "/images/2d194e74-c412-4da1-b14c-3bc3ff962c8d.jpg",
      alt: "Jean Paul et un proche",
      caption: "Un regard complice",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-19",
    image: {
      src: "/images/8a3c4392-c1ca-4903-b110-de90c01cdea8.jpg",
      alt: "Portrait de Jean Paul",
      caption: "Tel qu'il est aujourd'hui",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-20",
    image: {
      src: "/images/928c996c-3c3a-4c34-ae14-430fdb3572c4.jpg",
      alt: "Portrait de Jean Paul",
      caption: "Une présence lumineuse",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
  {
    id: "souvenir-21",
    image: {
      src: "/images/IMG-20261025-WA0022.jpg",
      alt: "Jean Paul avec un proche",
      caption: "Ensemble, aujourd'hui",
      focal: "center",
    },
    category: "celebrations",
    isDemo: false,
  },
  {
    id: "souvenir-22",
    image: {
      src: "/images/1315e4d8-de77-4b5c-b816-d37a8d7e5136.jpg",
      alt: "Jean Paul et un proche",
      caption: "Un souvenir précieux",
      focal: "center",
    },
    category: "famille",
    isDemo: false,
  },
] satisfies GalleryItemInput[];
