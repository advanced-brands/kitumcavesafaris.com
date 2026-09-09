import { getPackageBySlug, siteConfig, type Package } from "@/data/packages";

/**
 * Homepage flyer popup. Swap flyers and slugs when a new departure is on.
 */
export const currentJourneysCampaign = {
  label: "On now",
  heading: "Kenya and Zanzibar",
  copy:
    "Open a flyer, then book that departure. Nairobi is 17–20 December 2026. Zanzibar is 30 December to 3 January.",
  items: [
    {
      id: "nairobi-a",
      slug: "4-days-nairobi-city",
      flyer: "/images/flyers/nairobi-17-20-dec-2026-a.png",
      dates: "17–20 December 2026",
      price: 700,
    },
    {
      id: "nairobi-b",
      slug: "4-days-nairobi-city",
      flyer: "/images/flyers/nairobi-17-20-dec-2026-b.png",
      dates: "17–20 December 2026",
      price: 700,
    },
    {
      id: "zanzibar-a",
      slug: "5-days-zanzibar-trip",
      flyer: "/images/flyers/zanzibar-30-dec-3-jan-a.png",
      dates: "30 December – 3 January",
      price: 1157,
    },
    {
      id: "zanzibar-b",
      slug: "5-days-zanzibar-trip",
      flyer: "/images/flyers/zanzibar-30-dec-3-jan-b.png",
      dates: "30 December – 3 January",
      price: 1157,
    },
  ],
};

export type CurrentJourney = {
  id: string;
  slug: string;
  flyer: string;
  dates: string;
  price: number;
  pkg: Package;
};

export function getCurrentJourneys(): CurrentJourney[] {
  return currentJourneysCampaign.items.flatMap((item) => {
    const pkg = getPackageBySlug(item.slug);
    return pkg ? [{ ...item, pkg }] : [];
  });
}

export function campaignWhatsappUrl(journey: CurrentJourney) {
  const text = `Hello Kitum Cave Safaris — I'm interested in ${journey.pkg.name} for ${journey.dates}. Please share availability and next steps.`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}
