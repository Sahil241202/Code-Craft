import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["convex"],
  images: {
    domains: ["images.clerk.dev"],
  },
};

export default nextConfig;
