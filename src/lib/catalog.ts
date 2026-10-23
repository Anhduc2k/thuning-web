import type { L, Locale } from "./i18n";

export type Category = {
  slug: string;
  name: L;
  icon: IconName;
  intro: L;
  highlights: L<string[]>;
  subs: { slug: string; name: L; icon?: IconName }[];
};

export type IconName = "chip" | "conveyor" | "gear" | "cabinet" | "box" | "wave" | "robot" | "gauge" | "motor" | "car" | "bolt" | "bulb" | "snow" | "drop";

export type Product = {
  slug: string; // từ tên tiếng Việt: URL giữ nguyên ở cả hai ngôn ngữ
  name: L;
  category: string;
  sub?: string;
  model: string;
  isNew?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  images?: string[]; // đường dẫn trong /public, ví dụ "/products/plc-s7-1200.jpg"
};

// Slug danh mục không được là "en"/"vi" (trùng tiền tố ngôn ngữ) và mọi slug không chứa dấu chấm (proxy bỏ qua đường dẫn có dấu chấm).
export const categories: Category[] = [
  {
    slug: "thiet-bi-day-nghe",
    name: { vi: "Thiết bị dạy nghề", en: "Vocational Training Equipment" },
    icon: "chip",
    intro: {
      vi: "Bàn thực hành, mô hình và bộ kit cho trường nghề, cao đẳng và đại học kỹ thuật. Học viên đấu nối, lập trình và vận hành trên thiết bị thật thay vì chỉ xem mô phỏng.",
      en: "Training benches, models and kits for vocational schools, colleges and technical universities. Students wire, program and operate real equipment instead of just watching simulations.",
    },
    highlights: {
      vi: [
        "Kèm bài thực hành và tài liệu hướng dẫn giảng dạy",
        "Linh kiện công nghiệp, thay thế được khi hỏng",
        "Lắp đặt và tập huấn giáo viên tại trường",
      ],
      en: [
        "Supplied with exercises and teaching guides",
        "Industrial components, replaceable if they fail",
        "Installation and teacher training at your school",
      ],
    },
    subs: [
      { slug: "phong-thuc-hanh-dien-tu", name: { vi: "Phòng thực hành điện tử", en: "Electronics lab" }, icon: "wave" },
      { slug: "phong-thuc-hanh-vi-mach-tich-hop", name: { vi: "Phòng thực hành vi mạch tích hợp", en: "Integrated circuits lab" }, icon: "chip" },
      { slug: "phong-thuc-hanh-khi-nen-thuy-luc", name: { vi: "Phòng thực hành khí nén – thủy lực", en: "Pneumatics & hydraulics lab" }, icon: "gauge" },
      { slug: "phong-thuc-hanh-may-dien", name: { vi: "Phòng thực hành máy điện", en: "Electrical machines lab" }, icon: "motor" },
      { slug: "phong-thuc-hanh-o-to", name: { vi: "Phòng thực hành ô tô", en: "Automotive lab" }, icon: "car" },
      { slug: "phong-thuc-hanh-tu-dong-hoa", name: { vi: "Phòng thực hành tự động hóa", en: "Automation lab" }, icon: "robot" },
      { slug: "phong-thuc-hanh-dien-cong-nghiep", name: { vi: "Phòng thực hành điện công nghiệp", en: "Industrial electrical lab" }, icon: "bolt" },
      { slug: "phong-thuc-hanh-dien-dan-dung", name: { vi: "Phòng thực hành điện dân dụng", en: "Residential electrical lab" }, icon: "bulb" },
      { slug: "phong-thuc-hanh-dien-lanh", name: { vi: "Phòng thực hành điện lạnh", en: "Refrigeration & HVAC lab" }, icon: "snow" },
      { slug: "phong-thuc-hanh-dien-nuoc", name: { vi: "Phòng thực hành điện nước", en: "Plumbing & electrical lab" }, icon: "drop" },
    ],
  },
  {
    slug: "bang-tai-cong-nghiep",
    name: { vi: "Băng tải công nghiệp", en: "Industrial Conveyors" },
    icon: "conveyor",
    intro: {
      vi: "Băng tải thiết kế theo mặt bằng, tải trọng và tốc độ của từng dây chuyền. Khung, dây băng và động cơ chọn theo môi trường làm việc: thực phẩm, linh kiện, đóng gói hay kho vận.",
      en: "Conveyors designed around the layout, load and speed of each production line. Frame, belt and motor are chosen for the working environment: food, components, packaging or warehousing.",
    },
    highlights: {
      vi: [
        "Khảo sát mặt bằng và lên bản vẽ trước khi chế tạo",
        "Khung nhôm định hình, thép sơn tĩnh điện hoặc inox 304",
        "Điều khiển tốc độ bằng biến tần, tích hợp cảm biến theo yêu cầu",
      ],
      en: [
        "Site survey and drawings before manufacturing",
        "Aluminium profile, powder-coated steel or 304 stainless steel frames",
        "Speed control by variable frequency drive, sensors integrated on request",
      ],
    },
    subs: [
      { slug: "bang-tai-cao-su", name: { vi: "Băng tải cao su", en: "Rubber belt conveyors" } },
      { slug: "bang-tai-con-lan", name: { vi: "Băng tải con lăn", en: "Roller conveyors" } },
      { slug: "bang-tai-luoi-inox", name: { vi: "Băng tải lưới inox", en: "Stainless steel mesh conveyors" } },
      { slug: "bang-tai-pvc", name: { vi: "Băng tải PVC", en: "PVC belt conveyors" } },
      { slug: "bang-tai-xich", name: { vi: "Băng tải xích", en: "Chain conveyors" } },
    ],
  },
  {
    slug: "co-khi-che-tao-may",
    name: { vi: "Cơ khí chế tạo máy", en: "Machine Building" },
    icon: "gear",
    intro: {
      vi: "Máy và dây chuyền chế tạo theo bài toán sản xuất cụ thể, từ bản vẽ, gia công, lắp ráp đến chạy thử và chuyển giao vận hành tại xưởng khách hàng.",
      en: "Machines and production lines built for a specific production problem, from drawings, machining and assembly to test runs and operator handover at the customer's plant.",
    },
    highlights: {
      vi: [
        "Thiết kế 3D và duyệt bản vẽ cùng khách hàng",
        "Gia công CNC, hàn, lắp ráp tại xưởng Bát Tràng",
        "Chạy thử với sản phẩm thật trước khi bàn giao",
      ],
      en: [
        "3D design, with drawings reviewed together with the customer",
        "CNC machining, welding and assembly at our Bat Trang workshop",
        "Test runs with real products before handover",
      ],
    },
    subs: [],
  },
  {
    slug: "tu-dien-bang-dien",
    name: { vi: "Tủ điện – bảng điện", en: "Electrical Cabinets & Panels" },
    icon: "cabinet",
    intro: {
      vi: "Tủ điện động lực, tủ điều khiển và bảng điện thực hành được lắp ráp, đi dây và kiểm tra tại xưởng trước khi giao, kèm bản vẽ nguyên lý.",
      en: "Power cabinets, control cabinets and training panels are assembled, wired and tested at our workshop before delivery, and come with schematic diagrams.",
    },
    highlights: {
      vi: [
        "Đi dây có đánh số, đầu cos và máng dây gọn gàng",
        "Kiểm tra cách điện và chạy thử không tải trước khi giao",
        "Bàn giao bản vẽ nguyên lý và sơ đồ đấu nối",
      ],
      en: [
        "Numbered wires, crimped lugs and tidy cable ducts",
        "Insulation test and no-load test run before delivery",
        "Schematic and wiring diagrams handed over",
      ],
    },
    subs: [],
  },
  {
    slug: "thiet-bi-khac",
    name: { vi: "Thiết bị khác", en: "Other Equipment" },
    icon: "box",
    intro: { vi: "Thiết bị phụ trợ cho phòng học và xưởng thực hành.", en: "Auxiliary equipment for classrooms and training workshops." },
    highlights: { vi: ["Đồng bộ với bàn thực hành và nội thất phòng học"], en: ["Matched to the training benches and classroom furniture"] },
    subs: [],
  },
];

