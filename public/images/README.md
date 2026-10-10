# Images

Déposez ici les photographies du site (portraits, souvenirs, couverture…).

## Comment les utiliser

1. Copiez vos fichiers dans ce dossier, par exemple `papa-portrait.jpg`.
2. Référencez-les depuis le contenu :

   ```ts
   // src/content/site.ts
   image: { src: "/images/papa-portrait.jpg", alt: "Portrait de papa", focal: "center" }
   ```

   ```ts
   // src/content/gallery.ts
   image: { src: "/images/mariage.jpg", alt: "Nos grands-parents", caption: "Le jour de leur mariage" }
   ```

## Conseils

- Format paysage (…) pour les bannières, portrait pour la galerie.
- Fournissez des images assez grandes (au moins 1600 px de large) : Next.js les
  optimise et génère les formats modernes (AVIF/WebP) automatiquement.
- Tant qu'aucun fichier n'est renseigné, un cadre de remplacement élégant est
  affiché à la place — aucune photographie fictive n'est utilisée.
