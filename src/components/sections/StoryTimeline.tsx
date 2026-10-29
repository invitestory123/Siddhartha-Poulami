import { useEffect, useRef } from "react";

import { gsap } from "gsap";

const firstDateImage = "/story-first-date-2015.png";
const anniversaryImage = "/story-anniversary-2018.jpg";
const treeArchImage = "/story-tree-arch.jpg";
const graduationImagePoulami = "/story-graduation.jpg";
const graduationImageSiddhartha = "/story-graduation-siddhartha.png";
const mussoorieImage = "/story-mussoorie-2026.jpg";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { ScrollTrigger, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MilestonePhoto = {
  src: string;
  alt: string;
  placement: "left" | "right" | "below";
  caption?: string;
  aspectRatio?: "3/4" | "4/3" | "16/9";
};

type Milestone = {
  year: string;
  title: string;
  text: string;
  /** Optional single photo placement. */
  photo?: MilestonePhoto;
  /** Optional dual photos placed side by side. */
  sideBySidePhotos?: Array<{ src: string; alt: string; caption?: string }>;
};

const STORY: Milestone[] = [
  {
    year: "2015 — First Date",
    title: "Where It All Began",
    text: "A sweet smile, quiet laughter, and an instant spark that changed everything. The unforgettable first date in 2015 where two paths crossed and our beautiful story began.",
    photo: {
      src: firstDateImage,
      alt: "Siddhartha and Poulami on their first date in 2015",
      placement: "left",
      aspectRatio: "4/3",
      caption: "Our First Date · 2015",
    },
  },
  {
    year: "2018 — Celebration",
    title: "Celebrating Anniversary Together",
    text: "Gathered around the warm flicker of candles and cake, celebrating our anniversary with shared laughter and quiet promises that each tomorrow would be even sweeter than today.",
    photo: {
      src: anniversaryImage,
      alt: "Siddhartha and Poulami celebrating anniversary together with cake and candles",
      placement: "right",
      aspectRatio: "3/4",
      caption: "Anniversary Together · 2018",
    },
  },
  {
    year: "2021 — Harmony",
    title: "Beneath the Living Canopy",
    text: "Stepping under a towering natural tree arch in the tranquil woods. A quiet afternoon where the world faded away, and two paths felt entirely meant to converge.",
    photo: {
      src: treeArchImage,
      alt: "Siddhartha and Poulami framed beneath a natural tree arch in nature",
      placement: "left",
      aspectRatio: "3/4",
      caption: "Tranquil Woods · 2021",
    },
  },
  {
    year: "2022 — Achievement",
    title: "Proud Milestones & Dreams",
    text: "Standing side by side through life's greatest milestones. Celebrating both of our convocations together — honoring hard-earned degrees, stethoscopes, and the pride of always having each other's back.",
    sideBySidePhotos: [
      {
        src: graduationImagePoulami,
        alt: "Poulami's convocation milestone with Siddhartha by her side",
        caption: "Poulami's Convocation",
      },
      {
        src: graduationImageSiddhartha,
        alt: "Siddhartha's convocation ceremony with Poulami celebrating beside him",
        caption: "Siddhartha's Convocation",
      },
    ],
  },
  {
    year: "2026 — Mussoorie",
    title: "High in the Pines",
    text: "Amidst the scenic mountain winds and lush pine ridges of Mussoorie — dancing hand-in-hand beneath the sunlit trees, ready to walk into forever.",
    photo: {
      src: mussoorieImage,
      alt: "Siddhartha and Poulami amidst the scenic hills of Mussoorie",
      placement: "below",
      aspectRatio: "3/4",
      caption: "Mussoorie · 2026",
    },
  },
];

export function StoryTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();

  // Single timeline scrub: thread opacity + bullet ✦ glow sweep the section.
  useGSAP(
    () => {
      if (!ok || !listRef.current) return;
      const listEl = listRef.current;
      const threadEl = listEl.querySelector<HTMLElement>("[data-thread]");
      const starEls = listEl.querySelectorAll<HTMLElement>("[data-star]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listEl,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
      if (threadEl) {
        tl.fromTo(
          threadEl,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", transformOrigin: "top center" },
          0,
        );
      }
      if (starEls.length > 0) {
        tl.fromTo(
          starEls,
          { opacity: 0.2, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.2,
          },
          0,
        );
      }
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    [ok],
  );

  // Recompute ScrollTrigger after the section measures correctly.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section data-section="story" className="relative px-6 py-32">
      <SectionHeader
        eyebrow="The Story"
        title="Five moments, one beginning."
        align="center"
        className="mx-auto max-w-2xl"
      />

      <div ref={listRef} className="relative mx-auto mt-20 max-w-4xl pl-10">
        {/* Gold thread — gradient vertical line tying the chapter markers */}
        <span
          data-thread
          aria-hidden
          className="absolute left-[14px] top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.93 0.07 86 / 0.55) 12%, oklch(0.93 0.07 86 / 0.55) 88%, transparent 100%)",
          }}
        />

        <ol className="space-y-24">
          {STORY.map((m) => (
            <li key={m.year}>
              <MilestoneRow milestone={m} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  const photo = milestone.photo;
  const align = photo?.placement === "left" ? "md:flex-row" : "md:flex-row-reverse";

  return (
    <article className="relative">
      <span
        data-star
        aria-hidden
        className="absolute -left-10 top-1 font-display text-lg gold-text"
      >
        ✦
      </span>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/70">
            {milestone.year}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-snug gold-text sm:text-4xl">
            {milestone.title}
          </h3>
        </div>

        <p className="max-w-xl font-display text-base leading-loose text-foreground/85 sm:text-lg">
          {milestone.text}
        </p>

        {/* Side-by-side photos for convocations */}
        {milestone.sideBySidePhotos && (
          <figure className="mt-1 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-xl">
              {milestone.sideBySidePhotos.map((p, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg border border-gold/30 bg-card/40 p-1 shadow-md transition-all duration-300 hover:border-gold/60 hover:shadow-[0_0_15px_rgba(225,190,120,0.2)]"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="aspect-[3/4] w-full rounded-md object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {p.caption && (
                    <p className="mt-2 pb-1 text-center text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.22em] text-gold-soft/90 font-medium">
                      {p.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <figcaption className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/50">
              Celebrating both graduation milestones side by side
            </figcaption>
          </figure>
        )}

        {/* Single photo */}
        {photo && (
          <figure
            className={cn(
              "flex flex-col gap-4",
              photo.placement === "below" ? "" : `md:flex-row md:items-start ${align}`,
            )}
          >
            <div
              className={cn(
                "group relative overflow-hidden rounded-lg border border-gold/30 bg-card/40 p-1 shadow-md transition-all duration-300 hover:border-gold/60",
                photo.placement === "below"
                  ? "max-w-md w-full"
                  : photo.aspectRatio === "4/3"
                    ? "w-full max-w-[260px]"
                    : "w-full max-w-[210px]",
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={cn(
                  "w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-[1.02]",
                  photo.placement === "below"
                    ? "aspect-[3/4] object-center"
                    : photo.aspectRatio === "4/3"
                      ? "aspect-[4/3] object-center"
                      : "aspect-[3/4] object-center",
                )}
              />
            </div>
            <figcaption
              className={cn(
                "text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/60",
                photo.placement === "below" ? "" : "md:pt-2 md:max-w-[170px]",
              )}
            >
              {photo.caption || photo.alt}
            </figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}
