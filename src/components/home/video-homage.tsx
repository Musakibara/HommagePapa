"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ShieldCheck } from "lucide-react";
import type { VideoConfig } from "@/content/schema";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const focalClasses = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

/**
 * Hommage vidéo facultatif.
 *  - Masqué si aucune source n'est configurée.
 *  - Aucun chargement média avant le clic (miniature + bouton lecture).
 *  - YouTube utilise le domaine `youtube-nocookie`.
 */
export function VideoHomage({ video }: { video: VideoConfig }) {
  const [playing, setPlaying] = useState(false);
  const isConfigured = video.enabled && Boolean(video.youtubeId || video.fileSrc);

  if (!isConfigured) return null;

  return (
    <Section id="video">
      <Container>
        <SectionHeading eyebrow="Hommage en images" title={video.title} intro={video.description} />

        <Reveal className="mt-14" y={32}>
          <div className="glass relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-[var(--radius-panel)] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-panel)-0.5rem)] bg-coal">
              {playing ? (
                video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <video
                    src={video.fileSrc ?? undefined}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 h-full w-full"
                  >
                    Votre navigateur ne prend pas en charge la lecture vidéo.
                  </video>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 flex items-center justify-center"
                  aria-label={`Lire la vidéo : ${video.title}`}
                >
                  {video.poster?.src ? (
                    <Image
                      src={video.poster.src}
                      alt={video.poster.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 896px"
                      className={cn(
                        "object-cover transition-transform duration-[1600ms] group-hover:scale-105",
                        focalClasses[video.poster.focal],
                      )}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(230,194,122,0.18),transparent_60%),linear-gradient(180deg,#16162a,#0a0a12)]"
                    />
                  )}
                  <span className="absolute inset-0 bg-void/40 transition-colors group-hover:bg-void/25" />
                  <span className="glow-gold relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-void/50 text-gold-bright backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {video.privacyNote ? (
          <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2 text-center font-sans text-xs leading-relaxed text-mist">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {video.privacyNote}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
