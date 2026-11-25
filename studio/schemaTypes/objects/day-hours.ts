import { ClockIcon } from "@sanity/icons/Clock";
import { defineField, defineType } from "sanity";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Horaires d'un jour : fermé, ou une plage d'ouverture */
export const dayHours = defineType({
  name: "dayHours",
  title: "Horaires du jour",
  type: "object",
  icon: ClockIcon,
  options: { columns: 3 },
  fields: [
    defineField({
      name: "open",
      title: "Ouvert",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "opens",
      title: "Ouverture",
      type: "string",
      description: "Format 09:00",
      hidden: ({ parent }) => !parent?.open,
      validation: (rule) =>
        rule.custom((v, ctx) => {
          if (!(ctx.parent as { open?: boolean })?.open) return true;
          return v && TIME.test(v) ? true : "Heure au format 09:00";
        }),
    }),
    defineField({
      name: "closes",
      title: "Fermeture",
      type: "string",
      description: "Format 19:00",
      hidden: ({ parent }) => !parent?.open,
      validation: (rule) =>
        rule.custom((v, ctx) => {
          const p = ctx.parent as { open?: boolean; opens?: string };
          if (!p?.open) return true;
          if (!v || !TIME.test(v)) return "Heure au format 19:00";
          return p.opens && v <= p.opens
            ? "La fermeture doit être après l’ouverture"
            : true;
        }),
    }),
  ],
  preview: {
    select: { open: "open", opens: "opens", closes: "closes" },
    prepare: ({ open, opens, closes }) => ({
      title: open ? `${opens} – ${closes}` : "Fermé",
    }),
  },
});
