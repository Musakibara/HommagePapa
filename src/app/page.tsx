import { demoMessages, galleryItems, site } from "@/content";
import { zonedTimeToInstant } from "@/lib/datetime";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Countdown } from "@/components/home/countdown";
import { Finale } from "@/components/home/finale";
import { Hero } from "@/components/home/hero";
import { CentralLetter } from "@/components/home/letter";
import { UniqueQualities } from "@/components/home/qualities";
import { StoryTimeline } from "@/components/home/timeline";
import { VideoHomage } from "@/components/home/video-homage";
import { GalleryGrid, type GalleryViewItem } from "@/components/media/gallery-grid";
import { Guestbook } from "@/components/messages/guestbook";

function CountdownSection() {
  const instant = site.celebrationDateTime
    ? zonedTimeToInstant(site.celebrationDateTime, site.timeZone)
    : null;

  if (!instant) return null;

  return (
    <Section id="compte-a-rebours">
      <Container className="text-center">
        <SectionHeading
          eyebrow="Compte à rebours"
          title={site.celebrationLabel}
          intro={`Chaque seconde nous rapproche de la fête. Rendez-vous en ${site.timeZone.replace("_", " ")}.`}
        />
        <div className="mx-auto mt-14 max-w-3xl">
          <Countdown
            targetIso={instant.toISOString()}
            celebrationMessage={`Aujourd'hui, c'est la fête : joyeux anniversaire ${site.father.firstName} !`}
          />
        </div>
      </Container>
    </Section>
  );
}

function GallerySection() {
  const items: GalleryViewItem[] = galleryItems.map((item) => ({
    id: item.id,
    src: item.image.src,
    alt: item.image.alt,
    caption: item.image.caption,
    credit: item.image.credit,
    focal: item.image.focal,
    year: item.year,
    category: item.category,
    isDemo: item.isDemo,
  }));

  return (
    <Section id="souvenirs">
      <Container>
        <SectionHeading
          eyebrow={site.gallery.eyebrow}
          title={site.gallery.title}
          intro={site.gallery.intro}
        />
        <div className="mt-14">
          <GalleryGrid items={items} categories={site.gallery.categories} />
        </div>
      </Container>
    </Section>
  );
}

function MessagesSection() {
  return (
    <Section id="messages">
      <Container>
        <SectionHeading
          eyebrow={site.messages.eyebrow}
          title={site.messages.title}
          intro={site.messages.intro}
        />
        <div className="mt-14">
          <Guestbook
            copy={site.messages}
            locale={site.locale}
            timeZone={site.timeZone}
            showDemo={site.showDemoContent}
            demoMessages={demoMessages}
            fatherName={site.father.firstName}
          />
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  const scrollTarget = site.sections.countdown ? "compte-a-rebours" : "histoire";

  return (
    <>
      <Hero site={site} scrollTargetId={scrollTarget} />
      {site.sections.countdown ? <CountdownSection /> : null}
      {site.sections.story ? <StoryTimeline /> : null}
      {site.sections.qualities ? <UniqueQualities /> : null}
      {site.sections.gallery ? <GallerySection /> : null}
      {site.sections.messages ? <MessagesSection /> : null}
      {site.sections.letter ? <CentralLetter /> : null}
      {site.sections.video ? <VideoHomage video={site.video} /> : null}
      {site.sections.finale ? <Finale /> : null}
    </>
  );
}
