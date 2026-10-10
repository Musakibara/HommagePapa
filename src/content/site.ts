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
    "Un album numérique et une lettre collective pour célébrer l'anniversaire d'un père, raconter son histoire et lui dire merci.",

  locale: "fr-FR",
  // Fuseau horaire utilisé pour interpréter la date ci-dessous et afficher les dates.
  timeZone: "Europe/Paris",

  // ⚠️  À remplacer par la vraie date. Format local « AAAA-MM-JJTHH:MM:SS ».
  // Mettre `null` pour masquer le compte à rebours.
  celebrationDateTime: "2026-12-05T19:00:00",
  celebrationLabel: "5 décembre 2026",

  // Affiche les contenus explicitement marqués « démonstration ».
  // Passez à `false` une fois vos vrais contenus en place.
  showDemoContent: true,

  father: {
    // Prénom affiché dans les titres. Remplacez par son vrai prénom.
    firstName: "Papa",
    fullName: "Notre papa",
    // Âge célébré : mettez un nombre (ex. 70) pour l'afficher. `null` = masqué.
    age: null,
    // Année de naissance : ex. 1956. `null` = masqué.
    birthYear: null,
    epithet: "L'homme qui nous a tant donné",
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
    { label: "Le livre d'or", href: "#messages" },
    { label: "Lui écrire", href: "#laisser-un-message" },
  ],

  hero: {
    // « fullscreen » : photo plein écran. « editorial » : image et texte côte à côte.
    variant: "fullscreen",
    eyebrow: "Une célébration de la vie",
    title: "À l'homme qui nous a tant donné",
    subtitle:
      "Quelques pages pour te dire merci : pour tes sacrifices discrets, tes conseils patients et l'amour que tu n'as jamais cessé de nous offrir.",
    image: {
      src: null, // ex. "/images/papa-portrait.jpg"
      alt: "Portrait de papa — emplacement à remplacer par une photographie",
      focal: "center",
    },
    primaryCta: { label: "Découvrir son histoire", href: "#histoire" },
    secondaryCta: { label: "Lui laisser un message", href: "#laisser-un-message" },
    scrollCue: "Faites défiler",
  },

  story: {
    eyebrow: "Son histoire",
    title: "Une vie, mille raisons d'être fier",
    intro:
      "Des premières années aux jours d'aujourd'hui, voici quelques repères. Remplacez ces repères de démonstration par vos vrais souvenirs.",
  },

  qualities: {
    eyebrow: "Ce qui le rend unique",
    title: "Les mille facettes d'un même amour",
    intro:
      "Chaque qualité est un morceau de lui. Personnalisez ces blocs avec vos propres mots et vos propres souvenirs.",
  },

  gallery: {
    eyebrow: "Album de famille",
    title: "Souvenirs en images",
    intro:
      "Quelques instants choisis. Remplacez les cadres par vos photographies : elles vivront ici, à leur juste place.",
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
    eyebrow: "Les mots du cœur",
    title: "Ce que tes proches ont à te dire",
    intro:
      "Ils ont déposé un peu de leur cœur ici. Ajoutez le vôtre : votre message apparaît aussitôt, rien qu'à vous.",
    wallTitle: "Le livre d'or",
    emptyTitle: "Aucun message pour l'instant",
    emptyBody: "Soyez la première personne à lui écrire quelques mots.",
    formTitle: "Laisse-lui un message",
    formIntro:
      "Quelques lignes suffisent. Prenez le temps de lui dire ce que vous avez sur le cœur.",
    consentLabel: "Je souhaite afficher mon message sur le mur du livre d'or.",
    moderationNotice:
      "Votre message s'affiche instantanément, uniquement dans ce navigateur. Aucune donnée n'est envoyée : rien ne quitte votre appareil.",
    successTitle: "Merci du fond du cœur",
    demoNotice:
      "Les messages ci-dessous sont des exemples de démonstration : il ne s'agit pas de véritables témoignages.",
    pageSize: 9,
  },

  letter: {
    eyebrow: "Lettre à papa",
    title: "Si nous devions te dire une seule chose…",
    // Texte de démonstration, générique et non attribué à une personne réelle.
    paragraphs: [
      "Ce serait peut-être simplement : merci. Merci d'avoir été là, sans bruit, avec cette constance qui rassure et qui construit.",
      "Tu nous as appris que la valeur d'une vie ne se mesure pas à ce qu'elle accumule, mais à ce qu'elle donne. Et tu as donné, encore et encore, souvent sans rien attendre en retour.",
      "Aujourd'hui, nous voulons te rendre un peu de cette chaleur. Que cette page soit un endroit où l'on puisse te redire, à plusieurs voix, à quel point tu comptes.",
      "Joyeux anniversaire, papa. Nous t'aimons.",
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
      "Merci pour tout, papa. Que cette journée te ressemble : chaleureuse, généreuse et pleine de ceux qui t'aiment.",
    image: {
      src: null,
      alt: "Photographie de famille — emplacement à remplacer",
      focal: "center",
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
