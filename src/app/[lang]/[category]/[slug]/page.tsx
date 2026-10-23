import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, ProductGrid, ProductVisual, Sidebar } from "@/components/catalog";
import { Gallery } from "@/components/gallery";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { categories, getCategory, getProduct, products, relatedProducts, subName } from "@/lib/catalog";
import { JsonLd } from "@/components/json-ld";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { breadcrumbLd, pageMeta, site } from "@/lib/site";

// Một route cho cả danh mục con (/thiet-bi-day-nghe/phong-thuc-hanh-dien-tu) và sản phẩm (/thiet-bi-day-nghe/<san-pham>), giống URL site gốc.
export const generateStaticParams = () => [
  ...categories.flatMap((c) => c.subs.map((s) => ({ category: c.slug, slug: s.slug }))),
  ...products.map((p) => ({ category: p.category, slug: p.slug })),
];

function resolve(category: string, slug: string) {
  const c = getCategory(category);
  const sub = c?.subs.find((s) => s.slug === slug);
  const product = !sub ? getProduct(slug) : undefined;
  if (!c || (!sub && product?.category !== category)) return null;
  return { c, sub, product };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[category]/[slug]">): Promise<Metadata> {
  const { l, t } = await getT();
  const { category, slug } = await params;
  const r = resolve(category, slug);
  if (!r) return {};
  const path = `/${category}/${slug}`;
  if (r.sub) {
    const n = products.filter((p) => p.sub === r.sub!.slug).length;
    return pageMeta(l, r.sub.name[l], t.product.subDesc(r.sub.name[l], n), path);
  }
  const p = r.product!;
  return pageMeta(l, p.name[l], t.product.metaDesc(p.name[l], p.model, subName(r.c, p.sub, l) ?? r.c.name[l], site.phoneDisplay), path);
}

export default async function Page({ params, searchParams }: PageProps<"/[lang]/[category]/[slug]">) {
  const { l, t } = await getT();
  const { category, slug } = await params;
  const r = resolve(category, slug);
  if (!r) notFound();
  const { c, sub, product } = r;

  if (sub) {
    return (
      <>
        <PageHead title={sub.name[l]} crumbs={[{ href: `/${c.slug}`, label: c.name[l] }, { label: sub.name[l] }]} />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
          <JsonLd data={breadcrumbLd(l, [{ name: c.name[l], path: `/${c.slug}` }, { name: sub.name[l], path: `/${c.slug}/${sub.slug}` }])} />
          <Sidebar active={c.slug} activeSub={sub.slug} />
          <Suspense fallback={<ListingFallback />}>
            <Listing basePath={`/${c.slug}/${sub.slug}`} category={c.slug} sub={sub.slug} searchParams={searchParams} />
          </Suspense>
        </div>
      </>
    );
  }

  const p = product!;
  const name = p.name[l];
  const subLabel = subName(c, p.sub, l);
  const path = `/${c.slug}/${p.slug}`;
  const specs: [string, string][] = [
    [t.product.model, p.model],
    [t.product.category, subLabel ?? c.name[l]],
    [t.product.maker, site.legalName],
    [t.product.origin, t.product.originValue],
    [t.product.condition, t.product.conditionValue],
    [t.product.standard, "ISO 9001:2015, ISO 14001:2015"],
  ];

  return (
    <>
      <div className="border-b border-line bg-panel">
        <nav aria-label={t.breadcrumb} className="mx-auto max-w-7xl px-4 py-3 text-sm text-steel">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href={href(l, "/")} className="hover:text-ink">{t.homeLabel}</Link></li>
            <li className="flex items-center gap-1.5"><Icon name="chevron" className="size-3" /><Link href={href(l, `/${c.slug}`)} className="hover:text-ink">{c.name[l]}</Link></li>
            {p.sub && subLabel && (
              <li className="flex items-center gap-1.5"><Icon name="chevron" className="size-3" /><Link href={href(l, `/${c.slug}/${p.sub}`)} className="hover:text-ink">{subLabel}</Link></li>
            )}
          </ol>
        </nav>
      </div>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        sku: p.model,
        category: subLabel ?? c.name[l],
        description: `${name} – ${c.intro[l]}`,
        url: site.url + href(l, path),
        ...(p.images?.length && { image: p.images.map((i) => site.url + i) }),
        brand: { "@type": "Brand", name: site.name },
        manufacturer: { "@id": `${site.url}/#org` },
      }} />
      <JsonLd data={breadcrumbLd(l, [
        { name: c.name[l], path: `/${c.slug}` },
        ...(p.sub && subLabel ? [{ name: subLabel, path: `/${c.slug}/${p.sub}` }] : []),
        { name, path },
      ])} />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {p.images && p.images.length > 1 ? (
            <Gallery images={p.images} alt={name} locale={l} />
          ) : (
            <ProductVisual product={p} className="aspect-square border border-line" sizes="(min-width:1024px) 600px, 100vw" priority />
          )}

          <div>
            <p className="font-mono text-sm text-steel">{p.model}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-[2.25rem]">{name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p>{t.price} <span className="text-xl font-bold text-brand">{t.contactPrice}</span></p>
              <p className="flex items-center gap-1.5 text-sm text-green-700"><span className="size-2 rounded-full bg-green-600" />{t.product.inStock}</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href="#bao-gia" className="flex h-14 flex-col items-center justify-center rounded-md bg-brand text-white hover:bg-brand-dark">
                <span className="font-semibold">{t.product.quote}</span>
                <span className="text-xs text-white/80">{t.product.quoteNote}</span>
              </a>
              <a href={`tel:${site.phone}`} className="flex h-14 items-center justify-center gap-2 rounded-md border-2 border-ink font-semibold hover:bg-ink hover:text-white">
                <Icon name="phone" className="size-5" />{t.call} {site.phoneDisplay}
              </a>
            </div>

            <ul className="mt-6 grid gap-3 border-y border-line py-5 text-sm sm:grid-cols-2">
              {c.highlights[l].map((h) => (
                <li key={h} className="flex gap-2.5"><Icon name="shield" className="size-5 shrink-0 text-brand" />{h}</li>
              ))}
              <li className="flex gap-2.5"><Icon name="truck" className="size-5 shrink-0 text-brand" />{t.product.delivery}</li>
            </ul>

            <h2 className="mt-6 font-semibold">{t.product.specsTitle}</h2>
            <dl className="mt-3 divide-y divide-line border border-line text-sm">
              {specs.map(([k, v], i) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-steel">{k}</dt>
                  <dd className={i === 0 ? "font-mono" : ""}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_400px]">
          <section>
            <h2 className="border-b-2 border-ink pb-3 text-xl font-bold">{t.product.descTitle}</h2>
            <div className="prose-vi mt-5">
              <p>{t.product.made(name, site.legalName)}</p>
              <p>{c.intro[l]}</p>
              <p>{t.product.docs}</p>
            </div>
          </section>

          <section id="bao-gia" className="scroll-mt-32 bg-ink p-6 text-white md:p-8">
            <h2 className="text-xl font-bold">{t.product.formTitle}</h2>
            <p className="mt-1 text-sm text-white/70">{t.product.formNote}</p>
            <div className="mt-5">
              {/* Tên sản phẩm luôn tiếng Việt để log bán hàng thống nhất một ngôn ngữ */}
              <LeadForm kind="order" product={`${p.model} – ${p.name.vi}`} submitLabel={t.product.submit} locale={l} dark />
            </div>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 border-b-2 border-ink pb-3 text-xl font-bold">{t.product.related}</h2>
          <ProductGrid items={relatedProducts(p)} />
        </section>
      </div>
    </>
  );
}
