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
};

export default nextConfig;
