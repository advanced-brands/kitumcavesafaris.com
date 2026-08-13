import { siteConfig } from "@/data/packages";

type MailtoOptions = {
  to?: string;
  subject?: string;
  body?: string;
};

export function buildMailtoLink({ to, subject, body }: MailtoOptions = {}) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  const address = to ?? siteConfig.email;
  return query ? `mailto:${address}?${query}` : `mailto:${address}`;
}

export function openMailto(options: Omit<MailtoOptions, "to"> = {}) {
  window.location.href = buildMailtoLink(options);
}
