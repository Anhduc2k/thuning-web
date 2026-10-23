import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HotlineBox, PageHead } from "@/components/catalog";
import { JsonLd } from "@/components/json-ld";
import { formatDate, getPost, posts } from "@/lib/posts";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { breadcrumbLd, pageMeta, site } from "@/lib/site";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/[lang]/tin-tuc/[slug]">): Promise<Metadata> {
  const { l } = await getT();
  const p = getPost((await params).slug);
  return p ? pageMeta(l, p.title[l], p.excerpt[l], `/tin-tuc/${p.slug}`, "article") : {};
}

export default async function PostPage({ params }: PageProps<"/[lang]/tin-tuc/[slug]">) {
  const { l, t } = await getT();
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/tin-tuc/${p.slug}`;
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <PageHead title={p.title[l]} crumbs={[{ href: "/tin-tuc", label: t.news.title }, { label: p.topic[l] }]}>
        <p className="mt-4 text-white/60"><time dateTime={p.date}>{formatDate(p.date, l)}</time> · {p.topic[l]}</p>
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 lg:grid-cols-[1fr_320px]">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title[l],
          description: p.excerpt[l],
          inLanguage: l,
          datePublished: p.date,
          url: site.url + href(l, path),
          author: { "@id": `${site.url}/#org` },
          publisher: { "@id": `${site.url}/#org` },
        }} />
        <JsonLd data={breadcrumbLd(l, [{ name: t.news.title, path: "/tin-tuc" }, { name: p.title[l], path }])} />
        <article className="prose-vi text-[17px]">
          <p className="text-lg font-medium">{p.excerpt[l]}</p>
          {p.body[l].map((para, i) => <p key={i}>{para}</p>)}
        </article>
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <HotlineBox />
          <div>
            <h2 className="border-b-2 border-ink pb-2 font-semibold">{t.news.more}</h2>
            <ul className="divide-y divide-line">
              {others.map((o) => (
                <li key={o.slug}><Link href={href(l, `/tin-tuc/${o.slug}`)} className="block py-3 leading-snug hover:text-brand">{o.title[l]}</Link></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
