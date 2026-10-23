import type { Metadata } from "next";
import { Suspense } from "react";
import { Listing, ListingFallback, PageHead, Sidebar } from "@/components/catalog";

export const metadata: Metadata = { title: "Tìm kiếm", robots: { index: false } };

export default function SearchPage({ searchParams }: PageProps<"/tim-kiem">) {
  return (
    <>
      <PageHead title="Tìm kiếm thiết bị" crumbs={[{ label: "Tìm kiếm" }]} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <Suspense fallback={<ListingFallback />}>
          <Listing basePath="/tim-kiem" searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
