import Link from "next/link";
import { ProductGrid } from "@/components/catalog";
import { HeroSlider } from "@/components/hero-slider";
import { Icon } from "@/components/icons";
import { categories, getCategory, subName } from "@/lib/catalog";
import { getProduct, getProducts } from "@/lib/products";
import { formatDate, getPosts } from "@/lib/posts";
import { pageMeta, site } from "@/lib/site";

export const metadata = {
  ...pageMeta(`${site.name} – ${site.tagline}`, `${site.legalName}: ${site.tagline}. Thiết kế, chế tạo tại xưởng, lắp đặt và giao hàng toàn quốc.`, "/"),
  title: { absolute: `${site.name} – ${site.tagline}` },
};

const heroSlides = [
  {
    slug: "he-thong-thuc-hanh-robot-cong-nghiep-xe-tu-hanh-camera-3d-vision-ai",
    specs: ["Robot cộng tác 6 trục kết hợp xe tự hành", "Camera 3D nhận dạng và định vị vật thể", "Bài thực hành từ lập trình cơ bản đến ứng dụng AI"],
  },
  {
    slug: "bo-thuc-hanh-phan-loai-san-pham-theo-chieu-cao-mau-sac-vat-lieu",
    specs: ["Phân loại theo chiều cao, màu sắc và vật liệu", "Điều khiển bằng PLC, cảm biến công nghiệp", "Học viên lập trình và chỉnh sửa trọn quy trình"],
  },
  {
    slug: "bo-thuc-hanh-plc-s7-1200",
    specs: ["PLC S7-1200 kèm module vào ra số và tương tự", "Kết nối HMI và phần mềm giám sát qua Ethernet", "Phù hợp nghề điện công nghiệp và tự động hóa"],
  },
].flatMap(({ slug, specs }) => {
  // Sản phẩm đã bị xóa trong CMS thì bỏ khỏi slider thay vì làm hỏng build.
  const p = getProduct(slug);
  if (!p) return [];
  const c = getCategory(p.category)!;
  return { href: `/${p.category}/${p.slug}`, name: p.name, model: p.model, category: subName(c, p.sub) ?? c.name, specs };
});

const promises = [
  { icon: "truck", title: "Giao hàng toàn quốc", text: "Đóng kiện, vận chuyển và lắp đặt tại chỗ" },
  { icon: "chat", title: "Tư vấn cấu hình miễn phí", text: "Theo chương trình đào tạo hoặc dây chuyền thực tế" },
  { icon: "tag", title: "Giá trực tiếp từ xưởng", text: "Tự thiết kế, tự sản xuất, không qua trung gian" },
  { icon: "shield", title: "Bảo hành dài hạn", text: "Linh kiện công nghiệp, có sẵn vật tư thay thế" },
] as const;

// Sản phẩm của slider bị xóa hết trong CMS → dùng sản phẩm nổi bật, thông số lấy từ bảng thông số.
function slides() {
  if (heroSlides.length) return heroSlides;
  return getProducts().filter((p) => p.featured).slice(0, 3).map((p) => {
    const c = getCategory(p.category)!;
    return { href: `/${p.category}/${p.slug}`, name: p.name, model: p.model, category: subName(c, p.sub) ?? c.name, specs: (p.specs ?? []).slice(0, 3).map((s) => `${s.label}: ${s.value}`) };
  });
}

export default function Home() {
  const newest = getProducts().filter((p) => p.isNew).slice(0, 8);
  const featured = getProducts().filter((p) => (p.featured || p.bestseller) && !p.isNew).slice(0, 8);
  const vocational = categories[0];

  return (
    <>
      <section className="bg-blueprint-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="text-white/60">{site.legalName}</p>
            <h1 className="mt-4 text-[2.25rem] font-extrabold leading-[1.1] tracking-tight md:text-[3.25rem]">
              Thiết bị thực hành do chính xưởng của chúng tôi thiết kế và chế tạo
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Bàn thực hành, mô hình đào tạo cho trường nghề và máy móc, băng tải theo yêu cầu cho nhà máy. Sản xuất tại Bát Tràng, Hà Nội, lắp đặt toàn quốc.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/thiet-bi-day-nghe" className="inline-flex h-12 items-center rounded-md bg-brand px-6 font-semibold hover:bg-brand-dark">
                Xem thiết bị dạy nghề
              </Link>
              <a href={`tel:${site.phone}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-white/30 px-6 font-semibold hover:border-white">
                <Icon name="phone" className="size-4" />Gọi {site.phoneDisplay}
              </a>
            </div>
          </div>
          <HeroSlider slides={slides()} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="group flex items-center gap-3 border-line py-5 pr-4 max-md:odd:border-r max-md:[&:nth-child(n+3)]:border-t md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
              <Icon name={c.icon} className="size-8 shrink-0 text-brand" />
              <span>
                <span className="block font-semibold leading-tight group-hover:text-brand">{c.name}</span>
                <span className="text-sm text-steel">{getProducts().filter((p) => p.category === c.slug).length} sản phẩm</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Sản phẩm mới" href="/thiet-bi-day-nghe" more="Xem tất cả thiết bị dạy nghề">
        <ProductGrid items={newest} />
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
                <Link href={`/${vocational.slug}/${s.slug}`} className="group flex h-full flex-col gap-4 bg-white p-5 hover:bg-ink hover:text-white">
                  <Icon name={s.icon || "chip"} className="size-9 stroke-[1.3] text-brand" />
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
            <li key={p.title} className="flex gap-4">
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
            <article key={p.slug}>
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
        <div className="grid gap-8 bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
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

function Section({ title, href, more, children }: { title: string; href: string; more: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <Link href={href} className="-my-2 py-2 text-sm font-semibold text-brand hover:underline">{more}</Link>
      </div>
      {children}
    </section>
  );
}

