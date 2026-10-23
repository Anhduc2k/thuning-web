"use client";

import { Icon } from "./icons";

// Menu nội dung do Header (server) dựng sẵn theo ngôn ngữ; bấm link bất kỳ trong menu thì đóng.
export function MobileNav({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group ml-auto xl:hidden lg:ml-0">
      <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-md border border-line [&::-webkit-details-marker]:hidden" aria-label={label}>
        <Icon name="menu" className="size-5 group-open:hidden" />
        <Icon name="close" className="hidden size-5 group-open:block" />
      </summary>
      <div
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-white px-4 py-5 md:top-25"
        onClick={(e) => (e.target as Element).closest("a") && e.currentTarget.closest("details")?.removeAttribute("open")}
      >
        {children}
      </div>
    </details>
  );
}
