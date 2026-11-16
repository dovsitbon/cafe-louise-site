// Langues du site, sans les textes : importable côté client sans embarquer les dictionnaires.
// Français par défaut, anglais et espagnol (beaucoup de voyageurs).
export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES" };
export const intlLocale: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES" };
export const langNames: Record<Locale, string> = { fr: "Français", en: "English", es: "Español" };
export const langShort: Record<Locale, string> = { fr: "FR", en: "EN", es: "ES" };
