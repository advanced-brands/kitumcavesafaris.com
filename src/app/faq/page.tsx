import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/packages";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about booking, payments, gorilla trekking, and traveling with Kitum Cave Safaris.",
};

const faqs = [
  {
    q: "How do I book a trip?",
    a: "Browse our packages, open the journey that interests you, and click Book This Journey. You can also send an inquiry via Plan Your Journey if you want a custom itinerary.",
  },
  {
    q: "Can I pay a deposit instead of the full amount?",
    a: "Yes. Most packages support a partial payment (deposit) and full payment. The deposit percentage is shown on each package page. You'll receive a receipt for either option.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Payments are processed securely through Flutterwave, supporting cards and local payment methods suitable for Uganda, East Africa, and international travelers. Secrets stay on the server — never in the browser.",
  },
  {
    q: "Do you invent reviews or awards?",
    a: "No. We only show approved traveler reviews submitted through this website. We do not invent awards, statistics, or testimonials.",
  },
  {
    q: "Where are you based?",
    a: `${siteConfig.address}. You can reach us at ${siteConfig.email} or WhatsApp ${siteConfig.whatsappDisplay}.`,
  },
  {
    q: "How far in advance should I book gorilla trekking?",
    a: "Gorilla permits are limited and should be booked well in advance — especially for peak seasons. Contact us as early as you can so we can secure permits and lodges.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Support</p>
          <h1 className="heading-display text-white mb-4">FAQs</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Clear answers about booking, payments, and traveling with us.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 60}>
              <details className="group border border-brand-sand-dark bg-white open:bg-brand-sand">
                <summary className="cursor-pointer list-none p-6 font-serif text-lg text-brand-forest flex justify-between items-center">
                  {faq.q}
                  <span className="text-brand-terracotta text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-6 pb-6 body-text text-sm">{faq.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="body-text mb-4">Still have questions?</p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
