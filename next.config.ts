import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ["convex"],
  },
  images: {
    domains: ["images.clerk.dev"],
  },
};

export default nextConfig;
