import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import {
  booking,
  PageIntro,
  PriceList,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { salon } from "@/content/salon";
import { pageMeta } from "@/lib/seo";
import { getInfo } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Carte des services",
  description:
    "Tarifs du salon Simon Bouvatier : coupe, brushing, coloration, mèches, lissage brésilien, mariage, homme et enfant. Réservation en ligne 24h/24.",
  ...pageMeta(
    "/prestations",
    "Carte des services · Simon Bouvatier, coiffeur à Lyon 6e",
    "Tarifs du salon Simon Bouvatier : coupe, brushing, coloration, mèches, lissage brésilien, mariage, homme et enfant. Réservation en ligne 24h/24.",
    "services",
  ),
};

export default async function Prestations() {
  const { phone, phoneHref } = await getInfo();
  return (
    <>
      <SiteHeader current="/prestations" />
      <main>
        <PageIntro title="Carte des services">
          <p>
            Tarifs en vigueur, réservation en ligne 24h/24 et paiement au salon.
            Lissages, mariage et extensions sur rendez-vous au{" "}
            <a
              href={phoneHref}
              className="link whitespace-nowrap text-(--espresso)"
            >
              {phone}
            </a>
            .
          </p>
          <a {...booking} className="btn mt-8">
            Réserver en ligne{" "}
            <ArrowUpRight className="size-4" strokeWidth={1.25} />
          </a>
        </PageIntro>
        <div className="mx-auto max-w-[86rem] border-t border-(--line) px-5 pt-16 pb-24 sm:px-10 sm:pb-32">
          <PriceList />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
