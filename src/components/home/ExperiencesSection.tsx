"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Binoculars,
  Compass,
  Globe2,
  Mountain,
  Sparkles,
  TreePine,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { experienceCategories } from "@/data/packages";
import { cn } from "@/lib/utils";

type ExperienceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  icon: LucideIcon;
};

const experiences: ExperienceItem[] = experienceCategories.map((cat) => {
  const meta: Record<string, { tag: string; icon: LucideIcon }> = {
    wildlife: { tag: "Safari", icon: Binoculars },
    adventure: { tag: "Expedition", icon: Mountain },
    culture: { tag: "Heritage", icon: Compass },
    nature: { tag: "Landscape", icon: TreePine },
    luxury: { tag: "Premium", icon: Sparkles },
    international: { tag: "Global", icon: Globe2 },
  };
  const item = meta[cat.id] ?? { tag: "Experience", icon: Compass };
  return {
    id: cat.id,
    title: cat.title,
    description: cat.description,
    image: cat.image,
    tag: item.tag,
    icon: item.icon,
  };
});

const PATH_D =
  "M 24 118 C 140 42, 260 168, 380 92 S 620 36, 740 108 S 880 152, 976 88";

const AUTO_MS = 3800;

function usePathPoints(pathRef: React.RefObject<SVGPathElement | null>, count: number) {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || count < 2) return;

    const update = () => {
      const length = path.getTotalLength();
      const next = Array.from({ length: count }, (_, index) => {
        const point = path.getPointAtLength((index / (count - 1)) * length);
        return { x: point.x, y: point.y };
      });
      setPoints(next);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathRef, count]);

  return points;
}

export default function ExperiencesSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const points = usePathPoints(pathRef, experiences.length);

  const goTo = useCallback((index: number) => {
    setActive((index + experiences.length) % experiences.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  const current = experiences[active];

  return (
    <section
      className="experiences-stage relative isolate min-h-[88svh] overflow-hidden bg-[#1a1a22]"
      aria-label="Experiences"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {experiences.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[900ms] ease-out",
            index === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== active}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={index === 0}
            className={cn(
              "object-cover transition-transform duration-[10s] ease-out",
              index === active && "experiences-stage-kenburns"
            )}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 flex min-h-[88svh] flex-col">
        <div className="section-padding flex flex-1 flex-col items-center justify-center pt-24 text-center sm:pt-28">
          <p className="label-text !text-white/60 mb-3">Experiences</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl px-2"
            >
              <h2 className="experiences-stage-title">{current.title}</h2>
              <p className="experiences-stage-body mx-auto mt-4 max-w-2xl">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="section-padding relative pb-8 pt-2 sm:pb-10 md:pb-12">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-4 flex items-end justify-between gap-4">
              <Link href="/packages/east-africa" className="experiences-stage-link">
                Explore Packages +
              </Link>
              <span className="hidden font-sans text-[10px] uppercase tracking-[0.28em] text-white/35 sm:inline">
                What Awaits You
              </span>
            </div>

            <div className="relative h-[9.5rem] w-full sm:h-[10.5rem] md:h-[11.5rem]">
              <svg
                viewBox="0 0 1000 180"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden
              >
                <path
                  ref={pathRef}
                  d={PATH_D}
                  fill="none"
                  stroke="#7C5CBF"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {points.map((point, index) => {
                const item = experiences[index];
                const isActive = index === active;
                const Icon = item.icon;
                const left = `${(point.x / 1000) * 100}%`;
                const top = `${(point.y / 180) * 100}%`;

                return (
                  <div
                    key={item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left, top }}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      onMouseEnter={() => goTo(index)}
                      className="group flex flex-col items-center"
                      aria-label={`${item.title} — ${item.tag}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "relative flex items-center justify-center rounded-full transition-all duration-500 ease-out",
                          isActive
                            ? "h-14 w-14 bg-[#7C5CBF] shadow-[0_0_0_10px_rgba(124,92,191,0.18)] sm:h-16 sm:w-16"
                            : "h-3 w-3 bg-[#7C5CBF] group-hover:h-4 group-hover:w-4"
                        )}
                      >
                        {isActive && (
                          <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={1.75} />
                        )}
                      </span>

                      <span
                        className={cn(
                          "mt-3 flex flex-col items-center text-center transition-opacity duration-300",
                          isActive
                            ? "opacity-100"
                            : "hidden opacity-70 sm:flex group-hover:opacity-100"
                        )}
                      >
                        <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-white/55 sm:text-[10px]">
                          {item.tag}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 font-sans text-[11px] font-medium leading-tight text-white sm:text-xs",
                            isActive && "text-sm sm:text-[15px]"
                          )}
                        >
                          {item.title}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/plan-your-journey"
        className="experiences-stage-fab hidden sm:flex"
        aria-label="Plan your journey"
      >
        <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
      </Link>
    </section>
  );
}
