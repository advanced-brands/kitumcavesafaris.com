"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "@/data/packages";
import { paymentMethods } from "@/data/payments";
import { formatCurrency } from "@/lib/utils";
import CurrencyDisplay from "@/components/pricing/CurrencyDisplay";
import { openMailto } from "@/lib/mailto";
import PaymentOptions from "@/components/payments/PaymentOptions";

type Props = {
  pkg: Package;
};

export default function BookClient({ pkg }: Props) {
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
    paymentMethod: "card" as string,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentLabel =
      form.paymentType === "full" ? "Full payment" : "Partial payment (deposit)";
    const amountLine =
      payAmount > 0
        ? `Amount due: ${formatCurrency(payAmount, pkg.currency)}`
        : "Amount: to be confirmed";

    const message = [
      `Hello Kitum Cave Safaris — I'd like to book:`,
      ``,
      `Package: ${pkg.name}`,
      `Destination: ${pkg.destination}`,
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Alternate phone: ${form.whatsapp || form.phone}`,
      `Country: ${form.country}`,
      `Travelers: ${form.travelers}`,
      `Preferred date: ${form.preferredDate}`,
      `Payment preference: ${paymentLabel}`,
      `Payment method: ${paymentMethods.find((m) => m.id === form.paymentMethod)?.name ?? form.paymentMethod}`,
      amountLine,
      form.specialRequests ? `Special requests: ${form.specialRequests}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    openMailto({
      subject: `Booking request — ${pkg.name}`,
      body: message,
    });
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
                  <input id="fullName" name="fullName" required value={form.fullName} onChange={update} className="input-field" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-forest mb-2">
                    Email *
                  </label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={update} className="input-field" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-forest mb-2">
                    Phone Number *
                  </label>
                  <input id="phone" name="phone" required value={form.phone} onChange={update} className="input-field" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-brand-forest mb-2">
                    Alternate Phone
                  </label>
                  <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={update} className="input-field" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-brand-forest mb-2">
                    Country *
                  </label>
                  <input id="country" name="country" required value={form.country} onChange={update} className="input-field" />
                </div>
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-brand-forest mb-2">
                    Number of Travelers *
                  </label>
                  <input id="travelers" name="travelers" type="number" min={1} max={20} required value={form.travelers} onChange={update} className="input-field" />
                </div>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-brand-forest mb-2">
                  Preferred Travel Date *
                </label>
                <input id="preferredDate" name="preferredDate" type="date" required value={form.preferredDate} onChange={update} className="input-field" />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-brand-forest mb-2">
                  Special Requests
                </label>
                <textarea id="specialRequests" name="specialRequests" value={form.specialRequests} onChange={update} className="textarea-field" />
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-brand-forest mb-4">Preferred Payment Method *</legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`cursor-pointer border p-4 transition-colors text-sm ${
                        form.paymentMethod === method.id
                          ? "border-brand-forest bg-brand-sand"
                          : "border-brand-sand-dark bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={update}
                        className="sr-only"
                      />
                      <span className="block font-medium text-brand-forest">{method.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-brand-forest mb-4">Payment Preference *</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className={`cursor-pointer border p-5 transition-colors ${form.paymentType === "partial" ? "border-brand-forest bg-brand-sand" : "border-brand-sand-dark bg-white"}`}>
                    <input type="radio" name="paymentType" value="partial" checked={form.paymentType === "partial"} onChange={update} className="sr-only" />
                    <span className="block font-serif text-lg text-brand-forest mb-1">Partial Payment</span>
                    <span className="text-sm text-brand-charcoal/60">
                      Deposit ({pkg.partialPaymentPercent}%)
                      {partialAmount > 0 && <> — {formatCurrency(partialAmount, pkg.currency)}</>}
                    </span>
                  </label>
                  <label className={`cursor-pointer border p-5 transition-colors ${form.paymentType === "full" ? "border-brand-forest bg-brand-sand" : "border-brand-sand-dark bg-white"}`}>
                    <input type="radio" name="paymentType" value="full" checked={form.paymentType === "full"} onChange={update} className="sr-only" />
                    <span className="block font-serif text-lg text-brand-forest mb-1">Full Payment</span>
                    <span className="text-sm text-brand-charcoal/60">
                      Complete amount
                      {totalAmount > 0 && <> — {formatCurrency(totalAmount, pkg.currency)}</>}
                    </span>
                  </label>
                </div>
              </fieldset>

              <p className="text-sm text-brand-charcoal/60 bg-brand-sand border border-brand-sand-dark px-4 py-3">
                On this hosting setup, booking requests open in your email app so our team can confirm availability and send a secure payment link. Full online checkout activates when the site runs on Node.js hosting.
              </p>

              <button type="submit" className="btn-terracotta w-full">
                Continue by Email
              </button>
            </form>
          </div>

          <aside className="lg:col-span-2 space-y-6">
            <div className="sticky top-24 space-y-6">
            <div className="border border-brand-sand-dark bg-white overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image src={pkg.heroImage} alt={pkg.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl text-brand-forest mb-2">{pkg.name}</h2>
                <p className="text-sm text-brand-charcoal/60 mb-4">
                  {pkg.destination} · {pkg.duration}
                </p>
                <Link href={`/packages/${pkg.slug}/`} className="text-sm text-brand-terracotta hover:underline">
                  ← Back to package details
                </Link>
                {pkg.price > 0 && (
                  <div className="mt-5 pt-5 border-t border-brand-sand-dark">
                    <CurrencyDisplay amountUsd={pkg.price} />
                    <p className="text-xs text-brand-charcoal/50 mt-3">
                      Total for {form.travelers} traveler{form.travelers > 1 ? "s" : ""}:{" "}
                      {formatCurrency(totalAmount, pkg.currency)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-brand-sand-dark bg-brand-sand p-5">
              <PaymentOptions compact />
            </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
