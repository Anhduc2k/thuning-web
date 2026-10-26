import Link from "next/link";
import { Fragment } from "react";
import { categories } from "@/lib/catalog";
import { nav, policies, site } from "@/lib/site";
import { Icon } from "./icons";
import { MobileNav } from "./mobile-nav";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name}, về trang chủ`}>
      {/* Thay bằng logo thật: <Image src="/logo.svg" .../> */}
      <span className="grid size-10 place-items-center bg-brand text-lg font-extrabold leading-none text-white">Thư</span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>Thư Ning</span>
        <span className={`block whitespace-nowrap text-xs ${light ? "text-white/60" : "text-steel"}`}>Tự động hóa · Thiết bị dạy nghề</span>
      </span>
    </Link>
  );
}

function SearchForm({ id, className = "" }: { id: string; className?: string }) {
  return (
    <form action="/tim-kiem" role="search" className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">Tìm thiết bị</label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Tìm thiết bị, mã model…"
        className="h-9 w-full rounded-md border border-line bg-white pl-3 pr-9 text-sm placeholder:text-steel/70 focus:border-ink focus:outline-none"
      />
      <button className="absolute inset-y-0 right-0 grid w-9 place-items-center text-steel hover:text-ink" aria-label="Tìm">
        <Icon name="search" className="size-4" />
      </button>
    </form>
  );
}

export function Header() {
  const catHrefs = new Set(categories.map((c) => `/${c.slug}`));
  const pages = nav.filter((item) => item.href !== "/" && !catHrefs.has(item.href));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="hidden bg-ink text-[13px] text-white/75 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-6 px-4">
          <span className="flex items-center gap-1.5"><Icon name="pin" className="size-3.5" />{site.address}</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 font-semibold text-white hover:text-signal">
              <Icon name="phone" className="size-3.5" />Hotline / Zalo {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Logo />
        {/* Danh mục gom vào "Sản phẩm" để thêm bao nhiêu danh mục trong CMS menu vẫn vừa một hàng. */}
        <nav className="relative ml-auto hidden xl:block" aria-label="Menu chính">
          <ul className="flex items-center">
            {pages.map((item, i) => (
              <Fragment key={item.href}>
                <li>
                  <Link href={item.href} className="block whitespace-nowrap px-3 py-5 text-[14px] font-medium text-ink/80 hover:text-brand">{item.label}</Link>
                </li>
                {i === 0 && (
                  <li className="group">
                    <button type="button" aria-haspopup="true" className="flex items-center gap-1 whitespace-nowrap px-3 py-5 text-[14px] font-medium text-ink/80 group-focus-within:text-brand group-hover:text-brand">
                      Sản phẩm<Icon name="chevron" className="size-3 rotate-90 opacity-60" />
                    </button>
                    <div className="invisible absolute right-0 top-full w-[38rem] columns-2 gap-10 border border-line bg-white p-6 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {categories.map((c) => (
                        <div key={c.slug} className="mb-5 break-inside-avoid">
                          <Link href={`/${c.slug}`} className="flex items-center gap-2 font-semibold hover:text-brand">
                            <Icon name={c.icon} className="size-5 shrink-0 text-brand" />{c.name}
                          </Link>
                          {c.subs.length > 0 && (
                            <ul className="mt-2 space-y-0.5 border-l border-line pl-7">
                              {c.subs.map((s) => (
                                <li key={s.slug}>
                                  <Link href={`/${c.slug}/${s.slug}`} className="block py-1 text-sm text-steel first-letter:uppercase hover:text-brand">{s.name.replace(/^Phòng thực hành /, "")}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </nav>
        {/* 1024–1279px: menu chính ẩn nên còn chỗ cho ô tìm kiếm. Từ 1280px menu chiếm hết hàng → nút kính lúp mở ô tìm kiếm thả xuống. */}
        <SearchForm id="q-header" className="hidden w-56 shrink-0 lg:block xl:hidden" />
        <details className="group/search relative hidden shrink-0 xl:block">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-md text-ink/70 hover:bg-panel hover:text-brand group-open/search:bg-panel [&::-webkit-details-marker]:hidden" aria-label="Tìm thiết bị">
            <Icon name="search" className="size-5 group-open/search:hidden" />
            <Icon name="close" className="hidden size-5 group-open/search:block" />
          </summary>
          <div className="absolute right-0 top-full mt-3 w-96 border border-line bg-white p-3 shadow-lg">
            <SearchForm id="q-desktop" />
          </div>
        </details>
        <MobileNav>
          <SearchForm id="q-mobile" className="mb-4" />
        </MobileNav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-sm text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed">{site.legalName}. {site.tagline}.</p>
          <ul className="mt-5 space-y-2.5">
            <li className="flex gap-2"><Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brand" />{site.address}</li>
            <li><a href={`tel:${site.phone}`} className="flex gap-2 hover:text-white"><Icon name="phone" className="size-4 text-brand" />{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-2 hover:text-white"><Icon name="mail" className="size-4 text-brand" />{site.email}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Sản phẩm</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/${c.slug}`} className="hover:text-white">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Hướng dẫn</h2>
          <ul className="mt-4 space-y-2">
            {Object.entries(policies).map(([slug, p]) => (
              <li key={slug}><Link href={`/chinh-sach/${slug}`} className="hover:text-white">{p.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Thanh toán</h2>
          <dl className="mt-4 space-y-1.5">
            <div><dt className="inline">Chủ tài khoản: </dt><dd className="inline text-white">{site.bank.owner}</dd></div>
            <div><dt className="inline">Ngân hàng: </dt><dd className="inline text-white">{site.bank.name}</dd></div>
            <div><dt className="inline">Số tài khoản: </dt><dd className="inline font-mono text-white">{site.bank.account}</dd></div>
          </dl>
          <h2 className="mt-6 font-semibold text-white">Kết nối</h2>
          <div className="mt-3 flex gap-4">
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <a href={site.youtube} target="_blank" rel="noopener" className="hover:text-white">YouTube</a>
            <a href={site.zalo} target="_blank" rel="noopener" className="hover:text-white">Zalo</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50">© {site.legalName}. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <a href={site.zalo} target="_blank" rel="noopener" className="grid size-12 place-items-center rounded-full bg-[#0068ff] text-xs font-bold text-white shadow-lg hover:scale-105">
        Zalo
      </a>
      <a href={`tel:${site.phone}`} className="flex size-12 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white shadow-lg hover:bg-brand-dark sm:w-auto sm:pl-4 sm:pr-5">
        <Icon name="phone" className="size-5" />
        <span className="hidden sm:inline">{site.phoneDisplay}</span>
        <span className="sr-only sm:hidden">Gọi ngay</span>
      </a>
    </div>
  );
}
