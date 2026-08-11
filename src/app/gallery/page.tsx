"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/gallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const sizeClass: Record<string, string> = {
    small: "md:col-span-1 md:row-span-1 aspect-square",
    medium: "md:col-span-1 md:row-span-1 aspect-[4/5]",
    large: "md:col-span-2 md:row-span-2 aspect-square",
    wide: "md:col-span-2 md:row-span-1 aspect-[2/1]",
    tall: "md:col-span-1 md:row-span-2 aspect-[3/4]",
  };

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Gallery</p>
          <h1 className="heading-display text-white mb-4">Moments From the Journey</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Photography from Uganda and East Africa — wildlife, landscapes, culture, and the quiet details that stay with you.
          </p>
        </div>
      </section>

      <section className="section-padding py-8 bg-brand-sand border-b border-brand-sand-dark sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setLightboxIndex(null);
              }}
              className={cn(
                "px-4 py-2 text-sm uppercase tracking-wider transition-colors",
                filter === cat.id
                  ? "bg-brand-forest text-white"
                  : "bg-white text-brand-charcoal hover:bg-brand-forest/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 auto-rows-auto">
            {filtered.map((item, i) => (
              <ScrollReveal
                key={item.id}
                delay={Math.min(i * 40, 400)}
                className={cn("relative overflow-hidden group cursor-pointer", sizeClass[item.size])}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="absolute inset-0 w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-brand-forest focus:ring-inset"
                  aria-label={`View ${item.caption}`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium">{item.caption}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-brand-forest-dark/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white p-2 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white p-2 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
          <div className="relative w-full max-w-5xl mx-4 aspect-[4/3] md:aspect-[16/10]">
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].caption}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <p className="absolute bottom-8 left-0 right-0 text-center text-white/90 text-sm md:text-base px-4">
            {filtered[lightboxIndex].caption}
          </p>
        </div>
      )}
    </>
  );
}
