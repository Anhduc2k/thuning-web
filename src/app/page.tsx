import Image from "next/image";
import Link from "next/link";
import { ProductGrid, Sidebar } from "@/components/catalog";
import { WorkshopPlan } from "@/components/workshop-plan";
import { HeroLink, HeroSlides, HeroText } from "@/components/hero-slides";
import { Icon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { getProducts } from "@/lib/products";
import { formatDate, getPosts } from "@/lib/posts";
import { pageMeta, site } from "@/lib/site";

export const metadata = {
  ...pageMeta(`${site.name} – ${site.tagline}`, `${site.legalName}: ${site.tagline}. Thiết kế, chế tạo tại xưởng, lắp đặt và giao hàng toàn quốc.`, "/"),
  title: { absolute: `${site.name} – ${site.tagline}` },
};

const promises = [
  { icon: "truck", title: "Giao hàng toàn quốc", text: "Đóng kiện, vận chuyển và lắp đặt tại chỗ" },
  { icon: "chat", title: "Tư vấn cấu hình miễn phí", text: "Theo dây chuyền thực tế" },
  { icon: "tag", title: "Giá trực tiếp từ xưởng", text: "Tự thiết kế, tự sản xuất, không qua trung gian" },
  { icon: "shield", title: "Bảo hành dài hạn", text: "Linh kiện công nghiệp, có sẵn vật tư thay thế" },
] as const;

export default function Home() {
  const newest = getProducts().filter((p) => p.isNew).slice(0, 9);
  const vocational = categories[0];

  return (
    <>
      <HeroSlides>
      <section className="bg-drafting border-b border-drafting/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14">
          {/* Mở đầu: chữ hiện lần lượt cùng lúc mặt bằng xưởng được vẽ (globals.css: .rise, .plan). */}
          <div>
            <div className="rise">
              <HeroText
                slides={categories.map((c) => ({ title: c.heroTitle, text: c.heroText }))}
                fallback={{
                  title: "Giải pháp Robot do các kỹ sư Việt Nam thiết kế và lập trình",
                  text: "Cung cấp giải pháp Robot Bốc xếp - Dỡ pallet được sản xuất trực tiếp tại Việt Nam, lắp đặt và bàn giao toàn quốc",
                }}
              />
            </div>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": ".24s" } as React.CSSProperties}>
              {/* Dẫn tới danh mục của slide đang hiện. */}
              <HeroLink hrefs={categories.map((c) => `/${c.slug}`)} className="inline-flex h-12 items-center rounded-md bg-brand px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg active:translate-y-0">
                Xem danh mục
              </HeroLink>
              <a href={`tel:${site.phone}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/25 bg-white/60 px-6 font-semibold text-ink hover:border-ink">
                <Icon name="phone" className="size-4" />Gọi {site.phoneDisplay}
              </a>
            </div>
          </div>
          <WorkshopPlan />
        </div>
      </section>
      </HeroSlides>

      <Section title="Sản phẩm mới" href="/thiet-bi-day-nghe" more="Xem tất cả sản phẩm mới" aside={<Sidebar />}>
        <ProductGrid items={newest} cols={3} />
      </Section>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-16">
          {/* Tiêu đề + mô tả lấy từ danh mục đầu tiên (CMS), cùng kiểu vạch đen với các mục khác. */}
          <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Giải pháp robot</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{vocational.name}</h2>
              <p className="mt-3 leading-relaxed text-steel">{vocational.intro}</p>
            </div>
            <Link href={`/${vocational.slug}`} className="group -my-2 inline-flex items-center gap-1 py-2 text-sm font-semibold text-brand hover:underline">
              Xem tất cả giải pháp<Icon name="chevron" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
            {vocational.subs.map((s, i) => {
              const items = getProducts().filter((p) => p.sub === s.slug);
              // Ảnh đại diện: ảnh đầu của sản phẩm đầu tiên có ảnh; không có thì dùng biểu tượng trên nền giấy can.
              const image = items.find((p) => p.images?.length)?.images?.[0];
              return (
                <li key={s.slug} className="reveal">
                  <Link href={`/${vocational.slug}/${s.slug}`} className="group flex h-full flex-col overflow-hidden border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                      {image ? (
                        <Image src={image} alt="" fill sizes="(min-width:1280px) 250px, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="bg-drafting grid h-full place-items-center">
                          <Icon name={s.icon || "robot"} className="size-14 stroke-[1.2] text-drafting transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      )}
                      <span className="absolute left-0 top-0 bg-white px-2 py-1 font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-semibold leading-snug first-letter:uppercase group-hover:text-brand">{s.name}</h3>
                      <p className="mt-auto flex items-center justify-between pt-4 text-sm text-steel">
                        {items.length} thiết bị
                        <Icon name="chevron" className="size-3.5 text-brand transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-y border-line">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="reveal flex gap-4">
              <Icon name={p.icon} className="size-8 shrink-0 text-brand" />
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-0.5 text-sm text-steel">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Section title="Tin tức và hướng dẫn" href="/tin-tuc" more="Xem tất cả bài viết">
        <div className="grid gap-8 md:grid-cols-3">
          {getPosts().slice(0, 3).map((p) => (
            <article key={p.slug} className="reveal">
              <Link href={`/tin-tuc/${p.slug}`} className="group block">
                {p.image && (
                  <div className="relative mb-4 aspect-video overflow-hidden bg-panel">
                    <Image src={p.image} alt="" fill sizes="(min-width:768px) 400px, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                <p className="text-sm text-steel"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.topic}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand">{p.title}</h3>
                <p className="mt-2 line-clamp-3 leading-relaxed text-steel">{p.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="reveal grid gap-8 bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Xem thiết bị chạy thực tế</h2>
            <p className="mt-3 max-w-xl text-white/70">Video vận hành máy và mô hình thực hành được cập nhật trên kênh YouTube của xưởng.</p>
          </div>
          <a href={site.youtube} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-semibold text-ink hover:bg-signal">
            Mở kênh YouTube
          </a>
        </div>
      </section>
    </>
  );
}

// `aside`: cột trái (danh mục sản phẩm) như trang danh mục; trên mobile xuống dưới danh sách.
function Section({ title, href, more, aside, children }: { title: string; href: string; more: string; aside?: React.ReactNode; children: React.ReactNode }) {
  const body = (
    <section className={aside ? "min-w-0" : "mx-auto max-w-7xl px-4 py-16"}>
      <div className="reveal mb-7 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <Link href={href} className="-my-2 py-2 text-sm font-semibold text-brand hover:underline">{more}</Link>
      </div>
      {children}
    </section>
  );
  return aside ? <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[280px_1fr]">{aside}{body}</div> : body;
}

