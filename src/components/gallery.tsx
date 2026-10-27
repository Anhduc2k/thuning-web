"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";

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
export function Gallery({ images, alt, slug }: { images: string[]; alt: string; slug: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <ViewTransition name={`product-${slug}`} share="morph" enter="page-fade" exit="page-fade" default="none">
        <Zoom className="relative aspect-square overflow-hidden border border-line bg-white">
          {/* key: đổi ảnh thì ảnh mới hiện dần thay vì nháy. */}
          <Image key={images[i]} src={images[i]} alt={alt} fill sizes="(min-width:1024px) 1200px, 100vw" className="fade-in object-contain" priority />
        </Zoom>
      </ViewTransition>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {images.map((src, n) => (
          <button key={src} onClick={() => setI(n)} aria-label={`Ảnh ${n + 1}`} aria-current={n === i} className="relative aspect-square border border-line transition-colors hover:border-steel aria-[current=true]:border-ink">
            <Image src={src} alt="" fill sizes="120px" className="object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
