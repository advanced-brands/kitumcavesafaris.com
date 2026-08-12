"use client";

import { useState } from "react";
import { galleryItems, galleryCategories } from "@/data/gallery";
import GalleryCoverflow from "@/components/gallery/GalleryCoverflow";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <>
      <section className="relative bg-brand-forest pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="section-padding max-w-[1720px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-3">Gallery</p>
          <h1 className="heading-display text-white mb-3">
            Moments From the Journey
          </h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Turn the page through East Africa — wildlife, coast, culture, and the
            quiet details that stay with you.
          </p>

          <div className="mt-5 md:mt-7 flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs sm:text-sm uppercase tracking-wider transition-colors",
                  filter === cat.id
                    ? "bg-brand-terracotta text-white"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-brand-cream py-4 sm:py-6 md:py-8 min-h-[70vh]">
        <div className="mx-auto w-full max-w-[1720px] px-1 sm:px-3 md:px-5">
          <GalleryCoverflow key={filter} items={filtered} />
        </div>
      </section>
    </>
  );
}
