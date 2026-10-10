import type { MetadataRoute } from "next";

// Export statique : force la génération brute de ce fichier au build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
