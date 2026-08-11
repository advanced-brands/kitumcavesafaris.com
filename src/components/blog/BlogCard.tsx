import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { BlogPost } from "@/data/blog";

type BlogCardProps = {
  post: BlogPost;
  variant?: "default" | "featured";
};

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid md:grid-cols-2 gap-0 bg-white border border-brand-sand-dark overflow-hidden hover:shadow-lg transition-all duration-500"
      >
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="label-text mb-3">{post.category}</span>
          <h3 className="heading-sub text-brand-forest group-hover:text-brand-terracotta transition-colors mb-3">
            {post.title}
          </h3>
          <p className="body-text text-sm line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-brand-charcoal/50">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border border-brand-sand-dark overflow-hidden hover:shadow-lg transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <span className="label-text text-[10px] mb-2 block">{post.category}</span>
        <h3 className="font-serif text-lg text-brand-forest group-hover:text-brand-terracotta transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="body-text text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-brand-charcoal/50">
          <span className="flex items-center gap-1">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
