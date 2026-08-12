"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon } from "leaflet";
import { packages } from "@/data/packages";
import { cn } from "@/lib/utils";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

type OverviewMapProps = {
  className?: string;
  height?: string;
  /** Mobile-first responsive heights via Tailwind classes */
  responsive?: boolean;
  filterCountry?: string;
};

export const mapHeightClasses =
  "h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]";

export default function OverviewMap({
  className = "",
  height = "340px",
  responsive = true,
  filterCountry,
}: OverviewMapProps) {
  const [mounted, setMounted] = useState(false);
  const [icon, setIcon] = useState<Icon | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      await import("leaflet/dist/leaflet.css");
      const L = await import("leaflet");
      if (!active) return;
      setIcon(
        L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      );
      setMounted(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filteredPackages = filterCountry
    ? packages.filter(
        (p) => p.country.toLowerCase() === filterCountry.toLowerCase()
      )
    : packages;

  if (!mounted || !icon) {
    return (
      <div
        className={cn(
          "bg-brand-sand animate-pulse",
          responsive ? mapHeightClasses : "",
          className
        )}
        style={responsive ? undefined : { height }}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        responsive ? mapHeightClasses : "",
        className
      )}
      style={responsive ? undefined : { height }}
    >
      <MapContainer
        center={[0.5, 33.0]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPackages.map((pkg) => (
          <Marker
            key={pkg.id}
            position={[pkg.mapCoordinates.lat, pkg.mapCoordinates.lng]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{pkg.name}</strong>
                <br />
                {pkg.destination}
                <br />
                <a
                  href={`/packages/${pkg.slug}`}
                  className="text-[#C4785A] underline"
                >
                  View Package
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
