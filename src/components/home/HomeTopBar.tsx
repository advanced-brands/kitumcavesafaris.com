"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import { siteConfig } from "@/data/packages";

const STORAGE_KEY = "kitum-home-topbar-dismissed";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function setTopbarOffset(px: number) {
  document.documentElement.style.setProperty("--kitum-topbar", `${px}px`);
  window.dispatchEvent(new CustomEvent("kitum-topbar", { detail: px }));
}

const phoneDisplay = `+${siteConfig.whatsapp.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4")}`;

const socials = [
  siteConfig.social.facebook
    ? { href: siteConfig.social.facebook, label: "Facebook", Icon: Facebook }
    : null,
  { href: siteConfig.social.x, label: "X", Icon: XIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  siteConfig.social.tiktok
    ? { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon }
    : null,
].filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function HomeTopBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!onHome || !open) {
      setTopbarOffset(0);
      return;
    }

    const el = barRef.current;
    if (!el) return;

    const publishHeight = () => setTopbarOffset(el.offsetHeight);
    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(el);
    window.addEventListener("resize", publishHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", publishHeight);
    };
  }, [open, onHome]);

  if (!onHome || !open) return null;

  return (
    <div ref={barRef} className="hero-topbar" role="region" aria-label="Contact and group bookings">
      <div className="hero-topbar-promo">
        <p className="hero-topbar-promo-text">
          Planning a group safari, or booking as an agent? Ask us for a tailored quote.
        </p>
        <Link href="/plan-your-journey" className="hero-topbar-book">
          Book now
        </Link>
        <button type="button" className="hero-topbar-dismiss" aria-label="Dismiss announcement" onClick={() => {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
          setOpen(false);
          setTopbarOffset(0);
        }}>
          <X size={14} strokeWidth={2.25} />
        </button>
      </div>

      <div className="hero-topbar-meta">
        <div className="hero-topbar-contact">
          <a href={`tel:+${siteConfig.whatsapp}`} className="hero-topbar-link">
            <span className="hero-topbar-k">Tel:</span> {phoneDisplay}
          </a>
          <span className="hero-topbar-rule" aria-hidden />
          <a href={`mailto:${siteConfig.email}`} className="hero-topbar-link">
            <span className="hero-topbar-k">Email:</span> {siteConfig.email}
          </a>
        </div>

        <div className="hero-topbar-socials">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hero-topbar-social"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
