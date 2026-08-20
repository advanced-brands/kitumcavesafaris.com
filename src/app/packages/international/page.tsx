"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  getPackagesByRegion,
  getDestinationSummary,
  siteConfig,
} from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import InternationalHeroSection from "@/components/packages/InternationalHeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import OverviewMap from "@/components/maps/OverviewMap";

function InternationalContent() {
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");
  const destinationSummary = getDestinationSummary("international");

  let filteredPackages = getPackagesByRegion("international");
  if (countryFilter) {
    filteredPackages = filteredPackages.filter(
      (p) => p.country.toLowerCase().replace(/\s+/g, "-") === countryFilter
    );
  }

  return (
    <>
      <InternationalHeroSection />

      {destinationSummary.length > 0 && (
        <section className="section-padding py-8 bg-brand-sand border-b border-brand-sand-dark">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider">
                Filter by destination:
              </span>
              <a
                href="/packages/international"
                className={`px-4 py-2 text-sm transition-colors ${
                  !countryFilter
                    ? "bg-brand-forest text-white"
                    : "bg-white text-brand-charcoal hover:bg-brand-forest/10"
                }`}
              >
                All
              </a>
              {destinationSummary.map((dest) => (
                <a
                  key={dest.country}
                  href={`/packages/international?country=${dest.slug}`}
                  className={`px-4 py-2 text-sm transition-colors ${
                    countryFilter === dest.slug
                      ? "bg-brand-forest text-white"
                      : "bg-white text-brand-charcoal hover:bg-brand-forest/10"
                  }`}
                >
                  {dest.country} ({dest.count})
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="packages" className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          {filteredPackages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg, i) => (
                <ScrollReveal key={pkg.id} delay={i * 100}>
                  <PackageCard pkg={pkg} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-8">
              <h2 className="heading-sub text-brand-forest mb-3">
                No published international packages yet
              </h2>
              <p className="body-text mb-6">
                We still arrange journeys outside East Africa on request. Tell
                us the destination, dates, and how you like to travel — we will
                come back with a clear itinerary and price.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Kitum Cave Safaris — I'd like to plan an international journey.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta"
                >
                  WhatsApp the team
                </a>
                <a href="/plan-your-journey" className="btn-secondary">
                  Send an inquiry
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {filteredPackages.length > 0 && (
        <section className="section-padding pb-24">
          <div className="max-w-[1600px] mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h2 className="heading-sub text-brand-forest">Destination Map</h2>
            </ScrollReveal>
            <OverviewMap
              className="border border-brand-sand-dark rounded-sm"
              filterCountry={
                countryFilter
                  ? destinationSummary.find((d) => d.slug === countryFilter)
                      ?.country
                  : undefined
              }
            />
          </div>
        </section>
      )}
    </>
  );
}

export default function InternationalPackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center animate-pulse">Loading...</div>}>
      <InternationalContent />
    </Suspense>
  );
}
