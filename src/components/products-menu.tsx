"use client";

import { useState } from "react";

/** Mục "Sản phẩm" trên menu chính (mở bằng hover / focus, CSS group-* ở components/layout.tsx).
 *  Bấm một link thì trang chuyển nhưng chuột vẫn nằm trên menu và link vẫn giữ focus → menu không đóng.
 *  Nên khi bấm: bỏ focus và tạm bỏ class `group` (tắt hover), đến khi chuột rời khỏi menu mới bật lại. */
export function ProductsMenu({ children }: { children: React.ReactNode }) {
  const [closed, setClosed] = useState(false);
  return (
    <li
      className={closed ? undefined : "group"}
      onClick={(e) => {
        if (!(e.target as Element).closest("a")) return;
        (document.activeElement as HTMLElement | null)?.blur();
        setClosed(true);
      }}
      onPointerLeave={() => setClosed(false)}
      // Dùng bàn phím: Tab vào lại menu thì cho mở lại.
      onFocus={() => setClosed(false)}
    >
      {children}
    </li>
  );
}
