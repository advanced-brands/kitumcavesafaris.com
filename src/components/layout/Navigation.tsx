"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/packages";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages/east-africa", label: "East Africa" },
  { href: "/packages/international", label: "International" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 md:px-8 pointer-events-none">
        <nav
          className={cn("nav-floating", scrolled && "nav-floating-scrolled")}
          aria-label="Main navigation"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="relative z-50 flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 group"
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-cream shadow-[0_0_0_1px_rgba(27,61,47,0.14)] sm:h-9 sm:w-9">
              <Image
                src="/images/Logo.png"
                alt=""
                width={72}
                height={72}
                className="h-[118%] w-[118%] object-cover object-center"
                priority
              />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block truncate font-serif text-[13px] text-brand-forest transition-colors group-hover:text-brand-terracotta sm:text-[15px] md:text-base">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.16em] text-brand-forest/45 sm:block">
                Limited
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-floating-link",
                  isActive(link.href) && "nav-floating-link-active"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <span className="h-5 w-px bg-brand-forest/15" aria-hidden="true" />
            <Link href="/plan-your-journey" className="nav-floating-cta">
              <MapPin size={15} strokeWidth={2.25} />
              Plan Journey
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 ml-auto rounded-full p-2 text-brand-forest transition-colors hover:bg-brand-forest/5"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex items-center justify-center bg-brand-forest/20 backdrop-blur-sm transition-all duration-500 lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "mx-4 w-full max-w-sm rounded-[2rem] border border-white/60 bg-brand-cream/95 p-8 shadow-[0_24px_64px_rgba(27,61,47,0.18)] backdrop-blur-xl transition-all duration-500",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center gap-5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="mb-2 flex items-center gap-3"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-cream shadow-[0_0_0_2px_rgba(27,61,47,0.1)]">
                <Image
                  src="/images/Logo.png"
                  alt=""
                  width={96}
                  height={96}
                  className="h-[118%] w-[118%] object-cover object-center"
                />
              </span>
              <span className="text-left">
                <span className="block font-serif text-xl text-brand-forest">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-brand-forest/50">
                  Limited
                </span>
              </span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-serif text-2xl text-brand-forest transition-colors hover:text-brand-terracotta",
                  isActive(link.href) && "text-brand-terracotta"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/plan-your-journey"
              onClick={() => setIsOpen(false)}
              className="nav-floating-cta mt-2 px-6 py-3"
            >
              <MapPin size={16} strokeWidth={2.25} />
              Plan Your Journey
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
