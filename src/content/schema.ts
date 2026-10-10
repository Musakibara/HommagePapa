import { z } from "zod";

/* ==========================================================================
   Schéma du contenu éditorial.
   Modifier le contenu = éditer les fichiers de `src/content/`, pas ce schéma.
   La validation s'exécute au démarrage (voir src/content/index.ts) et échoue
   avec un message clair si un champ est manquant ou mal formé.
   ========================================================================== */

export const focalPositions = ["top", "center", "bottom"] as const;
export type FocalPosition = (typeof focalPositions)[number];

/** Référence d'image. `src` à `null` affiche un cadre de remplacement. */
export const imageRefSchema = z.object({
  src: z.string().nullable().default(null),
  alt: z.string().min(1, { message: "Chaque image doit avoir un texte alternatif." }),
  caption: z.string().optional(),
  credit: z.string().optional(),
  focal: z.enum(focalPositions).default("center"),
});

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const sectionCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string().optional(),
});

export const sectionToggleSchema = z.object({
  countdown: z.boolean().default(true),
  story: z.boolean().default(true),
  qualities: z.boolean().default(true),
  gallery: z.boolean().default(true),
  messages: z.boolean().default(true),
  letter: z.boolean().default(true),
  video: z.boolean().default(true),
  finale: z.boolean().default(true),
});

export const heroSchema = z.object({
  variant: z.enum(["fullscreen", "editorial"]).default("fullscreen"),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  image: imageRefSchema,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  scrollCue: z.string().default("Faites défiler"),
});

export const letterSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string().min(1)).min(1),
  signature: z.string(),
  revealLabel: z.string().default("Lire la lettre"),
  collapseLabel: z.string().default("Replier"),
});

export const timelineEventSchema = z.object({
  id: z.string().min(1),
  period: z.string().min(1),
  title: z.string().min(1),
  story: z.string().min(1),
  image: imageRefSchema.optional(),
  isDemo: z.boolean().default(false),
});

export const qualitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  narrative: z.string().min(1),
  quote: z.string().optional(),
  isDemo: z.boolean().default(false),
});

export const galleryCategorySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export const galleryItemSchema = z.object({
  id: z.string().min(1),
  image: imageRefSchema,
  category: z.string().min(1),
  year: z.string().optional(),
  isDemo: z.boolean().default(false),
});

export const videoSchema = z.object({
  enabled: z.boolean().default(false),
  youtubeId: z.string().nullable().default(null),
  fileSrc: z.string().nullable().default(null),
  poster: imageRefSchema.nullable().default(null),
  title: z.string(),
  description: z.string(),
  privacyNote: z.string().optional(),
});

export const musicSchema = z.object({
  enabled: z.boolean().default(false),
  src: z.string().nullable().default(null),
  title: z.string().default("Ambiance musicale"),
  volume: z.number().min(0).max(1).default(0.35),
});

export const finaleSchema = z.object({
  title: z.string(),
  message: z.string(),
  image: imageRefSchema,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
});

export const footerSchema = z.object({
  phrase: z.string(),
  familyNote: z.string(),
  links: z.array(navLinkSchema).min(1),
  credit: z.string(),
});

export const messagesCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  wallTitle: z.string(),
  emptyTitle: z.string(),
  emptyBody: z.string(),
  formTitle: z.string(),
  formIntro: z.string(),
  consentLabel: z.string(),
  moderationNotice: z.string(),
  successTitle: z.string(),
  demoNotice: z.string(),
  pageSize: z.number().int().min(3).max(48).default(9),
});

export const galleryCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string(),
  emptyTitle: z.string(),
  emptyBody: z.string(),
  categories: z.array(galleryCategorySchema).min(1),
});

export const fatherSchema = z.object({
  /** Prénom affiché dans les titres (ex. « Papa »). */
  firstName: z.string().min(1),
  fullName: z.string().min(1),
  /** Âge célébré. `null` pour masquer. */
  age: z.number().int().positive().nullable().default(null),
  /** Année de naissance. `null` pour masquer. */
  birthYear: z.number().int().min(1900).max(2100).nullable().default(null),
  /** Courte épithète personnelle (ex. « L'homme qui nous a tant donné »). */
  epithet: z.string(),
});

export const siteConfigSchema = z.object({
  siteName: z.string().min(1),
  siteTagline: z.string().min(1),
  description: z.string().min(1),
  locale: z.string().default("fr-FR"),
  timeZone: z.string().default("Europe/Paris"),
  /**
   * Date et heure locales de la célébration, au format « YYYY-MM-DDTHH:mm:ss ».
   * `null` masque le compte à rebours. Interprétée dans `timeZone`.
   */
  celebrationDateTime: z.string().nullable().default(null),
  /** Libellé affiché de la date (ex. « 5 décembre 2026 »). */
  celebrationLabel: z.string().min(1),
  /** Affiche les contenus marqués comme démonstration. */
  showDemoContent: z.boolean().default(true),
  father: fatherSchema,
  sections: sectionToggleSchema,
  nav: z.array(navLinkSchema).min(1),
  hero: heroSchema,
  story: sectionCopySchema,
  qualities: sectionCopySchema,
  gallery: galleryCopySchema,
  messages: messagesCopySchema,
  letter: letterSchema,
  video: videoSchema,
  music: musicSchema,
  finale: finaleSchema,
  footer: footerSchema,
});

export const siteContentSchema = z.object({
  site: siteConfigSchema,
  timeline: z.array(timelineEventSchema),
  qualities: z.array(qualitySchema),
  gallery: z.array(galleryItemSchema),
});

export type ImageRef = z.infer<typeof imageRefSchema>;
export type NavLink = z.infer<typeof navLinkSchema>;
export type Cta = z.infer<typeof ctaSchema>;
export type SectionCopy = z.infer<typeof sectionCopySchema>;
export type Hero = z.infer<typeof heroSchema>;
export type Letter = z.infer<typeof letterSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type Quality = z.infer<typeof qualitySchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type GalleryCategory = z.infer<typeof galleryCategorySchema>;
export type GalleryCopy = z.infer<typeof galleryCopySchema>;
export type MessagesCopy = z.infer<typeof messagesCopySchema>;
export type VideoConfig = z.infer<typeof videoSchema>;
export type MusicConfig = z.infer<typeof musicSchema>;
export type Finale = z.infer<typeof finaleSchema>;
export type Footer = z.infer<typeof footerSchema>;
export type Father = z.infer<typeof fatherSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;

/* ---- Types d'entrée (avant application des valeurs par défaut) ---------- */
export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type TimelineEventInput = z.input<typeof timelineEventSchema>;
export type QualityInput = z.input<typeof qualitySchema>;
export type GalleryItemInput = z.input<typeof galleryItemSchema>;
