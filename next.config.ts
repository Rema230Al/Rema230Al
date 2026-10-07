import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static site, exported into ./out
  output: "export",
};

export default nextConfig;
