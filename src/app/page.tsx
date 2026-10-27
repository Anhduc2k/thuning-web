import Link from "next/link";
import { ProductGrid, Sidebar } from "@/components/catalog";
import { WorkshopPlan } from "@/components/workshop-plan";
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
  { icon: "chat", title: "Tư vấn cấu hình miễn phí", text: "Theo chương trình đào tạo hoặc dây chuyền thực tế" },
  { icon: "tag", title: "Giá trực tiếp từ xưởng", text: "Tự thiết kế, tự sản xuất, không qua trung gian" },
  { icon: "shield", title: "Bảo hành dài hạn", text: "Linh kiện công nghiệp, có sẵn vật tư thay thế" },
] as const;

export default function Home() {
  const newest = getProducts().filter((p) => p.isNew).slice(0, 9);
  const featured = getProducts().filter((p) => (p.featured || p.bestseller) && !p.isNew).slice(0, 8);
  const vocational = categories[0];

  return (
    <>
      <section className="bg-drafting border-b border-drafting/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14">
          {/* Mở đầu: chữ hiện lần lượt cùng lúc mặt bằng xưởng được vẽ (globals.css: .rise, .plan). */}
          <div>
            <h1 className="rise text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[3rem]">
              Thiết bị thực hành do chính xưởng của chúng tôi thiết kế và chế tạo
            </h1>
            <p className="rise mt-5 max-w-xl text-lg leading-relaxed text-steel" style={{ "--d": ".12s" } as React.CSSProperties}>
              Bàn thực hành, mô hình đào tạo cho trường nghề và máy móc, băng tải theo yêu cầu cho nhà máy. Sản xuất tại Bát Tràng, Hà Nội, lắp đặt toàn quốc.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": ".24s" } as React.CSSProperties}>
              <Link href="/thiet-bi-day-nghe" className="inline-flex h-12 items-center rounded-md bg-brand px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg active:translate-y-0">
                Xem thiết bị dạy nghề
              </Link>
              <a href={`tel:${site.phone}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/25 bg-white/60 px-6 font-semibold text-ink hover:border-ink">
                <Icon name="phone" className="size-4" />Gọi {site.phoneDisplay}
              </a>
            </div>
          </div>
          <WorkshopPlan />
        </div>
      </section>

      <Section title="Sản phẩm mới" href="/thiet-bi-day-nghe" more="Xem tất cả thiết bị dạy nghề" aside={<Sidebar />}>
        <ProductGrid items={newest} cols={3} />
      </Section>

      <section className="bg-panel">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Trang bị trọn một phòng thực hành</h2>
            <p className="mt-4 max-w-md leading-relaxed text-steel">
              Chúng tôi khảo sát phòng học, đề xuất danh mục thiết bị theo chương trình đào tạo, lắp đặt và tập huấn giáo viên. Chọn nghề để xem thiết bị tương ứng.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 xl:grid-cols-5">
            {vocational.subs.map((s) => (
              <li key={s.slug}>
                <Link href={`/${vocational.slug}/${s.slug}`} className="group flex h-full flex-col gap-4 bg-white p-5 transition-colors duration-300 hover:bg-ink hover:text-white">
                  <Icon name={s.icon || "chip"} className="size-9 stroke-[1.3] text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                  <span>
                    <span className="block font-semibold leading-snug first-letter:uppercase">{s.name.replace("Phòng thực hành ", "")}</span>
                    <span className="text-sm text-steel group-hover:text-white/60">{getProducts().filter((p) => p.sub === s.slug).length} thiết bị</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section title="Sản phẩm nổi bật" href="/bang-tai-cong-nghiep" more="Xem băng tải công nghiệp">
        <ProductGrid items={featured} />
      </Section>

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

