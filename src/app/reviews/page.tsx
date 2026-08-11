"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/packages";

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
    window.location.href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(body)}`;
    setStatus("success");
    setForm({ name: "", email: "", country: "", rating: 5, title: "", content: "" });
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
            <div className="p-10 border border-brand-sand-dark bg-brand-sand text-center">
              <p className="body-text">
                No approved reviews yet. Be the first to share your experience
                after traveling with Kitum Cave Safaris. Submit a review and our
                team will publish it after moderation — we never invent testimonials.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 border border-brand-sand-dark bg-white p-6 md:p-8">
              <h2 className="heading-sub text-brand-forest mb-2">Leave a Review</h2>
              <p className="text-sm text-brand-charcoal/60 mb-6">
                Your review opens on WhatsApp for our team to verify, then we publish it here.
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
