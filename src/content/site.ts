import type { SiteConfigInput } from "./schema";

/* ==========================================================================
   RÉGLAGES PRINCIPAUX DU SITE
   --------------------------------------------------------------------------
   C'est ici que vous personnalisez le plus de choses :
   - le prénom, l'âge et la biographie de votre papa ;
   - la date de l'anniversaire et le fuseau horaire ;
   - les textes de chaque section ;
   - les images (placez vos fichiers dans `public/images/`).
   ========================================================================== */

export const siteConfig = {
  siteName: "Hommage à Papa",
  siteTagline: "Une célébration de la vie",
  description:
    "Un album numérique et une lettre collective pour célébrer l'anniversaire de Jean Paul, raconter son histoire et lui dire merci.",

  locale: "fr-FR",
  // Fuseau horaire utilisé pour interpréter la date ci-dessous et afficher les dates.
  timeZone: "Africa/Douala",

  // ⚠️  À remplacer par la vraie date. Format local « AAAA-MM-JJTHH:MM:SS ».
  // Mettre `null` pour masquer le compte à rebours.
  celebrationDateTime: "2026-11-12T00:00:00",
  celebrationLabel: "12 novembre 2026",

  // Affiche les contenus explicitement marqués « démonstration » (bandeau
  // « Aperçu » et badges « démo »). Désactivé : le site est prêt à être publié.
  showDemoContent: false,

  father: {
    // Prénom affiché dans les titres. Remplacez par son vrai prénom.
    firstName: "Jean Paul",
    fullName: "Moupefo Jean Paul",
    // Âge célébré : mettez un nombre (ex. 70) pour l'afficher. `null` = masqué.
    age: null,
    // Année de naissance : ex. 1956. `null` = masqué.
    birthYear: null,
    // Surnoms affectueux, affichés près de son prénom.
    nicknames: ["JPS", "69"],
    // Lettre du monogramme dans le grand cadre du héros (initiale de « Moupefo »).
    monogram: "M",
    epithet: "L'homme qu'on appelle JPS",
  },

  // Activez / désactivez chaque section de la page d'accueil.
  sections: {
    countdown: true,
    story: true,
    qualities: true,
    gallery: true,
    messages: true,
    letter: true,
    video: true,
    finale: true,
  },

  nav: [
    { label: "Son histoire", href: "#histoire" },
    { label: "L'album", href: "#souvenirs" },
    { label: "La lettre", href: "#hommage" },
    { label: "Lui écrire", href: "#laisser-un-message" },
  ],

  hero: {
    eyebrow: "Une célébration de la vie",
    title: "À l'homme qui nous a tant donné",
    subtitle:
      "Quelques pages pour te dire merci : pour tes sacrifices discrets, tes conseils patients et l'amour que tu n'as jamais cessé de nous offrir.",
    image: {
      src: "/images/Hero.jpg",
      alt: "Portrait de Jean Paul",
      focal: "center",
      // Photo verticale 2:3 : cadre d'affichage identique à la source.
      ratio: "photo",
    },
    primaryCta: { label: "Découvrir son histoire", href: "#histoire" },
    secondaryCta: { label: "Lui laisser un message", href: "#laisser-un-message" },
    scrollCue: "Faites défiler",
  },

  story: {
    eyebrow: "Son histoire",
    title: "Une vie, mille raisons d'être fier",
    intro:
      "Des premières années aux jours d'aujourd'hui, voici quelques repères d'une vie menée avec droiture. Chaque étape raconte un peu de l'homme que nous aimons.",
  },

  qualities: {
    eyebrow: "Ce qui le rend unique",
    title: "Les mille facettes d'un même amour",
    intro:
      "Chaque qualité est un morceau de lui. Voici celles que nous avons voulu mettre en lumière, avec nos propres mots.",
  },

  gallery: {
    eyebrow: "Album de famille",
    title: "Souvenirs en images",
    intro:
      "Quelques instants choisis, à travers les années. Les photographies de famille sont réunies ici, à leur juste place.",
    emptyTitle: "L'album attend vos images",
    emptyBody:
      "Ajoutez vos photographies dans public/images/ puis référencez-les dans src/content/gallery.ts.",
    categories: [
      { id: "famille", label: "Famille" },
      { id: "jeunesse", label: "Jeunesse" },
      { id: "moments", label: "Moments mémorables" },
      { id: "voyages", label: "Voyages" },
      { id: "celebrations", label: "Célébrations" },
    ],
  },

  messages: {
    eyebrow: "Livre d'or",
    title: "Les mots du cœur",
    intro:
      "Laissez un mot à Papa : un souvenir, un merci, une pensée. Il s'affiche ici, sur votre appareil, et vous pouvez le transmettre à la famille en un clic.",
    wallTitle: "Vos mots pour Papa",
    emptyTitle: "Aucun message pour l'instant",
    emptyBody: "Soyez la première personne à lui écrire quelques mots.",
    formTitle: "Laisse-lui un message",
    formIntro:
      "Quelques lignes suffisent. Dites-lui ce que vous avez sur le cœur : un souvenir, un merci, ou simplement ce que sa présence a changé pour vous.",
    consentLabel: "J'accepte que ce message soit enregistré sur cet appareil.",
    moderationNotice:
      "Votre message reste sur cet appareil. Pour qu'il arrive à Papa, envoyez-le à la famille avec WhatsApp ou copiez-le.",
    successTitle: "Merci du fond du cœur",
    wallNotice:
      "Quelques mots déjà déposés pour lui, par celles et ceux qui l'aiment. Ajoutez le vôtre : il apparaîtra ici, sur cet appareil.",
    pageSize: 12,
  },

  letter: {
    eyebrow: "Lettre à papa",
    title: "Si nous devions te dire une seule chose…",
    // Texte de démonstration, générique et non attribué à une personne réelle.
    paragraphs: [
      "Papa, si nous devions te dire une seule chose, ce serait peut-être simplement : merci. Merci d'avoir été là, sans bruit, avec cette constance qui rassure et qui construit.",
      "Tu nous as appris que la valeur d'une vie ne se mesure pas à ce qu'elle accumule, mais à ce qu'elle donne. Et tu as donné, encore et encore, souvent sans rien attendre en retour.",
      "Aujourd'hui, nous voulons te rendre un peu de cette chaleur. Que cette page soit un endroit où l'on puisse te redire, à plusieurs voix, à quel point tu comptes pour nous.",
      "Joyeux anniversaire, Jean Paul. Nous t'aimons.",
    ],
    signature: "Avec tout notre amour, ta famille",
    revealLabel: "Lire la lettre",
    collapseLabel: "Replier",
  },

  video: {
    // Passez à `true` et renseignez `youtubeId` ou `fileSrc` pour l'afficher.
    enabled: false,
    youtubeId: null, // ex. "dQw4w9WgXcQ"
    fileSrc: null, // ex. "/videos/hommage.mp4"
    title: "Un hommage en images",
    description:
      "Un montage de souvenirs, à regarder ensemble. La vidéo ne se charge qu'après un clic.",
    privacyNote:
      "Vérifiez que toutes les personnes filmées consentent à cette diffusion avant de publier la vidéo.",
  },

  music: {
    // La musique ne démarre jamais automatiquement. Passez à `true` et
    // renseignez un fichier audio dans public/ pour l'activer.
    enabled: false,
    src: null, // ex. "/audio/ambiance.mp3"
    title: "Ambiance musicale",
    volume: 0.35,
  },

  finale: {
    title: "La plus belle chose que tu nous aies transmise, c'est l'amour.",
    message:
      "Merci pour tout, Jean Paul. Que cette journée te ressemble : chaleureuse, généreuse et pleine de ceux qui t'aiment.",
    image: {
      src: "/images/IMG-20261025-WA0020.jpg",
      alt: "Jean Paul entouré des siens",
      focal: "center",
      ratio: "tall",
    },
    primaryCta: { label: "Lui écrire un mot", href: "#laisser-un-message" },
    secondaryCta: { label: "Revoir l'album", href: "#souvenirs" },
  },

  footer: {
    phrase: "Avec tout notre amour, pour toi.",
    familyNote: "Réalisé en famille, à plusieurs mains et à plusieurs cœurs.",
    links: [
      { label: "Son histoire", href: "#histoire" },
      { label: "L'album", href: "#souvenirs" },
      { label: "Le livre d'or", href: "#messages" },
      { label: "La lettre", href: "#hommage" },
    ],
    credit: "Hommage à Papa",
  },
} satisfies SiteConfigInput;