// ponytail: dữ liệu tĩnh trong code; chuyển sang CMS/DB khi danh mục cần cập nhật không qua deploy.
// Mã model là mã mẫu, thay bằng mã thật khi có.
type Row = [vi: string, en: string, category: string, sub?: string, flags?: string];
const rows: Row[] = [
  ["Bộ kit đào tạo, nghiên cứu và ứng dụng AI", "AI training, research and application kit", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Hệ thống đào tạo robot tự hành ngoài trời ứng dụng AI", "Outdoor autonomous robot training system with AI", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new"],
  ["Bộ thực hành phân loại sản phẩm theo chiều cao, màu sắc, vật liệu", "Product sorting training kit by height, colour and material", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Bộ thực hành năng lượng mặt trời dạng module panel", "Modular solar panel training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "new"],
  ["Bộ thực hành năng lượng gió công suất nhỏ", "Small wind power training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "new"],
  ["Bộ thực hành pin mặt trời công suất nhỏ", "Small solar cell training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-dan-dung", "new"],
  ["Bộ module thực hành điện tử tương tự", "Analog electronics training module set", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu", "new"],
  ["Bộ module thực hành điện tử số", "Digital electronics training module set", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu", "new"],
  ["Bàn thực hành vi mạch tích hợp", "Integrated circuit training bench", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop", "new"],
  ["Bộ thực hành hệ thống nhúng và IoT / AI", "Embedded systems and IoT / AI training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop", "new featured"],
  ["Hệ thống thực hành robot công nghiệp – xe tự hành – camera 3D Vision AI", "Industrial robot – AGV – 3D Vision AI camera training system", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new featured"],
  ["Mô hình cánh tay robot công nghiệp 6 bậc tự do", "6-DOF industrial robot arm model", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "new"],
  ["Mô hình máy CNC 3 trục điều khiển PLC", "PLC-controlled 3-axis CNC machine model", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa"],
  ["Mô hình biển quảng cáo LED matrix RGB", "RGB LED matrix signboard model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu"],
  ["Bộ thực hành vi điều khiển PIC", "PIC microcontroller training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành vi điều khiển AVR", "AVR microcontroller training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành vi điều khiển 8051", "8051 microcontroller training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-vi-mach-tich-hop"],
  ["Bộ thực hành kỹ thuật xung số", "Pulse and digital techniques training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-tu"],
  ["Bàn thực hành biến tần", "Variable frequency drive training bench", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Bộ thực hành PLC S7-1200", "PLC S7-1200 training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-tu-dong-hoa", "featured bestseller"],
  ["Bàn thí nghiệm máy biến áp một pha và ba pha", "Single- and three-phase transformer lab bench", "thiet-bi-day-nghe", "phong-thuc-hanh-may-dien"],
  ["Bàn thí nghiệm máy phát – động cơ một chiều", "DC generator – motor lab bench", "thiet-bi-day-nghe", "phong-thuc-hanh-may-dien"],
  ["Bàn điều khiển giáo viên", "Teacher control desk", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Bàn thực hành điện công nghiệp", "Industrial electrical training bench", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "featured"],
  ["Mô hình hệ thống điện máy phay", "Milling machine electrical system model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep"],
  ["Mô hình hệ thống điện máy tiện", "Lathe electrical system model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep"],
  ["Mô hình thực hành cầu trục", "Overhead crane training model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "bestseller"],
  ["Mô hình dàn trải máy điều hòa 2 cục 2 chiều", "Split heat-pump air conditioner open-layout model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-lanh", "bestseller"],
  ["Bộ thực hành khí cụ điện", "Electrical control devices training kit", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-cong-nghiep", "bestseller"],
  ["Mô hình máy xúc điều khiển thủy lực", "Hydraulic excavator model", "thiet-bi-day-nghe", "phong-thuc-hanh-khi-nen-thuy-luc", "bestseller"],
  ["Mô hình động cơ xăng dùng cho thực tập tháo lắp", "Petrol engine model for assembly practice", "thiet-bi-day-nghe", "phong-thuc-hanh-o-to", "bestseller"],
  ["Bàn thực hành khí nén – điện khí nén", "Pneumatics – electro-pneumatics training bench", "thiet-bi-day-nghe", "phong-thuc-hanh-khi-nen-thuy-luc"],
  ["Mô hình hệ thống cấp thoát nước dân dụng", "Residential water supply and drainage model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-nuoc"],
  ["Bàn thực hành điện dân dụng", "Residential electrical training bench", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-dan-dung"],
  ["Mô hình tủ lạnh dàn trải", "Open-layout refrigerator model", "thiet-bi-day-nghe", "phong-thuc-hanh-dien-lanh"],
  ["Băng tải cao su gân vấu", "Cleated rubber belt conveyor", "bang-tai-cong-nghiep", "bang-tai-cao-su"],
  ["Băng tải con lăn", "Roller conveyor", "bang-tai-cong-nghiep", "bang-tai-con-lan", "featured"],
  ["Băng tải lưới inox cho dây chuyền sản xuất", "Stainless steel mesh conveyor for production lines", "bang-tai-cong-nghiep", "bang-tai-luoi-inox"],
  ["Băng tải lưới inox có thùng ngâm nóng – lạnh", "Stainless steel mesh conveyor with hot – cold soaking tank", "bang-tai-cong-nghiep", "bang-tai-luoi-inox"],
  ["Băng tải PVC bàn thao tác", "PVC belt conveyor with work table", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải PVC gân dán ngang", "PVC belt conveyor with cross cleats", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải PVC có cơ cấu nâng hạ", "PVC belt conveyor with lifting mechanism", "bang-tai-cong-nghiep", "bang-tai-pvc"],
  ["Băng tải xích nhựa dạng lưới", "Plastic mesh chain conveyor", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Băng tải xích tấm inox", "Stainless steel slat chain conveyor", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Băng tải xích dạng góc cua", "Curved chain conveyor", "bang-tai-cong-nghiep", "bang-tai-xich"],
  ["Dây chuyền uốn dàn lạnh tủ đông", "Freezer evaporator bending line", "co-khi-che-tao-may", undefined, "featured"],
  ["Máy vặn cút quả lọc", "Filter elbow screwing machine", "co-khi-che-tao-may"],
  ["Máy hàn quả lọc", "Filter welding machine", "co-khi-che-tao-may"],
  ["Cân đóng bao tự động", "Automatic bagging scale", "co-khi-che-tao-may"],
  ["Máy mài tự động", "Automatic grinding machine", "co-khi-che-tao-may"],
  ["Máy cắt dây tự động", "Automatic wire cutting machine", "co-khi-che-tao-may"],
  ["Máy làm đá viên tự động", "Automatic ice cube machine", "co-khi-che-tao-may"],
  ["Tủ điện điều khiển PLC", "PLC control cabinet", "tu-dien-bang-dien"],
  ["Tủ điện phân phối hạ thế", "Low-voltage distribution cabinet", "tu-dien-bang-dien"],
  ["Tủ điều khiển biến tần", "VFD control cabinet", "tu-dien-bang-dien"],
  ["Bộ bàn ghế học sinh", "Student desk and chair set", "thiet-bi-khac"],
  ["Mô hình bảng kế hoạch sản xuất", "Production planning board model", "thiet-bi-khac"],
  ["Phần mềm điều khiển bàn giáo viên", "Teacher desk control software", "thiet-bi-khac"],
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
export const products: Product[] = rows.map(([vi, en, category, sub, flags = ""], i) => ({
  slug: slugify(vi),
  name: { vi, en },
  category,
  sub,
  model: `${prefix[category]}-${String(101 + i)}`,
  isNew: flags.includes("new"),
  featured: flags.includes("featured"),
  bestseller: flags.includes("bestseller"),
}));

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export function subName(category: Category, sub: string | undefined, l: Locale) {
  return category.subs.find((s) => s.slug === sub)?.name[l];
}

export function productIcon(p: Product): IconName {
  const c = getCategory(p.category);
  return c?.subs.find((s) => s.slug === p.sub)?.icon ?? c?.icon ?? "box";
}

export const SORTS = ["moi-nhat", "ten-a-z"] as const; // nhãn ở dict.catalog.sorts
export type Sort = (typeof SORTS)[number];
export const PAGE_SIZE = 12;

export function listProducts(opts: { category?: string; sub?: string; q?: string; sort?: string; page?: number; l: Locale }) {
  let list = products.filter(
    (p) => (!opts.category || p.category === opts.category) && (!opts.sub || p.sub === opts.sub),
  );
  if (opts.q) {
    const words = slugify(opts.q).split("-").filter(Boolean);
    list = list.filter((p) => {
      const hay = `${p.slug}-${slugify(p.name.en)}-${slugify(p.model)}`; // tìm được bằng cả tên vi và en
      return words.every((w) => hay.includes(w));
    });
  }
  if (opts.sort === "ten-a-z") list = [...list].sort((a, b) => a.name[opts.l].localeCompare(b.name[opts.l], opts.l));
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Math.floor(opts.page || 1)), pages);
  return { items: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: list.length, page, pages };
}

export function relatedProducts(p: Product, n = 8) {
  const same = products.filter((x) => x.slug !== p.slug && x.category === p.category);
  return [...same.filter((x) => x.sub === p.sub), ...same.filter((x) => x.sub !== p.sub)].slice(0, n);
}
