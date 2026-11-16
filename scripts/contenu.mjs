// CONTENU.md : tous les textes du site et la carte, en français, anglais et espagnol, pour relecture et validation.
//   npm run contenu
// Le fichier est régénéré à partir de locales/*.json et de data/*.json : corrigez les textes dans ces fichiers,
// pas dans CONTENU.md.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ROOT } from "./draw.mjs";

const json = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const [fr, en, es, carte, site, horaires, annonces] = await Promise.all(["locales/fr.json", "locales/en.json", "locales/es.json", "data/carte.json", "data/site.json", "data/horaires.json", "data/annonces.json"].map(json));
const L = { fr, en, es };
const LANGS = ["fr", "en", "es"];

const out = [];
const h = (n, t) => out.push("", `${"#".repeat(n)} ${t}`, "");
const tri = (label, get) => out.push(`- **${label}**`, ...LANGS.map((l) => `  - ${l.toUpperCase()} : ${get(L[l]) ?? ""}`));
const TODO = "**À REMPLIR**";
const eur = (n) => (n === null ? TODO : `${n.toFixed(2).replace(".", ",")} €`);
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

out.push(
  "# Café Louise : contenu du site",
  "",
  "Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » manque encore : voir INFOS-A-DEMANDER.md.",
  "",
  `Relevé le ${carte.checked} à partir de sa fiche Google (${site.rating.value}/5, ${site.rating.count} avis, horaires, téléphone, photos dont la carte de table et l'ardoise), de son Instagram ${site.instagramHandle} (bio, dernières publications) et des thèmes qui reviennent dans les avis (vue et proximité de la tour Eiffel, macarons, omelettes, anniversaires, pain au chocolat, accueil, salon de thé, crêpes). Aucun avis n'est recopié ni inventé.`,
  "",
  "Les textes se corrigent dans `locales/fr.json`, `locales/en.json`, `locales/es.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json` ; les avis dans `data/avis.json`. Puis `npm run contenu` pour régénérer ce fichier.",
);

h(2, "Titre du hero : trois propositions");
out.push(
  "1. **« Un café parisien, tout près de la tour Eiffel »** (retenu) : dit en une ligne ce que cherchent les voyageurs, et reprend la recherche « café près de la tour Eiffel ».",
  "2. « Croissants, crêpes et macarons » : la carte en trois mots, plus gourmand, moins utile pour le référencement.",
  "3. « Le petit-déjeuner de Louise » : plus intime, à garder si Louise accepte d'apparaître sur le site (photo, histoire du café).",
);

h(2, "Référencement (balises title et description)");
tri("Title de l'accueil", (d) => d.meta.title);
tri("Description de l'accueil", (d) => d.meta.description);
for (const id of Object.keys(fr.pages)) {
  tri(`Title · ${fr.pages[id].title}`, (d) => d.pages[id].metaTitle);
  tri(`Description · ${fr.pages[id].title}`, (d) => d.pages[id].metaDescription);
}

h(2, "Bandeau du haut");
out.push(`- **Par défaut** : ${annonces.default.fr} / ${annonces.default.en} / ${annonces.default.es}`);
for (const a of annonces.items) out.push(`- **${a.id}** (du ${a.from} au ${a.to}) : ${a.fr} / ${a.en} / ${a.es}`);

