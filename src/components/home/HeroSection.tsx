"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_SMOOTH, EASE_SOFT } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type HeroChapter = {
  id: string;
  label: string;
  location: string;
  headline: string;
  ctaLabel: string;
  image: string;
  href: string;
  objectPosition: string;
};

const chapters: HeroChapter[] = [
  {
    id: "bwindi",
    label: "Gorillas",
    location: "Bwindi · Uganda",
    headline: "An hour among giants changes everything.",
    ctaLabel: "Meet the gorillas",
    image: "/images/4A9A8590.jpg",
    href: "/packages/3-days-gorilla-safari",
    objectPosition: "68% 42%",
  },
  {
    id: "murchison",
    label: "Murchison",
    location: "Murchison Falls · Uganda",
    headline: "Where the Nile meets the wild.",
    ctaLabel: "Explore the falls",
    image: "/images/4A9A0451.jpg",
    href: "/packages/murchison-falls-adventure",
    objectPosition: "58% 50%",
  },
  {
    id: "mara",
    label: "Masai Mara",
    location: "Masai Mara · Kenya",
    headline: "The golden hour belongs to the pride.",
    ctaLabel: "Safari the Mara",
    image: "/images/IMG-20260811-WA0029.jpg",
    href: "/packages/kenya-masai-mara-safari",
    objectPosition: "72% 42%",
  },
  {
    id: "serengeti",
    label: "Serengeti",
    location: "Serengeti · Tanzania",
    headline: "Endless plains. Unforgettable encounters.",
    ctaLabel: "Discover Serengeti",
    image: "/images/IMG-20260811-WA0062.jpg",
    href: "/packages/tanzania-serengeti-experience",
    objectPosition: "58% 38%",
  },
];

const AUTO_MS = 9000;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSafeReducedMotion();
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
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => goTo(active + 1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [active, goTo, paused, reduceMotion]);

  return (
    <section
      className="hero-longing"
      aria-label="Featured destinations"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.id}
          className="hero-longing-media"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.25 : 1.2, ease: EASE_SMOOTH }}
        >
          <div className="hero-longing-bg" aria-hidden>
            <Image
              src={current.image}
              alt=""
              fill
              priority
              loading="eager"
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
        <div className="hero-longing-inner">
          <div className="hero-longing-copy">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="hero-longing-copy-block"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: EASE_SOFT }}
              >
                <p className="hero-longing-eyebrow">{current.location}</p>
                <h1 className="hero-longing-headline">{current.headline}</h1>
                <Link href={current.href} className="hero-longing-cta">
                  {current.ctaLabel}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-longing-rail" role="tablist" aria-label="Choose a destination">
            {chapters.map((chapter, index) => {
              const isActive = index === active;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={cn("hero-longing-rail-item", isActive && "hero-longing-rail-item--active")}
                >
                  <span className="hero-longing-rail-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="hero-longing-rail-label">{chapter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
