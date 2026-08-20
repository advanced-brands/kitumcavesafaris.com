import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Package } from "@/data/packages";
import { formatCurrency } from "@/lib/utils";

type PackageCardProps = {
  pkg: Package;
  variant?: "default" | "featured" | "compact";
};

export default function PackageCard({ pkg, variant = "default" }: PackageCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/packages/${pkg.slug}`}
        className="group flex gap-4 p-4 bg-white border border-brand-sand-dark hover:border-brand-forest/30 transition-all duration-300"
      >
        <div className="relative w-24 h-24 shrink-0 overflow-hidden">
          <Image
            src={pkg.heroImage}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <h3 className="font-serif text-lg text-brand-forest group-hover:text-brand-terracotta transition-colors truncate">
            {pkg.name}
          </h3>
          <p className="text-sm text-brand-charcoal/60 flex items-center gap-1 mt-1">
            <MapPin size={12} />
            {pkg.country}
          </p>
          <p className="text-sm text-brand-charcoal/50 mt-1">{pkg.duration}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group block bg-white overflow-hidden border border-brand-sand-dark hover:shadow-lg transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.heroImage}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="label-text !text-brand-terracotta-light text-[10px]">
            {pkg.country}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl text-brand-forest group-hover:text-brand-terracotta transition-colors mb-2">
          {pkg.name}
        </h3>
        <p className="text-sm text-brand-charcoal/60 flex items-center gap-1.5 mb-3">
          <MapPin size={14} />
          {pkg.destination}
        </p>
        <p className="body-text text-sm line-clamp-2 mb-4">
          {pkg.shortDescription}
        </p>
        <p className="text-xs font-medium uppercase tracking-wider text-brand-terracotta mb-3">
          Breakfast included · lunch &amp; dinner extra
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-brand-charcoal/50">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {pkg.duration}
            </span>
            {pkg.price > 0 && (
              <span className="font-medium text-brand-forest">
                {formatCurrency(pkg.price, pkg.currency)}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-brand-terracotta group-hover:gap-2 transition-all">
            View Trip
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
