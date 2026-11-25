import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { hours, reviews, salon, services } from "@/content/salon";

export const metadata: Metadata = {
  title: "V3 · Couverture — Simon Bouvatier",
};

const minPrice = (id: string) => {
  const c = services.find((s) => s.id === id);
  if (!c) return "";
  const n = Math.min(...c.services.map((s) => Number.parseInt(s.price, 10)));
  return `${n} €`;
};

function CoverLine({
  href,
  className,
  rotate,
  children,
}: {
  href: string;
  className?: string;
  rotate: number;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`coverline inline-block px-2 py-1 font-extrabold uppercase leading-[0.95] ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

export default function V3() {
  return (
    <>
      <main id="top">
        {/* Couverture */}
        <section className="relative mx-auto max-w-[84rem] overflow-hidden px-4 pt-5 pb-10 sm:px-8">
          <div className="flex items-center justify-between border-b-4 border-(--ink) pb-2 text-xs font-bold tracking-wide uppercase sm:text-sm">
            <span>N° 75 · rue Pierre Corneille</span>
            <span className="hidden sm:inline">
              Lyon 6e · mardi → samedi · 9h–19h
            </span>
            <span>Coiffeur</span>
          </div>

          <h1 className="mast mast-anim mt-2 text-[clamp(5.5rem,24vw,21rem)] leading-[0.8] text-(--ink) -rotate-2">
            Simon
          </h1>
          <p className="mast -mt-[0.4em] ml-[12%] text-[clamp(2.25rem,8vw,6.5rem)] leading-none text-(--pink) rotate-[-4deg] sm:ml-[38%]">
            Bouvatier
          </p>

          <div className="relative mt-6 grid gap-8 lg:mt-2 lg:grid-cols-[1fr_minmax(0,28rem)_1fr] lg:items-center">
            <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
              <CoverLine
                href="#sommaire"
                rotate={-6}
                className="bg-(--ink) text-3xl text-white sm:text-4xl"
              >
                Une nouvelle
                <br />
                tête ?
              </CoverLine>
              <CoverLine
                href="#sommaire"
                rotate={3}
                className="text-2xl text-(--pink-deep)"
              >
                Mèches : la lumière
                <br />
                dès {minPrice("meches")}
              </CoverLine>
              <CoverLine href="#sommaire" rotate={-2} className="text-xl">
                Lissage brésilien
                <br />
                dès 200 €
              </CoverLine>
            </div>

            <figure className="halftone relative aspect-[4/5] -rotate-1 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
              <figcaption className="absolute inset-x-0 bottom-0 bg-(--ink) px-4 py-3 text-center text-sm font-semibold text-white">
                Portrait flash de Simon · photo à fournir
              </figcaption>
            </figure>

            <div className="flex flex-col items-start gap-5">
              <CoverLine
                href="#courrier"
                rotate={4}
                className="bg-(--pink) text-2xl text-white"
              >
                ★ {salon.rating.score} · {salon.rating.count} avis
              </CoverLine>
              <p className="max-w-[16rem] rotate-[-3deg] text-xl leading-tight font-bold italic">
                « Vous ne pourrez plus vous en passer ! »
              </p>
              <CoverLine href="#sommaire" rotate={-5} className="text-2xl">
                Mariage :<br />
                essai + jour J, 170 €
              </CoverLine>
              <CoverLine
                href="#sommaire"
                rotate={2}
                className="text-xl text-(--pink-deep)"
              >
                Coupe homme 27 € · enfant 20 €
              </CoverLine>
            </div>
          </div>

          <a
            href={salon.bookingUrl}
            target="_blank"
            rel="noopener"
            className="mt-10 ml-auto flex w-fit rotate-[-3deg] items-center gap-3 rounded-full bg-(--acid) px-7 py-4 text-xl font-extrabold uppercase shadow-[0_14px_28px_-12px_rgb(0_0_0/0.5)] transition-transform hover:rotate-0 sm:text-2xl lg:absolute lg:right-10 lg:bottom-12 lg:mt-0"
          >
            Réserver sur Planity{" "}
            <ArrowUpRight className="size-6" strokeWidth={3} />
          </a>
        </section>

        {/* Sommaire = tarifs */}
        <section id="sommaire" className="scroll-mt-4 bg-(--ink) text-white">
          <div className="mx-auto max-w-[84rem] px-4 py-20 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-white/20 pb-6">
              <h2 className="mast misreg text-7xl sm:text-8xl">Sommaire</h2>
              <p className="max-w-sm text-white/70">
                Tous les tarifs de ce numéro, relevés sur Planity. Le lissage,
                le mariage et les extensions se demandent directement à Simon.
              </p>
            </div>
            <div className="mt-10 columns-1 gap-12 md:columns-2">
              {services.map((c) => (
                <article key={c.id} className="mb-12 break-inside-avoid">
                  <h3 className="flex items-baseline justify-between gap-4 border-b border-white/20 pb-2">
                    <span className="text-3xl font-extrabold uppercase">
                      {c.name}
                    </span>
                    <span className="text-sm font-bold text-(--acid)">
                      dès {minPrice(c.id)}
                    </span>
                  </h3>
                  <ul className="mt-3">
                    {c.services.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-baseline gap-3 py-1.5"
                      >
                        <span>{s.name}</span>
                        <span
                          aria-hidden
                          className="mb-1 flex-1 border-b border-dotted border-white/30"
                        />
                        <span className="text-sm text-white/60">
                          {s.duration}
                        </span>
                        <span className="w-20 shrink-0 text-right font-bold whitespace-nowrap tabular-nums">
                          {s.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {c.more ? (
                    <a
                      href={salon.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-2 inline-block text-sm font-bold text-(--pink) underline underline-offset-4"
                    >
                      + {c.more} autres sur Planity
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Portrait */}
        <section className="mx-auto max-w-[84rem] px-4 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <h2 className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-extrabold uppercase">
              De l'or au bout{" "}
              <span className="misreg-sm text-(--pink)">des doigts</span>.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed [column-gap:2.5rem] md:columns-2">
              <p>
                <span className="mast float-left mr-2 text-6xl leading-[0.8] text-(--pink)">
                  R
                </span>
                ue Pierre Corneille, entre Cordeliers et Part-Dieu, Simon
                Bouvatier coiffe seul dans son salon. Pas de rotation d'équipe :
                la personne qui vous écoute est celle qui coupe, colore et
                coiffe.
              </p>
              <p>
                Visagiste, styliste, coloriste, il imagine la coupe et la
                couleur qui vous vont et transforme même les chevelures les plus
                rebelles. Femmes, hommes, enfants, barbe, mariage.
              </p>
              <p className="font-bold">
                Ses clients le disent mieux que nous : « un expert qui sait
                sublimer nos têtes ».
              </p>
            </div>
          </div>
        </section>

        {/* Courrier des lecteurs */}
        <section id="courrier" className="scroll-mt-4 bg-(--pink) text-(--ink)">
          <div className="mx-auto max-w-[84rem] px-4 py-20 sm:px-8">
            <h2 className="mast text-6xl text-white sm:text-7xl">
              Courrier des lecteurs
            </h2>
            <p className="mt-3 font-bold">
              {salon.rating.score}/5 sur {salon.rating.count} avis Planity ·
              accueil, propreté, cadre et prestation notés 5,0.
            </p>
            <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, n) => (
                <li
                  key={r.text}
                  style={{
                    transform: `rotate(${[-1.5, 1, -0.5, 1.5, -1, 0.5][n % 6]}deg)`,
                  }}
                >
                  <p className="text-2xl leading-tight font-extrabold">
                    « {r.text} »
                  </p>
                  <p className="mt-3 text-sm font-bold uppercase">
                    {r.author ?? "Client·e vérifié·e"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Infos pratiques */}
        <section className="mx-auto max-w-[84rem] px-4 py-20 sm:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h2 className="text-sm font-extrabold tracking-wide uppercase">
                Où
              </h2>
              <address className="mt-3 text-2xl leading-snug font-bold not-italic">
                {salon.address.street}
                <br />
                {salon.address.zip} {salon.address.city}
              </address>
              <p className="mt-2 text-(--muted)">{salon.address.access}.</p>
              <a
                href={salon.mapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-1 font-bold underline decoration-(--pink) decoration-3 underline-offset-4"
              >
                Itinéraire <ArrowUpRight className="size-4" />
              </a>
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wide uppercase">
                Quand
              </h2>
              <dl className="mt-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between border-b border-(--ink)/15 py-1.5"
                  >
                    <dt className={h.open ? "font-bold" : "text-(--muted)"}>
                      {h.day}
                    </dt>
                    <dd
                      className={`tabular-nums ${h.open ? "" : "text-(--muted)"}`}
                    >
                      {h.open ? "9h – 19h" : "fermé"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wide uppercase">
                Comment
              </h2>
              <p className="mt-3 text-2xl leading-snug font-bold">
                En ligne, 24h/24. On paie sur place.
              </p>
              <a
                href={salon.bookingUrl}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex rotate-[-2deg] items-center gap-2 rounded-full bg-(--acid) px-6 py-3.5 text-lg font-extrabold uppercase transition-transform hover:rotate-0"
              >
                Réserver <ArrowUpRight className="size-5" strokeWidth={3} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t-4 border-(--ink)">
        <div className="mx-auto flex max-w-[84rem] items-center justify-between px-4 py-6 sm:px-8">
          <span className="mast text-3xl">Simon</span>
          <span className="text-sm text-(--muted)">Coiffeur · Lyon 6e</span>
        </div>
      </footer>
    </>
  );
}
