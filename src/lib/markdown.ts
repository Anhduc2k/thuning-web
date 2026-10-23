import { Marked } from "marked";

// Markdown do người sửa nội dung nhập (CMS). Trang công khai cùng origin với /admin nên không cho HTML thô
// và link lạ (javascript:…) chạy: HTML thô hiện thành chữ, link/ảnh chỉ nhận http(s), mailto, tel, /…, #…
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/|#)/i;
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const md = new Marked({
  renderer: { html: ({ text }) => escape(text) },
  walkTokens: (t) => {
    if ((t.type === "link" || t.type === "image") && !SAFE_URL.test(t.href.trim())) t.href = "#";
  },
});

export const renderMarkdown = (text: string) => md.parse(text, { async: false });
