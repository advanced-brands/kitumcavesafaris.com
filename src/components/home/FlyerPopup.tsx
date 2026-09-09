"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getCurrentJourneys } from "@/data/current-journeys";
import { formatCurrency } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const FLIP_MS = 4800;

export default function FlyerPopup() {
  const journeys = useMemo(() => getCurrentJourneys(), []);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);
  const reduceMotion = useSafeReducedMotion();
  const current = journeys[active];

  const goTo = useCallback(
    (index: number) => {
      if (journeys.length === 0) return;
      setActive((index + journeys.length) % journeys.length);
    },
    [journeys.length]
  );

  useEffect(() => {
    journeys.forEach((journey) => {
      const img = new window.Image();
      img.src = journey.flyer;
    });
  }, [journeys]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || reduceMotion || journeys.length < 2) return;
    const timer = window.setInterval(() => goTo(active + 1), FLIP_MS);
    return () => window.clearInterval(timer);
  }, [active, goTo, open, reduceMotion, journeys.length]);

  if (!open || !current) return null;

  const { pkg } = current;

  return (
    <div className="flyer-popup" role="dialog" aria-modal="true" aria-labelledby="flyer-popup-title">
      <button
        type="button"
        className="flyer-popup-backdrop"
        aria-label="Close flyers and view the homepage"
        onClick={() => setOpen(false)}
      />

      <div className="flyer-popup-panel">
        <button
          type="button"
          className="flyer-popup-close"
          aria-label="Close flyers and view the homepage"
          onClick={() => setOpen(false)}
        >
          <X size={18} strokeWidth={2.25} />
        </button>

        <p id="flyer-popup-title" className="flyer-popup-kicker">
          Departures on now
        </p>

        <div className="flyer-popup-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={current.id}
              type="button"
              className="flyer-popup-card"
              onClick={() => goTo(active + 1)}
              aria-label={`Flip to the next flyer. ${pkg.name}, ${current.dates}`}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { rotateY: 88, opacity: 0.35, scale: 0.96 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { rotateY: 0, opacity: 1, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { rotateY: -88, opacity: 0.35, scale: 0.96 }
              }
              transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE_SMOOTH }}
            >
              <Image
                src={current.flyer}
                alt={`${pkg.name} — ${current.dates}`}
                fill
                className="object-contain"
                sizes="(max-width: 767px) 92vw, 480px"
                priority
              />
            </motion.button>
          </AnimatePresence>
        </div>

        <p className="flyer-popup-meta">
          {current.dates}
          <span aria-hidden> · </span>
          {formatCurrency(current.price, pkg.currency)}
        </p>

        <Link href={`/book/${pkg.slug}`} className="flyer-popup-book">
          Book now
        </Link>
      </div>
    </div>
  );
}
