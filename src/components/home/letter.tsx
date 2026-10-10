import { ChevronDown } from "lucide-react";
import { site } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/section";

/**
 * Lettre centrale.
 *
 * Repose sur l'élément natif <details> : le texte reste accessible et lisible
 * sans JavaScript, et la « révélation » ne dépend d'aucune animation.
 */
export function CentralLetter() {
  const { letter } = site;

  return (
    <Section id="hommage">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="eyebrow text-gold">{letter.eyebrow}</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory sm:text-4xl md:text-[2.7rem]">
              {letter.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <details className="group glass mt-12 rounded-[var(--radius-panel)] p-2">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-3 rounded-[calc(var(--radius-panel)-0.5rem)] px-6 py-5 font-sans text-sm uppercase tracking-[0.18em] text-gold-bright transition-colors hover:bg-white/[0.04] [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">{letter.revealLabel}</span>
                <span className="hidden group-open:inline">{letter.collapseLabel}</span>
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-500 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="px-6 pb-10 pt-4 sm:px-10">
                <span className="rule-gold w-full" aria-hidden="true" />
                {letter.paragraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={0.08 * index} y={14}>
                    <p className="prose-night mt-8 font-serif text-lg leading-[1.95] sm:text-xl">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
                <Reveal delay={0.08 * letter.paragraphs.length} y={14}>
                  <p className="mt-10 font-sans text-sm uppercase tracking-[0.24em] text-gold">
                    {letter.signature}
                  </p>
                </Reveal>
              </div>
            </details>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
