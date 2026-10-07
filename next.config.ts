import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static site, exported into ./out
  output: "export",
  // static export has no image server: images are pre-compressed WebP, next/image adds sizing + lazy loading
  images: { unoptimized: true },
};

export default nextConfig;
