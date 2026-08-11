import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamMembers, trustPoints } from "@/data/team";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/data/packages";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Kitum Cave Safaris — a Uganda-based travel company crafting journeys across East Africa and beyond.",
};

export default function AboutPage() {
  const founder = teamMembers.find((m) => m.isFounder);
  const team = teamMembers.filter((m) => !m.isFounder);

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
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

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <p className="label-text mb-4">Our Approach</p>
            <h2 className="heading-section text-brand-forest mb-6">
              Why travelers choose us
            </h2>
            <p className="body-large mb-6">
              We are based in Kampala — close to the destinations we recommend
              and the people who make each journey possible. That proximity
              matters: it means real-time knowledge, reliable logistics, and
              honest advice.
            </p>
            <p className="body-text">
              We do not invent credentials. What we offer is careful planning,
              clear communication, and journeys shaped around how you want to
              travel — wildlife, culture, adventure, or international discovery.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="grid sm:grid-cols-2 gap-4">
              {trustPoints.map((point) => (
                <div key={point.title} className="p-6 bg-brand-sand border border-brand-sand-dark">
                  <h3 className="font-serif text-lg text-brand-forest mb-2">{point.title}</h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {founder && (
        <section className="section-padding section-spacing bg-brand-sand">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/5] max-w-md overflow-hidden">
                <Image src={founder.image} alt={founder.name} fill className="object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="label-text mb-4">{founder.role}</p>
              <h2 className="heading-section text-brand-forest mb-6">{founder.name}</h2>
              <p className="body-large mb-8">{founder.bio}</p>
              <p className="text-sm text-brand-charcoal/50">
                Replace placeholder name, photo, and bio with real founder information.
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="label-text mb-4">The Team</p>
            <h2 className="heading-section text-brand-forest">People Behind the Journeys</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 100}>
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden mb-5">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-serif text-xl text-brand-forest mb-1">{member.name}</h3>
                  <p className="text-sm text-brand-terracotta mb-3">{member.role}</p>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
