import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { href, locales } from "@/lib/i18n";
import { posts } from "@/lib/posts";
import { policies, site } from "@/lib/site";

// Mỗi đường dẫn logic → một mục cho mỗi ngôn ngữ, kèm hreflang của cả hai.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    ...["/gioi-thieu", "/lien-he", "/tuyen-dung", "/tin-tuc"].map((path) => ({ path, priority: 0.5 })),
    ...categories.flatMap((c) => [
      { path: `/${c.slug}`, priority: 0.9 },
      ...c.subs.map((s) => ({ path: `/${c.slug}/${s.slug}`, priority: 0.8 })),
    ]),
    ...products.map((p) => ({ path: `/${p.category}/${p.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ path: `/tin-tuc/${p.slug}`, lastModified: p.date, priority: 0.6 })),
    ...Object.keys(policies).map((slug) => ({ path: `/chinh-sach/${slug}`, priority: 0.3 })),
  ];
  return pages.flatMap(({ path, ...rest }) => {
    const languages = { vi: site.url + path, en: site.url + href("en", path), "x-default": site.url + path };
    return locales.map((l) => ({ url: site.url + href(l, path), ...rest, alternates: { languages } }));
  });
}
