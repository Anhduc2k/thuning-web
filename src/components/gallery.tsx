"use client";

import Image from "next/image";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { Icon } from "./icons";

/** Kính lúp: rê chuột lên ảnh thì phóng to đúng chỗ con trỏ (CSS .zoom[data-zoom] ở globals.css).
 *  Chỉ bật khi con trỏ nằm trên phần ảnh thật: ảnh để object-contain nên khung có dải trắng 2 bên / trên dưới. */
export function Zoom({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const img = el.querySelector("img");
    // Đo khung chứa ảnh (ảnh fill kín khung), không đo chính ảnh: lúc đã phóng to, khung của ảnh to gấp đôi.
    const box = ((img?.parentElement ?? el.firstElementChild ?? el) as Element).getBoundingClientRect();
    let { left, top, width, height } = box;
    if (img?.naturalWidth) {
      const s = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      left += (width - img.naturalWidth * s) / 2;
      top += (height - img.naturalHeight * s) / 2;
      width = img.naturalWidth * s;
      height = img.naturalHeight * s;
    }
    const inside = e.pointerType === "mouse" && e.clientX >= left && e.clientX <= left + width && e.clientY >= top && e.clientY <= top + height;
    el.toggleAttribute("data-zoom", inside);
    if (inside) {
      el.style.setProperty("--zx", `${((e.clientX - box.left) / box.width) * 100}%`);
      el.style.setProperty("--zy", `${((e.clientY - box.top) / box.height) * 100}%`);
    }
  };
  return <div className={`zoom ${className}`} onPointerMove={move} onPointerLeave={(e) => e.currentTarget.removeAttribute("data-zoom")}>{children}</div>;
}

// `slug`: cùng tên với ProductMorph ở thẻ sản phẩm (components/catalog.tsx) để ảnh "bay" từ lưới sang đây.
// Nhiều ảnh: chạy slide (5 giây/ảnh, dừng khi rê chuột/chạm/bấm, tắt nếu máy bật giảm chuyển động), có nút ‹ ›, vuốt và phím mũi tên.
export function Gallery({ images, alt, slug }: { images: string[]; alt: string; slug: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const many = images.length > 1;
  const go = (d: number) => setI((n) => (n + d + images.length) % images.length);

  useEffect(() => {
    if (!many || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [many, paused, images.length]);

  const pick = (n: number) => { setPaused(true); setI(n); };
  const thumbArrow = "grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:text-brand";
  const row = useRef<HTMLDivElement>(null);
  // Nút ‹ › cạnh hàng ảnh nhỏ chỉ hiện khi hàng ảnh dài hơn khung (đo lại khi đổi cỡ màn hình).
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const r = row.current;
    if (!r) return;
    const check = () => setOverflow(r.scrollWidth > r.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(r);
    return () => ro.disconnect();
  }, [images.length]);

  // Ảnh nhỏ đang chọn luôn nằm trong vùng nhìn thấy của hàng ảnh (cuộn ngang trong hàng, không cuộn cả trang).
  useEffect(() => {
    const r = row.current;
    const el = r?.children[i] as HTMLElement | undefined;
    if (!r || !el) return;
    if (el.offsetLeft < r.scrollLeft) r.scrollLeft = el.offsetLeft - 4;
    else if (el.offsetLeft + el.offsetWidth > r.scrollLeft + r.clientWidth) r.scrollLeft = el.offsetLeft + el.offsetWidth - r.clientWidth + 4;
  }, [i]);
  const arrow = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg ring-1 ring-black/5 backdrop-blur transition duration-300 hover:scale-105 hover:bg-white";

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") { setPaused(true); go(-1); }
        if (e.key === "ArrowRight") { setPaused(true); go(1); }
      }}
    >
      <div
        className="group relative"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => {
          if (touchX.current === null || !many) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <ViewTransition name={`product-${slug}`} share="morph" enter="page-fade" exit="page-fade" default="none">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            {/* Dải ảnh trượt ngang: ảnh i nằm giữa khung. */}
            <div className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none" style={{ transform: `translateX(-${i * 100}%)` }}>
              {images.map((src, n) => (
                <Zoom key={src} className="relative aspect-square w-full shrink-0 overflow-hidden">
                  <Image src={src} alt={n === i ? alt : ""} aria-hidden={n !== i} fill sizes="(min-width:1024px) 640px, 100vw" className="object-contain" priority={n === 0} />
                </Zoom>
              ))}
            </div>
          </div>
        </ViewTransition>
        {many && (
          <>
            <button onClick={() => { setPaused(true); go(-1); }} aria-label="Ảnh trước" className={`${arrow} left-3`}>
              <Icon name="chevron" className="size-5 rotate-180" />
            </button>
            <button onClick={() => { setPaused(true); go(1); }} aria-label="Ảnh sau" className={`${arrow} right-3`}>
              <Icon name="chevron" className="size-5" />
            </button>
            {/* Chấm vị trí; chấm hiện tại kéo dài ra. */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {images.map((src, n) => (
                <button key={src} onClick={() => pick(n)} aria-label={`Chuyển tới ảnh ${n + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-6 bg-brand" : "w-1.5 bg-ink/25 hover:bg-ink/50"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {many && (
        <div className="mt-3 flex items-center gap-2">
          {overflow && (
            <button onClick={() => { setPaused(true); go(-1); }} aria-label="Ảnh trước" className={thumbArrow}>
              <Icon name="chevron" className="size-4 rotate-180" />
            </button>
          )}
          <div ref={row} className="relative flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth p-1 [scrollbar-width:none]">
            {/* p-1: chừa chỗ cho viền chọn, không thì overflow-x-auto cắt mất viền. */}
            {images.map((src, n) => (
              <button
                key={src}
                onClick={() => pick(n)}
                aria-label={`Ảnh ${n + 1}`}
                aria-current={n === i}
                className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md aria-[current=true]:border-transparent aria-[current=true]:ring-2 aria-[current=true]:ring-brand aria-[current=true]:ring-offset-2 sm:w-24"
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
          {overflow && (
            <button onClick={() => { setPaused(true); go(1); }} aria-label="Ảnh sau" className={thumbArrow}>
              <Icon name="chevron" className="size-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
