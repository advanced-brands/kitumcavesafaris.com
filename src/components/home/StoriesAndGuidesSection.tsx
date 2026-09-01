"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

function formatCardDate(date: string) {
  const parsed = new Date(date);
  const day = parsed.getDate();
  const month = parsed.toLocaleDateString("en-US", { month: "short" });
  return { day, month };
}

export default function StoriesAndGuidesSection({ posts }: Props) {
  const reduceMotion = useSafeReducedMotion();

  if (posts.length === 0) return null;

  const loop = posts.length > 1 ? [...posts, ...posts] : posts;

  return (
    <section className="stories-guides-section">
      <div className="section-padding mx-auto max-w-[1600px]">
        <div className="stories-guides-header">
          <h2 className="stories-guides-title">Stories &amp; Guides</h2>
          <p className="stories-guides-lead">
            Practical insights, destination guides, and field notes from the Kitum
            desk — enough to read like a journal, written for people about to travel.
          </p>
          <Link href="/blog" className="stories-guides-all">
            View all stories &rarr;
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "stories-guides-viewport",
          (reduceMotion || posts.length < 2) && "stories-guides-viewport--static"
        )}
      >
        <div className="stories-guides-track" aria-label="Stories and guides">
          {loop.map((post, index) => {
            const { day, month } = formatCardDate(post.date);
            const isClone = index >= posts.length;

            return (
              <article
                key={`${post.id}-${index}`}
                className="stories-guides-card"
                aria-hidden={isClone}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="stories-guides-card-image group"
                  tabIndex={isClone ? -1 : 0}
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02]"
                    sizes="360px"
                  />
                </Link>

                <div className="stories-guides-card-body">
                  <p className="stories-guides-card-meta">
                    <User size={13} aria-hidden />
                    <span>{post.author}</span>
                    <span aria-hidden>&middot;</span>
                    <span>in {post.category}</span>
                  </p>

                  <div className="stories-guides-card-headline">
                    <div className="stories-guides-date" aria-label={post.date}>
                      <span className="stories-guides-date-day">{day}</span>
                      <span className="stories-guides-date-month">{month}</span>
                    </div>
                    <h3 className="stories-guides-card-title">
                      <Link href={`/blog/${post.slug}`} tabIndex={isClone ? -1 : 0}>
                        {post.title}
                      </Link>
                    </h3>
                  </div>

                  <p className="stories-guides-card-excerpt">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="stories-guides-read-more"
                    tabIndex={isClone ? -1 : 0}
                  >
                    Read More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
