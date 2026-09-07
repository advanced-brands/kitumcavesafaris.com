import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Booking received",
  description: "Your Kitum Cave Safaris booking request has been sent to the team.",
  path: "/booking/confirmation/",
  index: false,
});

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
