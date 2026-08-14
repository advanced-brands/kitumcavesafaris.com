import Image from "next/image";

const HERO_IMAGE = "/images/4A9A8457.jpg";

export default function BlogHeroSection() {
  return (
    <section className="blog-hero" aria-label="Stories and guides">
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
        <p className="label-text !text-brand-terracotta mb-4">Journal</p>
        <h1 className="heading-display text-white mb-4">Stories &amp; Guides</h1>
        <p className="body-large !text-white/70 max-w-2xl">
          Interesting facts about animals, places, and traveling thoughtfully through East Africa.
        </p>
      </div>
    </section>
  );
}
