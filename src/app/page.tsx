import Link from "next/link";
import Image from "next/image";
import {
  packages,
  getDestinationSummary,
  siteConfig,
} from "@/data/packages";
import { blogPosts } from "@/data/blog";
import { teamMembers } from "@/data/team";
import FeaturedPackagesSection from "@/components/home/FeaturedPackagesSection";
import StoriesAndGuidesSection from "@/components/home/StoriesAndGuidesSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import OverviewMap from "@/components/maps/OverviewMap";
import { reviews } from "@/data/reviews";
import ReviewsCarousel from "@/components/reviews/ReviewsCarousel";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";

export default function HomePage() {
  const featuredPackages = packages.filter((p) => p.featured);
  const destinationSummary = getDestinationSummary();
  const founder = teamMembers.find((m) => m.isFounder);

  return (
    <>
      <HeroSection />

      <WhoWeAreSection />

      {/* Destination Summary */}
      <section className="section-padding py-6 md:py-8 bg-brand-forest">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <span className="label-text !text-brand-terracotta">Destinations</span>
              {destinationSummary.map((dest) => (
                <Link
                  key={dest.country}
                  href={`/packages/east-africa?country=${dest.slug}`}
                  className="group flex items-baseline gap-2 text-brand-cream hover:text-brand-terracotta transition-colors"
                >
                  <span className="font-serif text-xl md:text-2xl group-hover:scale-110 transition-transform inline-block">
                    {dest.country}
                  </span>
                  <span className="text-brand-terracotta font-serif text-lg">
                    {dest.count}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ExperiencesSection />

      <FeaturedPackagesSection
        packages={
          featuredPackages.length > 0
            ? featuredPackages
            : packages.slice(0, 6)
        }
      />

      {/* Map Section */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="text-center mb-8">
            <p className="label-text mb-3">Explore the Map</p>
            <h2 className="heading-section text-brand-forest mb-4">
              Our Destinations
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              From the rainforests of southwestern Uganda to the plains of Kenya
              and Tanzania — and destinations beyond Africa.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <OverviewMap className="border border-brand-sand-dark rounded-sm" />
          </ScrollReveal>
        </div>
      </section>

      {/* Founder / Trust */}
      {founder && (
        <section className="section-padding section-spacing bg-brand-forest text-brand-cream">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal>
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={200}>
                <p className="label-text !text-brand-terracotta mb-4">
                  {founder.role}
                </p>
                <h2 className="heading-section text-brand-cream mb-6">
                  {founder.name}
                </h2>
                <p className="body-large !text-brand-cream/80 mb-8">
                  {founder.bio}
                </p>
                <Link
                  href="/about"
                  className="btn-terracotta"
                >
                  About Kitum Cave Safaris
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      <div id="reviews">
        <ReviewsCarousel reviews={reviews} />
      </div>

      {/* Blog Preview */}
      <StoriesAndGuidesSection posts={blogPosts.slice(0, 3)} />

      {/* CTA */}
      <section id="contact-cta" className="relative py-14 md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG-20260811-WA0034.jpg"
            alt="African elephants with Mount Kilimanjaro in the background, Amboseli"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-forest/75" />
        </div>
        <div className="relative section-padding text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="heading-section text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="body-large !text-white/80 mb-8">
              Whether you know exactly where you want to go or need help
              discovering your next adventure — we&apos;re here to make it
              happen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/plan-your-journey" className="btn-terracotta">
                Plan Your Journey
              </Link>
              <Link
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello, I'd like to plan a trip with Kitum Cave Safaris.")}`}
                className="btn-secondary !border-white/40 !text-white hover:!bg-white hover:!text-brand-forest"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
