import "server-only";
import { cache } from "react";
import {
  home as localHome,
  hours as localHours,
  photos as localPhotos,
  photosPage as localPhotosPage,
  services as localServices,
  simonPage as localSimon,
  type ServiceCategory,
  salon,
  salonPhotos,
} from "@/content/salon";
import { fmt, type Hours, hoursSummary } from "@/lib/opening";
import { client, urlFor } from "./client";

/** Contenu modifiable par Simon dans le Studio, relu au plus toutes les 60 s */
const REVALIDATE = 60;

export type Photo = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** point d'intérêt choisi dans le Studio, pour object-position */
  position?: string;
};

type SanityImage = {
  alt?: string;
  asset?: { _ref: string };
  crop?: object;
  hotspot?: { x: number; y: number };
  dimensions?: { width: number; height: number };
};

const IMAGE = `{ ..., "dimensions": asset->metadata.dimensions }`;

async function query<T>(groq: string): Promise<T | null> {
  try {
    return await client.fetch<T>(
      groq,
      {},
      { next: { revalidate: REVALIDATE, tags: ["sanity"] } },
    );
  } catch {
    // Sanity indisponible : on garde le contenu de secours du dépôt
    return null;
  }
}

function toPhoto(img: SanityImage | undefined, fallback: Photo): Photo {
  if (!img?.asset || !img.dimensions) return fallback;
  return {
    src: urlFor(img).auto("format").url(),
    alt: img.alt ?? fallback.alt,
    w: img.dimensions.width,
    h: img.dimensions.height,
    position: img.hotspot
      ? `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%`
      : undefined,
  };
}

type SanityCategory = {
  title: string;
  slug: string;
  services: {
    name: string;
    length: string;
    price: number;
    priceMax?: number;
    duration: string;
    booking: "online" | "phone";
  }[];
};

/** Carte des prestations (catégories dans l'ordre choisi par Simon) */
export async function getServices(): Promise<ServiceCategory[]> {
  const data = await query<SanityCategory[]>(
    `*[_type == "serviceCategory" && count(services) > 0] | order(order asc){
      title, "slug": slug.current,
      services[]{ name, length, price, priceMax, duration, booking }
    }`,
  );
  if (!data?.length) return localServices;
  return data.map((c) => ({
    id: c.slug,
    name: c.title,
    services: c.services.map((s) => ({
      name:
        s.length && s.length !== "toutes" ? `${s.name} · ${s.length}` : s.name,
      duration: s.duration,
      price: s.priceMax ? `${s.price} à ${s.priceMax} €` : `${s.price} €`,
      online: s.booking !== "phone",
    })),
  }));
}

const fallbackPhotos = {
  hero: salonPhotos.facade,
  salon: [salonPhotos.allee, salonPhotos.postes, salonPhotos.bacs],
  simon: localPhotos.atWork,
  gallery: [
    salonPhotos.allee,
    salonPhotos.facade,
    salonPhotos.postes,
    localPhotos.salon,
    salonPhotos.bacs,
    salonPhotos.vitrine,
    salonPhotos.produits,
  ],
};

/** Photos du site, document unique « Photos du site » dans le Studio */
export async function getPhotos() {
  const data = await query<{
    hero?: SanityImage;
    salon?: SanityImage[];
    simon?: SanityImage;
    gallery?: SanityImage[];
  }>(
    `*[_id == "sitePhotos"][0]{
      hero${IMAGE}, simon${IMAGE}, salon[]${IMAGE}, gallery[]${IMAGE}
    }`,
  );
  const list = (imgs: SanityImage[] | undefined, fallback: Photo[]) =>
    imgs?.length
      ? imgs.map((img, i) => toPhoto(img, fallback[i] ?? fallback[0]))
      : fallback;
  return {
    hero: toPhoto(data?.hero, fallbackPhotos.hero),
    salon: list(data?.salon, fallbackPhotos.salon),
    simon: toPhoto(data?.simon, fallbackPhotos.simon),
    gallery: list(data?.gallery, fallbackPhotos.gallery),
  };
}

export type Home = typeof localHome;

/** Textes de l'accueil, document unique « Page d'accueil » ; chaque champ vide retombe sur le texte par défaut */
export async function getHome(): Promise<Home> {
  const data = await query<Partial<Home>>(
    `*[_id == "homePage"][0]{
      title, intro, salonTitle, salonText, promises,
      servicesTitle, servicesText, rating{score, count},
      reviews[]{ text, author }, closing
    }`,
  );
  const text = (v: string | undefined, fallback: string) =>
    v?.trim() || fallback;
  return {
    title: text(data?.title, localHome.title),
    intro: text(data?.intro, localHome.intro),
    salonTitle: text(data?.salonTitle, localHome.salonTitle),
    salonText: text(data?.salonText, localHome.salonText),
    promises: data?.promises?.length ? data.promises : localHome.promises,
    servicesTitle: text(data?.servicesTitle, localHome.servicesTitle),
    servicesText: text(data?.servicesText, localHome.servicesText),
    rating:
      data?.rating?.score != null && data.rating.count != null
        ? data.rating
        : localHome.rating,
    reviews: data?.reviews?.length ? data.reviews : localHome.reviews,
    closing: text(data?.closing, localHome.closing),
  };
}

