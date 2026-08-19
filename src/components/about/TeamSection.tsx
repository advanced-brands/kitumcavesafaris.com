import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/packages";
import { teamMembers, type TeamMember } from "@/data/team";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function getMemberBio(bio: TeamMember["bio"]) {
  return Array.isArray(bio) ? bio[0] : bio;
}

function isPlaceholder(member: TeamMember) {
  return member.name.includes("[TEAM MEMBER");
}

const defaultSocialLinks = [
  { href: siteConfig.social.x, label: "X", icon: XIcon },
  { href: siteConfig.social.instagram, label: "Instagram", icon: Instagram },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin },
];

function getMemberSocialLinks(member: TeamMember) {
  if (member.social) {
    return [
      { href: member.social.linkedin, label: "LinkedIn", icon: Linkedin },
      member.social.email
        ? { href: `mailto:${member.social.email}`, label: "Email", icon: Mail }
        : null,
      { href: member.social.substack, label: "Substack", icon: SubstackIcon },
      { href: member.social.x, label: "X", icon: XIcon },
      { href: member.social.instagram, label: "Instagram", icon: Instagram },
      { href: member.social.tiktok, label: "TikTok", icon: TikTokIcon },
    ].filter((link): link is { href: string; label: string; icon: typeof Mail } =>
      Boolean(link?.href)
    );
  }

  return defaultSocialLinks.filter((link) => Boolean(link.href));
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const socialLinks = getMemberSocialLinks(member);

  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 transition-colors duration-300 hover:border-brand-terracotta/30 hover:bg-white/[0.05]">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-white sm:h-28 sm:w-28">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="112px"
        />
      </div>

      <div className="w-full min-w-0 flex-1">
        <h3 className="font-serif text-xl text-white sm:text-2xl">{member.name}</h3>
        <p className="mt-1 text-sm text-white/50">{member.role}</p>
        <div className="my-4 h-px bg-white/10" />
        <p className="text-sm leading-relaxed text-white/65">
          {getMemberBio(member.bio)}
        </p>

        {socialLinks.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={`${member.name} on ${label}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-brand-terracotta/40 hover:bg-brand-terracotta/20 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const members = teamMembers.filter((member) => !isPlaceholder(member));

  return (
    <section className="section-padding section-spacing bg-brand-forest-dark">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal className="mb-12 text-center md:mb-16">
          <p className="label-text !text-brand-terracotta mb-4">The Team</p>
          <h2 className="heading-section text-white mb-4">Meet the people behind your journey</h2>
          <p className="body-text mx-auto max-w-2xl !text-white/60">
            These are the people who plan, coordinate, and care for every Kitum Cave Safari
            experience.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {members.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 100}>
              <TeamMemberCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
