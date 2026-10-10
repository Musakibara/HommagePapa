import Link from "next/link";
import { Heart } from "lucide-react";
import type { SiteConfig } from "@/content/schema";

export function SiteFooter({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-serif text-2xl text-ivory">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-gradient-to-br from-gold-bright to-ember shadow-[0_0_12px_rgba(230,194,122,0.8)]"
              />
              {site.siteName}
            </p>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-mist">
              {site.footer.phrase}
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <p className="eyebrow text-mist-soft">Explorer</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {site.footer.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-mist transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-sans text-xs text-mist-soft">
            <Heart className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
            {site.footer.familyNote}
          </p>
          <p className="font-sans text-xs text-mist-soft">
            {site.footer.credit} · {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
