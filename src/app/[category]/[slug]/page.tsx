import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, ProductGrid, ProductVisual, Sidebar } from "@/components/catalog";
import { Gallery } from "@/components/gallery";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { categories, getCategory, subName } from "@/lib/catalog";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, getPost } from "@/lib/posts";
import { getProduct, getProducts, relatedProducts } from "@/lib/products";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, pageMeta, site } from "@/lib/site";

// Một route cho cả danh mục con (/thiet-bi-day-nghe/phong-thuc-hanh-dien-tu) và sản phẩm (/thiet-bi-day-nghe/<san-pham>), giống URL site gốc.
export const generateStaticParams = () => [
  ...categories.flatMap((c) => c.subs.map((s) => ({ category: c.slug, slug: s.slug }))),
  ...getProducts().map((p) => ({ category: p.category, slug: p.slug })),
];

function resolve(category: string, slug: string) {
  const c = getCategory(category);
  const sub = c?.subs.find((s) => s.slug === slug);
  const product = !sub ? getProduct(slug) : undefined;
  if (!c || (!sub && product?.category !== category)) return null;
  return { c, sub, product };
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const r = resolve(category, slug);
  if (!r) return {};
  const path = `/${category}/${slug}`;
  if (r.sub) {
    const n = getProducts().filter((p) => p.sub === r.sub!.slug).length;
    return pageMeta(r.sub.name, `${r.sub.name}: ${n} thiết bị thực hành do xưởng tự thiết kế, sản xuất. Lắp đặt, tập huấn giáo viên và bảo hành toàn quốc.`, path);
  }
  const p = r.product!;
  return pageMeta(
    p.name,
    p.summary ||
    `${p.name} (mã ${p.model}) – ${subName(r.c, p.sub) ?? r.c.name}. Sản xuất tại Việt Nam, giao hàng và lắp đặt toàn quốc. Gọi ${site.phoneDisplay} để nhận báo giá.`,
    path,
  );
}

