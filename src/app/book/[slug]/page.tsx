"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPackageBySlug } from "@/data/packages";
import { formatCurrency } from "@/lib/utils";

export default function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const pkg = getPackageBySlug(slug);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    travelers: 1,
    preferredDate: "",
    specialRequests: "",
    paymentType: "partial" as "partial" | "full",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 section-padding">
        <h1 className="heading-sub text-brand-forest mb-4">Package not found</h1>
        <Link href="/packages/east-africa" className="btn-primary">
          Browse Packages
        </Link>
      </div>
    );
  }

  const totalAmount = pkg.price > 0 ? pkg.price * form.travelers : 0;
  const partialAmount =
    totalAmount > 0
      ? Math.round(totalAmount * (pkg.partialPaymentPercent / 100))
      : 0;
  const payAmount = form.paymentType === "full" ? totalAmount : partialAmount;

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageId: pkg.id,
          packageSlug: pkg.slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Booking</p>
          <h1 className="heading-display text-white mb-2">Book This Journey</h1>
          <p className="body-large !text-white/70">{pkg.name}</p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-brand-forest mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={update}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-forest mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-forest mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={update}
                    className="input-field"
                    placeholder="+256..."
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-brand-forest mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={update}
                    className="input-field"
                    placeholder="0705940988"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-brand-forest mb-2">
                    Country *
                  </label>
                  <input
                    id="country"
                    name="country"
                    required
                    value={form.country}
                    onChange={update}
                    className="input-field"
                    placeholder="Your country"
                  />
                </div>
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-brand-forest mb-2">
                    Number of Travelers *
                  </label>
                  <input
                    id="travelers"
                    name="travelers"
                    type="number"
                    min={1}
                    max={20}
                    required
                    value={form.travelers}
                    onChange={update}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-brand-forest mb-2">
                  Preferred Travel Date *
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  required
                  value={form.preferredDate}
                  onChange={update}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-brand-forest mb-2">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={update}
                  className="textarea-field"
                  placeholder="Dietary needs, accessibility, celebrations..."
                />
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-brand-forest mb-4">
                  Payment Option *
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer border p-5 transition-colors ${
                      form.paymentType === "partial"
                        ? "border-brand-forest bg-brand-sand"
                        : "border-brand-sand-dark bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="partial"
                      checked={form.paymentType === "partial"}
                      onChange={update}
                      className="sr-only"
                    />
                    <span className="block font-serif text-lg text-brand-forest mb-1">
                      Partial Payment
                    </span>
                    <span className="text-sm text-brand-charcoal/60">
                      Pay {pkg.partialPaymentPercent}% deposit
                      {partialAmount > 0 && (
                        <> — {formatCurrency(partialAmount, pkg.currency)}</>
                      )}
                    </span>
                  </label>
                  <label
                    className={`cursor-pointer border p-5 transition-colors ${
                      form.paymentType === "full"
                        ? "border-brand-forest bg-brand-sand"
                        : "border-brand-sand-dark bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="full"
                      checked={form.paymentType === "full"}
                      onChange={update}
                      className="sr-only"
                    />
                    <span className="block font-serif text-lg text-brand-forest mb-1">
                      Full Payment
                    </span>
                    <span className="text-sm text-brand-charcoal/60">
                      Pay the complete amount
                      {totalAmount > 0 && (
                        <> — {formatCurrency(totalAmount, pkg.currency)}</>
                      )}
                    </span>
                  </label>
                </div>
              </fieldset>

              {error && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-terracotta w-full disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : payAmount > 0
                    ? `Proceed to Pay ${formatCurrency(payAmount, pkg.currency)}`
                    : "Submit Booking Request"}
              </button>

              <p className="text-xs text-brand-charcoal/50 text-center">
                Payments are processed securely via Flutterwave. You will receive
                a receipt by email after successful payment.
              </p>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-28 border border-brand-sand-dark bg-white overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={pkg.heroImage}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl text-brand-forest mb-2">
                  {pkg.name}
                </h2>
                <p className="text-sm text-brand-charcoal/60 mb-4">
                  {pkg.destination} · {pkg.duration}
                </p>
                <dl className="space-y-2 text-sm border-t border-brand-sand-dark pt-4">
                  <div className="flex justify-between">
                    <dt className="text-brand-charcoal/50">Travelers</dt>
                    <dd>{form.travelers}</dd>
                  </div>
                  {pkg.price > 0 && (
                    <>
                      <div className="flex justify-between">
                        <dt className="text-brand-charcoal/50">Package total</dt>
                        <dd>{formatCurrency(totalAmount, pkg.currency)}</dd>
                      </div>
                      <div className="flex justify-between font-medium text-brand-forest">
                        <dt>Amount due now</dt>
                        <dd>{formatCurrency(payAmount, pkg.currency)}</dd>
                      </div>
                    </>
                  )}
                  {pkg.price === 0 && (
                    <p className="text-xs text-brand-charcoal/50">
                      [PACKAGE PRICE — TO BE ADDED]. Your booking request will be
                      confirmed by our team with pricing details.
                    </p>
                  )}
                </dl>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-block mt-4 text-sm text-brand-terracotta hover:underline"
                >
                  ← Back to package details
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
