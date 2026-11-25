import { HomeIcon } from "@sanity/icons/Home";
import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import { ListIcon } from "@sanity/icons/List";
import { PinIcon } from "@sanity/icons/Pin";
import { UserIcon } from "@sanity/icons/User";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (
  S: StructureBuilder,
  id: string,
  title: string,
  icon: typeof HomeIcon,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(id).documentId(id).title(title));

/** Menu de Simon : les pages dans l'ordre du site, puis la carte et les photos */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      singleton(S, "homePage", "Page d’accueil", HomeIcon),
      singleton(S, "simonPage", "Page Simon", UserIcon),
      singleton(S, "photosPage", "Page Photos", ImageIcon),
      singleton(S, "contactPage", "Page Contact", PinIcon),
      S.divider(),
      S.listItem()
        .title("Carte des prestations")
        .icon(ListIcon)
        .child(
          S.documentTypeList("serviceCategory")
            .title("Catégories")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      singleton(S, "sitePhotos", "Photos du site", ImagesIcon),
    ]);
