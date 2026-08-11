import Link from "next/link";
import Image from "next/image";
import {
  packages,
  experienceCategories,
  getDestinationSummary,
  siteConfig,
} from "@/data/packages";
import { blogPosts } from "@/data/blog";
import { teamMembers, trustPoints } from "@/data/team";
import PackageCard from "@/components/packages/PackageCard";
import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import OverviewMap from "@/components/maps/OverviewMap";

export default function HomePage() {
  const featuredPackages = packages.filter((p) => p.featured);
  const destinationSummary = getDestinationSummary();
  const founder = teamMembers.find((m) => m.isFounder);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/4A9A7901.jpg"
            alt="Mountain gorilla in Bwindi Impenetrable Forest, Uganda"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-brand-forest/30 to-brand-forest/10" />
        </div>
        <div className="relative section-padding pb-20 md:pb-28 lg:pb-32 w-full max-w-[1600px] mx-auto">
          <div className="max-w-3xl">
            <p className="label-text !text-brand-terracotta-light mb-4 animate-fade-in">
              Uganda &middot; East Africa &middot; Beyond
            </p>
            <h1 className="heading-display text-white mb-6 animate-slide-up">
              Discover Africa.
              <br />
              <span className="text-brand-terracotta-light">
                Experience More Than the Journey.
              </span>
            </h1>
            <p className="body-large !text-white/80 max-w-xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Kitum Cave Safaris creates memorable journeys through Uganda, East
              Africa, and destinations beyond — crafted with local knowledge and
              the care of people who know these landscapes intimately.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/packages/east-africa" className="btn-terracotta">
                Explore Packages
              </Link>
              <Link href="/plan-your-journey" className="btn-secondary !border-white/40 !text-white hover:!bg-white hover:!text-brand-forest">
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Introduction */}
      <section className="section-padding section-spacing bg-brand-cream">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <p className="label-text mb-4">Who We Are</p>
              <h2 className="heading-section text-brand-forest mb-6">
                A travel company rooted in Uganda, connected to East Africa
              </h2>
              <p className="body-large mb-6">
                Based in Kampala, Kitum Cave Safaris helps travelers discover
                Uganda&apos;s rainforests and savannas, explore the wider East
                African region, and venture to destinations across the world.
              </p>
              <p className="body-text mb-8">
                We don&apos;t sell generic tours. Every journey is shaped around
                what you want to experience — whether that&apos;s tracking
                mountain gorillas at dawn, watching the sun set over the Masai
                Mara, or discovering a city you&apos;ve never seen before.
              </p>
              <Link href="/about" className="btn-primary">
                Meet Our Team
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {trustPoints.map((point, i) => (
                  <div
                    key={point.title}
                    className={`p-6 bg-white border border-brand-sand-dark ${i === 0 ? "col-span-2" : ""}`}
                  >
                    <h3 className="font-serif text-lg text-brand-forest mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-brand-charcoal/70 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Destination Summary */}
      <section className="section-padding py-12 bg-brand-forest">
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
                  <span className="font-serif text-2xl md:text-3xl group-hover:scale-110 transition-transform inline-block">
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

      {/* Experience Categories */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="label-text mb-4">Experiences</p>
            <h2 className="heading-section text-brand-forest">
              What Awaits You
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceCategories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 100}>
                <div className="group relative aspect-[4/5] overflow-hidden cursor-pointer">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="section-padding section-spacing bg-brand-sand">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="label-text mb-4">Featured Journeys</p>
              <h2 className="heading-section text-brand-forest">
                Curated Packages
              </h2>
            </div>
            <Link
              href="/packages/east-africa"
              className="text-sm uppercase tracking-wider text-brand-terracotta hover:text-brand-terracotta-dark font-medium transition-colors"
            >
              View All Packages &rarr;
            </Link>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.length > 0
              ? featuredPackages.map((pkg, i) => (
                  <ScrollReveal key={pkg.id} delay={i * 100}>
                    <PackageCard pkg={pkg} />
                  </ScrollReveal>
                ))
              : packages.slice(0, 3).map((pkg, i) => (
                  <ScrollReveal key={pkg.id} delay={i * 100}>
                    <PackageCard pkg={pkg} />
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="label-text mb-4">Explore the Map</p>
            <h2 className="heading-section text-brand-forest mb-4">
              Our Destinations
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              From the rainforests of southwestern Uganda to the plains of Kenya
              and Tanzania — and destinations beyond Africa.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <OverviewMap height="500px" className="border border-brand-sand-dark" />
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

      {/* Blog Preview */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="label-text mb-4">From the Journal</p>
              <h2 className="heading-section text-brand-forest">
                Stories &amp; Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm uppercase tracking-wider text-brand-terracotta hover:text-brand-terracotta-dark font-medium transition-colors"
            >
              Read All Articles &rarr;
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <BlogCard post={blogPosts[0]} variant="featured" />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {blogPosts.slice(1, 4).map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/4A9A8221.jpg"
            alt="East African savanna landscape at golden hour"
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
