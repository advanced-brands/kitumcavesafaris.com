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

## Responsible Tourism

Gorilla trekking directly supports conservation. A portion of every permit fee funds anti-poaching efforts, community development, and habitat protection. When you trek in Bwindi, you are participating in one of Africa's most successful conservation stories.

---

*[This article is for informational purposes. Contact Kitum Cave Safaris to plan your gorilla trekking experience.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-03-01",
    category: "Wildlife",
    readingTime: 5,
    featuredImage: "/images/4A9A8590.jpg",
    relatedSlugs: ["queen-elizabeth-wildlife", "responsible-tourism-east-africa"],
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

Queen Elizabeth combines well with gorilla trekking in Bwindi (approximately 3-4 hours drive) and chimpanzee tracking in Kyambura Gorge. Game drives are best in the early morning and late afternoon.

---

*[Contact Kitum Cave Safaris to include Queen Elizabeth in your itinerary.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-02-15",
    category: "Destination Guides",
    readingTime: 4,
    featuredImage: "/images/4A9A0474.jpg",
    relatedSlugs: ["mountain-gorillas-uganda", "best-time-visit-uganda"],
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

Most international visitors arrive through Entebbe International Airport, approximately 40 kilometres from Kampala. From Entebbe, most safari destinations are accessible by road within a day.

---

*[Plan your journey with Kitum Cave Safaris — we handle the logistics so you can focus on the experience.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-02-01",
    category: "Travel Tips",
    readingTime: 4,
    featuredImage: "/images/4A9A8403.jpg",
    relatedSlugs: ["mountain-gorillas-uganda", "responsible-tourism-east-africa"],
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

---

*[Kitum Cave Safaris is committed to responsible tourism. Learn more about our approach when you plan your journey.]*
    `,
    author: "Kitum Cave Safaris Editorial",
    date: "2026-01-20",
    category: "Responsible Tourism",
    readingTime: 5,
    featuredImage: "/images/4A9A8590.jpg",
    relatedSlugs: ["mountain-gorillas-uganda", "best-time-visit-uganda"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((p) => slugs.includes(p.slug));
}

export const blogCategories = [
  "All",
  "Wildlife",
  "Destination Guides",
  "Travel Tips",
  "Culture",
  "Adventure",
  "Responsible Tourism",
];
