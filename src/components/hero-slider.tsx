"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Slide = { href: string; name: string; model: string; category: string; specs: string[] };

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const s = slides[i];
  return (
    <div
      className="relative border border-white/15 bg-ink/60 backdrop-blur-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Thiết bị tiêu biểu"
    >
      {/* Tem thông số thiết bị */}
      <div key={i} className="animate-[fade_.5s_ease] p-6 md:p-8" aria-live="polite">
        <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-4 text-sm">
          <span className="text-white/60">{s.category}</span>
          <span className="font-mono text-signal">{s.model}</span>
        </div>
        <h2 className="mt-5 text-2xl font-bold leading-snug text-white md:text-[1.75rem]">{s.name}</h2>
        <dl className="mt-5 grid gap-2.5 text-[15px]">
          {s.specs.map((sp) => (
            <div key={sp} className="flex gap-3 text-white/80">
              <dt className="sr-only">Đặc điểm</dt>
              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-signal" />
              <dd>{sp}</dd>
            </div>
          ))}
        </dl>
        <Link href={s.href} className="mt-7 inline-flex h-11 items-center rounded-md bg-white px-5 font-semibold text-ink hover:bg-signal">
          Xem chi tiết thiết bị
        </Link>
      </div>
      <div className="flex items-center justify-between border-t border-white/15 px-6 py-1.5 md:px-8">
        <div className="flex gap-2">
          {slides.map((sl, n) => (
            <button
              key={sl.href}
              onClick={() => setI(n)}
              aria-label={`Thiết bị ${n + 1}: ${sl.name}`}
              aria-current={n === i}
              className="relative h-9 w-6 before:absolute before:inset-x-0 before:top-1/2 before:h-1.5 before:-translate-y-1/2 before:bg-white/25 aria-[current=true]:w-10 aria-[current=true]:before:bg-signal"
            />
          ))}
        </div>
        <div className="flex gap-1 text-white">
          <button onClick={() => setI((i - 1 + slides.length) % slides.length)} className="grid size-9 place-items-center hover:bg-white/10" aria-label="Thiết bị trước">‹</button>
          <button onClick={() => setI((i + 1) % slides.length)} className="grid size-9 place-items-center hover:bg-white/10" aria-label="Thiết bị tiếp theo">›</button>
        </div>
      </div>
      <style>{`@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
