import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "@/components/site";
import { company, salon } from "@/content/salon";

export const metadata: Metadata = {
  title: "Mentions légales et confidentialité",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-(--line) py-10 lg:grid-cols-12">
      <h2 className="display text-3xl leading-tight lg:col-span-4">{title}</h2>
      <div className="max-w-[62ch] space-y-4 leading-relaxed text-(--taupe) lg:col-span-8 [&_strong]:font-normal [&_strong]:text-(--espresso)">
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegales() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageIntro title="Mentions légales" />
        <div className="mx-auto max-w-[86rem] px-5 pb-24 sm:px-10 sm:pb-32">
          <Block title="Éditeur du site">
            <p>
              Le site simonbouvatier.fr est édité par{" "}
              <strong>{company.name}</strong>, {company.form}
              {company.capital ? ` au capital de ${company.capital}` : null},
              exploitant le salon de coiffure <strong>{salon.name}</strong>.
            </p>
            <p>
              Siège social : {company.address}
              <br />
              SIREN {company.siren} · RCS {company.rcs}
              <br />
              N° de TVA intracommunautaire : {company.vat}
            </p>
            <p>
              Directeur de la publication : {company.director}, président.
              <br />
              Téléphone :{" "}
              <a href={salon.phoneHref} className="link text-(--espresso)">
                {salon.phone}
              </a>{" "}
              · E-mail :{" "}
              <a
                href={`mailto:${salon.email}`}
                className="link text-(--espresso)"
              >
                {salon.email}
              </a>
            </p>
          </Block>

          <Block title="Hébergement">
            <p>
              <strong>{company.host.name}</strong>, {company.host.address}.{" "}
              <a
                href={company.host.url}
                target="_blank"
                rel="noopener"
                className="link text-(--espresso)"
              >
                {company.host.url.replace("https://", "")}
              </a>
            </p>
          </Block>

          <Block title="Propriété intellectuelle">
            <p>
              Les textes, photographies et le logo de ce site appartiennent à{" "}
              {company.name} ou à leurs auteurs. Toute reproduction sans
              autorisation est interdite. Plan : © les contributeurs
              d’OpenStreetMap.
            </p>
          </Block>

          <Block title="Données personnelles">
            <p>
              Ce site ne comporte ni formulaire, ni compte client, ni outil de
              mesure d’audience : il ne collecte aucune donnée personnelle et ne
              dépose aucun cookie.
            </p>
            <p>
              Le plan de la page Contact est chargé depuis les serveurs
              d’OpenStreetMap, qui reçoivent à cette occasion votre adresse IP.
              Les réservations se font sur Planity, dont la politique de
              confidentialité s’applique dès que vous quittez ce site.
            </p>
            <p>
              Pour toute question, écrivez à{" "}
              <a
                href={`mailto:${salon.email}`}
                className="link text-(--espresso)"
              >
                {salon.email}
              </a>
              . Vous pouvez aussi saisir la CNIL (cnil.fr).
            </p>
          </Block>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
