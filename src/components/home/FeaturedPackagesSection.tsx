"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type DestinationCard = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  objectPosition: string;
  count: number;
};

function countWhere(match: (country: string, slug: string) => boolean) {
  return packages.filter((pkg) => match(pkg.country, pkg.slug)).length;
}

const destinations: DestinationCard[] = [
  {
    id: "uganda",
    name: "Uganda",
    eyebrow: "Safaris in",
    description:
      "Gorilla trekking, Murchison Falls, and wildlife parks we know from the ground up.",
    href: "/packages/east-africa?country=uganda",
    image: "/images/4A9A8590.jpg",
    objectPosition: "50% 40%",
    count: countWhere((country) => country.includes("Uganda")),
  },
  {
    id: "kenya",
    name: "Kenya",
    eyebrow: "Safaris in",
    description: "Masai Mara game drives on the golden plains of the great migration country.",
    href: "/packages/east-africa?country=kenya",
    image: "/images/IMG-20260811-WA0029.jpg",
    objectPosition: "70% 42%",
    count: countWhere((country) => country.includes("Kenya")),
  },
  {
    id: "tanzania",
    name: "Tanzania",
    eyebrow: "Travel to",
    description: "Serengeti plains, big skies, and the scale of East Africa's great parks.",
    href: "/packages/east-africa?country=tanzania",
    image: "/images/IMG-20260811-WA0034.jpg",
    objectPosition: "50% 28%",
    count: countWhere(
      (country, slug) => country.includes("Tanzania") && !slug.includes("zanzibar")
    ),
  },
  {
    id: "rwanda",
    name: "Rwanda",
    eyebrow: "Safaris in",
    description: "Gorilla trekking in Volcanoes National Park, and journeys that continue into Uganda.",
    href: "/packages/east-africa?country=rwanda",
    image: "/images/4A9A8592.jpg",
    objectPosition: "50% 35%",
    count: countWhere((country) => country.includes("Rwanda")),
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    eyebrow: "Holiday in",
    description: "Indian Ocean beaches and spice after safari — a slower finish to the journey.",
    href: "/packages/5-days-zanzibar-trip",
    image: "/images/IMG-20260811-WA0012.jpg",
    objectPosition: "50% 50%",
    count: countWhere((_country, slug) => slug.includes("zanzibar")),
  },
];

function journeyLabel(count: number) {
  return count === 1 ? "1 journey" : `${count} journeys`;
}

export default function FeaturedPackagesSection() {
  const reduceMotion = useSafeReducedMotion();
  const loop = [...destinations, ...destinations];

  return (
    <section id="packages" className="packages-capsules-section">
      <div className="section-padding mx-auto max-w-[1600px] mb-8 md:mb-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="heading-section text-brand-forest">Curated Packages</h2>
          <Link
            href="/packages/east-africa"
            className="text-sm font-medium uppercase tracking-wider text-brand-terracotta transition-colors hover:text-brand-terracotta-dark"
          >
            View All Packages &rarr;
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "packages-capsules-viewport",
          reduceMotion && "packages-capsules-viewport--static"
        )}
      >
        <div className="packages-capsules-track" aria-label="Destination packages">
          {loop.map((dest, index) => (
            <article
              key={`${dest.id}-${index}`}
              className="packages-capsule relative"
              aria-hidden={index >= destinations.length}
            >
              <Image
                src={dest.image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: dest.objectPosition }}
                sizes="280px"
              />
              <div className="packages-capsule-panel">
                <p className="packages-capsule-badge">{journeyLabel(dest.count)}</p>
                <p className="packages-capsule-eyebrow">{dest.eyebrow}</p>
                <h3 className="packages-capsule-title">{dest.name}</h3>
                <p className="packages-capsule-copy">{dest.description}</p>
                <Link
                  href={dest.href}
                  className="packages-capsule-arrow"
                  tabIndex={index >= destinations.length ? -1 : 0}
                  aria-label={`View ${dest.name} packages`}
                >
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
