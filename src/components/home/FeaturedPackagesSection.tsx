"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Package } from "@/data/packages";
import { cn } from "@/lib/utils";

type Props = {
  packages: Package[];
};

const AUTO_MS = 3600;

function displayTitle(pkg: Package) {
  const primary = pkg.destination.split(",")[0]?.trim() || pkg.name;
  return primary.toUpperCase();
}

function ConcentricRings() {
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
          key={ring.size}
          className="packages-carousel-ring"
          style={{
            width: `${ring.size}%`,
            borderColor: ring.border,
          }}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
        />
      ))}
    </div>
  );
}

export default function FeaturedPackagesSection({ packages }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (packages.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % packages.length);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [packages.length]);

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
                  initial={{
                    clipPath: "circle(0% at 50% 46%)",
                    scale: 1.04,
                  }}
                  animate={{
                    clipPath: "circle(150% at 50% 46%)",
                    scale: 1,
                    filter: "blur(0px)",
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.88,
                    filter: "blur(10px)",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.95,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={`/packages/${current.slug}`}
                    className="packages-carousel-slide group"
                    aria-label={`View ${current.name}`}
                  >
                    <Image
                      src={current.heroImage}
                      alt=""
                      fill
                      priority
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-black/24" />
                    <ConcentricRings />

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current.id}
                          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                          transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                        >
                          <h3 className="packages-carousel-destination">{displayTitle(current)}</h3>
                          <p className="packages-carousel-region">{current.country}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="packages-carousel-progress" aria-hidden>
              <motion.div
                className="packages-carousel-progress-fill"
                animate={{ width: `${((active + 1) / packages.length) * 100}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
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
