import { timelineEvents, site } from "@/content";
import { MediaFrame } from "@/components/media/media-frame";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export function StoryTimeline() {
  return (
    <Section id="histoire">
      <Container>
        <SectionHeading
          eyebrow={site.story.eyebrow}
          title={site.story.title}
          intro={site.story.intro}
        />

        <ol className="relative mt-16 space-y-8 sm:mt-20 sm:space-y-10">
          {/* Ligne lumineuse */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/70 via-ember/40 to-transparent sm:left-[9px]"
          />

          {timelineEvents.map((event, index) => (
            <li key={event.id}>
              <Reveal delay={0.04 * Math.min(index, 4)}>
                <article className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8">
                  <div className="flex flex-col items-center pt-2" aria-hidden="true">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-gold/25 blur-[6px]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold-bright to-ember" />
                    </span>
                  </div>

                  <div className="glass-card card-interactive rounded-[var(--radius-card)] p-6 sm:p-8">
                    <p className="eyebrow text-gold">{event.period}</p>
                    <h3 className="mt-3 font-serif text-2xl text-ivory sm:text-[1.75rem]">
                      {event.title}
                    </h3>
                    <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-mist">
                      {event.story}
                    </p>

                    {event.image ? (
                      <MediaFrame
                        image={event.image}
                        ratio="wide"
                        className="mt-6 max-w-lg"
                        sizes="(max-width: 640px) 90vw, 480px"
                        showCaption
                      />
                    ) : null}

                    {event.isDemo && site.showDemoContent ? (
                      <p className="mt-5">
                        <Badge variant="demo">Démo — à remplacer</Badge>
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
