import type { Metadata } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel stories, wildlife guides, and destination insights from Kitum Cave Safaris — Uganda and East Africa.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />

      <section className="section-padding py-8 bg-brand-sand border-b border-brand-sand-dark">
        <div className="max-w-[1600px] mx-auto flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 text-xs uppercase tracking-wider bg-white text-brand-charcoal/70 border border-brand-sand-dark"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <ScrollReveal>
            <BlogCard post={blogPosts[0]} variant="featured" />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
