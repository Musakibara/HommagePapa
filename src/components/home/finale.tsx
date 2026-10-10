import Link from "next/link";
import { site } from "@/content";
import { MediaFrame } from "@/components/media/media-frame";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { BurstButton } from "@/components/fx/burst-button";
import { cn } from "@/lib/utils";

export function Finale() {
  const { finale, father, celebrationLabel } = site;

  return (
    <Section id="conclusion" className="pb-32">
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[var(--radius-panel)] px-6 py-16 sm:px-14 sm:py-24">
            {/* Halos internes */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full opacity-50 blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(230,194,122,0.6), transparent)" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full opacity-50 blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(255,122,69,0.55), transparent)" }}
            />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.75fr]">
              <div className="text-center lg:text-left">
                <span className="rule-gold mx-auto w-16 lg:mx-0" aria-hidden="true" />
                <h2 className="text-shine mt-7 font-serif text-3xl leading-tight sm:text-4xl md:text-[3rem]">
                  {finale.title}
                </h2>
                <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-mist sm:text-lg lg:mx-0">
                  {finale.message}
                </p>
                <p className="mt-7 font-sans text-sm uppercase tracking-[0.24em] text-gold">
                  {father.firstName} · {celebrationLabel}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <BurstButton label="Joyeux anniversaire !" />
                  <Link
                    href={finale.primaryCta.href}
                    className={cn(buttonVariants({ size: "lg", variant: "glass" }))}
                  >
                    {finale.primaryCta.label}
                  </Link>
                  <Link
                    href={finale.secondaryCta.href}
                    className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
                  >
                    {finale.secondaryCta.label}
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-full max-w-sm">
                <MediaFrame
                  image={finale.image}
                  ratio="portrait"
                  sizes="(max-width: 1024px) 80vw, 30vw"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
