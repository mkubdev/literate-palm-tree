import type { Metadata } from "next";

/**
 * Métadonnées de partage (WhatsApp, Facebook, Instagram, X…) propres à une page.
 * Next remplace l'objet openGraph du layout au lieu de le fusionner : chaque
 * page repasse donc par ici, avec sa propre image (public/brand/partage-*.jpg, 1200×630).
 */
const IMAGES = {
  accueil: [
    "partage",
    "Salon de coiffure Simon Bouvatier, 75 rue Pierre Corneille, Lyon 6e",
  ],
  services: ["partage-services", "Carte des services du salon Simon Bouvatier"],
  simon: ["partage-simon", "Simon Bouvatier, coiffeur, coloriste et visagiste"],
  photos: ["partage-photos", "Le salon Simon Bouvatier en images"],
  contact: [
    "partage-contact",
    "Venir au salon Simon Bouvatier, du mardi au samedi",
  ],
} as const;

export function pageMeta(
  path: string,
  title: string,
  description: string,
  card: keyof typeof IMAGES = "accueil",
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const [file, alt] = IMAGES[card];
  const image = {
    url: `/brand/${file}.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt,
  };
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Simon Bouvatier",
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
