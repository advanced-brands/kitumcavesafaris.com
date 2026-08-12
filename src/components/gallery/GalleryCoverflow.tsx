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
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden bg-[#f4efe6]"
      data-density="soft"
    >
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
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 55vw, 700px"
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
  const [dims, setDims] = useState({ width: 1100, height: 620 });
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

      // Nearly full stage width; keep a little room for arrows
      const arrowReserve = vw < 640 ? 56 : vw < 900 ? 88 : 120;
      const maxW = Math.max(280, Math.min(stageW - arrowReserve, 1480));

      // Book takes most of the viewport height on every screen
      const targetH = Math.min(
        Math.round(vh * (vw < 640 ? 0.52 : vw < 1024 ? 0.58 : 0.66)),
        vw < 640 ? 420 : vw < 1024 ? 640 : 780
      );

      const aspect = 1.78;
      let width = maxW;
      let height = Math.round(width / aspect);
      if (height > targetH) {
        height = targetH;
        width = Math.round(height * aspect);
      }
      if (width > maxW) {
        width = maxW;
        height = Math.round(width / aspect);
      }

      setDims({
        width: Math.max(280, Math.round(width)),
        height: Math.max(190, Math.round(height)),
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
      <div ref={stageRef} className="relative w-full px-1 sm:px-2 md:px-4 pt-4 sm:pt-6 pb-2">
        <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-center gap-1 sm:gap-2 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="z-40 shrink-0 rounded-full bg-brand-forest p-2 sm:p-2.5 md:p-3 text-white shadow-md transition hover:bg-brand-forest/90"
            aria-label="Turn page back"
          >
            <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.6} />
          </button>

          <div
            className="relative shrink-0"
            style={{ width: dims.width, maxWidth: "100%" }}
          >
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] -bottom-1 h-6 rounded-[100%] bg-black/20 blur-lg"
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-[2px] sm:rounded-sm"
              style={{
                background: "#faf6ef",
                boxShadow:
                  "0 16px 36px rgba(18, 40, 30, 0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
                padding: "5px",
                border: "1px solid rgba(27, 61, 47, 0.14)",
              }}
            >
              <div
                className="relative overflow-hidden bg-[#f3ebe0]"
                style={{ height: pageH }}
              >
                {!mounted ? (
                  <div className="flex h-full w-full items-center justify-center text-sm text-brand-forest/40">
                    Opening book…
                  </div>
                ) : (
                  <HTMLFlipBook
                    key={`${items.length}-${items[0]?.id ?? "book"}-${pageW}-${pageH}`}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ref={bookRef as any}
                    width={pageW}
                    height={pageH}
                    size="stretch"
                    minWidth={120}
                    maxWidth={780}
                    minHeight={160}
                    maxHeight={860}
                    drawShadow={false}
                    flippingTime={1800}
                    usePortrait={false}
                    startPage={0}
                    autoSize
                    maxShadowOpacity={0}
                    showCover={false}
                    mobileScrollSupport
                    clickEventForward
                    useMouseEvents
                    swipeDistance={40}
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
          </div>

          <button
            type="button"
            onClick={goNext}
            className="z-40 shrink-0 rounded-full bg-brand-forest p-2 sm:p-2.5 md:p-3 text-white shadow-md transition hover:bg-brand-forest/90"
            aria-label="Turn page forward"
          >
            <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.6} />
          </button>
        </div>

        <div className="mx-auto mt-7 md:mt-9 max-w-2xl px-4 text-center min-h-[7rem]">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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
                <div className="mx-auto mt-4 mb-3 h-px w-14 bg-brand-forest/25" />
                <p className="text-sm sm:text-base md:text-lg text-brand-forest/75 font-light leading-relaxed">
                  {current.summary}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 pb-6 flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-forest/40">
            Spread {active + 1} of {items.length}
            {flipping ? " · turning…" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
