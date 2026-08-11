"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages/east-africa", label: "East African Packages" },
  { href: "/packages/international", label: "Outside East Africa" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-brand-cream/95 backdrop-blur-md py-3",
          scrolled && "shadow-sm"
        )}
      >
        <nav className="section-padding flex items-center justify-between max-w-[1600px] mx-auto">
          <Link href="/" className="relative z-50 shrink-0">
            <Image
              src="/images/Logo.png"
              alt="Kitum Cave Safaris"
              width={160}
              height={80}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wider font-medium transition-colors duration-300 text-brand-charcoal/80 hover:text-brand-forest"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/plan-your-journey" className="btn-terracotta !py-2.5 !px-6 !text-xs">
              Plan Your Journey
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 p-2 transition-colors text-brand-forest"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-brand-cream transition-all duration-500 lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl md:text-3xl text-brand-forest hover:text-brand-terracotta transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/plan-your-journey"
            onClick={() => setIsOpen(false)}
            className="btn-terracotta mt-4"
          >
            Plan Your Journey
          </Link>
        </div>
      </div>
    </>
  );
}
