import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Document unique : la page /simon */
export const simonPage = defineType({
  name: "simonPage",
  title: "Page Simon",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "role",
      title: "Sous le titre",
      type: "string",
      description: "Par exemple « Coiffeur · Coloriste · Visagiste ».",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description de la photo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Phrase d’ouverture",
      type: "text",
      rows: 2,
      description: "Affichée en grand, sous le titre.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "array",
      description: "Un bloc par paragraphe.",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "cta",
      title: "Texte du bouton de réservation",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "promisesTitle",
      title: "Titre des engagements",
      type: "string",
      description:
        "Les engagements eux-mêmes se modifient dans « Page d’accueil » › Le salon : une seule liste pour tout le site.",
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: { prepare: () => ({ title: "Page Simon" }) },
});
