"use client";

import { useOpenState } from "@/lib/hours";
import type { Hours } from "@/lib/opening";

/** « Ouvert · ferme à 19h », calculé dans le navigateur à l'heure de Paris */
export function OpenStatus({
  hours,
  fallback,
}: {
  hours: Hours;
  /** affiché pendant le rendu serveur, avant le calcul */
  fallback: string;
}) {
  const s = useOpenState(hours);
  return (
    <span aria-live="polite" data-open={s ? String(s.open) : undefined}>
      {s ? s.label : fallback}
    </span>
  );
}

export function TodayMark({
  index,
  hours,
  children,
}: {
  index: number;
  hours: Hours;
  children: React.ReactNode;
}) {
  const s = useOpenState(hours);
  return <span data-today={s?.today === index || undefined}>{children}</span>;
}
