import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { posts } from "@/lib/posts";
import { policies, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => site.url + path;
  return [
    { url: url("/"), priority: 1 },
    ...["/gioi-thieu", "/lien-he", "/tuyen-dung", "/tin-tuc"].map((p) => ({ url: url(p), priority: 0.5 })),
    ...categories.flatMap((c) => [
      { url: url(`/${c.slug}`), priority: 0.9 },
      ...c.subs.map((s) => ({ url: url(`/${c.slug}/${s.slug}`), priority: 0.8 })),
    ]),
    ...products.map((p) => ({ url: url(`/${p.category}/${p.slug}`), priority: 0.7 })),
    ...posts.map((p) => ({ url: url(`/tin-tuc/${p.slug}`), lastModified: p.date, priority: 0.6 })),
    ...Object.keys(policies).map((slug) => ({ url: url(`/chinh-sach/${slug}`), priority: 0.3 })),
  ];
}
