import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Check, X, Calendar, Luggage, Sun } from "lucide-react";
import { getPackageBySlug, packages } from "@/data/packages";
import { getReviewsForPackage } from "@/data/reviews";
import { formatCurrency } from "@/lib/utils";
import DestinationMap from "@/components/maps/DestinationMap";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import PackageFaqs from "@/components/packages/PackageFaqs";
import CurrencyDisplay from "@/components/pricing/CurrencyDisplay";
import PaymentOptions from "@/components/payments/PaymentOptions";
import ReviewCard from "@/components/reviews/ReviewCard";

export async function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: pkg.name,
    description: pkg.shortDescription,
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const partialAmount =
    pkg.price > 0
      ? Math.round(pkg.price * (pkg.partialPaymentPercent / 100))
      : 0;
  const packageReviews = getReviewsForPackage(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[700px]">
        <Image
          src={pkg.heroImage}
          alt={pkg.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/40 to-brand-forest/20" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12 md:pb-16">
          <div className="max-w-[1600px] mx-auto">
            <p className="label-text !text-brand-terracotta-light mb-3">
              {pkg.country} &middot; {pkg.travelType}
            </p>
            <h1 className="heading-display text-white mb-4">{pkg.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {pkg.destination}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {pkg.duration}
              </span>
              {pkg.price > 0 && (
                <span className="font-serif text-2xl text-brand-terracotta-light">
                  {formatCurrency(pkg.price, pkg.currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Overview + Booking CTA */}
      <section className="section-padding py-12 bg-white border-b border-brand-sand-dark sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-charcoal/70">
            <span>
              <strong className="text-brand-forest">Duration:</strong>{" "}
              {pkg.duration}
            </span>
            <span>
              <strong className="text-brand-forest">Type:</strong>{" "}
              {pkg.travelType}
            </span>
            <span>
              <strong className="text-brand-forest">Availability:</strong>{" "}
              {pkg.availability}
            </span>
          </div>
          <Link
            href={`/book/${pkg.slug}`}
            className="btn-terracotta shrink-0"
          >
            Book This Journey
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-3 gap-12">
          <ScrollReveal className="lg:col-span-2">
            <h2 className="heading-section text-brand-forest mb-6">
              About This Journey
            </h2>
            <div className="body-text space-y-4">
              {pkg.fullDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={200}>
            <div className="bg-brand-sand p-8 border border-brand-sand-dark">
              <h3 className="font-serif text-xl text-brand-forest mb-6">
                Journey Details
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-brand-charcoal/50 uppercase tracking-wider text-xs mb-1">
                    Destination
                  </dt>
                  <dd className="text-brand-charcoal">{pkg.destination}</dd>
                </div>
                <div>
                  <dt className="text-brand-charcoal/50 uppercase tracking-wider text-xs mb-1">
                    Accommodation
                  </dt>
                  <dd className="text-brand-charcoal">{pkg.accommodation}</dd>
                </div>
                <div>
                  <dt className="text-brand-charcoal/50 uppercase tracking-wider text-xs mb-1">
                    Transport
                  </dt>
                  <dd className="text-brand-charcoal">{pkg.transport}</dd>
                </div>
                {pkg.price > 0 && (
                  <div className="pt-4 border-t border-brand-sand-dark">
                    <dt className="text-brand-charcoal/50 uppercase tracking-wider text-xs mb-1">
                      From
                    </dt>
                    <dd className="font-serif text-3xl text-brand-forest">
                      {formatCurrency(pkg.price, pkg.currency)}
                    </dd>
                    <p className="text-xs text-brand-charcoal/50 mt-1">
                      per person · deposit{" "}
                      {formatCurrency(partialAmount, pkg.currency)} (
                      {pkg.partialPaymentPercent}%)
                    </p>
                  </div>
                )}
              </dl>
              <Link
                href={`/book/${pkg.slug}`}
                className="btn-primary w-full mt-6 text-center"
              >
                Book This Journey
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Itinerary */}
      <section className="section-padding section-spacing bg-brand-sand">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal>
            <p className="label-text mb-4">Day by Day</p>
            <h2 className="heading-section text-brand-forest mb-10">
              Itinerary
            </h2>
          </ScrollReveal>
          <ItineraryAccordion itinerary={pkg.itinerary} />
        </div>
      </section>

      {/* Included / Excluded */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <h3 className="heading-sub text-brand-forest mb-6 flex items-center gap-2">
              <Check className="text-brand-forest" size={24} />
              What&apos;s Included
            </h3>
            <ul className="space-y-3">
              {pkg.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-brand-charcoal/80"
                >
                  <Check size={16} className="text-brand-forest shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h3 className="heading-sub text-brand-forest mb-6 flex items-center gap-2">
              <X className="text-brand-terracotta" size={24} />
              What&apos;s Not Included
            </h3>
            <ul className="space-y-3">
              {pkg.excluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-brand-charcoal/80"
                >
                  <X size={16} className="text-brand-terracotta shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding section-spacing bg-brand-forest">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="mb-10">
            <p className="label-text !text-brand-terracotta mb-4">Gallery</p>
            <h2 className="heading-section text-white">Destination Gallery</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pkg.galleryImages.map((img, i) => (
              <ScrollReveal key={img} delay={i * 80}>
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${pkg.name} - image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map — compact on mobile */}
      <section className="section-padding section-spacing bg-brand-sand/50">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="mb-6">
            <p className="label-text mb-2">Location</p>
            <h2 className="heading-section text-brand-forest text-2xl md:text-3xl">
              Destination Map
            </h2>
          </ScrollReveal>
          <DestinationMap
            lat={pkg.mapCoordinates.lat}
            lng={pkg.mapCoordinates.lng}
            zoom={pkg.mapZoom}
            label={pkg.destination}
            className="border border-brand-sand-dark rounded-sm"
          />
        </div>
      </section>

      {/* Best time & packing */}
      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-10 md:gap-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <Sun size={22} className="text-brand-terracotta" />
              <h3 className="heading-sub text-brand-forest">Best Time to Visit</h3>
            </div>
            <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">
              {pkg.bestTimeToVisit}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex items-center gap-2 mb-4">
              <Luggage size={22} className="text-brand-terracotta" />
              <h3 className="heading-sub text-brand-forest">What to Bring</h3>
            </div>
            <ul className="space-y-2">
              {pkg.whatToBring.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-brand-charcoal/80"
                >
                  <Check size={14} className="text-brand-forest shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing & payments */}
      <section className="section-padding section-spacing bg-brand-sand">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <ScrollReveal>
            <p className="label-text mb-2">Pricing</p>
            <h2 className="heading-section text-brand-forest mb-4">Clear Pricing</h2>
            <CurrencyDisplay amountUsd={pkg.price} />
            {pkg.priceNote && (
              <p className="text-sm text-brand-charcoal/60 mt-4">{pkg.priceNote}</p>
            )}
            {pkg.price > 0 && (
              <p className="text-sm text-brand-charcoal/60 mt-3">
                Secure with a {pkg.partialPaymentPercent}% deposit (
                {formatCurrency(partialAmount, pkg.currency)}) — balance due before
                travel.
              </p>
            )}
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <PaymentOptions compact />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding section-spacing">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="mb-8">
            <p className="label-text mb-2">FAQs</p>
            <h2 className="heading-section text-brand-forest">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <PackageFaqs faqs={pkg.faqs} />
        </div>
      </section>

      {/* Traveler reviews for this package */}
      {packageReviews.length > 0 && (
        <section className="section-padding section-spacing bg-brand-forest">
          <div className="max-w-[1600px] mx-auto">
            <ScrollReveal className="mb-8">
              <p className="label-text !text-brand-terracotta mb-2">Reviews</p>
              <h2 className="heading-section text-white">What Travelers Say</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {packageReviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 100}>
                  <ReviewCard review={review} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Important Info */}
      <section className="section-padding section-spacing bg-brand-sand">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <h3 className="heading-sub text-brand-forest mb-6">
              Important Information
            </h3>
            <ul className="space-y-3">
              {pkg.importantInfo.map((info) => (
                <li key={info} className="text-sm text-brand-charcoal/80 flex items-start gap-2">
                  <Calendar size={14} className="text-brand-terracotta shrink-0 mt-0.5" />
                  {info}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h3 className="heading-sub text-brand-forest mb-6">
              Booking Requirements
            </h3>
            <ul className="space-y-3">
              {pkg.bookingRequirements.map((req) => (
                <li key={req} className="text-sm text-brand-charcoal/80 flex items-start gap-2">
                  <Check size={14} className="text-brand-forest shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-white border border-brand-sand-dark">
              <h4 className="text-sm font-medium text-brand-forest mb-2">
                Cancellation Policy
              </h4>
              <p className="text-sm text-brand-charcoal/70">
                {pkg.cancellationPolicy}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding py-20 bg-brand-forest text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-section text-white mb-4">
            Ready to Experience {pkg.name}?
          </h2>
          <p className="body-text !text-white/70 mb-8">
            Secure your spot with a partial payment or pay in full. Our team will
            confirm your booking and send you a receipt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/book/${pkg.slug}`} className="btn-terracotta">
              Book This Journey
            </Link>
            <Link
              href="/plan-your-journey"
              className="btn-secondary !border-white/40 !text-white hover:!bg-white hover:!text-brand-forest"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
