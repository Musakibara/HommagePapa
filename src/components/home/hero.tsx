import Link from "next/link";
import type { SiteConfig } from "@/content/schema";
import { MediaFrame } from "@/components/media/media-frame";
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="rule-gold w-10" aria-hidden="true" />
              {hero.eyebrow}
            </p>

            <h1 className="mt-6 font-serif text-[2.35rem] leading-[1.06] sm:text-6xl lg:text-[4.4rem]">
              <span className="text-shine-static">{hero.title}</span>
            </h1>

            {father.epithet ? (
              <p className="mt-3 font-serif text-base italic text-gold/90 sm:text-lg">
                {father.epithet}
              </p>
            ) : null}

            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-mist sm:mt-7 sm:text-lg">
              {hero.subtitle}
            </p>

            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-8">
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
                {father.age
                  ? ` · ${father.age} ans`
                  : father.birthYear
                    ? ` · Né en ${father.birthYear}`
                    : ""}
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10">
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
          </div>

          <div className="order-first mx-auto w-full max-w-[17rem] sm:max-w-xs lg:order-none lg:max-w-md">
            <HeroPortrait initial={father.monogram ?? father.firstName.charAt(0).toUpperCase()}>
              {hero.image.src ? (
                <MediaFrame
                  image={hero.image}
                  ratio="photo"
                  eager
                  rounded={false}
                  sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 42vw"
                  imageClassName="hover:scale-[1.03]"
                />
              ) : null}
            </HeroPortrait>
          </div>
        </div>
      </Container>

      <ScrollCue label={hero.scrollCue} targetId={scrollTargetId} />
    </section>
  );
}