/** Page /simon, document unique « Page Simon » ; la photo retombe sur l'ancienne « Photos du site » */
export async function getSimon() {
  const [data, photos] = await Promise.all([
    query<{
      title?: string;
      role?: string;
      lead?: string;
      bio?: string[];
      cta?: string;
      promisesTitle?: string;
      photo?: SanityImage;
    }>(
      `*[_id == "simonPage"][0]{ title, role, lead, bio, cta, promisesTitle, photo${IMAGE} }`,
    ),
    getPhotos(),
  ]);
  const text = (v: string | undefined, fallback: string) =>
    v?.trim() || fallback;
  const bio = data?.bio?.map((p) => p.trim()).filter(Boolean);
  return {
    title: text(data?.title, localSimon.title),
    role: text(data?.role, localSimon.role),
    lead: text(data?.lead, localSimon.lead),
    bio: bio?.length ? bio : localSimon.bio,
    cta: text(data?.cta, localSimon.cta),
    promisesTitle: text(data?.promisesTitle, localSimon.promisesTitle),
    photo: toPhoto(data?.photo, photos.simon),
  };
}

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
type Day = { open?: boolean; opens?: string; closes?: string };
const minutes = (t?: string) => {
  const m = t?.match(/^(\d\d):(\d\d)$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
};

/**
 * Coordonnées et horaires du salon, document unique « Page Contact ».
 * Servent sur tout le site : en-tête, pied de page, statut « Ouvert », fiche Google.
 */
export const getInfo = cache(async () => {
  const d = await query<
    {
      title?: string;
      street?: string;
      zip?: string;
      city?: string;
      district?: string;
      access?: string;
      phone?: string;
      email?: string;
      lat?: number;
      lng?: number;
    } & Partial<Record<(typeof DAYS)[number], Day>>
  >(`*[_id == "contactPage"][0]`);
  const a = salon.address;
  const text = (v: string | undefined, fallback: string) =>
    v?.trim() || fallback;

  // Une journée mal saisie reprend l'horaire par défaut plutôt que d'afficher n'importe quoi
  const hours: Hours = localHours.map((h, i) => {
    const day = d?.[DAYS[i]];
    if (!day) return h;
    if (!day.open) return { day: h.day, short: h.short };
    const o = minutes(day.opens);
    const c = minutes(day.closes);
    return o != null && c != null && c > o
      ? { day: h.day, short: h.short, open: [o, c] as [number, number] }
      : h;
  });

  const phone = text(d?.phone, salon.phone ?? "");
  const lat = d?.lat ?? a.lat;
  const lng = d?.lng ?? a.lng;
  return {
    title: text(d?.title, "Venir au salon"),
    street: text(d?.street, a.street),
    zip: text(d?.zip, a.zip),
    city: text(d?.city, a.city),
    district: text(d?.district, a.district),
    access: d ? (d.access?.trim() ?? "") : a.access,
    phone,
    phoneHref: `tel:+33${phone.replace(/\D/g, "").replace(/^0/, "")}`,
    email: text(d?.email, salon.email),
    lat,
    lng,
    mapsUrl: `https://www.google.com/maps?daddr=${lat},${lng}`,
    hours,
    hoursSummary: hoursSummary(hours),
    /** « 9h – 19h » ou « Fermé », pour le tableau des horaires */
    slot: (h: Hours[number]) =>
      h.open ? `${fmt(h.open[0])} – ${fmt(h.open[1])}` : "Fermé",
  };
});
export type Info = Awaited<ReturnType<typeof getInfo>>;

/** Textes de la page /photos, document unique « Page Photos » */
export async function getPhotosPage() {
  const d = await query<Partial<typeof localPhotosPage>>(
    `*[_id == "photosPage"][0]{ title, intro, worksTitle, worksText }`,
  );
  const text = (v: string | undefined, fallback: string) =>
    v?.trim() || fallback;
  return {
    title: text(d?.title, localPhotosPage.title),
    intro: text(d?.intro, localPhotosPage.intro),
    worksTitle: text(d?.worksTitle, localPhotosPage.worksTitle),
    worksText: text(d?.worksText, localPhotosPage.worksText),
  };
}
