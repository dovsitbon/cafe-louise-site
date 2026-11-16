import site from "@/data/site.json";

/** Lien WhatsApp vers le portable du café, avec un message déjà écrit (dans la langue du visiteur). */
export const waHref = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
