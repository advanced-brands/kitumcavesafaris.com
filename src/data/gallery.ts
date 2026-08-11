export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  category: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: "/images/4A9A7901.jpg", caption: "Mountain Gorilla — Bwindi Impenetrable Forest", category: "wildlife", size: "large" },
  { id: "g2", src: "/images/4A9A7902.jpg", caption: "Gorilla Family in the Rainforest", category: "wildlife", size: "medium" },
  { id: "g3", src: "/images/4A9A7964.jpg", caption: "Bwindi Canopy", category: "nature", size: "tall" },
  { id: "g4", src: "/images/4A9A7975.jpg", caption: "Forest Trekking Experience", category: "adventure", size: "medium" },
  { id: "g5", src: "/images/4A9A7977.jpg", caption: "Rainforest Trail", category: "nature", size: "small" },
  { id: "g6", src: "/images/4A9A7980.jpg", caption: "Primate Encounter", category: "wildlife", size: "wide" },
  { id: "g7", src: "/images/4A9A7987.jpg", caption: "Jungle Canopy View", category: "nature", size: "medium" },
  { id: "g8", src: "/images/4A9A8026.jpg", caption: "Lake Bunyonyi Islands", category: "nature", size: "large" },
  { id: "g9", src: "/images/4A9A8221.jpg", caption: "Savanna Landscape", category: "nature", size: "wide" },
  { id: "g10", src: "/images/4A9A8222.jpg", caption: "East African Plains", category: "nature", size: "medium" },
  { id: "g11", src: "/images/4A9A8403.jpg", caption: "Wildlife on the Horizon", category: "wildlife", size: "tall" },
  { id: "g12", src: "/images/4A9A8457.jpg", caption: "Golden Hour on the Plains", category: "nature", size: "large" },
  { id: "g13", src: "/images/4A9A8545.jpg", caption: "Acacia Tree Silhouette", category: "nature", size: "small" },
  { id: "g14", src: "/images/4A9A8560.jpg", caption: "Sunset Over the Savanna", category: "nature", size: "medium" },
  { id: "g15", src: "/images/4A9A8563.jpg", caption: "Open Plains", category: "nature", size: "medium" },
  { id: "g16", src: "/images/4A9A8590.jpg", caption: "Cultural Heritage", category: "culture", size: "large" },
  { id: "g17", src: "/images/4A9A8591.jpg", caption: "Local Community", category: "culture", size: "medium" },
  { id: "g18", src: "/images/4A9A8592.jpg", caption: "Traditional Craft", category: "culture", size: "small" },
  { id: "g19", src: "/images/4A9A8594.jpg", caption: "Village Life", category: "culture", size: "tall" },
  { id: "g20", src: "/images/4A9A8600.jpg", caption: "Coastal Retreat", category: "luxury", size: "wide" },
  { id: "g21", src: "/images/4A9A8602.jpg", caption: "Ocean Views", category: "luxury", size: "medium" },
  { id: "g22", src: "/images/4A9A8603.jpg", caption: "Beach Escape", category: "luxury", size: "medium" },
  { id: "g23", src: "/images/4A9A8605.jpg", caption: "Resort Experience", category: "luxury", size: "small" },
  { id: "g24", src: "/images/4A9A8610.jpg", caption: "Premium Accommodation", category: "luxury", size: "medium" },
  { id: "g25", src: "/images/4A9A0445.jpg", caption: "Murchison Falls Landscape", category: "adventure", size: "large" },
  { id: "g26", src: "/images/4A9A0449.jpg", caption: "River Safari", category: "adventure", size: "medium" },
  { id: "g27", src: "/images/4A9A0451.jpg", caption: "Waterfall View", category: "nature", size: "wide" },
  { id: "g28", src: "/images/4A9A0453.jpg", caption: "Nile River Experience", category: "adventure", size: "medium" },
  { id: "g29", src: "/images/4A9A0455.jpg", caption: "Boat Safari", category: "adventure", size: "small" },
  { id: "g30", src: "/images/4A9A0458.jpg", caption: "Wildlife Viewing", category: "wildlife", size: "tall" },
  { id: "g31", src: "/images/4A9A9703.jpg", caption: "Queen Elizabeth National Park", category: "wildlife", size: "large" },
  { id: "g32", src: "/images/4A9A9704.jpg", caption: "Game Drive Experience", category: "wildlife", size: "medium" },
  { id: "g33", src: "/images/4A9A9707.jpg", caption: "Elephant Herd", category: "wildlife", size: "wide" },
  { id: "g34", src: "/images/4A9A9709.jpg", caption: "Kazinga Channel", category: "nature", size: "medium" },
  { id: "g35", src: "/images/4A9A9717.jpg", caption: "Tree-Climbing Lions", category: "wildlife", size: "large" },
  { id: "g36", src: "/images/4A9A9719.jpg", caption: "Park Landscape", category: "nature", size: "small" },
  { id: "g37", src: "/images/4A9A9726.jpg", caption: "Bird Watching", category: "wildlife", size: "medium" },
  { id: "g38", src: "/images/4A9A9731.jpg", caption: "Safari Vehicle", category: "adventure", size: "medium" },
  { id: "g39", src: "/images/4A9A8612.jpg", caption: "Lodge Experience", category: "luxury", size: "tall" },
  { id: "g40", src: "/images/4A9A8620.jpg", caption: "Evening at Camp", category: "luxury", size: "medium" },
  { id: "g41", src: "/images/4A9A8626.jpg", caption: "Dining Under Stars", category: "luxury", size: "small" },
  { id: "g42", src: "/images/4A9A8634.jpg", caption: "Bush Breakfast", category: "luxury", size: "medium" },
  { id: "g43", src: "/images/4A9A0460.jpg", caption: "Hippo Pool", category: "wildlife", size: "wide" },
  { id: "g44", src: "/images/4A9A0462.jpg", caption: "Crocodile Sighting", category: "wildlife", size: "medium" },
  { id: "g45", src: "/images/4A9A0463.jpg", caption: "Water Buffalo", category: "wildlife", size: "small" },
  { id: "g46", src: "/images/4A9A0474.jpg", caption: "Antelope on the Plains", category: "wildlife", size: "medium" },
  { id: "g47", src: "/images/4A9A0483.jpg", caption: "Scenic Overlook", category: "nature", size: "large" },
  { id: "g48", src: "/images/4A9A0486.jpg", caption: "Valley View", category: "nature", size: "tall" },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "wildlife", label: "Wildlife" },
  { id: "nature", label: "Nature" },
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "luxury", label: "Luxury" },
];
