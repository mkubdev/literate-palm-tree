import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { booking, fr, SiteFooter, SiteHeader } from "@/components/site";
import { bio } from "@/content/salon";
import { pageMeta } from "@/lib/seo";
import { getHome, getPhotos } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Simon, coiffeur, coloriste et visagiste",
  description:
    "Coiffeur, coloriste et visagiste formé à Valence et à Paris, Simon Bouvatier vous reçoit seul dans son salon du 75 rue Pierre Corneille, Lyon 6e.",
  ...pageMeta(
    "/team",
    "Simon, coiffeur, coloriste et visagiste · Simon Bouvatier, coiffeur à Lyon 6e",
    "Coiffeur, coloriste et visagiste formé à Valence et à Paris, Simon Bouvatier vous reçoit seul dans son salon du 75 rue Pierre Corneille, Lyon 6e.",
    "simon",
  ),
};

export default async function Team() {
  const [{ simon }, { promises }] = await Promise.all([getPhotos(), getHome()]);
  return (
    <>
      <SiteHeader current="/team" />
      <main>
        <section className="mx-auto grid max-w-[86rem] gap-12 px-5 pt-16 pb-24 sm:px-10 sm:pt-24 lg:grid-cols-12 lg:gap-0 lg:pb-32">
          <div className="rise lg:col-span-5 lg:pr-16">
            <h1 className="display text-[clamp(3.25rem,7vw,6rem)] leading-[0.98]">
              Simon
            </h1>
            <p className="label mt-6 text-(--taupe)">
              Coiffeur · Coloriste · Visagiste
            </p>
            <p className="display mt-12 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.2]">
              {fr(bio[0])}
            </p>
            {bio.slice(1).map((p) => (
              <p
                key={p}
                className="mt-6 max-w-[56ch] text-lg leading-relaxed text-(--taupe)"
              >
                {fr(p)}
              </p>
            ))}
            <a {...booking} className="btn mt-12">
              Prendre rendez-vous avec Simon{" "}
              <ArrowUpRight className="size-4" strokeWidth={1.25} />
            </a>
          </div>
          <figure className="unveil relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:self-start">
            <Image
              src={simon.src}
              alt={simon.alt}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: simon.position }}
            />
          </figure>
        </section>
        <section className="bg-(--veil)">
          <div className="mx-auto grid max-w-[86rem] gap-10 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-12">
            <h2 className="display text-5xl leading-none sm:text-6xl lg:col-span-5">
              Ses engagements
            </h2>
            <ul className="lg:col-span-7">
              {promises.map((p) => (
                <li
                  key={p}
                  className="display border-b border-(--line) py-5 text-2xl first:border-t sm:text-3xl"
                >
                  {fr(p)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
