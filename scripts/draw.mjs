// Outils de dessin partagés par les scripts (logo, image de partage, affichette) :
// texte converti en tracés (aucune police à installer), le logo redessiné d'après l'enseigne, la tour Eiffel au trait.
import { readFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";

export const ROOT = path.resolve(import.meta.dirname, "..");
// Charte tirée des photos : crème et marbre, rose poudré des fauteuils, bleu nuit pour le texte,
// doré de l'enseigne, framboise du cœur (rare), vert d'eau des chaises de terrasse.
export const C = {
  cream: "#FAF6EF",
  paper: "#FFFDF9",
  rose: "#E9C9C3",
  roseSoft: "#F6E7E3",
  night: "#1F2A44",
  nightDeep: "#161E33",
  gold: "#B8975A",
  goldDeep: "#8A6A33",
  heart: "#C8307A",
  water: "#A9C6BE",
  waterSoft: "#E4EEEA",
  ink: "#1F2A44",
  muted: "#5A5F6E",
};

async function load(file) {
  const buf = await readFile(path.join(ROOT, "node_modules", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

export const fonts = {
  script: await load("@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff"),
  display: await load("@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff"),
  displayItalic: await load("@fontsource/playfair-display/files/playfair-display-latin-500-italic.woff"),
  text: await load("@fontsource/jost/files/jost-latin-400-normal.woff"),
  medium: await load("@fontsource/jost/files/jost-latin-500-normal.woff"),
  bold: await load("@fontsource/jost/files/jost-latin-600-normal.woff"),
};

/** Largeur d'un texte, interlettrage compris (tracking en em). */
export function width(font, text, size, tracking = 0) {
  return font.getAdvanceWidth(text, size) + tracking * size * (text.length - 1);
}

/** Tracé SVG (attribut d) d'un texte. Le crénage de la police est conservé quand il n'y a pas d'interlettrage. */
export function textPath(font, str, x, y, size, { anchor = "start", tracking = 0 } = {}) {
  const w = width(font, str, size, tracking);
  const start = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  if (!tracking) return font.getPath(str, start, y, size, { kerning: true }).toPathData(2);
  let cursor = start;
  let d = "";
  for (const ch of str) {
    d += font.getPath(ch, cursor, y, size).toPathData(2);
    cursor += font.getAdvanceWidth(ch, size) + tracking * size;
  }
  return d;
}

export function text(font, str, x, y, size, { fill = C.ink, anchor = "start", tracking = 0 } = {}) {
  return `<path d="${textPath(font, str, x, y, size, { anchor, tracking })}" fill="${fill}"/>`;
}

// ——— Logo, redessiné d'après l'enseigne : « Café Louise » en écriture anglaise dorée, « PARIS » en capitales,
// et le cœur framboise tracé d'un seul geste, avec sa petite queue en bas à gauche.
// Boîte de référence : 300 × 100.
export const LOGO = { w: 322, h: 100 };
export const SCRIPT_D = textPath(fonts.script, "Café Louise", 6, 64, 62);
export const PARIS_D = textPath(fonts.medium, "PARIS", 112, 92, 13, { tracking: 0.42 });
// Cœur d'un seul trait (épaisseur 7), boîte 60 × 60, placé à droite du nom
export const HEART_D = "M30 52C20 42 9 33 10 22c1-8 8-12 14-10 4 1.5 6 5 6 9 1-5 5-10 12-10 8 0 12 7 10 15-2 9-12 18-22 26-6 4.5-14 6-22 2";
export const HEART_AT = { x: 252, y: 18, s: 1.1 };

/** Logo complet en (x, y), largeur w. */
export function logo(x, y, w, { script = C.gold, paris = C.gold, heart = C.heart } = {}) {
  const k = w / LOGO.w;
  return `<g transform="translate(${x} ${y}) scale(${k})"><path d="${SCRIPT_D}" fill="${script}"/><path d="${PARIS_D}" fill="${paris}"/><g transform="translate(${HEART_AT.x} ${HEART_AT.y}) scale(${HEART_AT.s})"><path d="${HEART_D}" fill="none" stroke="${heart}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
}

// ——— La tour Eiffel au trait, boîte 100 × 140 (mêmes tracés que components/Doodles.tsx).
export const TOWER = [
  "M14 136C30 104 42 70 46.5 26",
  "M86 136C70 104 58 70 53.5 26",
  "M46.5 26 50 4l3.5 22",
  "M44 26h12",
  "M31 136c4-20 34-20 38 0",
  "M26 98h48",
  "M38 62h24",
];

/** Tour Eiffel au trait en (x, y), hauteur h. */
export function tower(x, y, h, { stroke = C.gold, width = 2.2 } = {}) {
  const k = h / 140;
  return `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${stroke}" stroke-width="${width / k}" stroke-linecap="round" stroke-linejoin="round">${TOWER.map((d) => `<path d="${d}"/>`).join("")}</g>`;
}