h(2, "Accueil");
tri("Petite ligne", (d) => d.hero.eyebrow);
tri("Titre", (d) => d.hero.title);
tri("Sous-titre", (d) => d.hero.sub);
h(3, "Tuiles");
for (const k of Object.keys(fr.tiles.items)) tri(k, (d) => d.tiles.items[k]);
h(3, "Services (4 pictos)");
fr.services.items.forEach((_, i) => tri(`Picto ${i + 1}`, (d) => `${d.services.items[i].t} — ${d.services.items[i].p}`));
h(3, "Carte (intro)");
tri("Titre", (d) => d.carte.title);
tri("Texte", (d) => d.carte.intro);
h(3, "Blocs alternés");
fr.blocks.forEach((_, i) => {
  tri(`Bloc ${i + 1} · titre`, (d) => d.blocks[i].title);
  tri(`Bloc ${i + 1} · texte`, (d) => d.blocks[i].text);
  tri(`Bloc ${i + 1} · bouton`, (d) => d.blocks[i].cta);
});
h(3, "Anniversaires et petits groupes");
tri("Titre", (d) => d.party.title);
tri("Texte", (d) => d.party.intro);
tri("Liste", (d) => d.party.list.join(" · "));
tri("Mention", (d) => d.party.note);
h(3, "Avis");
out.push("Aucun avis inventé : trois emplacements « Avis client à venir » tant que `data/avis.json` est vide.");
tri("Titre", (d) => d.reviews.title);
tri("Texte", (d) => d.reviews.intro);
h(3, "FAQ");
fr.faq.items.forEach((_, i) => {
  tri(`Q${i + 1}`, (d) => d.faq.items[i].q);
  tri(`R${i + 1}`, (d) => d.faq.items[i].a.replace("{payment}", `${d.faq.paymentUnknown} (tant que data/site.json → paymentMethods est vide)`));
});
h(3, "Pied de page");
tri("Phrase", (d) => d.footer.tagline);

h(2, "Pages");
for (const id of ["petitdej", "salondethe"]) {
  h(3, fr.pages[id].title);
  tri("Titre", (d) => d.pages[id].h1);
  tri("Intro", (d) => d.pages[id].intro);
  fr.pages[id].sections.forEach((s, i) => {
    tri(`Section ${i + 1} · titre`, (d) => d.pages[id].sections[i].h);
    tri(`Section ${i + 1} · texte`, (d) => d.pages[id].sections[i].p.join(" "));
  });
}
for (const id of ["carte", "reserver"]) {
  h(3, fr.pages[id].title);
  tri("Intro", (d) => d.pages[id].intro);
}

h(2, "Messages WhatsApp envoyés par les formulaires");
tri("Réservation (début)", (d) => d.booking.wa.title);
tri("Anniversaire / groupe (début)", (d) => d.partyForm.wa.title);

h(2, "La carte (data/carte.json)");
out.push(
  "Prix sûrs (relevés en photo) : toutes les boissons fraîches et chaudes de la carte de table, le café gourmand (8,50 €), les formules du midi de l'ardoise (sandwich 9,90 €, salade 11,90 €, plat du jour 13,90 €) et le plat du jour seul (9,90 €).",
  "À confirmer : la formule petit-déjeuner à 7 € (chiffre un peu effacé sur l'ardoise). À remplir : viennoiseries à l'unité, omelettes, crêpes, macarons, tartes et gâteaux (noms tirés des photos et des avis).",
);
for (const c of carte.categories) {
  h(3, `${c.fr} · ${c.en} · ${c.es}`);
  out.push("| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |", "|---|---|---|---|---|");
  for (const it of c.items) {
    const tags = [it.formula && "formule", it.signature && "on l'adore", it.veg && "végétarien", it.size].filter(Boolean).join(", ");
    out.push(`| ${it.fr.name} / ${it.en.name} / ${it.es.name} | ${eur(it.price)} | ${it.fr.desc} | ${tags} | ${it.photo ? "oui" : "à prendre"} |`);
  }
}

h(2, "Infos pratiques");
out.push(`- Adresse : ${site.address.street}, ${site.address.postalCode} ${site.address.city}`, `- Téléphone et WhatsApp : ${site.phone}`, `- Instagram : ${site.instagramHandle}`, `- E-mail : ${site.email || TODO}`, "- Horaires (fiche Google ; la bio Instagram dit 7 h – 20 h, à confirmer) :");
DAYS.forEach((day, i) => {
  const s = horaires.week[String(i + 1)];
  out.push(`  - ${day} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
});
out.push(`- Métro : ${fr.infos.stations.map((s) => `${s.name} (${s.line}, ${s.walk})`).join(" ; ")}`, `- Tour Eiffel : environ 10 minutes à pied (à vérifier sur place)`, `- Moyens de paiement : ${site.paymentMethods.fr || TODO}`, `- SIRET : ${site.legal.siret || TODO}`);

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md écrit");
