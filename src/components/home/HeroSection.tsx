"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH, EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroChapter = {
  id: string;
  number: string;
  title: string;
  location: string;
  headline: string;
  ctaLabel: string;
  image: string;
  href: string;
  objectPosition: string;
  thumbPosition: string;
};

const chapters: HeroChapter[] = [
  {
    id: "bwindi",
    number: "01",
    title: "Mountain Gorillas",
    location: "Bwindi Impenetrable Forest",
    headline: "An hour among giants changes everything.",
    ctaLabel: "Meet the Gorillas",
    image: "/images/4A9A8590.jpg",
    href: "/packages/3-days-gorilla-safari",
    objectPosition: "68% 42%",
    thumbPosition: "65% 42%",
  },
  {
    id: "murchison",
    number: "02",
    title: "Murchison Falls",
    location: "Northwestern Uganda",
    headline: "Where the Nile meets the wild.",
    ctaLabel: "Explore the Falls",
    image: "/images/4A9A0451.jpg",
    href: "/packages/murchison-falls-adventure",
    objectPosition: "58% 50%",
    thumbPosition: "55% 48%",
  },
  {
    id: "mara",
    number: "03",
    title: "Masai Mara",
    location: "Kenya",
    headline: "The golden hour belongs to the pride.",
    ctaLabel: "Safari the Mara",
    image: "/images/IMG-20260811-WA0029.jpg",
    href: "/packages/kenya-masai-mara-safari",
    objectPosition: "72% 42%",
    thumbPosition: "70% 42%",
  },
  {
    id: "serengeti",
    number: "04",
    title: "Serengeti",
    location: "Tanzania",
    headline: "Endless plains. Unforgettable encounters.",
    ctaLabel: "Discover Serengeti",
    image: "/images/IMG-20260811-WA0062.jpg",
    href: "/packages/tanzania-serengeti-experience",
    objectPosition: "58% 38%",
    thumbPosition: "52% 38%",
  },
];

const AUTO_MS = 8000;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = chapters[active];

  const goTo = useCallback((index: number) => {
    setActive((index + chapters.length) % chapters.length);
  }, []);

  useEffect(() => {
    chapters.forEach((chapter) => {
      const img = new window.Image();
      img.src = chapter.image;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => goTo(active + 1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [active, goTo, reduceMotion]);

  return (
    <section className="hero-longing" aria-label="Featured destinations">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.id}
          className="hero-longing-media"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.25 : 1.1, ease: EASE_SMOOTH }}
        >
          <div className="hero-longing-bg" aria-hidden>
            <Image
              src={current.image}
              alt=""
              fill
              priority
              className={cn("hero-longing-image object-cover", !reduceMotion && "hero-longing-kenburns")}
              style={
                {
                  "--hero-object-position": current.objectPosition,
                } as CSSProperties
              }
              sizes="100vw"
            />
            <div className="hero-longing-scrim" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-longing-ui">
        <div className="hero-longing-copy section-padding">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="hero-longing-copy-block"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.75, ease: EASE_SOFT }}
            >
              <p className="hero-longing-eyebrow">{current.location}</p>
              <h1 className="hero-longing-headline">{current.headline}</h1>
              <Link href={current.href} className="hero-longing-cta">
                {current.ctaLabel}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-longing-dock-wrap section-padding">
          <div className="hero-longing-dock" role="tablist" aria-label="Choose a destination">
            {chapters.map((chapter, index) => {
              const isActive = index === active;

              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={cn(
                    "hero-longing-dock-item group",
                    isActive && "hero-longing-dock-item--active"
                  )}
                >
                  <div className="hero-longing-dock-thumb">
                    <Image
                      src={chapter.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: chapter.thumbPosition }}
                      sizes="120px"
                    />
                  </div>
                  <div className="hero-longing-dock-copy">
                    <span className="hero-longing-dock-number">{chapter.number}</span>
                    <span className="hero-longing-dock-title">{chapter.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
