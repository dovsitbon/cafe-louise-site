import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { LangSwitch } from "@/components/LangSwitch";
import { formatTime, num } from "@/lib/format";
import { weekHours } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";
import { waHref } from "@/lib/wa";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  // Créneau du mardi, affiché pour « du mardi au samedi » (data/horaires.json)
  const tue = weekHours()[1];
  const links = [
    { href: pagePath("carte", lang), label: d.pages.carte.title },
    { href: pagePath("petitdej", lang), label: d.pages.petitdej.title },
    { href: pagePath("salondethe", lang), label: d.pages.salondethe.title },
    { href: pagePath("reserver", lang), label: d.pages.reserver.title },
  ];
  return (
    <footer className="bg-night text-cream">
      <div className="scallop text-cream" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <Logo light className="h-14 w-auto" title={site.name} />
          <p className="mt-5 max-w-xs text-cream/80">{d.footer.tagline}</p>
        </div>
        <div>
          <h2 className="eyebrow !text-rose">{d.infos.address}</h2>
          <address className="mt-3 leading-relaxed not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-3 flex min-h-11 items-center gap-2 tabular-nums hover:underline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <a href={waHref(d.nav.waHello)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 hover:underline">
            <WhatsAppIcon className="h-4 w-4" />
            {d.nav.whatsapp}
          </a>
        </div>
        <div>
          <h2 className="eyebrow !text-rose">{d.footer.hours}</h2>
          <p className="mt-3 leading-relaxed">
            {d.footer.openDays}
            <br />
            <span className="tabular-nums">{tue.map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(", ")}</span>
          </p>
          <p className="mt-2 text-cream/75">{d.footer.closedDays}</p>
        </div>
        <div>
          <h2 className="eyebrow !text-rose">{d.footer.pages}</h2>
          <ul className="mt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-cream/15 px-5 py-5 text-[0.875rem] md:px-8">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline">
          <InstagramIcon className="h-5 w-5" />
          {site.instagramHandle}
        </a>
        <div className="flex items-center gap-6">
          <Link href={pagePath("legal", lang)} className="inline-flex min-h-11 items-center hover:underline">
            {d.footer.legal}
          </Link>
          <LangSwitch lang={lang} label={d.nav.lang} />
        </div>
        <p className="w-full text-cream/70 md:w-auto">
          © {num(new Date().getFullYear(), lang, { useGrouping: false })} {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
