import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const SINGLETONS = ["homePage", "sitePhotos"];

export default defineConfig({
  name: "default",
  title: "Simon Bouvatier",
  projectId: "8b9euu7b",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Documents uniques : pas de création depuis le menu
    templates: (templates) =>
      templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            (a) =>
              !["duplicate", "delete", "unpublish"].includes(a.action ?? ""),
          )
        : actions,
  },
});
