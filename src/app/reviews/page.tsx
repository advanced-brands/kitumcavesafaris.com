"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { openMailto } from "@/lib/mailto";
import { reviews, getAverageRating } from "@/data/reviews";
import ReviewsCarousel from "@/components/reviews/ReviewsCarousel";
import ReviewCard from "@/components/reviews/ReviewCard";

export default function ReviewsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    rating: 5,
    title: "",
    content: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const avgRating = getAverageRating();

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const body = [
      `New traveler review`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Country: ${form.country || "—"}`,
      `Rating: ${form.rating}/5`,
      `Title: ${form.title || "—"}`,
      ``,
      form.content,
    ].join("\n");
    openMailto({
      subject: "Traveler review — Kitum Cave Safaris",
      body,
    });
    setStatus("success");
    setForm({ name: "", email: "", country: "", rating: 5, title: "", content: "" });
  };

  return (
    <>
      <section className="pt-24 pb-12 md:pt-28 md:pb-14 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-3">Reviews</p>
          <h1 className="heading-display text-white mb-4">Traveler Voices</h1>
          <p className="body-large !text-white/70 max-w-2xl mb-6">
            Guests who have traveled with our team. We collect these ourselves —
            we do not pretend they are Google or TripAdvisor listings. After
            your trip, leave yours here so the next traveler can hear from you.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Star size={20} className="fill-brand-terracotta text-brand-terracotta" />
              <span className="font-serif text-2xl text-white">{avgRating}</span>
              <span className="text-sm">average from guest stories</span>
            </div>
            <span className="text-sm text-white/50">
              {reviews.length} guest stories
            </span>
          </div>
        </div>
      </section>

      <ReviewsCarousel
        reviews={reviews}
        title="Traveler Experiences"
        subtitle="Words from guests who traveled with our team — collected by us, not pulled from a review site."
        showCta={false}
      />

      <section className="section-padding py-10 md:py-14 bg-brand-cream">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className="heading-sub text-brand-forest mb-6">Guest stories</h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <p className="text-xs text-brand-charcoal/45 mt-6 max-w-xl">
              These are guest stories shared with our team. When we have a
              public Google listing, we will link it here. Until then we would
              rather show honest words than borrowed logos.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 border border-brand-sand-dark bg-white p-5 md:p-6">
              <h2 className="heading-sub text-brand-forest mb-2">Leave a Review</h2>
              <p className="text-sm text-brand-charcoal/60 mb-6">
                Traveled with us? Share your experience — we verify via email
                before publishing.
              </p>

              {status === "success" ? (
                <div className="p-6 bg-brand-sand text-center">
                  <p className="font-serif text-lg text-brand-forest mb-2">Thank you!</p>
                  <p className="text-sm text-brand-charcoal/70">
                    Your review opens in your email app for verification.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-brand-terracotta underline"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-forest mb-2">Name *</label>
                    <input id="name" name="name" required value={form.name} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-forest mb-2">Email *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-brand-forest mb-2">Country</label>
                    <input id="country" name="country" value={form.country} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-forest mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, rating: n }))}
                          aria-label={`${n} stars`}
                          className="p-1"
                        >
                          <Star
                            size={24}
                            className={cn(
                              n <= form.rating
                                ? "fill-brand-terracotta text-brand-terracotta"
                                : "text-brand-sand-dark"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-brand-forest mb-2">Title</label>
                    <input id="title" name="title" value={form.title} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-brand-forest mb-2">Your Review *</label>
                    <textarea
                      id="content"
                      name="content"
                      required
                      minLength={20}
                      value={form.content}
                      onChange={update}
                      className="textarea-field"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
                    {status === "loading" ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
