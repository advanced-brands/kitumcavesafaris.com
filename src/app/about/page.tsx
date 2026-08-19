import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/packages";
import WhyChooseUsSection from "@/components/about/WhyChooseUsSection";
import TeamSection from "@/components/about/TeamSection";
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Kitum Cave Safaris — a Uganda-based travel company crafting journeys across East Africa and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-14 md:pt-32 md:pb-16 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">About</p>
          <h1 className="heading-display text-white mb-4">Who You Are Trusting</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Kitum Cave Safaris is a Uganda-based travel company. We organize
            curated journeys within Uganda and East Africa, and help East African
            travelers discover destinations abroad.
          </p>
        </div>
      </section>

      <WhyChooseUsSection />

      <TeamSection />

      <section className="section-padding py-20 bg-brand-forest text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-section text-white mb-4">Has anyone else trusted us?</h2>
          <p className="body-text !text-white/70 mb-8">
            Read traveler reviews — or leave your own after your journey. Real
            feedback matters more than invented testimonials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reviews" className="btn-terracotta">
              Read &amp; Leave Reviews
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !border-white/40 !text-white hover:!bg-white hover:!text-brand-forest"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
