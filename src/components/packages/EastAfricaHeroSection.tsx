"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import { getPackagesByRegion } from "@/data/packages";
import { getAverageRating, reviews } from "@/data/reviews";
import { formatCurrency } from "@/lib/utils";

const HERO_IMAGE = "/images/IMG-20260811-WA0073.jpg";

const eastAfricaPackages = getPackagesByRegion("east-africa");
const pricedPackages = eastAfricaPackages.filter((pkg) => pkg.price > 0);
const lowestPrice = pricedPackages.length
  ? Math.min(...pricedPackages.map((pkg) => pkg.price))
  : null;
const destinationCount = new Set(
  eastAfricaPackages.map((pkg) => pkg.country)
).size;
const averageRating = getAverageRating();
const verifiedReviewCount = reviews.filter((review) => review.verified).length;

export default function EastAfricaHeroSection() {
  return (
    <section className="ea-overlay-hero" aria-label="East African packages">
      <Image
        src={HERO_IMAGE}
        alt="Giraffe on the East African savannah at golden hour"
        fill
        priority
        className="ea-overlay-hero-image object-cover"
        style={{ objectPosition: "16% center" }}
        sizes="100vw"
      />
      <div className="ea-overlay-hero-scrim" aria-hidden />

      <div className="ea-overlay-hero-layout section-padding">
        <div className="ea-overlay-hero-card">
          <p className="ea-overlay-hero-label label-text !text-brand-terracotta">
            East Africa
          </p>
          <h1 className="ea-overlay-hero-title heading-display text-white">
            Handcrafted safaris across Uganda, Kenya &amp; Tanzania
          </h1>
          <p className="ea-overlay-hero-lead">
            Local experts, clear pricing, and fully managed logistics — from
            gorilla forests to Migration plains.
          </p>

          <ul className="ea-overlay-hero-trust">
            <li>
              <Star size={14} aria-hidden className="shrink-0 text-brand-terracotta" />
              <span>
                <strong>{averageRating}/5</strong> · {verifiedReviewCount}{" "}
                verified reviews
              </span>
            </li>
            <li>
              <ShieldCheck size={14} aria-hidden className="shrink-0 text-white/80" />
              <span>
                <strong>30% deposit</strong> to secure your trip
              </span>
            </li>
            {lowestPrice !== null && (
              <li>
                <span>
                  From <strong>{formatCurrency(lowestPrice, "USD")}</strong> per
                  person
                </span>
              </li>
            )}
          </ul>

          <dl className="ea-overlay-hero-stats">
            <div>
              <dt>Destinations</dt>
              <dd>{destinationCount}</dd>
            </div>
            <div>
              <dt>Packages</dt>
              <dd>{eastAfricaPackages.length}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>UG · KE · TZ</dd>
            </div>
          </dl>

          <div className="ea-overlay-hero-actions">
            <Link href="#packages" className="btn-primary ea-overlay-hero-btn">
              Browse packages
            </Link>
            <Link
              href="/plan-your-journey"
              className="btn-secondary ea-overlay-hero-btn !border-white/45 !text-white hover:!bg-white hover:!text-brand-forest"
            >
              Plan journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
