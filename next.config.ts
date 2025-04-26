import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/", // Calls to /api/* in frontend
        destination: "https://dev.taskmandu.tech", // Redirects to backend
      },
    ];
  },
};

export default nextConfig;