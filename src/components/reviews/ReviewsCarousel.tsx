"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/data/reviews";
import ReviewSlideCard from "@/components/reviews/ReviewSlideCard";
import { cn } from "@/lib/utils";

type Props = {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  className?: string;
};

const AUTO_MS = 4500;

export default function ReviewsCarousel({
  reviews,
  title = "Customer Experiences",
  subtitle = "Words from guests who traveled with our team. If you have been on a journey with us, we would like yours here too.",
  showCta = true,
  className,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const loop = [...reviews, ...reviews];

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 364;
    const card = track.querySelector("article");
    if (!card) return 364;
    const gap = 24;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const scrollByStep = useCallback(
    (direction: 1 | -1, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;

      const step = getStep() * direction;
      if (direction === -1 && track.scrollLeft <= 4) {
        track.scrollLeft += track.scrollWidth / 2;
      }
      track.scrollBy({ left: step, behavior: smooth ? "smooth" : "auto" });

      window.setTimeout(() => {
        if (!trackRef.current) return;
        const el = trackRef.current;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half - 4) {
          el.scrollLeft -= half;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }, smooth ? 520 : 0);
    },
    [getStep]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = 0;
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) scrollByStep(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [scrollByStep]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#070d0a] py-16 md:py-24 lg:py-28",
        className
      )}
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,61,47,0.35),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1600px] section-padding">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
            {subtitle}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((review, i) => (
            <ReviewSlideCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/40 bg-brand-terracotta/10 text-brand-terracotta shadow-[0_0_24px_rgba(196,112,75,0.35)] transition-all hover:scale-105 hover:bg-brand-terracotta/20"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-terracotta/40 bg-brand-terracotta/10 text-brand-terracotta shadow-[0_0_24px_rgba(196,112,75,0.35)] transition-all hover:scale-105 hover:bg-brand-terracotta/20"
              aria-label="Next reviews"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {showCta && (
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Read All Reviews
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
