import { Clock, MapPin, Phone } from "lucide-react";
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

export const metadata: Metadata = { title: "V4 · Maison — Simon Bouvatier" };

const nav = [
  ["La maison", "#maison"],
  ["Carte des services", "#carte"],
  ["Avis", "#avis"],
  ["Contact", "#contact"],
];

function Ornament() {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center gap-3 text-(--gold)"
    >
      <span className="h-px w-12 bg-current" />
      <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
        <path d="M6 0 7.5 4.5 12 6 7.5 7.5 6 12 4.5 7.5 0 6 4.5 4.5Z" />
      </svg>
      <span className="h-px w-12 bg-current" />
    </span>
  );
}

export default function V4() {
  return (
    <>
      <header className="border-b border-(--hair)">
        <div className="mx-auto grid max-w-[84rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-4 sm:px-10">
          <nav
            aria-label="Sections"
            className="caps hidden gap-7 text-[0.7rem] lg:flex"
          >
            {nav.slice(0, 2).map(([l, h]) => (
              <a
                key={h}
                href={h}
                className="transition-colors hover:text-(--gold-deep)"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#top"
            className="col-start-1 justify-self-start lg:col-start-2 lg:justify-self-center"
          >
            <Signature className="text-[2.1rem] sm:text-[2.6rem]" />
          </a>
          <div className="col-start-3 flex items-center justify-end gap-7">
            <nav
              aria-label="Sections, suite"
              className="caps hidden gap-7 text-[0.7rem] lg:flex"
            >
              {nav.slice(2).map(([l, h]) => (
                <a
                  key={h}
                  href={h}
                  className="transition-colors hover:text-(--gold-deep)"
                >
                  {l}
                </a>
              ))}
            </nav>
            <a
              href={salon.bookingUrl}
              target="_blank"
              rel="noopener"
              className="caps bg-(--gold) px-4 py-2.5 text-[0.7rem] text-(--ink) transition-colors hover:bg-(--ink) hover:text-white"
            >
              Réserver
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="px-5 pt-14 sm:px-10 sm:pt-20">
          <div className="mx-auto max-w-[84rem] text-center">
            <h1 className=" text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.01em] text-balance">
              Une coiffure pensée pour{" "}
              <em className="text-(--gold-deep)">vous</em>,
              <br className="hidden sm:block" /> posée par une seule main.
            </h1>
            <div className="rule mx-auto mt-10 w-fit">
              <Ornament />
            </div>
            <p className="caps mt-6 text-xs text-(--gold-deep)">
              Coiffeur · Coloriste · Visagiste · Lyon 6e
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-[84rem]">
            <div className="reveal relative aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
              <Image
                src={photos.atWork.src}
                alt={photos.atWork.alt}
                fill
                priority
                sizes="(min-width: 1344px) 1344px, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="relative z-10 mx-auto -mt-10 grid max-w-[72rem] bg-white shadow-[0_24px_48px_-24px_rgb(20_18_16/0.3)] sm:-mt-12 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <p className="flex items-center gap-3 border-b border-(--hair) px-6 py-5 sm:border-r sm:border-b-0">
                <Clock
                  className="size-4 shrink-0 text-(--gold-deep)"
                  strokeWidth={1.5}
                />
                <OpenStatus />
              </p>
              <a
                href={salon.mapsUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 border-b border-(--hair) px-6 py-5 hover:text-(--gold-deep) sm:border-r sm:border-b-0"
              >
                <MapPin
                  className="size-4 shrink-0 text-(--gold-deep)"
                  strokeWidth={1.5}
                />
                {salon.address.street}
              </a>
              <a
                href={salon.phoneHref}
                className="flex items-center gap-3 px-6 py-5 hover:text-(--gold-deep)"
              >
                <Phone
                  className="size-4 shrink-0 text-(--gold-deep)"
                  strokeWidth={1.5}
                />
                {salon.phone}
              </a>
              <a
                href={salon.bookingUrl}
                target="_blank"
                rel="noopener"
                className="caps grid place-items-center bg-(--ink) px-10 py-5 text-xs text-white transition-colors hover:bg-(--gold-deep)"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </section>

        <section
          id="maison"
          className="scroll-mt-6 px-5 py-24 sm:px-10 sm:py-32"
        >
          <div className="mx-auto grid max-w-[76rem] gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={photos.salon.src}
                alt={photos.salon.alt}
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="caps text-2xl leading-snug sm:text-3xl">
                La maison
              </h2>
              <p className="mt-2 font-(family-name:--font-signature) text-5xl text-(--gold-deep)">
                rue Pierre Corneille
              </p>
              <div className="mt-8 max-w-[58ch] space-y-5 leading-relaxed text-(--muted)">
                <p>
                  Entre Cordeliers et Part-Dieu, Simon reçoit dans un salon
                  calme, pensé pour la détente. Coiffeur, coloriste et
                  visagiste, il vous écoute d'abord, puis compose la coupe et la
                  couleur qui vont à votre visage et à votre style.
                </p>
                <p>
                  De la coupe simple à la transformation complète : balayage,
                  mèches, extensions, lissages brésilien, japonais ou botox, et
                  soins avec des produits haut de gamme adaptés à chaque nature
                  de cheveu.
                </p>
              </div>
              <ul className="mt-10 border-t border-(--hair)">
                {promises.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-4 border-b border-(--hair) py-3.5"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 rotate-45 bg-(--gold)"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="carte"
          className="scroll-mt-6 bg-(--veil) px-5 py-24 sm:px-10 sm:py-32"
        >
          <div className="mx-auto max-w-[46rem]">
            <div className="text-center">
              <h2 className="caps text-3xl sm:text-4xl">Carte des services</h2>
              <div className="mt-6">
                <Ornament />
              </div>
              <p className="mt-6 text-(--muted) italic">
                Diagnostic offert. Le lissage, le mariage et les extensions se
                réservent par téléphone.
              </p>
            </div>
            {services.map((c) => (
              <div key={c.id} className="mt-16">
                <h3 className="caps text-center text-sm text-(--gold-deep)">
                  {c.name}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {c.services.map((s) => (
                    <li key={s.name} className="flex items-baseline gap-3">
                      <span>
                        {s.name}
                        <span className="ml-2 text-sm text-(--muted) italic">
                          {s.duration}
                        </span>
                      </span>
                      <span aria-hidden className="leader" />
                      <span className="shrink-0 tabular-nums">{s.price}</span>
                    </li>
                  ))}
                </ul>
                {c.more ? (
                  <p className="mt-4 text-center text-sm">
                    <a
                      href={salon.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-(--gold-deep) italic underline decoration-(--gold) underline-offset-4"
                    >
                      et {c.more} autres prestations, sur Planity
                    </a>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <div className="relative h-40 sm:h-56">
          <Image
            src={photos.leaves.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section
          id="avis"
          className="scroll-mt-6 px-5 py-24 text-center sm:px-10 sm:py-32"
        >
          <div className="mx-auto max-w-[52rem]">
            <blockquote className=" text-[clamp(1.6rem,3.2vw,2.5rem)] leading-snug text-balance italic">
              « {reviews[0].text} »
            </blockquote>
            <p className="caps mt-8 text-xs text-(--gold-deep)">
              {salon.rating.score} / 5 · {salon.rating.count} avis Planity
            </p>
            <ul className="mt-12 grid gap-8 text-left sm:grid-cols-3">
              {reviews.slice(1, 4).map((r) => (
                <li
                  key={r.text}
                  className="border-t border-(--hair) pt-5 text-(--muted) italic"
                >
                  « {r.text} »
                  {r.author ? (
                    <span className="caps mt-2 block text-[0.65rem] not-italic">
                      {r.author}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="scroll-mt-6 bg-(--ink) text-white">
          <div className="mx-auto grid max-w-[76rem] gap-14 px-5 py-20 sm:px-10 md:grid-cols-3">
            <div>
              <Signature className="text-5xl text-(--gold)" />
              <address className="mt-6 leading-relaxed text-white/80 not-italic">
                {salon.address.street}
                <br />
                {salon.address.zip} {salon.address.city}
                <br />
                <span className="text-white/60 italic">
                  {salon.address.access}
                </span>
              </address>
            </div>
            <div>
              <h2 className="caps text-xs text-(--gold)">Horaires</h2>
              <dl className="mt-5 space-y-2 text-white/85">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6">
                    <dt>{h.day}</dt>
                    <dd
                      className={`tabular-nums ${h.open ? "" : "text-white/50 italic"}`}
                    >
                      {h.open ? "9h – 19h" : "fermé"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="caps text-xs text-(--gold)">Rendez-vous</h2>
              <a
                href={salon.bookingUrl}
                target="_blank"
                rel="noopener"
                className="caps bg-(--gold) px-6 py-4 text-center text-xs text-(--ink) transition-colors hover:bg-white"
              >
                Réserver en ligne
              </a>
              <a
                href={salon.phoneHref}
                className="caps border border-white/25 px-6 py-4 text-center text-xs transition-colors hover:border-(--gold)"
              >
                {salon.phone}
              </a>
              <a
                href={salon.facebook}
                target="_blank"
                rel="noopener"
                className="text-sm text-white/60 hover:text-white"
              >
                Suivre le salon sur Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
