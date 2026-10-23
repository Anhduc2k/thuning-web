import { NextResponse, type NextRequest } from "next/server";

// vi không có tiền tố: /x hiển thị route /vi/x (rewrite). /vi/x → 308 về /x để không có URL trùng. /en/x đi thẳng.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return;
  const url = req.nextUrl.clone();
  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = pathname === "/" ? "/vi" : `/vi${pathname}`;
  return NextResponse.rewrite(url);
}

// Bỏ qua _next và mọi đường dẫn có dấu chấm (file trong public/, favicon.ico, robots.txt, sitemap.xml).
export const config = { matcher: ["/((?!_next/|.*\\..*).*)"] };
