import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Category, Product } from "./catalog";
import type { Post } from "./posts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// Đường dẫn tĩnh của site: danh mục trùng tên sẽ đè mất trang.
const RESERVED = ["admin", "uploads", "gioi-thieu", "lien-he", "tuyen-dung", "tin-tuc", "chinh-sach", "tim-kiem"];

// Đọc mọi file JSON trong content/<dir> (do CMS /admin ghi), slug = tên file.
function readCollection(root: string, dir: string) {
  const base = join(root, "content", dir);
  return readdirSync(base)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.slice(0, -5);
      // Tên file = đường dẫn trên web, nên chỉ cho phép chữ thường không dấu, số và gạch ngang.
      if (!SLUG.test(slug)) throw new Error(`content/${dir}/${f}: tên file phải không dấu, dạng a-z0-9-`);
      try {
        return { ...JSON.parse(readFileSync(join(base, f), "utf8")), slug } as Record<string, unknown> & { slug: string };
      } catch (e) {
        throw new Error(`content/${dir}/${f}: không đọc được JSON (${(e as Error).message})`);
      }
    });
}

/**
 * Đọc + kiểm tra sản phẩm và bài viết (chúng liên kết chéo nhau nên kiểm tra cùng lúc).
 * Sai ở đâu thì ném lỗi nêu rõ file và trường → build hỏng, bản đang chạy vẫn giữ nguyên.
 * Trường tùy chọn để trống ("" hoặc []) được coi như không có.
 */
