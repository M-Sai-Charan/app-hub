import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
   experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: true,
  },
   images: {
    domains: ['encrypted-tbn0.gstatic.com','ui-avatars.com', 'firebasestorage.googleapis.com','res.cloudinary.com'],
  },
};

export default nextConfig;
