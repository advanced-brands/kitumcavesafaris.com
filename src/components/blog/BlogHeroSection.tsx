import Image from "next/image";
import { blogPosts } from "@/data/blog";

const HERO_IMAGE = "/images/4A9A8545.jpg";

export default function BlogHeroSection() {
  return (
    <section className="blog-hero" aria-label="The Kitum Journal">
      <Image
        src={HERO_IMAGE}
        alt="Guided forest trek through Uganda's highlands"
        fill
        priority
        className="blog-hero-image object-cover"
        style={{ objectPosition: "center 40%" }}
        sizes="100vw"
      />
      <div className="blog-hero-scrim" aria-hidden />

      <div className="blog-hero-content section-padding max-w-[1600px] mx-auto">
        <p className="blog-issue-kicker">
          <span>The Kitum Journal</span>
          <span>East Africa</span>
          <span>{blogPosts.length} dispatches</span>
        </p>
        <h1 className="heading-display text-white mb-4">Stories &amp; Guides</h1>
        <p className="body-large !text-white/70 max-w-2xl">
          Wildlife, roads, permits, and the nights after the trek — written by the
          team that runs the vehicle, not by a content mill.
        </p>
      </div>
    </section>
  );
}
