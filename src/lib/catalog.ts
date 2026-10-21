export type Category = {
  slug: string;
  name: string;
  icon: IconName;
  intro: string;
  highlights: string[];
  subs: { slug: string; name: string; icon?: IconName }[];
};

export type IconName = "chip" | "conveyor" | "gear" | "cabinet" | "box" | "wave" | "robot" | "gauge" | "motor" | "car" | "bolt" | "bulb" | "snow" | "drop";

export type Product = {
  slug: string;
  name: string;
  category: string;
  sub?: string;
  model: string;
  isNew?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  images?: string[]; // đường dẫn trong /public, ví dụ "/products/plc-s7-1200.jpg"
};

export const categories: Category[] = [
  {
    slug: "thiet-bi-day-nghe",
    name: "Thiết bị dạy nghề",
    icon: "chip",
    intro:
      "Bàn thực hành, mô hình và bộ kit cho trường nghề, cao đẳng và đại học kỹ thuật. Học viên đấu nối, lập trình và vận hành trên thiết bị thật thay vì chỉ xem mô phỏng.",
    highlights: [
      "Kèm bài thực hành và tài liệu hướng dẫn giảng dạy",
      "Linh kiện công nghiệp, thay thế được khi hỏng",
      "Lắp đặt và tập huấn giáo viên tại trường",
    ],
    subs: [
      { slug: "phong-thuc-hanh-dien-tu", name: "Phòng thực hành điện tử", icon: "wave" },
      { slug: "phong-thuc-hanh-vi-mach-tich-hop", name: "Phòng thực hành vi mạch tích hợp", icon: "chip" },
      { slug: "phong-thuc-hanh-khi-nen-thuy-luc", name: "Phòng thực hành khí nén – thủy lực", icon: "gauge" },
      { slug: "phong-thuc-hanh-may-dien", name: "Phòng thực hành máy điện", icon: "motor" },
      { slug: "phong-thuc-hanh-o-to", name: "Phòng thực hành ô tô", icon: "car" },
      { slug: "phong-thuc-hanh-tu-dong-hoa", name: "Phòng thực hành tự động hóa", icon: "robot" },
      { slug: "phong-thuc-hanh-dien-cong-nghiep", name: "Phòng thực hành điện công nghiệp", icon: "bolt" },
      { slug: "phong-thuc-hanh-dien-dan-dung", name: "Phòng thực hành điện dân dụng", icon: "bulb" },
      { slug: "phong-thuc-hanh-dien-lanh", name: "Phòng thực hành điện lạnh", icon: "snow" },
      { slug: "phong-thuc-hanh-dien-nuoc", name: "Phòng thực hành điện nước", icon: "drop" },
    ],
  },
  {
    slug: "bang-tai-cong-nghiep",
    name: "Băng tải công nghiệp",
    icon: "conveyor",
    intro:
      "Băng tải thiết kế theo mặt bằng, tải trọng và tốc độ của từng dây chuyền. Khung, dây băng và động cơ chọn theo môi trường làm việc: thực phẩm, linh kiện, đóng gói hay kho vận.",
    highlights: [
      "Khảo sát mặt bằng và lên bản vẽ trước khi chế tạo",
      "Khung nhôm định hình, thép sơn tĩnh điện hoặc inox 304",
      "Điều khiển tốc độ bằng biến tần, tích hợp cảm biến theo yêu cầu",
    ],
    subs: [
      { slug: "bang-tai-cao-su", name: "Băng tải cao su" },
      { slug: "bang-tai-con-lan", name: "Băng tải con lăn" },
      { slug: "bang-tai-luoi-inox", name: "Băng tải lưới inox" },
      { slug: "bang-tai-pvc", name: "Băng tải PVC" },
      { slug: "bang-tai-xich", name: "Băng tải xích" },
    ],
  },
  {
    slug: "co-khi-che-tao-may",
    name: "Cơ khí chế tạo máy",
    icon: "gear",
    intro:
      "Máy và dây chuyền chế tạo theo bài toán sản xuất cụ thể, từ bản vẽ, gia công, lắp ráp đến chạy thử và chuyển giao vận hành tại xưởng khách hàng.",
    highlights: [
      "Thiết kế 3D và duyệt bản vẽ cùng khách hàng",
      "Gia công CNC, hàn, lắp ráp tại xưởng Bát Tràng",
      "Chạy thử với sản phẩm thật trước khi bàn giao",
    ],
    subs: [],
  },
  {
    slug: "tu-dien-bang-dien",
    name: "Tủ điện – bảng điện",
    icon: "cabinet",
    intro:
      "Tủ điện động lực, tủ điều khiển và bảng điện thực hành được lắp ráp, đi dây và kiểm tra tại xưởng trước khi giao, kèm bản vẽ nguyên lý.",
    highlights: [
      "Đi dây có đánh số, đầu cos và máng dây gọn gàng",
      "Kiểm tra cách điện và chạy thử không tải trước khi giao",
      "Bàn giao bản vẽ nguyên lý và sơ đồ đấu nối",
    ],
    subs: [],
  },
  {
    slug: "thiet-bi-khac",
    name: "Thiết bị khác",
    icon: "box",
    intro: "Thiết bị phụ trợ cho phòng học và xưởng thực hành.",
    highlights: ["Đồng bộ với bàn thực hành và nội thất phòng học"],
    subs: [],
  },
];

