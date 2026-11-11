import type { TimelineEventInput } from "./schema";

/* ==========================================================================
   CHRONOLOGIE — « Son histoire »
   --------------------------------------------------------------------------
   Chaque étape est un repère chaleureux de la vie de Jean Paul. Adaptez librement
   les textes, et remplacez une photo en changeant `image.src` (fichiers dans
   `public/images/`). Un `image.src` à `null` affiche un cadre de remplacement.
   ========================================================================== */

export const timeline = [
  {
    id: "racines",
    period: "Le commencement",
    title: "Des racines et une enfance",
    story:
      "Tout commence par un lieu, une famille, des années qui forgent un caractère. C'est là que sont nées la droiture et la générosité qui ne l'ont jamais quitté.",
    image: {
      src: "/images/1791647282263.jpg",
      alt: "Portrait de Jean Paul",
      focal: "center",
      ratio: "tall",
    },
    isDemo: false,
  },
  {
    id: "debuts",
    period: "Les débuts",
    title: "Les premières responsabilités",
    story:
      "L'entrée dans la vie active, les choix courageux, les efforts discrets qui ne se voyaient pas mais qui ont tout porté. Il a appris très tôt le prix du travail bien fait.",
    image: {
      src: "/images/1791647515783.jpg",
      alt: "Souvenir de jeunesse de Jean Paul",
      focal: "center",
      ratio: "tall",
    },
    isDemo: false,
  },
  {
    id: "famille",
    period: "La famille",
    title: "Un foyer construit jour après jour",
    story:
      "Le moment où sa vie s'est remplie d'autres voix que la sienne. Les repas, les rires, les nuits sans sommeil — et tant d'amour donné sans jamais compter.",
    image: {
      src: "/images/1791647507469.jpg",
      alt: "La famille réunie autour de Jean Paul",
      focal: "center",
      ratio: "tall",
    },
    isDemo: false,
  },
  {
    id: "oeuvre",
    period: "L'œuvre d'une vie",
    title: "Un travail accompli avec honneur",
    story:
      "Des années de labeur, de patience et de fierté discrète. Ce qu'il a bâti de ses mains raconte sa droiture mieux que les mots.",
    image: {
      src: "/images/1791647551286.jpg",
      alt: "Un moment de fête en famille",
      focal: "center",
      ratio: "wide",
    },
    isDemo: false,
  },
  {
    id: "aujourdhui",
    period: "Aujourd'hui",
    title: "Ce qu'il transmet encore",
    story:
      "Les conseils, la présence, la manière de traverser les saisons. Son plus bel héritage n'est pas matériel : c'est ce qu'il a semé en nous, et qui grandit encore.",
    image: {
      src: "/images/IMG-20261025-WA0022.jpg",
      alt: "Jean Paul avec un proche",
      focal: "center",
      ratio: "tall",
    },
    isDemo: false,
  },
] satisfies TimelineEventInput[];
