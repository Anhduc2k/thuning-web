import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/catalog";
import { getT } from "@/lib/locale";
import { pageMeta, policies } from "@/lib/site";

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/[lang]/chinh-sach/[slug]">): Promise<Metadata> {
  const { l } = await getT();
  const slug = (await params).slug;
  const p = policies[slug];
  return p ? pageMeta(l, p.title[l], p.body[l][0].slice(0, 160), `/chinh-sach/${slug}`) : {};
}

export default async function PolicyPage({ params }: PageProps<"/[lang]/chinh-sach/[slug]">) {
  const { l } = await getT();
  const p = policies[(await params).slug];
  if (!p) notFound();
  return (
    <>
      <PageHead title={p.title[l]} crumbs={[{ label: p.title[l] }]} />
      <div className="prose-vi mx-auto max-w-7xl px-4 py-12 text-[17px]">
        {p.body[l].map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </>
  );
}
