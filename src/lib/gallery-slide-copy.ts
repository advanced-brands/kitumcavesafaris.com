import type { GalleryItem } from "@/data/gallery";

function hashIndex(seed: string, size: number): number {
  if (size <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % size;
}

function pick(seed: string, variants: string[]): string {
  return variants[hashIndex(seed, variants.length)] ?? variants[0];
}

const SAFARI_MOMENTS = [
  "Golden light across the open plains.",
  "The savanna waking to another morning.",
  "Wildlife drama unfolding just beyond the track.",
  "A moment that belongs only to the bush.",
  "Dust, heat, and the hum of the wild.",
  "Horizons that never seem to end.",
  "Where every bend in the road brings something new.",
  "The Africa you came to meet, unscripted.",
  "Grasslands stretching into amber distance.",
  "A pause on the track — the bush holds its breath.",
  "Light and shadow playing across the savanna.",
  "The quiet thrill of not knowing what comes next.",
  "East Africa at its most unfiltered.",
  "A postcard could never hold this.",
  "The road opens onto something unforgettable.",
  "Thermals rising over thorn scrub and grass.",
  "The wild going about its day, undisturbed.",
  "Another chapter of the great East African story.",
  "Heat haze and herds on the far ridge.",
  "The kind of moment safaris are made for.",
  "Open country under a wide African sky.",
  "Tracks in the dust leading somewhere wild.",
  "Savanna colour at the edge of the rains.",
  "The bush delivers when you least expect it.",
];

export function getGallerySlideSummary(item: GalleryItem): string {
  const { id, title, location, category } = item;
  const seed = `${id}|${title}|${location}`;
  const t = title.toLowerCase();
  const loc = location;

  if (t.includes("lapwing")) {
    return pick(seed, [
      "Yellow wattles bright against the dry grass.",
      "A ground bird pacing the open savanna.",
      "Bold lapwing on sentinel duty in the grasslands.",
      "Distinctive wattles cutting through the golden scrub.",
    ]);
  }

  if (t.includes("vulture")) {
    if (
      loc.toLowerCase().includes("acacia") ||
      loc.toLowerCase().includes("thorn") ||
      loc.toLowerCase().includes("tree")
    ) {
      return pick(seed, [
        "Scavengers keeping watch from the acacia crown.",
        "Wings folded, eyes on the plains below.",
        "White-backed vultures waiting on the thorn tree.",
        "A pair holding their perch above the savanna.",
      ]);
    }
    if (t.includes("perched")) {
      return "Silhouetted against the wide savanna sky.";
    }
    return pick(seed, [
      "Patience on wings above the East African plains.",
      "Nature's clean-up crew riding the thermals.",
      "A vulture scanning the grasslands from above.",
      "Circling high where the air runs warm.",
    ]);
  }

  if (t.includes("falcon") || t.includes("peregrine")) {
    return pick(seed, [
      "The fastest hunter cutting a line through open sky.",
      "A peregrine stooping over the African plains.",
      "Razor focus from a raptor on the wing.",
    ]);
  }

  if (t.includes("gorilla")) {
    if (t.includes("foraging")) return "Hands busy in the leaf litter of Bwindi.";
    if (t.includes("silverback")) {
      return pick(seed, [
        "The silverback holds the forest with a single glance.",
        "Power and gentleness in one silver-crowned frame.",
        "A silverback at home in the impenetrable green.",
      ]);
    }
    if (t.includes("young")) return "A young gorilla learning the ways of the troop.";
    if (t.includes("resting") || t.includes("at rest")) {
      return "Resting among the vines — time slows in the forest.";
    }
    if (t.includes("profile")) return "A profile etched in mist and moss.";
    return pick(seed, [
      "One hour among the mountain gorillas changes everything.",
      "Eye contact with our closest wild kin.",
      "The rainforest falls silent around a gorilla family.",
      "A gorilla encounter in the heart of Bwindi.",
    ]);
  }

  if (t.includes("lion")) {
    if (t.includes("yawning")) return "A lazy yawn before the evening hunt.";
    if (t.includes("mating")) return "The circle of life playing out on the Serengeti.";
    if (t.includes("kill")) return "Raw instinct on the open plains.";
    if (t.includes("pride")) return "The whole pride gathered in golden light.";
    if (t.includes("young male")) return "A young male finding his place on the plains.";
    if (t.includes("pair") || t.includes("lioness") || t.includes("lion and")) {
      return pick(seed, [
        "Regal and unhurried on the Masai Mara grasslands.",
        "A lioness at ease in her kingdom.",
        "Two lions sharing the last light of day.",
      ]);
    }
    return pick(seed, [
      "Kings of the plains, meters from your vehicle.",
      "A male lion surveying his territory.",
      "The golden hour belongs to the pride.",
      "Maned and magnificent in the Mara light.",
    ]);
  }

  if (t.includes("elephant")) {
    if (t.includes("kilimanjaro")) return "Giants beneath Africa's highest peak.";
    if (t.includes("drinking")) {
      return pick(seed, [
        "Trunks lowered to the waterline at dusk.",
        "A quiet drink at the river's edge.",
        "Elephants drinking where the Nile runs wide.",
      ]);
    }
    if (t.includes("calves") || t.includes("family")) {
      return "Calves tucked close in the family march.";
    }
    if (t.includes("nile")) return "Where elephants meet the Nile.";
    if (t.includes("herd")) {
      return pick(seed, [
        "A herd moving through the golden grass.",
        "Family bonds written across the savanna.",
        "Elephants crossing the plain in single file.",
      ]);
    }
    return pick(seed, [
      "Gentle giants at the water's edge.",
      "An elephant's slow, deliberate grace.",
      "Tusks and trunk against the African sky.",
    ]);
  }

  if (t.includes("hippo")) return "River royalty with a surprising grin.";
  if (t.includes("rhino")) return "A living relic of the African plains.";
  if (t.includes("giraffe")) {
    return pick(seed, [
      "Grace on stilts across the open plains.",
      "Necks above the acacia line on the Serengeti.",
      "A giraffe and calf moving through golden grass.",
    ]);
  }
  if (t.includes("wild dog")) return "Painted wolves on the move — rare and electric.";
  if (t.includes("buffalo")) return pick(seed, ["The herd that commands respect.", "Cape buffalo massed on the savanna."]);
  if (t.includes("crocodile")) return "Ancient patience at the water's edge.";
  if (t.includes("kudu")) return "Spiral horns rising from the scrub.";
  if (t.includes("hartebeest")) return "Antelope stride across the Mara grasslands.";
  if (t.includes("oryx")) return "Horns locked in a Samburu dust-up.";
  if (t.includes("ostrich")) return "The world's largest bird on the crater floor.";
  if (t.includes("warthog")) return pick(seed, ["A warthog family trotting through the grass.", "Tusks up, tail high — off to the burrow."]);

  if (t.includes("sandbank") || t.includes("nakupenda")) {
    return pick(seed, [
      "Turquoise water, white sand, nowhere else to be.",
      "A sandbank picnic in the Indian Ocean.",
      "Barefoot on Nakupenda's shifting shore.",
    ]);
  }
  if (t.includes("dolphin")) {
    return pick(seed, [
      "Leap into the blue with the ocean's showmen.",
      "Dolphins racing the bow off Zanzibar.",
      "A pod breaking the surface in perfect sync.",
    ]);
  }
  if (t.includes("tortoise")) {
    return pick(seed, [
      "Ancient travellers still walking among us.",
      "Centuries of slow steps on Prison Island.",
      "A giant tortoise unhurried in the sun.",
    ]);
  }
  if (t.includes("dhow")) {
    return pick(seed, [
      "Sail the Indian Ocean the Swahili way.",
      "Lateen sails cutting the Zanzibar breeze.",
      "A dhow trip where the horizon is the destination.",
    ]);
  }
  if (t.includes("spice") || t.includes("achiote") || t.includes("jackfruit")) {
    return pick(seed, [
      "Follow the scent of clove, cinnamon, and story.",
      "Spice farm aromas carried on the coastal air.",
      "From farm to table — Zanzibar's living pantry.",
    ]);
  }
  if (t.includes("colobus") || t.includes("monkey") || t.includes("vervet") || t.includes("sykes")) {
    return pick(seed, [
      "Primates of the canopy — curious and rare.",
      "Red fur and bright eyes in the forest canopy.",
      "A monkey pause in the dappled light.",
    ]);
  }
  if (t.includes("turtle")) {
    return pick(seed, [
      "Swim beside sea turtles in crystal shallows.",
      "Green turtles gliding through Nungwi waters.",
    ]);
  }
  if (t.includes("dance") || t.includes("drum") || t.includes("weaving") || t.includes("stone town")) {
    if (t.includes("stone town")) return "Alleys, ocean air, and centuries of trade.";
    if (t.includes("weaving")) return "Palm fronds woven into living heritage.";
    return pick(seed, [
      "Rhythm, colour, and community in motion.",
      "Drums and dance that carry generations.",
    ]);
  }
  if (t.includes("trek") || t.includes("trail") || t.includes("hiker") || t.includes("sabinyo")) {
    return pick(seed, [
      "Every step deeper into the green unknown.",
      "The trail that changes how you see the world.",
      "Boots on moss — the forest closes around you.",
    ]);
  }
  if (t.includes("fern") || t.includes("moss") || t.includes("canopy") || t.includes("forest")) {
    return pick(seed, [
      "Landscapes that quiet the mind.",
      "Beauty that asks nothing but your attention.",
      "Earth at its most generous.",
      "Primeval green in the Uganda highlands.",
    ]);
  }
  if (t.includes("the rock")) return "Dinner with the ocean as your dining room.";
  if (t.includes("kitum") || t.includes("cave pool")) return "Step into the cave that named our journey.";
  if (t.includes("seafood") || t.includes("grilled")) return "Indulgence with a wild soul.";
  if (t.includes("kayak") || t.includes("snorkel") || t.includes("boat") || t.includes("lagoon")) {
    return pick(seed, [
      "Adventure is never far away.",
      "Go further than the postcard.",
      "The Indian Ocean at arm's length.",
    ]);
  }
  if (t.includes("vehicle") || t.includes("safari blue")) {
    return pick(seed, [
      "Go further than the postcard.",
      "The track opens — what will you find?",
      "Safari from the seat that changes everything.",
    ]);
  }

  if (title === "East Africa Journey" || title === "Safari Moment") {
    return SAFARI_MOMENTS[hashIndex(id, SAFARI_MOMENTS.length)];
  }

  const categoryLines: Record<string, string[]> = {
    wildlife: [
      "Where the wild still writes its own rules.",
      "A heartbeat away from the extraordinary.",
      "Nature's drama, close enough to feel.",
    ],
    nature: [
      "Landscapes that quiet the mind.",
      "Beauty that asks nothing but your attention.",
      "Earth at its most generous.",
    ],
    adventure: [
      "Adventure is never far away.",
      "The trail that changes how you see the world.",
      "Go further than the postcard.",
    ],
    culture: [
      "Stories carried in song, craft, and welcome.",
      "Where culture lives in every gesture.",
      "Heritage you can feel under your feet.",
    ],
    luxury: [
      "Comfort woven into every horizon.",
      "Slow down where the view does the talking.",
      "Indulgence with a wild soul.",
    ],
  };

  const pool = categoryLines[category] ?? categoryLines.adventure;
  return pick(seed, pool);
}
