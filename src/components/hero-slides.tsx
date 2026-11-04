"use client";

import Link from "next/link";
import { createContext, Fragment, useContext, useState } from "react";

// Slide đang hiện của mặt bằng xưởng, dùng chung giữa PlanSlider và chữ mở đầu trang chủ.
const SlideContext = createContext<[number, (n: number) => void] | null>(null);

export function HeroSlides({ children }: { children: React.ReactNode }) {
  const state = useState(0);
  return <SlideContext.Provider value={state}>{children}</SlideContext.Provider>;
}

/** Slide hiện tại; không nằm trong HeroSlides thì tự giữ state riêng. */
export function useSlide() {
  const local = useState(0);
  return useContext(SlideContext) ?? local;
}

type Text = { title: string; text: string };

const titleCls = "text-[2.1rem] font-extrabold leading-[1.12] tracking-tight md:text-[3rem]";
const textCls = "mt-5 max-w-xl text-lg leading-relaxed";

/** Tiêu đề + mô tả đầu trang chủ, đổi theo danh mục của slide đang hiện (CMS: Danh mục → Tiêu đề / Mô tả trang chủ).
 *  Đổi `key` theo slide để React gắn lại phần tử, chạy lại hiệu ứng .hero-swap (globals.css). */
export function HeroText({ slides, fallback }: { slides: Partial<Text>[]; fallback: Text }) {
  const [i] = useSlide();
  const pick = (s?: Partial<Text>) => ({ title: s?.title || fallback.title, text: s?.text || fallback.text });
  const cur = pick(slides[i]);

  // Bản ẩn của từng slide (tiêu đề + mô tả liền nhau) chồng cùng ô lưới: khung cao bằng slide dài nhất nên nút bên dưới không nhảy,
  // còn mô tả luôn nằm sát ngay dưới tiêu đề của chính nó.
  return (
    <div className="grid">
      {[fallback, ...slides].map(pick).map((s, n) => (
        <div key={`ghost-${n}`} aria-hidden className="invisible col-start-1 row-start-1">
          <div className={titleCls}>{s.title}</div>
          <div className={textCls}>{s.text}</div>
        </div>
      ))}
      <div key={i} className="col-start-1 row-start-1">
        {/* Tiêu đề hiện lần lượt từng chữ, mô tả hiện sau khi tiêu đề gần xong. */}
        <h1 className={`text-ink ${titleCls}`}>
          {cur.title.split(" ").map((w, n) => (
            <Fragment key={n}>
              <span className="hero-word" style={{ "--d": `${n * 0.05}s` } as React.CSSProperties}>{w}</span>{" "}
            </Fragment>
          ))}
        </h1>
        <p className={`hero-swap text-steel ${textCls}`} style={{ "--d": `${Math.min(cur.title.split(" ").length * 0.05, 0.6)}s` } as React.CSSProperties}>
          {cur.text}
        </p>
      </div>
    </div>
  );
}

/** Nút "Xem danh mục" đầu trang chủ: dẫn tới danh mục của slide đang hiện. */
export function HeroLink({ hrefs, className, children }: { hrefs: string[]; className?: string; children: React.ReactNode }) {
  const [i] = useSlide();
  return <Link href={hrefs[i] ?? hrefs[0] ?? "/"} className={className}>{children}</Link>;
}
