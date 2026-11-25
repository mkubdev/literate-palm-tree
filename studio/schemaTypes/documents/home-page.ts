import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Document unique : tous les textes de la page d'accueil, section par section */
export const homePage = defineType({
  name: "homePage",
  title: "Page d’accueil",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "En-tête", default: true },
    { name: "salon", title: "Le salon" },
    { name: "services", title: "Prestations" },
    { name: "reviews", title: "Avis" },
    { name: "closing", title: "Fin de page" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "text",
      rows: 3,
      group: "hero",
      description:
        "Le grand titre. Chaque retour à la ligne est conservé sur le site.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "intro",
      title: "Sous-titre",
      type: "text",
      rows: 3,
      group: "hero",
      description: "Le paragraphe sous le titre. Deux ou trois lignes suffisent.",
      validation: (rule) =>
        rule
          .required()
          .max(240)
          .warning("Au-delà de 240 caractères, le haut de page devient chargé."),
    }),

    defineField({
      name: "salonTitle",
      title: "Titre de la section",
      type: "string",
      group: "salon",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "salonText",
      title: "Texte",
      type: "text",
      rows: 4,
      group: "salon",
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "promises",
      title: "Engagements",
      type: "array",
      group: "salon",
      description:
        "Affichés sous les photos du salon et sur la page Simon. 5 tiennent sur une ligne sur ordinateur.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(2).max(6),
    }),

    defineField({
      name: "servicesTitle",
      title: "Titre de la section",
      type: "string",
      group: "services",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "servicesText",
      title: "Texte d’introduction",
      type: "text",
      rows: 3,
      group: "services",
      description:
        "Le numéro du salon écrit « 04 78 41 42 99 » devient cliquable automatiquement.",
      validation: (rule) => rule.required().max(300),
    }),

    defineField({
      name: "rating",
      title: "Note Planity",
      type: "object",
      group: "reviews",
      description: "À reprendre de la page Planity du salon.",
      options: { columns: 2 },
      fields: [
        defineField({
          name: "score",
          title: "Note sur 5",
          type: "number",
          validation: (rule) => rule.required().min(0).max(5).precision(1),
        }),
        defineField({
          name: "count",
          title: "Nombre d’avis",
          type: "number",
          validation: (rule) => rule.required().integer().min(0),
        }),
      ],
    }),
    defineField({
      name: "reviews",
      title: "Avis clients",
      type: "array",
      group: "reviews",
      description:
        "Le premier est affiché en grand, les trois suivants en dessous. Uniquement de vrais avis, recopiés tels quels.",
      of: [
        defineArrayMember({
          type: "object",
          name: "review",
          title: "Avis",
          fields: [
            defineField({
              name: "text",
              title: "Avis",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Prénom",
              type: "string",
              description: "Laisser vide si l’avis est anonyme.",
            }),
          ],
          preview: {
            select: { title: "text", subtitle: "author" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle || "Anonyme",
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "closing",
      title: "Phrase de fin",
      type: "string",
      group: "closing",
      description:
        "La grande phrase du bas de page, au-dessus du bouton de réservation. Affichée sur toutes les pages.",
      validation: (rule) => rule.required().max(60),
    }),
  ],
  preview: { prepare: () => ({ title: "Page d’accueil" }) },
});
