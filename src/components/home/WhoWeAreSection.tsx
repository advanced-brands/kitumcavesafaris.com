"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Globe2, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type WhoWeAreCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

const cards: WhoWeAreCard[] = [
  {
    id: "uganda",
    title: "Based in Uganda",
    description:
      "We operate from Kampala, with deep local knowledge of every destination we offer — from Bwindi's rainforests to the Masai Mara's plains.",
    href: "/about",
    cta: "Meet Our Team",
    icon: MapPin,
  },
  {
    id: "curated",
    title: "Curated, Not Catalogued",
    description:
      "Every journey is thoughtfully designed. We do not sell mass-market tours — we craft experiences that match how you want to travel.",
    href: "/plan-your-journey",
    cta: "Plan Your Trip",
    icon: Compass,
  },
  {
    id: "beyond",
    title: "East Africa & Beyond",
    description:
      "Whether you are discovering Africa for the first time or exploring the world from East Africa, we handle both with equal care.",
    href: "/packages/east-africa",
    cta: "View Destinations",
    icon: Globe2,
  },
  {
    id: "transparent",
    title: "Transparent Process",
    description:
      "Clear pricing, honest communication, and professional receipts for every payment. No hidden fees, no surprises.",
    href: "/faq",
    cta: "Read FAQs",
    icon: ShieldCheck,
  },
];

export default function WhoWeAreSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="intro" className="who-we-are-follow section-padding section-spacing-compact bg-brand-cream">
      <div className="mx-auto max-w-[1600px]">
        <div className="who-we-are-panel">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="who-we-are-heading">Who We Are</h2>
              <p className="who-we-are-lead mt-2">
                A travel company rooted in Uganda, connected to East Africa and
                the wider world.
              </p>
              <p className="who-we-are-lead mt-1">
                We shape every journey around what you want to experience — not
                a one-size-fits-all itinerary.
              </p>
            </div>

            <Link href="/about" className="who-we-are-header-cta shrink-0 self-start">
              Meet Our Team
            </Link>
          </div>

          <div
            className="mt-5 grid grid-cols-2 gap-2 sm:gap-2.5 lg:mt-6 lg:grid-cols-4 lg:gap-3"
            onMouseLeave={() => setActive(0)}
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              const isActive = active === index;

              return (
                <article
                  key={card.id}
                  className={cn(
                    "who-we-are-card",
                    isActive && "who-we-are-card--active"
                  )}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <Icon
                    className={cn(
                      "who-we-are-card-icon shrink-0",
                      isActive ? "text-white/90" : "text-brand-forest"
                    )}
                    strokeWidth={1.75}
                    aria-hidden
                  />

                  <h3 className="who-we-are-card-title">{card.title}</h3>

                  <p className="who-we-are-card-body">{card.description}</p>

                  <Link
                    href={card.href}
                    className={cn(
                      "who-we-are-card-cta mt-auto",
                      isActive
                        ? "who-we-are-card-cta--active"
                        : "who-we-are-card-cta--default"
                    )}
                  >
                    {card.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
