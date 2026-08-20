import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z&\s]/g, "")
    .split(/\s+|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type Props = {
  review: Review;
  className?: string;
};

export default function ReviewSlideCard({ review, className }: Props) {
  return (
    <article
      className={cn(
        "flex h-full w-[min(85vw,340px)] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:w-[320px] md:w-[340px]",
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-terracotta/20 text-sm font-semibold text-brand-terracotta ring-2 ring-white/10">
          {initials(review.author)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-white">{review.author}</p>
          <p className="truncate text-xs text-white/50">
            {review.country}
            {review.title ? ` · ${review.title}` : ""}
          </p>
        </div>
      </div>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-white/75">
        &ldquo;{review.content}&rdquo;
      </p>

      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={15}
            className={cn(
              i < review.rating
                ? "fill-brand-terracotta text-brand-terracotta"
                : "text-white/20"
            )}
          />
        ))}
      </div>
    </article>
  );
}
