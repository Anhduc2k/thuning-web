import categoriesData from "../../content/categories.json";

export type Category = {
  id?: string; // mã cố định do CMS tự sinh; sản phẩm liên kết qua mã này nên đổi tên/đường dẫn không làm đứt liên kết
  slug: string;
  name: string;
  icon: IconName;
  intro: string;
  highlights: string[];
  subs: { id?: string; slug: string; name: string; icon?: IconName }[];
};

export type IconName = "chip" | "conveyor" | "gear" | "cabinet" | "box" | "wave" | "robot" | "gauge" | "motor" | "car" | "bolt" | "bulb" | "snow" | "drop";

export type Product = {
  slug: string;
  name: string;
  category: string;
  sub?: string;
  model: string;
  isNew?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  date: string; // YYYY-MM-DD, dùng cho sắp xếp "Mới nhất"
  images?: string[]; // đường dẫn trong /public, ví dụ "/uploads/plc-s7-1200.jpg"; ảnh đầu = ảnh đại diện
  summary?: string; // mô tả ngắn dưới tên + meta description
  description?: string; // Markdown, mục "Mô tả sản phẩm"
  specs?: { label: string; value: string }[]; // thêm vào "Thông số chung"
  relatedProducts?: string[]; // slug, thay cho danh sách tự động
  relatedPosts?: string[]; // slug bài viết
};

// Danh mục sửa trong CMS (/admin → Danh mục). Import tĩnh (không dùng fs) vì file này chạy cả ở trình duyệt (mobile-nav).
export const categories = categoriesData as Category[];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
// Danh mục cũ có id = đường dẫn gốc, nên link cũ sau khi đổi đường dẫn vẫn tìm ra được để chuyển hướng.
export const getCategoryById = (id: string) => categories.find((c) => (c.id ?? c.slug) === id);

export function subName(category: Category, sub?: string) {
  return category.subs.find((s) => s.slug === sub)?.name;
}

export const SORTS = { "moi-nhat": "Mới nhất", "ten-a-z": "Tên A → Z" } as const;
export type Sort = keyof typeof SORTS;
