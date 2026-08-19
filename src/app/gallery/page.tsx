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
    <section className="relative overflow-x-hidden bg-[#ececec] pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 min-h-[85vh]">
      <div className="mx-auto w-full max-w-[1200px] section-padding">
        <header className="mb-8 md:mb-10 text-center">
          <p className="label-text mb-3">Gallery</p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-brand-charcoal">
            Moments From the Journey
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-brand-charcoal/55">
            Wildlife, coast, culture, and the quiet details that stay with you across East Africa.
          </p>
        </header>

        <div className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={cn(
                "rounded-full px-5 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                filter === cat.id
                  ? "bg-brand-charcoal text-white"
                  : "bg-white text-brand-charcoal/75 border border-brand-charcoal/10 hover:border-brand-charcoal/25"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <GalleryCoverflow key={filter} items={filtered} />
      </div>
    </section>
  );
}
