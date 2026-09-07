import { notFound } from "next/navigation";
import { getPackageBySlug, packages } from "@/data/packages";
import { canonicalUrl, pageSeo } from "@/lib/seo";
import BookClient from "./BookClient";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Booking" };
  return {
    ...pageSeo({
      title: `Book ${pkg.name}`,
      description: pkg.shortDescription,
      path: `/book/${slug}/`,
      image: pkg.heroImage,
      index: false,
    }),
    alternates: { canonical: canonicalUrl(`/packages/${slug}/`) },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();
  return <BookClient pkg={pkg} />;
}
