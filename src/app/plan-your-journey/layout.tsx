import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Plan Your Journey",
  description:
    "Tell Kitum Cave Safaris where you want to travel. We reply by email and WhatsApp with a clear itinerary.",
  path: "/plan-your-journey/",
});

export default function PlanYourJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
