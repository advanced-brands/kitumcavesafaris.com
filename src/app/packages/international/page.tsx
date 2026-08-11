"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPackagesByRegion } from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import OverviewMap from "@/components/maps/OverviewMap";

function InternationalContent() {
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");

  let filteredPackages = getPackagesByRegion("international");
  if (countryFilter) {
    filteredPackages = filteredPackages.filter(
      (p) => p.country.toLowerCase().replace(/\s+/g, "-") === countryFilter
    );
  }

  const intlCountries = [...new Set(filteredPackages.map((p) => p.country))];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Packages</p>
          <h1 className="heading-display text-white mb-4">Outside East Africa</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Discover destinations beyond Africa — curated for East African travelers seeking international experiences.
          </p>
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
          <OverviewMap height="450px" className="border border-brand-sand-dark" />
        </div>
      </section>
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
