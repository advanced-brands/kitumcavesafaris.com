"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ItineraryDay } from "@/data/packages";
import { cn } from "@/lib/utils";

type ItineraryAccordionProps = {
  itinerary: ItineraryDay[];
};

export default function ItineraryAccordion({
  itinerary,
}: ItineraryAccordionProps) {
  const [openDay, setOpenDay] = useState<number>(1);

  return (
    <div className="space-y-3">
      {itinerary.map((day) => (
        <div
          key={day.day}
          className="bg-white border border-brand-sand-dark overflow-hidden"
        >
          <button
            onClick={() => setOpenDay(openDay === day.day ? -1 : day.day)}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-brand-sand/50 transition-colors"
            aria-expanded={openDay === day.day}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span className="font-serif text-2xl md:text-3xl text-brand-terracotta">
                {String(day.day).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-lg md:text-xl text-brand-forest">
                  {day.title}
                </h3>
                {day.accommodation && (
                  <p className="text-sm text-brand-charcoal/50 mt-1">
                    {day.accommodation}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                "text-brand-charcoal/40 transition-transform shrink-0",
                openDay === day.day && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openDay === day.day ? "max-h-[600px]" : "max-h-0"
            )}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
              <p className="body-text text-sm md:text-base pl-12 md:pl-16">
                {day.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
