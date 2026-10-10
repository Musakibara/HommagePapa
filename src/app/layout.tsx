import type * as React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/content";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Backdrop } from "@/components/fx/backdrop";
import { Confetti } from "@/components/fx/confetti";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { ScrollReset } from "@/components/fx/scroll-reset";
import { CelebrateButton } from "@/components/fx/celebrate-button";
import { EntranceOverlay } from "@/components/fx/entrance-overlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.siteName} — ${site.siteTagline}`,
    template: `%s · ${site.siteName}`,
  },
  description: site.description,
  applicationName: site.siteName,
  authors: [{ name: "La famille" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.siteName,
    title: `${site.siteName} — ${site.siteTagline}`,
    description: site.description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.siteName} — ${site.siteTagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-dvh text-ivory antialiased">
        <ScrollReset />
        <Backdrop />
        <ScrollProgress />

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:font-sans focus:text-sm focus:text-void"
        >
          Aller au contenu principal
        </a>

        <SiteHeader siteName={site.siteName} nav={site.nav} music={site.music} />
        <main id="contenu">{children}</main>
        <SiteFooter site={site} />

        <CelebrateButton />
        <Confetti />
        <EntranceOverlay
          siteName={site.siteName}
          tagline={site.siteTagline}
          monogram={
            site.father.monogram ?? site.father.firstName.charAt(0).toUpperCase()
          }
        />
      </body>
    </html>
  );
}
