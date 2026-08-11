"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  name: string;
  country: string | null;
  rating: number;
  title: string | null;
  content: string;
  createdAt: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    rating: 5,
    title: "",
    content: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(() => {});
  }, []);

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", country: "", rating: 5, title: "", content: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Reviews</p>
          <h1 className="heading-display text-white mb-4">Traveler Voices</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Has anyone else trusted us? Read genuine reviews from travelers —
            and share your own experience after your journey.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="heading-sub text-brand-forest mb-2">Approved Reviews</h2>
            {reviews.length === 0 ? (
              <div className="p-10 border border-brand-sand-dark bg-brand-sand text-center">
                <p className="body-text">
                  No approved reviews yet. Be the first to share your experience
                  after traveling with Kitum Cave Safaris. Reviews appear here
                  after moderation — we never invent testimonials.
                </p>
              </div>
            ) : (
              reviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 80}>
                  <article className="p-6 md:p-8 bg-white border border-brand-sand-dark">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={16}
                          className={cn(
                            s < review.rating
                              ? "fill-brand-terracotta text-brand-terracotta"
                              : "text-brand-sand-dark"
                          )}
                        />
                      ))}
                    </div>
                    {review.title && (
                      <h3 className="font-serif text-xl text-brand-forest mb-2">
                        {review.title}
                      </h3>
                    )}
                    <p className="body-text text-sm mb-4">{review.content}</p>
                    <p className="text-sm text-brand-charcoal/50">
                      — {review.name}
                      {review.country ? `, ${review.country}` : ""}
                    </p>
                  </article>
                </ScrollReveal>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 border border-brand-sand-dark bg-white p-6 md:p-8">
              <h2 className="heading-sub text-brand-forest mb-2">Leave a Review</h2>
              <p className="text-sm text-brand-charcoal/60 mb-6">
                Your review will be published after approval.
              </p>

              {status === "success" ? (
                <div className="p-6 bg-brand-sand text-center">
                  <p className="font-serif text-lg text-brand-forest mb-2">Thank you!</p>
                  <p className="text-sm text-brand-charcoal/70">
                    Your review has been submitted and will appear after approval.
                  </p>
                  <button
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
                  {status === "error" && (
                    <p className="text-sm text-red-700" role="alert">Submission failed. Please try again.</p>
                  )}
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
