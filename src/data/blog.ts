import { journalPosts } from "./journal-posts";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readingTime: number;
  featuredImage: string;
  relatedSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "mountain-gorillas-uganda",
    slug: "mountain-gorillas-uganda",
    title: "Mountain Gorillas of Uganda: What Makes Bwindi Extraordinary",
    excerpt:
      "Nearly half the world's remaining mountain gorillas live in Uganda's Bwindi Impenetrable Forest. Here is what you should know before you go.",
    content: `
## A Forest Like No Other

Bwindi Impenetrable National Park is not simply a destination — it is an ancient ecosystem that has existed for over 25,000 years. The name "Bwindi" means "dark place" in the local Rukiga language, and standing beneath its canopy, you understand why. Light filters through layers of vegetation, and the air carries the scent of damp earth and wild herbs.

## The Gorillas

Uganda is home to approximately 459 mountain gorillas — nearly half the global population. These are not animals in a zoo. They are wild, habituated families living in one of the most biologically diverse forests on the continent. A typical trek takes between 2 and 6 hours, depending on where the gorilla family has moved overnight.

When you finally encounter them — a silverback resting, juveniles playing, a mother cradling an infant — time stops. You have one hour. It is enough to change how you see the natural world.

## What to Expect

- Treks begin early in the morning with a briefing at park headquarters
- Groups are limited to 8 people per gorilla family
- Minimum age is 15 years
- Sturdy boots, long trousers, and rain gear are essential
- Permits are limited and must be booked well in advance

## Bwindi or Mgahinga

Most first treks go to Bwindi because of the number of habituated families and the range of sectors (Buhoma, Ruhija, Rushaga, Nkuringo). Mgahinga, in the Virunga volcanoes on the Rwanda–DRC corner, is smaller and can pair with a golden monkey walk. We choose the sector by permit availability and your onward road — not by which name sounds rarer.

## After the Hour

Lake Bunyonyi is the usual quiet night. Queen Elizabeth is the usual wildlife continuation. Do not stack a chimpanzee trek the same afternoon as gorillas; your legs and the parks both deserve a pause.

## Responsible Tourism

Gorilla trekking directly supports conservation. A portion of every permit fee funds anti-poaching efforts, community development, and habitat protection. When you trek in Bwindi, you are participating in one of Africa's most successful conservation stories.

---

*[This article is for informational purposes. Contact Kitum Cave Safaris to plan your gorilla trekking experience.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-03-01",
    category: "Wildlife",
    readingTime: 8,
    featuredImage: "/images/4A9A8590.jpg",
    relatedSlugs: ["gorilla-permits-east-africa", "lake-bunyonyi-after-bwindi", "rwanda-volcanoes-gorilla"],
  },
  {
    id: "queen-elizabeth-wildlife",
    slug: "queen-elizabeth-wildlife",
    title: "Queen Elizabeth National Park: Uganda's Most Diverse Wildlife Haven",
    excerpt:
      "From tree-climbing lions to the Kazinga Channel's hippo congregations — why Queen Elizabeth deserves a place on every safari itinerary.",
    content: `
## Where Savanna Meets Forest

Queen Elizabeth National Park sits in western Uganda, spanning the floor of the Western Rift Valley. It is Uganda's most visited national park, and for good reason: the diversity of ecosystems here — open savanna, dense forest, volcanic crater lakes, and the Kazinga Channel — supports an extraordinary range of wildlife.

## The Tree-Climbing Lions of Ishasha

In the southern Ishasha sector, lions do something unusual: they climb fig trees. No one is entirely sure why — some researchers suggest it helps them escape ground-level insects, others that the branches offer a vantage point and a cool breeze. Whatever the reason, watching a lion draped across a branch is one of safari's most surreal sights.

## The Kazinga Channel

This 32-kilometre natural channel connects Lake George and Lake Edward. A boat safari here is among the best wildlife viewing experiences in East Africa. Hippos wallow in the shallows, elephants come to drink, buffalo crowd the banks, and over 600 bird species have been recorded in the park.

## Planning Your Visit

Queen Elizabeth combines well with gorilla trekking in Bwindi (approximately 3–4 hours’ drive) and chimpanzee tracking in Kyambura Gorge. Game drives are best in the early morning and late afternoon.

## Crater Lakes and the Kazinga Evening

The explosion craters west of Mweya hold water and quiet birds when the channel feels busy. A late boat on Kazinga is often better than a third game drive on a tired road. Hippo density here is the point; it is not a whale-watching timetable.

## Ishasha Logistics

Ishasha is a sector, not a guarantee of tree lions. You go because the fig trees and the southern approach toward Bwindi make sense on the map. If the lions are on the ground that day, you still had a proper game drive.

