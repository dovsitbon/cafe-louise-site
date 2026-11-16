import site from "@/data/site.json";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { closures, weekHours } from "@/lib/hours";
import { CATEGORIES } from "@/lib/carte";
import { pagePath, type PageId } from "@/lib/pages";
import { faqItems } from "@/components/Sections";

const BUSINESS = `${site.url}/#cafe`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function menu(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Menu",
    "@id": `${site.url}${pagePath("carte", lang)}#menu`,
    name: d.pages.carte.h1,
    inLanguage: lang,
    hasMenuSection: CATEGORIES.map((c) => ({
      "@type": "MenuSection",
      name: c[lang],
      hasMenuItem: c.items.map((it) => ({
        "@type": "MenuItem",
        name: it[lang].name,
        ...(it[lang].desc ? { description: it[lang].desc } : {}),
        ...(it.photo ? { image: `${site.url}${it.photo}` } : {}),
        ...(it.price !== null ? { offers: { "@type": "Offer", price: it.price.toFixed(2), priceCurrency: "EUR" } } : {}),
        ...(it.veg ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
      })),
    })),
  };
}

function business(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "CafeOrCoffeeShop",
    "@id": BUSINESS,
    name: site.name,
    alternateName: ["Café Louise Paris", "Café Louise Tour Eiffel", "Café LOUISE"],
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`, `${site.url}/media/hero/hero.jpg`, `${site.url}/media/salle/salle-guirlandes.jpg`],
    logo: `${site.url}/icon-512.png`,
    telephone: site.phoneIntl,
    ...(site.email ? { email: site.email } : {}),
    priceRange: site.priceRange,
    servesCuisine: d.meta.cuisines,
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      ...weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
      ...closures.map((c) => ({ "@type": "OpeningHoursSpecification", opens: "00:00", closes: "00:00", validFrom: c.from, validThrough: c.to })),
    ],
    // Note Google relevée à la main, avec sa date (data/site.json → rating.checked)
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5, worstRating: 1, dateModified: site.rating.checked },
    sameAs: [site.instagram, site.mapsUrl],
    acceptsReservations: true,
    currenciesAccepted: "EUR",
    knowsLanguage: ["fr", "en", "es"],
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Terrasse" : lang === "es" ? "Terraza" : "Terrace", value: true }],
    hasMenu: { "@id": `${site.url}${pagePath("carte", lang)}#menu` },
    potentialAction: { "@type": "ReserveAction", target: `${site.url}${pagePath("reserver", lang)}` },
  };
}

const faq = (lang: Locale) => ({ "@type": "FAQPage", mainEntity: faqItems(lang, getDict(lang)).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

/** Données structurées de l'accueil : café (horaires, note Google datée), carte, FAQ. */
export function homeJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [{ "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: [...locales], publisher: { "@id": BUSINESS } }, business(lang), menu(lang), faq(lang)],
  };
}

/** Données structurées d'une page secondaire, plus fil d'Ariane. */
export function pageJsonLd(lang: Locale, id: PageId) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang),
      ...(id === "carte" ? [menu(lang)] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.pages[id].title, item: `${site.url}${pagePath(id, lang)}` },
        ],
      },
    ],
  };
}
