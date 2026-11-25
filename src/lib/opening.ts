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

export function computeOpenState(now: Date, hours: Hours): OpenState {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
  const today = Math.max(0, days.indexOf(get("weekday")));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const slot = hours[today].open;
  if (slot && minutes >= slot[0] && minutes < slot[1]) {
    return { open: true, today, label: `Ouvert · ferme à ${fmt(slot[1])}` };
  }
  if (slot && minutes < slot[0]) {
    return { open: false, today, label: `Fermé · ouvre à ${fmt(slot[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (today + i) % 7;
    const next = hours[d].open;
    if (next) {
      const when = i === 1 ? "demain" : hours[d].day.toLowerCase();
      return {
        open: false,
        today,
        label: `Fermé · ouvre ${when} à ${fmt(next[0])}`,
      };
    }
  }
  return { open: false, today, label: "Fermé" };
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
