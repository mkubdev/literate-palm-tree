import { ListIcon } from "@sanity/icons/List";
import { defineArrayMember, defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Catégorie de prestations",
  type: "document",
  icon: ListIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nom de la catégorie",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant",
      type: "slug",
      description: "Sert de lien direct sur le site (/services#coloration).",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre d’affichage",
      type: "number",
      description: "1 = en premier.",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "services",
      title: "Prestations",
      type: "array",
      of: [defineArrayMember({ type: "service" })],
      validation: (rule) => rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Ordre d’affichage",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", services: "services", order: "order" },
    prepare: ({ title, services, order }) => ({
      title: `${order ?? "–"}. ${title}`,
      subtitle: `${services?.length ?? 0} prestations`,
    }),
  },
});
