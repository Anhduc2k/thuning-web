import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/catalog";
import { Icon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { href } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { pageMeta, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { l, t } = await getT();
  return pageMeta(l, t.about.title, t.about.desc(site.legalName, t.tagline), "/gioi-thieu");
}

export default async function AboutPage() {
  const { l, t } = await getT();
  return (
    <>
      <PageHead title={t.about.heading(site.name)} crumbs={[{ label: t.about.title }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{site.legalName}. {t.tagline}.</p>
      </PageHead>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[1fr_380px]">
        <div className="prose-vi text-[17px]">
          {t.about.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <ul className="divide-y divide-line self-start border border-line">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={href(l, `/${c.slug}`)} className="flex items-center gap-3 px-5 py-4 font-medium hover:text-brand">
                <Icon name={c.icon} className="size-6 text-brand" />{c.name[l]}
                <Icon name="chevron" className="ml-auto size-4 text-steel" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t.about.process}</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.steps.map(([title, text], i) => (
              <li key={title} className="border-t-2 border-ink pt-4">
                <span className="font-mono text-sm text-brand">0{i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
