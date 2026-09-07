import BlogPageContent from "@/components/blog/BlogPageContent";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Stories & Guides",
  description:
    "The Kitum Journal — wildlife, permits, seasons, and field notes from Uganda and East Africa.",
  path: "/blog/",
});

export default function BlogPage() {
  return <BlogPageContent />;
}
