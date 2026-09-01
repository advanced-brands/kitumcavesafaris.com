"use client";

import { useState } from "react";
import Link from "next/link";
import { openMailto } from "@/lib/mailto";
import { siteConfig } from "@/data/packages";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PlanYourJourneyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    preferredDest: "",
    travelDates: "",
    travelers: 2,
    budgetRange: "",
    experienceType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const body = [
      `Journey inquiry from ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Alternate phone: ${form.whatsapp || form.phone}`,
      `Country: ${form.country}`,
      `Preferred destination: ${form.preferredDest || "—"}`,
      `Travel dates: ${form.travelDates || "—"}`,
      `Travelers: ${form.travelers}`,
      `Budget: ${form.budgetRange || "—"}`,
      `Experience: ${form.experienceType || "—"}`,
      ``,
      form.message,
    ].join("\n");
    openMailto({
      subject: "Journey inquiry — Kitum Cave Safaris",
      body,
    });
    setStatus("success");
  };

  return (
    <>
      <section className="pt-24 pb-14 md:pt-32 md:pb-16 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Inquiry</p>
          <h1 className="heading-display text-white mb-4">Plan Your Journey</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Tell us what you&apos;re dreaming of — destinations, dates, group size —
            and we&apos;ll shape a journey around you.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[900px] mx-auto">
          {status === "success" ? (
            <ScrollReveal>
              <div className="text-center py-16 border border-brand-sand-dark bg-white p-10">
                <h2 className="heading-sub text-brand-forest mb-4">Inquiry Received</h2>
                <p className="body-text mb-8 max-w-md mx-auto">
                  Thank you. Our team will review your request and respond shortly
                  with ideas and next steps.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-terracotta"
                  >
                    Chat With Us on WhatsApp
                  </a>
                  <Link href="/packages/east-africa" className="btn-secondary">
                    Browse Packages
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-brand-sand-dark p-8 md:p-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-forest mb-2">Name *</label>
                    <input id="name" name="name" required value={form.name} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-forest mb-2">Email *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={update} className="input-field" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-forest mb-2">Phone *</label>
                    <input id="phone" name="phone" required value={form.phone} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-brand-forest mb-2">Alternate Phone</label>
                    <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={update} className="input-field" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-brand-forest mb-2">Country *</label>
                    <input id="country" name="country" required value={form.country} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="preferredDest" className="block text-sm font-medium text-brand-forest mb-2">Preferred Destination</label>
                    <input id="preferredDest" name="preferredDest" value={form.preferredDest} onChange={update} className="input-field" placeholder="Uganda, Kenya, Rwanda, Tanzania, Zanzibar..." />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="travelDates" className="block text-sm font-medium text-brand-forest mb-2">Approximate Travel Dates</label>
                    <input id="travelDates" name="travelDates" value={form.travelDates} onChange={update} className="input-field" placeholder="e.g. June 2026" />
                  </div>
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-brand-forest mb-2">Number of Travelers</label>
                    <input id="travelers" name="travelers" type="number" min={1} value={form.travelers} onChange={update} className="input-field" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-medium text-brand-forest mb-2">Budget Range</label>
                    <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={update} className="select-field">
                      <option value="">Select a range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-3000">$1,000 – $3,000</option>
                      <option value="3000-5000">$3,000 – $5,000</option>
                      <option value="5000-plus">$5,000+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experienceType" className="block text-sm font-medium text-brand-forest mb-2">Type of Experience</label>
                    <select id="experienceType" name="experienceType" value={form.experienceType} onChange={update} className="select-field">
                      <option value="">Select type</option>
                      <option value="wildlife">Wildlife Safari</option>
                      <option value="gorilla">Gorilla Trekking</option>
                      <option value="adventure">Adventure</option>
                      <option value="culture">Culture</option>
                      <option value="luxury">Luxury Escape</option>
                      <option value="international">International Travel</option>
                      <option value="custom">Custom Journey</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-forest mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    value={form.message}
                    onChange={update}
                    className="textarea-field"
                    placeholder="Tell us about the journey you have in mind..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-700" role="alert">
                    Something went wrong. Please try again or reach us on WhatsApp.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" disabled={status === "loading"} className="btn-terracotta flex-1 disabled:opacity-60">
                    {status === "loading" ? "Sending..." : "Send Inquiry"}
                  </button>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello, I'd like to plan a journey with Kitum Cave Safaris.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 text-center"
                  >
                    Chat With Us on WhatsApp
                  </a>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
