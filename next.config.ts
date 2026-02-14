import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Profile Images
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Placeholders
      },
    ],
  },
};

export default nextConfig;
