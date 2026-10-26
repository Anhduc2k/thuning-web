import { NextResponse, type NextRequest } from "next/server";
import data from "../content/categories.json";

type Cat = { id?: string; slug: string; subs?: { id?: string; slug: string }[] };
const categories = data as Cat[];

// Đổi đường dẫn danh mục / danh mục con trong CMS → link cũ chuyển hướng 308 sang link mới.
// Danh mục, danh mục con có sẵn dùng id = đường dẫn gốc, nên link cũ luôn tra ra được.
export function proxy(req: NextRequest) {
  const [, first, second, ...rest] = req.nextUrl.pathname.split("/");
  if (!first) return;
  const c = categories.find((x) => x.slug === first) ?? categories.find((x) => x.id === first);
  if (!c) return;
  const subs = c.subs ?? [];
  const s = second && !subs.some((x) => x.slug === second) ? subs.find((x) => x.id === second) : undefined;
  if (c.slug === first && !s) return;
  const url = req.nextUrl.clone();
  url.pathname = "/" + [c.slug, s?.slug ?? second, ...rest].filter(Boolean).join("/");
  return NextResponse.redirect(url, 308);
}

// Bỏ qua file tĩnh, ảnh, /_next, /admin.
export const config = { matcher: ["/((?!_next/|admin|uploads/|.*\\..*).*)"] };
