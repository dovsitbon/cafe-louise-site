// Affichette A5 à poser sur le comptoir et en vitrine, avec un QR code vers la carte, et « Scan for menu » pour les voyageurs.
//   npm run affichette
// → print/affichette-a5.pdf (148 × 210 mm, 300 dpi) et print/affichette-a5.png (aperçu).
// L'adresse du QR code vient de data/site.json → url (+ /fr/carte ; le site propose ensuite EN et ES) :
// relancez le script si le nom de domaine change.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { ROOT, C, fonts, text, logo, tower } from "./draw.mjs";

const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const target = `${site.url}/fr/carte`;
const W = 1748;
const H = 2480;
const cx = W / 2;

// QR code dessiné en carrés (correction élevée : il reste lisible même un peu taché)
const qr = QRCode.create(target, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const QR = 520;
const cell = QR / n;
const qx = cx - QR / 2;
const qy = 1500;
let squares = "";
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.modules.get(r, c)) squares += `<rect x="${(qx + c * cell).toFixed(2)}" y="${(qy + r * cell).toFixed(2)}" width="${(cell + 0.5).toFixed(2)}" height="${(cell + 0.5).toFixed(2)}"/>`;

// Trois photos : le cappuccino et sa tour Eiffel, les macarons, la salle rose
const tile = async (file, w, h) => sharp(path.join(ROOT, file)).rotate().resize(w, h, { fit: "cover", position: "centre" }).png().toBuffer();
const PW = 480;
const PH = 600;
const gap = 30;
const px = (W - (PW * 3 + gap * 2)) / 2;
const py = 500;
const photos = await Promise.all(["assets/hero/hero.jpg", "assets/patisseries/macarons.jpg", "assets/salle/salle-fauteuils.jpg"].map((f) => tile(f, PW, PH)));

const host = target.replace(/^https?:\/\//, "");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${C.cream}"/>
<rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none" stroke="${C.gold}" stroke-width="3"/>
${logo(cx - 380, 150, 760)}
${text(fonts.display, "La carte est ici", cx, py + PH + 150, 92, { anchor: "middle", fill: C.night })}
${text(fonts.text, "Petit-déjeuner, omelettes, crêpes, macarons, thés : les prix sur votre téléphone.", cx, py + PH + 230, 36, { anchor: "middle", fill: C.muted })}
<rect x="${qx - 40}" y="${qy - 40}" width="${QR + 80}" height="${QR + 80}" fill="#FFFFFF" stroke="${C.line ?? "#E6DCCD"}"/>
<g fill="${C.night}">${squares}</g>
${tower(250, qy + 40, 420, { stroke: C.gold, width: 3 })}
${text(fonts.displayItalic, "Scan for menu", W - 330, qy + 250, 64, { anchor: "middle", fill: C.heart })}
${text(fonts.text, "EN · ES · FR", W - 330, qy + 320, 34, { anchor: "middle", fill: C.goldDeep, tracking: 0.2 })}
${text(fonts.medium, host, cx, qy + QR + 110, 34, { anchor: "middle", fill: C.goldDeep })}
${text(fonts.medium, "Du mardi au samedi, 7 h – 19 h  ·  Tour Eiffel à 10 min à pied", cx, qy + QR + 190, 38, { anchor: "middle", fill: C.night })}
${text(fonts.text, `57 boulevard de Grenelle, Paris 15  ·  06 95 13 46 56  ·  ${site.instagramHandle}`, cx, qy + QR + 250, 32, { anchor: "middle", fill: C.muted })}
</svg>`;

const png = await sharp(Buffer.from(svg))
  .composite(photos.map((input, i) => ({ input, left: Math.round(px + i * (PW + gap)), top: py })))
  .png()
  .toBuffer();

await mkdir(path.join(ROOT, "print"), { recursive: true });
await sharp(png).resize({ width: 874 }).png().toFile(path.join(ROOT, "print/affichette-a5.png"));

const pdf = await PDFDocument.create();
pdf.setTitle("Café Louise, affichette A5");
const page = pdf.addPage([419.53, 595.28]); // A5 en points
const jpg = await pdf.embedJpg(await sharp(png).jpeg({ quality: 94 }).toBuffer());
page.drawImage(jpg, { x: 0, y: 0, width: 419.53, height: 595.28 });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log(`affichette A5 écrite, QR code → ${target}`);
