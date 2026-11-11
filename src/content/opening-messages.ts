/* ==========================================================================
   MESSAGES D'OUVERTURE DU LIVRE D'OR
   --------------------------------------------------------------------------
   Quelques mots chaleureux déjà déposés pour Papa. Ils s'affichent sur le mur
   tant qu'aucun message n'a encore été écrit depuis l'appareil du visiteur.

   Remplissez librement : remplacez un `authorName` par un vrai prénom, ou
   signez par un rôle (« Ta fille », « Ton fils », « Tes petits-enfants »…).
   ========================================================================== */

export interface OpeningMessage {
  id: string;
  authorName: string;
  relationship: string | null;
  body: string;
}

export const openingMessages: OpeningMessage[] = [
  {
    id: "ouverture-1",
    authorName: "Ta famille",
    relationship: "Avec tout notre amour",
    body:
      "Papa, aucune fête ne pourra jamais contenir tout ce que nous te devons. Alors aujourd'hui, nous te le disons simplement : merci — pour ta patience, tes sacrifices, et cet amour qui n'a jamais faibli. Joyeux anniversaire.",
  },
  {
    id: "ouverture-2",
    authorName: "Tes enfants",
    relationship: "Pour la vie",
    body:
      "Tu nous as appris à nous relever, à tenir parole et à aimer sans compter. Aujourd'hui, c'est à notre tour de te porter un peu : joyeux anniversaire, Papa.",
  },
  {
    id: "ouverture-3",
    authorName: "Un proche",
    relationship: "Un ami de toujours",
    body:
      "Jean Paul, l'homme qu'on appelle JPS… Ta droiture et ta bonne humeur font de chaque rencontre un bon moment. Très bel anniversaire à toi.",
  },
  {
    id: "ouverture-4",
    authorName: "Ceux qui t'aiment",
    relationship: "De tout cœur",
    body:
      "Tu as semé tant de belles choses autour de toi. Que cette journée te revienne en chaleur, en rires et en tendresse. Joyeux anniversaire.",
  },
  {
    id: "ouverture-5",
    authorName: "Un ami de la famille",
    relationship: "Avec affection",
    body:
      "Ton sourire et ta sagesse rendent le monde plus doux. Toute la famille te souhaite une merveilleuse journée et une année pleine de bonheur.",
  },
  {
    id: "ouverture-6",
    authorName: "Tes proches",
    relationship: "Ensemble, pour toi",
    body:
      "Papa, tu es le repère qui rassemble. Que cette nouvelle année t'apporte la santé, la paix et tout l'amour que tu as donné autour de toi.",
  },
];
