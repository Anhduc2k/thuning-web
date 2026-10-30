import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/catalog";
import { Icon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Giới thiệu", `${site.legalName}: ${site.tagline}. Quy trình khảo sát, thiết kế, chế tạo và lắp đặt.`, "/gioi-thieu");

// Nội dung soạn mới. Thay bằng số liệu thật của công ty (năm thành lập, số dự án, khách hàng tiêu biểu) khi có.
const steps = [
  ["Khảo sát", "Đến tận nhà máy để đo đạc kích thước, khảo sát quy trình sản xuất và yêu cầu của khách hàng."],
  ["Thiết kế", "Lên bản vẽ, danh mục thiết bị; báo giá và duyệt cùng khách hàng trước khi làm."],
  ["Chế tạo", "Gia công, lắp ráp và lập trình, chạy thử kiểm tra từng thiết bị tại xưởng trước khi xuất."],
  ["Lắp đặt, bàn giao", "Lắp tại chỗ, chạy thử, tập huấn và bàn giao cho khách hàng."],
];

export default function AboutPage() {
  return (
    <>
      <PageHead title={`Về ${site.name}`} crumbs={[{ label: "Giới thiệu" }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-steel">{site.legalName}. {site.tagline}.</p>
      </PageHead>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[1fr_380px]">
        <div className="prose-vi text-[17px]">
          <p>Chúng tôi là nhà máy trực tiếp sản xuất và phát triển cánh tay Robot bốc xếp Pallet Made in VietNam. </p>
          <p>ADS cung cấp các thiết bị phục vụ Tự động hóa như Biến tần EasyPower, Servo, Hộp Số, Động cơ bước</p>
          <p>Thiết kế và thi công tủ bảng điện, Dự án Tự động hóa, Cải tạo máy móc và dây chuyền</p>
          <p></p>
        </div>
        <ul className="divide-y divide-line self-start border border-line">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="flex items-center gap-3 px-5 py-4 font-medium hover:text-brand">
                <Icon name={c.icon} className="size-6 text-brand" />{c.name}
                <Icon name="chevron" className="ml-auto size-4 text-steel" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Quy trình làm việc</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => (
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
