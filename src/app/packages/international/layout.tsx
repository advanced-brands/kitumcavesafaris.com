import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "International Journeys",
  description:
    "Journeys beyond East Africa, planned from Kampala. Published packages appear here when they are ready.",
  path: "/packages/international/",
});

export default function InternationalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
