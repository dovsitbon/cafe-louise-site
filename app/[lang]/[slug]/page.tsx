import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { fill, getDict, isLocale, locales, ogLocale, type Dict, type Locale } from "@/lib/i18n";
import { pageJsonLd } from "@/lib/jsonld";
import { pageOfSlug, pagePath, PAGE_IDS, SLUGS, type PageId } from "@/lib/pages";
import { waHref } from "@/lib/wa";
import { MenuTabs } from "@/components/MenuTabs";
import { BookingForm } from "@/components/Forms";
import { Faq, Infos, TrustLine } from "@/components/Sections";
import { Pic } from "@/components/Pic";
import { WalkMap } from "@/components/WalkMap";
import { HoursTable } from "@/components/HoursTable";
import { TowerRule } from "@/components/Doodles";
import { ArrowIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = pageOfSlug(slug, lang);
  if (!id) return {};
  const p = getDict(lang).pages[id];
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: {
      canonical: pagePath(id, lang),
      languages: { ...Object.fromEntries(locales.map((l) => [l, pagePath(id, l)])), "x-default": pagePath(id, "fr") },
    },
    openGraph: { type: "website", url: pagePath(id, lang), siteName: site.fullName, title: p.metaTitle, description: p.metaDescription, locale: ogLocale[lang], images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    ...(id === "legal" ? { robots: { index: false, follow: true } } : {}),
  };
}

function PageHead({ d, id, children }: { d: Dict; id: PageId; children?: React.ReactNode }) {
  const p = d.pages[id];
  return (
    <header className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-20">
      <p className="eyebrow">Café Louise · Paris 15</p>
      <h1 className="display mt-2 max-w-4xl text-[2.75rem] md:text-[4.25rem]">{p.h1}</h1>
      {p.intro && <p className="lead mt-5 max-w-2xl">{p.intro}</p>}
      {children}
    </header>
  );
}

function Sections({ sections }: { sections: { h: string; p: string[] }[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="display text-[1.75rem] md:text-[2.125rem]">{s.h}</h2>
          {s.p.map((t) => (
            <p key={t} className="lead mt-3">
              {t}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

function Ctas({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={pagePath("carte", lang)} className="btn">
        {d.nav.seeMenu}
        <ArrowIcon />
      </Link>
      <Link href={pagePath("reserver", lang)} className="btn-line">
        {d.nav.book}
      </Link>
    </div>
  );
}

/** Mosaïque de photos (la première en grand). */
function Mosaic({ d, photos }: { d: Dict; photos: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 self-start">
      {photos.map((src, i) => (
        <Pic key={src} src={src} d={d} sizes="(min-width: 1024px) 20vw, 45vw" className={`rounded-[4px] ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[4/5]"}`} tint={i} />
      ))}
    </div>
  );
}

/** « Petit-déjeuner près de la tour Eiffel » : la formule, l'heure, le chemin à pied. */
function Breakfast({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <>
      <PageHead d={d} id="petitdej">
        <TrustLine lang={lang} d={d} />
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-10">
          <Sections sections={d.pages.petitdej.sections} />
          <Ctas lang={lang} d={d} />
        </div>
        <Mosaic d={d} photos={["/media/terrasse/table-terrasse.jpg", "/media/petit-dejeuner/croissant-cappuccino.jpg", "/media/petit-dejeuner/omelette-jus-orange.jpg"]} />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
        <WalkMap d={d} className="aspect-[4/5] border border-line md:aspect-square" />
        <div>
          <h2 className="display text-[1.75rem] md:text-[2.125rem]">{d.walk.title}</h2>
          <p className="lead mt-3">{d.blocks[2].text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.fromEiffelUrl} target="_blank" rel="noopener noreferrer" className="btn">
              <PinIcon />
              {d.walk.fromEiffel}
            </a>
          </div>
        </div>
      </div>
      <Infos lang={lang} d={d} />
    </>
  );
}

/** « Salon de thé Paris 15 » : le décor, le thé et les macarons, le quartier. */
function TeaRoom({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <>
      <PageHead d={d} id="salondethe">
        <TrustLine lang={lang} d={d} />
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-10">
          <Sections sections={d.pages.salondethe.sections} />
          <Ctas lang={lang} d={d} />
        </div>
        <Mosaic d={d} photos={["/media/salle/salle-guirlandes.jpg", "/media/patisseries/macarons.jpg", "/media/salle/bouquet-table.jpg", "/media/patisseries/tartes-maison.jpg", "/media/patisseries/entremets-abricot.jpg"]} />
      </div>
      <Infos lang={lang} d={d} />
    </>
  );
}

/** Réservation : le formulaire WhatsApp, à côté l'adresse, les horaires, l'appel et le lien vers les anniversaires. */
function Booking({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <>
      <PageHead d={d} id="reserver" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
        <div className="rounded-[4px] bg-paper p-5 md:p-9">
          <BookingForm />
        </div>
        <aside className="self-start rounded-[4px] bg-rose-soft p-6 lg:sticky lg:top-28">
          <h2 className="font-medium">{d.infos.address}</h2>
          <p className="mt-1.5 text-muted">
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </p>
          <div className="mt-5">
            <h2 className="font-medium">{d.infos.hours}</h2>
            <div className="mt-1">
              <HoursTable lang={lang} d={d} />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneIntl}`} className="btn-line">
              <PhoneIcon className="h-4 w-4" />
              <span className="tabular-nums">{site.phone}</span>
            </a>
            <a href={waHref(d.nav.waHello)} target="_blank" rel="noopener noreferrer" className="btn-line">
              <WhatsAppIcon className="h-4 w-4" />
              {d.nav.whatsapp}
            </a>
          </div>
          <TowerRule className="my-6" />
          <p className="eyebrow">{d.party.eyebrow}</p>
          <Link href={`/${lang}#anniversaires`} className="link-line mt-1 inline-flex min-h-11 items-center gap-2 font-medium">
            {d.party.title}
            <ArrowIcon />
          </Link>
        </aside>
      </div>
    </>
  );
}

function Legal({ d }: { d: Dict }) {
  const l = d.legal;
  const todo = <span className="text-red">{l.toFill}</span>;
  const rows: [string, React.ReactNode][] = [
    [
      l.editor,
      <span key="e">
        {site.legal.company}, {site.address.street}, {site.address.postalCode} {site.address.city} · {site.phone}
      </span>,
    ],
    [l.siret, site.legal.siret || todo],
    [l.director, site.legal.director || todo],
    [l.host, site.legal.host],
    [l.photos, fill(l.photosText, { handle: site.instagramHandle })],
    [l.data, l.dataText],
  ];
  return (
    <>
      <PageHead d={d} id="legal" />
      <dl className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-line py-5">
            <dt className="font-medium">{k}</dt>
            <dd className="mt-1 text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = pageOfSlug(slug, lang);
  if (!id) notFound();
  const d = getDict(lang);

  let body: React.ReactNode;
  if (id === "carte")
    body = (
      <>
        <PageHead d={d} id="carte">
          <p className="mt-3 max-w-2xl text-[0.9375rem] text-muted">{d.carte.printable}</p>
        </PageHead>
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <MenuTabs />
        </div>
        <Faq lang={lang} d={d} />
      </>
    );
  else if (id === "reserver") body = <Booking lang={lang} d={d} />;
  else if (id === "petitdej") body = <Breakfast lang={lang} d={d} />;
  else if (id === "salondethe") body = <TeaRoom lang={lang} d={d} />;
  else body = <Legal d={d} />;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(lang, id)) }} />
      {body}
    </>
  );
}
