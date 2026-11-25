import type { Metadata } from "next";
import { ContactBlock, SiteFooter, SiteHeader } from "@/components/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact et accès",
  description:
    "Salon Simon Bouvatier, 75 rue Pierre Corneille, 69006 Lyon, entre les métros Cordeliers et Part-Dieu. Ouvert du mardi au samedi, 9h–19h. 04 78 41 42 99.",
  ...pageMeta(
    "/contact",
    "Contact et accès · Simon Bouvatier, coiffeur à Lyon 6e",
    "Salon Simon Bouvatier, 75 rue Pierre Corneille, 69006 Lyon, entre les métros Cordeliers et Part-Dieu. Ouvert du mardi au samedi, 9h–19h. 04 78 41 42 99.",
    "contact",
  ),
};

export default function Contact() {
  return (
    <>
      <SiteHeader current="/contact" />
      <main className="mx-auto max-w-[86rem] px-5 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
        <div className="rise">
          <ContactBlock heading="h1" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
