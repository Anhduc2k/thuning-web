import Link from "next/link";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { site } from "@/lib/site";

export default async function NotFound() {
  const { l, t } = await getT();
  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{t.notFound.title}</h1>
      <p className="mt-3 max-w-xl text-steel">{t.notFound.text(site.phoneDisplay)}</p>
      <Link href={href(l, "/")} className="mt-8 inline-flex h-11 items-center rounded-md bg-brand px-6 font-semibold text-white hover:bg-brand-dark">{t.notFound.back}</Link>
    </div>
  );
}
