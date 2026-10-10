import type { TimelineEventInput } from "./schema";

/* ==========================================================================
   CHRONOLOGIE — « Son histoire »
   --------------------------------------------------------------------------
   ⚠️  Contenu de DÉMONSTRATION. Ces repères sont volontairement génériques et
   ne décrivent la vie de personne en particulier. Remplacez-les par les vrais
   souvenirs de votre papa, puis passez `isDemo` à `false` (ou désactivez
   `showDemoContent` dans src/content/site.ts).
   Chaque `image.src` à `null` affiche un cadre de remplacement.
   ========================================================================== */

export const timeline = [
  {
    id: "racines",
    period: "Le commencement",
    title: "Des racines et une enfance",
    story:
      "Le point de départ de son histoire : un lieu, une famille, des années qui ont forgé son caractère. À compléter avec vos souvenirs.",
    image: {
      src: null,
      alt: "Photographie d'enfance — emplacement à remplacer",
      focal: "center",
    },
    isDemo: true,
  },
  {
    id: "debuts",
    period: "Les débuts",
    title: "Les premières responsabilités",
    story:
      "L'entrée dans la vie active, les choix courageux, les efforts discrets qui ne se voyaient pas mais qui ont tout porté.",
    image: {
      src: null,
      alt: "Photographie de jeunesse — emplacement à remplacer",
      focal: "center",
    },
    isDemo: true,
  },
  {
    id: "famille",
    period: "La famille",
    title: "Un foyer construit jour après jour",
    story:
      "Le moment où sa vie s'est remplie d'autres voix que la sienne. Les repas, les rires, les nuits sans sommeil, et tant d'amour donné sans compter.",
    isDemo: true,
  },
  {
    id: "oeuvre",
    period: "L'œuvre d'une vie",
    title: "Un travail accompli avec honneur",
    story:
      "Des années de labeur, de patience et de fierté discrète. Ce qu'il a bâti de ses mains raconte sa droiture mieux que les mots.",
    isDemo: true,
  },
  {
    id: "aujourdhui",
    period: "Aujourd'hui",
    title: "Ce qu'il transmet encore",
    story:
      "Les conseils, la présence, la manière de traverser les saisons. Son plus bel héritage n'est pas matériel : c'est ce qu'il a semé en nous.",
    isDemo: true,
  },
] satisfies TimelineEventInput[];
