import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

/** Document unique : les textes de la page /photos (la galerie est dans « Photos du site ») */
export const photosPage = defineType({
  name: "photosPage",
  title: "Page Photos",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "intro",
      title: "Texte d’introduction",
      type: "text",
      rows: 3,
      description:
        "Sous le titre. Les photos elles-mêmes se changent dans « Photos du site » › Galerie.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "worksTitle",
      title: "Titre des réalisations",
      type: "string",
      description: "Section du bas, avec le lien vers Instagram.",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "worksText",
      title: "Texte des réalisations",
      type: "text",
      rows: 2,
      description:
        "Affiché tant que le flux Instagram n’est pas branché. Le mot « Instagram » devient un lien vers le compte.",
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: { prepare: () => ({ title: "Page Photos" }) },
});
