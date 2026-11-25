import type { Metadata, Viewport } from "next";
import { Italiana, Jost } from "next/font/google";
import { hours, SITE_URL, salon, services } from "@/content/salon";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Simon Bouvatier",
    url: "/",
  },
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
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${SITE_URL}/#salon`,
  name: salon.name,
  description: "Coiffeur, coloriste et visagiste à Lyon 6e.",
  url: SITE_URL,
  telephone: "+33478414299",
  email: salon.email,
  image: `${SITE_URL}/images/facade.jpg`,
  logo: `${SITE_URL}/brand/logo.svg`,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 rue Pierre Corneille",
    postalCode: salon.address.zip,
    addressLocality: salon.address.city,
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: salon.address.lat,
    longitude: salon.address.lng,
  },
  openingHoursSpecification: hours.flatMap((h, i) =>
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`site ${display.variable} ${text.variable}`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: données structurées statiques, sans saisie utilisateur
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
