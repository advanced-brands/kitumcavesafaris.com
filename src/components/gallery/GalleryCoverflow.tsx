"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { getGallerySlideSummary } from "@/lib/gallery-slide-copy";
import { EASE_SMOOTH } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

const AUTO_MS = 5200;
const SLIDE_DURATION = 0.95;

type CoverflowLayout = {
  cardWidth: number;
  cardHeight: number;
  spacing: number;
  radius: number;
  rotate: number;
  perspective: number;
};

const DEFAULT_LAYOUT: CoverflowLayout = {
  cardWidth: 260,
  cardHeight: 340,
  spacing: 148,
  radius: 2,
  rotate: 30,
  perspective: 1200,
};

/** All motion values scale from measured stage width — same proportions on every screen. */
function computeLayout(stageWidth: number): CoverflowLayout {
  const compact = stageWidth < 640;
  const cardWidth = Math.round(
    Math.min(stageWidth * (compact ? 0.56 : 0.3), compact ? 220 : 280)
  );
  const cardHeight = Math.round(cardWidth * 1.32);
  const spacing = Math.round(cardWidth * (compact ? 0.5 : 0.58));
  const radius = stageWidth < 420 ? 1 : 2;
  const rotate = compact ? 24 : 34;
  const perspective = Math.round(Math.max(stageWidth * 2.4, 900));

  return { cardWidth, cardHeight, spacing, radius, rotate, perspective };
}

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

function cardMotion(offset: number, layout: CoverflowLayout) {
  const { spacing, radius, rotate, cardWidth } = layout;
  const depthUnit = cardWidth * 0.75;
  const abs = Math.abs(offset);
  const depth = Math.min(abs, radius) / radius;
  const atFadeEdge = abs === radius + 1;

  if (offset === 0) {
    return {
      x: 0,
      rotateY: 0,
      scale: 1,
      z: depthUnit * 0.45,
      opacity: 1,
    };
  }

  return {
    x: offset * spacing,
    rotateY: offset * -(rotate + abs * 2.5),
    scale: atFadeEdge ? 0.54 : Math.max(0.58, 0.82 - abs * 0.12 - depth * 0.06),
    z: atFadeEdge ? -depthUnit * (abs + 1) : -abs * depthUnit - depthUnit * 0.35,
    opacity: atFadeEdge ? 0 : Math.max(0.22, 0.5 - abs * 0.14 - depth * 0.08),
  };
}

export default function GalleryCoverflow({ items, className }: Props) {
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState<CoverflowLayout>(DEFAULT_LAYOUT);
  const stageRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const activeRef = useRef(0);
  const reduceMotion = useSafeReducedMotion();

  activeRef.current = active;

  const slideTransition = {
    type: "tween" as const,
    duration: reduceMotion ? 0.25 : SLIDE_DURATION,
    ease: EASE_SMOOTH,
  };

  const measureStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const { width } = stage.getBoundingClientRect();
    if (width < 1) return;

    const next = computeLayout(width);
    setLayout((prev) => {
      if (
        Math.abs(prev.cardWidth - next.cardWidth) < 2 &&
        Math.abs(prev.cardHeight - next.cardHeight) < 2 &&
        prev.radius === next.radius
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    measureStage();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(measureStage);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measureStage]);

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

    const delay = reduceMotion ? AUTO_MS + 1000 : AUTO_MS;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      goNext();
    }, delay);

    return () => window.clearInterval(timer);
  }, [goNext, items.length, reduceMotion]);

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
  const slideSummary = current ? getGallerySlideSummary(current) : "";
  const stageStyle = {
    ["--card-w" as string]: `${layout.cardWidth}px`,
    ["--card-h" as string]: `${layout.cardHeight}px`,
    ["--stage-perspective" as string]: `${layout.perspective}px`,
    ["--slide-duration" as string]: `${reduceMotion ? 0.25 : SLIDE_DURATION}s`,
  };

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
          ? `Image ${active + 1} of ${items.length}: ${current.title}, ${current.location}. ${slideSummary} Gallery advances automatically.`
          : ""}
      </p>

      <div ref={stageRef} className="gallery-coverflow-stage" style={stageStyle}>
        {items
          .map((item, index) => ({
            item,
            index,
            offset: shortestOffset(index, active, items.length),
          }))
          .filter(({ offset }) => Math.abs(offset) <= layout.radius + 1)
          .sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset))
          .map(({ item, index, offset }) => {
            const isCenter = offset === 0;
            const target = cardMotion(offset, layout);

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${item.title}`}
                aria-current={isCenter ? "true" : undefined}
                aria-hidden={Math.abs(offset) > layout.radius ? true : undefined}
                tabIndex={Math.abs(offset) > layout.radius ? -1 : 0}
                initial={false}
                animate={target}
                transition={slideTransition}
                style={{ transformPerspective: layout.perspective }}
                className={cn(
                  "gallery-coverflow-card",
                  isCenter ? "gallery-coverflow-card--active" : "gallery-coverflow-card--side"
                )}
                data-depth={Math.abs(offset)}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover object-center select-none"
                  sizes={`${layout.cardWidth}px`}
                  draggable={false}
                  priority={Math.abs(offset) <= 1}
                />
              </motion.button>
            );
          })}
      </div>

      <div className="gallery-coverflow-caption">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.55,
              ease: EASE_SMOOTH,
            }}
          >
            <p className="label-text !text-brand-terracotta mb-1">{current.category}</p>
            <p className="font-serif text-lg sm:text-xl text-brand-forest">{current.title}</p>
            <p className="mt-2 max-w-md mx-auto text-sm sm:text-[0.9375rem] leading-relaxed text-brand-forest/65">
              {slideSummary}
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-brand-forest/45">
              {current.location}
            </p>
          </motion.div>
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
