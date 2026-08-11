import { notFound } from "next/navigation";
import { getPackageBySlug, packages } from "@/data/packages";
import BookClient from "./BookClient";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
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
