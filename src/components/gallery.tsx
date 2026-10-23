"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-square border border-line bg-white">
        <Image src={images[i]} alt={alt} fill sizes="(min-width:1024px) 600px, 100vw" className="object-contain" priority />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {images.map((src, n) => (
          <button key={src} onClick={() => setI(n)} aria-label={`Ảnh ${n + 1}`} aria-current={n === i} className="relative aspect-square border border-line aria-[current=true]:border-ink">
            <Image src={src} alt="" fill sizes="120px" className="object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
