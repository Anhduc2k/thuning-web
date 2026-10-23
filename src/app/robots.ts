import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // /admin là trang quản trị CMS, không cho Google lập chỉ mục.
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin" }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
