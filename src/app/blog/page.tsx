import type { Metadata } from "next";
import { blogPosts, blogCategories } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel stories, wildlife guides, and destination insights from Kitum Cave Safaris — Uganda and East Africa.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest">
        <div className="section-padding max-w-[1600px] mx-auto">
          <p className="label-text !text-brand-terracotta mb-4">Journal</p>
          <h1 className="heading-display text-white mb-4">Stories &amp; Guides</h1>
          <p className="body-large !text-white/70 max-w-2xl">
            Interesting facts about animals, places, and traveling thoughtfully through East Africa.
          </p>
        </div>
      </section>

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
