import Link from "next/link";
import type { SiteConfig } from "@/content/schema";
import { MediaFrame } from "@/components/media/media-frame";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Spotlight } from "@/components/fx/spotlight";
import { cn } from "@/lib/utils";
import { ScrollCue } from "./scroll-cue";
import { HeroPortrait } from "./hero-portrait";

export function Hero({
  site,
  scrollTargetId = "compte-a-rebours",
}: {
  site: SiteConfig;
  scrollTargetId?: string;
}) {
  const { hero, father, celebrationLabel } = site;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <Spotlight />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span className="rule-gold w-10" aria-hidden="true" />
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem]">
                <span className="text-shine">{hero.title}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-mist sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-serif text-2xl text-gold-bright">{father.firstName}</span>
                {father.nicknames.length > 0 ? (
                  <span className="flex flex-wrap items-center gap-1.5">
                    {father.nicknames.map((nickname) => (
                      <span
                        key={nickname}
                        className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5 font-sans text-xs tracking-wide text-gold-bright"
                      >
                        {nickname}
                      </span>
                    ))}
                  </span>
                ) : null}
                <span className="h-px w-8 bg-gradient-to-r from-gold to-ember" aria-hidden="true" />
                <span className="font-sans text-sm tracking-wide text-mist">
                  {celebrationLabel}
                  {father.age ? ` · ${father.age} ans` : ""}
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={hero.primaryCta.href}
                  className={cn(buttonVariants({ size: "lg", variant: "gold" }))}
                >
                  {hero.primaryCta.label}
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className={cn(buttonVariants({ size: "lg", variant: "glass" }))}
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} y={36}>
            <HeroPortrait initial={father.monogram ?? father.firstName.charAt(0).toUpperCase()}>
              {hero.image.src ? (
                <MediaFrame
                  image={hero.image}
                  ratio="tall"
                  priority
                  rounded={false}
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  imageClassName="hover:scale-[1.03]"
                />
              ) : null}
            </HeroPortrait>
          </Reveal>
        </div>
      </Container>

      <ScrollCue label={hero.scrollCue} targetId={scrollTargetId} />
    </section>
  );
}
