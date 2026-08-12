const fs = require("fs");
const path = require("path");

const summaries = {
  wildlife: [
    "Where the wild still writes its own rules.",
    "A heartbeat away from the extraordinary.",
    "Nature's drama, close enough to feel.",
    "The Africa you came to meet.",
  ],
  nature: [
    "Landscapes that quiet the mind.",
    "Beauty that asks nothing but your attention.",
    "Earth at its most generous.",
    "A place where silence still speaks.",
  ],
  adventure: [
    "Adventure is never far away.",
    "The trail that changes how you see the world.",
    "Go further than the postcard.",
    "Moments made for the brave of heart.",
  ],
  culture: [
    "Stories carried in song, craft, and welcome.",
    "Where culture lives in every gesture.",
    "Meet the people who make the place.",
    "Heritage you can feel under your feet.",
  ],
  luxury: [
    "Comfort woven into every horizon.",
    "Slow down where the view does the talking.",
    "Indulgence with a wild soul.",
    "The soft side of the safari life.",
  ],
};

const regionLabels = {
  wildlife: "Wildlife",
  nature: "Nature",
  adventure: "Adventure",
  culture: "Culture",
  luxury: "Luxury",
};

function excitingSummary(title, location, category, index) {
  const t = `${title} ${location}`.toLowerCase();
  if (t.includes("gorilla")) return "One hour that can change how you see the wild.";
  if (t.includes("lion")) return "Kings of the plains, meters from your vehicle.";
  if (t.includes("elephant") && t.includes("kilimanjaro"))
    return "Giants beneath Africa's highest peak.";
  if (t.includes("elephant")) return "Gentle giants at the water's edge.";
  if (t.includes("sandbank") || t.includes("nakupenda") || t.includes("mnemba"))
    return "Turquoise water, white sand, nowhere else to be.";
  if (t.includes("dolphin")) return "Leap into the blue with the ocean's showmen.";
  if (t.includes("tortoise")) return "Ancient travellers still walking among us.";
  if (t.includes("dhow")) return "Sail the Indian Ocean the Swahili way.";
  if (t.includes("spice")) return "Follow the scent of clove, cinnamon, and story.";
  if (t.includes("colobus") || t.includes("monkey"))
    return "Primates of the canopy — curious and rare.";
  if (t.includes("dance") || t.includes("drum"))
    return "Rhythm, colour, and community in motion.";
  if (t.includes("trek") || t.includes("trail") || t.includes("hiker"))
    return "Every step deeper into the green unknown.";
  if (t.includes("turtle")) return "Swim beside sea turtles in crystal shallows.";
  if (t.includes("vulture") || t.includes("falcon") || t.includes("lapwing"))
    return "Wings over the savanna — look up.";
  if (t.includes("hippo")) return "River royalty with a surprising grin.";
  if (t.includes("rhino")) return "A living relic of the African plains.";
  if (t.includes("giraffe")) return "Grace on stilts across the open plains.";
  if (t.includes("the rock")) return "Dinner with the ocean as your dining room.";
  if (t.includes("kitum")) return "Step into the cave that named our journey.";
  if (t.includes("stone town")) return "Alleys, ocean air, and centuries of trade.";

  const pool = summaries[category] || summaries.adventure;
  return pool[index % pool.length];
}

const galleryPath = path.join(__dirname, "..", "src", "data", "gallery.ts");
const raw = fs.readFileSync(galleryPath, "utf8");

const itemRegex =
  /\{\s*id:\s*"([^"]+)",\s*src:\s*"([^"]+)",\s*caption:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*size:\s*"([^"]+)"\s*\}/g;

const items = [];
let match;
let i = 0;
while ((match = itemRegex.exec(raw)) !== null) {
  const [, id, src, caption, category, size] = match;
  const parts = caption.split(" — ");
  const title = (parts[0] || caption).trim();
  const location = (parts[1] || regionLabels[category] || "East Africa").trim();
  const summary = excitingSummary(title, location, category, i);
  items.push({ id, src, caption, title, location, summary, category, size });
  i++;
}

const lines = items.map(
  (item) =>
    `  { id: "${item.id}", src: "${item.src}", caption: "${item.caption}", title: "${item.title}", location: "${item.location}", summary: "${item.summary.replace(/"/g, '\\"')}", category: "${item.category}", size: "${item.size}" }`
);

const out = `export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  title: string;
  location: string;
  summary: string;
  category: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
};

export const galleryItems: GalleryItem[] = [
${lines.join(",\n")}
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "wildlife", label: "Wildlife" },
  { id: "nature", label: "Nature" },
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "luxury", label: "Luxury" },
];
`;

fs.writeFileSync(galleryPath, out);
console.log(`Enriched ${items.length} gallery items with title, location, summary`);
