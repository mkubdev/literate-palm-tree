import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { OpenStatus } from "@/components/open-status";
import { Signature } from "@/components/signature";
import { hours, photos, promises, reviews, salon } from "@/content/salon";
import { Coffret } from "./coffret";

export const metadata: Metadata = { title: "V5 · Écrin — Simon Bouvatier" };

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`foil grid aspect-square place-items-center rounded-full p-px ${className}`}
    >
      <span className="grid size-full place-items-center rounded-full bg-(--velvet)">
        <span className="foil foil-text display text-[2.6em] leading-none italic">
          SB
        </span>
      </span>
    </span>
  );
}

export default function V5() {
  return (
    <>
      <header className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-5 sm:px-10">
        <a href="#top">
          <Signature className="text-4xl" />
        </a>
        <nav
          aria-label="Sections"
          className="hidden gap-8 text-sm tracking-[0.14em] text-(--muted) uppercase md:flex"
        >
          <a href="#prestations" className="hover:text-(--ink)">
            Prestations
          </a>
          <a href="#salon" className="hover:text-(--ink)">
            Le salon
          </a>
          <a href="#infos" className="hover:text-(--ink)">
            Infos
          </a>
        </nav>
        <a
          href={salon.phoneHref}
          className="text-sm tracking-[0.08em] tabular-nums"
        >
          {salon.phone}
        </a>
      </header>

      <main id="top">
        {/* L'écrin */}
        <section className="px-3 sm:px-10">
          <div className="velvet mx-auto grid max-w-[86rem] overflow-hidden text-white shadow-[0_50px_90px_-50px_rgb(15_13_12/0.8)] lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col justify-between gap-14 p-7 sm:p-12 lg:p-16">
              <Monogram className="w-20 text-[0.8rem] sm:w-24 sm:text-base" />
              <div>
                <h1 className="display text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[1] tracking-[-0.015em] text-balance">
                  L'éclat, la lumière{" "}
                  <em className="text-(--gold)">et la brillance.</em>
                </h1>
                <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-white/70">
                  Simon Bouvatier, coiffeur coloriste et visagiste à Lyon 6e.
                  Coupe, balayage, lissage, extensions : une prestation sur
                  mesure, du diagnostic au dernier coup de brosse.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={salon.bookingUrl}
                  target="_blank"
                  rel="noopener"
                  className="foil flex items-center gap-3 px-7 py-4 text-sm font-medium tracking-[0.16em] text-(--velvet) uppercase"
                >
                  Réserver en ligne{" "}
                  <ArrowUpRight className="size-4" strokeWidth={1.75} />
                </a>
                <p className="text-sm text-white/60">
                  <OpenStatus /> · {salon.address.street}
                </p>
              </div>
            </div>
            <div className="relative min-h-[26rem] p-3 sm:p-5 lg:min-h-[44rem]">
              <div className="relative size-full min-h-[24rem] overflow-hidden outline outline-1 outline-offset-[-10px] outline-(--gold)/60">
                <Image
                  src={photos.salon.src}
                  alt={photos.salon.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[86rem] px-5 py-20 sm:px-10">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {promises.map((p) => (
              <li
                key={p}
                className="flex gap-3 border-t border-(--gold) pt-4 leading-snug"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rotate-45 bg-(--gold)"
                />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="prestations"
          className="scroll-mt-6 bg-(--satin-2) px-3 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-[86rem]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 px-2">
              <h2 className="display text-5xl leading-none sm:text-6xl">
                Le coffret{" "}
                <em className="text-(--gold-text)">des prestations</em>
              </h2>
              <p className="max-w-sm text-(--muted)">
                Tarifs Planity. Diagnostic capillaire et devis détaillé offerts.
              </p>
            </div>
            <Coffret />
          </div>
        </section>

        <section
          id="salon"
          className="scroll-mt-6 mx-auto grid max-w-[86rem] gap-14 px-5 py-24 sm:px-10 lg:grid-cols-[1fr_1.15fr] lg:items-center"
        >
          <div>
            <h2 className="display text-5xl leading-[1.02] sm:text-6xl">
              Une seule main,
              <br />
              <em className="text-(--gold-text)">de bout en bout.</em>
            </h2>
            <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-(--muted)">
              Dans un cadre de détente, Simon accorde une attention particulière
              à chaque demande. Il imagine la coupe et la couleur qui vous
              ressemblent, avec des produits haut de gamme adaptés à votre
              nature de cheveu.
            </p>
            <figure className="mt-12 border-l border-(--gold) pl-6">
              <blockquote className="display text-2xl leading-snug italic">
                « {reviews[1].text} »
              </blockquote>
              <figcaption className="mt-3 text-sm tracking-[0.14em] text-(--muted) uppercase">
                {reviews[1].author} · {salon.rating.score}/5 sur{" "}
                {salon.rating.count} avis Planity
              </figcaption>
            </figure>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photos.atWork.src}
              alt={photos.atWork.alt}
              fill
              sizes="(min-width: 1024px) 46rem, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="relative grid min-h-[22rem] place-items-center overflow-hidden px-5 py-20 text-center">
          <Image
            src={photos.glitter.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-(--velvet)/55" />
          <blockquote className="display relative max-w-3xl text-[clamp(1.8rem,3.6vw,3rem)] leading-snug text-white italic text-balance">
            « {reviews[3].text} »
          </blockquote>
        </section>

        <section id="infos" className="scroll-mt-6 velvet text-white">
          <div className="mx-auto grid max-w-[86rem] gap-14 px-5 py-20 sm:px-10 md:grid-cols-[auto_1fr_1fr]">
            <Monogram className="w-20 text-[0.8rem]" />
            <div>
              <h2 className="display text-3xl italic">Le salon</h2>
              <address className="mt-5 leading-relaxed text-white/80 not-italic">
                {salon.address.street}, {salon.address.zip} {salon.address.city}
                <br />
                {salon.address.access}
              </address>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-(--gold)">
                <a href={salon.phoneHref}>{salon.phone}</a>
                <a href={salon.mapsUrl} target="_blank" rel="noopener">
                  Itinéraire
                </a>
                <a href={salon.facebook} target="_blank" rel="noopener">
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h2 className="display text-3xl italic">Horaires</h2>
              <dl className="mt-5 grid max-w-sm grid-cols-[1fr_auto] gap-y-2 text-white/80">
                {hours.map((h) => (
                  <div key={h.day} className="contents">
                    <dt>{h.day}</dt>
                    <dd
                      className={`tabular-nums ${h.open ? "" : "text-white/45"}`}
                    >
                      {h.open ? "9h – 19h" : "Fermé"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
