import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { renderMarkdown } from "@/lib/markdown";
import { HotlineBox, PageHead, ProductGrid } from "@/components/catalog";
import { JsonLd } from "@/components/json-ld";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { getProduct } from "@/lib/products";
import { breadcrumbLd, pageMeta, site } from "@/lib/site";

export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? pageMeta(p.title, p.excerpt, `/tin-tuc/${p.slug}`, "article") : {};
}

export default async function PostPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const others = getPosts().filter((x) => x.slug !== p.slug).slice(0, 4);
  const products = p.relatedProducts.map((s) => getProduct(s)!);

  return (
    <>
      <PageHead title={p.title} crumbs={[{ href: "/tin-tuc", label: "Tin tức" }, { label: p.topic }]}>
        <p className="mt-4 text-steel"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.topic}</p>
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 lg:grid-cols-[1fr_320px]">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          ...(p.image && { image: site.url + p.image }),
          url: `${site.url}/tin-tuc/${p.slug}`,
          author: { "@id": `${site.url}/#org` },
          publisher: { "@id": `${site.url}/#org` },
        }} />
        <JsonLd data={breadcrumbLd([{ name: "Tin tức", path: "/tin-tuc" }, { name: p.title, path: `/tin-tuc/${p.slug}` }])} />
        <div>
          {p.image && (
            <div className="relative mb-8 aspect-video overflow-hidden bg-panel">
              <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 860px, 100vw" className="object-cover" priority />
            </div>
          )}
          <article className="prose-vi text-[17px]">
            <p className="text-lg font-medium">{p.excerpt}</p>
            {/* Markdown do biên tập viên nhập trong CMS (người có quyền ghi repo). */}
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
          </article>
          {products.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 border-b-2 border-ink pb-3 text-xl font-bold">Sản phẩm liên quan</h2>
              <ProductGrid items={products} cols={3} />
            </section>
          )}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <HotlineBox />
          <div>
            <h2 className="border-b-2 border-ink pb-2 font-semibold">Bài viết khác</h2>
            <ul className="divide-y divide-line">
              {others.map((o) => (
                <li key={o.slug}><Link href={`/tin-tuc/${o.slug}`} className="block py-3 leading-snug hover:text-brand">{o.title}</Link></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
