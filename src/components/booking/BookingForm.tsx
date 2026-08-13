"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package } from "@/data/packages";
import { formatCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type BookingFormProps = {
  pkg: Package;
};

export default function BookingForm({ pkg }: BookingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    travelers: 1,
    preferredDate: "",
    specialRequests: "",
    paymentType: "partial" as "partial" | "full",
  });

  const totalAmount = pkg.price > 0 ? pkg.price * form.travelers : 0;
  const partialAmount =
    totalAmount > 0
      ? Math.round(totalAmount * (pkg.partialPaymentPercent / 100))
      : 0;
  const payAmount = form.paymentType === "full" ? totalAmount : partialAmount;

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageId: pkg.id,
          packageSlug: pkg.slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push(`/booking/confirmation?ref=${data.reference}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? "bg-brand-forest text-white"
                  : "bg-brand-sand text-brand-charcoal/40"
              }`}
            >
              {s}
            </div>
            <span className="text-xs uppercase tracking-wider text-brand-charcoal/60 hidden sm:inline">
              {s === 1 ? "Details" : s === 2 ? "Payment" : "Confirm"}
            </span>
            {s < 3 && <div className="flex-1 h-px bg-brand-sand-dark" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="heading-sub text-brand-forest">Your Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Full Name *
              </label>
              <input
                type="text"
                className="input-field"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Email *
              </label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Phone *
              </label>
              <input
                type="tel"
                className="input-field"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Alternate Phone
              </label>
              <input
                type="tel"
                className="input-field"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Country *
              </label>
              <input
                type="text"
                className="input-field"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Number of Travelers *
              </label>
              <input
                type="number"
                min={1}
                className="input-field"
                value={form.travelers}
                onChange={(e) => update("travelers", parseInt(e.target.value) || 1)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Preferred Travel Date *
              </label>
              <input
                type="date"
                className="input-field"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-charcoal mb-1">
                Special Requests
              </label>
              <textarea
                className="textarea-field"
                value={form.specialRequests}
                onChange={(e) => update("specialRequests", e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.fullName || !form.email || !form.phone || !form.country || !form.preferredDate}
            className="btn-primary disabled:opacity-50"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="heading-sub text-brand-forest">Payment Option</h2>
          <div className="bg-brand-sand p-6 border border-brand-sand-dark mb-6">
            <h3 className="font-serif text-lg text-brand-forest mb-2">{pkg.name}</h3>
            <p className="text-sm text-brand-charcoal/60">{pkg.duration} &middot; {form.travelers} traveler(s)</p>
            {totalAmount > 0 && (
              <p className="font-serif text-2xl text-brand-forest mt-3">
                Total: {formatCurrency(totalAmount, pkg.currency)}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <label
              className={`block p-6 border cursor-pointer transition-colors ${
                form.paymentType === "partial"
                  ? "border-brand-forest bg-brand-forest/5"
                  : "border-brand-sand-dark hover:border-brand-forest/30"
              }`}
            >
              <input
                type="radio"
                name="paymentType"
                value="partial"
                checked={form.paymentType === "partial"}
                onChange={() => update("paymentType", "partial")}
                className="sr-only"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-brand-forest">Partial Payment (Deposit)</h4>
                  <p className="text-sm text-brand-charcoal/60 mt-1">
                    Pay {pkg.partialPaymentPercent}% now to secure your booking. Remaining balance due before travel.
                  </p>
                </div>
                {totalAmount > 0 && (
                  <span className="font-serif text-xl text-brand-terracotta">
                    {formatCurrency(partialAmount, pkg.currency)}
                  </span>
                )}
              </div>
            </label>

            <label
              className={`block p-6 border cursor-pointer transition-colors ${
                form.paymentType === "full"
                  ? "border-brand-forest bg-brand-forest/5"
                  : "border-brand-sand-dark hover:border-brand-forest/30"
              }`}
            >
              <input
                type="radio"
                name="paymentType"
                value="full"
                checked={form.paymentType === "full"}
                onChange={() => update("paymentType", "full")}
                className="sr-only"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-brand-forest">Full Payment</h4>
                  <p className="text-sm text-brand-charcoal/60 mt-1">
                    Pay the complete package amount now.
                  </p>
                </div>
                {totalAmount > 0 && (
                  <span className="font-serif text-xl text-brand-terracotta">
                    {formatCurrency(totalAmount, pkg.currency)}
                  </span>
                )}
              </div>
            </label>
          </div>

          {totalAmount === 0 && (
            <p className="text-sm text-brand-charcoal/60 p-4 bg-brand-sand border border-brand-sand-dark">
              [PACKAGE PRICE — TO BE ADDED] Pricing will be confirmed by our team upon booking.
            </p>
          )}

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="btn-secondary">
              Back
            </button>
            <button onClick={() => setStep(3)} className="btn-primary">
              Review &amp; Pay
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="heading-sub text-brand-forest">Confirm Your Booking</h2>
          <div className="bg-white border border-brand-sand-dark p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><strong>Name:</strong> {form.fullName}</div>
              <div><strong>Email:</strong> {form.email}</div>
              <div><strong>Phone:</strong> {form.phone}</div>
              <div><strong>Country:</strong> {form.country}</div>
              <div><strong>Travelers:</strong> {form.travelers}</div>
              <div><strong>Date:</strong> {form.preferredDate}</div>
              <div><strong>Package:</strong> {pkg.name}</div>
              <div>
                <strong>Payment:</strong>{" "}
                {form.paymentType === "full" ? "Full Payment" : "Partial Payment"}
              </div>
            </div>
            {totalAmount > 0 && (
              <div className="pt-4 border-t border-brand-sand-dark">
                <p className="font-serif text-2xl text-brand-forest">
                  Amount to pay: {formatCurrency(payAmount, pkg.currency)}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-terracotta flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
