"use client";

import { ArrowUpRight, Phone } from "lucide-react";
import { useState } from "react";
import { salon, services } from "@/content/salon";

export function Coffret() {
  const [id, setId] = useState(services[0].id);
  const cat = services.find((c) => c.id === id) ?? services[0];
  const offline = cat.services.every((s) => !s.online);

  return (
    <div className="grid overflow-hidden shadow-[0_40px_80px_-40px_rgb(15_13_12/0.5)] lg:grid-cols-[19rem_1fr]">
      <div
        role="tablist"
        aria-label="Familles de prestations"
        className="velvet flex gap-1 overflow-x-auto p-3 lg:flex-col lg:p-5"
      >
        {services.map((c) => {
          const active = c.id === id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setId(c.id)}
              className={`display shrink-0 px-4 py-3 text-left text-lg whitespace-nowrap transition-colors lg:text-xl ${
                active
                  ? "bg-(--velvet-2) text-(--gold)"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {active ? (
                <span
                  aria-hidden
                  className="mr-3 inline-block size-1.5 -translate-y-1 rotate-45 bg-(--gold)"
                />
              ) : null}
              {c.name}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="bg-(--satin) p-6 sm:p-10">
        <h3 className="display text-4xl italic">{cat.name}</h3>
        <ul className="mt-8 divide-y divide-(--satin-2) border-y border-(--satin-2)">
          {cat.services.map((s) => (
            <li
              key={s.name}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-4"
            >
              <span>
                {s.name}
                <span className="block text-sm text-(--muted)">
                  {s.duration}
                </span>
              </span>
              <span className="display text-2xl tabular-nums">{s.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {offline ? (
            <a
              href={salon.phoneHref}
              className="flex items-center gap-3 bg-(--velvet) px-6 py-3.5 text-sm tracking-[0.14em] text-(--gold) uppercase"
            >
              <Phone className="size-4" strokeWidth={1.5} /> Sur rendez-vous ·{" "}
              {salon.phone}
            </a>
          ) : (
            <a
              href={salon.bookingUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 bg-(--velvet) px-6 py-3.5 text-sm tracking-[0.14em] text-(--gold) uppercase"
            >
              Réserver en ligne{" "}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </a>
          )}
          {cat.more ? (
            <span className="text-sm text-(--muted)">
              + {cat.more} autres prestations sur Planity
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
