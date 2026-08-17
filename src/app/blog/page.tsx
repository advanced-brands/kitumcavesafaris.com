import type { Metadata } from "next";
import BlogPageContent from "@/components/blog/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel stories, wildlife guides, and destination insights from Kitum Cave Safaris — Uganda and East Africa.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
