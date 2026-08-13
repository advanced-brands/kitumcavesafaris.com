"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/packages";
import DestinationMap from "@/components/maps/DestinationMap";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { openMailto } from "@/lib/mailto";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const body = [
      `Contact form message from ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Subject: ${form.subject || "General inquiry"}`,
      ``,
      form.message,
    ].join("\n");
    openMailto({
      subject: form.subject || "Contact inquiry — Kitum Cave Safaris",
      body,
    });
    setStatus("success");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Contact</p>
          <h1 className="heading-display text-white mb-4">Get in Touch</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Reach Kitum Cave Safaris directly — we respond personally and help you plan with clarity.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ScrollReveal>
            <h2 className="heading-sub text-brand-forest mb-8">Contact Details</h2>
            <ul className="space-y-6 mb-10">
              <li className="flex gap-4">
                <Mail className="text-brand-terracotta shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 mb-1">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-brand-forest hover:text-brand-terracotta transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="text-brand-terracotta shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 mb-1">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-brand-forest hover:text-brand-terracotta transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <WhatsAppIcon className="w-5 h-5 text-brand-terracotta shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 mb-1">WhatsApp</p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-forest hover:text-brand-terracotta transition-colors"
                  >
                    {siteConfig.whatsappDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="text-brand-terracotta shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 mb-1">Location</p>
                  <p className="text-brand-forest">{siteConfig.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="text-brand-terracotta shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 mb-1">Business Hours</p>
                  <p className="text-brand-forest">{siteConfig.businessHours}</p>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Kitum Cave Safaris!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terracotta"
              >
                Chat With Us on WhatsApp
              </a>
              <Link href="/plan-your-journey" className="btn-secondary">
                Plan Your Journey
              </Link>
            </div>

            <div className="flex gap-4">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-charcoal/60 hover:text-brand-terracotta">
                  Instagram
                </a>
              )}
              {siteConfig.social.x && (
                <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-charcoal/60 hover:text-brand-terracotta">
                  X
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-charcoal/60 hover:text-brand-terracotta">
                  LinkedIn
                </a>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="heading-sub text-brand-forest mb-8">Send a Message</h2>
            {status === "success" ? (
              <div className="p-8 bg-brand-sand border border-brand-sand-dark text-center">
                <p className="font-serif text-xl text-brand-forest mb-2">Message sent</p>
                <p className="text-sm text-brand-charcoal/70 mb-4">
                  Thank you — we will get back to you shortly.
                </p>
                <button onClick={() => setStatus("idle")} className="text-sm text-brand-terracotta underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-forest mb-2">Phone</label>
                    <input id="phone" name="phone" value={form.phone} onChange={update} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-forest mb-2">Subject</label>
                    <input id="subject" name="subject" value={form.subject} onChange={update} className="input-field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-forest mb-2">Message *</label>
                  <textarea id="message" name="message" required minLength={10} value={form.message} onChange={update} className="textarea-field" />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-700" role="alert">Something went wrong. Please try again or chat with us on WhatsApp.</p>
                )}
                <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="heading-sub text-brand-forest">Find Us in Kampala</h2>
            <p className="body-text mt-2">{siteConfig.address}</p>
          </ScrollReveal>
          <DestinationMap
            lat={siteConfig.location.lat}
            lng={siteConfig.location.lng}
            zoom={14}
            label={siteConfig.location.name}
            className="border border-brand-sand-dark rounded-sm"
          />
        </div>
      </section>
    </>
  );
}
