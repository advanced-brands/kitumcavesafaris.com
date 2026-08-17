"use client";

import { useMemo, useState } from "react";
import { blogPosts, blogCategories } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

export default function BlogPageContent() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === filter);
  }, [filter]);

  const [featured, ...rest] = filtered;

  return (
    <>
      <BlogHeroSection />

      <section className="relative z-10 section-padding py-8 bg-brand-sand border-b border-brand-sand-dark">
        <div className="max-w-[1600px] mx-auto flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                "rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer",
                filter === cat
                  ? "bg-brand-charcoal text-white"
                  : "bg-white text-brand-charcoal/70 border border-brand-sand-dark hover:border-brand-charcoal/25"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="relative z-10 section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {featured ? (
            <ScrollReveal>
              <BlogCard post={featured} variant="featured" />
            </ScrollReveal>
          ) : (
            <p className="text-center text-brand-charcoal/60 py-16">
              No articles in this category yet.
            </p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
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
