"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

const DELAY = 5000; // ms mỗi slide

export type Banner = { src: string; href: string; alt: string };

export function BannerSlider({ banners }: { banners: Banner[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + banners.length) % banners.length);

  useEffect(() => {
    if (paused || banners.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((i + 1) % banners.length), DELAY);
    return () => clearTimeout(t);
  }, [i, paused, banners.length]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner"
      className="group/banner relative overflow-hidden border-b border-line bg-panel"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid aspect-[3/1]">
        {banners.map((b, n) => (
          <Link
            key={b.src}
            href={b.href}
            aria-label={b.alt}
            data-active={n === i || undefined}
            inert={n !== i}
            className="relative col-start-1 row-start-1 opacity-0 transition-opacity duration-700 data-[active]:opacity-100"
          >
            <Image src={b.src} alt={b.alt} fill priority={n === 0} sizes="100vw" className="object-cover" />
          </Link>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button type="button" onClick={() => go(i - 1)} aria-label="Banner trước" className="absolute left-2 top-1/2 sm:left-3 grid size-8 -translate-y-1/2 place-items-center sm:size-10 rounded-full bg-white/80 text-ink shadow transition hover:bg-white">
            <Icon name="chevron" className="size-4 rotate-180" />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Banner tiếp theo" className="absolute right-2 top-1/2 sm:right-3 grid size-8 -translate-y-1/2 place-items-center sm:size-10 rounded-full bg-white/80 text-ink shadow transition hover:bg-white">
            <Icon name="chevron" className="size-4" />
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2 sm:bottom-4">
            {banners.map((b, n) => (
              <button
                key={b.src}
                type="button"
                onClick={() => go(n)}
                aria-label={b.alt}
                aria-current={n === i}
                className="h-2 w-2 rounded-full bg-white/60 shadow transition-all hover:bg-white aria-[current=true]:w-6 aria-[current=true]:bg-brand"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
