import Link from "next/link";
import { categories } from "@/lib/catalog";
import { dict, href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { nav, policies, site } from "@/lib/site";
import { Icon } from "./icons";
import { LangSwitch } from "./lang-switch";
import { MobileNav } from "./mobile-nav";

export async function Logo({ light = false }: { light?: boolean }) {
  const { l, t } = await getT();
  return (
    <Link href={href(l, "/")} className="flex items-center gap-2.5" aria-label={`${site.name}, ${t.homeLink}`}>
      {/* Thay bằng logo thật: <Image src="/logo.svg" .../> */}
      <span className="grid size-10 place-items-center bg-brand text-lg font-extrabold leading-none text-white">Thư</span>
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>Thư Ning</span>
        <span className={`block whitespace-nowrap text-xs ${light ? "text-white/60" : "text-steel"}`}>{t.logoSub}</span>
      </span>
    </Link>
  );
}

async function SearchForm({ className = "" }: { className?: string }) {
  const { l, t } = await getT();
  return (
    <form action={href(l, "/tim-kiem")} role="search" className={`relative ${className}`}>
      <label htmlFor="q" className="sr-only">{t.search.label}</label>
      <input
        id="q"
        name="q"
        type="search"
        placeholder={t.search.placeholder}
        className="h-9 w-full rounded-md border border-line bg-white pl-3 pr-9 text-sm placeholder:text-steel/70 focus:border-ink focus:outline-none"
      />
      <button className="absolute inset-y-0 right-0 grid w-9 place-items-center text-steel hover:text-ink" aria-label={t.search.submit}>
        <Icon name="search" className="size-4" />
      </button>
    </form>
  );
}

export async function Header() {
  const { l, t } = await getT();
  const other = l === "vi" ? "en" : "vi";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="hidden bg-ink text-[13px] text-white/75 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-6 px-4">
          <span className="flex items-center gap-1.5"><Icon name="pin" className="size-3.5" />{site.address}</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 font-semibold text-white hover:text-signal">
              <Icon name="phone" className="size-3.5" />{t.contact.hotline} {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            <LangSwitch to={other} label={dict[other].langName} className="font-semibold text-white hover:text-signal" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Logo />
        <nav className="ml-auto hidden xl:block" aria-label={t.mainMenu}>
          <ul className="flex items-center">
            {nav.filter((item) => item.href !== "/").map((item) => {
              const cat = item.category && categories.find((c) => c.slug === item.category);
              return (
                <li key={item.href} className="group relative">
                  <Link href={href(l, item.href)} className="flex items-center gap-1 whitespace-nowrap px-2.5 py-5 text-[14px] font-medium text-ink/80 hover:text-brand">
                    {item.label[l]}
                    {cat && <Icon name="chevron" className="size-3 rotate-90 opacity-60" />}
                  </Link>
                  {cat && (
                    <ul className="invisible absolute left-0 top-full w-72 border border-line bg-white py-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {cat.subs.map((s) => (
                        <li key={s.slug}>
                          <Link href={href(l, `/${cat.slug}/${s.slug}`)} className="block px-4 py-2 text-sm text-ink/80 hover:bg-panel hover:text-brand">
                            {s.name[l]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <SearchForm className="hidden w-56 lg:block xl:hidden 2xl:block" />
        <MobileNav label={t.openMenu}>
          <SearchForm className="mb-4" />
          <LangSwitch to={other} label={dict[other].langName} className="mb-2 inline-block font-semibold text-brand" />
          <ul className="divide-y divide-line">
            {nav.map((item) => {
              const cat = item.category && categories.find((c) => c.slug === item.category);
              return (
                <li key={item.href}>
                  <Link href={href(l, item.href)} className="block py-3 font-medium">{item.label[l]}</Link>
                  {cat && (
                    <ul className="mb-3 grid gap-1 border-l-2 border-line pl-4 sm:grid-cols-2">
                      {cat.subs.map((s) => (
                        <li key={s.slug}>
                          <Link href={href(l, `/${cat.slug}/${s.slug}`)} className="block py-2.5 text-sm text-steel">{s.name[l]}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </MobileNav>
      </div>
    </header>
  );
}

export async function Footer() {
  const { l, t } = await getT();
  return (
    <footer className="mt-20 bg-ink text-sm text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed">{site.legalName}. {t.tagline}.</p>
          <ul className="mt-5 space-y-2.5">
            <li className="flex gap-2"><Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brand" />{site.address}</li>
            <li><a href={`tel:${site.phone}`} className="flex gap-2 hover:text-white"><Icon name="phone" className="size-4 text-brand" />{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-2 hover:text-white"><Icon name="mail" className="size-4 text-brand" />{site.email}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">{t.footer.products}</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}><Link href={href(l, `/${c.slug}`)} className="hover:text-white">{c.name[l]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">{t.footer.guides}</h2>
          <ul className="mt-4 space-y-2">
            {Object.entries(policies).map(([slug, p]) => (
              <li key={slug}><Link href={href(l, `/chinh-sach/${slug}`)} className="hover:text-white">{p.title[l]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">{t.footer.payment}</h2>
          <dl className="mt-4 space-y-1.5">
            <div><dt className="inline">{t.footer.owner}</dt><dd className="inline text-white">{site.bank.owner}</dd></div>
            <div><dt className="inline">{t.footer.bank}</dt><dd className="inline text-white">{site.bank.name}</dd></div>
            <div><dt className="inline">{t.footer.account}</dt><dd className="inline font-mono text-white">{site.bank.account}</dd></div>
          </dl>
          <h2 className="mt-6 font-semibold text-white">{t.footer.connect}</h2>
          <div className="mt-3 flex gap-4">
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-white">Facebook</a>
            <a href={site.youtube} target="_blank" rel="noopener" className="hover:text-white">YouTube</a>
            <a href={site.zalo} target="_blank" rel="noopener" className="hover:text-white">Zalo</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50">© {site.legalName}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}

export async function FloatingContact() {
  const { t } = await getT();
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <a href={site.zalo} target="_blank" rel="noopener" className="grid size-12 place-items-center rounded-full bg-[#0068ff] text-xs font-bold text-white shadow-lg hover:scale-105">
        Zalo
      </a>
      <a href={`tel:${site.phone}`} className="flex size-12 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white shadow-lg hover:bg-brand-dark sm:w-auto sm:pl-4 sm:pr-5">
        <Icon name="phone" className="size-5" />
        <span className="hidden sm:inline">{site.phoneDisplay}</span>
        <span className="sr-only sm:hidden">{t.callNow}</span>
      </a>
    </div>
  );
}
