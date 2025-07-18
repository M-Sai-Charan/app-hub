import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
