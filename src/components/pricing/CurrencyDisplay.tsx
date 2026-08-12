"use client";

import { formatPriceInAllCurrencies } from "@/lib/currency";

type Props = {
  amountUsd: number;
  perPerson?: boolean;
  className?: string;
};

export default function CurrencyDisplay({
  amountUsd,
  perPerson = true,
  className = "",
}: Props) {
  if (amountUsd <= 0) {
    return (
      <p className={`text-sm text-brand-charcoal/60 ${className}`}>
        Price on request — contact us for a tailored quote in your currency.
      </p>
    );
  }

  const prices = formatPriceInAllCurrencies(amountUsd);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-3xl md:text-4xl text-brand-forest">
          {prices[0].formatted}
        </span>
        {perPerson && (
          <span className="text-sm text-brand-charcoal/50">per person</span>
        )}
      </div>
      <p className="text-xs text-brand-charcoal/45 mt-2 mb-3">
        Approximate display rates — final amount confirmed at booking
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {prices.map((p) => (
          <div
            key={p.code}
            className="bg-brand-sand/80 border border-brand-sand-dark px-3 py-2"
          >
            <p className="text-[10px] uppercase tracking-wider text-brand-charcoal/45">
              {p.code}
            </p>
            <p className="text-sm font-medium text-brand-forest">{p.formatted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
