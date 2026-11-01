import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { categories, getCategoryById } from "@/lib/catalog";
import { getProducts } from "@/lib/products";
import { PlanSlider } from "@/components/plan-slider";

// Chữ kỹ thuật trên bản vẽ.
const lettering = Barlow_Condensed({ subsets: ["latin", "vietnamese"], weight: ["500", "600"] });

type Box = { x: number; y: number; w: number; h: number };
// `id` = mã danh mục (danh mục có sẵn: đường dẫn gốc), nên đổi tên / đường dẫn trong CMS vẫn đúng khu.
// `maxW`, `lines`: chỗ dành cho tên danh mục (tên dài thì xuống dòng, vẫn dài thì co chữ hoặc cắt "…").
type Zone = { id: string; box: Box; label: [number, number]; maxW: number; lines?: 1 | 2; count?: [number, number, "end"?]; small?: boolean; draw: React.ReactNode };

const charW = (size: number) => size * 0.43; // bề rộng trung bình 1 ký tự Barlow Condensed (đo thực tế ~0.41em, chừa dư)
function fitLines(text: string, maxW: number, size: number, maxLines: number) {
  const lines = [""];
  for (const w of text.split(" ")) {
    const last = lines[lines.length - 1];
    const cand = last ? `${last} ${w}` : w;
    if (!last || cand.length * charW(size) <= maxW || lines.length >= maxLines) lines[lines.length - 1] = cand;
    else lines.push(w);
  }
  const max = Math.floor((maxW * 1.35) / charW(size));
  return lines.map((l) => {
    const t = l.length > max ? `${l.slice(0, max - 1).trimEnd()}…` : l;
    // Dài hơn chỗ trống thì thu nhỏ cỡ chữ (không dùng textLength vì sẽ kéo giãn chữ khi ước lượng dư).
    const w = t.length * charW(size);
    return { t, size: w > maxW ? Math.floor((size * maxW) / w) : undefined };
  });
}

// Nét vẽ: pathLength=1 để CSS vẽ dần từng nét khi tải trang.
// Khung nhìn của một slide: bao quanh khu, cùng tỉ lệ cho mọi slide để khung không đổi kích thước.
const RATIO = 16 / 10;
// `minW`: khu nhỏ không bị phóng quá to (chữ to gấp ba) so với các khu lớn.
function frame(b: Box, pad = 24, minW = 440) {
  let w = b.w + pad * 2;
  let h = b.h + pad * 2;
  if (w / h > RATIO) h = w / RATIO;
  else w = h * RATIO;
  if (w < minW) [w, h] = [minW, minW / RATIO];
  return `${b.x + b.w / 2 - w / 2} ${b.y + b.h / 2 - h / 2} ${w} ${h}`;
}

const R = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} pathLength={1} />;
const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} pathLength={1} />;
const L = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} />;

// Mặt bằng xưởng: mỗi khu = một danh mục. Danh mục mới tạo trong CMS không có khu riêng ở đây (vẫn hiện ở menu, chân trang).
const zones: Zone[] = [
  {
    id: "thiet-bi-day-nghe",
    box: { x: 40, y: 40, w: 430, h: 270 },
    label: [54, 70],
    maxW: 236,
    lines: 2,
    draw: (
      <>
        {R(300, 54, 150, 28)}
        {[120, 205].flatMap((y) =>
          [60, 140, 220, 300, 380].map((x) => (
            <g key={`${x}-${y}`}>
              {R(x, y, 62, 34)}
              {C(x + 18, y + 48, 7)}
              {C(x + 44, y + 48, 7)}
            </g>
          )),
        )}
      </>
    ),
  },
  {
    id: "co-khi-che-tao-may",
    box: { x: 490, y: 40, w: 270, h: 200 },
    label: [504, 70],
    maxW: 242,
    draw: (
      <>
        {R(510, 112, 96, 62)}
        {C(558, 143, 17)}
        {R(628, 102, 112, 76)}
        {R(646, 118, 76, 44)}
        {R(516, 190, 74, 36)}
        {L(516, 208, 590, 208)}
      </>
    ),
  },
  {
    id: "tu-dien-bang-dien",
    box: { x: 490, y: 250, w: 158, h: 90 },
    label: [502, 278],
    maxW: 134,
    count: [502, 298],
    small: true,
    draw: (
      <>
        {[502, 546, 590].map((x) => (
          <g key={x}>
            {R(x, 306, 38, 26)}
            {L(x + 19, 306, x + 19, 332)}
          </g>
        ))}
      </>
    ),
  },
  {
    id: "thiet-bi-khac",
    box: { x: 656, y: 250, w: 104, h: 90 },
    label: [666, 278],
    maxW: 84,
    count: [666, 298],
    small: true,
    draw: (
      <>
        {R(666, 306, 84, 12)}
        {R(666, 322, 84, 12)}
      </>
    ),
  },
  {
    id: "bang-tai-cong-nghiep",
    box: { x: 130, y: 356, w: 630, h: 86 },
    label: [144, 384],
    maxW: 500,
    count: [746, 384, "end"],
    draw: (
      <>
        {L(160, 402, 730, 402)}
        {L(160, 424, 730, 424)}
        {C(160, 413, 11)}
        {C(730, 413, 11)}
        {Array.from({ length: 31 }, (_, i) => 178 + i * 18).map((x) => (
          <g key={x}>{L(x, 404, x, 422)}</g>
        ))}
        {[230, 390, 560].map((x) => (
          <g key={x}>{R(x, 393, 30, 22)}</g>
        ))}
      </>
    ),
  },
];

