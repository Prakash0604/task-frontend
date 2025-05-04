import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['dev.taskmandu.tech'],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "https://dev.taskmandu.tech",
      },
    ];
  },
};

export default nextConfig;
