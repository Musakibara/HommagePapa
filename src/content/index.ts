import { gallery } from "./gallery";
import { qualities } from "./qualities";
import { siteConfig } from "./site";
import { timeline } from "./timeline";
import { siteContentSchema, type SiteContent } from "./schema";

/**
 * Valide l'ensemble du contenu éditorial au démarrage.
 * En cas d'erreur, le message indique précisément le champ fautif, ce qui évite
 * les erreurs silencieuses lors de la personnalisation.
 */
function loadContent(): SiteContent {
  const result = siteContentSchema.safeParse({
    site: siteConfig,
    timeline,
    qualities,
    gallery,
  });

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "(racine)"} → ${issue.message}`)
      .join("\n");

    throw new Error(
      `Contenu invalide dans src/content/. Corrigez les champs suivants :\n${details}`,
    );
  }

  return result.data;
}

export const content: SiteContent = loadContent();

/** Raccourcis typés, pratiques dans les composants. */
export const site = content.site;
export const timelineEvents = content.timeline;
export const qualityList = content.qualities;
export const galleryItems = content.gallery;

export { demoMessages, type DemoMessage } from "./demo-messages";
export * from "./schema";
