"use client";

import { useLayoutEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("revealed");
    };

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionClasses = {
    up: "translate-y-3",
    left: "-translate-x-3",
    right: "translate-x-3",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reveal opacity-0",
        directionClasses[direction],
        "[&.revealed]:opacity-100 [&.revealed]:translate-x-0 [&.revealed]:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