export default async function Page({ params, searchParams }: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  const r = resolve(category, slug);
  if (!r) notFound();
  const { c, sub, product } = r;

  if (sub) {
    return (
      <>
        <PageHead title={sub.name} crumbs={[{ href: `/${c.slug}`, label: c.name }, { label: sub.name }]} />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
          <JsonLd data={breadcrumbLd([{ name: c.name, path: `/${c.slug}` }, { name: sub.name, path: `/${c.slug}/${sub.slug}` }])} />
          <Sidebar active={c.slug} activeSub={sub.slug} />
          <Suspense fallback={<ListingFallback />}>
            <Listing basePath={`/${c.slug}/${sub.slug}`} category={c.slug} sub={sub.slug} searchParams={searchParams} />
          </Suspense>
        </div>
      </>
    );
  }

  const p = product!;
  const subLabel = subName(c, p.sub);
  const specs: [string, string][] = [
    ["Mã sản phẩm", p.model],
    ["Danh mục", subLabel ?? c.name],
    ["Nhà sản xuất", site.legalName],
    ["Xuất xứ", "Việt Nam"],
    ["Tình trạng", "Mới 100%"],
    ["Tiêu chuẩn", "ISO 9001:2015, ISO 14001:2015"],
    ...(p.specs ?? []).map((s): [string, string] => [s.label, s.value]),
  ];
  const posts = (p.relatedPosts ?? []).map((s) => getPost(s)!);

  return (
    <>
      <div className="border-b border-line bg-panel">
        <nav aria-label="Đường dẫn" className="mx-auto max-w-7xl px-4 py-3 text-sm text-steel">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ink">Trang chủ</Link></li>
            <li className="flex items-center gap-1.5"><Icon name="chevron" className="size-3" /><Link href={`/${c.slug}`} className="hover:text-ink">{c.name}</Link></li>
            {p.sub && subLabel && (
              <li className="flex items-center gap-1.5"><Icon name="chevron" className="size-3" /><Link href={`/${c.slug}/${p.sub}`} className="hover:text-ink">{subLabel}</Link></li>
            )}
          </ol>
        </nav>
      </div>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        sku: p.model,
        category: subLabel ?? c.name,
        description: p.summary || `${p.name} – ${c.intro}`,
        url: `${site.url}/${c.slug}/${p.slug}`,
        ...(p.images?.length && { image: p.images.map((i) => site.url + i) }),
        brand: { "@type": "Brand", name: site.name },
        manufacturer: { "@id": `${site.url}/#org` },
      }} />
      <JsonLd data={breadcrumbLd([
        { name: c.name, path: `/${c.slug}` },
        ...(p.sub && subLabel ? [{ name: subLabel, path: `/${c.slug}/${p.sub}` }] : []),
        { name: p.name, path: `/${c.slug}/${p.slug}` },
      ])} />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {p.images && p.images.length > 1 ? (
            <Gallery images={p.images} alt={p.name} />
          ) : (
            <ProductVisual product={p} className="aspect-square border border-line" sizes="(min-width:1024px) 600px, 100vw" priority />
          )}

          <div>
            <p className="font-mono text-sm text-steel">{p.model}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-[2.25rem]">{p.name}</h1>
            {p.summary && <p className="mt-3 leading-relaxed text-steel">{p.summary}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p>Giá: <span className="text-xl font-bold text-brand">Liên hệ</span></p>
              <p className="flex items-center gap-1.5 text-sm text-green-700"><span className="size-2 rounded-full bg-green-600" />Còn hàng</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href="#bao-gia" className="flex h-14 flex-col items-center justify-center rounded-md bg-brand text-white hover:bg-brand-dark">
                <span className="font-semibold">Nhận báo giá</span>
                <span className="text-xs text-white/80">Để lại số điện thoại, tư vấn miễn phí</span>
              </a>
              <a href={`tel:${site.phone}`} className="flex h-14 items-center justify-center gap-2 rounded-md border-2 border-ink font-semibold hover:bg-ink hover:text-white">
                <Icon name="phone" className="size-5" />Gọi {site.phoneDisplay}
              </a>
            </div>

            <ul className="mt-6 grid gap-3 border-y border-line py-5 text-sm sm:grid-cols-2">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-2.5"><Icon name="shield" className="size-5 shrink-0 text-brand" />{h}</li>
              ))}
              <li className="flex gap-2.5"><Icon name="truck" className="size-5 shrink-0 text-brand" />Giao hàng và lắp đặt toàn quốc</li>
            </ul>

            <h2 className="mt-6 font-semibold">Thông số chung</h2>
            <dl className="mt-3 divide-y divide-line border border-line text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-steel">{k}</dt>
                  <dd className={k === "Mã sản phẩm" ? "font-mono" : ""}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_400px]">
          <section>
            <h2 className="border-b-2 border-ink pb-3 text-xl font-bold">Mô tả sản phẩm</h2>
            {p.description ? (
              // Markdown do biên tập viên nhập trong CMS (người có quyền ghi repo), không phải dữ liệu khách.
              <div className="prose-vi mt-5" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.description) }} />
            ) : (
            <div className="prose-vi mt-5">
              <p>{p.name} do {site.legalName} thiết kế và sản xuất tại xưởng Bát Tràng, Hà Nội.</p>
              <p>{c.intro}</p>
              <p>Cấu hình chi tiết, tài liệu kỹ thuật và bài thực hành kèm theo được gửi cùng báo giá. Liên hệ để được tư vấn phương án phù hợp với nhu cầu của đơn vị bạn.</p>
            </div>
            )}
          </section>

          <section id="bao-gia" className="scroll-mt-32 bg-ink p-6 text-white md:p-8">
            <h2 className="text-xl font-bold">Nhận báo giá thiết bị</h2>
            <p className="mt-1 text-sm text-white/70">Chúng tôi gọi lại trong giờ làm việc để xác nhận cấu hình và gửi báo giá.</p>
            <div className="mt-5">
              <LeadForm kind="order" product={`${p.model} – ${p.name}`} submitLabel="Gửi yêu cầu báo giá" dark />
            </div>
          </section>
        </div>

        {posts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 border-b-2 border-ink pb-3 text-xl font-bold">Bài viết liên quan</h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {posts.map((o) => (
                <li key={o.slug}>
                  <Link href={`/tin-tuc/${o.slug}`} className="group block">
                    <p className="text-sm text-steel"><time dateTime={o.date}>{formatDate(o.date)}</time> · {o.topic}</p>
                    <h3 className="mt-1 font-semibold leading-snug group-hover:text-brand">{o.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16">
          <h2 className="mb-6 border-b-2 border-ink pb-3 text-xl font-bold">Sản phẩm tương tự</h2>
          <ProductGrid items={relatedProducts(p)} />
        </section>
      </div>
    </>
  );
}