export function WorkshopPlan() {
  const products = getProducts();
  const items = zones.flatMap((z) => {
    const c = getCategoryById(z.id);
    if (!c) return [];
    const size = z.small ? 18 : 21;
    return [{ ...z, slug: c.slug, name: c.name, size, lines: fitLines(c.name, z.maxW, size, z.lines ?? 1), n: products.filter((p) => p.category === c.slug).length }];
  });

  return (
    <figure className="plan">
      {/* Mẫu gạch chéo dùng chung cho mọi slide (id chỉ khai báo một lần trong trang). */}
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" className="hatch-line" />
          </pattern>
        </defs>
      </svg>

      {/* Mỗi khu một slide: cùng toạ độ bản vẽ gốc, chỉ cắt khung nhìn (viewBox) quanh khu đó. */}
      <PlanSlider labels={items.map((z) => `${z.name}, ${z.n} sản phẩm`)}>
        {items.map((z) => (
          <svg key={z.slug} viewBox={frame(z.box)} className={`${lettering.className} block w-full`}>
            <Link href={`/${z.slug}`} className="zone" aria-label={`${z.name}, ${z.n} sản phẩm`}>
              <rect className="hit" x={z.box.x} y={z.box.y} width={z.box.w} height={z.box.h} />
              <g className="ln" aria-hidden style={{ "--d": "0.1s" } as React.CSSProperties}>
                {z.draw}
              </g>
              <g className={z.small ? "zlabel sm" : "zlabel"} aria-hidden>
                <text className="zname" x={z.label[0]} y={z.label[1]}>
                  {z.lines.map((l, j) => (
                    <tspan key={j} x={z.label[0]} dy={j ? 22 : 0} style={l.size ? { fontSize: l.size } : undefined}>{l.t}</tspan>
                  ))}
                </text>
                <text className="zcount" x={(z.count ?? [z.label[0]])[0]} y={(z.count ?? [0, z.label[1] + 20 + (z.lines.length - 1) * 22])[1]} textAnchor={z.count?.[2] ?? "start"}>
                  {z.n} sản phẩm
                </text>
              </g>
            </Link>
          </svg>
        ))}
      </PlanSlider>

      {/* Màn hình nhỏ: thêm danh sách các khu để chọn nhanh, không phải chờ slide. */}
      <ul className="mt-4 grid gap-px border border-drafting/25 bg-drafting/25 sm:hidden">
        {items.map((z, i) => (
          <li key={z.slug}>
            <Link href={`/${z.slug}`} className="flex items-center gap-3 bg-paper px-3 py-3">
              <span className={`${lettering.className} grid size-7 shrink-0 place-items-center rounded-full border-2 border-drafting text-sm font-semibold text-drafting`}>{i + 1}</span>
              <span className="flex-1 font-medium">{z.name}</span>
              <span className="text-sm text-steel">{z.n} sản phẩm</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Danh mục tạo thêm trong CMS chưa có khu vẽ sẵn: hiện thành link ngay dưới bản vẽ. */}
      {(() => {
        const extra = categories.filter((c) => !zones.some((z) => z.id === (c.id ?? c.slug)));
        return extra.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {extra.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="inline-flex items-center gap-2 border border-dashed border-drafting/60 bg-paper px-3 py-2 text-sm font-medium hover:border-brand hover:text-brand">
                  {c.name}
                  <span className="text-steel">{products.filter((p) => p.category === c.slug).length} sản phẩm</span>
                </Link>
              </li>
            ))}
          </ul>
        );
      })()}
      <figcaption className="mt-3 text-center text-sm text-steel">Chọn một khu trên mặt bằng xưởng để xem thiết bị.</figcaption>
    </figure>
  );
}
