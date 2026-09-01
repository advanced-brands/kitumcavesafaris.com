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
    const list =
      filter === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === filter);
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [filter]);

  const featured = filtered[0];
  const secondary = filtered.slice(1, 3);
  const rest = filtered.slice(3);

  return (
    <>
      <BlogHeroSection />

      <section className="relative z-10 section-padding py-8 bg-brand-sand border-b border-brand-sand-dark">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-3">
          {blogCategories.map((cat) => {
            const count =
              cat === "All"
                ? blogPosts.length
                : blogPosts.filter((post) => post.category === cat).length;
            return (
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
                <span className="ml-2 opacity-60">{count}</span>
              </button>
            );
          })}
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

          {secondary.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {secondary.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 80}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <>
              <p className="label-text pt-4">From the archive</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <ScrollReveal key={post.id} delay={i * 60}>
                    <BlogCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
