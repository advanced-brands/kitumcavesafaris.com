"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PackageFaq } from "@/data/packages";
import { cn } from "@/lib/utils";

type Props = {
  faqs: PackageFaq[];
};

export default function PackageFaqs({ faqs }: Props) {
  const [open, setOpen] = useState<number>(0);

  if (!faqs.length) return null;

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={faq.question}
          className="border border-brand-sand-dark bg-white overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-brand-sand/40 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-medium text-brand-forest text-sm md:text-base pr-4">
              {faq.question}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "shrink-0 text-brand-charcoal/40 transition-transform",
                open === i && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open === i ? "max-h-96" : "max-h-0"
            )}
          >
            <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-brand-charcoal/75 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
