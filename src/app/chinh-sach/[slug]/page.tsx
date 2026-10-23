import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/catalog";
import { pageMeta, policies } from "@/lib/site";

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/chinh-sach/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const p = policies[slug];
  return p ? pageMeta(p.title, p.body[0].slice(0, 160), `/chinh-sach/${slug}`) : {};
}

export default async function PolicyPage({ params }: PageProps<"/chinh-sach/[slug]">) {
  const p = policies[(await params).slug];
  if (!p) notFound();
  return (
    <>
      <PageHead title={p.title} crumbs={[{ label: p.title }]} />
      <div className="prose-vi mx-auto max-w-7xl px-4 py-12 text-[17px]">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </>
  );
}
