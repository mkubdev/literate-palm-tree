import { chromium } from "playwright";
import { readFileSync, statSync } from "node:fs";
// Régénère les images de partage (public/brand/partage-*.jpg) : `npx playwright install chromium` puis `node scripts/partage.mjs`
const R = process.cwd();
const b64 = (f) => `data:image/jpeg;base64,${readFileSync(`${R}/public/images/${f}`).toString("base64")}`;
const logo = readFileSync(`${R}/public/brand/logo.svg`, "utf8").replace("<svg ", '<svg width="250" ');
const simon = "https://res.cloudinary.com/wavy/image/upload/f_auto,q_auto,w_1600/v1554300368/Simon-Bouvatier.jpg";
const cards = [
  { file: "partage", title: "Coiffeur,<br>coloriste,<br>visagiste.", info: "75 rue Pierre Corneille · Lyon 6e", photo: b64("facade.jpg"), pos: "50% 22%" },
  { file: "partage-services", title: "Carte<br>des services", info: "Coupe · Couleur · Mèches · Mariage", photo: b64("salon-postes.jpg"), pos: "40% 50%" },
  { file: "partage-simon", title: "Simon<br>Bouvatier", info: "Coiffeur · Coloriste · Visagiste", photo: simon, pos: "62% 40%" },
  { file: "partage-photos", title: "Le salon<br>en images", info: "Lyon 6e · Entre Cordeliers et Part-Dieu", photo: b64("salon-allee.jpg"), pos: "45% 50%" },
  { file: "partage-contact", title: "Venir<br>au salon", info: "Du mardi au samedi · 9h – 19h", photo: b64("salon-vitrine.jpg"), pos: "70% 50%" },
];
const b = await chromium.launch(process.env.E ? { executablePath: process.env.E } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await p.setContent(`<html><head>
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Jost:wght@300;400&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:grid;grid-template-columns:640px 560px;background:#fff;color:#312c29;font-family:Jost}
.l{display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px 56px;border-right:1px solid #e7e1d9}
.l svg path{fill:#312c29}
h1{font-family:Italiana;font-weight:400;font-size:82px;line-height:.98;letter-spacing:-.005em}
.rule{width:56px;height:1px;background:#b8995a;margin:30px 0 22px}
.info{font-size:15px;letter-spacing:.24em;text-transform:uppercase;font-weight:400}
.url{font-size:17px;color:#6f655d;font-weight:300}
.r{background:url(${c.photo}) ${c.pos}/cover}
</style></head><body>
<div class="l">${logo}<div><h1>${c.title}</h1><div class="rule"></div><div class="info">${c.info}</div></div><div class="url">simonbouvatier.fr</div></div>
<div class="r"></div></body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const out = `${R}/public/brand/${c.file}.jpg`;
  await p.screenshot({ path: out, type: "jpeg", quality: 86 });
  console.log(c.file, Math.round(statSync(out).size / 1024) + " Ko");
}
await b.close();
