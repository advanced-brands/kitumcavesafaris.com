import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import type { Review } from "@/data/reviews";
import { reviewSources } from "@/data/reviews";
import { cn } from "@/lib/utils";

type Props = {
  review: Review;
  className?: string;
};

export default function ReviewCard({ review, className }: Props) {
  const source = reviewSources[review.source];

  return (
    <article
      className={cn(
        "border border-brand-sand-dark bg-white p-5 md:p-6 flex flex-col h-full",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-lg text-brand-forest">{review.author}</h3>
            {review.verified && (
              <BadgeCheck size={16} className="text-brand-forest shrink-0" aria-label="Verified review" />
            )}
          </div>
          <p className="text-xs text-brand-charcoal/50">{review.country}</p>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] uppercase tracking-wider text-white px-2 py-1",
            source.color
          )}
        >
          {source.label}
        </span>
      </div>

      <div className="flex gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              i < review.rating
                ? "fill-brand-terracotta text-brand-terracotta"
                : "text-brand-sand-dark"
            )}
          />
        ))}
      </div>

      {review.title && (
        <h4 className="font-medium text-brand-forest mb-2">{review.title}</h4>
      )}
      <p className="text-sm text-brand-charcoal/75 leading-relaxed flex-1">
        {review.content}
      </p>

      {review.photo && (
        <div className="relative aspect-[16/10] mt-4 overflow-hidden">
          <Image
            src={review.photo}
            alt={`Photo from ${review.author}'s trip`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}

      <p className="text-xs text-brand-charcoal/40 mt-4">
        {new Date(review.date).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </article>
  );
}
