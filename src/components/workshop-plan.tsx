import { Barlow_Condensed } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, Fragment, isValidElement } from "react";
import { categories, type IconName } from "@/lib/catalog";
import { getProducts } from "@/lib/products";
import { paths as iconPaths } from "@/components/icons";
import { PlanSlider } from "@/components/plan-slider";

// Chữ kỹ thuật trên bản vẽ.
const lettering = Barlow_Condensed({ subsets: ["latin", "vietnamese"], weight: ["500", "600"] });

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

// Nét vẽ: pathLength=1 để CSS vẽ dần từng nét khi slide hiện ra.
const R = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} pathLength={1} />;
const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} pathLength={1} />;
const L = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} />;

// Khung chung cho mọi slide (viewBox 480×300): khu nét đứt, tên + số sản phẩm ở trên, hình vẽ trong vùng 400×124 phía dưới.
const BOX = { x: 16, y: 16, w: 448, h: 268 };
const LABEL = { x: 36, y: 54, maxW: 400, size: 21, lineH: 24 };
const ART = { x: 40, y: 140 };

// Hình vẽ khu theo "Biểu tượng" chọn trong CMS (toạ độ trong vùng 400×124). Biểu tượng chưa có hình riêng thì vẽ to chính biểu tượng đó.
const art: Partial<Record<IconName, React.ReactNode>> = {
  // Các cụm robot xếp pallet.
  robot: [0, 62].flatMap((y) =>
    [0, 84, 168, 252, 336].map((x) => (
      <g key={`${x}-${y}`}>
        {R(x, y, 56, 30)}
        {C(x + 16, y + 40, 6)}
        {C(x + 40, y + 40, 6)}
      </g>
    )),
  ),
  // Servo, hộp số.
  gear: (
    <>
      {R(0, 14, 120, 80)}
      {C(60, 54, 22)}
      {R(150, 4, 140, 100)}
      {R(172, 26, 96, 56)}
      {R(320, 34, 80, 44)}
      {L(320, 56, 400, 56)}
    </>
  ),
  // Biến tần / thiết bị điện tử: dãy máy có màn hình, núm xoay, khe tản nhiệt.
  chip: [10, 110, 210, 310].map((x) => (
    <g key={x}>
      {R(x, 0, 80, 116)}
      {R(x + 14, 14, 52, 22)}
      {C(x + 40, 62, 10)}
      {L(x + 16, 90, x + 64, 90)}
      {L(x + 16, 100, x + 64, 100)}
    </g>
  )),
  // Dãy tủ điện hai cánh.
  cabinet: [0, 82, 164, 246, 328].map((x) => (
    <g key={x}>
      {R(x, 0, 72, 116)}
      {L(x + 36, 0, x + 36, 116)}
      {L(x + 28, 50, x + 28, 66)}
      {L(x + 44, 50, x + 44, 66)}
    </g>
  )),
  // Kệ để thiết bị.
  box: (
    <>
      {[34, 74, 114].map((y) => <g key={y}>{R(0, y, 400, 8)}</g>)}
      {[[20, 8, 50, 26], [90, 14, 40, 20], [250, 4, 70, 30], [40, 50, 60, 24], [200, 44, 80, 30], [320, 54, 50, 20], [10, 92, 70, 22], [140, 86, 50, 28], [280, 90, 90, 24]].map(([x, y, w, h]) => (
        <g key={`${x}-${y}`}>{R(x, y, w, h)}</g>
      ))}
    </>
  ),
  // Băng tải.
  conveyor: (
    <>
      {L(15, 50, 385, 50)}
      {L(15, 74, 385, 74)}
      {C(15, 62, 12)}
      {C(385, 62, 12)}
      {Array.from({ length: 20 }, (_, i) => 33 + i * 18).map((x) => <g key={x}>{L(x, 52, x, 72)}</g>)}
      {[80, 190, 300].map((x) => <g key={x}>{R(x, 28, 30, 22)}</g>)}
      {L(60, 74, 52, 110)}
      {L(340, 74, 348, 110)}
    </>
  ),
};

