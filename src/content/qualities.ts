import type { QualityInput } from "./schema";

/* ==========================================================================
   « CE QUI LE REND UNIQUE »
   --------------------------------------------------------------------------
   Chaque bloc décrit une facette de Jean Paul. Adaptez chaque texte, ou retirez
   les blocs qui ne lui correspondent pas.
   ========================================================================== */

export const qualities = [
  {
    id: "sagesse",
    title: "Sa sagesse",
    narrative:
      "Il écoute avant de parler et parle rarement pour ne rien dire. Ses conseils sont simples — et c'est souvent ce qui les rend justes.",
    isDemo: false,
  },
  {
    id: "generosite",
    title: "Sa générosité",
    narrative:
      "Donner sans le dire, aider sans compter, être là quand on a besoin de lui. Une générosité discrète, jamais mise en scène.",
    isDemo: false,
  },
  {
    id: "courage",
    title: "Son courage",
    narrative:
      "Il a traversé les épreuves sans se plaindre, gardant le cap pour ceux qui comptaient sur lui. Une force tranquille, qui ne cherche pas les applaudissements.",
    isDemo: false,
  },
  {
    id: "humour",
    title: "Son humour",
    narrative:
      "Une plaisanterie au bon moment, un sourire qui désarme les tensions. Il sait ramener la joie là où elle manque.",
    isDemo: false,
  },
  {
    id: "amour",
    title: "Son amour pour sa famille",
    narrative:
      "C'est le fil qui relie tout le reste. Sa façon d'aimer est peut-être silencieuse, mais elle n'a jamais manqué à personne.",
    isDemo: false,
  },
  {
    id: "lecons",
    title: "Les leçons qu'il nous a transmises",
    narrative:
      "Tenir sa parole. Respecter les autres. Se relever après une chute. Autant de repères qu'il nous a donnés et qui nous suivent encore.",
    isDemo: false,
  },
] satisfies QualityInput[];
