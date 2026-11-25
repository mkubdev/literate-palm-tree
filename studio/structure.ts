import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { ListIcon } from "@sanity/icons/List";
import type { StructureResolver } from "sanity/structure";

/** Menu de Simon : la carte des prestations, puis les photos (document unique) */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      S.listItem()
        .title("Page d’accueil")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Page d’accueil"),
        ),
      S.listItem()
        .title("Carte des prestations")
        .icon(ListIcon)
        .child(
          S.documentTypeList("serviceCategory")
            .title("Catégories")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Photos du site")
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType("sitePhotos")
            .documentId("sitePhotos")
            .title("Photos du site"),
        ),
    ]);