export function loadContent(categories: Category[], root = process.cwd()) {
  const raw = { products: readCollection(root, "products"), posts: readCollection(root, "posts") };
  if (!categories.length) throw new Error("content/categories.json: cần ít nhất 1 danh mục");
  if (!raw.products.length) throw new Error("content/products: cần ít nhất 1 sản phẩm");
  if (!raw.posts.length) throw new Error("content/posts: cần ít nhất 1 bài viết");
  const slugs = { products: new Set(raw.products.map((p) => p.slug)), posts: new Set(raw.posts.map((p) => p.slug)) };
  const fail = (where: string, field: string, msg: string): never => {
    throw new Error(`${where}: trường "${field}" ${msg}`);
  };

  const key = (x: { id?: string; slug: string }) => x.id ?? x.slug;
  for (const c of categories) {
    const where = `content/categories.json (${c.name || c.slug})`;
    if (categories.filter((x) => key(x) === key(c)).length > 1) fail(where, "id", `"${key(c)}" bị trùng với danh mục khác`);
    if (!SLUG.test(c.slug ?? "")) fail(where, "slug", "phải không dấu, dạng a-z0-9-");
    if (RESERVED.includes(c.slug)) fail(where, "slug", `trùng đường dẫn có sẵn /${c.slug}`);
    if (categories.filter((x) => x.slug === c.slug).length > 1) fail(where, "slug", "bị trùng với danh mục khác");
    for (const s of c.subs ?? []) {
      if (!SLUG.test(s.slug ?? "")) fail(where, "subs.slug", `"${s.slug}" phải không dấu, dạng a-z0-9-`);
      if (c.subs.filter((x) => x.slug === s.slug).length > 1) fail(where, "subs.slug", `"${s.slug}" bị trùng`);
      if (c.subs.filter((x) => key(x) === key(s)).length > 1) fail(where, "subs.id", `"${key(s)}" bị trùng`);
    }
  }

  // Chuỗi bắt buộc / tùy chọn, ngày, danh sách slug liên kết, ảnh trong /uploads.
  const str = (where: string, o: Record<string, unknown>, k: string, required = true) => {
    const v = o[k];
    if (v === undefined || v === null || v === "") return required ? fail(where, k, "đang để trống") : undefined;
    return typeof v === "string" ? v : fail(where, k, "phải là chữ");
  };
  const list = (where: string, o: Record<string, unknown>, k: string) => {
    const v = o[k] ?? [];
    return Array.isArray(v) ? (v as unknown[]) : fail(where, k, "phải là danh sách");
  };
  const date = (where: string, o: Record<string, unknown>) => {
    const d = str(where, o, "date")!;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10) !== d) fail(where, "date", `"${d}" phải là ngày có thật, dạng YYYY-MM-DD`);
    return d;
  };
  const refs = (where: string, o: Record<string, unknown>, k: string, target: Set<string>, label: string) =>
    list(where, o, k).map((s) => (typeof s === "string" && target.has(s) ? s : fail(where, k, `trỏ tới ${label} không tồn tại: "${s}"`)));
  const image = (where: string, k: string, v: unknown) => {
    if (typeof v !== "string" || !v.startsWith("/uploads/")) return fail(where, k, `"${v}" phải là ảnh tải lên trong /uploads/`);
    if (process.env.NODE_ENV !== "production" || process.env.NEXT_PHASE === "phase-production-build")
      if (!existsSync(join(root, "public", v))) fail(where, k, `không thấy file public${v}`);
    return v;
  };

  const models = new Map<string, string>();
  // Sản phẩm lưu mã danh mục (hoặc đường dẫn, dữ liệu cũ). Danh mục bị xóa → tạm ẩn sản phẩm; danh mục con bị xóa → hiện thẳng dưới danh mục.
  // Chỉ cảnh báo trong log build, không dừng build: sửa trong CMS là web tự cập nhật.
  const warn = (msg: string) => console.warn(`[nội dung] ${msg}`);
  const products = raw.products.flatMap((o): Product[] => {
    const where = `content/products/${o.slug}.json`;
    const ref = str(where, o, "category")!;
    const c = categories.find((x) => key(x) === ref) ?? categories.find((x) => x.slug === ref);
    if (!c) {
      warn(`${where}: danh mục "${ref}" không còn, tạm ẩn sản phẩm (chọn lại danh mục trong CMS để hiện lại)`);
      return [];
    }
    const category = c.slug;
    const subRef = str(where, o, "sub", false);
    const s = subRef ? (c.subs.find((x) => key(x) === subRef) ?? c.subs.find((x) => x.slug === subRef)) : undefined;
    if (subRef && !s) warn(`${where}: danh mục con "${subRef}" không còn trong "${c.name}", sản phẩm hiện thẳng dưới danh mục`);
    const sub = s?.slug;
    // Sản phẩm và danh mục con dùng chung đường dẫn /<danh-muc>/<slug>.
    if (c.subs.some((x) => x.slug === o.slug)) fail(where, "tên file", `trùng đường dẫn danh mục con /${category}/${o.slug}, hãy đổi tên file`);
    const model = str(where, o, "model")!;
    if (models.has(model)) fail(where, "model", `"${model}" trùng với ${models.get(model)}`);
    models.set(model, where);
    for (const k of ["isNew", "featured", "bestseller"]) if (o[k] !== undefined && typeof o[k] !== "boolean") fail(where, k, "phải là có/không");
    const specs = list(where, o, "specs").map((s) => {
      const r = (s ?? {}) as Record<string, unknown>;
      return { label: str(where, r, "label")!, value: str(where, r, "value")! };
    });
    return [{
      slug: o.slug,
      name: str(where, o, "name")!,
      model,
      category,
      sub,
      date: date(where, o),
      isNew: o.isNew as boolean | undefined,
      featured: o.featured as boolean | undefined,
      bestseller: o.bestseller as boolean | undefined,
      images: list(where, o, "images").map((v) => image(where, "images", v)),
      summary: str(where, o, "summary", false),
      description: str(where, o, "description", false),
      specs,
      relatedProducts: refs(where, o, "relatedProducts", slugs.products, "sản phẩm").map((s) => (s === o.slug ? fail(where, "relatedProducts", "không được chọn chính sản phẩm này") : s)),
      relatedPosts: refs(where, o, "relatedPosts", slugs.posts, "bài viết"),
    }];
  });

  const posts: Post[] = raw.posts.map((o) => {
    const where = `content/posts/${o.slug}.json`;
    const img = str(where, o, "image", false);
    return {
      slug: o.slug,
      title: str(where, o, "title")!,
      date: date(where, o),
      topic: str(where, o, "topic")!,
      excerpt: str(where, o, "excerpt")!,
      body: str(where, o, "body")!,
      image: img && image(where, "image", img),
      relatedProducts: refs(where, o, "relatedProducts", slugs.products, "sản phẩm"),
    };
  });

  // Bỏ liên kết tới sản phẩm đang bị ẩn.
  const shown = new Set(products.map((p) => p.slug));
  for (const x of [...products, ...posts]) x.relatedProducts = x.relatedProducts?.filter((s) => shown.has(s));

  return { products, posts };
}

/** Chính sách (content/policies.json): slug không dấu, không trùng, tiêu đề + nội dung không trống. */
export function checkPolicies(list: { slug?: string; title?: string; body?: string }[]) {
  if (!list.length) throw new Error("content/policies.json: cần ít nhất 1 chính sách");
  for (const p of list) {
    const where = `content/policies.json (${p.title || p.slug})`;
    if (!SLUG.test(p.slug ?? "")) throw new Error(`${where}: trường "slug" "${p.slug}" phải không dấu, dạng a-z0-9-`);
    if (list.filter((x) => x.slug === p.slug).length > 1) throw new Error(`${where}: trường "slug" "${p.slug}" bị trùng`);
    for (const k of ["title", "body"] as const) if (!p[k]?.trim()) throw new Error(`${where}: trường "${k}" đang để trống`);
  }
}
