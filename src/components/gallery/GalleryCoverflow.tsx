"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

const AUTO_MS = 5200;
const VISIBLE_RADIUS = 4;

/** Soft spring — no bounce, glides into place */
const COVERFLOW_SPRING = {
  type: "spring" as const,
  stiffness: 148,
  damping: 32,
  mass: 1.05,
  restSpeed: 0.08,
  restDelta: 0.0008,
};

const FADE_SPRING = {
  type: "spring" as const,
  stiffness: 120,
  damping: 28,
  mass: 1,
};

type Props = {
  items: GalleryItem[];
  className?: string;
};

function wrap(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

function shortestOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (total <= 1) return 0;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function cardMotion(offset: number, spacing: number) {
  const abs = Math.abs(offset);
  const t = Math.min(abs, VISIBLE_RADIUS) / VISIBLE_RADIUS;

  return {
    x: offset * spacing,
    rotateY: offset * -22,
    scale: 1 - t * 0.11,
    z: -abs * 95,
    opacity: 1 - t * 0.22,
    filter: `brightness(${1 - t * 0.08})`,
    zIndex: 30 - abs,
  };
}

export default function GalleryCoverflow({ items, className }: Props) {
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(128);
  const pausedRef = useRef(false);
  const activeRef = useRef(0);

  activeRef.current = active;

  useEffect(() => {
    const update = () => setSpacing(window.innerWidth >= 768 ? 148 : 98);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActive(0);
    activeRef.current = 0;
  }, [items]);

  const goTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      const next = wrap(index, items.length);
      setActive(next);
      activeRef.current = next;
    },
    [items.length]
  );

  const goNext = useCallback(() => {
    goTo(activeRef.current + 1);
  }, [goTo]);

  const goPrev = useCallback(() => {
    goTo(activeRef.current - 1);
  }, [goTo]);

  useEffect(() => {
    if (items.length < 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? AUTO_MS + 1000 : AUTO_MS;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      goNext();
    }, delay);

    return () => window.clearInterval(timer);
  }, [goNext, items.length]);

  useEffect(() => {
    if (items.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, items.length]);

  if (!items.length) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-brand-forest/60">
        No images in this category yet.
      </div>
    );
  }

  const current = items[active];

  return (
    <div
      className={cn("gallery-coverflow", className)}
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
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        window.setTimeout(() => {
          pausedRef.current = false;
        }, AUTO_MS);
      }}
    >
      <p className="sr-only" aria-live="polite">
        {current
          ? `Image ${active + 1} of ${items.length}: ${current.title}, ${current.location}. Gallery advances automatically.`
          : ""}
      </p>

      <div className="gallery-coverflow-stage">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            const offset = shortestOffset(index, active, items.length);
            if (Math.abs(offset) > VISIBLE_RADIUS) return null;

            const isCenter = offset === 0;
            const target = cardMotion(offset, spacing);

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${item.title}`}
                aria-current={isCenter ? "true" : undefined}
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  rotateY: offset * -22,
                  x: offset * spacing,
                  z: -Math.abs(offset) * 95 - 40,
                }}
                animate={target}
                exit={{
                  opacity: 0,
                  scale: 0.84,
                  z: -420,
                  transition: FADE_SPRING,
                }}
                transition={COVERFLOW_SPRING}
                className={cn(
                  "gallery-coverflow-card",
                  isCenter ? "gallery-coverflow-card--active" : "gallery-coverflow-card--side"
                )}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover object-center select-none"
                  sizes="(max-width: 768px) 55vw, 320px"
                  draggable={false}
                  priority={Math.abs(offset) <= 1}
                />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="gallery-coverflow-caption">
        <AnimatePresence mode="sync" initial={false}>
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <p className="label-text !text-brand-terracotta mb-1">{current.category}</p>
              <p className="font-serif text-lg sm:text-xl text-brand-forest">{current.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-forest/45">
                {current.location}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="gallery-coverflow-nav">
        <button
          type="button"
          onClick={goPrev}
          className="gallery-coverflow-nav-btn"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="gallery-coverflow-nav-btn"
          aria-label="Next image"
        >
          <ChevronRight size={22} strokeWidth={1.75} />
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] text-brand-forest/35">
        {active + 1} of {items.length} · advances automatically
      </p>
    </div>
  );
}
