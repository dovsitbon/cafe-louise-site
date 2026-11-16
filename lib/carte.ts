import carte from "@/data/carte.json";
import type { Locale } from "@/lib/locales";

// La carte (data/carte.json), typée.

export type Text = { name: string; desc: string };
export type Item = {
  id: string;
  price: number | null;
  size?: string;
  photo?: string;
  formula?: boolean;
  signature?: boolean;
  veg?: boolean;
} & Record<Locale, Text>;
export type CategoryId = "petit-dejeuner" | "sale" | "crepes" | "patisseries" | "boissons-chaudes" | "boissons-fraiches";
export type Category = { id: CategoryId; photo: string; items: Item[] } & Record<Locale, string>;

export const CATEGORIES = carte.categories as Category[];
export const CHECKED = carte.checked;
export const categoryOf = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
