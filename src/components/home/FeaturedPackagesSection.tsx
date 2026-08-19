"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Package } from "@/data/packages";
import {
  getPackageExpectations,
  PACKAGES_SCENE_IMAGE,
  PACKAGES_SCENE_OBJECT_POSITION,
} from "@/lib/package-highlights";
import { EASE_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  packages: Package[];
};

const AUTO_MS = 7200;

function displayDestination(pkg: Package) {
  const primary = pkg.destination.split(",")[0]?.trim() || pkg.name;
  return primary.toUpperCase();
}

export default function FeaturedPackagesSection({ packages }: Props) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      if (!packages.length) return;
      setActive((index + packages.length) % packages.length);
    },
    [packages.length]
  );

  useEffect(() => {
    packages.forEach((pkg) => {
      pkg.galleryImages.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, [packages]);

  useEffect(() => {
    if (packages.length < 2 || reduceMotion) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((current) => (current + 1) % packages.length);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [packages.length, reduceMotion]);

  if (packages.length === 0) return null;

  const current = packages[active];
  const expectations = getPackageExpectations(current);
  const railCount = packages.length;

  return (
    <section id="packages" className="bg-brand-sand pb-8 md:pb-10">
      <div className="section-padding mx-auto max-w-[1200px] pb-3 md:pb-4">
        <div className="mb-3 flex flex-col gap-2 md:mb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="heading-section text-brand-forest">Curated Packages</h2>
          </div>
          <Link
            href="/packages/east-africa"
            className="text-sm font-medium uppercase tracking-wider text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
          >
            View All Packages &rarr;
          </Link>
        </div>
      </div>

      <div className="section-padding mx-auto max-w-[1200px]">
        <div
          className="packages-glass-scene"
          aria-label="Featured safari packages"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              pausedRef.current = false;
            }
          }}
        >
          <div className="packages-glass-media" aria-hidden>
            <Image
              src={PACKAGES_SCENE_IMAGE}
              alt=""
              fill
              priority
              quality={92}
              className="packages-glass-image object-cover packages-glass-image--mountain"
              style={{ objectPosition: PACKAGES_SCENE_OBJECT_POSITION }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="packages-glass-scrim" />
          </div>

          <div className="packages-glass-stage">
            <div className="packages-glass-card">
              <nav
                className="packages-glass-rail"
                aria-label="Package slides"
                style={{ "--rail-count": railCount } as CSSProperties}
              >
                <span className="packages-glass-rail-line" aria-hidden />
                {packages.map((pkg, index) => {
                  const isActive = index === active;
                  const position =
                    railCount <= 1 ? 50 : (index / (railCount - 1)) * 100;

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={cn(
                        "packages-glass-rail-dot",
                        isActive && "packages-glass-rail-dot--active"
                      )}
                      style={{ top: `${position}%` }}
                      aria-label={`Show ${pkg.name}`}
                      aria-current={isActive ? "true" : undefined}
                    />
                  );
                })}
              </nav>

              <div className="packages-glass-body">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    className="packages-glass-main"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: EASE_SOFT }}
                  >
                    <div className="packages-glass-hero">
                      <div className="packages-glass-copy">
                        <p className="packages-glass-eyebrow">
                          {current.country} · {current.duration}
                        </p>
                        <h3 className="packages-glass-title">{displayDestination(current)}</h3>
                        <p className="packages-glass-description">{current.shortDescription}</p>
                      </div>
                      <Link href={`/packages/${current.slug}`} className="packages-glass-cta">
                        Explore
                      </Link>
                    </div>

                    <div className="packages-glass-expectations">
                      <p className="packages-glass-expectations-label">What to expect</p>
                      <div className="packages-glass-expectations-grid">
                        {expectations.map((item, index) => (
                          <article key={`${current.id}-${index}`} className="packages-glass-expect-card">
                            <div className="packages-glass-expect-media">
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="200px"
                              />
                            </div>
                            <div className="packages-glass-expect-copy">
                              <h4 className="packages-glass-expect-title">{item.title}</h4>
                              <p className="packages-glass-expect-caption">{item.caption}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
