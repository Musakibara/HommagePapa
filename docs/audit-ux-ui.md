# Audit UX/UI — Hommage à Papa

Analyse experte du site, à traiter **point par point**. Chaque entrée est
actionnable : constat, preuve dans le code, correction proposée.

> **Statut** : appliqué le 31 octobre 2026. Les 17 points sont traités ; les
> garde-fous de diffusion restent pilotés par `site.showDemoContent`.

Légende des priorités :

- 🔴 **P0 — Bloquant** : casse le sens du produit ou une fonctionnalité. À faire d'abord.
- 🟠 **P1 — Impact fort** : dégrade nettement l'expérience. À faire ensuite.
- 🟡 **P2 — Finition** : dette, copies, micro-détails.

---

## Résumé

Direction artistique **excellente et cohérente** (nuit + or champagne + braise,
Playfair/Inter, verre) et **hygiène technique rare** (respect systématique de
`prefers-reduced-motion`, piège de focus, contenu lisible sans JavaScript).

Trois défauts touchent le **sens même du projet** : le livre d'or ne partage rien,
le partage social n'a pas d'image, et la section vidéo est bloquée par la CSP. Le
reste relève de la finition.

---

## 🔴 P0 — Bloquants

### [x] 1. Le livre d'or ne livre rien à personne

- **Constat** : `Guestbook` écrit dans `localStorage`. Or la copie promet un mur
  collectif (« Ce que tes proches ont à te dire », nav « Le livre d'or »,
  README « lettre collective »).
- **Risque** : un proche croit que son message atteindra Papa ; il ne reste que
  dans son propre navigateur. La nuance (« sur cet appareil »,
  `moderationNotice`) arrive trop tard et trop discrètement.
- **Preuve** : `src/lib/guestbook.ts`, `src/components/messages/guestbook.tsx`,
  `src/content/site.ts` (`messages.*`).
- **Options (par ordre de préférence)** :
  1. Brancher un vrai canal : Formspree / Formspark / Netlify Forms (le site
     reste statique, seul le POST part ailleurs).
  2. À défaut : `mailto:` pré-rempli (« Envoyer à la famille ») + garder le mur
     local comme brouillon.
  3. Sinon : réécrire franchement la promesse (« Votre mot s'affiche ici, sur
     votre écran »), nav incluse.

### [x] 2. Aucune image de partage (`og:image`)

- **Constat** : `twitter.card: summary_large_image` est déclaré mais aucun
  `openGraph.images` / `twitter.images`.
- **Risque** : le canal réel de diffusion est WhatsApp/Facebook famille → lien
  nu, gris, sans aperçu.
- **Preuve** : `src/app/layout.tsx` (`metadata`).
- **Correction** : image **1200×630** (portrait + titre + or), dans
  `public/images/`, référencée dans `metadata.openGraph.images` et
  `metadata.twitter.images`, avec `width`/`height`/`alt`.

### [x] 3. La vidéo sera bloquée par la CSP

- **Constat** : `default-src 'self'` sans `frame-src`, alors que la section
  vidéo injecte une `<iframe>` `youtube-nocookie.com`.
- **Risque** : iframe vide à l'écran dès que `video.enabled` passe à `true`.
- **Preuve** : `public/_headers` (CSP), `src/components/home/video-homage.tsx`.
- **Correction** : ajouter `frame-src https://www.youtube-nocookie.com;` à la CSP.

---

## 🟠 P1 — Impact fort

### [x] 4. Intro plein écran ~3,3 s, sans affordance de saut

- **Constat** : `HOLD_MS 2350` + `EXIT_MS 950`. Skippable au clic/Échap, mais rien
  ne l'indique visuellement.
- **Risque** : sur mobile, attente subie ou impression de site figé.
- **Preuve** : `src/components/fx/entrance-overlay.tsx`.
- **Correction** : descendre à ~1,6–1,9 s et afficher un discret « Passer »
  visible en bas de l'overlay.

### [x] 5. La galerie « semble cassée » avant d'avoir les photos

- **Constat** : `gallery.ts` livre 6 items avec `src: null` → 6 tuiles en
  pointillés identiques. `site.gallery.emptyTitle` / `emptyBody` sont **définis
  mais jamais rendus** (aucun état vide réel).
- **Preuve** : `src/components/media/gallery-grid.tsx`, `src/content/site.ts`
  (`gallery.empty*`).
- **Correction** : un **état vide unique** et soigné (titre + corps + CTA),
  masquer/regrouper les placeholders plutôt que les aligner.

### [x] 6. La lightbox ne se ferme pas au clic à côté de l'image

- **Constat** : la zone `flex-1` autour de la photo fait `stopPropagation` et
  couvre tout → seuls ✕ et Échap ferment.
- **Risque** : le réflexe « clic sur le fond = fermer » échoue.
- **Preuve** : `src/components/media/gallery-grid.tsx` (conteneurs avec
  `onClick={(event) => event.stopPropagation()}`).
