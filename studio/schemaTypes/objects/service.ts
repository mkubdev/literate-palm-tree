import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const LENGTHS = [
  { title: "Toutes longueurs", value: "toutes" },
  { title: "Cheveux courts", value: "courts" },
  { title: "Cheveux mi-longs", value: "mi-longs" },
  { title: "Cheveux longs", value: "longs" },
];

/**
 * Une prestation de la carte. Les prestations de même nom avec une longueur
 * différente sont regroupées sur le site en une ligne à trois prix.
 */
export const service = defineType({
  name: "service",
  title: "Prestation",
  type: "object",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      description:
        "Sans la longueur, par exemple « Couleur racine, brushing ». Même nom = même ligne sur le site.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "length",
      title: "Longueur de cheveux",
      type: "string",
      options: { list: LENGTHS, layout: "radio", direction: "horizontal" },
      initialValue: "toutes",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Prix (€)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "priceMax",
      title: "Prix maximum (€)",
      type: "number",
      description: "Seulement pour une fourchette, par exemple « 39 à 59 € ».",
      validation: (rule) =>
        rule.custom((max, context) => {
          const min = (context.parent as { price?: number })?.price;
          if (max != null && min != null && max <= min)
            return "Le prix maximum doit être supérieur au prix.";
          return true;
        }),
    }),
    defineField({
      name: "duration",
      title: "Durée",
      type: "string",
      description: "Par exemple « 30 min », « 1 h », « 1 h 30 ».",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "booking",
      title: "Réservation",
      type: "string",
      options: {
        list: [
          { title: "En ligne (Planity)", value: "online" },
          { title: "Par téléphone uniquement", value: "phone" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "online",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      length: "length",
      price: "price",
      priceMax: "priceMax",
      duration: "duration",
      booking: "booking",
    },
    prepare: ({ name, length, price, priceMax, duration, booking }) => ({
      title: length && length !== "toutes" ? `${name} · ${length}` : name,
      subtitle: [
        priceMax ? `${price} à ${priceMax} €` : `${price} €`,
        duration,
        booking === "phone" ? "par téléphone" : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
