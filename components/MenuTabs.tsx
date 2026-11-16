"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLocale } from "@/components/providers";
import { Cake, Croissant, Cup, Macaron, Tower } from "@/components/Doodles";
import { CATEGORIES, CHECKED, type CategoryId, type Item } from "@/lib/carte";
import { altOf, fill } from "@/lib/text";
import { formatDay, price } from "@/lib/format";
import { has, img } from "@/lib/media";
import { pagePath } from "@/lib/pages";

// Petit dessin au trait à la place d'une photo manquante, selon la rubrique
const DOODLE: Record<CategoryId, (p: { className?: string }) => React.ReactElement> = {
  "petit-dejeuner": Croissant,
  sale: Cup,
  crepes: Cake,
  patisseries: Macaron,
  "boissons-chaudes": Cup,
  "boissons-fraiches": Cup,
};

function Price({ item }: { item: Item }) {
  const { lang, d } = useLocale();
  if (item.price === null) return <span className="shrink-0 text-[0.875rem] text-muted italic">{d.carte.priceOnSite}</span>;
  return <span className="shrink-0 font-medium tabular-nums">{price(item.price, lang)}</span>;
}

function Tags({ item }: { item: Item }) {
  const { d } = useLocale();
  if (!item.signature && !item.veg) return null;
  return (
    <span className="ms-2 inline-flex gap-1.5 align-middle">
      {item.signature && <span className="tag bg-rose-soft text-night">{d.carte.signature}</span>}
      {item.veg && <span className="tag bg-water-soft text-night">{d.carte.veg}</span>}
    </span>
  );
}

/** Formule mise en avant : encadré rose, photo si elle existe. */
function Formula({ item }: { item: Item }) {
  const { lang, d } = useLocale();
  const t = item[lang];
  const photo = item.photo && has(item.photo) ? img(item.photo) : null;
  return (
    <article className="flex gap-4 rounded-[4px] bg-rose-soft p-4 md:p-5">
      {photo && (
        <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-[3px] sm:block md:h-24 md:w-24">
          <Image src={photo.src} alt={altOf(d, photo.src) || t.name} width={photo.width} height={photo.height} sizes="96px" quality={70} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="eyebrow !text-[0.9375rem]">{d.carte.formula}</p>
        <div className="mt-0.5 flex items-baseline gap-3">
          <h3 className="display text-[1.25rem] md:text-[1.375rem]">{t.name}</h3>
          <span className="leader" aria-hidden="true" />
          <Price item={item} />
        </div>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{t.desc}</p>
      </div>
    </article>
  );
}

/** Ligne de la carte : vignette (photo ou dessin), nom, pointillés, prix, description courte. */
function Row({ item, cat }: { item: Item; cat: CategoryId }) {
  const { lang, d } = useLocale();
  const t = item[lang];
  const photo = item.photo && has(item.photo) ? img(item.photo) : null;
  const Doodle = DOODLE[cat];
  return (
    <li className="flex gap-4 border-b border-line py-4 last:border-0">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full md:h-16 md:w-16" data-photo-slot={photo ? undefined : item.id}>
        {photo ? (
          <Image src={photo.src} alt={altOf(d, photo.src) || t.name} width={photo.width} height={photo.height} sizes="64px" quality={70} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-cream-deep text-gold-deep" title={d.carte.photoSoon}>
            <Doodle className="h-7 w-7" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 self-center">
        <div className="flex items-baseline gap-3">
          <h3 className="text-[1.0625rem] font-medium">
            {t.name}
            {item.size && <span className="ms-1.5 text-[0.875rem] font-normal text-muted">{item.size}</span>}
            <Tags item={item} />
          </h3>
          <span className="leader" aria-hidden="true" />
          <Price item={item} />
        </div>
        {t.desc && <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted">{t.desc}</p>}
      </div>
    </li>
  );
}

/**
 * La carte en onglets (petit-déjeuner, salé, crêpes, pâtisseries, boissons chaudes, boissons fraîches),
 * en vraie page HTML. L'onglet suit l'ancre de l'adresse (#crepes…), pour que les tuiles de l'accueil ouvrent la bonne rubrique.
 */
export function MenuTabs({ home = false }: { home?: boolean }) {
  const { lang, d } = useLocale();
  const [tab, setTab] = useState<CategoryId>("petit-dejeuner");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as CategoryId;
      if (CATEGORIES.some((c) => c.id === h)) setTab(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: CategoryId) => {
    setTab(id);
    if (!home) history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = CATEGORIES.findIndex((c) => c.id === tab);
    let j = -1;
    if (e.key === "ArrowRight") j = (i + 1) % CATEGORIES.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = CATEGORIES.length - 1;
    if (j < 0) return;
    e.preventDefault();
    select(CATEGORIES[j].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[j]?.focus();
  };

  const cat = CATEGORIES.find((c) => c.id === tab)!;
  const formulas = cat.items.filter((i) => i.formula);
  const rest = cat.items.filter((i) => !i.formula);
  const cover = cat.photo && has(cat.photo) ? img(cat.photo) : null;

  return (
    <div>
      <div ref={tabsRef} role="tablist" aria-label={d.carte.tablist} onKeyDown={onKey} className="tabs -mx-5 flex gap-1 overflow-x-auto border-b border-line px-5 md:mx-0 md:px-0">
        {CATEGORIES.map((c) => {
          const on = c.id === tab;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls={`panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(c.id)}
              className={`relative min-h-12 shrink-0 px-4 text-[0.9375rem] whitespace-nowrap transition-colors ${on ? "font-medium text-night" : "text-muted hover:text-night"}`}
            >
              {c[lang]}
              {on && <motion.span layoutId={home ? "tab-line-home" : "tab-line"} className="absolute inset-x-3 -bottom-px h-[2px] bg-heart" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${cat.id}`} aria-labelledby={`tab-${cat.id}`} className="fade-in mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14" key={cat.id}>
        <div className="hidden lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[4px]">
            {cover ? (
              <Image src={cover.src} alt={altOf(d, cover.src)} width={cover.width} height={cover.height} sizes="32vw" quality={80} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-rose-soft text-gold-deep" data-photo-slot={cat.id}>
                <Tower className="h-24 w-auto opacity-60" />
                <span className="font-[family-name:var(--font-display)] italic">{d.slots[cat.id as keyof typeof d.slots] ?? d.carte.photoSoon}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          {formulas.length > 0 && (
            <div className="mb-4 grid gap-3">
              {formulas.map((it) => (
                <Formula key={it.id} item={it} />
              ))}
            </div>
          )}
          <ul>
            {rest.map((it) => (
              <Row key={it.id} item={it} cat={cat.id} />
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.875rem] text-muted">{fill(d.carte.checked, { date: formatDay(CHECKED, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
            {home && (
              <Link href={`${pagePath("carte", lang)}#${cat.id}`} className="btn-line">
                {d.carte.seeAll}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
