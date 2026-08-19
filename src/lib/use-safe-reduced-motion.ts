"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer Motion reads the reduced-motion media query during the first render,
 * but the prerendered HTML is always built with it off. A visitor who has the
 * setting enabled would therefore hydrate a different tree than was served and
 * React would throw away the markup. Reporting false until after hydration
 * keeps that first render in agreement with the HTML, then the real preference
 * takes effect on the next render.
 */
export function useSafeReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated && Boolean(prefersReducedMotion);
}
