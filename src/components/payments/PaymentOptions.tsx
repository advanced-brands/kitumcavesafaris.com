import { CreditCard, Smartphone, Building2, Globe } from "lucide-react";
import { paymentMethods } from "@/data/payments";
import { cn } from "@/lib/utils";

const icons = {
  card: CreditCard,
  mobile: Smartphone,
  bank: Building2,
  international: Globe,
};

type Props = {
  compact?: boolean;
  className?: string;
};

export default function PaymentOptions({ compact = false, className }: Props) {
  return (
    <div className={cn("", className)}>
      {!compact && (
        <div className="mb-6">
          <p className="label-text mb-2">Payments</p>
          <h3 className="font-serif text-xl md:text-2xl text-brand-forest">
            Convenient Payment Options
          </h3>
          <p className="text-sm text-brand-charcoal/60 mt-2 max-w-2xl">
            Local and international travelers can pay by card, mobile money, bank
            transfer, or international gateway. Our team sends a secure link or
            instructions after you inquire.
          </p>
        </div>
      )}
      <div
        className={cn(
          "grid gap-3",
          compact ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"
        )}
      >
        {paymentMethods.map((method) => {
          const Icon = icons[method.icon];
          return (
            <div
              key={method.id}
              className="border border-brand-sand-dark bg-white p-4 md:p-5"
            >
              <Icon
                size={compact ? 20 : 24}
                className="text-brand-terracotta mb-3"
                strokeWidth={1.5}
              />
              <h4 className="font-medium text-brand-forest text-sm md:text-base mb-1">
                {method.name}
              </h4>
              {!compact && (
                <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed">
                  {method.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {method.forLocal && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-brand-sand text-brand-forest/70">
                    Local
                  </span>
                )}
                {method.forInternational && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-brand-sand text-brand-forest/70">
                    International
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
