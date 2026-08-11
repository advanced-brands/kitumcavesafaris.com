export const siteConfig = {
  name: "Kitum Cave Safaris",
  tagline: "Discover Africa. Experience More Than the Journey.",
  description:
    "Curated travel experiences across Uganda, East Africa, and beyond. Authentic journeys crafted with local knowledge and premium care.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kitumcavesafaris.com",
  email: "info@kitumcavesafaris.com",
  phone: "0705940988",
  whatsapp: "256705940988",
  whatsappDisplay: "0705940988",
  address: "MI Mall Kiwatule, Kampala, Uganda",
  location: {
    lat: 0.3476,
    lng: 32.5825,
    name: "MI Mall Kiwatule, Kampala",
  },
  social: {
    instagram: "https://www.instagram.com/kitumcavesafaris/",
    x: "https://x.com/kitumcavesafari",
    linkedin:
      "https://www.linkedin.com/company/kitum-cave-safaris/about/?viewAsMember=true",
    facebook: "",
    tiktok: "",
  },
  businessHours: "[BUSINESS HOURS — TO BE ADDED]",
  partialPaymentPercent: 30,
  currency: "USD",
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  meals?: string;
};

export type Package = {
  id: string;
  slug: string;
  name: string;
  destination: string;
  country: string;
  region: "east-africa" | "international";
  duration: string;
  durationDays: number;
  price: number;
  currency: string;
  shortDescription: string;
  fullDescription: string;
  travelType: string;
  availability: string;
  heroImage: string;
  galleryImages: string[];
  mapCoordinates: { lat: number; lng: number };
  mapZoom: number;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  accommodation: string;
  transport: string;
  importantInfo: string[];
  bookingRequirements: string[];
  cancellationPolicy: string;
  partialPaymentPercent: number;
  featured?: boolean;
  categories: string[];
};

