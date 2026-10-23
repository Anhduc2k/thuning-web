import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, Sidebar } from "@/components/catalog";
import { JsonLd } from "@/components/json-ld";
import { categories, getCategory } from "@/lib/catalog";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { breadcrumbLd, pageMeta } from "@/lib/site";

export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: PageProps<"/[lang]/[category]">): Promise<Metadata> {
  const { l } = await getT();
  const c = getCategory((await params).category);
  return c ? pageMeta(l, c.name[l], c.intro[l], `/${c.slug}`) : {};
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/[lang]/[category]">) {
  const { l } = await getT();
  const c = getCategory((await params).category);
  if (!c) notFound();

  return (
    <>
      <PageHead title={c.name[l]} crumbs={[{ label: c.name[l] }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{c.intro[l]}</p>
      </PageHead>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <JsonLd data={breadcrumbLd(l, [{ name: c.name[l], path: `/${c.slug}` }])} />
        <Sidebar active={c.slug} />
        <div className="min-w-0">
          {c.subs.length > 0 && (
            <ul className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
              {c.subs.map((s) => (
                <li key={s.slug} className="shrink-0">
                  <Link href={href(l, `/${c.slug}/${s.slug}`)} className="block whitespace-nowrap rounded-full border border-line px-3.5 py-2 text-sm first-letter:uppercase hover:border-ink">
                    {s.name[l].replace("Phòng thực hành ", "")}
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
