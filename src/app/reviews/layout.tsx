import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Reviews",
  description:
    "Traveler reviews of Kitum Cave Safaris and a form to share your own journey.",
  path: "/reviews/",
});

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
