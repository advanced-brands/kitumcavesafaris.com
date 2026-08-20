import type { MetadataRoute } from "next";
import { packages, siteConfig } from "@/data/packages";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/about/",
    "/packages/east-africa/",
    "/packages/international/",
    "/gallery/",
    "/blog/",
    "/contact/",
    "/plan-your-journey/",
    "/faq/",
    "/reviews/",
    "/terms/",
    "/privacy/",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }));

  const packageRoutes = packages.map((pkg) => ({
    url: `${base}/packages/${pkg.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes];
}
