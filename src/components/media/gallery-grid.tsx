"use client";

import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { MediaFrame } from "@/components/media/media-frame";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface GalleryViewItem {
  id: string;
  src: string | null;
  alt: string;
  caption?: string;
  credit?: string;
  focal: "top" | "center" | "bottom";
  year?: string;
  category: string;
  isDemo: boolean;
}

export interface GalleryGridViewCategory {
  id: string;
  label: string;
}

interface GalleryGridProps {
  items: GalleryViewItem[];
  categories: GalleryGridViewCategory[];
  className?: string;
}

export function GalleryGrid({ items, categories, className }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  const usedCategories = useMemo(
    () => categories.filter((category) => items.some((item) => item.category === category.id)),
    [categories, items],
  );

  const close = useCallback(() => setOpenIndex(null), []);

  const go = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  const selectCategory = useCallback((id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Tab") {
        const focusables = document.querySelectorAll<HTMLElement>("[data-lightbox-focusable]");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [openIndex, close, go]);

  const current = openIndex !== null ? filtered[openIndex] : null;

  return (
    <div className={className}>
      {usedCategories.length > 1 ? (
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filtrer les souvenirs par catégorie"
        >
          <FilterButton active={activeCategory === "all"} onClick={() => selectCategory("all")}>
            Tout
          </FilterButton>
          {usedCategories.map((category) => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => selectCategory(category.id)}
            >
              {category.label}
            </FilterButton>
          ))}
        </div>
      ) : null}

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-[var(--radius-card)] text-left"
              aria-label={`Agrandir : ${item.alt}`}
            >
              <MediaFrame
                image={{ src: item.src, alt: item.alt, focal: item.focal }}
                ratio="portrait"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                rounded={false}
                imageClassName="group-hover:scale-[1.06]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-all duration-500 group-hover:bg-void/45 group-hover:opacity-100"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-bright backdrop-blur-sm">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
              {item.caption || item.year ? (
                <span className="mt-2 flex items-baseline gap-2 px-1 font-sans text-xs text-mist">
                  {item.year ? (
                    <span className="tabular-nums text-gold">{item.year}</span>
                  ) : null}
                  {item.caption ? <span className="line-clamp-1">{item.caption}</span> : null}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-void/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Photographie agrandie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            onClick={close}
          >
            <div
              className="flex items-center justify-between px-4 py-4 sm:px-8"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="font-sans text-sm tabular-nums text-mist">
                {(openIndex ?? 0) + 1} / {filtered.length}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                data-lightbox-focusable
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-gold/50 hover:bg-white/10"
                aria-label="Fermer l'image agrandie"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-8"
              onClick={(event) => event.stopPropagation()}
            >
              {filtered.length > 1 ? (
                <button
                  type="button"
                  data-lightbox-focusable
                  onClick={() => go(-1)}
                  className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-void/50 text-ivory backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/10 sm:left-6"
                  aria-label="Photographie précédente"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : null}

              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[68vh] w-full max-w-5xl overflow-hidden rounded-[var(--radius-card)] bg-coal"
              >
                <MediaFrame
                  image={{
                    src: current.src,
                    alt: current.alt,
                    focal: current.focal,
                    caption: current.caption,
                    credit: current.credit,
                  }}
                  ratio="fill"
                  rounded={false}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  placeholderLabel="Photographie à ajouter"
                />
              </motion.div>

              {filtered.length > 1 ? (
                <button
                  type="button"
                  data-lightbox-focusable
                  onClick={() => go(1)}
                  className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-void/50 text-ivory backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/10 sm:right-6"
                  aria-label="Photographie suivante"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            {(current.caption || current.year || current.isDemo) && (
              <div
                className="border-t border-white/10 px-4 py-4 text-center sm:px-8"
                onClick={(event) => event.stopPropagation()}
              >
                {current.caption ? (
                  <p className="font-serif text-lg text-ivory">{current.caption}</p>
                ) : null}
                <p className="mt-1 flex items-center justify-center gap-3 font-sans text-xs text-mist">
                  {current.year ? <span className="tabular-nums">{current.year}</span> : null}
                  {current.isDemo ? <Badge variant="dark">démo</Badge> : null}
                </p>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 font-sans text-xs uppercase tracking-[0.14em] transition-all duration-500",
        active
          ? "border-transparent bg-[linear-gradient(100deg,var(--color-gold-bright),var(--color-gold)_50%,var(--color-ember))] text-void"
          : "border-white/12 bg-white/[0.03] text-mist hover:border-gold/40 hover:text-gold-bright",
      )}
    >
      {children}
    </button>
  );
}
