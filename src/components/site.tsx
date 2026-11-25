import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { OpenStatus, TodayMark } from "@/components/open-status";
import { type Service, salon } from "@/content/salon";
import { closureNotice, closureRange, parisNow } from "@/lib/opening";
import { getHome, getInfo, getServices, type Info } from "@/sanity/content";

/** Réservation : page Planity du salon, dans un nouvel onglet */
export const booking = {
  href: salon.bookingUrl,
  target: "_blank",
  rel: "noopener",
} as const;

/** Mêmes adresses que l'ancien site, pour garder les liens Google */
export const pages = [
  { href: "/prestations", label: "Prestations" },
  { href: "/photos", label: "Photos" },
  { href: "/simon", label: "Simon" },
  { href: "/contact", label: "Contact" },
] as const;

/** Typographie française : espaces insécables fines et apostrophes courbes */
export const fr = (t: string) =>
  t.replace(/ ([;:!?])/g, " $1").replace(/'/g, "’");

/** Texte saisi dans le Studio : le numéro du salon y devient un lien d'appel */
export async function PhoneText({ text }: { text: string }) {
  const { phone, phoneHref } = await getInfo();
  if (!phone) return fr(text);
  const parts = fr(text).split(phone);
  return parts.map((part, i) =>
    i === 0 ? (
      part
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: morceaux d'un même texte, ordre fixe
      <span key={i}>
        <a
          href={phoneHref}
          className="link whitespace-nowrap text-(--espresso)"
        >
          {phone}
        </a>
        {part}
      </span>
    ),
  );
}

export function Logo({
  tone = "noir",
  className = "",
}: {
  tone?: "noir" | "blanc";
  className?: string;
}) {
  return (
    <LogoMark
      className={`h-auto ${tone === "blanc" ? "text-white" : "text-(--espresso)"} ${className}`}
    />
  );
}

/** Bandeau de fermeture exceptionnelle : 3 semaines avant, puis pendant */
function ClosureBanner({ info }: { info: Info }) {
  const notice = closureNotice(info.closures, info.hours, new Date());
  if (!notice) return null;
  return (
    <output
      className="closure block border-b border-(--line) bg-(--veil) px-5 py-2.5 text-center text-sm sm:px-10"
      data-current={notice.current || undefined}
    >
      {fr(notice.text)}
      {notice.reason ? (
        <span className="text-(--taupe)"> · {fr(notice.reason)}</span>
      ) : null}
    </output>
  );
}

export async function SiteHeader({ current }: { current?: string }) {
  const info = await getInfo();
  const { phone, phoneHref } = info;
  return (
    <>
      <ClosureBanner info={info} />
      <header className="sticky top-0 z-40 border-b border-(--line) bg-(--white)">
        <div className="mx-auto grid max-w-[86rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 sm:gap-6 lg:grid-cols-[1fr_auto_1fr] sm:px-10 sm:py-5">
          <nav aria-label="Pages" className="label hidden gap-8 lg:flex">
            {pages.map((p) => (
              <a
                key={p.href}
                href={p.href}
                aria-current={current === p.href ? "page" : undefined}
                className="link"
              >
                {p.label}
              </a>
            ))}
          </nav>
          <details className="menu lg:hidden">
            <summary className="label flex cursor-pointer list-none items-center gap-2 py-2">
              <span className="menu-icon" aria-hidden />
              Menu
            </summary>
            <nav
              aria-label="Pages"
              className="absolute inset-x-0 top-full border-b border-(--line) bg-(--white) px-5 pt-4 pb-8 sm:px-10"
            >
              <ul>
                {[{ href: "/", label: "Accueil" }, ...pages].map((p) => (
                  <li key={p.href} className="border-b border-(--line)">
                    <a
                      href={p.href}
                      aria-current={current === p.href ? "page" : undefined}
                      className="display flex items-center justify-between py-4 text-3xl"
                    >
                      {p.label}
                      <ArrowRight
                        aria-hidden
                        className="size-4 text-(--gold)"
                        strokeWidth={1.25}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={phoneHref}
                className="mt-6 inline-flex items-center gap-3 text-lg tabular-nums"
              >
                <Phone
                  aria-hidden
                  className="size-4 text-(--gold)"
                  strokeWidth={1.25}
                />
                {phone}
              </a>
            </nav>
          </details>
          <a href="/" className="tap col-start-2 justify-self-center">
            <Logo className="w-28 min-[400px]:w-32 sm:w-52" />
          </a>
          <div className="col-start-3 flex items-center justify-end gap-8">
            <a
              href={phoneHref}
              className="label link hidden tabular-nums md:inline"
            >
              {phone}
            </a>
            <a {...booking} className="btn btn-sm">
              Réserver
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

const LENGTHS = ["courts", "mi-longs", "longs"] as const;

type Line =
  | { kind: "single"; service: Service }
  | { kind: "lengths"; name: string; cells: (Service | undefined)[] };

/**
 * Regroupe « Patine, brushing · courts / mi-longs / longs » en une seule ligne
 * à trois prix ; les autres prestations restent des lignes simples.
 */
function toLines(list: Service[]): Line[] {
  const lines: Line[] = [];
  for (const s of list) {
    const [base, length] = s.name.split(" · ");
    const i = LENGTHS.indexOf(length as (typeof LENGTHS)[number]);
    if (i < 0) {
      lines.push({ kind: "single", service: s });
      continue;
    }
    let line = lines.find(
      (l): l is Extract<Line, { kind: "lengths" }> =>
        l.kind === "lengths" && l.name === base,
    );
    if (!line) {
      line = { kind: "lengths", name: base, cells: [] };
      lines.push(line);
    }
    line.cells[i] = s;
  }
  return lines;
}

/** « 30 min à 1 h » quand la durée change selon la longueur */
function durations(list: Service[]) {
  return [...new Set(list.map((s) => s.duration))].join(" à ");
}

function Price({
  s,
  label,
  phoneHref,
}: {
  s: Service;
  label: string;
  phoneHref: string;
}) {
  return (
    <a
      href={s.online ? booking.href : phoneHref}
      target={s.online ? booking.target : undefined}
      rel={s.online ? booking.rel : undefined}
      aria-label={
        s.online
          ? `Réserver : ${label}, ${s.price}`
          : `Appeler le salon pour : ${label}, ${s.price}`
      }
      className="price whitespace-nowrap tabular-nums"
    >
      {s.price}
    </a>
  );
}

/**
 * Carte complète des prestations, en tableaux : une ligne par prestation,
 * une colonne par longueur. Chaque prix réserve en ligne ou appelle le salon.
 */
export async function PriceList({ className = "" }: { className?: string }) {
  const [services, { phoneHref }] = await Promise.all([
    getServices(),
    getInfo(),
  ]);
  return (
    <div className={`gap-14 lg:columns-2 ${className}`}>
      {services.map((c) => {
        const lines = toLines(c.services);
        const hasLengths = lines.some((l) => l.kind === "lengths");
        return (
          <table
            key={c.id}
            id={c.id}
            className="prices mb-14 w-full scroll-mt-28 break-inside-avoid border-collapse"
          >
            <caption className="display border-b border-(--espresso) pb-3 text-left text-2xl">
              {c.name}
            </caption>
            {hasLengths ? (
              <thead>
                <tr className="text-[0.625rem] uppercase tracking-[0.1em] text-(--taupe) sm:text-[0.6875rem] sm:tracking-[0.16em]">
                  <td />
                  {LENGTHS.map((l) => (
                    <th
                      key={l}
                      scope="col"
                      className="whitespace-nowrap pt-4 pl-2 pb-1 text-right font-normal"
                    >
                      {l}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {lines.map((l) => {
                const list =
                  l.kind === "single"
                    ? [l.service]
                    : l.cells.filter((x): x is Service => Boolean(x));
                const name = l.kind === "single" ? l.service.name : l.name;
                const phoneOnly = list.every((s) => !s.online);
                return (
                  <tr
                    key={name}
                    className="border-b border-(--line) align-baseline"
                  >
                    <th
                      scope="row"
                      className="py-3.5 pr-4 text-left font-light"
                    >
                      {name}
                      <span className="mt-1 block text-sm text-(--taupe)">
                        {durations(list)}
                        {phoneOnly ? (
                          <>
                            {" · "}
                            <a href={phoneHref} className="link tap">
                              par téléphone
                            </a>
                          </>
                        ) : null}
                      </span>
                    </th>
                    {l.kind === "single" ? (
                      <td colSpan={3} className="py-3.5 text-right">
                        <Price
                          s={l.service}
                          label={name}
                          phoneHref={phoneHref}
                        />
                      </td>
                    ) : (
                      LENGTHS.map((len, i) => {
                        const s = l.cells[i];
                        return (
                          <td
                            key={len}
                            className="w-16 py-3.5 text-right sm:w-24"
                          >
                            {s ? (
                              <Price
                                s={s}
                                label={`${name}, cheveux ${len}`}
                                phoneHref={phoneHref}
                              />
                            ) : (
                              <span className="text-(--line)">—</span>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

/** « dès 29 € » : le plus petit prix d'une catégorie */
function fromPrice(list: Service[]) {
  const min = Math.min(
    ...list.map((s) => Number(s.price.match(/\d+/)?.[0] ?? Infinity)),
  );
  return `dès ${min} €`;
}

/** Version courte de la carte pour l'accueil sur mobile : une ligne par catégorie */
export async function PriceSummary({ className = "" }: { className?: string }) {
  const services = await getServices();
  return (
    <div className={className}>
      <ul className="border-t border-(--espresso)">
        {services.map((c) => (
          <li key={c.id} className="border-b border-(--line)">
            <a
              href={`/prestations#${c.id}`}
              className="flex items-baseline justify-between gap-6 py-5"
            >
              <span className="display text-2xl">{c.name}</span>
              <span className="flex shrink-0 items-center gap-3 text-(--taupe) tabular-nums">
                {fromPrice(c.services)}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 text-(--gold)"
                  strokeWidth={1.25}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href="/prestations" className="btn btn-ghost mt-10">
        Voir la carte complète{" "}
        <ArrowRight className="size-4" strokeWidth={1.25} />
      </a>
    </div>
  );
}

/**
 * Plan OpenStreetMap (sans cookie de suivi, donc sans bandeau RGPD),
 * désaturé aux couleurs du salon ; l'épingle dorée est posée au centre exact.
 */
function SalonMap({ info }: { info: Info }) {
  const { lat, lng } = info;
  const bbox = [lng - 0.0065, lat - 0.0032, lng + 0.0065, lat + 0.0032]
    .map((n) => n.toFixed(5))
    .join(",");
  return (
    <a
      href={info.mapsUrl}
      target="_blank"
      rel="noopener"
      className="map group relative block min-h-[22rem] overflow-hidden bg-(--veil) lg:min-h-full"
    >
      <iframe
        title={`Plan : ${info.street}, ${info.zip} ${info.city}`}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute -inset-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] border-0"
      />
      <span aria-hidden className="map-pin" />
      <span className="absolute right-3 bottom-2 text-[0.65rem] text-(--taupe)">
        © OpenStreetMap
      </span>
      <span className="label absolute bottom-4 left-4 flex items-center gap-2 bg-(--white) px-4 py-3 transition-colors group-hover:bg-(--espresso) group-hover:text-white">
        Itinéraire <ArrowUpRight className="size-4" strokeWidth={1.25} />
      </span>
    </a>
  );
}

/** Adresse, téléphone, horaires et plan : la carte de visite du salon */
export async function ContactBlock({
  heading = "h2",
}: {
  heading?: "h1" | "h2";
}) {
  const H = heading;
  const info = await getInfo();
  const today = parisNow(new Date()).date;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-5 lg:pr-16">
        <H className="display text-5xl leading-none sm:text-6xl">
          {fr(info.title)}
        </H>
        <dl className="mt-10 divide-y divide-(--line) border-y border-(--line)">
          <div className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr]">
            <dt className="label pt-1 text-(--taupe)">Adresse</dt>
            <dd>
              <address className="not-italic">
                {info.street}
                <br />
                {info.zip} {info.city}
              </address>
              {info.access ? (
                <p className="mt-1 text-sm text-(--taupe)">{fr(info.access)}</p>
              ) : null}
            </dd>
          </div>
          <div className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr]">
            <dt className="label pt-1 text-(--taupe)">Téléphone</dt>
            <dd>
              <a href={info.phoneHref} className="link text-2xl tabular-nums">
                {info.phone}
              </a>
              <a
                href={`mailto:${info.email}`}
                className="link tap mt-2 block w-fit text-sm text-(--taupe)"
              >
                {info.email}
              </a>
            </dd>
          </div>
          <div className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr]">
            <dt className="label pt-1 text-(--taupe)">Horaires</dt>
            <dd>
              <p>
                <OpenStatus
                  hours={info.hours}
                  closures={info.closures}
                  fallback={info.hoursSummary}
                />
              </p>
              <ul className="hours mt-4 text-sm">
                {info.hours.map((h, i) => (
                  <li key={h.day} className="flex justify-between py-1">
                    <TodayMark
                      index={i}
                      hours={info.hours}
                      closures={info.closures}
                    >
                      {h.day}
                    </TodayMark>
                    <span
                      className={`tabular-nums ${h.open ? "" : "text-(--taupe)"}`}
                    >
                      {info.slot(h)}
                    </span>
                  </li>
                ))}
              </ul>
              {info.closures.length ? (
                <ul className="mt-4 space-y-1 border-t border-(--line) pt-4 text-sm">
                  {info.closures.slice(0, 3).map((c) => (
                    <li key={c.from} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-(--gold)"
                      />
                      <span>
                        Fermeture exceptionnelle {closureRange(c, today)}
                        {c.reason ? (
                          <span className="text-(--taupe)">
                            {" "}
                            · {fr(c.reason)}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        </dl>
        <a {...booking} className="btn mt-10">
          Prendre rendez-vous{" "}
          <ArrowUpRight className="size-4" strokeWidth={1.25} />
        </a>
      </div>
      <div className="lg:col-span-7">
        <SalonMap info={info} />
      </div>
    </div>
  );
}

export async function SiteFooter() {
  const [{ closing }, info] = await Promise.all([getHome(), getInfo()]);
  return (
    <footer className="bg-(--espresso) text-white">
      <div className="mx-auto flex max-w-[86rem] flex-wrap items-end justify-between gap-10 border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
        <p className="display max-w-[14ch] text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02]">
          {fr(closing)}
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a {...booking} className="btn btn-light">
            Prendre rendez-vous{" "}
            <ArrowUpRight className="size-4" strokeWidth={1.25} />
          </a>
          <a href={info.phoneHref} className="link text-lg tabular-nums">
            {info.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto grid max-w-[86rem] gap-12 px-5 py-16 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="blanc" className="w-52" />
          <p className="label mt-6 text-white/60">
            Coiffeur · Coloriste · Visagiste
          </p>
        </div>
        <nav
          aria-label="Pages du site"
          className="flex flex-col gap-3 md:col-span-3"
        >
          {[{ href: "/", label: "Accueil" }, ...pages].map((p) => (
            <a key={p.href} href={p.href} className="link tap w-fit">
              {p.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 md:col-span-4">
          <address className="not-italic leading-relaxed">
            {info.street}
            <br />
            {info.zip} {info.city}
          </address>
          <a
            href={salon.instagram}
            target="_blank"
            rel="noopener"
            className="link tap mt-3 w-fit"
          >
            Instagram
          </a>
          <a
            href={salon.facebook}
            target="_blank"
            rel="noopener"
            className="link tap w-fit"
          >
            Facebook
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[86rem] flex-wrap justify-between gap-4 border-t border-white/10 px-5 py-8 text-sm text-white/60 sm:px-10">
        <p>
          © {new Date().getFullYear()} {salon.name} · Coiffeur à {info.district}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a
            href={salon.bookingUrl}
            target="_blank"
            rel="noopener"
            className="link tap"
          >
            Réservation en ligne avec Planity
          </a>
          <a href="/mentions-legales" className="link tap">
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Ouverture commune aux pages intérieures : titre et chapô */
export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rise mx-auto max-w-[86rem] px-5 pt-16 pb-14 sm:px-10 sm:pt-24 sm:pb-20">
      <h1 className="display text-[clamp(3.25rem,7vw,6rem)] leading-[0.98]">
        {title}
      </h1>
      {children ? (
        <div className="mt-8 max-w-[52ch] text-lg leading-relaxed text-(--taupe)">
          {children}
        </div>
      ) : null}
    </div>
  );
}