// ponytail: dữ liệu tĩnh trong code; chuyển sang CMS/DB khi danh mục cần cập nhật không qua deploy.
// Mã model là mã mẫu, thay bằng mã thật khi có.
type Row = [name: string, category: string, sub?: string, flags?: string];
const rows: Row[] = [
  ["Bộ kit đào tạo, nghiên cứu và ứng dụng AI", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Hệ thống đào tạo robot tự hành ngoài trời ứng dụng AI", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new"],
  ["Bộ thực hành phân loại sản phẩm theo chiều cao, màu sắc, vật liệu", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Bộ thực hành năng lượng mặt trời dạng module panel", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "new"],
  ["Bộ thực hành năng lượng gió công suất nhỏ", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "new"],
  ["Bộ thực hành pin mặt trời công suất nhỏ", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-dan-dung", "new"],
  ["Bộ module thực hành điện tử tương tự", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu", "new"],
  ["Bộ module thực hành điện tử số", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu", "new"],
  ["Bàn thực hành vi mạch tích hợp", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop", "new"],
  ["Bộ thực hành hệ thống nhúng và IoT / AI", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop", "new featured"],
  ["Hệ thống thực hành robot công nghiệp – xe tự hành – camera 3D Vision AI", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Mô hình cánh tay robot công nghiệp 6 bậc tự do", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new"],
  ["Mô hình máy CNC 3 trục điều khiển PLC", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa"],
  ["Mô hình biển quảng cáo LED matrix RGB", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu"],
  ["Bộ thực hành vi điều khiển PIC", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành vi điều khiển AVR", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành vi điều khiển 8051", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành kỹ thuật xung số", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu"],
  ["Bàn thực hành biến tần", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Bộ thực hành PLC S7-1200", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "featured bestseller"],
  ["Bàn thí nghiệm máy biến áp một pha và ba pha", "thiet-bi-day-nghe", "phong-thuc-hanh-may-dien"],
  ["Bàn thí nghiệm máy phát – động cơ một chiều", "thiet-bi-day-nghe", "phong-thuc-hanh-may-dien"],
  ["Bàn điều khiển giáo viên", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Bàn thực hành điện công nghiệp", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Mô hình hệ thống điện máy phay", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep"],
  ["Mô hình hệ thống điện máy tiện", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep"],
  ["Mô hình thực hành cầu trục", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "bestseller"],
  ["Mô hình dàn trải máy điều hòa 2 cục 2 chiều", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-lanh", "bestseller"],
  ["Bộ thực hành khí cụ điện", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "bestseller"],
  ["Mô hình máy xúc điều khiển thủy lực", "thiet-bi-day-nghe", "phong-thuc-hanh-khi-nen-thuy-luc", "bestseller"],
  ["Mô hình động cơ xăng dùng cho thực tập tháo lắp", "thiet-bi-day-nghe", "phong-thuc-hanh-o-to", "bestseller"],
  ["Bàn thực hành khí nén – điện khí nén", "thiet-bi-day-nghe", "phong-thuc-hanh-khi-nen-thuy-luc"],
  ["Mô hình hệ thống cấp thoát nước dân dụng", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-nuoc"],
  ["Bàn thực hành điện dân dụng", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-dan-dung"],
  ["Mô hình tủ lạnh dàn trải", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-lanh"],
  ["Băng tải cao su gân vấu", "bang-tai-cong-nghiep", "bang-tai-cao-su"],
  ["Băng tải con lăn", "bang-tai-cong-nghiep", "bang-tai-con-lan", "featured"],
  ["Băng tải lưới inox cho dây chuyền sản xuất", "bang-tai-cong-nghiep", "bang-tai-luoi-inox"],
  ["Băng tải lưới inox có thùng ngâm nóng – lạnh", "bang-tai-cong-nghiep", "bang-tai-luoi-inox"],
  ["Băng tải PVC bàn thao tác", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải PVC gân dán ngang", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải PVC có cơ cấu nâng hạ", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải xích nhựa dạng lưới", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Băng tải xích tấm inox", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Băng tải xích dạng góc cua", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Dây chuyền uốn dàn lạnh tủ đông", "co-khi-che-tao-may", undefined, "featured"],
  ["Máy vặn cút quả lọc", "co-khi-che-tao-may"],
  ["Máy hàn quả lọc", "co-khi-che-tao-may"],
  ["Cân đóng bao tự động", "co-khi-che-tao-may"],
  ["Máy mài tự động", "co-khi-che-tao-may"],
  ["Máy cắt dây tự động", "co-khi-che-tao-may"],
  ["Máy làm đá viên tự động", "co-khi-che-tao-may"],
  ["Tủ điện điều khiển PLC", "tu-dien-bang-dien"],
  ["Tủ điện phân phối hạ thế", "tu-dien-bang-dien"],
  ["Tủ điều khiển biến tần", "tu-dien-bang-dien"],
  ["Bộ bàn ghế học sinh", "thiet-bi-khac"],
  ["Mô hình bảng kế hoạch sản xuất", "thiet-bi-khac"],
  ["Phần mềm điều khiển bàn giáo viên", "thiet-bi-khac"],
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const prefix: Record<string, string> = {
  "thiet-bi-day-nghe": "THA",
  "bang-tai-cong-nghiep": "BT",
  "co-khi-che-tao-may": "CK",
  "tu-dien-bang-dien": "TD",
  "thiet-bi-khac": "TB",
};

// Thứ tự trong `rows` = thứ tự mới nhất.
export const products: Product[] = rows.map(([name, category, sub, flags = ""], i) => ({
  slug: slugify(name),
  name,
  category,
  sub,
  model: `${prefix[category]}-${String(101 + i)}`,
  isNew: flags.includes("new"),
  featured: flags.includes("featured"),
  bestseller: flags.includes("bestseller"),
}));

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export function subName(category: Category, sub?: string) {
  return category.subs.find((s) => s.slug === sub)?.name;
}

export function productIcon(p: Product): IconName {
  const c = getCategory(p.category);
  return c?.subs.find((s) => s.slug === p.sub)?.icon ?? c?.icon ?? "box";
}

export const SORTS = { "moi-nhat": "Mới nhất", "ten-a-z": "Tên A → Z" } as const;
export type Sort = keyof typeof SORTS;
export const PAGE_SIZE = 12;

export function listProducts(opts: { category?: string; sub?: string; q?: string; sort?: string; page?: number }) {
  let list = products.filter(
    (p) => (!opts.category || p.category === opts.category) && (!opts.sub || p.sub === opts.sub),
  );
  if (opts.q) {
    const words = slugify(opts.q).split("-").filter(Boolean);
    list = list.filter((p) => {
      const hay = `${p.slug}-${slugify(p.model)}`;
      return words.every((w) => hay.includes(w));
    });
  }
  if (opts.sort === "ten-a-z") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "vi"));
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Math.floor(opts.page || 1)), pages);
  return { items: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: list.length, page, pages };
}

export function relatedProducts(p: Product, n = 8) {
  const same = products.filter((x) => x.slug !== p.slug && x.category === p.category);
  return [...same.filter((x) => x.sub === p.sub), ...same.filter((x) => x.sub !== p.sub)].slice(0, n);
}
