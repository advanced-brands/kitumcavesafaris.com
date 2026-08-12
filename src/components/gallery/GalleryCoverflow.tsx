"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

type Props = {
  items: GalleryItem[];
  className?: string;
};

type FlipEvent = { data: number };

type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
};

type FlipBookHandle = {
  pageFlip: () => PageFlipApi;
};

const BookPage = forwardRef<
  HTMLDivElement,
  {
    src: string;
    side: "left" | "right";
    alt: string;
  }
>(function BookPage({ src, side, alt }, ref) {
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-black" data-density="soft">
      <div
        className="absolute inset-y-0"
        style={{
          width: "200%",
          left: side === "right" ? "-100%" : "0%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          draggable={false}
        />
      </div>
    </div>
  );
});

export default function GalleryCoverflow({ items, className }: Props) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ width: 1200, height: 680 });
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [items]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const stageW = el.clientWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const arrowReserve = vw < 480 ? 48 : vw < 768 ? 72 : 96;
      const maxW = Math.max(300, Math.min(stageW - arrowReserve, 1680));

      const heightRatio = vw < 480 ? 0.58 : vw < 1024 ? 0.64 : 0.72;
      const maxH = vw < 480 ? 480 : vw < 1024 ? 720 : 900;
      const targetH = Math.min(Math.round(vh * heightRatio), maxH);

      const aspect = 1.85;
      let width = maxW;
      let height = Math.round(width / aspect);
      if (height > targetH) {
        height = targetH;
        width = Math.round(height * aspect);
      }

      setDims({
        width: Math.max(300, Math.round(width)),
        height: Math.max(200, Math.round(height)),
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const pageW = Math.round(dims.width / 2);
  const pageH = dims.height;
  const current = items[active] ?? items[0];

  const pages = useMemo(() => {
    return items.flatMap((item) => [
      {
        key: `${item.id}-L`,
        src: item.src,
        side: "left" as const,
        alt: item.caption,
      },
      {
        key: `${item.id}-R`,
        src: item.src,
        side: "right" as const,
        alt: item.caption,
      },
    ]);
  }, [items]);

  const onFlip = useCallback(
    (e: FlipEvent) => {
      const spreadIndex = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(e.data / 2))
      );
      setActive(spreadIndex);
    },
    [items.length]
  );

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

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

  return (
    <div className={cn("relative isolate w-full", className)}>
      <div ref={stageRef} className="relative w-full px-0 sm:px-2 md:px-4 pt-2 sm:pt-4 pb-2">
        <div className="relative mx-auto flex w-full max-w-[1720px] items-center justify-center gap-1 sm:gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="z-40 shrink-0 rounded-full bg-brand-forest/90 p-2.5 sm:p-3 text-white shadow-lg transition hover:bg-brand-forest"
            aria-label="Turn page back"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.6} />
          </button>

          <div
            className="relative shrink-0 overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(18,40,30,0.22)]"
            style={{ width: dims.width, maxWidth: "100%" }}
          >
            <div className="relative bg-black" style={{ height: pageH }}>
              {!mounted ? (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
                  Loading gallery…
                </div>
              ) : (
                <HTMLFlipBook
                  key={`${items.length}-${items[0]?.id ?? "book"}-${pageW}-${pageH}`}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref={bookRef as any}
                  width={pageW}
                  height={pageH}
                  size="stretch"
                  minWidth={140}
                  maxWidth={860}
                  minHeight={180}
                  maxHeight={920}
                  drawShadow={false}
                  flippingTime={1600}
                  usePortrait={false}
                  startPage={0}
                  autoSize
                  maxShadowOpacity={0}
                  showCover={false}
                  mobileScrollSupport
                  clickEventForward
                  useMouseEvents
                  swipeDistance={36}
                  showPageCorners
                  disableFlipByClick={false}
                  className="gallery-flipbook"
                  style={{ width: "100%", height: "100%" }}
                  startZIndex={0}
                  onFlip={onFlip}
                  onChangeState={(e: { data: string }) => {
                    setFlipping(
                      e.data === "flipping" || e.data === "user_fold"
                    );
                  }}
                >
                  {pages.map((page) => (
                    <BookPage
                      key={page.key}
                      src={page.src}
                      side={page.side}
                      alt={page.alt}
                    />
                  ))}
                </HTMLFlipBook>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="z-40 shrink-0 rounded-full bg-brand-forest/90 p-2.5 sm:p-3 text-white shadow-lg transition hover:bg-brand-forest"
            aria-label="Turn page forward"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.6} />
          </button>
        </div>

        <div className="mx-auto mt-6 md:mt-8 max-w-3xl px-4 text-center min-h-[6.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="label-text !text-brand-terracotta mb-2">
                  {current.category}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-forest leading-tight">
                  {current.title}
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-brand-forest/45">
                  {current.location}
                </p>
                <p className="mt-3 text-sm sm:text-base text-brand-forest/70 font-light leading-relaxed">
                  {current.summary}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 pb-4 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-forest/40">
            {active + 1} of {items.length}
            {flipping ? " · turning…" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
