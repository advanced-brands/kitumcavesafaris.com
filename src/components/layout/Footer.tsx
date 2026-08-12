import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/packages";
import { Instagram, Linkedin } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: "/about", label: "About" },
    { href: "/packages/east-africa", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const travelLinks = [
    { href: "/packages/east-africa", label: "East Africa" },
    { href: "/packages/international", label: "International" },
    { href: "/plan-your-journey", label: "Plan Your Journey" },
    { href: "/packages/east-africa", label: "Booking" },
  ];

  const supportLinks = [
    { href: "/plan-your-journey", label: "Inquiry" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQs" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <footer className="bg-brand-forest text-brand-cream">
      <div className="section-padding section-spacing max-w-[1600px] mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-8">
          <div className="col-span-3 lg:col-span-2">
            <Image
              src="/images/Logo.png"
              alt="Kitum Cave Safaris"
              width={180}
              height={90}
              className="h-14 sm:h-16 w-auto mb-5 sm:mb-6 brightness-0 invert"
            />
            <p className="text-brand-cream/70 body-text text-sm sm:text-base max-w-sm mb-5 sm:mb-6">
              Curated travel experiences across Uganda, East Africa, and beyond.
              Authentic journeys crafted with local knowledge and premium care.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/60 hover:text-brand-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/60 hover:text-brand-terracotta transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/60 hover:text-brand-terracotta transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/60 hover:text-brand-terracotta transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="label-text !text-brand-terracotta mb-4 sm:mb-6 text-[10px] sm:text-xs">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="label-text !text-brand-terracotta mb-4 sm:mb-6 text-[10px] sm:text-xs">
              Travel
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {travelLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="label-text !text-brand-terracotta mb-4 sm:mb-6 text-[10px] sm:text-xs">
              Support
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-brand-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs sm:text-sm text-brand-cream/50">
            &copy; {currentYear} Kitum Cave Safaris Limited. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-brand-cream/50">
            <span>{siteConfig.email}</span>
            <span>{siteConfig.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
