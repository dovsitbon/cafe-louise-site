// Logo du Café Louise, redessiné d'après l'enseigne du 57 boulevard de Grenelle :
// « Café Louise » en écriture anglaise dorée, « PARIS » en capitales espacées, cœur framboise d'un seul trait.
//   npm run logo
// → public/logo.svg (fond clair), public/logo-clair.svg (fond sombre), app/icon.svg (favicon), app/apple-icon.png,
//   public/icon-512.png, components/logo-data.json (tracés utilisés par components/Logo.tsx), assets/logo-apercu.png.
// Pour mettre le fichier d'origine du café : remplacez public/logo.svg (même nom) et components/Logo.tsx.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ROOT, C, LOGO, SCRIPT_D, PARIS_D, HEART_D, HEART_AT, logo } from "./draw.mjs";

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>\n`;

await writeFile(path.join(ROOT, "public/logo.svg"), svg(LOGO.w, LOGO.h, logo(0, 0, LOGO.w)));
await writeFile(path.join(ROOT, "public/logo-clair.svg"), svg(LOGO.w, LOGO.h, logo(0, 0, LOGO.w, { script: C.cream, paris: C.rose, heart: C.rose })));
await writeFile(path.join(ROOT, "components/logo-data.json"), JSON.stringify({ w: LOGO.w, h: LOGO.h, script: SCRIPT_D, paris: PARIS_D, heart: HEART_D, heartAt: HEART_AT }) + "\n");

// Favicon : le cœur framboise sur fond crème
const mark = (size) =>
  svg(size, size, `<g transform="scale(${size / 100})"><rect width="100" height="100" rx="22" fill="${C.cream}"/><g transform="translate(14 16) scale(1.2)"><path d="${HEART_D}" fill="none" stroke="${C.heart}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g></g>`);
await writeFile(path.join(ROOT, "app/icon.svg"), mark(100));
await sharp(Buffer.from(mark(512))).resize(180, 180).flatten({ background: C.cream }).png().toFile(path.join(ROOT, "app/apple-icon.png"));
await sharp(Buffer.from(mark(512))).png().toFile(path.join(ROOT, "public/icon-512.png"));

// Aperçu, à comparer avec l'enseigne (assets/facade/enseigne.jpg)
await sharp(Buffer.from(svg(760, 300, `<rect width="760" height="300" fill="${C.cream}"/>${logo(40, 20, 480)}<rect x="560" y="40" width="160" height="160" rx="30" fill="${C.night}"/>${logo(570, 95, 140, { script: C.cream, paris: C.rose, heart: C.rose })}`)))
  .png()
  .toFile(path.join(ROOT, "assets/logo-apercu.png"));
console.log("logo.svg, logo-clair.svg, logo-data.json, icon.svg, apple-icon.png, icon-512.png écrits");
