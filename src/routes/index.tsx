import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { OpeningSequence } from "@/components/OpeningSequence";
import { InteractivePortrait } from "@/components/InteractivePortrait";
import { PalaceReveal } from "@/components/PalaceReveal";
import { Reveal } from "@/components/Reveal";
import { ScratchRevealDate } from "@/components/ScratchRevealDate";
import { AudioToggle } from "@/components/AudioToggle";
import { CursorFlecks } from "@/components/CursorFlecks";
import { RichPetals } from "@/components/RichPetals";
import { SectionScrubber, type SectionDef } from "@/components/SectionScrubber";
import { Breather } from "@/components/sections/Breather";
import { Celebrations } from "@/components/sections/Celebrations";
import { CountdownGreeting } from "@/components/sections/CountdownGreeting";
import { DiyaCeremony } from "@/components/sections/DiyaCeremony";
import { FlipCountdown } from "@/components/sections/FlipCountdown";
import { FloatingMotif } from "@/components/sections/FloatingMotif";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { LetterH1 } from "@/components/sections/LetterH1";
import { QuoteScrub } from "@/components/sections/QuoteScrub";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { VenueMap } from "@/components/sections/VenueMap";
import { ScrollTrigger, useGSAP } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siddhartha & Poulami — Wedding Invitation" },
      {
        name: "description",
        content:
          "You are cordially invited to celebrate the wedding of Siddhartha & Poulami on 05 December 2026 at The Dreamland Resort, Birati, and Grand Reception on 07 December 2026 at The Prarthana Banquet, Barrackpore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Siddhartha & Poulami — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "You are cordially invited to celebrate the wedding of Siddhartha & Poulami on 05 December 2026 at The Dreamland Resort, Birati, and Grand Reception on 07 December 2026 at The Prarthana Banquet, Barrackpore.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:secure_url", content: "/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Siddhartha & Poulami — Wedding Invitation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Siddhartha & Poulami — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "You are cordially invited to celebrate the wedding of Siddhartha & Poulami on 05 December 2026 at The Dreamland Resort, Birati, and Grand Reception on 07 December 2026 at The Prarthana Banquet, Barrackpore.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = "2026-12-05T18:30:00+05:30";

const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero" },
  { id: "blessing", label: "Blessing" },
  { id: "countdown", label: "Countdown" },
  { id: "story", label: "Story" },
  { id: "celebrations", label: "Events" },
  { id: "venue", label: "Venues" },
];

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <OpeningSequence onFinish={() => setOpened(true)} />

      {/* Ambient layers */}
      <CursorFlecks />
      <SectionScrubber sections={SECTIONS} />
      <AudioToggle visible={opened} />

      {/* Scroll progress */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gold/80 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      {/* Hero */}
      <section
        data-section="hero"
        className="relative flex min-h-screen items-end justify-center overflow-hidden"
      >
        <HeroParallax />
        <div className="relative z-10 mb-16 px-6 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-gold-soft/80">
              Together with their families
            </p>
          </Reveal>
          <Reveal delay={200}>
            <LetterH1 />
          </Reveal>
          <Reveal delay={400}>
            <ScratchRevealDate />
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-10 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/60">
              scroll
              <div className="mx-auto mt-3 h-10 w-px shimmer-line" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blessing */}
      <section data-section="blessing" className="relative px-6 py-28">
        {opened && <RichPetals type="petals" count={7} />}
        <div className="relative mx-auto max-w-2xl text-center">
          <QuoteScrub text="“Where two souls meet, the lotus blooms — and every path becomes a garden.”" />
          <Reveal delay={200}>
            <div className="mx-auto mt-8 w-24 gold-rule" />
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gold-soft/80">
              With the affectionate blessings of our parents
            </p>
            <div className="mt-6 grid gap-4 text-center sm:grid-cols-2">
              <div className="rounded-xl border border-gold/25 bg-deep/40 p-5 backdrop-blur-xs">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">Groom's Parents</p>
                <p className="mt-2 font-display text-lg text-gold-soft">Shri Amar Nath Bera</p>
                <p className="font-display text-lg text-gold-soft">&amp; Smt. Jyotsna Bera</p>
                <p className="mt-2 text-xs italic text-foreground/60">Son: Siddhartha</p>
              </div>
              <div className="rounded-xl border border-gold/25 bg-deep/40 p-5 backdrop-blur-xs">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">Bride's Parents</p>
                <p className="mt-2 font-display text-lg text-gold-soft">Shri Asit Mukhopadhyay</p>
                <p className="font-display text-lg text-gold-soft">&amp; Smt. Amrita Mukhopadhyay</p>
                <p className="mt-2 text-xs italic text-foreground/60">Daughter: Poulami</p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              We cordially invite you to celebrate with us as we embark on this sacred journey of love and togetherness.
            </p>
          </Reveal>
        </div>
        <FloatingMotif />
      </section>

      {/* Countdown */}
      <section data-section="countdown" className="relative px-6 pb-28">
        <SectionHeader
          eyebrow="The Countdown"
          title="The days draw near."
          className="mx-auto max-w-2xl"
        />
        <div className="mt-10">
          <CountdownGreeting />
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft/70">
              The wedding begins in
            </p>
          </Reveal>
          <Reveal delay={150}>
            <FlipCountdown target={WEDDING_DATE} />
          </Reveal>
        </div>
      </section>

      {/* Story — gold thread + 3 selective photos */}
      <StoryTimeline />

      <InteractivePortrait />

      {/* Diya ritual — touch-and-hold to light, then 12 lanterns rise */}
      <DiyaCeremony />

      {/* Events */}
      <Celebrations />

      {/* Breather between celebrations and venue */}
      <Breather>Every journey has a place.</Breather>

      <PalaceReveal />

      {/* Venue — invitation style: heading + address first, then map */}
      <section data-section="venue" className="relative px-6 py-32">
        <SectionHeader
          eyebrow="The Venues"
          title="Where we begin forever."
          className="mx-auto max-w-2xl"
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-xl text-center">
            <p className="font-display text-3xl gold-text sm:text-4xl">Birati &amp; Barrackpore</p>
            <p className="mt-3 text-sm tracking-[0.25em] text-gold-soft/80 uppercase">
              The Dreamland Resort · The Prarthana Banquet
            </p>
            <p className="mt-8 font-display text-lg italic leading-relaxed text-foreground/80">
              Two magnificent settings to welcome loved ones — exchanging sacred vows in Birati, followed by an evening of grand reception and celebration in Barrackpore.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-16 max-w-2xl">
            <VenueMap />
          </div>
        </Reveal>
      </section>

      <footer className="relative mt-20 overflow-hidden border-t border-gold/15 px-6 pb-12 pt-28 text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.12_84/0.18),transparent_68%)]"
        />
        <p className="relative text-[0.58rem] uppercase tracking-[0.55em] text-gold-soft/55">
          With love, and with your blessings
        </p>
        <p className="relative mt-7 text-balance font-display text-6xl leading-none gold-text sm:text-8xl">
          Siddhartha <span className="font-light italic text-gold-soft/55">&amp;</span> Poulami
        </p>
        <p className="relative mx-auto mt-7 max-w-xl font-display text-lg italic leading-relaxed text-foreground/65">
          We cannot wait to begin this chapter surrounded by the people who made every page before
          it possible.
        </p>
        <div className="relative mx-auto mt-14 flex max-w-3xl items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 font-display text-xl text-gold-soft">
            ✦
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
        </div>
        <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 text-[0.55rem] uppercase tracking-[0.3em] text-foreground/35 sm:flex-row">
          <span>05 &amp; 07 December 2026 · Kolkata</span>
          <span>#SiddharthaWedsPoulami</span>
        </div>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="relative mt-6 inline-block text-[0.5rem] uppercase tracking-[0.3em] text-foreground/25 transition-colors hover:text-gold-soft/60"
        >
          Follow @invitestory.in on Instagram
        </a>
      </footer>
    </main>
  );
}
