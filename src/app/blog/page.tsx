import type { Metadata } from "next";
import BlogPageContent from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
    title: "Stories & Guides",
  description:
    "The Kitum Journal — wildlife, permits, seasons, and field notes from Uganda and East Africa.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
