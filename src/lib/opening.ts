// Calcul des horaires, sans React : utilisable côté serveur et navigateur
import type { hours as localHours } from "@/content/salon";

/** 0 = lundi … 6 = dimanche, plages en minutes depuis minuit */
export type Hours = typeof localHours;

export type OpenState = {
  open: boolean;
  /** index du jour courant, 0 = lundi */
  today: number;
  label: string;
};

export const fmt = (m: number) =>
  `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}`;

/** Fermeture exceptionnelle, dates incluses au format AAAA-MM-JJ */
export type Closure = { from: string; to: string; reason?: string };

const DAY_MS = 86_400_000;
const toUtc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const toIso = (t: number) => new Date(t).toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) =>
  toIso(toUtc(iso) + n * DAY_MS);
/** 0 = lundi … 6 = dimanche */
const weekday = (iso: string) => (new Date(toUtc(iso)).getUTCDay() + 6) % 7;

/** Date et heure à Paris, quel que soit le fuseau du serveur ou du visiteur */
export function parisNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const date = `${get("year")}-${get("month")}-${get("day")}`;
  return {
    date,
    day: weekday(date),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const closureOn = (closures: Closure[], iso: string) =>
  closures.find((c) => c.from <= iso && iso <= c.to);

/** « 1 décembre » → « 1er décembre » */
const premier = (t: string) => t.replace(/(^|\s)1 (?=\p{L})/gu, "$11er ");

const longDate = (iso: string, withYear = false) =>
  premier(
    new Intl.DateTimeFormat("fr-FR", {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long",
      ...(withYear ? { year: "numeric" } : {}),
    }).format(toUtc(iso)),
  );

/** « du 22 au 30 décembre », « du 28 décembre au 3 janvier », « le 24 décembre » */
export function closureRange(c: Closure, todayIso: string) {
  const year = todayIso.slice(0, 4);
  const opts = (iso: string): Intl.DateTimeFormatOptions => ({
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    ...(iso.slice(0, 4) !== year ? { year: "numeric" } : {}),
  });
  const f = (iso: string, o = opts(iso)) =>
    new Intl.DateTimeFormat("fr-FR", o).format(toUtc(iso));
  if (c.from === c.to) return premier(`le ${f(c.from)}`);
  const sameMonth = c.from.slice(0, 7) === c.to.slice(0, 7);
  const start = sameMonth
    ? new Intl.DateTimeFormat("fr-FR", {
        timeZone: "UTC",
        day: "numeric",
      }).format(toUtc(c.from))
    : f(c.from);
  return premier(`du ${start} au ${f(c.to)}`);
}

/** Prochain jour ouvert après `iso` (exclu), en sautant les fermetures */
function nextOpening(hours: Hours, closures: Closure[], iso: string) {
  for (let i = 1; i <= 120; i++) {
    const d = addDays(iso, i);
    const slot = hours[weekday(d)].open;
    if (slot && !closureOn(closures, d)) return { date: d, offset: i, slot };
  }
  return null;
}

export function computeOpenState(
  now: Date,
  hours: Hours,
  closures: Closure[] = [],
): OpenState {
  const { date, day: today, minutes } = parisNow(now);
  const closed = closureOn(closures, date);
  const slot = closed ? undefined : hours[today].open;

  if (slot && minutes >= slot[0] && minutes < slot[1]) {
    return { open: true, today, label: `Ouvert · ferme à ${fmt(slot[1])}` };
  }
  if (slot && minutes < slot[0]) {
    return { open: false, today, label: `Fermé · ouvre à ${fmt(slot[0])}` };
  }
  const next = nextOpening(hours, closures, date);
  if (!next) return { open: false, today, label: "Fermé" };
  // Après une fermeture exceptionnelle, on annonce la date exacte de réouverture
  const when =
    next.offset === 1
      ? "demain"
      : closed || next.offset > 6
        ? `le ${longDate(next.date)}`
        : hours[weekday(next.date)].day.toLowerCase();
  return {
    open: false,
    today,
    label: `Fermé · ${closed ? "réouverture" : "ouvre"} ${when} à ${fmt(next.slot[0])}`,
  };
}

/**
 * Message du bandeau : fermeture en cours, ou annoncée dans les `ahead` jours.
 * null s'il n'y a rien à dire.
 */
export function closureNotice(
  closures: Closure[],
  hours: Hours,
  now: Date,
  ahead = 21,
) {
  const { date } = parisNow(now);
  const current = closureOn(closures, date);
  if (current) {
    const next = nextOpening(hours, closures, current.to);
    return {
      current: true,
      text: `Le salon est fermé jusqu’au ${closureRange({ ...current, from: current.to }, date).replace(/^le /, "")}${
        next ? ` · réouverture le ${longDate(next.date)}` : ""
      }`,
      reason: current.reason,
    };
  }
  const upcoming = closures
    .filter((c) => c.from > date && c.from <= addDays(date, ahead))
    .sort((a, b) => a.from.localeCompare(b.from))[0];
  if (!upcoming) return null;
  return {
    current: false,
    text: `Fermeture exceptionnelle ${closureRange(upcoming, date)}`,
    reason: upcoming.reason,
  };
}

/** « Du mardi au samedi, 9h–19h » quand les jours ouverts se suivent avec les mêmes heures */
export function hoursSummary(hours: Hours): string {
  const open = hours
    .map((h, i) => ({ ...h, i }))
    .filter((h): h is typeof h & { open: [number, number] } => !!h.open);
  if (!open.length) return "Fermé";
  const [a, b] = open[0].open;
  const same = open.every((h) => h.open[0] === a && h.open[1] === b);
  const contiguous = open.every((h, k) => k === 0 || h.i === open[k - 1].i + 1);
  const span = `${fmt(a)}–${fmt(b)}`;
  if (same && contiguous && open.length > 1)
    return `Du ${open[0].day.toLowerCase()} au ${open[open.length - 1].day.toLowerCase()}, ${span}`;
  return same
    ? `${open.map((h) => h.day).join(", ")}, ${span}`
    : open
        .map((h) => `${h.day} ${fmt(h.open[0])}–${fmt(h.open[1])}`)
        .join(", ");
}