- **Correction** : laisser remonter le clic sur le fond sombre (garder le
  `stopPropagation` uniquement sur l'image et les contrôles).

### [x] 7. Densité mobile et performance GPU

- **Constats** :
  - `ScrollCue` en `hidden sm:flex` : aucune indication « faites défiler » sur
    téléphone, là où elle sert le plus.
  - Fond **fixe** : 4 halos `blur(130–150px)` animés + 11 braises, sous de
    nombreux panneaux `backdrop-filter: blur(18–22px)`.
  - Page longue, révélée élément par élément via `Reveal`.
- **Risque** : chauffe / saccades sur Android d'entrée de gamme.
- **Preuve** : `src/components/fx/backdrop.tsx`, `src/components/home/scroll-cue.tsx`,
  `src/app/globals.css` (utilitaires `glass`).
- **Corrections** : halos statiques (ou une seule couche animée) sur mobile,
  afficher le `ScrollCue` dès le mobile, envisager `content-visibility: auto`
  sur les sections.

### [x] 8. Contenu « démo » visible tel quel

- **Constat** : `showDemoContent: true`, timeline générique, messages factices →
  on lit « Démo — à remplacer » et des portraits vides.
- **Preuve** : `src/content/site.ts`, `src/content/timeline.ts`,
  `src/content/opening-messages.ts`.
- **Correction** : garde-fou avant diffusion (bandeau de build ou
  `showDemoContent: false` par défaut) pour ne jamais montrer ça à la famille.

---

## 🟡 P2 — Finitions / dette

### [x] 9. Config morte (déclarée, jamais consommée)

- **Champs** : `hero.variant` ("fullscreen"/"editorial"), `father.fullName`,
  `father.birthYear`, `father.epithet`, `gallery.emptyTitle`/`emptyBody`.
- **Constat** : définis et validés par Zod, mais **aucun composant** ne les
  affiche (`hero.tsx` rend toujours la mise en page éditoriale).
- **Correction** : soit les brancher, soit les retirer du schéma et du contenu.
- **Preuve** : `src/content/schema.ts`, `src/content/site.ts`, `src/components/home/hero.tsx`.

### [x] 10. Copie — « Rendez-vous en Africa/Douala »

- **Preuve** : `src/app/page.tsx` (`site.timeZone.replace("_", " ")`).
- **Correction** : afficher un libellé humain (« au Cameroun », « heure de Douala »).

### [x] 11. Champs requis non programmatiques

- **Constat** : l'astérisque est `aria-hidden`, aucun `required`/`aria-required`
  n'est posé.
- **Preuve** : `src/components/ui/field.tsx`, `src/components/messages/message-form.tsx`.
- **Correction** : poser `required` (ou `aria-required`) et une légende
  « * champs obligatoires ».

### [x] 12. Contrastes à vérifier

- **Constats** : `mist-soft (#85827b)` en `text-xs` sur panneaux de verre ;
  `text-shine` force `color: transparent`.
- **Corrections** : contrôler le contraste sur le rendu réel ; prévoir un
  fallback `@media (forced-colors: active)` pour `text-shine`.
- **Preuve** : `src/app/globals.css`, `src/components/ui/field.tsx`,
  `src/components/layout/site-footer.tsx`.

### [x] 13. `text-shine` animé en boucle sur le H1

- **Constat** : shimmer infini (8 s) sur l'élément le plus important de la page.
- **Correction** : le réserver aux accents (monogramme, citation, finale) ou le figer.
- **Preuve** : `src/components/home/hero.tsx`, `src/app/globals.css`.

### [x] 14. Lightbox — annonces et label

- **Constat** : compteur « 1 / 6 » non annoncé (`aria-live`), `role=dialog` sans
  label reliant le texte.
- **Preuve** : `src/components/media/gallery-grid.tsx`.

### [x] 15. Bouton flottant « Célébrer » omniprésent

- **Constat** : présent de bout en bout, y compris par-dessus la lettre et la
  finale (moments d'émotion).
- **Correction** : le rendre contextuel ou l'atténuer sur ces sections.
- **Preuve** : `src/components/fx/celebrate-button.tsx`.

### [x] 16. Navigation — redondance et manques

- **Constat** : « Le livre d'or » (#messages) et « Lui écrire »
  (#laisser-un-message) mènent à la même zone ; « La lettre » n'est présente
  qu'en pied de page.
- **Preuve** : `src/content/site.ts` (`nav`, `footer.links`).

### [x] 17. Intro et focus clavier

- **Constat** : pendant l'overlay (`aria-hidden`, `pointer-events` captés), un
  `Tab` peut atteindre le contenu situé dessous.
- **Correction** : piéger brièvement le focus pendant l'intro.
- **Preuve** : `src/components/fx/entrance-overlay.tsx`.

---

## Priorités si on devait trancher

1. Brancher un **vrai canal de collecte** des messages (ou réécrire la promesse). — [P0-1]
2. **`og:image`** + **`frame-src`** : deux lignes pour débloquer partage et vidéo. — [P0-2, P0-3]
3. **Raccourcir l'intro + bouton « Passer »**. — [P1-4]
4. **État vide de la galerie** + **fermeture de la lightbox au clic extérieur**. — [P1-5, P1-6]
5. **Passe de perf mobile** (halos, `backdrop-filter`, `content-visibility`). — [P1-7]
6. **Nettoyage de la config morte** et micro-copies. — [P2-9 → P2-17]

---

## Suivi

| # | Priorité | Sujet | Statut | Date |
| - | -------- | ----- | ------ | ---- |
| 1 | 🔴 P0 | Livre d'or — vrai canal de collecte | Fait | 2026-10-31 |
| 2 | 🔴 P0 | `og:image` / partage social | Fait | 2026-10-31 |
| 3 | 🔴 P0 | CSP — `frame-src` YouTube | Fait | 2026-10-31 |
| 4 | 🟠 P1 | Intro — durée + bouton « Passer » | Fait | 2026-10-31 |
| 5 | 🟠 P1 | Galerie — état vide réel | Fait | 2026-10-31 |
| 6 | 🟠 P1 | Lightbox — fermeture au clic extérieur | Fait | 2026-10-31 |
| 7 | 🟠 P1 | Densité mobile + perf GPU | Fait | 2026-10-31 |
| 8 | 🟠 P1 | Contenu démo — garde-fou | Fait | 2026-10-31 |
| 9 | 🟡 P2 | Config morte | Fait | 2026-10-31 |
| 10 | 🟡 P2 | Copie « Africa/Douala » | Fait | 2026-10-31 |
| 11 | 🟡 P2 | Champs requis programmatiques | Fait | 2026-10-31 |
| 12 | 🟡 P2 | Contrastes | Fait | 2026-10-31 |
| 13 | 🟡 P2 | `text-shine` sur le H1 | Fait | 2026-10-31 |
| 14 | 🟡 P2 | Lightbox — annonces / label | Fait | 2026-10-31 |
| 15 | 🟡 P2 | Bouton « Célébrer » omniprésent | Fait | 2026-10-31 |
| 16 | 🟡 P2 | Navigation — redondance | Fait | 2026-10-31 |
| 17 | 🟡 P2 | Intro — focus clavier | Fait | 2026-10-31 |

---

## Note de fond

Esthétiquement, c'est réussi et nettement au-dessus de l'« hommage DIY » habituel.
La technique est propre. Ce qui pèche, c'est le **contrat implicite avec le
visiteur** : on lui promet un mur collectif et un partage qui claque, et on ne les
tient pas encore.

> Ce fichier est un **plan de travail**. Le garder à jour au fil des correctifs :
> cocher les cases et mettre à jour le tableau « Suivi ».

---

## Journal des correctifs — 31 octobre 2026

- **P0-1 — Livre d'or** : la promesse est réécrite (« sur cet appareil ») et le
  message peut être envoyé à la famille via WhatsApp ou copié en un clic.
  `addGuestbookEntry` retourne désormais `null` en cas d'échec de stockage, avec
  un message d'erreur visible.
- **P0-2 — Partage** : `og-hommage.jpg` (1200×630) déclarée en Open Graph et
  Twitter, `metadataBase` déduite de `NEXT_PUBLIC_SITE_URL` / `URL` /
  `DEPLOY_PRIME_URL`.
- **P0-3 — CSP** : `frame-src https://www.youtube-nocookie.com` ajouté, plus
  cache long des assets et en-têtes de sécurité complémentaires.
- **P1-4 — Intro** : 1,8 s d'attente (au lieu de 2,35 s) et bouton « Passer
  l'introduction » visible.
- **P1-5 — Galerie** : état vide réel (titre + corps) et masquage des tuiles sans
  image ; les filtres ne listent plus les catégories vides.
- **P1-6 — Lightbox** : clic sur le fond = fermeture ; l'image et les contrôles
  gardent leur propre comportement.
- **P1-7 — Mobile** : `ScrollCue` visible dès le mobile, halos figés et allégés,
  braises réduites, flous de verre atténués. `content-visibility` a été écarté :
  il casserait la lightbox `position: fixed`.
- **P1-8 — Démo** : bandeau « Aperçu » affiché tant que `showDemoContent` est
  `true` ; il reste nécessaire tant que la frise, les qualités et les messages
  d'exemple sont marqués « démo ».
- **P2-9 — Config morte** : `birthYear`, `epithet` et `fullName` sont désormais
  rendus ; `hero.variant` (jamais consommé) a été retiré du schéma.
- **P2-10 → P2-17** : copie « heure de Douala », champs requis, contraste de
  `mist-soft`, dégradé figé sur le H1, compteur de lightbox annoncé, bouton
  « Célébrer » contextuel, navigation dédupliquée, focus piégé pendant l'intro.
- **Hors audit — contenus & build hors-ligne** : identité Jean Paul (JPS),
  portrait du héros, finale et 22 photographies réelles intégrés ; polices
  Playfair Display / Inter auto-hébergées dans `src/app/fonts/` via
  `next/font/local`, le build ne dépend plus d'un accès à Google Fonts.
