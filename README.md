# Hommage à Papa

Un site hommage **immersif et émouvant** pour célébrer l'anniversaire d'un père :
récit éditorial, compte à rebours, album de souvenirs, lettre collective et mur
de messages — le tout dans une esthétique **sombre et raffinée** : verre
(glassmorphism), or champagne et braise, animations de célébration.

> Le projet est **100 % frontend** : aucune base de données, aucune API, aucun
> compte à créer. Seule variable utile : `NEXT_PUBLIC_SITE_URL`.

Le contenu est livré en **démonstration, explicitement marqué « démo »** : aucun
fait biographique, aucune photographie et aucun témoignage réel ne sont
inventés. Tout se personnalise dans `src/content/` et `public/images/`.

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Structure du projet](#structure-du-projet)
- [Personnaliser le contenu](#personnaliser-le-contenu)
- [Livre d'or (100 % local)](#livre-dor-100--local)
- [Célébration & animations](#célébration--animations)
- [Variables d'environnement](#variables-denvironnement)
- [Sécurité & vie privée](#sécurité--vie-privée)
- [Accessibilité](#accessibilité)
- [Performance](#performance)
- [Déploiement](#déploiement)
- [Scripts](#scripts)
- [Limitations connues](#limitations-connues)

---

## Aperçu

Une **unique page immersive** qui se déroule comme un film :

| Section | Contenu |
| --- | --- |
| **Héros** | Plein écran, halo qui suit le curseur, titre en dégradé or→braise, portrait dans un cadre de verre à anneau lumineux. |
| **Compte à rebours** | Jours / heures / minutes / secondes, cartes de verre, sensible au fuseau horaire. |
| **Son histoire** | Frise lumineuse, cartes de verre révélées au défilement. |
| **Ce qui le rend unique** | Citation vedette + grille de cartes de verre avec numéros filaires dorés. |
| **Album de souvenirs** | Galerie filtrable avec visionneuse plein écran (clavier, focus piégé). |
| **Livre d'or** | Mur de messages + formulaire qui ajoute le message **localement** (confettis à l'envoi). |
| **Lettre centrale** | Panneau de verre avec révélation (`<details>`, lisible sans JavaScript). |
| **Hommage vidéo** *(facultatif)* | Ne se charge qu'après un clic, `youtube-nocookie`. |
| **Finale** | Grand panneau de verre, bouton « Joyeux anniversaire ! » qui lance une salve de confettis. |

En complément : barre de progression du défilement, bouton flottant « Célébrer »,
menu de navigation collant en verre, musique d'ambiance (jamais automatique),
partage par lien.

---

## Stack technique

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** en mode strict
- **Tailwind CSS v4** (thème sombre défini dans `src/app/globals.css`)
- **Framer Motion** (révélations, micro-animations — respect de `prefers-reduced-motion`)
- **Lucide React** (icônes)
- **Zod** + **React Hook Form** (validation du formulaire, entièrement côté client)
- **Canvas natif** pour les confettis (aucune dépendance)
- `localStorage` pour le livre d'or

**Aucun backend.** Aucune dépendance serveur de données.

---

## Démarrage rapide

Prérequis : **Node.js ≥ 20.9**.

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Vérification de production :

```bash
npm run build
npm run start   # sert le dossier statique `out/` sur http://localhost:3000
```

> Le site fonctionne sans aucune variable d'environnement.

---

## Structure du projet

```
.
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # déco de fond, confettis, navigation, footer
│  │  ├─ page.tsx                # l'unique page (toutes les scènes)
│  │  ├─ globals.css             # ⬅️ design system (couleurs, verre, animations)
│  │  ├─ not-found.tsx
│  │  ├─ robots.ts / sitemap.ts
│  │  └─ icon.svg
│  ├─ components/
│  │  ├─ fx/                     # effets : aurore+braises, confettis, halo,
│  │  │                          #   progression, boutons de célébration
│  │  ├─ home/                   # hero, countdown, timeline, qualities,
│  │  │                          #   letter, video, finale, scroll-cue
│  │  ├─ messages/               # livre d'or : wall, carte, formulaire
│  │  ├─ media/                  # cadre média + galerie/visionneuse
│  │  ├─ layout/                 # header, footer, partage, musique
│  │  └─ ui/                     # primitives (bouton, carte, champ…)
│  ├─ content/                   # ⬅️ TOUT le contenu éditorial
│  │  ├─ site.ts                 # réglages + textes (voir plus bas)
│  │  ├─ timeline.ts             # frise « Son histoire »
│  │  ├─ qualities.ts            # « Ce qui le rend unique »
│  │  ├─ gallery.ts              # album
│  │  ├─ demo-messages.ts        # messages d'exemple (marqués « démo »)
│  │  ├─ schema.ts               # schémas Zod de validation du contenu
│  │  └─ index.ts
│  └─ lib/
│     ├─ guestbook.ts            # livre d'or localStorage (+ revue Zod)
│     ├─ celebrate.ts            # bus d'événements « célébration »
│     ├─ datetime.ts             # compte à rebours / dates (fuseau)
│     └─ utils.ts
├─ public/
│  └─ images/                    # ⬅️ vos photographies (+ README dédié)
└─ docs/                         # guide de personnalisation
```

---

## Personnaliser le contenu

**Tout le contenu vit dans `src/content/`**, validé au démarrage par des schémas
Zod (`src/content/schema.ts`) : un champ manquant ou mal formé fait échouer le
build avec le champ fautif signalé.

### 1. Le portrait, la date et les textes — `src/content/site.ts`

```ts
father: {
  firstName: "Papa",          // prénom dans les titres et le héros
  fullName: "Notre papa",
  age: null,                  // ex. 70 pour l'afficher
  birthYear: null,
  epithet: "L'homme qui nous a tant donné",
},

celebrationDateTime: "2026-12-05T19:00:00", // la date de la fête
celebrationLabel: "5 décembre 2026",
timeZone: "Europe/Paris",                   // fuseau du compte à rebours
showDemoContent: true,                      // false une fois vos vrais contenus en place
```

Chaque scène (`hero`, `story`, `qualities`, `gallery`, `messages`, `letter`,
`video`, `music`, `finale`, `footer`) expose ses propres textes, à éditer
directement.

### 2. La frise — `src/content/timeline.ts`

```ts
export const timeline = [
  {
    id: "enfance",
    period: "1956 – 1974",
    title: "Les premières années",
    story: "Quelques lignes…",
    image: { src: "/images/enfance.jpg", alt: "…" }, // facultatif
    isDemo: true, // → false une fois le vrai contenu en place
  },
];
```

### 3. « Ce qui le rend unique » — `src/content/qualities.ts`

Chaque qualité : `title`, `narrative`, `quote` (facultatif), `isDemo`.

### 4. L'album — `src/content/gallery.ts`

```ts
export const gallery = [
  {
    id: "mariage",
    image: { src: "/images/mariage.jpg", alt: "…", caption: "…" },
    category: "famille", // doit correspondre à un id de site.gallery.categories
    year: "1978",
    isDemo: false,
  },
];
```

### 5. Les images

Déposez vos fichiers dans `public/images/` puis référencez-les en `/images/…`.
Détails dans `public/images/README.md`. Tant que `src` vaut `null`, un **cadre de
remplacement** élégant s'affiche — jamais d'image inventée.

### 6. La lettre, la vidéo, la musique

- `site.letter` : paragraphes + signature de la lettre centrale.
- `site.video` : `enabled` + `youtubeId` **ou** `fileSrc`. Rien n'est chargé avant
  le clic.
- `site.music` : `enabled` + `src`. La musique ne démarre **jamais** seule.

### 7. Masquer des scènes

```ts
sections: {
  countdown: true, story: true, qualities: true, gallery: true,
  messages: true, letter: true, video: true, finale: true,
},
```

---

## Livre d'or (100 % local)

- Les messages ajoutés sont enregistrés dans le **`localStorage` du navigateur**
  du visiteur et s'affichent aussitôt sur le mur, avec une salve de confettis.
- Aucune donnée ne quitte l'appareil : pas d'API, pas de base de données.
- Les messages de démonstration (étiquetés « démo ») restent affichés tant que
  `showDemoContent` est à `true`.
- Chaque visiteur peut retirer ses propres messages via le bouton « Retirer ».

> Ce n'est pas un livre d'or *collectif* — il ne fabrique aucune fausse promesse :
> rien n'est stocké sur un serveur.

---

## Célébration & animations

- **Aurore** : halos or / braise / rose animés en fond, grille et grain subtils,
  braises qui montent.
- **Confettis** : canvas plein écran déclenché par le bouton « Célébrer », la
  finale ou l'envoi d'un message.
- **Halos & verre** : `glass`, `glass-card`, lueurs et anneaux lumineux.
- **Texte scintillant** : titres en dégradé animé or → braise (`text-shine`).
- Tout est fondé sur CSS + Canvas et respecte `prefers-reduced-motion`.

---

## Variables d'environnement

| Variable | Requis | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | non | URL publique (métadonnées, sitemap, partage). |

Copiez `.env.example` en `.env.local` si besoin. Aucune clé n'est requise.

---

## Sécurité & vie privée

- **Aucun backend** : aucune collecte, aucun envoi, aucun cookie de suivi.
- Le livre d'or reste dans le navigateur ; l'utilisateur peut le vider.
- En-têtes de sécurité appliqués par l'hébergeur via `public/_headers` (CSP,
  `X-Frame-Options`, `Referrer-Policy`, etc.).
- La vidéo YouTube passe par le domaine `youtube-nocookie`.
- La musique n'est jamais en lecture automatique.

---

## Accessibilité

- Structure sémantique, skip-link, navigation clavier, focus visibles.
- `prefers-reduced-motion` : confettis, halos et révélations sont neutralisés.
- Messages d'erreur en français, rôles `status`/`alert`, `aria` sur la galerie.
- La lettre est lisible sans JavaScript (élément `<details>` natif).

---

## Performance

- Page entièrement **statique** (générée au build), aucune requête au serveur.
- Révélations et halos en `will-change`/`transform` uniquement.
- Images servies depuis `public/` (déjà optimisées en amont, aucun re-traitement au run).
- Polices auto-hébergées via `next/font`.

---

## Déploiement

Le site est **100 % statique** : `next build` génère un dossier `out/`
(`output: "export"`) déployable sur n'importe quel hébergeur — Netlify, Vercel,
GitHub Pages, etc. Aucun serveur, aucune fonction, aucune base de données.

### Netlify (recommandé)

1. Poussez le dépôt sur GitHub, puis **Netlify → Add new site → Import from Git**.
2. Choisissez le dépôt ; Netlify lit automatiquement `netlify.toml`
   (build : `npm run build`, publication : `out/`).
3. Déployez. En-têtes de sécurité et CSP sont appliqués via `public/_headers`
   (copié dans `out/_headers`).

### Autre hébergeur statique

Servez simplement le contenu du dossier `out/` après `npm run build`. Si la
plateforme ne lit pas `_headers`, reportez-y manuellement les en-têtes attendus.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement. |
| `npm run build` | Build de production → génère le dossier statique `out/`. |
| `npm run start` | Sert le dossier statique `out/` (prévisualisation locale). |
| `npm run lint` | Analyse ESLint. |
| `npm run lint:fix` | ESLint avec corrections automatiques. |
| `npm run typecheck` | Vérification des types (`tsc --noEmit`). |

---

## Limitations connues

- **Livre d'or local** : les messages ne sont pas partagés entre visiteurs ni
  persistés côté serveur — c'est un choix frontend assumé, indiqué dans
  l'interface.
- **Confettis & halo** : désactivés lorsque l'utilisateur demande un mouvement
  réduit (`prefers-reduced-motion`), et le halo seulement sur les appareils à
  pointeur fin.
- **Avertissement npm transitif `braces`** : provient de la chaîne ESLint
  (outils de développement uniquement), hors du bundle applicatif ; le
  corriger imposerait de rétrograder `eslint-config-next`.
- **CSP avec `'unsafe-inline'`** pour les scripts d'hydratation de Next.js
  (voir `public/_headers`).

---

## Personnalisation avancée

- **Palette, verre, animations** : `src/app/globals.css` (couleurs `@theme`,
  utilitaires `glass`, `text-shine`, keyframes).
- **Polices** : `src/app/layout.tsx` (`next/font`) puis variables CSS.
- **Effets** : `src/components/fx/` (confettis, fond, halos).
- **Guide pas-à-pas** : `docs/personnalisation.md`.

Bon anniversaire à votre papa. 💛