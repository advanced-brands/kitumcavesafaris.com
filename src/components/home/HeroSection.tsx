"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH, EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroDestination = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  objectPosition: string;
};

const destinations: HeroDestination[] = [
  {
    id: "bwindi",
    name: "Bwindi Forest",
    shortName: "Bwindi",
    location: "Southwestern Uganda",
    description:
      "Trek through ancient rainforest to meet mountain gorillas in their natural habitat — one of Africa's most intimate wildlife encounters.",
    image: "/images/4A9A8590.jpg",
    alt: "Mountain gorilla in Bwindi Impenetrable Forest",
    href: "/packages/3-days-gorilla-safari",
    objectPosition: "68% 42%",
  },
  {
    id: "murchison",
    name: "Murchison Falls",
    shortName: "Murchison",
    location: "Northwestern Uganda",
    description:
      "Watch the Nile explode through a narrow gorge, then cruise past elephants, hippos, and crocodiles in Uganda's largest national park.",
    image: "/images/4A9A0445.jpg",
    alt: "Elephant herd at the Nile in Murchison Falls National Park",
    href: "/packages/murchison-falls-adventure",
    objectPosition: "62% 38%",
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth",
    shortName: "Queen Elizabeth",
    location: "Western Uganda",
    description:
      "From tree-climbing lions to Kazinga Channel boat safaris — classic East African wildlife in a stunning Rift Valley setting.",
    image: "/images/4A9A0474.jpg",
    alt: "Wildlife in Queen Elizabeth National Park",
    href: "/packages/queen-elizabeth-wildlife-safari",
    objectPosition: "58% 45%",
  },
];

const AUTO_MS = 6400;
const CROSSFADE = 1.15;

function titleLines(name: string) {
  return name.split(" ").map((word) => word.toUpperCase());
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActive((index + destinations.length) % destinations.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    destinations.forEach((destination) => {
      const img = new window.Image();
      img.src = destination.image;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [next, reduceMotion]);

  const current = destinations[active];
  const indexLabel = String(active + 1).padStart(2, "0");
  const totalLabel = String(destinations.length).padStart(2, "0");

  return (
    <section
      className="hero-cinematic"
      aria-label="Featured destinations"
    >
      <div className="hero-cinematic-media" aria-hidden>
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            className="hero-cinematic-slide"
            initial={false}
            animate={{ opacity: index === active ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0.2 : CROSSFADE,
              ease: EASE_SMOOTH,
            }}
          >
            <div
              key={index === active ? `kenburns-${destination.id}-${active}` : destination.id}
              className={cn(
                "hero-cinematic-image-wrap",
                index === active && "hero-cinematic-kenburns"
              )}
            >
              <Image
                src={destination.image}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
                style={{ objectPosition: destination.objectPosition }}
                sizes="100vw"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="hero-cinematic-scrim" aria-hidden />

      <div className="hero-cinematic-layout">
        <div className="hero-cinematic-copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="hero-cinematic-copy-inner"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.75,
                ease: EASE_SOFT,
              }}
            >
              <p className="hero-cinematic-location">
                <span className="hero-cinematic-location-line" aria-hidden />
                {current.location.toUpperCase()}
              </p>

              <h1 className="hero-cinematic-title" aria-label={current.name}>
                {titleLines(current.name).map((line, lineIndex) => (
                  <motion.span
                    key={`${current.id}-${line}`}
                    className="hero-cinematic-title-line block"
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: reduceMotion ? 0 : 0.08 + lineIndex * 0.07,
                      ease: EASE_SOFT,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <p className="hero-cinematic-body">{current.description}</p>

              <Link href={current.href} className="hero-cinematic-cta">
                <span className="hero-cinematic-cta-dot" aria-hidden />
                Discover Location
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-cinematic-journey">
          <div className="hero-cinematic-cards" role="tablist" aria-label="Choose a destination">
            {destinations.map((destination, index) => {
              const isActive = index === active;
              return (
                <button
                  key={destination.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={cn(
                    "hero-portal-card group",
                    isActive && "hero-portal-card--active"
                  )}
                >
                  <span className="hero-portal-card-indicator" aria-hidden />
                  <Image
                    src={destination.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ objectPosition: destination.objectPosition }}
                    sizes="(max-width: 640px) 24vw, 140px"
                  />
                  <span className="hero-portal-card-scrim" aria-hidden />
                  <span className="hero-portal-card-label">{destination.shortName}</span>
                </button>
              );
            })}
          </div>

          <div className="hero-journey-indicator" aria-live="polite">
            <div className="hero-journey-indicator-top">
              <span className="hero-journey-index">
                {indexLabel}
                <span className="hero-journey-divider">/</span>
                {totalLabel}
              </span>
              <span className="hero-journey-destinations" aria-hidden>
                {destinations.map((d, i) => (
                  <span
                    key={d.id}
                    className={cn(
                      "hero-journey-dest-dot",
                      i === active && "hero-journey-dest-dot--active"
                    )}
                  />
                ))}
              </span>
            </div>
            <p className="hero-journey-chapter">
              Chapter {indexLabel} — {current.shortName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
