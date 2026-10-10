/* ==========================================================================
   MESSAGES DE DÉMONSTRATION
   --------------------------------------------------------------------------
   ⚠️  Exemples illustratifs, volontairement anonymes. Ils ne sont PAS de vrais
   témoignages et ne sont affichés que si :
     - il n'y a aucun message publié en base, ET
     - `site.showDemoContent` vaut `true`.
   Ils portent tous une étiquette « démo » à l'écran. Supprimez ce fichier (ou
   passez `showDemoContent` à `false`) pour les masquer définitivement.
   ========================================================================== */

export interface DemoMessage {
  id: string;
  authorName: string;
  relationship: string | null;
  body: string;
}

export const demoMessages: DemoMessage[] = [
  {
    id: "demo-1",
    authorName: "Camille",
    relationship: "Un proche",
    body:
      "Exemple de message : merci pour tous ces moments partagés et pour ta bienveillance de chaque instant. Joyeux anniversaire !",
  },
  {
    id: "demo-2",
    authorName: "Un ami de la famille",
    relationship: null,
    body:
      "Exemple de message : ton sourire et ta bonne humeur rendent chaque rencontre plus douce. Très belle journée à toi.",
  },
  {
    id: "demo-3",
    authorName: "Léa",
    relationship: "Petite-fille (exemple)",
    body:
      "Exemple de message : les histoires que tu racontes sont mes préférées. Merci d'être toujours là pour nous.",
  },
];
