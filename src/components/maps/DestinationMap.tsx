"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon } from "leaflet";

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

type DestinationMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
  className?: string;
  height?: string;
};

export default function DestinationMap({
  lat,
  lng,
  zoom = 8,
  label,
  className = "",
  height = "400px",
}: DestinationMapProps) {
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

  if (!mounted || !icon) {
    return (
      <div
        className={`bg-brand-sand animate-pulse ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
