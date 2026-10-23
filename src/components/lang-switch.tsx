"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { href, type Locale } from "@/lib/i18n";

type P = { to: Locale; label: string; className?: string };

// Bỏ tiền tố /vi|/en: HTML prerender (/vi/x) và trình duyệt (/x) cho cùng href → không lệch hydrate.
// Query string (?page=, ?q=) gán lúc bấm để không phải đọc searchParams khi render.
// Gán (không nối) nên bấm nhiều lần không bị lặp; onPointerDown để chuột giữa / mở tab mới cũng giữ query.
const keepQuery = (e: React.SyntheticEvent<HTMLAnchorElement>) => { e.currentTarget.search = location.search; };

function A({ to, label, className, path }: P & { path: string }) {
  return (
    <a href={href(to, path)} hrefLang={to} lang={to} className={className} onClick={keepQuery} onPointerDown={keepQuery}>
      {label}
    </a>
  );
}

function Current(p: P) {
  return <A {...p} path={usePathname().replace(/^\/(vi|en)(?=\/|$)/, "") || "/"} />;
}

// Route có params chưa biết lúc build có thể làm usePathname treo → fallback trỏ trang chủ ngôn ngữ kia.
export const LangSwitch = (p: P) => <Suspense fallback={<A {...p} path="/" />}><Current {...p} /></Suspense>;
