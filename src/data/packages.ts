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

export type PackageFaq = {
  question: string;
  answer: string;
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
  priceNote?: string;
  shortDescription: string;
  fullDescription: string;
  travelType: string;
  availability: string;
  bestTimeToVisit: string;
  whatToBring: string[];
  faqs: PackageFaq[];
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

const defaultFaqs: PackageFaq[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "Visa/Mastercard, mobile money (MTN & Airtel), bank transfer, and international payment links via Flutterwave.",
  },
  {
    question: "Can I pay in UGX, KES, USD, or EUR?",
    answer:
      "Yes — we quote and accept payment in multiple currencies. Display rates on the website are approximate until confirmed at booking.",
  },
  {
    question: "Is travel insurance required?",
    answer:
      "We strongly recommend comprehensive travel insurance covering medical evacuation and trip cancellation.",
  },
];

const defaultWhatToBring = [
  "Valid passport and travel documents",
  "Comfortable neutral-coloured clothing",
  "Sun hat, sunscreen, and insect repellent",
  "Sturdy closed shoes",
  "Reusable water bottle",
  "Camera and binoculars (recommended)",
];

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
    price: 1650,
    currency: "USD",
    priceNote: "Based on shared trekking; private upgrades available on request.",
    shortDescription:
      "Track mountain gorillas in Bwindi's ancient rainforest, then unwind on the terraced shores of Lake Bunyonyi.",
    fullDescription:
      "This three-day journey takes you deep into southwestern Uganda — from the mist-shrouded slopes of Bwindi Impenetrable National Park, a UNESCO World Heritage Site home to nearly half the world's remaining mountain gorillas, to the serene islands of Lake Bunyonyi. Guided by experienced rangers and our professional driver-guides, you'll traverse changing landscapes, cross the Equator, and witness one of Africa's most profound wildlife encounters.",
    travelType: "Wildlife & Nature",
    availability: "Available year-round — peak gorilla trekking Jun–Sep & Dec–Feb",
    bestTimeToVisit:
      "Gorilla trekking is possible year-round. Dry seasons (June–September and December–February) offer easier forest trails and clearer views. The wetter months can mean shorter treks but muddier paths — pack accordingly.",
    whatToBring: [
      "Sturdy waterproof hiking boots",
      "Long trousers and long-sleeved shirt (neutral colours)",
      "Light rain jacket and daypack",
      "Insect repellent and sun protection",
      "Reusable water bottle",
      "Camera (no flash during gorilla viewing)",
      "Yellow fever certificate (recommended)",
    ],
    faqs: [
      {
        question: "How fit do I need to be for gorilla trekking?",
        answer:
          "A moderate level of fitness is recommended. Treks can last 2–6 hours on steep, muddy terrain. Porters are available to hire locally for extra support.",
      },
      {
        question: "Is the gorilla permit included?",
        answer:
          "Yes — your gorilla permit, park fees, and all activities listed in the itinerary are included in the package price.",
      },
      {
        question: "What is the minimum age?",
        answer:
          "Uganda Wildlife Authority requires trekkers to be at least 15 years old.",
      },
      {
        question: "Can I pay a deposit and settle the balance later?",
        answer:
          "Yes. A partial deposit secures your booking; the balance is due before travel as agreed with our team.",
      },
    ],
    heroImage: "/images/4A9A8590.jpg",
    galleryImages: [
      "/images/4A9A8590.jpg",
      "/images/4A9A8591.jpg",
      "/images/4A9A8592.jpg",
      "/images/4A9A8600.jpg",
      "/images/4A9A8602.jpg",
      "/images/4A9A7964.jpg",
      "/images/4A9A7975.jpg",
      "/images/4A9A8545.jpg",
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
      "Cancellations 60+ days before travel: deposit refundable minus admin fee. 30–59 days: 50% of deposit retained. Under 30 days: deposit non-refundable. Gorilla permits are non-transferable once issued — we will advise on case-by-case exceptions.",
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
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/4A9A0474.jpg",
    galleryImages: [
      "/images/4A9A0474.jpg",
      "/images/4A9A0486.jpg",
      "/images/4A9A9703.jpg",
      "/images/4A9A9717.jpg",
      "/images/IMG-20260811-WA0099.jpg",
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
    partialPaymentPercent: 30,
    featured: true,
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
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/4A9A0445.jpg",
    galleryImages: [
      "/images/4A9A0445.jpg",
      "/images/4A9A0449.jpg",
      "/images/4A9A0451.jpg",
      "/images/4A9A0453.jpg",
      "/images/4A9A0460.jpg",
      "/images/4A9A0462.jpg",
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
    partialPaymentPercent: 30,
    featured: true,
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
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/IMG-20260811-WA0021.jpg",
    galleryImages: [
      "/images/IMG-20260811-WA0021.jpg",
      "/images/IMG-20260811-WA0029.jpg",
      "/images/IMG-20260811-WA0038.jpg",
      "/images/IMG-20260811-WA0069.jpg",
      "/images/IMG-20260811-WA0074.jpg",
      "/images/IMG-20260811-WA0079.jpg",
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
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
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/IMG-20260811-WA0034.jpg",
    galleryImages: [
      "/images/IMG-20260811-WA0034.jpg",
      "/images/IMG-20260811-WA0025.jpg",
      "/images/IMG-20260811-WA0046.jpg",
      "/images/IMG-20260811-WA0050.jpg",
      "/images/IMG-20260811-WA0054.jpg",
      "/images/IMG-20260811-WA0062.jpg",
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
    partialPaymentPercent: 30,
    categories: ["wildlife", "adventure", "nature"],
  },
  {
    id: "international-ethiopia",
    slug: "international-ethiopia-escape",
    name: "[PACKAGE NAME] — Ethiopia Escape",
    destination: "Ethiopia",
    country: "Ethiopia",
    region: "international",
    duration: "[DURATION]",
    durationDays: 0,
    price: 0,
    currency: "USD",
    shortDescription:
      "[SHORT DESCRIPTION — A curated escape from East Africa into the landscapes and culture of Ethiopia.]",
    fullDescription: "[FULL DESCRIPTION — TO BE ADDED]",
    travelType: "International Travel",
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/IMG-20260811-WA0090.jpg",
    galleryImages: [
      "/images/IMG-20260811-WA0090.jpg",
      "/images/IMG-20260811-WA0016.jpg",
      "/images/IMG-20260811-WA0089.jpg",
    ],
    mapCoordinates: { lat: 9.03, lng: 38.74 },
    mapZoom: 6,
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
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
    availability: "Available on request — contact us for dates",
    bestTimeToVisit:
      "Dry seasons (June–October) are ideal for wildlife viewing. We advise on seasonal highlights when you inquire.",
    whatToBring: defaultWhatToBring,
    faqs: defaultFaqs,
    heroImage: "/images/IMG-20260811-WA0012.jpg",
    galleryImages: [
      "/images/IMG-20260811-WA0012.jpg",
      "/images/IMG-20260811-WA0015.jpg",
      "/images/IMG-20260811-WA0016.jpg",
      "/images/IMG-20260811-WA0018.jpg",
      "/images/IMG-20260811-WA0022.jpg",
      "/images/IMG-20260811-WA0059.jpg",
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
    cancellationPolicy:
      "Deposit refundable up to 45 days before departure minus admin fees. Cancellations within 45 days may forfeit deposit; full terms provided at booking.",
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
    image: "/images/4A9A8590.jpg",
  },
  {
    id: "adventure",
    title: "Adventure",
    description:
      "Swim with dolphins, snorkel crystal reefs, raft the Nile, and trek volcanic peaks — bold experiences for travelers who want more than the view from the vehicle.",
    image: "/images/IMG-20260811-WA0066.jpg",
  },
  {
    id: "culture",
    title: "Culture",
    description: "Walk with communities, discover ancient traditions, and connect with the living heritage of East Africa.",
    image: "/images/4A9A8221.jpg",
  },
  {
    id: "nature",
    title: "Nature",
    description: "From misty rainforests to volcanic lakes, explore landscapes that have shaped this continent.",
    image: "/images/4A9A8545.jpg",
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description: "Premium lodges, private guides, and iconic settings — comfort woven into every horizon without losing authenticity.",
    image: "/images/IMG-20260811-WA0016.jpg",
  },
  {
    id: "international",
    title: "International Travel",
    description: "For East African travelers ready to discover destinations beyond the continent.",
    image: "/images/IMG-20260811-WA0012.jpg",
  },
];
