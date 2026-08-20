"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/packages";

/** Luxury album — The Rock Restaurant, Zanzibar */
const HERO_IMAGE = "/images/IMG-20260811-WA0089.jpg";

export default function InternationalHeroSection() {
  return (
    <section className="ea-overlay-hero" aria-label="International packages">
      <Image
        src={HERO_IMAGE}
        alt="The Rock Restaurant on a coral outcrop at sunset, Zanzibar"
        fill
        priority
        className="ea-overlay-hero-image object-cover"
        style={{ objectPosition: "42% center" }}
        sizes="100vw"
      />
      <div className="ea-overlay-hero-scrim" aria-hidden />

      <div className="ea-overlay-hero-layout section-padding">
        <div className="ea-overlay-hero-card">
          <p className="ea-overlay-hero-label label-text !text-brand-terracotta">
            International
          </p>
          <h1 className="ea-overlay-hero-title heading-display text-white">
            Journeys beyond East Africa, built around you
          </h1>
          <p className="ea-overlay-hero-lead">
            Tell us where you want to go — Ethiopia, the Indian Ocean, or
            further. We design the itinerary, permits, and logistics from
            Kampala. Published packages will appear here as they are ready.
          </p>

          <ul className="ea-overlay-hero-trust">
            <li>
              <ShieldCheck size={14} aria-hidden className="shrink-0 text-white/80" />
              <span>
                <strong>30% deposit</strong> once dates are confirmed
              </span>
            </li>
            <li>
              <span>WhatsApp replies around the clock</span>
            </li>
          </ul>

          <div className="ea-overlay-hero-actions">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Kitum Cave Safaris — I'd like to plan an international journey. Here is where I want to go:")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ea-overlay-hero-btn"
            >
              Chat on WhatsApp
            </a>
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
