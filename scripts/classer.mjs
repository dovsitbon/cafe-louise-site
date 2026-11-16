// Tri des photos brutes (assets/raw) dans les dossiers du site, avec les recadrages.
// À ne lancer qu'une fois (les originaux restent dans assets/raw/, non versionnés : visages de clients, captures).
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const ROOT = path.resolve(import.meta.dirname, "..");
const R = (f) => path.join(ROOT, "assets/raw", f);
// [source, destination, recadrage relatif {l,t,w,h} en fractions]
const PLAN = [
  ["cafe-louise_12.jpg", "hero/hero.jpg"],
  ["cafe-louise_04.jpg", "terrasse/table-terrasse.jpg", { l: 0, t: 0, w: 0.8, h: 1 }], // sans la canette en haut à droite
  ["cafe-louise_14.jpg", "petit-dejeuner/omelette-jus-orange.jpg"],
  ["cafe-louise_05.jpg", "petit-dejeuner/matcha-latte.jpg"],
  ["instagram/ig_03.jpg", "petit-dejeuner/croissant-cappuccino.jpg"],
  ["instagram/ig_09.jpg", "petit-dejeuner/croissants-pains-au-chocolat.jpg"],
  ["cafe-louise_13.jpg", "patisseries/macarons.jpg"],
  ["instagram/ig_06.jpg", "patisseries/macaron-framboise.jpg"],
  ["instagram/ig_05.jpg", "patisseries/tartes-maison.jpg"],
  ["instagram/ig_07.jpg", "patisseries/entremets-abricot.jpg"],
  ["cafe-louise_10.jpg", "patisseries/gateau-anniversaire.jpg", { l: 0.06, t: 0.38, w: 0.94, h: 0.62 }],
  ["cafe-louise_08.jpg", "salle/salle-guirlandes.jpg"],
  ["cafe-louise_11.jpg", "salle/salle-fauteuils.jpg"],
  ["cafe-louise_07.jpg", "salle/bouquet-table.jpg"],
  ["cafe-louise_01.jpg", "facade/enseigne.jpg", { l: 0, t: 0, w: 1, h: 0.27 }],
];
for (const [src, dst, c] of PLAN) {
  await mkdir(path.dirname(path.join(ROOT, "assets", dst)), { recursive: true });
  let img = sharp(R(src)).rotate();
  if (c) {
    const m = await sharp(R(src)).metadata();
    img = img.extract({ left: Math.round(m.width * c.l), top: Math.round(m.height * c.t), width: Math.round(m.width * c.w), height: Math.round(m.height * c.h) });
  }
  await img.jpeg({ quality: 92 }).toFile(path.join(ROOT, "assets", dst));
  console.log(dst);
}
