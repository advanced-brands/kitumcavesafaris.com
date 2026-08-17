"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Package } from "@/data/packages";
import { EASE_SMOOTH, EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  packages: Package[];
};

const DISPLAY_MS = 5400;
const IRIS_DURATION = 1.45;
const DISSOLVE_DURATION = 1.2;

function displayTitle(pkg: Package) {
  const primary = pkg.destination.split(",")[0]?.trim() || pkg.name;
  return primary.toUpperCase();
}

function ConcentricRings({ activeKey, reduceMotion }: { activeKey: string; reduceMotion: boolean | null }) {
  const rings = [
    { size: 38, border: "rgba(255,255,255,0.22)" },
    { size: 52, border: "rgba(255,255,255,0.16)" },
    { size: 66, border: "rgba(255,255,255,0.11)" },
    { size: 80, border: "rgba(255,255,255,0.07)" },
    { size: 94, border: "rgba(255,255,255,0.04)" },
  ];

  return (
    <div className="packages-carousel-rings" aria-hidden>
      {rings.map((ring, index) => (
        <motion.div
          key={`${activeKey}-${ring.size}`}
          className="packages-carousel-ring"
          style={{
            width: `${ring.size}%`,
            borderColor: ring.border,
          }}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0.25 : 0.95,
            delay: reduceMotion ? 0 : 0.38 + index * 0.06,
            ease: EASE_SOFT,
          }}
        />
      ))}
    </div>
  );
}

export default function FeaturedPackagesSection({ packages }: Props) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    packages.forEach((pkg) => {
      const img = new window.Image();
      img.src = pkg.heroImage;
    });
  }, [packages]);

  useEffect(() => {
    if (packages.length < 2) return;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % packages.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(timer);
  }, [packages.length, reduceMotion]);

  if (packages.length === 0) return null;

  const current = packages[active];

  return (
    <section id="packages" className="section-padding section-spacing bg-brand-sand">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-text mb-4">Featured Journeys</p>
            <h2 className="heading-section text-brand-forest">Curated Packages</h2>
          </div>
          <Link
            href="/packages/east-africa"
            className="text-sm font-medium uppercase tracking-wider text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
          >
            View All Packages &rarr;
          </Link>
        </div>

        <div className="packages-carousel">
          <div className="packages-carousel-frame">
            <div className="packages-carousel-stage">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="packages-carousel-slide-wrap"
                  initial={
                    reduceMotion
                      ? { opacity: 0, zIndex: 2 }
                      : {
                          clipPath: "circle(0% at 50% 46%)",
                          opacity: 1,
                          zIndex: 2,
                        }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1, zIndex: 2 }
                      : {
                          clipPath: "circle(150% at 50% 46%)",
                          opacity: 1,
                          zIndex: 2,
                        }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0, zIndex: 1 }
                      : { opacity: 0, zIndex: 1 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0.35, ease: EASE_SMOOTH }
                      : {
                          clipPath: { duration: IRIS_DURATION, ease: EASE_SOFT },
                          opacity: { duration: DISSOLVE_DURATION, ease: EASE_SMOOTH },
                        }
                  }
                >
                  <Link
                    href={`/packages/${current.slug}`}
                    className="packages-carousel-slide group"
                    aria-label={`View ${current.name}`}
                  >
                    <motion.div
                      className="packages-carousel-media"
                      initial={reduceMotion ? false : { scale: 1.07 }}
                      animate={reduceMotion ? undefined : { scale: 1 }}
                      transition={{
                        duration: IRIS_DURATION + 0.15,
                        ease: EASE_SOFT,
                      }}
                    >
                      <Image
                        src={current.heroImage}
                        alt=""
                        fill
                        priority={active === 0}
                        className="packages-carousel-image object-cover"
                        sizes="(max-width: 1024px) 100vw, 1200px"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/24" />
                    <ConcentricRings activeKey={current.id} reduceMotion={reduceMotion} />

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                      <motion.div
                        key={`copy-${current.id}`}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0.3 : 0.7,
                          delay: reduceMotion ? 0 : 0.48,
                          ease: EASE_SMOOTH,
                        }}
                      >
                        <h3 className="packages-carousel-destination">{displayTitle(current)}</h3>
                        <p className="packages-carousel-region">{current.country}</p>
                      </motion.div>
                    </div>
                  </Link>

                  {!reduceMotion && (
                    <motion.div
                      className="packages-carousel-dissolve"
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 1 }}
                      transition={{ duration: DISSOLVE_DURATION, ease: EASE_SMOOTH }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="packages-carousel-progress" aria-hidden>
              <motion.div
                className="packages-carousel-progress-fill"
                animate={{ width: `${((active + 1) / packages.length) * 100}%` }}
                transition={{ duration: 0.65, ease: EASE_SMOOTH }}
              />
            </div>

            <div className="packages-carousel-dots">
              {packages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "packages-carousel-dot",
                    index === active && "packages-carousel-dot--active"
                  )}
                  aria-label={`Show ${pkg.name}`}
                  aria-current={index === active ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
