import type { Metadata } from "next";
import { dict, href, type L, type Locale } from "./i18n";

// Thông tin công ty: sửa ở đây là đổi trên toàn site. Khẩu hiệu (tagline) theo ngôn ngữ nằm trong i18n.ts.
export const site = {
  name: "Tự Động Hóa Thư Ning fake",
  legalName: "Công ty Cổ phần Tự động hóa Thư Ning",
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

// Nhãn en ngắn hơn tên danh mục để menu ngang vừa một dòng ở 1280px.
export const nav = [
  { href: "/", label: { vi: "Trang chủ", en: "Home" } },
  { href: "/gioi-thieu", label: { vi: "Giới thiệu", en: "About" } },
  { href: "/thiet-bi-day-nghe", label: { vi: "Thiết bị dạy nghề", en: "Training Equipment" }, category: "thiet-bi-day-nghe" },
  { href: "/co-khi-che-tao-may", label: { vi: "Cơ khí chế tạo máy", en: "Machinery" } },
  { href: "/bang-tai-cong-nghiep", label: { vi: "Băng tải công nghiệp", en: "Conveyors" }, category: "bang-tai-cong-nghiep" },
  { href: "/tu-dien-bang-dien", label: { vi: "Tủ điện – bảng điện", en: "Electrical Panels" } },
  { href: "/tin-tuc", label: { vi: "Tin tức", en: "News" } },
  { href: "/tuyen-dung", label: { vi: "Tuyển dụng", en: "Careers" } },
  { href: "/lien-he", label: { vi: "Liên hệ", en: "Contact" } },
];

export const policies: Record<string, { title: L; body: L<string[]> }> = {
  "huong-dan-mua-hang": {
    title: { vi: "Hướng dẫn mua hàng", en: "How to order" },
    body: {
      vi: [
        "Chọn thiết bị cần mua, bấm “Nhận báo giá” và để lại họ tên, số điện thoại. Bộ phận kinh doanh gọi lại trong giờ làm việc để xác nhận cấu hình, số lượng và thời gian giao.",
        "Với dự án trang bị cả phòng thực hành hoặc dây chuyền, bạn có thể gửi danh mục hoặc bản vẽ mặt bằng qua email để nhận báo giá trọn gói.",
      ],
      en: [
        "Choose the equipment you need, click “Get a quote” and leave your name and phone number. Our sales team will call you back during business hours to confirm the configuration, quantity and delivery time.",
        "For projects that equip a whole training lab or production line, you can email us an equipment list or a floor plan to receive a package quote.",
      ],
    },
  },
  "huong-dan-thanh-toan": {
    title: { vi: "Hướng dẫn thanh toán", en: "Payment guide" },
    body: {
      vi: [
        "Thanh toán bằng chuyển khoản theo hợp đồng hoặc đơn đặt hàng. Thông tin tài khoản ghi ở chân trang và trên hợp đồng.",
        "Ghi rõ tên đơn vị và số hợp đồng trong nội dung chuyển khoản để kế toán đối soát nhanh.",
      ],
      en: [
        "Payment is made by bank transfer according to the contract or purchase order. Account details are shown in the footer and on the contract.",
        "Please include your organisation's name and the contract number in the transfer reference so our accountants can match the payment quickly.",
      ],
    },
  },
  "chinh-sach-van-chuyen": {
    title: { vi: "Chính sách vận chuyển", en: "Shipping policy" },
    body: {
      vi: [
        "Giao hàng toàn quốc. Thiết bị cồng kềnh được đóng kiện gỗ và vận chuyển bằng xe chuyên dụng.",
        "Với thiết bị cần lắp đặt, kỹ thuật viên đi cùng để lắp, chạy thử và hướng dẫn vận hành tại chỗ.",
      ],
      en: [
        "We deliver nationwide. Bulky equipment is packed in wooden crates and transported by specialised vehicles.",
        "For equipment that needs installation, a technician comes along to install it, run tests and show you how to operate it on site.",
      ],
    },
  },
  "quy-dinh-doi-tra": {
    title: { vi: "Quy định đổi trả hàng", en: "Returns policy" },
    body: {
      vi: [
        "Thiết bị lỗi do sản xuất được sửa chữa hoặc thay mới theo điều khoản bảo hành trong hợp đồng.",
        "Thiết bị chế tạo theo yêu cầu riêng không áp dụng đổi trả, trừ khi sai lệch so với thông số đã thống nhất.",
      ],
      en: [
        "Equipment with manufacturing defects is repaired or replaced under the warranty terms in the contract.",
        "Custom-built equipment cannot be returned or exchanged unless it deviates from the agreed specifications.",
      ],
    },
  },
  "cam-ket-va-quy-dinh-chung": {
    title: { vi: "Cam kết và quy định chung", en: "Commitments and general terms" },
    body: {
      vi: [
        "Thiết bị mới 100%, sản xuất theo hệ thống quản lý chất lượng ISO 9001:2015 và quản lý môi trường ISO 14001:2015.",
        "Mọi thông số kỹ thuật, thời gian giao và bảo hành được ghi rõ trong hợp đồng trước khi sản xuất.",
      ],
      en: [
        "All equipment is brand new, manufactured under an ISO 9001:2015 quality management system and an ISO 14001:2015 environmental management system.",
        "All technical specifications, delivery times and warranty terms are set out in the contract before manufacturing begins.",
      ],
    },
  },
  "bao-mat-thong-tin": {
    title: { vi: "Bảo mật thông tin", en: "Privacy" },
    body: {
      vi: [
        "Thông tin bạn gửi qua biểu mẫu chỉ dùng để liên hệ tư vấn và báo giá, không chia sẻ cho bên thứ ba.",
        "Bạn có thể yêu cầu xóa thông tin liên hệ của mình bằng cách gửi email cho chúng tôi.",
      ],
      en: [
        "The information you send through our forms is used only to contact you with advice and quotes, and is never shared with third parties.",
        "You can ask us to delete your contact details by sending us an email.",
      ],
    },
  },
};

/** Metadata cho một trang: canonical + hreflang + Open Graph. Next gộp metadata kiểu nông nên mỗi trang phải tự đặt đủ openGraph. `path` là đường dẫn logic (vi, không tiền tố). */
export function pageMeta(l: Locale, title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: href(l, path), languages: { vi: path, en: href("en", path), "x-default": path } },
    openGraph: {
      type,
      locale: dict[l].ogLocale,
      alternateLocale: [dict[l === "vi" ? "en" : "vi"].ogLocale],
      siteName: site.name,
      title,
      description,
      url: href(l, path),
    },
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

export function breadcrumbLd(l: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: dict[l].homeLabel, path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: site.url + href(l, it.path),
    })),
  };
}
