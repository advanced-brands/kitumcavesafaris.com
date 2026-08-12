"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  getPackagesByRegion,
  getDestinationSummary,
} from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import OverviewMap from "@/components/maps/OverviewMap";

function EastAfricaContent() {
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");
  const destinationSummary = getDestinationSummary();

  let filteredPackages = getPackagesByRegion("east-africa");
  if (countryFilter) {
    filteredPackages = filteredPackages.filter(
      (p) => p.country.toLowerCase().replace(/\s+/g, "-") === countryFilter
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Packages</p>
          <h1 className="heading-display text-white mb-4">East African Packages</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Curated journeys through Uganda, Kenya, Tanzania, and the wider East African region.
          </p>
        </div>
      </section>

      <section className="section-padding py-8 bg-brand-sand border-b border-brand-sand-dark">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-brand-charcoal/60 uppercase tracking-wider">
              Filter by destination:
            </span>
            <a
              href="/packages/east-africa"
              className={`px-4 py-2 text-sm transition-colors ${
                !countryFilter ? "bg-brand-forest text-white" : "bg-white text-brand-charcoal hover:bg-brand-forest/10"
              }`}
            >
              All
            </a>
            {destinationSummary.map((dest) => (
              <a
                key={dest.country}
                href={`/packages/east-africa?country=${dest.slug}`}
                className={`px-4 py-2 text-sm transition-colors ${
                  countryFilter === dest.slug ? "bg-brand-forest text-white" : "bg-white text-brand-charcoal hover:bg-brand-forest/10"
                }`}
              >
                {dest.country} ({dest.count})
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 100}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal className="text-center mb-8">
            <h2 className="heading-sub text-brand-forest">Destination Map</h2>
          </ScrollReveal>
          <OverviewMap
            className="border border-brand-sand-dark rounded-sm"
            filterCountry={
              countryFilter
                ? destinationSummary.find((d) => d.slug === countryFilter)?.country
                : undefined
            }
          />
        </div>
      </section>
    </>
  );
}

export default function EastAfricaPackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center animate-pulse">Loading...</div>}>
      <EastAfricaContent />
    </Suspense>
  );
}
