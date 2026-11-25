import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Adresses de l'ancien site (et premières versions) vers les adresses en français :
  // redirections permanentes, Google transfère le référencement
  async redirects() {
    return [
      { source: "/services", destination: "/prestations", permanent: true },
      { source: "/team", destination: "/simon", permanent: true },
      { source: "/access-contact", destination: "/contact", permanent: true },
    ];
  },
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
