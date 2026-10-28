import type { Metadata } from "next";
import { PageHead } from "@/components/catalog";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Tuyển dụng", `Cơ hội việc làm kỹ thuật điện, tự động hóa, cơ khí và kinh doanh tại ${site.legalName}.`, "/tuyen-dung");

// ponytail: danh sách tĩnh. Thêm từng vị trí (mô tả, hạn nộp) khi công ty có tin tuyển cụ thể.
const teams = [
  ["Kỹ thuật điện – tự động hóa", "Thiết kế mạch, lập trình PLC, đi dây tủ điện và chạy thử thiết bị."],
  ["Cơ khí chế tạo", "Vẽ thiết kế 2D/3D, gia công, hàn và lắp ráp máy, băng tải."],
  ["Kinh doanh – dự án", "Tư vấn cho trường và nhà máy, lập báo giá, theo dõi hợp đồng."],
];

export default function CareersPage() {
  return (
    <>
      <PageHead title="Tuyển dụng" crumbs={[{ label: "Tuyển dụng" }]}>
        <p className="mt-4 max-w-2xl leading-relaxed text-steel">Làm việc trực tiếp tại xưởng, trên thiết bị thật, cùng đội ngũ kỹ thuật lâu năm.</p>
      </PageHead>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">Các bộ phận thường xuyên tuyển</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {teams.map(([title, text]) => (
            <li key={title} className="border-t-2 border-ink pt-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-steel">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 bg-panel p-6 md:p-8">
          <h2 className="text-xl font-bold">Ứng tuyển</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-steel">
            Gửi CV tới <a href={`mailto:${site.email}?subject=${encodeURIComponent("Ứng tuyển")}`} className="font-semibold text-brand hover:underline">{site.email}</a>, ghi rõ vị trí mong muốn trong tiêu đề, hoặc gọi <a href={`tel:${site.phone}`} className="font-semibold text-brand hover:underline">{site.phoneDisplay}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
