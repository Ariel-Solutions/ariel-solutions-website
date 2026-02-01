import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com"], // ✅ Add this
  },
};

export default nextConfig;
