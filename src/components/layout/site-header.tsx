"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { MusicConfig, NavLink } from "@/content/schema";
import { cn } from "@/lib/utils";
import { MusicToggle } from "./music-toggle";
import { ShareButton } from "./share-button";

interface SiteHeaderProps {
  siteName: string;
  nav: NavLink[];
  music: MusicConfig;
}

function hashOf(href: string): string | null {
  const index = href.indexOf("#");
  return index >= 0 ? href.slice(index + 1) : null;
}

export function SiteHeader({ siteName, nav, music }: SiteHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const sectionIds = useMemo(
    () => nav.map((link) => hashOf(link.href)).filter((id): id is string => Boolean(id)),
    [nav],
  );

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled && !menuOpen
          ? "border-b border-white/10 bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-serif text-lg tracking-tight text-ivory transition-colors hover:text-gold-bright"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-gradient-to-br from-gold-bright to-ember shadow-[0_0_12px_rgba(230,194,122,0.8)] transition-transform duration-500 group-hover:scale-125"
          />
          {siteName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {nav.map((link) => {
            const id = hashOf(link.href);
            const active = Boolean(id) && activeHash === id;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 font-sans text-sm transition-colors duration-300",
                  active ? "text-gold-bright" : "text-mist hover:text-ivory",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ShareButton />
          </div>
          <MusicToggle music={music} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.06] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-24">
              <nav className="flex flex-col" aria-label="Navigation mobile">
                {nav.map((link, index) => (
                  <motion.div
                    key={link.href + link.label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: prefersReducedMotion ? 0 : 0.06 * index + 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-white/10 py-4 font-serif text-2xl text-ivory transition-colors hover:text-gold-bright"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                <ShareButton />
                <MusicToggle music={music} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
