/**
 * Import initial : carte des prestations et photos du site actuel vers Sanity.
 * Lancer une seule fois : `pnpm seed` (utilise la session de `sanity login`).
 * S'arrête si des catégories existent déjà, pour ne rien dupliquer.
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import { photos, salonPhotos, services } from "../../src/content/salon";

const client = getCliClient({ apiVersion: "2026-02-01" });
const ROOT = resolve(process.cwd(), "..");
const LENGTHS = ["courts", "mi-longs", "longs"];

type Photo = { src: string; alt: string };

async function upload(p: Photo) {
  const bytes = p.src.startsWith("http")
    ? Buffer.from(await (await fetch(p.src)).arrayBuffer())
    : await readFile(resolve(ROOT, "public", p.src.replace(/^\//, "")));
  const filename = p.src.split("/").pop()?.split("?")[0] ?? "photo";
  const asset = await client.assets.upload("image", bytes, {
    filename: /\.\w+$/.test(filename) ? filename : `${filename}.jpg`,
  });
  console.log(`  ✓ ${filename}`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: p.alt,
  };
}

async function main() {
  const existing = await client.fetch<number>(
    `count(*[_type == "serviceCategory"])`,
  );
  if (existing > 0) {
    console.log(`${existing} catégories déjà présentes : import annulé.`);
    return;
  }

  console.log("Photos…");
  const img = {
    facade: await upload(salonPhotos.facade),
    allee: await upload(salonPhotos.allee),
    postes: await upload(salonPhotos.postes),
    bacs: await upload(salonPhotos.bacs),
    vitrine: await upload(salonPhotos.vitrine),
    produits: await upload(salonPhotos.produits),
    simon: await upload(photos.atWork),
    rose: await upload(photos.salon),
  };
  const keyed = (list: object[]) =>
    list.map((p, i) => ({ ...p, _key: `photo${i}` }));

  const tx = client.transaction();
  tx.createOrReplace({
    _id: "sitePhotos",
    _type: "sitePhotos",
    hero: img.facade,
    salon: keyed([img.allee, img.postes, img.bacs]),
    simon: img.simon,
    gallery: keyed([
      img.allee,
      img.facade,
      img.postes,
      img.rose,
      img.bacs,
      img.vitrine,
      img.produits,
    ]),
  });

  services.forEach((c, i) => {
    tx.create({
      _type: "serviceCategory",
      title: c.name,
      slug: { _type: "slug", current: c.id },
      order: i + 1,
      services: c.services.map((s, j) => {
        const [base, length] = s.name.split(" · ");
        const isLength = LENGTHS.includes(length);
        const [price, priceMax] = (s.price.match(/\d+/g) ?? ["0"]).map(Number);
        return {
          _type: "service",
          _key: `s${j}`,
          name: isLength ? base : s.name,
          length: isLength ? length : "toutes",
          price,
          ...(priceMax ? { priceMax } : {}),
          duration: s.duration,
          booking: s.online ? "online" : "phone",
        };
      }),
    });
  });

  await tx.commit();
  console.log(
    `✓ ${services.length} catégories et les photos du site importées.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
