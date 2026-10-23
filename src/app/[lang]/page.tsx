import Link from "next/link";
import { ProductGrid } from "@/components/catalog";
import { HeroSlider } from "@/components/hero-slider";
import { Icon } from "@/components/icons";
import { categories, getCategory, getProduct, products, subName } from "@/lib/catalog";
import { formatDate, posts } from "@/lib/posts";
import { href, type L } from "@/lib/i18n";
import { getT } from "@/lib/locale";
import { pageMeta, site } from "@/lib/site";

export async function generateMetadata() {
  const { l, t } = await getT();
  const title = `${site.name} – ${t.tagline}`;
  return { ...pageMeta(l, title, t.index.metaDesc(site.legalName, t.tagline), "/"), title: { absolute: title } };
}

const heroSlides: { slug: string; specs: L<string[]> }[] = [
  {
    slug: "he-thong-thuc-hanh-robot-cong-nghiep-xe-tu-hanh-camera-3d-vision-ai",
    specs: {
      vi: ["Robot cộng tác 6 trục kết hợp xe tự hành", "Camera 3D nhận dạng và định vị vật thể", "Bài thực hành từ lập trình cơ bản đến ứng dụng AI"],
      en: ["6-axis collaborative robot on an autonomous mobile base", "3D camera for object recognition and positioning", "Exercises from basic programming to AI applications"],
    },
  },
  {
    slug: "bo-thuc-hanh-phan-loai-san-pham-theo-chieu-cao-mau-sac-vat-lieu",
    specs: {
      vi: ["Phân loại theo chiều cao, màu sắc và vật liệu", "Điều khiển bằng PLC, cảm biến công nghiệp", "Học viên lập trình và chỉnh sửa trọn quy trình"],
      en: ["Sorting by height, colour and material", "PLC control with industrial sensors", "Students program and modify the whole process"],
    },
  },
  {
    slug: "bo-thuc-hanh-plc-s7-1200",
    specs: {
      vi: ["PLC S7-1200 kèm module vào ra số và tương tự", "Kết nối HMI và phần mềm giám sát qua Ethernet", "Phù hợp nghề điện công nghiệp và tự động hóa"],
      en: ["S7-1200 PLC with digital and analog I/O modules", "Connects to HMI and monitoring software over Ethernet", "Suited to industrial electrical and automation courses"],
    },
  },
];

// Biểu tượng theo thứ tự dict.index.promises.
const promiseIcons = ["truck", "chat", "tag", "shield"] as const;

export default async function Home() {
  const { l, t } = await getT();
  const slides = heroSlides.map(({ slug, specs }) => {
    const p = getProduct(slug)!;
    const c = getCategory(p.category)!;
    return { href: `/${p.category}/${p.slug}`, name: p.name[l], model: p.model, category: subName(c, p.sub, l) ?? c.name[l], specs: specs[l] };
  });
  const newest = products.filter((p) => p.isNew).slice(0, 8);
  const featured = products.filter((p) => (p.featured || p.bestseller) && !p.isNew).slice(0, 8);
  const vocational = categories[0];

  return (
    <>
      <section className="bg-blueprint-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-white/60">{site.legalName}</p>
            <h1 className="mt-4 text-[2.25rem] font-extrabold leading-[1.1] tracking-tight md:text-[3.25rem]">
              {t.index.h1}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {t.index.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(l, "/thiet-bi-day-nghe")} className="inline-flex h-12 items-center rounded-md bg-brand px-6 font-semibold hover:bg-brand-dark">
                {t.index.cta}
              </Link>
              <a href={`tel:${site.phone}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-white/30 px-6 font-semibold hover:border-white">
                <Icon name="phone" className="size-4" />{t.call} {site.phoneDisplay}
              </a>
            </div>
          </div>
          <HeroSlider slides={slides} locale={l} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} href={href(l, `/${c.slug}`)} className="group flex items-center gap-3 border-line py-5 pr-4 max-md:odd:border-r max-md:[&:nth-child(n+3)]:border-t md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
              <Icon name={c.icon} className="size-8 shrink-0 text-brand" />
              <span>
                <span className="block font-semibold leading-tight group-hover:text-brand">{c.name[l]}</span>
                <span className="text-sm text-steel">{t.catalog.count(products.filter((p) => p.category === c.slug).length)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Section title={t.index.newTitle} href="/thiet-bi-day-nghe" more={t.index.newMore}>
        <ProductGrid items={newest} />
      </Section>

      <section className="bg-panel">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t.index.labTitle}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-steel">
              {t.index.labText}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 xl:grid-cols-5">
            {vocational.subs.map((s) => (
              <li key={s.slug}>
                <Link href={href(l, `/${vocational.slug}/${s.slug}`)} className="group flex h-full flex-col gap-4 bg-white p-5 hover:bg-ink hover:text-white">
                  <Icon name={s.icon ?? "chip"} className="size-9 stroke-[1.3] text-brand" />
                  <span>
                    <span className="block font-semibold leading-snug first-letter:uppercase">{s.name[l].replace("Phòng thực hành ", "")}</span>
                    <span className="text-sm text-steel group-hover:text-white/60">{t.devices(products.filter((p) => p.sub === s.slug).length)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section title={t.index.featuredTitle} href="/bang-tai-cong-nghiep" more={t.index.featuredMore}>
        <ProductGrid items={featured} />
      </Section>

      <section className="border-y border-line">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.index.promises.map((p, i) => (
            <li key={p.title} className="flex gap-4">
              <Icon name={promiseIcons[i]} className="size-8 shrink-0 text-brand" />
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-0.5 text-sm text-steel">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Section title={t.index.newsTitle} href="/tin-tuc" more={t.index.newsMore}>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <article key={p.slug}>
              <Link href={href(l, `/tin-tuc/${p.slug}`)} className="group block">
                <p className="text-sm text-steel"><time dateTime={p.date}>{formatDate(p.date, l)}</time> · {p.topic[l]}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand">{p.title[l]}</h3>
                <p className="mt-2 line-clamp-3 leading-relaxed text-steel">{p.excerpt[l]}</p>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t.index.videoTitle}</h2>
            <p className="mt-3 max-w-xl text-white/70">{t.index.videoText}</p>
          </div>
          <a href={site.youtube} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-semibold text-ink hover:bg-signal">
            {t.index.videoCta}
          </a>
        </div>
      </section>
    </>
  );
}

async function Section({ title, href: path, more, children }: { title: string; href: string; more: string; children: React.ReactNode }) {
  const { l } = await getT();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <Link href={href(l, path)} className="-my-2 py-2 text-sm font-semibold text-brand hover:underline">{more}</Link>
      </div>
      {children}
    </section>
  );
}

