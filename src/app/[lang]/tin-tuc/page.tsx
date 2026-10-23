import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/catalog";
import { formatDate, posts } from "@/lib/posts";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { l, t } = await getT();
  return pageMeta(l, t.news.title, t.news.desc, "/tin-tuc");
}

export default async function NewsPage() {
  const { l, t } = await getT();
  return (
    <>
      <PageHead title={t.news.heading} crumbs={[{ label: t.news.title }]} />
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="border-t-2 border-ink pt-4">
            <Link href={href(l, `/tin-tuc/${p.slug}`)} className="group block">
              <p className="text-sm text-steel"><time dateTime={p.date}>{formatDate(p.date, l)}</time> · {p.topic[l]}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug group-hover:text-brand">{p.title[l]}</h2>
              <p className="mt-2 leading-relaxed text-steel">{p.excerpt[l]}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
