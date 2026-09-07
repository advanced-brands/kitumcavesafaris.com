import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "East Africa Safaris",
  description:
    "Safari packages in Uganda, Kenya, Tanzania, Rwanda, and Zanzibar — gorilla treks, wildlife, and city breaks.",
  path: "/packages/east-africa/",
});

export default function EastAfricaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
