import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { OpenStatus } from "@/components/open-status";
import {
  booking,
  ContactBlock,
  fr,
  PhoneText,
  PriceList,
  PriceSummary,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { salon } from "@/content/salon";
import { getInstagramPosts } from "@/lib/instagram";
import { getHome, getInfo, getPhotos } from "@/sanity/content";

export default async function Home() {
  const [posts, photos, home, info] = await Promise.all([
    getInstagramPosts(6),
    getPhotos(),
    getHome(),
    getInfo(),
  ]);

  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="mx-auto grid max-w-[86rem] gap-12 px-5 pt-12 pb-24 sm:px-10 lg:grid-cols-12 lg:gap-0 lg:pt-20 lg:pb-32">
          <div className="rise flex flex-col justify-between gap-12 lg:col-span-5 lg:py-6 lg:pr-12">
            <div>
              <h1 className="display text-[clamp(3.25rem,6.4vw,6rem)] leading-[0.98] tracking-[-0.01em]">
                {home.title.split("\n").map((line, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: lignes d'un même titre, ordre fixe
                  <span key={i} className="block">
                    {fr(line)}
                  </span>
                ))}
              </h1>
              <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-(--taupe)">
                {fr(home.intro)}
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a {...booking} className="btn">
                  Prendre rendez-vous{" "}
                  <ArrowUpRight className="size-4" strokeWidth={1.25} />
                </a>
                <a href={info.phoneHref} className="link text-lg tabular-nums">
                  {info.phone}
                </a>
              </div>
              <dl className="grid grid-cols-2 gap-6 border-t border-(--line) pt-6 text-sm">
                <div>
                  <dt className="label text-(--taupe)">Aujourd’hui</dt>
                  <dd className="mt-2">
                    <OpenStatus
                      hours={info.hours}
                      fallback={info.hoursSummary}
                    />
                  </dd>
                </div>
                <div>
                  <dt className="label text-(--taupe)">Adresse</dt>
                  <dd className="mt-2">
                    {info.street}, {info.district}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <figure className="unveil relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[44rem]">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photos.hero.position ?? "50% 20%" }}
            />
          </figure>
        </section>

        <section id="salon" className="scroll-mt-20 bg-(--veil) py-24 sm:py-32">
          <div className="mx-auto max-w-[86rem] px-5 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="display text-5xl leading-none sm:text-6xl lg:col-span-5">
                {fr(home.salonTitle)}
              </h2>
              <p className="max-w-[52ch] text-lg leading-relaxed text-(--taupe) lg:col-span-6 lg:col-start-7">
                {fr(home.salonText)}
              </p>
            </div>
            <div className="mt-16 grid gap-4 sm:gap-6 lg:grid-cols-12">
              {photos.salon.slice(0, 3).map((p, i) => (
                <div
                  key={`${i}-${p.src}`}
                  className={`drift relative aspect-[3/2] overflow-hidden ${
                    i === 0
                      ? "lg:col-span-8 lg:row-span-2 lg:aspect-auto"
                      : "lg:col-span-4"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 60vw, 100vw"
                        : "(min-width: 1024px) 30vw, 100vw"
                    }
                    className="object-cover"
                    style={{ objectPosition: p.position }}
                  />
                </div>
              ))}
            </div>
            <ul className="mt-16 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
              {home.promises.map((p) => (
                <li
                  key={p}
                  className="border-t border-(--gold) pt-5 leading-snug"
                >
                  {fr(p)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="prestations"
          className="scroll-mt-20 mx-auto max-w-[86rem] px-5 py-24 sm:px-10 sm:py-32"
        >
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <h2 className="display text-5xl leading-none sm:text-6xl lg:col-span-5">
              {fr(home.servicesTitle)}
            </h2>
            <div className="flex flex-wrap items-end justify-between gap-8 lg:col-span-7">
              <p className="max-w-[40ch] text-(--taupe)">
                <PhoneText text={home.servicesText} />
              </p>
              <a {...booking} className="btn btn-ghost">
                Réserver en ligne{" "}
                <ArrowUpRight className="size-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>
          <PriceSummary className="mt-12 md:hidden" />
          <PriceList className="mt-16 hidden md:block" />
        </section>

        <section id="avis" className="scroll-mt-20 border-y border-(--line)">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-10 sm:py-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <figure className="lg:col-span-8">
                <blockquote className="display text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12]">
                  «&nbsp;{fr(home.reviews[0].text)}&nbsp;»
                </blockquote>
                <figcaption className="label mt-8 text-(--taupe)">
                  Avis client vérifié · Planity
                </figcaption>
              </figure>
              <div className="flex flex-col justify-end lg:col-span-3 lg:col-start-10">
                <div aria-hidden className="flex gap-1 text-(--gold)">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.round(home.rating.score) ? "fill-current" : "fill-(--line) text-(--line)"}`}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <dl className="mt-5">
                  <div>
                    <dt className="sr-only">Note Planity</dt>
                    <dd className="display text-6xl leading-none sm:text-7xl">
                      {home.rating.score.toLocaleString("fr-FR", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                    </dd>
                    <dd className="mt-3 text-sm text-(--taupe)">
                      sur 5 · {home.rating.count} avis vérifiés Planity
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <ul className="mt-20 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {home.reviews.slice(1, 4).map((r) => (
                <li key={r.text} className="border-t border-(--line) pt-6">
                  <p className="leading-relaxed">«&nbsp;{fr(r.text)}&nbsp;»</p>
                  <p className="label mt-4 text-(--taupe)">
                    {r.author ? (
                      <span className="text-(--espresso)">{r.author}</span>
                    ) : (
                      "Avis client"
                    )}
                    {" · Planity"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-[86rem] px-5 py-24 sm:px-10 sm:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-5xl leading-none sm:text-6xl">
              {posts.length
                ? "Dernières réalisations"
                : "Le salon sur Instagram"}
            </h2>
            <a
              href={salon.instagram}
              target="_blank"
              rel="noopener"
              className="label link tap flex items-center gap-2"
            >
              {salon.instagramHandle}{" "}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
            {posts.length
              ? posts.map((p) => (
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
                ))
              : photos.gallery.slice(0, 6).map((p, i) => (
                  <li key={`${i}-${p.src}`}>
                    <a
                      href={salon.instagram}
                      target="_blank"
                      rel="noopener"
                      className="group relative block aspect-square overflow-hidden bg-(--veil)"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 15vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: p.position }}
                      />
                    </a>
                  </li>
                ))}
          </ul>
        </section>

        <section
          id="contact"
          className="scroll-mt-20 border-t border-(--line) bg-(--veil)"
        >
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-10 sm:py-32">
            <ContactBlock />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