---

*[Contact Kitum Cave Safaris to include Queen Elizabeth in your itinerary.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-02-15",
    category: "Destination Guides",
    readingTime: 7,
    featuredImage: "/images/4A9A0474.jpg",
    relatedSlugs: ["chimpanzee-kibale-kyambura", "murchison-falls-nile", "mountain-gorillas-uganda"],
  },
  {
    id: "best-time-visit-uganda",
    slug: "best-time-visit-uganda",
    title: "When to Visit Uganda: Seasons, Weather, and What to Pack",
    excerpt:
      "Uganda sits on the equator, but its weather is more nuanced than you might expect. A practical guide to planning your timing.",
    content: `
## Two Dry Seasons, Two Wet Seasons

Uganda experiences two dry seasons and two wet seasons:

**Dry seasons:** December to February, and June to September
**Wet seasons:** March to May, and October to November

The dry seasons offer easier road conditions and clearer skies — ideal for photography and gorilla trekking. However, Bwindi's rainforest receives rain year-round, so waterproof gear is always essential.

## Wildlife Viewing

Game viewing in savanna parks like Queen Elizabeth and Murchison Falls is generally best during the dry seasons when animals congregate around water sources. Bird watching peaks during the wet seasons when migratory species arrive.

## What to Pack

Regardless of season:
- Lightweight, breathable clothing in neutral colours
- A warm layer for early morning game drives
- Sturdy waterproof hiking boots
- Rain jacket or poncho
- Sun protection (hat, sunscreen, sunglasses)
- Insect repellent
- Binoculars and a good camera

## Getting There

Most international visitors arrive through Entebbe International Airport, approximately 40 kilometres from Kampala. From Entebbe, most safari destinations are a day’s road — not an hour. Build the night.

## Gorilla Months Versus Savanna Months

You can trek gorillas in the rain. You will be wet. Dry-season treks are easier underfoot, and lodges book out first. For Murchison and Queen Elizabeth, dry months pull animals to water. If you are a birder, the wet months are not a write-off.

---

*[Plan your journey with Kitum Cave Safaris — we handle the logistics so you can focus on the experience.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-02-01",
    category: "Travel Tips",
    readingTime: 6,
    featuredImage: "/images/4A9A8403.jpg",
    relatedSlugs: ["entebbe-kampala-first-night", "packing-safari-field-kit", "mountain-gorillas-uganda"],
  },
  {
    id: "responsible-tourism-east-africa",
    slug: "responsible-tourism-east-africa",
    title: "Traveling Responsibly in East Africa: A Guide for Conscious Travelers",
    excerpt:
      "Tourism can be a force for good — or harm. Here is how to ensure your journey supports the communities and environments you visit.",
    content: `
## Why It Matters

East Africa's natural heritage — its forests, savannas, lakes, and wildlife — is both its greatest asset and its most fragile resource. Tourism generates vital revenue for conservation and community development, but only when practiced responsibly.

## Choose Local

Working with locally based operators like Kitum Cave Safaris means your spending stays in the community. Local guides bring knowledge that no guidebook can replicate — they know which trail the gorillas used yesterday, which village makes the best rolex, and how to navigate roads that do not appear on any map.

## Respect Wildlife

- Maintain recommended distances from all animals
- Never feed wildlife
- Follow your guide's instructions during treks and game drives
- Do not use flash photography near animals
- Stay on designated trails

## Support Communities

- Buy crafts directly from artisans
- Tip fairly and directly
- Learn a few words of the local language
- Ask before photographing people
- Choose community-owned lodges where possible

## Leave No Trace

Pack out what you pack in. Avoid single-use plastics. Respect park rules and ranger instructions. The wilderness you enjoy today should be intact for the next generation.

## Money That Stays

Park fees, gorilla levies, porters, and lodge staff are the conservation economy you can see. Bargaining a dancer down to nothing is not “travel savvy.” Our responsible-tourism stance is operational: we book people we can name.

---

*[Kitum Cave Safaris is committed to responsible tourism. Learn more about our approach when you plan your journey.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-01-20",
    category: "Responsible Tourism",
    readingTime: 7,
    featuredImage: "/images/4A9A8590.jpg",
    relatedSlugs: ["uganda-dance-and-drums", "gorilla-permits-east-africa", "best-time-visit-uganda"],
  },
  ...journalPosts,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((p) => slugs.includes(p.slug));
}

const categoryOrder = [
  "Wildlife",
  "Destination Guides",
  "Travel Tips",
  "Culture",
  "Adventure",
  "Responsible Tourism",
];

export const blogCategories = [
  "All",
  ...categoryOrder.filter((cat) => blogPosts.some((post) => post.category === cat)),
];
