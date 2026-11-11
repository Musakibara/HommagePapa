import type { NextConfig } from "next";

/**
 * Site 100 % statique (`output: "export"`) : il n'y a plus de serveur, donc
 * les en-têtes de sécurité sont appliqués par l'hébergeur via le fichier
 * `public/_headers` (copié dans `out/_headers`, lu par Netlify et les
 * plateformes statiques équivalentes).
 *
 * Note : la politique CSP autorise `'unsafe-inline'` car Next.js injecte des
 * scripts inline (payload hydratation / RSC) dans le HTML exporté.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // `next build` génère un dossier `out/` déployable n'importe où
  // (Netlify, GitHub Pages…). Aucun serveur requis.
  output: "export",
  images: {
    // Export statique : les images sont servies telles quelles depuis /public
    // (déjà optimisées par l'auteur), sans serveur d'optimisation.
    unoptimized: true,
  },
  experimental: {
    // Le serveur de développement Turbopack peut gonfler en mémoire sur les
    // longues sessions (`FATAL ERROR: Zone Allocation failed`). Le ramasse-
    // miettes libère la mémoire du cache persistant devenu inutile.
    turbopackGc: true,
    // Next.js 16.4.0 active par défaut une relance « sécurité » qui fait
    // échouer le premier `next build` (code de sortie 1, `SecurityFatalError`)
    // avant de réussir au second essai. Sur une intégration continue (Netlify),
    // ce premier échec fait échouer le déploiement. Ce site étant un export
    // statique sans serveur ni base de données, on désactive cette relance.
    agentUpgrade: false,
  },
};

export default nextConfig;
