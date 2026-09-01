"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

  const isHome = pathname === "/";

  return (
    <>
      <header className="site-chrome-nav pointer-events-none px-3 pt-3 sm:px-5 sm:pt-4 md:px-6">
        <nav
          className={cn(
            "nav-floating",
            isHome && !scrolled && "nav-floating-hero",
            scrolled && "nav-floating-scrolled"
          )}
          aria-label="Main navigation"
        >
          <Link href="/" className="relative z-50 shrink-0 pl-1">
            <Image
              src="/images/Logo.png"
              alt="Kitum Cave Safaris"
              width={140}
              height={70}
              className="h-9 w-auto sm:h-10 md:h-11"
              priority
            />
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
          "fixed inset-0 z-[90] flex items-center justify-center bg-brand-forest/20 backdrop-blur-sm transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)] lg:hidden pointer-events-auto",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "mx-4 w-full max-w-sm rounded-[2rem] border border-white/60 bg-brand-cream/95 p-8 shadow-[0_24px_64px_rgba(27,61,47,0.18)] backdrop-blur-xl transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]",
            isOpen ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center gap-5">
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
