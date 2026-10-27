import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { categories, SORTS, type Product } from "@/lib/catalog";
import { listProducts, productIcon } from "@/lib/products";
import { site } from "@/lib/site";
import { Icon } from "./icons";

/** Ảnh sản phẩm; chưa có ảnh thì hiện khung bản vẽ với biểu tượng danh mục. */
export function ProductVisual({ product, className = "", sizes = "300px", priority = false }: { product: Product; className?: string; sizes?: string; priority?: boolean }) {
  const img = product.images?.[0];
  if (img) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image src={img} alt={product.name} fill sizes={sizes} priority={priority} className="object-contain transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>
    );
  }
  return (
    <div className={`bg-blueprint plate relative grid place-items-center overflow-hidden text-steel ${className}`} role="img" aria-label={product.name}>
      <Icon name={productIcon(product)} className="relative size-2/5 max-h-32 stroke-[0.9] transition duration-500 ease-out group-hover:scale-110 group-hover:text-brand" />
    </div>
  );
}

/** Cùng `name` ở thẻ sản phẩm và ảnh lớn trang chi tiết → khi bấm vào, ảnh "bay" từ lưới sang trang chi tiết.
 *  Ảnh không có cặp (sản phẩm không được bấm) thì mờ đi / hiện ra cùng nhịp cả trang (lớp .page-fade). */
export function ProductMorph({ slug, children }: { slug: string; children: React.ReactNode }) {
  return <ViewTransition name={`product-${slug}`} share="morph" enter="page-fade" exit="page-fade" default="none">{children}</ViewTransition>;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/${product.category}/${product.slug}`} className="reveal group flex flex-col border border-line bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-[0_12px_24px_-12px_rgb(21_24_28/0.35)]">
      <div className="relative">
        <ProductMorph slug={product.slug}><ProductVisual product={product} className="aspect-[4/3]" /></ProductMorph>
        <span className="absolute left-0 top-0 bg-white px-2 py-1 font-mono text-xs text-steel">{product.model}</span>
        {product.isNew && <span className="absolute right-2 top-2 bg-brand px-1.5 py-0.5 text-xs font-semibold text-white">Mới</span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-line p-4">
        <h3 className="line-clamp-3 text-[15px] sm:line-clamp-2 font-semibold leading-snug group-hover:text-brand">{product.name}</h3>
        <span className="mt-auto text-sm text-steel">Giá: <span className="font-semibold text-brand">Liên hệ</span></span>
      </div>
    </Link>
  );
}

export function ProductGrid({ items, cols = 4 }: { items: Product[]; cols?: 3 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${cols === 4 ? "xl:grid-cols-4" : ""}`}>
      {items.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Đường dẫn" className="text-sm text-white/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-white">Trang chủ</Link></li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <Icon name="chevron" className="size-3" />
            {it.href ? <Link href={it.href} className="hover:text-white">{it.label}</Link> : <span aria-current="page" className="text-white">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHead({ title, crumbs, children }: { title: string; crumbs: { href?: string; label: string }[]; children?: React.ReactNode }) {
  return (
    <div className="bg-blueprint-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-[2.5rem] md:leading-tight">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export function CategoryTree({ active, activeSub }: { active?: string; activeSub?: string }) {
  return (
    <nav aria-label="Danh mục sản phẩm" className="tree border border-line">
      <h2 className="bg-ink px-4 py-3 font-semibold text-white">Danh mục sản phẩm</h2>
      <ul className="divide-y divide-line">
        {categories.map((c) => (
          <li key={c.slug}>
            <details open={c.slug === active} className="group">
              <summary className={`flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-[15px] font-medium hover:text-brand [&::-webkit-details-marker]:hidden ${c.slug === active && !activeSub ? "text-brand" : ""}`}>
                <Icon name={c.icon} className="size-5 text-steel" />
                <Link href={`/${c.slug}`} className="-my-3 flex-1 py-3">{c.name}</Link>
                {c.subs.length > 0 && <Icon name="chevron" className="size-4 text-steel transition group-open:rotate-90" />}
              </summary>
              {c.subs.length > 0 && (
                <ul className="pb-3 pl-12 pr-4">
                  {c.subs.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${c.slug}/${s.slug}`}
                        aria-current={s.slug === activeSub ? "page" : undefined}
                        className="block py-2.5 text-sm text-steel hover:text-brand lg:py-1.5 aria-[current=page]:font-semibold aria-[current=page]:text-brand"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function HotlineBox() {
  return (
    <div className="bg-brand p-5 text-white">
      <p className="text-sm text-white/80">Cần tư vấn cấu hình hoặc báo giá?</p>
      <a href={`tel:${site.phone}`} className="mt-1 block text-2xl font-bold tracking-tight hover:underline">{site.phoneDisplay}</a>
      <p className="mt-1 text-sm text-white/80">Gọi hoặc nhắn Zalo, kể cả ngoài giờ hành chính.</p>
    </div>
  );
}

export function Sidebar({ active, activeSub }: { active?: string; activeSub?: string }) {
  return (
    <aside className="space-y-5 max-lg:order-last lg:sticky lg:top-32 lg:self-start">
      <CategoryTree active={active} activeSub={activeSub} />
      <HotlineBox />
    </aside>
  );
}

/** Lưới sản phẩm có sắp xếp + phân trang qua query string (?sort=&page=). */
export async function Listing({ basePath, category, sub, searchParams }: { basePath: string; category?: string; sub?: string; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const sort = sp.sort === "ten-a-z" ? "ten-a-z" : "moi-nhat";
  const search = typeof sp.q === "string" ? sp.q.trim().slice(0, 100) : "";
  const { items, total, page, pages } = listProducts({ category, sub, sort, q: search, page: Number(sp.page) || 1 });
  const href = (s: string, p = 1) => {
    const q = new URLSearchParams();
    if (search) q.set("q", search);
    if (s !== "moi-nhat") q.set("sort", s);
    if (p > 1) q.set("page", String(p));
    const qs = q.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  if (!total) {
    return (
      <div className="border border-dashed border-line p-10 text-center">
        <p className="font-semibold">{search ? `Không tìm thấy thiết bị khớp “${search}”.` : "Danh mục này đang cập nhật sản phẩm."}</p>
        <p className="mt-1 text-steel">Gọi {site.phoneDisplay} để được tư vấn thiết bị theo yêu cầu.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-steel">{total} sản phẩm</p>
        <div className="flex rounded-md border border-line p-0.5 text-sm" role="group" aria-label="Sắp xếp">
          {Object.entries(SORTS).map(([k, label]) => (
            <Link key={k} href={href(k)} aria-current={k === sort ? "true" : undefined} className="rounded px-3 py-1.5 text-steel aria-[current=true]:bg-ink aria-[current=true]:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <ProductGrid items={items} cols={3} />
      {pages > 1 && (
        <nav aria-label="Phân trang" className="mt-8 flex justify-center gap-1.5">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={href(sort, n)} aria-current={n === page ? "page" : undefined} className="grid size-10 place-items-center border border-line text-sm hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white">
              {n}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export function ListingFallback() {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="aspect-[4/5] animate-pulse bg-panel" />)}</div>;
}
