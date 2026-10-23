import type { Metadata } from "next";

// Thông tin công ty: sửa ở đây là đổi trên toàn site.
export const site = {
  name: "Tự Động Hóa Thư Ning fake",
  legalName: "Công ty Cổ phần Tự động hóa Thư Ning",
  tagline: "Thiết bị dạy nghề, cơ khí chế tạo máy và băng tải công nghiệp",
  address: "Ngõ Lày, Bôn City, 36 Raumanian",
  phone: "0986666839",
  phoneDisplay: "098.6666.839",
  email: "thuning@gmail.com",
  url: "https://thuning.edu.vn",
  facebook: "https://www.facebook.com/thanhhungauto/",
  youtube: "https://www.youtube.com/channel/UCcT2ePDTDvAuPcdMR2fEeIw",
  zalo: "https://zalo.me/0986666839",
  bank: { owner: "Lê Bá Anh Đức", name: "Vietinbank", account: "108869255397" },
  mapQuery: "Chợ Bôn, Đông Thanh, Thanh Hóa",
};

export const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/thiet-bi-day-nghe", label: "Thiết bị dạy nghề", category: "thiet-bi-day-nghe" },
  { href: "/co-khi-che-tao-may", label: "Cơ khí chế tạo máy" },
  { href: "/bang-tai-cong-nghiep", label: "Băng tải công nghiệp", category: "bang-tai-cong-nghiep" },
  { href: "/tu-dien-bang-dien", label: "Tủ điện – bảng điện" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/lien-he", label: "Liên hệ" },
];

export const policies: Record<string, { title: string; body: string[] }> = {
  "huong-dan-mua-hang": {
    title: "Hướng dẫn mua hàng",
    body: [
      "Chọn thiết bị cần mua, bấm “Nhận báo giá” và để lại họ tên, số điện thoại. Bộ phận kinh doanh gọi lại trong giờ làm việc để xác nhận cấu hình, số lượng và thời gian giao.",
      "Với dự án trang bị cả phòng thực hành hoặc dây chuyền, bạn có thể gửi danh mục hoặc bản vẽ mặt bằng qua email để nhận báo giá trọn gói.",
    ],
  },
  "huong-dan-thanh-toan": {
    title: "Hướng dẫn thanh toán",
    body: [
      "Thanh toán bằng chuyển khoản theo hợp đồng hoặc đơn đặt hàng. Thông tin tài khoản ghi ở chân trang và trên hợp đồng.",
      "Ghi rõ tên đơn vị và số hợp đồng trong nội dung chuyển khoản để kế toán đối soát nhanh.",
    ],
  },
  "chinh-sach-van-chuyen": {
    title: "Chính sách vận chuyển",
    body: [
      "Giao hàng toàn quốc. Thiết bị cồng kềnh được đóng kiện gỗ và vận chuyển bằng xe chuyên dụng.",
      "Với thiết bị cần lắp đặt, kỹ thuật viên đi cùng để lắp, chạy thử và hướng dẫn vận hành tại chỗ.",
    ],
  },
  "quy-dinh-doi-tra": {
    title: "Quy định đổi trả hàng",
    body: [
      "Thiết bị lỗi do sản xuất được sửa chữa hoặc thay mới theo điều khoản bảo hành trong hợp đồng.",
      "Thiết bị chế tạo theo yêu cầu riêng không áp dụng đổi trả, trừ khi sai lệch so với thông số đã thống nhất.",
    ],
  },
  "cam-ket-va-quy-dinh-chung": {
    title: "Cam kết và quy định chung",
    body: [
      "Thiết bị mới 100%, sản xuất theo hệ thống quản lý chất lượng ISO 9001:2015 và quản lý môi trường ISO 14001:2015.",
      "Mọi thông số kỹ thuật, thời gian giao và bảo hành được ghi rõ trong hợp đồng trước khi sản xuất.",
    ],
  },
  "bao-mat-thong-tin": {
    title: "Bảo mật thông tin",
    body: [
      "Thông tin bạn gửi qua biểu mẫu chỉ dùng để liên hệ tư vấn và báo giá, không chia sẻ cho bên thứ ba.",
      "Bạn có thể yêu cầu xóa thông tin liên hệ của mình bằng cách gửi email cho chúng tôi.",
    ],
  },
};

/** Metadata cho một trang: canonical + Open Graph. Next gộp metadata kiểu nông nên mỗi trang phải tự đặt đủ openGraph. */
export function pageMeta(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "vi_VN", siteName: site.name, title, description, url: path },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#org`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "VN" },
  sameAs: [site.facebook, site.youtube],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Trang chủ", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: site.url + it.path,
    })),
  };
}
