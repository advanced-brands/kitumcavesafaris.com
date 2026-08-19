import type { Package } from "@/data/packages";

export type PackageExpectation = {
  title: string;
  caption: string;
  image: string;
};

function firstSentence(text: string, max = 120): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/^[^.!?]+[.!?]/);
  const sentence = match ? match[0].trim() : trimmed;
  return sentence.length > max ? `${sentence.slice(0, max - 1).trim()}…` : sentence;
}

export function getPackageExpectations(pkg: Package, count = 3): PackageExpectation[] {
  const images = pkg.galleryImages.length ? pkg.galleryImages : [pkg.heroImage];

  return pkg.itinerary.slice(0, count).map((day, index) => ({
    title: day.title,
    caption: firstSentence(day.description),
    image: images[index % images.length] ?? pkg.heroImage,
  }));
}

/** One static backdrop for the curated packages scene. */
export const PACKAGES_SCENE_IMAGE = "/images/IMG-20260811-WA0034.jpg";

/** Frame the snow cap + sky; keeps elephants below the fold on wide screens. */
export const PACKAGES_SCENE_OBJECT_POSITION = "50% 14%";
