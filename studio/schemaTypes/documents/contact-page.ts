import { PinIcon } from "@sanity/icons/Pin";
import { defineArrayMember, defineField, defineType } from "sanity";

const DAYS = [
  ["monday", "Lundi"],
  ["tuesday", "Mardi"],
  ["wednesday", "Mercredi"],
  ["thursday", "Jeudi"],
  ["friday", "Vendredi"],
  ["saturday", "Samedi"],
  ["sunday", "Dimanche"],
] as const;

/**
 * Document unique : la page /contact et les coordonnées du salon.
 * Ces informations servent sur tout le site (en-tête, pied de page, accueil,
 * statut « Ouvert », fiche Google, mentions légales).
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Page Contact",
  type: "document",
  icon: PinIcon,
  groups: [
    { name: "contact", title: "Coordonnées", default: true },
    { name: "hours", title: "Horaires" },
    { name: "closures", title: "Fermetures" },
    { name: "map", title: "Plan" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre de la section",
      type: "string",
      group: "contact",
      description: "Sur la page Contact et en bas de l’accueil.",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "street",
      title: "Adresse",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zip",
      title: "Code postal",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.required().regex(/^\d{5}$/, { name: "code postal" }),
    }),
    defineField({
      name: "city",
      title: "Ville",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "district",
      title: "Arrondissement",
      type: "string",
      group: "contact",
      description: "Affiché en version courte, par exemple « Lyon 6e ».",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "access",
      title: "Accès",
      type: "string",
      group: "contact",
      description: "Par exemple « Entre les métros Cordeliers et Part-Dieu ».",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      group: "contact",
      description: "Format 04 78 41 42 99. Affiché partout sur le site.",
      validation: (rule) =>
        rule.required().regex(/^0\d( \d\d){4}$/, { name: "04 78 41 42 99" }),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    ...DAYS.map(([name, title]) =>
      defineField({
        name,
        title,
        type: "dayHours",
        group: "hours",
        validation: (rule) => rule.required(),
      }),
    ),
    defineField({
      name: "closures",
      title: "Fermetures exceptionnelles",
      type: "array",
      group: "closures",
      description:
        "Congés, jours fériés… Un bandeau apparaît sur tout le site 3 semaines avant et pendant la fermeture, et le statut « Ouvert » passe à « Fermé · réouverture le … ». Les fermetures passées peuvent être supprimées.",
      of: [
        defineArrayMember({
          type: "object",
          name: "closure",
          title: "Fermeture",
          fields: [
            defineField({
              name: "from",
              title: "Premier jour fermé",
              type: "date",
              options: { dateFormat: "DD/MM/YYYY" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "to",
              title: "Dernier jour fermé",
              type: "date",
              options: { dateFormat: "DD/MM/YYYY" },
              description:
                "Le même jour que le premier pour une seule journée.",
              validation: (rule) =>
                rule.required().custom((to, ctx) => {
                  const from = (ctx.parent as { from?: string })?.from;
                  return from && to && to < from
                    ? "Le dernier jour doit être après le premier"
                    : true;
                }),
            }),
            defineField({
              name: "reason",
              title: "Motif (facultatif)",
              type: "string",
              description:
                "Par exemple « Congés d’été ». Affiché dans le bandeau.",
              validation: (rule) => rule.max(60),
            }),
          ],
          preview: {
            select: { from: "from", to: "to", reason: "reason" },
            prepare: ({ from, to, reason }) => {
              const f = (d?: string) =>
                d ? d.split("-").reverse().join("/") : "?";
              return {
                title:
                  from === to ? `Le ${f(from)}` : `Du ${f(from)} au ${f(to)}`,
                subtitle: reason,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
      group: "map",
      description:
        "Position de l’épingle sur le plan. À changer seulement si le salon déménage (clic droit sur Google Maps → coordonnées).",
      validation: (rule) => rule.required().min(-90).max(90),
    }),
    defineField({
      name: "lng",
      title: "Longitude",
      type: "number",
      group: "map",
      validation: (rule) => rule.required().min(-180).max(180),
    }),
  ],
  preview: { prepare: () => ({ title: "Page Contact" }) },
});
