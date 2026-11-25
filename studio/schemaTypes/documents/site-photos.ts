import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Image avec recadrage et texte alternatif obligatoire */
const photo = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Description de la photo",
        type: "string",
        description:
          "Ce que montre la photo, pour Google et les personnes malvoyantes.",
        validation: (rule) => rule.required(),
      }),
    ],
    validation: (rule) => rule.required(),
  });

const photoMember = defineArrayMember({
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
});

/** Document unique : toutes les photos affichées sur le site */
export const sitePhotos = defineType({
  name: "sitePhotos",
  title: "Photos du site",
  type: "document",
  icon: ImagesIcon,
  fields: [
    photo(
      "hero",
      "Photo d’accueil",
      "La grande photo en haut de la page d’accueil.",
    ),
    defineField({
      name: "salon",
      title: "Le salon (accueil)",
      description: "3 photos : une grande, puis deux petites.",
      type: "array",
      of: [photoMember],
      options: { layout: "grid" },
      validation: (rule) => rule.length(3),
    }),
    photo("simon", "Photo de Simon", "Affichée sur la page Simon."),
    defineField({
      name: "gallery",
      title: "Galerie (page Photos)",
      description:
        "L’ordre compte : la 1re et la 2e sont affichées en grand. Les 6 premières servent aussi sur l’accueil tant qu’Instagram n’est pas branché.",
      type: "array",
      of: [photoMember],
      options: { layout: "grid" },
      validation: (rule) => rule.min(3),
    }),
  ],
  preview: { prepare: () => ({ title: "Photos du site" }) },
});
