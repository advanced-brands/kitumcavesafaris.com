import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/packages";

export default function ConfirmationPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest text-center">
        <div className="section-padding max-w-2xl mx-auto">
          <CheckCircle className="w-16 h-16 text-brand-terracotta mx-auto mb-6" />
          <h1 className="heading-display text-white mb-4">Thank You</h1>
          <p className="body-large !text-white/70">
            Your booking request is with our team. We will confirm details and
            share a secure payment link for partial or full payment.
          </p>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="body-text">
            Prefer to follow up now? Reach us on WhatsApp or email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terracotta"
            >
              Chat on WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn-secondary">
              Email Us
            </a>
            <Link href="/" className="btn-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
