import Link from "next/link";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { HoursTable } from "@/components/HoursTable";
import { MapLoader } from "@/components/MapLoader";
import { WalkMap } from "@/components/WalkMap";
import { PartyForm } from "@/components/Forms";
import { Cake, Clock, Heart, Terrace, Tower } from "@/components/Doodles";
import { ArrowIcon, InstagramIcon, PhoneIcon, PinIcon, StarIcon, WhatsAppIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, num } from "@/lib/format";
import { pagePath } from "@/lib/pages";
import { waHref } from "@/lib/wa";

type S = { lang: Locale; d: Dict };

/** Titre de section : petite ligne en italique dorée, grand titre Playfair. */
export function Heading({ eyebrow, title, id, className = "", children, as = "h2" }: { eyebrow: string; title: string; id?: string; className?: string; children?: React.ReactNode; as?: "h1" | "h2" }) {
  const H = as;
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <H id={id} className="display mt-2 text-[2.25rem] md:text-[3.25rem]">
        {title}
      </H>
      {children}
    </div>
  );
}

/* 3. Hero plein écran : le cappuccino en terrasse et sa petite tour Eiffel, deux boutons, la note Google et le statut. */
export function Hero({ lang, d }: S) {
  return (
    <section aria-labelledby="hero-title" className="flex flex-col lg:grid lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[1fr_1.08fr]">
      {/* La photo est en hauteur : entière à droite sur grand écran, en haut sur mobile, jamais sous le texte
          (la petite tour Eiffel et le cappuccino restent visibles). */}
      <Pic src="/media/hero/hero.jpg" d={d} alt={d.hero.alt} sizes="(min-width: 1024px) 52vw, 100vw" priority className="h-[46svh] min-h-72 lg:order-2 lg:h-full" position="center 52%" />
      <div className="w-full px-5 pt-8 pb-10 md:px-8 md:pt-12 md:pb-14 lg:flex lg:items-center lg:py-16 lg:ps-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pe-12">
        <div className="max-w-2xl">
          <p className="sign text-gold-deep">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="display mt-4 text-[2.625rem] md:text-[4.25rem] xl:text-[4.75rem]">
            {d.hero.title}
          </h1>
          <p className="lead mt-5 max-w-xl">{d.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={pagePath("carte", lang)} className="btn">
              {d.nav.seeMenu}
            </Link>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
              <PinIcon />
              {d.nav.directions}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.9375rem] lg:mt-10 lg:pt-6">
            <Rating lang={lang} d={d} />
            <OpenStatus />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. Tuiles de catégories en capitales sur photo, juste après le hero (comme Pierre Hermé). */
const TILES = [
  { key: "petit-dejeuner", photo: "/media/petit-dejeuner/croissant-cappuccino.jpg", href: "carte#petit-dejeuner" },
  { key: "sale", photo: "/media/petit-dejeuner/omelette-jus-orange.jpg", href: "carte#sale" },
  { key: "crepes", photo: "/media/patisseries/crepes.jpg", href: "carte#crepes" },
  { key: "patisseries", photo: "/media/patisseries/macarons.jpg", href: "carte#patisseries" },
  { key: "salon", photo: "/media/salle/salle-fauteuils.jpg", href: "salondethe" },
  { key: "boissons", photo: "/media/petit-dejeuner/matcha-latte.jpg", href: "carte#boissons-chaudes" },
] as const;

export function Tiles({ lang, d }: S) {
  return (
    <section aria-label={d.tiles.title} className="mx-auto max-w-7xl px-5 pt-5 md:px-8 md:pt-8">
      <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 xl:grid-cols-6">
        {TILES.map((t, i) => {
          const href = t.href === "salondethe" ? pagePath("salondethe", lang) : `${pagePath("carte", lang)}#${t.href.split("#")[1]}`;
          return (
            <Reveal as="li" key={t.key} delay={i * 0.04}>
              <Link href={href} className="group relative block aspect-[4/5] overflow-hidden rounded-[4px]">
                <Pic src={t.photo} d={d} alt="" sizes="(min-width: 1280px) 16vw, (min-width: 768px) 30vw, 46vw" className="h-full" tint={i} />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,30,51,0.72),rgba(22,30,51,0)_58%)]" aria-hidden="true" />
                <span className="sign absolute inset-x-3 bottom-4 text-center !text-[0.75rem] leading-snug text-cream">{d.tiles.items[t.key]}</span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* 5. Bande de services en 4 pictos au trait. */
export function Services({ d }: S) {
  const icons = [Tower, Clock, Terrace, Cake];
  return (
    <section aria-label={d.services.title} className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 border-y border-line py-8 md:grid-cols-4 md:py-10">
        {d.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <li key={s.t} className="flex flex-col items-center text-center">
              <span className="flex h-14 items-end justify-center text-gold-deep">
                <Icon className={i === 0 ? "h-12 w-auto" : "h-10 w-10"} />
              </span>
              <p className="display mt-3 text-[1.1875rem]">{s.t}</p>
              <p className="mt-0.5 text-[0.9375rem] text-muted">{s.p}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 7. Trois blocs alternés : photo (ou plan), texte court, un seul bouton. */
export function Blocks({ lang, d }: S) {
  const ctas = [
    <Link key="a" href={pagePath("carte", lang)} className="btn">
      {d.blocks[0].cta}
      <ArrowIcon />
    </Link>,
    <Link key="b" href={pagePath("salondethe", lang)} className="btn">
      {d.blocks[1].cta}
      <ArrowIcon />
    </Link>,
    <a key="c" href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn">
      <PinIcon />
      {d.blocks[2].cta}
    </a>,
  ];
  const visuals = [
    <Pic key="a" src="/media/terrasse/table-terrasse.jpg" d={d} sizes="(min-width: 768px) 45vw, 92vw" className="aspect-[4/5] rounded-[4px]" />,
    <Pic key="b" src="/media/salle/salle-guirlandes.jpg" d={d} sizes="(min-width: 768px) 45vw, 92vw" className="aspect-[4/5] rounded-[4px]" position="center 60%" />,
    <WalkMap key="c" d={d} className="aspect-[4/5] border border-line" />,
  ];
  return (
    <section className="mx-auto max-w-7xl space-y-16 px-5 py-16 md:space-y-28 md:px-8 md:py-24">
      {d.blocks.map((b, i) => (
        <div key={b.title} id={i === 2 ? "acces" : undefined} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-16">
          <Reveal className={i % 2 ? "md:order-2" : ""}>{visuals[i]}</Reveal>
          <Reveal delay={0.08} className="max-w-md">
            <Heading eyebrow={b.eyebrow} title={b.title} />
            <p className="lead mt-5">{b.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {ctas[i]}
              {i === 2 && (
                <a href={site.fromEiffelUrl} target="_blank" rel="noopener noreferrer" className="link-line inline-flex min-h-11 items-center text-[0.9375rem]">
                  {d.walk.fromEiffel}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

/* 8. Anniversaires et petits groupes : texte, gâteau, formulaire. Bas festonné comme un store de terrasse. */
export function Party({ d }: S) {
  return (
    <section id="anniversaires" aria-labelledby="party-title" className="scroll-mt-24">
      <div className="bg-rose-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Heading eyebrow={d.party.eyebrow} title={d.party.title} id="party-title">
              <p className="lead mt-5">{d.party.intro}</p>
            </Heading>
            <ul className="mt-6 space-y-2.5">
              {d.party.list.map((l) => (
                <li key={l} className="flex items-center gap-3">
                  <Heart className="h-4 w-4 shrink-0 text-heart" />
                  {l}
                </li>
              ))}
            </ul>
            <Pic src="/media/patisseries/gateau-anniversaire.jpg" d={d} sizes="(min-width: 1024px) 38vw, 92vw" className="mt-8 aspect-[4/3] rounded-[4px]" position="center 70%" />
          </div>
          <div className="self-start rounded-[4px] bg-paper p-5 md:p-9">
            <PartyForm />
            <p className="mt-5 border-t border-line pt-4 text-[0.875rem] text-muted">{d.party.note}</p>
          </div>
        </div>
      </div>
      <div className="scallop text-rose-soft" aria-hidden="true" />
    </section>
  );
}

/* 9. Avis : aucun avis inventé. Emplacements tant que data/avis.json est vide, et le lien vers la fiche Google. */
type Review = { name: string; date: string; source: string; rating: number } & Record<Locale, string>;

export function Reviews({ lang, d }: S) {
  const items = avis.items as Review[];
  return (
    <section aria-labelledby="avis-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading eyebrow={d.reviews.eyebrow} title={d.reviews.title} id="avis-title">
          <p className="lead mt-4 max-w-xl">{d.reviews.intro}</p>
        </Heading>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
          <StarIcon className="h-4 w-4 text-gold" />
          {d.reviews.google}
        </a>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.length
          ? items.slice(0, 3).map((r) => (
              <li key={r.name + r.date} className="rounded-[4px] border border-line bg-paper p-6">
                <p className="flex gap-0.5 text-gold" aria-label={`${num(r.rating, lang)}/5`}>
                  {Array.from({ length: r.rating }, (_, k) => (
                    <StarIcon key={k} className="h-4 w-4" />
                  ))}
                </p>
                <blockquote className="mt-3 leading-relaxed">{r[lang] || r.fr}</blockquote>
                <p className="mt-4 text-[0.875rem] text-muted">
                  {r.name} · {r.source} · {formatDay(r.date, lang, { month: "long", year: "numeric" })}
                </p>
              </li>
            ))
          : [0, 1, 2].map((k) => (
              <li key={k} className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-line p-6 text-center text-muted" data-review-slot>
                <span dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec l'accord du café -->" }} />
                <Heart className="h-5 w-5 text-rose" />
                <span className="font-[family-name:var(--font-display)] italic">{d.reviews.slot}</span>
              </li>
            ))}
      </ul>
    </section>
  );
}

/* 10. Infos pratiques : adresse, métro, horaires, téléphone, WhatsApp, plan. */
export function Infos({ lang, d }: S) {
  return (
    <section id="infos" aria-labelledby="infos-title" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Heading eyebrow={d.infos.eyebrow} title={d.infos.title} id="infos-title" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="grid content-start gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-medium">{d.infos.address}</h3>
              <address className="mt-2 text-muted not-italic">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
              <OpenStatus className="mt-3 text-[0.9375rem]" />
            </div>
            <div>
              <h3 className="font-medium">{d.infos.metro}</h3>
              <ul className="mt-2 space-y-1.5 text-[0.9375rem]">
                {d.infos.stations.map((s) => (
                  <li key={s.name}>
                    <span className="font-medium">{s.name}</span>{" "}
                    <span className="text-muted">
                      · {s.line} · {s.walk}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[0.9375rem] text-muted">{d.infos.eiffel}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="font-medium">{d.infos.hours}</h3>
              <div className="mt-2">
                <HoursTable lang={lang} d={d} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <h3 className="font-medium">{d.infos.contact}</h3>
              <div className="mt-2 flex flex-wrap gap-x-6">
                <a href={`tel:${site.phoneIntl}`} className="link-line inline-flex min-h-11 items-center gap-2 font-medium tabular-nums">
                  <PhoneIcon className="h-4 w-4" />
                  {site.phone}
                </a>
                <a href={waHref(d.nav.waHello)} target="_blank" rel="noopener noreferrer" className="link-line inline-flex min-h-11 items-center gap-2 font-medium">
                  <WhatsAppIcon className="h-4 w-4" />
                  {d.nav.whatsapp}
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line inline-flex min-h-11 items-center gap-2 font-medium">
                  <InstagramIcon className="h-4 w-4" />
                  {site.instagramHandle}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <MapLoader src={site.mapsEmbed} title={d.infos.mapTitle} label={d.infos.mapLoad} note={d.infos.mapNote} className="aspect-[4/3] rounded-[4px] lg:aspect-[5/4]" />
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn self-start">
              <PinIcon />
              {d.nav.directions}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Réponse de la FAQ « moyens de paiement » : data/site.json → paymentMethods, sinon un texte d'attente. */
export const faqItems = (lang: Locale, d: Dict) => d.faq.items.map((f) => ({ q: f.q, a: fill(f.a, { payment: site.paymentMethods[lang] || d.faq.paymentUnknown }) }));

/* 11. FAQ. */
export function Faq({ lang, d }: S) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Heading eyebrow={d.faq.eyebrow} title={d.faq.title} id="faq-title" />
        <div className="border-t border-line">
          {faqItems(lang, d).map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-[1.0625rem] font-medium">
                {f.q}
                <span className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-night" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Petite ligne « 4,8/5 sur Google · ouvert » réutilisée dans les en-têtes de page. */
export function TrustLine({ lang, d }: S) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
      <Rating lang={lang} d={d} />
      <OpenStatus />
    </div>
  );
}
