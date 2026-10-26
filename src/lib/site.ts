import type { Metadata } from "next";
import policiesData from "../../content/policies.json";
import siteData from "../../content/site.json";
import { getCategoryById } from "./catalog";

// Thông tin công ty: sửa trong CMS (/admin → Cài đặt → Thông tin công ty) là đổi trên toàn site.
export const site = siteData;

// Menu trên cùng. Mục danh mục lấy tên từ CMS; danh mục bị xóa thì tự ẩn. Muốn thêm danh mục mới lên menu: thêm slug vào đây.
const menuCategories = ["thiet-bi-day-nghe", "co-khi-che-tao-may", "bang-tai-cong-nghiep", "tu-dien-bang-dien"];
export const nav: { href: string; label: string; category?: string }[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  ...menuCategories.flatMap((slug) => {
    const c = getCategoryById(slug);
    return c ? [{ href: `/${c.slug}`, label: c.name, ...(c.subs.length && { category: c.slug }) }] : [];
  }),
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/lien-he", label: "Liên hệ" },
];

// Chính sách ở chân trang (/chinh-sach/<slug>); `body` là Markdown.
export const policies: Record<string, { title: string; body: string }> = Object.fromEntries(policiesData.map(({ slug, ...p }) => [slug, p]));

/** Metadata cho một trang: canonical + Open Graph. Next gộp metadata kiểu nông nên mỗi trang phải tự đặt đủ openGraph. */
export function pageMeta(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "vi_VN", siteName: site.name, title, description, url: path },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#org`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "VN" },
  sameAs: [site.facebook, site.youtube],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Trang chủ", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: site.url + it.path,
    })),
  };
}
