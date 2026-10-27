import { categories, getCategory, slugify, type IconName, type Product } from "./catalog";
import { checkPolicies, loadContent } from "./content";
import policies from "../../content/policies.json";

// Sản phẩm + bài viết từ content/*.json (đã kiểm tra hợp lệ), mới nhất trước. Build: đọc một lần; dev: đọc lại để F5 là thấy nội dung mới.
let cache: ReturnType<typeof loadContent> | undefined;
export function getContent() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  checkPolicies(policies);
  const c = loadContent(categories);
  c.products.sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name, "vi"));
  c.posts.sort((a, b) => b.date.localeCompare(a.date));
  return (cache = c);
}

export const getProducts = () => getContent().products;

export const getProduct = (slug: string) => getProducts().find((p) => p.slug === slug);

export function productIcon(p: Product): IconName {
  const c = getCategory(p.category);
  return c?.subs.find((s) => s.slug === p.sub)?.icon || c?.icon || "box";
}

export const PAGE_SIZE = 12;

export function listProducts(opts: { category?: string; sub?: string; q?: string; sort?: string; page?: number }) {
  let list = getProducts().filter(
    (p) => (!opts.category || p.category === opts.category) && (!opts.sub || p.sub === opts.sub),
  );
  if (opts.q) {
    const words = slugify(opts.q).split("-").filter(Boolean);
    list = list.filter((p) => {
      const hay = `${p.slug}-${slugify(p.model)}`;
      return words.every((w) => hay.includes(w));
    });
  }
  if (opts.sort === "ten-a-z") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Math.floor(opts.page || 1)), pages);
  return { items: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: list.length, page, pages };
}

// Biên tập viên chọn sẵn trong CMS thì dùng danh sách đó, không thì lấy cùng danh mục con rồi cùng danh mục.
export function relatedProducts(p: Product, n = 8) {
  // Bỏ chính nó (CMS cho chọn): cùng một ảnh hiện 2 lần trên trang làm hiệu ứng chuyển trang bị hủy.
  if (p.relatedProducts?.length) return p.relatedProducts.filter((s) => s !== p.slug).map((s) => getProduct(s)!);
  const same = getProducts().filter((x) => x.slug !== p.slug && x.category === p.category);
  return [...same.filter((x) => x.sub === p.sub), ...same.filter((x) => x.sub !== p.sub)].slice(0, n);
}
