import type * as React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Backdrop } from "@/components/fx/backdrop";
import { Confetti } from "@/components/fx/confetti";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { ScrollReset } from "@/components/fx/scroll-reset";
import { CelebrateButton } from "@/components/fx/celebrate-button";
import { DemoBanner } from "@/components/layout/demo-banner";
import { EntranceOverlay } from "@/components/fx/entrance-overlay";

/**
 * Les polices sont auto-hébergées : le build ne dépend plus de
 * fonts.googleapis.com et le site reste identique hors ligne.
 */
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const playfair = localFont({
  src: [
    {
      path: "./fonts/playfair-display-latin.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "./fonts/playfair-display-italic-latin.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  process.env.DEPLOY_PRIME_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.siteName} — ${site.siteTagline}`,
    template: `%s · ${site.siteName}`,
  },
  description: site.description,
  applicationName: site.siteName,
  authors: [{ name: "La famille" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.siteName,
    title: `${site.siteName} — ${site.siteTagline}`,
    description: site.description,
    url: siteUrl,
    images: [
      {
        url: "/images/og-hommage.jpg",
        width: 1200,
        height: 630,
        alt: "Hommage à Papa — une célébration de la vie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.siteName} — ${site.siteTagline}`,
    description: site.description,
    images: ["/images/og-hommage.jpg"],
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
        {site.showDemoContent ? <DemoBanner /> : null}
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
