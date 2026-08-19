import { Compass, Globe2, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { trustPoints } from "@/data/team";
import ScrollReveal from "@/components/ui/ScrollReveal";

const trustPointIcons: Record<string, LucideIcon> = {
  "Based in Uganda": MapPin,
  "Curated, Not Catalogued": Compass,
  "East Africa & Beyond": Globe2,
  "Transparent Process": ShieldCheck,
};

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding section-spacing">
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal className="mb-10 max-w-3xl md:mb-12">
          <p className="label-text mb-4">Our Approach</p>
          <h2 className="heading-section text-brand-forest mb-6">
            Why travelers choose us
          </h2>
          <p className="body-large mb-6">
            We are based in Kampala — close to the destinations we recommend and the people
            who make each journey possible. That proximity matters: it means real-time
            knowledge, reliable logistics, and honest advice.
          </p>
          <p className="body-text">
            We do not invent credentials. What we offer is careful planning, clear
            communication, and journeys shaped around how you want to travel — wildlife,
            culture, adventure, or international discovery.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
          {trustPoints.map((point, index) => {
            const Icon = trustPointIcons[point.title] ?? MapPin;

            return (
              <ScrollReveal key={point.title} delay={index * 75}>
                <article className="who-we-are-card !min-h-[clamp(9rem,24vw,12rem)] border border-brand-sand-dark !bg-brand-sand">
                  <Icon
                    className="who-we-are-card-icon shrink-0 text-brand-forest"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="who-we-are-card-title">{point.title}</h3>
                  <p className="who-we-are-card-body">{point.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
