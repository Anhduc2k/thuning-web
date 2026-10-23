import type { Metadata } from "next";
import { PageHead } from "@/components/catalog";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { getT } from "@/lib/locale";
import { pageMeta, site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { l, t } = await getT();
  return pageMeta(l, t.contact.title, t.contact.desc(site.phoneDisplay, site.legalName), "/lien-he");
}

export default async function ContactPage() {
  const { l, t } = await getT();
  const rows = [
    { icon: "pin", label: t.contact.address, value: site.address },
    { icon: "phone", label: t.contact.hotline, value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: "mail", label: t.contact.email, value: site.email, href: `mailto:${site.email}` },
    { icon: "clock", label: t.contact.hours, value: t.contact.hoursValue },
  ] as const;

  return (
    <>
      <PageHead title={t.contact.title} crumbs={[{ label: t.contact.title }]} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">{site.legalName}</h2>
          <dl className="mt-6 space-y-5">
            {rows.map((r) => (
              <div key={r.label} className="flex gap-4">
                <Icon name={r.icon} className="size-6 shrink-0 text-brand" />
                <div>
                  <dt className="text-sm text-steel">{r.label}</dt>
                  <dd className="font-medium">{"href" in r ? <a href={r.href} className="hover:text-brand">{r.value}</a> : r.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <iframe
            title={`${t.contact.map}: ${site.address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
            className="mt-8 aspect-[4/3] w-full border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <section className="self-start border border-line p-6 md:p-8">
          <h2 className="text-xl font-bold">{t.contact.formTitle}</h2>
          <p className="mt-1 text-sm text-steel">{t.contact.formNote}</p>
          <div className="mt-5"><LeadForm kind="contact" submitLabel={t.contact.submit} locale={l} /></div>
        </section>
      </div>
    </>
  );
}
