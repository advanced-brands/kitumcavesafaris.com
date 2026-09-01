"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  editorialGalleryItems,
  fieldNotebookItems,
  galleryCategories,
  itemsForEssay,
  photoEssays,
  type GalleryItem,
} from "@/data/gallery";
import GalleryCoverflow from "@/components/gallery/GalleryCoverflow";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [essayId, setEssayId] = useState<string | null>(photoEssays[0]?.id ?? null);

  const editorial = useMemo(() => editorialGalleryItems(), []);
  const notebook = useMemo(() => fieldNotebookItems(), []);
  const activeEssay = photoEssays.find((essay) => essay.id === essayId) ?? photoEssays[0];
  const essayFrames = activeEssay ? itemsForEssay(activeEssay) : [];

  const filteredEditorial =
    filter === "all"
      ? editorial
      : editorial.filter((item) => item.category === filter);

  return (
    <div className="journal-gallery bg-brand-cream pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
      <header className="section-padding mx-auto max-w-[1200px] mb-10 md:mb-14">
        <p className="label-text mb-3">Field photographs</p>
        <h1 className="heading-display text-brand-forest mb-4">The Kitum Journal</h1>
        <p className="body-large max-w-2xl">
          Named frames from Uganda, Kenya, Tanzania, Rwanda, and Zanzibar — sequenced
          as photo essays, not a dump of every shutter click.
        </p>
        <p className="mt-3 text-sm text-brand-charcoal/50">
          {editorial.length} edited photographs · {photoEssays.length} essays ·{" "}
          {notebook.length} field-notebook frames in the archive
        </p>
      </header>

      {activeEssay && (
        <section className="section-padding mx-auto max-w-[1200px] mb-14 md:mb-20">
          <div className="flex flex-wrap gap-2 mb-8">
            {photoEssays.map((essay) => (
              <button
                key={essay.id}
                type="button"
                onClick={() => setEssayId(essay.id)}
                aria-pressed={essay.id === activeEssay.id}
                className={cn(
                  "rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                  essay.id === activeEssay.id
                    ? "bg-brand-forest text-brand-cream"
                    : "bg-white text-brand-charcoal/70 border border-brand-sand-dark hover:border-brand-forest/30"
                )}
              >
                {essay.title.split(":")[0]}
              </button>
            ))}
          </div>

          <article className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-brand-sand">
              <Image
                src={activeEssay.coverSrc}
                alt={activeEssay.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <p className="label-text mb-3">{activeEssay.location}</p>
              <h2 className="heading-section text-brand-forest mb-4">{activeEssay.title}</h2>
              <p className="body-text mb-8">{activeEssay.dek}</p>
              <ol className="space-y-3">
                {essayFrames.slice(0, 6).map((item, index) => (
                  <li key={item.id} className="flex gap-3 text-sm text-brand-charcoal/70">
                    <span className="font-serif text-brand-forest w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="text-brand-forest">{item.title}</span>
                      <span className="block text-brand-charcoal/50">{item.summary}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          <div className="journal-gallery-strip mt-8">
            {essayFrames.map((item) => (
              <figure key={item.id} className="journal-gallery-strip-item">
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-sand">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-brand-charcoal/55 leading-snug">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="section-padding mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="label-text mb-2">Edited collection</p>
            <h2 className="heading-sub text-brand-forest">Photographs with names</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                  filter === cat.id
                    ? "bg-brand-charcoal text-white"
                    : "bg-white text-brand-charcoal/70 border border-brand-sand-dark hover:border-brand-charcoal/25"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="journal-gallery-masonry">
          {filteredEditorial.map((item) => (
            <GalleryTile key={item.id} item={item} />
          ))}
        </div>
      </section>

      {notebook.length > 0 && (
        <section className="mt-16 md:mt-24">
          <div className="section-padding mx-auto max-w-[1200px] mb-8 text-center">
            <p className="label-text mb-2">Field notebook</p>
            <h2 className="heading-sub text-brand-forest mb-3">The rest of the road</h2>
            <p className="body-text max-w-xl mx-auto">
              Uncaptioned working frames from the vehicle — browse, don&apos;t catalogue.
            </p>
          </div>
          <div className="section-padding mx-auto max-w-[1200px]">
            <GalleryCoverflow items={notebook} />
          </div>
        </section>
      )}
    </div>
  );
}

function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <figure className="journal-gallery-tile">
      <div
        className={cn(
          "relative overflow-hidden bg-brand-sand",
          item.size === "tall" ? "aspect-[3/4]" : item.size === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"
        )}
      >
        <Image
          src={item.src}
          alt={item.caption}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <figcaption className="pt-3 pb-8">
        <p className="font-serif text-brand-forest text-[0.95rem] leading-snug">{item.title}</p>
        <p className="text-xs text-brand-charcoal/50 mt-1">
          {item.location} · {item.summary}
        </p>
      </figcaption>
    </figure>
  );
}
