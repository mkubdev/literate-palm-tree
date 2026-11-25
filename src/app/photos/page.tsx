import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { photos, salon, salonPhotos } from "@/content/salon";
import { getInstagramPosts } from "@/lib/instagram";
import { PageIntro, SiteFooter, SiteHeader } from "@/components/site";

export const metadata: Metadata = {
  title: "Photos du salon",
  alternates: { canonical: "/photos" },
  description:
    "Le salon Simon Bouvatier en images : lustres de cristal, miroirs signés, bacs et soins haut de gamme, rue Pierre Corneille à Lyon 6e.",
};

// Ordre pensé pour la grille : une grande, deux petites, en alternance
const gallery = [
  { ...salonPhotos.allee, span: "lg:col-span-8 lg:row-span-2" },
  { ...salonPhotos.facade, span: "lg:col-span-4 lg:row-span-2" },
  { ...salonPhotos.postes, span: "lg:col-span-4" },
  { ...photos.salon, span: "lg:col-span-4" },
  { ...salonPhotos.bacs, span: "lg:col-span-4" },
  { ...salonPhotos.vitrine, span: "lg:col-span-6" },
  { ...salonPhotos.produits, span: "lg:col-span-6" },
];

export default async function Photos() {
  const posts = await getInstagramPosts(12);

  return (
    <>
      <SiteHeader current="/photos" />
      <main>
        <PageIntro title="Le salon en images">
          <p>
            Rue Pierre Corneille, entre Cordeliers et Part-Dieu : un lieu
            lumineux, des lustres de cristal, des miroirs signés.
          </p>
        </PageIntro>
        <ul className="mx-auto grid max-w-[86rem] auto-rows-[minmax(16rem,auto)] gap-4 px-5 sm:grid-cols-2 sm:gap-6 sm:px-10 lg:grid-cols-12 lg:auto-rows-[18rem]">
          {gallery.map((p) => (
            <li
              key={p.src}
              className={`drift relative min-h-[16rem] overflow-hidden bg-(--veil) ${p.span}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        <section className="mx-auto max-w-[86rem] px-5 py-24 sm:px-10 sm:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-5xl leading-none sm:text-6xl">
              Dernières réalisations
            </h2>
            <a
              href={salon.instagram}
              target="_blank"
              rel="noopener"
              className="label link flex items-center gap-2"
            >
              {salon.instagramHandle}{" "}
              <ArrowUpRight className="size-4" strokeWidth={1.25} />
            </a>
          </div>
          {posts.length ? (
            <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {posts.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.permalink}
                    target="_blank"
                    rel="noopener"
                    className="group relative block aspect-square overflow-hidden bg-(--veil)"
                  >
                    {/* biome-ignore lint/performance/noImgElement: image servie par le CDN Instagram, URL signée et éphémère */}
                    <img
                      src={p.image}
                      alt={
                        p.caption.slice(0, 120) ||
                        "Publication Instagram du salon"
                      }
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-(--taupe)">
              Coupes, couleurs et coiffures de mariée : les réalisations de
              Simon sont à retrouver sur{" "}
              <a
                href={salon.instagram}
                target="_blank"
                rel="noopener"
                className="link text-(--espresso)"
              >
                Instagram
              </a>
              .
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