export const packages: Package[] = [
  {
    id: "gorilla-safari-3d",
    slug: "3-days-gorilla-safari",
    name: "3 Days Gorilla Safari",
    destination: "Bwindi Impenetrable National Park & Lake Bunyonyi",
    country: "Uganda",
    region: "east-africa",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    price: 0,
    currency: "USD",
    shortDescription:
      "Track mountain gorillas in Bwindi's ancient rainforest, then unwind on the terraced shores of Lake Bunyonyi.",
    fullDescription:
      "This three-day journey takes you deep into southwestern Uganda — from the mist-shrouded slopes of Bwindi Impenetrable National Park, a UNESCO World Heritage Site home to nearly half the world's remaining mountain gorillas, to the serene islands of Lake Bunyonyi. Guided by experienced rangers and our professional driver-guides, you'll traverse changing landscapes, cross the Equator, and witness one of Africa's most profound wildlife encounters.",
    travelType: "Wildlife & Nature",
    availability: "Available year-round — [CONFIRM DATES]",
    heroImage: "/images/4A9A7901.jpg",
    galleryImages: [
      "/images/4A9A7901.jpg",
      "/images/4A9A7902.jpg",
      "/images/4A9A7964.jpg",
      "/images/4A9A7975.jpg",
      "/images/4A9A7977.jpg",
      "/images/4A9A7980.jpg",
    ],
    mapCoordinates: { lat: -1.05, lng: 29.65 },
    mapZoom: 8,
    included: [
      "Gorilla permit",
      "Park fees",
      "4x4 Land Cruiser, fuel + driver-guide",
      "Full board accommodation",
      "Mineral water",
      "All activities mentioned in itinerary",
    ],
    excluded: [
      "International flights",
      "Personal items",
      "Tips",
      "Soft drinks or alcohol",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Transfer to Bwindi Impenetrable National Park",
        description:
          "After breakfast, our professional safari guide-driver will pick you at your hotel or Entebbe International Airport for a scenic drive to Southwestern Uganda. The journey takes you through changing landscapes, local villages, rolling hills and lush countryside. You will have a stopover at the Equator crossing for photography and refreshments, followed by a lunch break en route in Mbarara or Kabale. In the late afternoon, arrive at Bwindi Impenetrable National Park, a UNESCO World Heritage Site and home to nearly half of the world's remaining mountain gorillas. The journey takes approximately 8-9 hours. Check in to your lodge, relax, and enjoy your dinner.",
        accommodation: "Bakiga Lodge",
      },
      {
        day: 2,
        title: "Gorilla Trekking & Transfer to Lake Bunyonyi",
        description:
          "After an early morning breakfast, transfer to the park headquarters for a pre-trek briefing by Uganda Wildlife Authority rangers. Enter the dense rainforest with experienced guides and trackers in search of a habituated gorilla family. The trek may take 2-6 hours depending on gorilla movements. Once located, spend maximum unforgettable hours observing the gorillas in their natural habitat. After the trek, return to the lodge for lunch and a short rest. In the afternoon, depart Bwindi and drive to Lake Bunyonyi, known for its terraced hills and scenic islands. It takes approximately 1 hour. Arrival, check in at the lodge, relaxation.",
        accommodation: "Arcadia Lodge",
      },
      {
        day: 3,
        title: "Lake Bunyonyi Canoeing & Departure",
        description:
          "After morning breakfast, you will go for a boat safari to explore the islands including Punishment Island, Bwama Island, Nyuyeera Island, Bushara Island, Kahugye Island. After boat safari, begin journey to Entebbe, driving through the scenic countryside of Southwestern Uganda. Lunch will be taken en route in Mbarara with refreshment stops along the way. It will take approximately 7-8 hours drive. Arrive in Entebbe in the evening for drop-off at your hotel or at the airport and that will make the end of our trip.",
      },
    ],
    accommodation: "Bakiga Lodge (Day 1), Arcadia Lodge (Day 2)",
    transport: "4x4 Land Cruiser with professional driver-guide",
    importantInfo: [
      "Gorilla trekking requires a reasonable level of fitness",
      "Minimum age for gorilla trekking is 15 years",
      "Permits must be booked well in advance — [CONFIRM AVAILABILITY]",
      "Pack sturdy hiking boots, long trousers, and rain gear",
    ],
    bookingRequirements: [
      "Valid passport",
      "Gorilla trekking permit (arranged by Kitum Cave Safaris)",
      "Yellow fever vaccination certificate recommended",
    ],
    cancellationPolicy:
      "[CANCELLATION POLICY — TO BE ADDED BY KITUM CAVE SAFARIS]",
    partialPaymentPercent: 30,
    featured: true,
    categories: ["wildlife", "adventure", "nature"],
  },
  {
    id: "queen-elizabeth-safari",
    slug: "queen-elizabeth-wildlife-safari",
    name: "[PACKAGE NAME] — Queen Elizabeth Safari",
    destination: "Queen Elizabeth National Park",
    country: "Uganda",
    region: "east-africa",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — Game drives, boat safaris, and tree-climbing lions in Uganda's most diverse national park.]",
    fullDescription:
      "[FULL DESCRIPTION — TO BE ADDED BY KITUM CAVE SAFARIS]",
    travelType: "Wildlife Safari",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A9703.jpg",
    galleryImages: [
      "/images/4A9A9703.jpg",
      "/images/4A9A9707.jpg",
      "/images/4A9A9709.jpg",
      "/images/4A9A9717.jpg",
    ],
    mapCoordinates: { lat: -0.2, lng: 30.0 },
    mapZoom: 9,
    included: ["[INCLUDED ACTIVITIES — TO BE ADDED]"],
    excluded: ["[EXCLUDED ACTIVITIES — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 TITLE — TO BE ADDED]",
        description: "[DAY 1 DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[IMPORTANT INFO — TO BE ADDED]"],
    bookingRequirements: ["[BOOKING REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[CANCELLATION POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["wildlife", "nature"],
  },
  {
    id: "murchison-falls-safari",
    slug: "murchison-falls-adventure",
    name: "[PACKAGE NAME] — Murchison Falls Adventure",
    destination: "Murchison Falls National Park",
    country: "Uganda",
    region: "east-africa",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — Witness the Nile explode through a narrow gorge at Murchison Falls.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "Adventure & Wildlife",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A0445.jpg",
    galleryImages: [
      "/images/4A9A0445.jpg",
      "/images/4A9A0449.jpg",
      "/images/4A9A0451.jpg",
      "/images/4A9A0453.jpg",
    ],
    mapCoordinates: { lat: 2.27, lng: 31.68 },
    mapZoom: 9,
    included: ["[INCLUDED — TO BE ADDED]"],
    excluded: ["[EXCLUDED — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 — TO BE ADDED]",
        description: "[DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[INFO — TO BE ADDED]"],
    bookingRequirements: ["[REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["adventure", "wildlife", "nature"],
  },
  {
    id: "kenya-masai-mara",
    slug: "kenya-masai-mara-safari",
    name: "[PACKAGE NAME] — Masai Mara Safari",
    destination: "Masai Mara National Reserve",
    country: "Kenya",
    region: "east-africa",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — The great plains of the Masai Mara and the drama of the wild.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "Wildlife Safari",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A8221.jpg",
    galleryImages: [
      "/images/4A9A8221.jpg",
      "/images/4A9A8222.jpg",
      "/images/4A9A8403.jpg",
    ],
    mapCoordinates: { lat: -1.5, lng: 35.0 },
    mapZoom: 8,
    included: ["[INCLUDED — TO BE ADDED]"],
    excluded: ["[EXCLUDED — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 — TO BE ADDED]",
        description: "[DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[INFO — TO BE ADDED]"],
    bookingRequirements: ["[REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["wildlife", "adventure"],
  },
  {
    id: "tanzania-serengeti",
    slug: "tanzania-serengeti-experience",
    name: "[PACKAGE NAME] — Serengeti Experience",
    destination: "Serengeti National Park",
    country: "Tanzania",
    region: "east-africa",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — Endless plains, the great migration, and Africa at its most iconic.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "Wildlife Safari",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A8457.jpg",
    galleryImages: [
      "/images/4A9A8457.jpg",
      "/images/4A9A8545.jpg",
      "/images/4A9A8560.jpg",
    ],
    mapCoordinates: { lat: -2.33, lng: 34.83 },
    mapZoom: 8,
    included: ["[INCLUDED — TO BE ADDED]"],
    excluded: ["[EXCLUDED — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 — TO BE ADDED]",
        description: "[DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[INFO — TO BE ADDED]"],
    bookingRequirements: ["[REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["wildlife", "adventure", "nature"],
  },
  {
    id: "international-dubai",
    slug: "international-dubai-escape",
    name: "[PACKAGE NAME] — Dubai Escape",
    destination: "Dubai",
    country: "United Arab Emirates",
    region: "international",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — A curated escape from East Africa to the Arabian Gulf.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "International Travel",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A8590.jpg",
    galleryImages: [
      "/images/4A9A8590.jpg",
      "/images/4A9A8591.jpg",
      "/images/4A9A8592.jpg",
    ],
    mapCoordinates: { lat: 25.2, lng: 55.27 },
    mapZoom: 10,
    included: ["[INCLUDED — TO BE ADDED]"],
    excluded: ["[EXCLUDED — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 — TO BE ADDED]",
        description: "[DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[INFO — TO BE ADDED]"],
    bookingRequirements: ["[REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["luxury", "international"],
  },
  {
    id: "international-zanzibar",
    slug: "international-zanzibar-retreat",
    name: "[PACKAGE NAME] — Zanzibar Retreat",
    destination: "Zanzibar",
    country: "Tanzania",
    region: "international",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — Spice-scented breezes and Indian Ocean shores.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "Beach & Culture",
    availability: "[AVAILABILITY — TO BE ADDED]",
    heroImage: "/images/4A9A8600.jpg",
    galleryImages: [
      "/images/4A9A8600.jpg",
      "/images/4A9A8602.jpg",
      "/images/4A9A8603.jpg",
    ],
    mapCoordinates: { lat: -6.16, lng: 39.2 },
    mapZoom: 10,
    included: ["[INCLUDED — TO BE ADDED]"],
    excluded: ["[EXCLUDED — TO BE ADDED]"],
    itinerary: [
      {
        day: 1,
        title: "[DAY 1 — TO BE ADDED]",
        description: "[DESCRIPTION — TO BE ADDED]",
      },
    ],
    accommodation: "[ACCOMMODATION — TO BE ADDED]",
    transport: "[TRANSPORT — TO BE ADDED]",
    importantInfo: ["[INFO — TO BE ADDED]"],
    bookingRequirements: ["[REQUIREMENTS — TO BE ADDED]"],
    cancellationPolicy: "[POLICY — TO BE ADDED]",
    partialPaymentPercent: 30,
    categories: ["luxury", "culture", "international"],
  },
];

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPackagesByRegion(region: "east-africa" | "international") {
  return packages.filter((p) => p.region === region);
}

export function getPackagesByCountry(country: string) {
  return packages.filter(
    (p) => p.country.toLowerCase() === country.toLowerCase()
  );
}

export function getDestinationSummary() {
  const summary: Record<string, number> = {};
  packages.forEach((p) => {
    summary[p.country] = (summary[p.country] || 0) + 1;
  });
  return Object.entries(summary).map(([country, count]) => ({
    country,
    count,
    slug: country.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export const experienceCategories = [
  {
    id: "wildlife",
    title: "Wildlife",
    description: "Track gorillas, witness the great migration, encounter Africa's iconic species in their natural habitat.",
    image: "/images/4A9A7901.jpg",
  },
  {
    id: "adventure",
    title: "Adventure",
    description: "White-water rafting, mountain trekking, cave exploration — for those who seek the extraordinary.",
    image: "/images/4A9A0445.jpg",
  },
  {
    id: "culture",
    title: "Culture",
    description: "Walk with communities, discover ancient traditions, and connect with the living heritage of East Africa.",
    image: "/images/4A9A8590.jpg",
  },
  {
    id: "nature",
    title: "Nature",
    description: "From misty rainforests to volcanic lakes, explore landscapes that have shaped this continent.",
    image: "/images/4A9A9703.jpg",
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description: "Premium lodges, private guides, and journeys designed for comfort without compromising authenticity.",
    image: "/images/4A9A8600.jpg",
  },
  {
    id: "international",
    title: "International Travel",
    description: "For East African travelers ready to discover destinations beyond the continent.",
    image: "/images/4A9A8457.jpg",
  },
];
