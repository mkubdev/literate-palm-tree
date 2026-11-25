import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId = "8b9euu7b";
export const dataset = "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder({ projectId, dataset });
export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);
