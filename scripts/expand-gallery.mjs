import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const galleryPath = path.join(root, "src/data/gallery.ts");
const imagesDir = path.join(root, "public/images");

const gallerySrc = fs.readFileSync(galleryPath, "utf8");
const legacyOrderSrc = fs.readFileSync(
  path.join(__dirname, "generate-gallery.js"),
  "utf8"
);
const preferredOrder = [
  ...legacyOrderSrc.matchAll(/src:\s*"(\/images\/[^"]+)"/g),
].map((m) => path.basename(m[1]));

/** Parse existing entries to preserve captions */
const existing = [];
const entryRe =
  /\{\s*id:\s*"([^"]+)",\s*src:\s*"([^"]+)",\s*caption:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*location:\s*"([^"]+)",\s*summary:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*size:\s*"([^"]+)"\s*\}/g;
let m;
while ((m = entryRe.exec(gallerySrc))) {
  existing.push({
    id: m[1],
    src: m[2],
    caption: m[3],
    title: m[4],
    location: m[5],
    summary: m[6],
    category: m[7],
    size: m[8],
  });
}

const byFile = new Map(existing.map((e) => [path.basename(e.src), e]));

const summaries = {
  wildlife: "The Africa you came to meet.",
  nature: "Landscapes that quiet the mind.",
  adventure: "Go further than the postcard.",
  culture: "Stories carried in song, craft, and welcome.",
  luxury: "Slow down where the view does the talking.",
};

function guessCategory(filename) {
  if (filename.startsWith("IMG-")) return "adventure";
  const n = parseInt(filename.replace(/\D/g, "").slice(-4), 10);
  if (Number.isNaN(n)) return "nature";
  if (n >= 9700 || (n >= 440 && n <= 490)) return "wildlife";
  if (n >= 8200 && n <= 8230) return "culture";
  if (n >= 8590 && n <= 8640) return "wildlife";
  if (n >= 7900 && n <= 8570) return "nature";
  return "adventure";
}

function guessSize() {
  return "medium";
}

function titleFromFilename(filename) {
  const base = filename.replace(/\.jpg$/i, "");
  if (base.startsWith("IMG-")) return "Safari Moment";
  return "East Africa Journey";
}

function locationFromCategory(category) {
  const map = {
    wildlife: "East African Savanna",
    nature: "Uganda Highlands",
    adventure: "East Africa",
    culture: "Uganda",
    luxury: "East Africa",
  };
  return map[category] ?? "East Africa";
}

const allFiles = fs
  .readdirSync(imagesDir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .filter((f) => !/^(Screenshot|Logo|sw\.)/i.test(f));

const orderedFiles = [
  ...preferredOrder.filter((f) => allFiles.includes(f)),
  ...allFiles
    .filter((f) => !preferredOrder.includes(f))
    .sort((a, b) => a.localeCompare(b)),
];

const items = orderedFiles.map((file, i) => {
  const kept = byFile.get(file);
  if (kept) return { ...kept, id: `g${i + 1}` };

  const category = guessCategory(file);
  const title = titleFromFilename(file);
  const location = locationFromCategory(category);
  const summary = summaries[category];
  const caption = `${title} — ${location}`;

  return {
    id: `g${i + 1}`,
    src: `/images/${file}`,
    caption,
    title,
    location,
    summary,
    category,
    size: guessSize(),
  };
});

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const body = `export type GalleryItem = {
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
${items
  .map(
    (item) =>
      `  { id: "${item.id}", src: "${item.src}", caption: "${esc(item.caption)}", title: "${esc(item.title)}", location: "${esc(item.location)}", summary: "${esc(item.summary)}", category: "${item.category}", size: "${item.size}" }`
  )
  .join(",\n")}
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

fs.writeFileSync(galleryPath, body);
console.log(`Gallery expanded: ${existing.length} kept captions → ${items.length} total items`);
console.log(`Added ${items.length - existing.length} new images`);
