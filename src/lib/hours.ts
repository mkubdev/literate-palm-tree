"use client";

import { useEffect, useState } from "react";
import { hours } from "@/content/salon";

export type OpenState = {
  open: boolean;
  /** index du jour courant, 0 = lundi */
  today: number;
  label: string;
};

const fmt = (m: number) =>
  `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}`;

export function computeOpenState(now: Date): OpenState {
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

/** null pendant le rendu serveur, pour éviter un écart d'hydratation */
export function useOpenState(): OpenState | null {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setState(computeOpenState(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return state;
}
