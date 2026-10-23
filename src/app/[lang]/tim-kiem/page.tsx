import type { Metadata } from "next";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, Sidebar } from "@/components/catalog";
import { getT } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t.search.title, robots: { index: false } };
}

export default async function SearchPage({ searchParams }: PageProps<"/[lang]/tim-kiem">) {
  const { t } = await getT();
  return (
    <>
      <PageHead title={t.search.heading} crumbs={[{ label: t.search.title }]} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <Suspense fallback={<ListingFallback />}>
          <Listing basePath="/tim-kiem" searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
