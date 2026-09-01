"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CreditCard, MapPin } from "lucide-react";
import { getJourneySearchMeta } from "@/data/packages";

function HikerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="13" cy="4.5" r="1.6" />
      <path d="M11.2 8.2 8.4 12.4M12.4 8.4l1.1 3.2 3.2 1M9.8 21.2 12.2 11.6l2.7 3.4 2.3 6.2M8.2 14.8h3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const locations = [
  { value: "", label: "Where to next?" },
  { value: "uganda", label: "Uganda" },
  { value: "kenya", label: "Kenya" },
  { value: "tanzania", label: "Tanzania" },
  { value: "rwanda", label: "Rwanda" },
  { value: "zanzibar", label: "Zanzibar" },
];

export default function JourneySearchBar() {
  const router = useRouter();
  const meta = useMemo(() => getJourneySearchMeta(), []);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");

  const durationSummary = `${meta.minDays} Days – ${meta.maxDays} Days`;
  const priceSummary = `$${meta.minPrice.toLocaleString()} – $${meta.maxPrice.toLocaleString()}`;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("country", location);
    if (type) params.set("type", type);
    if (days) params.set("days", days);
    if (price) params.set("price", price);
    const query = params.toString();
    router.push(query ? `/packages/east-africa?${query}` : "/packages/east-africa");
  }

  return (
    <div className="journey-search-wrap">
      <form className="journey-search" onSubmit={handleSearch} aria-label="Search journeys">
        <label className="journey-search-field">
          <span className="journey-search-label">Location</span>
          <span className="journey-search-control">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Location"
            >
              {locations.map((item) => (
                <option key={item.value || "any"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <MapPin size={16} aria-hidden />
          </span>
        </label>

        <label className="journey-search-field">
          <span className="journey-search-label">Type</span>
          <span className="journey-search-control">
            <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Trip type">
              <option value="">Trip type</option>
              {meta.types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <HikerIcon className="h-4 w-4" />
          </span>
        </label>

        <label className="journey-search-field">
          <span className="journey-search-label">Duration</span>
          <span className="journey-search-control">
            <select value={days} onChange={(e) => setDays(e.target.value)} aria-label="Duration">
              <option value="">{durationSummary}</option>
              {meta.durations.map((item) => (
                <option key={item} value={String(item)}>
                  {item} {item === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
            <Calendar size={16} aria-hidden />
          </span>
        </label>

        <label className="journey-search-field">
          <span className="journey-search-label">Price</span>
          <span className="journey-search-control">
            <select value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Price">
              <option value="">{priceSummary}</option>
              <option value="under-1500">Under $1,500</option>
              <option value="1500-3000">$1,500–$3,000</option>
              <option value="3000-plus">$3,000+</option>
            </select>
            <CreditCard size={16} aria-hidden />
          </span>
        </label>

        <button type="submit" className="journey-search-submit">
          Search
        </button>
      </form>
    </div>
  );
}
