import { PinIcon } from "@sanity/icons/Pin";
import { defineField, defineType } from "sanity";

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
