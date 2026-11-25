import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/salon";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/access-contact", priority: 0.8 },
    { path: "/team", priority: 0.7 },
    { path: "/photos", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
