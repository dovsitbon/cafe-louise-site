import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue.
export const PAGE_IDS = ["carte", "reserver", "petitdej", "salondethe", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu", es: "carta" },
  reserver: { fr: "reserver", en: "book-a-table", es: "reservar" },
  petitdej: { fr: "petit-dejeuner-tour-eiffel", en: "breakfast-near-eiffel-tower", es: "desayuno-cerca-torre-eiffel" },
  salondethe: { fr: "salon-de-the-paris-15", en: "tea-room-paris-15", es: "salon-de-te-paris-15" },
  legal: { fr: "mentions-legales", en: "legal-notice", es: "aviso-legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;
