import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, Sidebar } from "@/components/catalog";
import { JsonLd } from "@/components/json-ld";
import { categories, getCategory } from "@/lib/catalog";
import { breadcrumbLd, pageMeta } from "@/lib/site";

export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const c = getCategory((await params).category);
  return c ? pageMeta(c.name, c.intro, `/${c.slug}`) : {};
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/[category]">) {
  const c = getCategory((await params).category);
  if (!c) notFound(); // đường dẫn cũ đã được src/proxy.ts chuyển hướng trước khi tới đây

  return (
    <>
      <PageHead title={c.name} crumbs={[{ label: c.name }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{c.intro}</p>
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <JsonLd data={breadcrumbLd([{ name: c.name, path: `/${c.slug}` }])} />
        <Sidebar active={c.slug} />
        <div className="min-w-0">
          {c.subs.length > 0 && (
            <ul className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
              {c.subs.map((s) => (
                <li key={s.slug} className="shrink-0">
                  <Link href={`/${c.slug}/${s.slug}`} className="block whitespace-nowrap rounded-full border border-line px-3.5 py-2 text-sm first-letter:uppercase hover:border-ink">
                    {s.name.replace("Phòng thực hành ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Suspense fallback={<ListingFallback />}>
            <Listing basePath={`/${c.slug}`} category={c.slug} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
