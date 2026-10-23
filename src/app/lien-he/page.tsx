import type { Metadata } from "next";
import { PageHead } from "@/components/catalog";
import { Icon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Liên hệ", `Địa chỉ, hotline ${site.phoneDisplay}, email và bản đồ đến ${site.legalName}.`, "/lien-he");

export default function ContactPage() {
  const rows = [
    { icon: "pin", label: "Địa chỉ", value: site.address },
    { icon: "phone", label: "Hotline / Zalo", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "clock", label: "Giờ làm việc", value: "Thứ 2 – Thứ 7, 8:00 – 17:30" },
  ] as const;

  return (
    <>
      <PageHead title="Liên hệ" crumbs={[{ label: "Liên hệ" }]} />
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
            title={`Bản đồ: ${site.address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
            className="mt-8 aspect-[4/3] w-full border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <section className="self-start border border-line p-6 md:p-8">
          <h2 className="text-xl font-bold">Gửi tin nhắn</h2>
          <p className="mt-1 text-sm text-steel">Chúng tôi trả lời qua email trong ngày làm việc.</p>
          <div className="mt-5"><LeadForm kind="contact" submitLabel="Gửi tin nhắn" /></div>
        </section>
      </div>
    </>
  );
}
