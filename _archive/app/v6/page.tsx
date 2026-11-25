import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { OpenStatus } from "@/components/open-status";
import { Signature } from "@/components/signature";
import {
  hours,
  photos,
  promises,
  reviews,
  salon,
  services,
} from "@/content/salon";

export const metadata: Metadata = { title: "V6 · Miroir — Simon Bouvatier" };

/** Éventail Art déco */
function Fan({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI - (i * Math.PI) / 8;
        return (
          <line
            key={a}
            x1="60"
            y1="58"
            x2={60 + Math.cos(a) * 56}
            y2={58 - Math.sin(a) * 56}
          />
        );
      })}
      <path d="M4 58a56 56 0 0 1 112 0" />
      <path d="M28 58a32 32 0 0 1 64 0" />
    </svg>
  );
}

function ArchPhoto({
  photo,
  className = "",
  priority,
}: {
  photo: (typeof photos)["atWork"];
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`frame arch p-2 ${className}`}>
      <div className="arch glint relative size-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function V6() {
  return (
    <>
      <header className="border-b border-(--gold)/50">
        <div className="mx-auto flex max-w-[84rem] items-center gap-8 px-5 py-4 sm:px-10">
          <a href="#top">
            <Signature className="text-[2.4rem]" />
          </a>
          <nav
            aria-label="Sections"
            className="ml-auto hidden gap-8 text-sm tracking-[0.2em] uppercase md:flex"
          >
            <a href="#prestations" className="hover:text-(--gold-text)">
              Prestations
            </a>
            <a href="#salon" className="hover:text-(--gold-text)">
              Le salon
            </a>
            <a href="#infos" className="hover:text-(--gold-text)">
              Infos
            </a>
          </nav>
          <a
            href={salon.bookingUrl}
            target="_blank"
            rel="noopener"
            className="ml-auto bg-(--ink) px-5 py-2.5 text-sm tracking-[0.2em] text-white uppercase transition-colors hover:bg-(--gold-text) md:ml-0"
          >
            Réserver
          </a>
        </div>
      </header>

      <main id="top">
        {/* Triptyque de miroirs */}
        <section className="mx-auto max-w-[84rem] px-5 pt-12 pb-20 sm:px-10 sm:pt-16">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-10">
            <ArchPhoto
              photo={photos.atWork}
              priority
              className="order-2 hidden aspect-[3/4.4] lg:order-1 lg:block"
            />
            <div className="frame arch order-1 flex flex-col items-center px-6 pt-16 pb-10 text-center sm:px-10 sm:pt-24 lg:order-2 lg:aspect-[3/4.4] lg:justify-end">
              <Fan className="w-24 text-(--gold)" />
              <h1 className="deco mt-8 text-[clamp(2.6rem,4.4vw,4.25rem)] leading-[1.02] text-balance">
                Coiffeur, coloriste, visagiste
              </h1>
              <p className="mt-5 max-w-[34ch] leading-relaxed text-(--muted)">
                Le salon de Simon Bouvatier, rue Pierre Corneille à Lyon 6e. Une
                prestation sur mesure, adaptée à votre style et à votre
                personnalité.
              </p>
              <a
                href={salon.bookingUrl}
                target="_blank"
                rel="noopener"
                className="mt-9 flex items-center gap-3 bg-(--gold) px-7 py-4 text-sm tracking-[0.14em] whitespace-nowrap sm:tracking-[0.2em] uppercase transition-colors hover:bg-(--ink) hover:text-white"
              >
                Prendre rendez-vous{" "}
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </a>
              <p className="mt-5 text-sm text-(--muted)">
                <OpenStatus /> · <a href={salon.phoneHref}>{salon.phone}</a>
              </p>
            </div>
            <ArchPhoto
              photo={photos.salon}
              className="order-3 aspect-[3/4] lg:aspect-[3/4.4]"
            />
          </div>
        </section>

        <section className="bg-(--mist)">
          <ul className="mx-auto grid max-w-[84rem] gap-y-6 px-5 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-5">
            {promises.map((p) => (
              <li
                key={p}
                className="flex flex-col items-center gap-3 px-4 text-center leading-snug"
              >
                <Fan className="w-10 text-(--gold)" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="prestations"
          className="scroll-mt-6 mx-auto max-w-[84rem] px-5 py-24 sm:px-10"
        >
          <div className="frame arch px-6 pt-20 pb-12 sm:px-14 sm:pt-28 lg:px-20">
            <div className="text-center">
              <Fan className="mx-auto w-20 text-(--gold)" />
              <h2 className="deco mt-6 text-5xl sm:text-6xl">
                Les prestations
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-(--muted)">
                Tarifs Planity. Lissages, mariage et extensions sur rendez-vous
                au {salon.phone}.
              </p>
            </div>
            <div className="mt-16 gap-16 md:columns-2">
              {services.map((c) => (
                <div key={c.id} className="mb-12 break-inside-avoid">
                  <h3 className="flex items-center gap-4 text-sm tracking-[0.24em] text-(--gold-text) uppercase">
                    {c.name}
                    <span aria-hidden className="h-px flex-1 bg-(--gold)/60" />
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {c.services.map((s) => (
                      <li
                        key={s.name}
                        className="grid grid-cols-[1fr_auto] gap-x-4"
                      >
                        <span>
                          {s.name}
                          <span className="ml-2 text-sm text-(--muted)">
                            {s.duration}
                          </span>
                        </span>
                        <span className="tabular-nums">{s.price}</span>
                      </li>
                    ))}
                  </ul>
                  {c.more ? (
                    <a
                      href={salon.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-3 inline-block text-sm text-(--gold-text) underline decoration-(--gold) underline-offset-4"
                    >
                      + {c.more} prestations sur Planity
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="salon" className="scroll-mt-6 bg-(--ink) text-white">
          <div className="mx-auto grid max-w-[84rem] gap-14 px-5 py-24 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <ArchPhoto
              photo={photos.atWork}
              className="aspect-[4/5] max-w-md lg:hidden"
            />
            <div>
              <h2 className="deco text-5xl leading-tight sm:text-6xl">
                Simon est à votre écoute pour la beauté de vos cheveux.
              </h2>
              <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-white/70">
                De la simple coupe à la coloration, en passant par les
                balayages, les extensions et les lissages brésilien, japonais ou
                botox. Un diagnostic offert, un devis détaillé, des produits
                haut de gamme.
              </p>
            </div>
            <ul className="space-y-10">
              {reviews.slice(0, 3).map((r) => (
                <li key={r.text} className="border-t border-(--gold)/50 pt-6">
                  <p className="deco text-2xl leading-snug">« {r.text} »</p>
                  <p className="mt-3 text-sm tracking-[0.2em] text-(--gold) uppercase">
                    {r.author ?? "Avis Planity"} · {salon.rating.score}/5
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="infos"
          className="scroll-mt-6 mx-auto grid max-w-[84rem] gap-12 px-5 py-24 sm:px-10 md:grid-cols-3"
        >
          <div>
            <h2 className="deco text-4xl">Le salon</h2>
            <address className="mt-5 leading-relaxed not-italic">
              {salon.address.street}
              <br />
              {salon.address.zip} {salon.address.city}
            </address>
            <p className="mt-2 text-(--muted)">{salon.address.access}.</p>
            <a
              href={salon.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1 text-(--gold-text) underline decoration-(--gold) underline-offset-4"
            >
              Itinéraire <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div>
            <h2 className="deco text-4xl">Horaires</h2>
            <dl className="mt-5 space-y-2">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between border-b border-(--gold)/40 pb-2"
                >
                  <dt>{h.day}</dt>
                  <dd
                    className={`tabular-nums ${h.open ? "" : "text-(--muted)"}`}
                  >
                    {h.open ? "9h – 19h" : "Fermé"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="deco text-4xl">Rendez-vous</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={salon.bookingUrl}
                target="_blank"
                rel="noopener"
                className="bg-(--gold) px-6 py-4 text-center text-sm tracking-[0.2em] uppercase transition-colors hover:bg-(--ink) hover:text-white"
              >
                Réserver en ligne
              </a>
              <a
                href={salon.phoneHref}
                className="frame px-6 py-4 text-center text-sm tracking-[0.2em] uppercase"
              >
                {salon.phone}
              </a>
              <a
                href={salon.facebook}
                target="_blank"
                rel="noopener"
                className="mt-2 text-sm text-(--muted) hover:text-(--ink)"
              >
                Le salon sur Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-(--gold)/50">
        <div className="mx-auto flex max-w-[84rem] items-center justify-between px-5 py-6 sm:px-10">
          <Signature className="text-3xl" />
          <Fan className="w-10 text-(--gold)" />
        </div>
      </footer>
    </>
  );
}
