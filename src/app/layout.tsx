import type { Metadata, Viewport } from "next";
import { Italiana, Jost } from "next/font/google";
import { SITE_URL, salon } from "@/content/salon";
import { pageMeta } from "@/lib/seo";
import { getInfo, getPhotos, getServices } from "@/sanity/content";
import "./globals.css";
import "./site.css";

const display = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
const text = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simon Bouvatier · Coiffeur, coloriste, visagiste à Lyon 6e",
    template: "%s · Simon Bouvatier, coiffeur à Lyon 6e",
  },
  description:
    "Salon de coiffure Simon Bouvatier, 75 rue Pierre Corneille, Lyon 6e, entre Cordeliers et Part-Dieu. Coupe, couleur, mèches, lissage brésilien, mariage. Du mardi au samedi, 9h–19h.",
  ...pageMeta(
    "/",
    "Simon Bouvatier · Coiffeur, coloriste, visagiste à Lyon 6e",
    "Salon de coiffure à Lyon 6e, entre Cordeliers et Part-Dieu. Coupe, couleur, mèches, lissage brésilien, mariage. Réservation en ligne.",
  ),
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const pad = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Fiche « salon de coiffure » lue par Google (schema.org) */
async function salonJsonLd() {
  const [services, photos, info] = await Promise.all([
    getServices(),
    getPhotos(),
    getInfo(),
  ]);
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE_URL}/#salon`,
    name: salon.name,
    description: "Coiffeur, coloriste et visagiste à Lyon 6e.",
    url: SITE_URL,
    telephone: info.phoneHref.replace("tel:", ""),
    email: info.email,
    image: photos.hero.src.startsWith("http")
      ? photos.hero.src
      : `${SITE_URL}${photos.hero.src}`,
    logo: `${SITE_URL}/brand/logo.svg`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: info.street,
      postalCode: info.zip,
      addressLocality: info.city,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: info.lat,
      longitude: info.lng,
    },
    openingHoursSpecification: info.hours.flatMap((h, i) =>
      h.open
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: `https://schema.org/${days[i]}`,
              opens: pad(h.open[0]),
              closes: pad(h.open[1]),
            },
          ]
        : [],
    ),
    sameAs: [salon.instagram, salon.facebook, salon.bookingUrl],
    potentialAction: {
      "@type": "ReserveAction",
      target: salon.bookingUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Carte des services",
      itemListElement: services.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: c.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name },
          price: s.price.match(/\d+/)?.[0],
          priceCurrency: "EUR",
        })),
      })),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`site ${display.variable} ${text.variable}`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: données structurées statiques, sans saisie utilisateur
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(await salonJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
