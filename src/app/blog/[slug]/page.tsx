import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/data/packages";
import { formatBlogDate } from "@/lib/format-date";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
      type: "article",
    },
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 mb-6 text-brand-charcoal/80">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={trimmed} className="font-serif text-2xl md:text-3xl text-brand-forest mt-10 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.replace("- ", ""));
    } else if (trimmed.startsWith("---")) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-10 border-brand-sand-dark" />);
    } else if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
      flushList();
      elements.push(
        <p key={trimmed} className="text-sm italic text-brand-charcoal/60 mb-6">
          {trimmed.replace(/^\*|\/\*$/g, "").replace(/\*$/, "")}
        </p>
      );
    } else if (trimmed.startsWith("**") && trimmed.includes("**")) {
      flushList();
      const parts = trimmed.split(/\*\*/);
      elements.push(
        <p key={trimmed} className="body-text mb-4">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="text-brand-forest">
                {part}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      );
    } else {
      flushList();
      elements.push(
        <p key={`${trimmed.slice(0, 40)}-${elements.length}`} className="body-text mb-4">
          {trimmed}
        </p>
      );
    }
  }
  flushList();
  return elements;
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs);
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <section className="relative z-0 pt-32 pb-0 pointer-events-none">
        <div className="relative h-[45vh] min-h-[320px] max-h-[520px]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 to-brand-forest/20" />
        </div>
      </section>

      <article className="section-padding -mt-24 relative z-20 pointer-events-auto">
        <div className="max-w-3xl mx-auto bg-brand-cream border border-brand-sand-dark p-8 md:p-12 shadow-sm">
          <span className="label-text mb-4 block">{post.category}</span>
          <h1 className="heading-section text-brand-forest mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-charcoal/50 mb-10 pb-8 border-b border-brand-sand-dark">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatBlogDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} min read
            </span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-terracotta transition-colors ml-auto"
            >
              <Share2 size={14} />
              Share
            </a>
          </div>

          <div className="prose-kit">{renderContent(post.content)}</div>

          <div className="mt-12 p-8 bg-brand-forest text-center">
            <h3 className="font-serif text-2xl text-white mb-3">
              Ready to experience this yourself?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Let Kitum Cave Safaris craft a journey around the places that inspire you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <Link href="/plan-your-journey" className="btn-terracotta relative z-10">
                Plan Your Journey
              </Link>
              <Link
                href="/packages/east-africa"
                className="btn-secondary relative z-10 !border-white/40 !text-white hover:!bg-white hover:!text-brand-forest"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      </article>

        {related.length > 0 && (
        <section className="relative z-20 section-padding section-spacing pointer-events-auto">
          <div className="max-w-[1600px] mx-auto">
            <ScrollReveal>
              <h2 className="heading-sub text-brand-forest mb-8">Related Articles</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <ScrollReveal key={r.id} delay={i * 100}>
                  <BlogCard post={r} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
