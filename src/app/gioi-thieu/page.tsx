import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/catalog";
import { Icon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Giới thiệu", `${site.legalName}: ${site.tagline}. Quy trình khảo sát, thiết kế, chế tạo và lắp đặt.`, "/gioi-thieu");

// Nội dung soạn mới. Thay bằng số liệu thật của công ty (năm thành lập, số dự án, khách hàng tiêu biểu) khi có.
const steps = [
  ["Khảo sát", "Đến tận trường hoặc nhà máy để đo mặt bằng, xem chương trình đào tạo hoặc quy trình sản xuất."],
  ["Thiết kế", "Lên bản vẽ 3D, danh mục thiết bị và bài thực hành; duyệt cùng khách hàng trước khi làm."],
  ["Chế tạo", "Gia công, lắp ráp và đi dây tại xưởng Bát Tràng, kiểm tra từng thiết bị trước khi xuất."],
  ["Lắp đặt, bàn giao", "Lắp tại chỗ, chạy thử, tập huấn người dùng và bảo hành theo hợp đồng."],
];

export default function AboutPage() {
  return (
    <>
      <PageHead title={`Về ${site.name}`} crumbs={[{ label: "Giới thiệu" }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-steel">{site.legalName}. {site.tagline}.</p>
      </PageHead>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[1fr_380px]">
        <div className="prose-vi text-[17px]">
          <p>Chúng tôi là xưởng thiết kế và chế tạo thiết bị kỹ thuật đặt tại khu công nghiệp Bát Tràng, Gia Lâm, Hà Nội. Hai nhóm khách hàng chính là các cơ sở đào tạo nghề và các nhà máy sản xuất.</p>
          <p>Với nhà trường, chúng tôi làm bàn thực hành, mô hình và bộ kit cho các nghề điện, điện tử, tự động hóa, điện lạnh, ô tô và khí nén – thủy lực. Thiết bị dùng linh kiện công nghiệp phổ biến nên học viên ra trường làm được ngay trên máy thật.</p>
          <p>Với nhà máy, chúng tôi chế tạo băng tải, máy và dây chuyền theo bài toán cụ thể, cùng tủ điện điều khiển đi kèm. Mọi thiết bị được chạy thử tại xưởng trước khi giao.</p>
          <p>Hệ thống quản lý chất lượng của công ty áp dụng theo ISO 9001:2015 và ISO 14001:2015.</p>
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
