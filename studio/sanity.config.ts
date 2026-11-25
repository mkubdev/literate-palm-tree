import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Simon Bouvatier",
  projectId: "8b9euu7b",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // « Photos du site » est un document unique : pas de création depuis le menu
    templates: (templates) =>
      templates.filter((t) => t.schemaType !== "sitePhotos"),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === "sitePhotos"
        ? actions.filter(
            (a) =>
              !["duplicate", "delete", "unpublish"].includes(a.action ?? ""),
          )
        : actions,
  },
});
