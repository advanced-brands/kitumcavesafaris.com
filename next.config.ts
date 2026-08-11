import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static hosting (cPanel / public_html) — builds to /out with index.html at root
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
