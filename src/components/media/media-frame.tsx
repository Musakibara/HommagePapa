import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageRatio, ImageRef } from "@/content/schema";
import { cn } from "@/lib/utils";

const ratioClasses: Record<ImageRatio, string> = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  vertical: "aspect-[9/16]",
  photo: "aspect-[2/3]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  fill: "h-full w-full",
};

const focalClasses: Record<ImageRef["focal"], string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export interface MediaFrameProps {
  image: ImageRef;
  ratio?: ImageRatio;
  className?: string;
  imageClassName?: string;
  /**
   * Charge l'image immédiatement (`loading="eager"` + `fetchPriority="high"`).
   * À réserver aux visuels au-dessus de la ligne de flottaison (image LCP) :
   * ailleurs, le chargement paresseux est plus économe.
   */
  eager?: boolean;
  sizes?: string;
  rounded?: boolean;
  showCaption?: boolean;
  /** `cover` remplit le cadre (recadrage) ; `contain` affiche toute l'image. */
  fit?: "cover" | "contain";
  /** Texte du cadre de remplacement (sans image configurée). */
  placeholderLabel?: string;
}

/**
 * Cadre média unique pour tout le site.
 *  - Si `image.src` est renseigné → `next/image`.
 *  - Sinon → cadre de remplacement élégant, explicite et accessible.
 *
 * Le format d'affichage suit `image.ratio` quand il est renseigné (la photo
 * garde ainsi ses proportions), sinon le format passé en propriété.
 */
export function MediaFrame({
  image,
  ratio = "landscape",
  className,
  imageClassName,
  eager = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = true,
  showCaption = false,
  fit = "cover",
  placeholderLabel = "Photographie à ajouter",
}: MediaFrameProps) {
  const frameRatio = image.ratio ?? ratio;
  const isContained = fit === "contain";

  return (
    <figure
      className={cn(
        "group relative overflow-hidden",
        rounded && "rounded-[var(--radius-card)]",
        ratioClasses[frameRatio],
        className,
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          sizes={sizes}
          className={cn(
            "transition-transform duration-[1600ms] ease-[var(--ease-out-expo)]",
            isContained ? "object-contain" : "object-cover",
            !isContained && focalClasses[image.focal],
            imageClassName,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          title={image.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-gold/35 bg-white/[0.02] px-6 text-center backdrop-blur-sm"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold"
            aria-hidden="true"
          >
            <ImageIcon className="h-5 w-5" />
          </span>
          <span className="eyebrow text-mist-soft">{placeholderLabel}</span>
          <span className="max-w-[24rem] font-sans text-xs leading-relaxed text-mist/80">
            {image.alt}
          </span>
        </div>
      )}

      {showCaption && (image.caption || image.credit) ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 via-void/40 to-transparent p-5 pt-12 font-sans text-sm text-ivory">
          {image.caption}
          {image.credit ? (
            <span className="ml-2 text-mist">— {image.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
