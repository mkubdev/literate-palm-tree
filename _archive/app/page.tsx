import Link from "next/link";

const versions = [
  {
    href: "/v3",
    name: "Couverture",
    line: "Une couverture de magazine underground : masthead encré, accroches de travers, sommaire des tarifs.",
  },
  {
    href: "/v4",
    name: "Maison",
    line: "Une maison de couture : blanc, filets dorés, signature script, carte des services comme un menu gastronomique.",
  },
  {
    href: "/v5",
    name: "Écrin",
    line: "Un écrin de velours noir sur satin blanc, dorure à chaud, monogramme SB, coffret des prestations.",
  },
  {
    href: "/v6",
    name: "Miroir",
    line: "Les miroirs Art déco du salon : triptyque en arches, double filet doré, éventails, reflet qui traverse les photos.",
  },
  {
    href: "/v7",
    name: "Épuré",
    line: "Blanc, espresso des cadres de miroir, une touche d'or. Le vrai logo, la façade et les photos du salon, flux Instagram.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 font-sans">
      <h1 className="text-3xl font-bold">
        Simon Bouvatier · directions artistiques
      </h1>
      <p className="mt-2 text-neutral-600">
        Cinq homepages complètes, même contenu, à comparer sur ordinateur et
        mobile.
      </p>
      <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {versions.map((v) => (
          <li key={v.href}>
            <Link href={v.href} className="block py-6 hover:bg-neutral-50">
              <span className="text-xl font-semibold">
                {v.href.slice(1).toUpperCase()} · {v.name} →
              </span>
              <span className="mt-1 block text-neutral-600">{v.line}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
