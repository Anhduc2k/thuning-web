import { getContent } from "./products";

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  topic: string;
  excerpt: string;
  body: string; // Markdown
  image?: string; // ảnh bìa, "/uploads/..."
  relatedProducts: string[]; // slug sản phẩm
};

// Bài viết lấy từ content/posts/*.json (CMS /admin ghi), mới nhất trước.
export const getPosts = () => getContent().posts;

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const formatDate = (d: string) => d.split("-").reverse().join("/");
