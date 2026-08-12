export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  isFounder?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "[FOUNDER NAME]",
    role: "Founder & Managing Director",
    bio: "[FOUNDER BIO — Share the story behind Kitum Cave Safaris. What inspired the company? What experience and passion drives the journeys you create? This is where visitors learn who they are trusting with their travel dreams.]",
    image: "/images/4A9A8457.jpg",
    isFounder: true,
  },
  {
    id: "team-1",
    name: "[TEAM MEMBER NAME]",
    role: "[ROLE — e.g., Head of Operations]",
    bio: "[BIO — Brief description of this team member's role, expertise, and contribution to the company.]",
    image: "/images/IMG-20260811-WA0047.jpg",
  },
  {
    id: "team-2",
    name: "[TEAM MEMBER NAME]",
    role: "[ROLE — e.g., Senior Safari Guide]",
    bio: "[BIO — Brief description of this team member's role, expertise, and contribution to the company.]",
    image: "/images/IMG-20260811-WA0078.jpg",
  },
  {
    id: "team-3",
    name: "[TEAM MEMBER NAME]",
    role: "[ROLE — e.g., Travel Consultant]",
    bio: "[BIO — Brief description of this team member's role, expertise, and contribution to the company.]",
    image: "/images/IMG-20260811-WA0088.jpg",
  },
];

export const trustPoints = [
  {
    title: "Based in Uganda",
    description:
      "We operate from Kampala, with deep local knowledge of every destination we offer — from Bwindi's rainforests to the Masai Mara's plains.",
  },
  {
    title: "Curated, Not Catalogued",
    description:
      "Every journey is thoughtfully designed. We do not sell mass-market tours — we craft experiences that match how you want to travel.",
  },
  {
    title: "East Africa & Beyond",
    description:
      "Whether you are an international visitor discovering Africa or an East African traveler exploring the world, we handle both with equal care.",
  },
  {
    title: "Transparent Process",
    description:
      "Clear pricing, honest communication, and professional receipts for every payment. No hidden fees, no surprises.",
  },
];
