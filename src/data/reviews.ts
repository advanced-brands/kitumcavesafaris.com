export type ReviewSource = "guest";

export type Review = {
  id: string;
  author: string;
  country: string;
  rating: number;
  title: string;
  content: string;
  source: ReviewSource;
  packageSlug?: string;
  date: string;
};

export const reviewSources: Record<
  ReviewSource,
  { label: string; color: string }
> = {
  guest: { label: "Guest", color: "bg-brand-forest" },
};

/** Guest stories collected by the team — not third-party platform listings. */
export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sarah M.",
    country: "United Kingdom",
    rating: 5,
    title: "Life-changing gorilla encounter",
    content:
      "Kitum Cave Safaris made our gorilla trek seamless from Entebbe to Bwindi. Our guide was knowledgeable, the lodges were comfortable, and the hour with the gorillas was unforgettable. Communication on WhatsApp was quick and clear throughout.",
    source: "guest",
    date: "2025-11-12",
    packageSlug: "3-days-gorilla-safari",
  },
  {
    id: "r2",
    author: "James & Linda K.",
    country: "United States",
    rating: 5,
    title: "Professional, warm, and well organised",
    content:
      "We booked a custom East Africa itinerary and felt cared for every step. Partial payment was easy, the team sent a clear receipt, and our driver-guide went above and beyond. Highly recommend for first-time safari travelers.",
    source: "guest",
    date: "2025-10-03",
  },
  {
    id: "r3",
    author: "David O.",
    country: "Kenya",
    rating: 5,
    title: "Excellent for regional travelers too",
    content:
      "Paid via mobile money without any hassle. The Mara extension was perfectly timed and the pricing in KES was clearly explained upfront. Genuine local expertise — not a generic tour operator.",
    source: "guest",
    date: "2025-09-18",
    packageSlug: "kenya-masai-mara-safari",
  },
  {
    id: "r4",
    author: "Emma R.",
    country: "Germany",
    rating: 5,
    title: "Zanzibar add-on was the perfect finish",
    content:
      "After our Uganda safari we flew to Zanzibar through Kitum's arrangement. Beach lodge, dhow trip, and airport transfers all worked smoothly. Paying in EUR was quoted clearly before we committed.",
    source: "guest",
    date: "2025-08-22",
    packageSlug: "5-days-zanzibar-trip",
  },
  {
    id: "r5",
    author: "Michael T.",
    country: "Australia",
    rating: 4,
    title: "Transparent about what's included",
    content:
      "Appreciated the detailed itinerary, packing list, and cancellation terms before we paid the deposit. The Murchison Falls boat cruise was a highlight. Would book again for Tanzania.",
    source: "guest",
    date: "2025-07-05",
    packageSlug: "murchison-falls-adventure",
  },
  {
    id: "r6",
    author: "Grace N.",
    country: "Uganda",
    rating: 5,
    title: "Responsive on WhatsApp",
    content:
      "As a local traveler I wanted a premium weekend escape. They responded within minutes on WhatsApp, sent mobile money payment instructions, and delivered exactly what was promised.",
    source: "guest",
    date: "2025-06-14",
  },
];

export function getReviewsForPackage(slug: string) {
  return reviews.filter((r) => r.packageSlug === slug);
}

export function getAverageRating() {
  if (!reviews.length) return 0;
  return (
    Math.round(
      (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10
    ) / 10
  );
}
