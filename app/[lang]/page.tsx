import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/jsonld";
import { Blocks, Faq, Heading, Hero, Infos, Party, Reviews, Services, Tiles } from "@/components/Sections";
import { MenuTabs } from "@/components/MenuTabs";

export const revalidate = 3600;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />
      <Hero lang={lang} d={d} />
      <Tiles lang={lang} d={d} />
      <Services lang={lang} d={d} />
      <section id="carte" aria-labelledby="carte-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-8 md:px-8">
        <Heading eyebrow={d.carte.eyebrow} title={d.carte.title} id="carte-title">
          <p className="lead mt-4 max-w-2xl">{d.carte.intro}</p>
        </Heading>
        <div className="mt-8">
          <MenuTabs home />
        </div>
      </section>
      <Blocks lang={lang} d={d} />
      <Party lang={lang} d={d} />
      <Reviews lang={lang} d={d} />
      <Infos lang={lang} d={d} />
      <Faq lang={lang} d={d} />
    </>
  );
}
