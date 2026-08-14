"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroDestination = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  objectPosition?: string;
};

const destinations: HeroDestination[] = [
  {
    id: "bwindi",
    name: "Bwindi Forest",
    location: "Southwestern Uganda",
    description:
      "Trek through ancient rainforest to meet mountain gorillas in their natural habitat — one of Africa's most intimate wildlife encounters.",
    image: "/images/4A9A8590.jpg",
    alt: "Mountain gorilla in Bwindi Impenetrable Forest",
    href: "/packages/3-days-gorilla-safari",
    objectPosition: "center 35%",
  },
  {
    id: "murchison",
    name: "Murchison Falls",
    location: "Northwestern Uganda",
    description:
      "Watch the Nile explode through a narrow gorge, then cruise past elephants, hippos, and crocodiles on Uganda's largest national park.",
    image: "/images/4A9A0445.jpg",
    alt: "Elephant herd at the Nile in Murchison Falls National Park",
    href: "/packages/murchison-falls-adventure",
    objectPosition: "center 42%",
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth",
    location: "Western Uganda",
    description:
      "From tree-climbing lions to Kazinga Channel boat safaris, this park delivers classic East African wildlife in a stunning Rift Valley setting.",
    image: "/images/4A9A0474.jpg",
    alt: "Wildlife in Queen Elizabeth National Park",
    href: "/packages/queen-elizabeth-wildlife-safari",
    objectPosition: "center center",
  },
  {
    id: "masai-mara",
    name: "Masai Mara",
    location: "Kenya, East Africa",
    description:
      "Witness the Great Migration, golden savannah sunsets, and big cats on the legendary plains that define the African safari dream.",
    image: "/images/IMG-20260811-WA0069.jpg",
    alt: "African elephant in the Masai Mara",
    href: "/packages/kenya-masai-mara-safari",
    objectPosition: "center center",
  },
  {
    id: "serengeti",
    name: "Serengeti",
    location: "Tanzania, East Africa",
    description:
      "Endless horizons, predator action, and the rhythm of the wild — the Serengeti is the heartbeat of East Africa's greatest safari country.",
    image: "/images/IMG-20260811-WA0025.jpg",
    alt: "Safari vehicle and giraffe on the Serengeti plains",
    href: "/packages/tanzania-serengeti-experience",
    objectPosition: "center center",
  },
];

const AUTO_MS = 5200;
const FADE_MS = 450;

function wrap(index: number, total: number) {
  return (index + total) % total;
}

function previewCards(active: number) {
  const cards: HeroDestination[] = [];
  for (let i = 1; i <= 3; i += 1) {
    cards.push(destinations[wrap(active + i, destinations.length)]);
  }
  return cards;
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      const next = wrap(index, destinations.length);
      if (next === active) return;
      setTransitioning(true);
      window.setTimeout(() => {
        setActive(next);
        window.requestAnimationFrame(() => setTransitioning(false));
      }, FADE_MS);
    },
    [active, transitioning]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [next]);

  const current = destinations[active];
  const cards = previewCards(active);
  const progress = ((active + 1) / destinations.length) * 100;

  return (
    <section
      className="relative isolate flex min-h-[94svh] flex-col overflow-hidden bg-brand-forest-dark"
      aria-label="Featured destinations"
    >
      {destinations.map((destination, index) => (
        <div
          key={destination.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[650ms] [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]",
            index === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== active}
        >
          <Image
            src={destination.image}
            alt=""
            fill
            priority={index === 0}
            className={cn(
              "object-cover",
              index === active && !transitioning && "hero-ken-burns"
            )}
            style={{ objectPosition: destination.objectPosition }}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative z-10 flex min-h-[94svh] flex-col justify-end px-4 pb-6 pt-20 sm:px-6 sm:pb-8 md:px-10 md:pb-10 lg:px-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div
            className={cn(
              "max-w-xl lg:max-w-2xl transition-opacity duration-[450ms] [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]",
              transitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
              {current.location}
            </p>

            <h1 className="hero-editorial-title mt-3 sm:mt-4">
              {current.name.split(" ").map((word, i) => (
                <span key={`${current.id}-${word}-${i}`} className="block">
                  {word}
                </span>
              ))}
            </h1>

            <p className="hero-editorial-body mt-4 max-w-lg sm:mt-5">
              {current.description}
            </p>

            <Link href={current.href} className="hero-editorial-cta mt-6 inline-flex sm:mt-7">
              <span className="hero-editorial-cta-dot" aria-hidden />
              Discover Location
            </Link>
          </div>

          <div className="flex w-full flex-col items-end gap-4 lg:w-auto lg:shrink-0">
            <div className="flex w-full justify-end gap-2 sm:gap-2.5 md:gap-3">
              {cards.map((destination) => {
                const cardIndex = destinations.findIndex((d) => d.id === destination.id);
                return (
                  <button
                    key={destination.id}
                    type="button"
                    onClick={() => goTo(cardIndex)}
                    className="hero-editorial-card group"
                    aria-label={`View ${destination.name}, ${destination.location}`}
                  >
                    <Image
                      src={destination.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.03]"
                      style={{ objectPosition: destination.objectPosition }}
                      sizes="(max-width: 640px) 22vw, 120px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <span className="hero-editorial-card-label">{destination.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex w-full max-w-[280px] items-center gap-3 sm:max-w-xs">
              <div className="relative h-px flex-1 bg-white/25">
                <div
                  className="absolute inset-y-0 left-0 bg-white transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-sans text-xs tabular-nums text-white/80">
                {active + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
