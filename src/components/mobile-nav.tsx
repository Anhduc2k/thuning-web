"use client";

import Link from "next/link";
import { categories } from "@/lib/catalog";
import { nav } from "@/lib/site";
import { Icon } from "./icons";

const close = (e: React.MouseEvent) => e.currentTarget.closest("details")?.removeAttribute("open");

export function MobileNav({ children }: { children: React.ReactNode }) {
  return (
    <details className="group ml-auto xl:hidden lg:ml-0">
      <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-md border border-line [&::-webkit-details-marker]:hidden" aria-label="Mở menu">
        <Icon name="menu" className="size-5 group-open:hidden" />
        <Icon name="close" className="hidden size-5 group-open:block" />
      </summary>
      <div className="drop-in fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-white px-4 py-5 md:top-25">
        {children}
        <ul className="divide-y divide-line">
          {nav.map((item) => {
            const cat = item.category && categories.find((c) => c.slug === item.category);
            return (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block py-3 font-medium">{item.label}</Link>
                {cat && (
                  <ul className="mb-3 grid gap-1 border-l-2 border-line pl-4 sm:grid-cols-2">
                    {cat.subs.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${cat.slug}/${s.slug}`} onClick={close} className="block py-2.5 text-sm text-steel">{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
