import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Gallery",
  description:
    "Field photographs from Kitum Cave Safaris journeys across East Africa.",
  path: "/gallery/",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
