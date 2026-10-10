import { qualityList, site } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export function UniqueQualities() {
  const [feature, ...rest] = qualityList;

  return (
    <Section id="ce-qui-le-rend-unique">
      <Container>
        <SectionHeading
          eyebrow={site.qualities.eyebrow}
          title={site.qualities.title}
          intro={site.qualities.intro}
        />

        {feature ? (
          <Reveal className="mt-16 sm:mt-20">
            <blockquote className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-panel)] px-8 py-12 text-center sm:px-14">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-50 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(230,194,122,0.5), transparent)" }}
              />
              <span className="rule-gold mx-auto w-16" aria-hidden="true" />
              <p className="text-shine mt-8 font-serif text-2xl leading-snug sm:text-4xl">
                {feature.narrative}
              </p>
              <footer className="mt-7 flex items-center justify-center gap-3">
                <cite className="font-sans text-sm uppercase not-italic tracking-[0.24em] text-gold">
                  {feature.title}
                </cite>
                {feature.isDemo && site.showDemoContent ? (
                  <Badge variant="demo">démo</Badge>
                ) : null}
              </footer>
            </blockquote>
          </Reveal>
        ) : null}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((quality, index) => (
            <Reveal key={quality.id} delay={0.05 * (index % 3)}>
              <article className="glass-card card-interactive flex h-full flex-col rounded-[var(--radius-card)] p-7">
                <span
                  className="font-serif text-4xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(230,194,122,0.55)]"
                  aria-hidden="true"
                >
                  {String(index + 2).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-xl text-ivory">{quality.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-mist">
                  {quality.narrative}
                </p>
                {quality.isDemo && site.showDemoContent ? (
                  <p className="mt-5">
                    <Badge variant="demo">démo</Badge>
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
