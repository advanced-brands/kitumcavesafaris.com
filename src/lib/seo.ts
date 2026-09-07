import type { Metadata } from "next";
import { siteConfig } from "@/data/packages";

export function siteOrigin() {
  return siteConfig.url.replace(/\/$/, "");
}

/** Preferred public URL: HTTPS, no www, trailing slash. */
export function canonicalUrl(path: string) {
  const origin = siteOrigin();
  if (!path || path === "/") return `${origin}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const withoutIndex = withLeading.replace(/\/index\.html$/i, "/");
  return `${origin}${withoutIndex.endsWith("/") ? withoutIndex : `${withoutIndex}/`}`;
}

export function pageSeo(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const url = canonicalUrl(options.path);
  const image = options.image ?? "/images/4A9A8590.jpg";
  const index = options.index ?? true;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      type: options.ogType ?? "website",
      images: [{ url: image }],
    },
  };
}
