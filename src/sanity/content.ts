import "server-only";
import {
  home as localHome,
  photos as localPhotos,
  salonPhotos,
  type ServiceCategory,
  services as localServices,
} from "@/content/salon";
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
