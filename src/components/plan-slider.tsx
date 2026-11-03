"use client";

import { Children, useEffect, useState } from "react";
import { useSlide } from "@/components/hero-slides";
import { Icon } from "@/components/icons";

const DELAY = 5000; // ms mỗi slide

/** Trình chiếu các khu của mặt bằng xưởng (components/workshop-plan.tsx): tự chuyển sau 4s,
 *  dừng khi rê chuột / focus vào, không tự chạy khi người dùng bật "giảm chuyển động". */
export function PlanSlider({ children, labels }: { children: React.ReactNode; labels: string[] }) {
  const slides = Children.toArray(children);
  const [i, setI] = useSlide(); // dùng chung với chữ mở đầu trang chủ (HeroText)
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  // Phụ thuộc vào `i`: bấm chuyển tay thì đếm lại 4s từ đầu.
  useEffect(() => {
    if (paused || slides.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((i + 1) % slides.length), DELAY);
    return () => clearTimeout(t);
  }, [i, setI, paused, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Các khu trên mặt bằng xưởng"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Các slide chồng lên cùng một ô lưới nên khung không nhảy chiều cao khi đổi slide. */}
      <div className="grid">
        {slides.map((s, n) => (
          <div
            key={n}
            role="group"
            aria-roledescription="slide"
            aria-label={`${n + 1} / ${slides.length}: ${labels[n]}`}
            data-active={n === i || undefined}
            inert={n !== i}
            className="plan-slide col-start-1 row-start-1 opacity-0 transition-opacity duration-500 data-[active]:opacity-100"
          >
            {s}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" onClick={() => go(i - 1)} aria-label="Khu trước" className="grid size-9 place-items-center rounded-full border border-drafting/40 text-drafting hover:border-brand hover:text-brand">
            <Icon name="chevron" className="size-4 rotate-180" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                aria-label={labels[n]}
                aria-current={n === i}
                className="h-2 w-2 rounded-full bg-drafting/30 transition-all hover:bg-drafting/60 aria-[current=true]:w-6 aria-[current=true]:bg-brand"
              />
            ))}
          </div>
          <button type="button" onClick={() => go(i + 1)} aria-label="Khu tiếp theo" className="grid size-9 place-items-center rounded-full border border-drafting/40 text-drafting hover:border-brand hover:text-brand">
            <Icon name="chevron" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
