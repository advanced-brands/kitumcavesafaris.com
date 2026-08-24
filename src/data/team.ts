export type TeamMemberSocial = {
  x?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  email?: string;
  substack?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | string[];
  image: string;
  imageClassName?: string;
  isFounder?: boolean;
  social?: TeamMemberSocial;
};

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Joel Byakika",
    role: "Founder & Managing Director",
    bio: [
      "Kitum Cave Safari is a journey born from the love of Uganda and East Africa, adventure, and the belief that some of the world's greatest experiences are still waiting to be discovered.",
      "We started Kitum Cave Safari because we believe Uganda and East Africa have extraordinary stories, landscapes, wildlife, culture, and adventure that deserve to be experienced and shared with the world.",
      "At Kitum Cave Safari, a safari is not just about taking someone from one attraction to another. It's about the stories shared along the journey, the local people you meet, the breathtaking moments you never planned for, and the memories you carry home long after your flight has departed.",
      "Our promise is very simple: to treat every guest with honesty, respect, professionalism, and genuine care. We want you to feel comfortable from the time you make your first inquiry until the moment you say goodbye to East Africa.",
    ],
    image: "/images/founder.png",
    isFounder: true,
  },
  {
    id: "team-1",
    name: "Ankunda Elizabeth Nkwanzi",
    role: "Operations Manager",
    bio: "Elizabeth keeps every journey running smoothly — coordinating logistics, bookings, and guest communications so your safari experience is seamless from start to finish.",
    image: "/images/ankunda-elizabeth-nkwanzi.png",
    social: {
      linkedin: "https://www.linkedin.com/in/ankunda-elizabeth-b99399336/",
      email: "ankundabeth07@gmail.com",
      substack: "https://substack.com/@iznawkn",
    },
  },
  {
    id: "team-2",
    name: "Kiwanuka Edward",
    role: "Brand Ambassador",
    bio: "Edward represents Kitum Cave Safaris with pride — sharing our story, connecting with travelers, and helping guests feel the warmth and spirit of East African hospitality.",
    image: "/images/kiwanika-edward.png",
    social: {
      tiktok: "https://www.tiktok.com/@kiwanukaedward669",
      x: "https://x.com/EdwardKiwanuka6",
      instagram: "https://www.instagram.com/kiwanukaedward",
    },
  },
  {
    id: "team-3",
    name: "Salum Jumanne John",
    role: "Zanzibar Agent",
    bio: "Salum is our man on the island — greeting guests in Zanzibar, coordinating transfers and day trips, and making sure Stone Town, the beaches, and the Indian Ocean days run as planned.",
    image: "/images/salum-jumanne-john.jpg",
    imageClassName: "object-center",
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