// Biểu tượng 24×24 → nét bản vẽ: thêm pathLength (vẽ dần) và chia độ dày nét cho tỉ lệ phóng để nét đều với các hình khác.
// (Không dùng vector-effect: non-scaling-stroke vì nó làm sai pathLength, nét vẽ dần bị đứt.)
const ICON_SCALE = 124 / 24;
function drafted(node: React.ReactNode): React.ReactNode {
  return Children.map(node, (el) => {
    if (!isValidElement<{ children?: React.ReactNode }>(el)) return el;
    if (el.type === Fragment) return drafted(el.props.children);
    return cloneElement(el as React.ReactElement<React.SVGProps<SVGElement>>, { pathLength: 1, style: { strokeWidth: 1.6 / ICON_SCALE } });
  });
}
const drawing = (icon: IconName) =>
  art[icon] ?? <g transform={`translate(${200 - 12 * ICON_SCALE} 0) scale(${ICON_SCALE})`}>{drafted(iconPaths[icon] ?? iconPaths.box)}</g>;

// Mặt bằng xưởng dạng slide: mỗi danh mục trong CMS một slide, theo đúng thứ tự trong CMS.
export function WorkshopPlan() {
  const products = getProducts();
  const items = categories.map((c) => ({
    ...c,
    lines: fitLines(c.name, LABEL.maxW, LABEL.size, 2),
    n: products.filter((p) => p.category === c.slug).length,
  }));

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

      <PlanSlider labels={items.map((c) => `${c.name}, ${c.n} sản phẩm`)}>
        {items.map((c, i) => c.slideImage ? (
          // Có ảnh slide (CMS: Danh mục → Ảnh slide trang chủ): chỉ hiện ảnh, cùng khung 480×300 (tên danh mục vẫn có trong aria-label cho trình đọc màn hình).
          // Lề 3.333% = 16/480 của khung nét đứt, để ảnh trùng đúng vị trí khung của slide vẽ.
          <div key={c.slug} className="aspect-[480/300]" style={{ padding: "3.333%" }}>
          <Link href={`/${c.slug}`} aria-label={`${c.name}, ${c.n} sản phẩm`} className="group relative block size-full overflow-hidden rounded-sm border border-drafting/40 bg-paper outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Image src={c.slideImage} alt="" fill sizes="(min-width:1024px) 720px, 100vw" priority={i === 0} className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
          </Link>
          </div>
        ) : (
          <svg key={c.slug} viewBox="0 0 480 300" className={`${lettering.className} block w-full`}>
            <Link href={`/${c.slug}`} className="zone" aria-label={`${c.name}, ${c.n} sản phẩm`}>
              <rect className="hit" x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} />
              <g className="ln" aria-hidden transform={`translate(${ART.x} ${ART.y})`} style={{ "--d": "0.1s" } as React.CSSProperties}>
                {drawing(c.icon || "box")}
              </g>
              <g className="zlabel" aria-hidden>
                <text className="zname" x={LABEL.x} y={LABEL.y}>
                  {c.lines.map((l, j) => (
                    <tspan key={j} x={LABEL.x} dy={j ? LABEL.lineH : 0} style={l.size ? { fontSize: l.size } : undefined}>{l.t}</tspan>
                  ))}
                </text>
                <text className="zcount" x={LABEL.x} y={LABEL.y + 22 + (c.lines.length - 1) * LABEL.lineH}>
                  {c.n} sản phẩm
                </text>
              </g>
            </Link>
          </svg>
        ))}
      </PlanSlider>

      {/* Màn hình nhỏ: thêm danh sách các khu để chọn nhanh, không phải chờ slide. */}
      <ul className="mt-4 grid gap-px border border-drafting/25 bg-drafting/25 sm:hidden">
        {items.map((c, i) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`} className="flex items-center gap-3 bg-paper px-3 py-3">
              <span className={`${lettering.className} grid size-7 shrink-0 place-items-center rounded-full border-2 border-drafting text-sm font-semibold text-drafting`}>{i + 1}</span>
              <span className="flex-1 font-medium">{c.name}</span>
              <span className="text-sm text-steel">{c.n} sản phẩm</span>
            </Link>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-center text-sm text-steel">Chọn một khu trên mặt bằng xưởng để xem thiết bị.</figcaption>
    </figure>
  );
}
