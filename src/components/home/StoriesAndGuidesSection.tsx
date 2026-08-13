import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import type { BlogPost } from "@/data/blog";

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
  if (posts.length === 0) return null;

  return (
    <section className="section-padding section-spacing bg-[#f4f4f4]">
      <div className="mx-auto max-w-[1600px]">
        <div className="stories-guides-header">
          <h2 className="stories-guides-title">Stories &amp; Guides</h2>
          <p className="stories-guides-lead">
            Practical insights, destination guides, and travel stories from our team —
            written to help you plan a meaningful journey across East Africa.
          </p>
        </div>

        <div className="stories-guides-cards">
          {posts.map((post) => {
            const { day, month } = formatCardDate(post.date);

            return (
              <article key={post.id} className="stories-guides-card">
                <Link href={`/blog/${post.slug}`} className="stories-guides-card-image group">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </div>

                  <p className="stories-guides-card-excerpt">{post.excerpt}</p>

                  <Link href={`/blog/${post.slug}`} className="stories-guides-read-more">
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
