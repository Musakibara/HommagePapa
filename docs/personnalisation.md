# Guide de personnalisation

Ce guide complète le [README](../README.md). Il donne une **checklist** pour
passer du contenu de démonstration à un site réel, puis quelques recettes
courantes.

> Rappel : tout le contenu éditorial vit dans `src/content/`. Ces fichiers sont
> validés par Zod au démarrage — en cas d'erreur, le build indique le **champ
> fautif**.

---

## Checklist « mise en ligne »

- [ ] **Identité** (`src/content/site.ts`)
  - [ ] `father.firstName`, `father.fullName`, `father.epithet`
  - [ ] `father.age` / `father.birthYear` (ou `null`)
  - [ ] `siteName`, `siteTagline`, `description`
- [ ] **Date** — `celebrationDateTime` + `celebrationLabel` + `timeZone`
- [ ] **Textes** — héros, intro de chaque section, lettre, finale, pied de page
- [ ] **Histoire** (`timeline.ts`) — remplacer les étapes et passer `isDemo` à `false`
- [ ] **Qualités** (`qualities.ts`) — idem
- [ ] **Album** (`gallery.ts`) — déposer les images dans `public/images/`, renseigner
      `src`/`alt` et la `category`
- [ ] **Vidéo** — `video.enabled` + `youtubeId` **ou** `fileSrc` (avec consentement)
- [ ] **Musique** — `music.enabled` + `src` (jamais de lecture automatique)
- [ ] **`showDemoContent: false`** dans `site.ts`
- [ ] **URL publique** — `.env.local` avec `NEXT_PUBLIC_SITE_URL` (voir `.env.example`).
      Aucune clé secrète n'est requise : le site est 100 % frontend.
- [ ] **Vérifications** — `npm run lint`, `npm run typecheck`, `npm run build`

---

## Recettes

### Ajouter une photo dans l'album

1. Copiez le fichier dans `public/images/`, par ex. `public/images/noel-1998.jpg`.
2. Ajoutez une entrée dans `src/content/gallery.ts` :

```ts
{
  id: "noel-1998",
  image: { src: "/images/noel-1998.jpg", alt: "Noël 1998", caption: "Le Noël des rires" },
  category: "celebrations", // id défini dans site.gallery.categories
  year: "1998",
  isDemo: false,
}
```

### Créer une nouvelle catégorie d'album

Ajoutez un objet `{ id, label }` dans `site.gallery.categories` **avant** de
l'utiliser dans `gallery.ts` :

```ts
categories: [
  // …
  { id: "travail", label: "Sa carrière" },
],
```

### Masquer le compte à rebours

Dans `src/content/site.ts` :

```ts
celebrationDateTime: null,
```

### Masquer entièrement une scène

```ts
sections: { video: false, /* … */ },
```

La navigation (header) s'adapte automatiquement aux ancres restantes.

### Changer la palette

Dans `src/app/globals.css`, bloc `@theme` : modifiez les variables de couleur
(`--color-void`, `--color-night`, `--color-gold`, `--color-ember`…). Les
utilitaires Tailwind (`bg-night`, `text-gold`…) en découlent automatiquement.

### Adoucir ou renforcer le verre

Les utilitaires `glass` / `glass-card` sont définis dans `globals.css`. Ajustez
`opacité + blur + bordure` et les variables `--glass-*` selon vos goûts.

### Changer l'email/les liens du pied de page

Dans `site.footer` (`src/content/site.ts`) : `tagline`, liens d'ancrage et lien
de partage.

### Passer en police différente

Toujours via `next/font` dans `src/app/layout.tsx`, puis exposez la variable CSS
utilisée par `@theme` dans `globals.css` (`--font-sans`, `--font-serif`).

### Vider le livre d'or local (test)

La démo du bas de page de la section « Livre d'or » et le formulaire écrivent
dans le `localStorage` du navigateur. Pour un état vierge :

1. Console du navigateur : `localStorage.removeItem("hp:guestbook")`, puis
   rechargez la page.

---

## Où modifier quoi ?

| Je veux… | Fichier |
| --- | --- |
| Changer un texte visible | `src/content/site.ts` (+ `timeline.ts`, `qualities.ts`, `gallery.ts`, `demo-messages.ts`) |
| Changer une couleur / police / le verre | `src/app/globals.css`, `src/app/layout.tsx` |
| Changer une règle de formulaire du livre d'or | `src/lib/guestbook.ts` (schéma `guestbookSchema`) |
| Changer les confettis ou le fond animé | `src/components/fx/` |
| Brancher un vrai backend multi-visiteurs (loin du format gratuit) | réécrire `src/lib/guestbook.ts` — le reste du mur est agnostique |
| Changer les en-têtes de sécurité | `next.config.ts` |
| Changer le référencement | `src/app/robots.ts`, `src/app/sitemap.ts`, métadonnées dans `layout.tsx` |