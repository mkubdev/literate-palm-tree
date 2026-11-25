"use client";

import { useOpenState } from "@/lib/hours";

export function OpenStatus({
  fallback = "Du mardi au samedi, 9h–19h",
}: {
  fallback?: string;
}) {
  const s = useOpenState();
  return (
    <span aria-live="polite" data-open={s ? String(s.open) : undefined}>
      {s ? s.label : fallback}
    </span>
  );
}

export function TodayMark({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const s = useOpenState();
  return <span data-today={s?.today === index || undefined}>{children}</span>;
}
