import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

type Props = {
  review: Review;
  className?: string;
};

export default function ReviewCard({ review, className }: Props) {
  return (
    <article
      className={cn(
        "border border-brand-sand-dark bg-white p-5 md:p-6 flex flex-col h-full",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="font-serif text-lg text-brand-forest">{review.author}</h3>
        <p className="text-xs text-brand-charcoal/50">{review.country}</p>
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

      <p className="text-xs text-brand-charcoal/40 mt-4">
        {new Date(review.date).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </article>
  );
}
