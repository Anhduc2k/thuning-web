import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/catalog";
import { formatDate, posts } from "@/lib/posts";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta("Tin tức", "Tin tức, hướng dẫn kỹ thuật và kinh nghiệm trang bị phòng thực hành, băng tải, máy chế tạo.", "/tin-tuc");

export default function NewsPage() {
  return (
    <>
      <PageHead title="Tin tức và hướng dẫn" crumbs={[{ label: "Tin tức" }]} />
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="border-t-2 border-ink pt-4">
            <Link href={`/tin-tuc/${p.slug}`} className="group block">
              <p className="text-sm text-steel"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.topic}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug group-hover:text-brand">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-steel">{p.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
