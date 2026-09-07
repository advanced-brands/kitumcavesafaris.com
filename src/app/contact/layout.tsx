import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Contact",
  description:
    "Email, phone, WhatsApp, and the Kampala office for Kitum Cave Safaris.",
  path: "/contact/",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
