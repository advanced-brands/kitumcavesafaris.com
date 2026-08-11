"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type Booking = {
  reference: string;
  fullName: string;
  email: string;
  packageName: string;
  destination: string;
  amountPaid: number;
  totalAmount: number;
  currency: string;
  paymentType: string;
  paymentStatus: string;
  remainingBalance: number | null;
  transactionRef: string | null;
  travelers: number;
  preferredDate: string;
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const demo = searchParams.get("demo");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ref) {
      setError("No booking reference found.");
      setLoading(false);
      return;
    }

    async function confirm() {
      try {
        await fetch("/api/bookings/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: ref,
            demo: demo === "true",
            transactionId: searchParams.get("transaction_id"),
          }),
        });

        const res = await fetch(`/api/bookings/confirm?ref=${ref}`);
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setBooking(data);
      } catch {
        setError("Unable to load booking confirmation.");
      } finally {
        setLoading(false);
      }
    }

    confirm();
  }, [ref, demo, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <p className="animate-pulse text-brand-charcoal/50">Confirming your booking...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 section-padding">
        <p className="body-large text-brand-charcoal/60 mb-6">{error || "Booking not found."}</p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-brand-forest text-center">
        <div className="section-padding max-w-2xl mx-auto">
          <CheckCircle className="w-16 h-16 text-brand-terracotta mx-auto mb-6" />
          <h1 className="heading-display text-white mb-4">Booking Confirmed</h1>
          <p className="body-large !text-white/70">
            Thank you, {booking.fullName}. Your journey with Kitum Cave Safaris
            is secured.
          </p>
          {demo === "true" && (
            <p className="mt-4 text-sm text-brand-terracotta-light bg-brand-forest-light/40 px-4 py-2 inline-block">
              Demo mode — connect Flutterwave keys in .env for live payments.
            </p>
          )}
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-xl mx-auto border border-brand-sand-dark bg-white p-8 md:p-10">
          <p className="label-text mb-6 text-center">Booking Summary</p>
          <dl className="space-y-4 text-sm">
            {[
              ["Reference", booking.reference],
              ["Package", booking.packageName],
              ["Destination", booking.destination],
              ["Travelers", String(booking.travelers)],
              ["Preferred Date", booking.preferredDate],
              ["Payment Type", booking.paymentType],
              ["Amount Paid", formatCurrency(booking.amountPaid, booking.currency)],
              ["Status", booking.paymentStatus],
              ...(booking.remainingBalance
                ? [
                    [
                      "Remaining Balance",
                      formatCurrency(booking.remainingBalance, booking.currency),
                    ] as [string, string],
                  ]
                : []),
              ["Email", booking.email],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-brand-sand-dark pb-3"
              >
                <dt className="text-brand-charcoal/50">{label}</dt>
                <dd className="text-brand-forest font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`/api/receipt?ref=${booking.reference}`}
              className="btn-primary flex-1 text-center"
            >
              <Download size={16} />
              Download Receipt
            </a>
            <Link href="/" className="btn-secondary flex-1 text-center">
              Return Home
            </Link>
          </div>

          <p className="text-xs text-brand-charcoal/50 text-center mt-6">
            A receipt has also been sent to {booking.email}. Our team will
            contact you shortly to finalize arrangements.
          </p>
        </div>
      </section>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-32">
          <p className="animate-pulse text-brand-charcoal/50">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
