import type { Metadata } from "next";
import { PageHead } from "@/components/catalog";
import { getT } from "@/lib/locale";
import { pageMeta, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { l, t } = await getT();
  return pageMeta(l, t.careers.title, t.careers.desc(site.legalName), "/tuyen-dung");
}

export default async function CareersPage() {
  const { t } = await getT();
  const [before, middle, after] = t.careers.applyText;
  return (
    <>
      <PageHead title={t.careers.title} crumbs={[{ label: t.careers.title }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{t.careers.lead}</p>
      </PageHead>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">{t.careers.teamsTitle}</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {t.careers.teams.map(([title, text]) => (
            <li key={title} className="border-t-2 border-ink pt-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-steel">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 bg-panel p-6 md:p-8">
          <h2 className="text-xl font-bold">{t.careers.apply}</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-steel">
            {before}<a href={`mailto:${site.email}?subject=${encodeURIComponent(t.careers.applySubject)}`} className="font-semibold text-brand hover:underline">{site.email}</a>{middle}<a href={`tel:${site.phone}`} className="font-semibold text-brand hover:underline">{site.phoneDisplay}</a>{after}
          </p>
        </div>
      </div>
    </>
  );
}
