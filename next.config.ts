import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/8b9euu7b/**",
      },
      // Photos de l'ancien site, seulement en secours si Sanity ne répond pas
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/wavy/**",
      },
    ],
  },
};

export default nextConfig;
