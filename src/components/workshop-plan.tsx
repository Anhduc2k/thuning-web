import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { categories, getCategory } from "@/lib/catalog";
import { getProducts } from "@/lib/products";

// Chữ kỹ thuật trên bản vẽ.
const lettering = Barlow_Condensed({ subsets: ["latin", "vietnamese"], weight: ["500", "600"] });

type Box = { x: number; y: number; w: number; h: number };
type Zone = { slug: string; box: Box; label: [number, number]; count?: [number, number, "end"?]; small?: boolean; draw: React.ReactNode };

// Nét vẽ: pathLength=1 để CSS vẽ dần từng nét khi tải trang.
const R = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} pathLength={1} />;
const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} pathLength={1} />;
const L = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} />;

// Mặt bằng xưởng: mỗi khu = một danh mục. Danh mục mới tạo trong CMS không có khu riêng ở đây (vẫn hiện ở menu, chân trang).
const zones: Zone[] = [
  {
    slug: "thiet-bi-day-nghe",
    box: { x: 40, y: 40, w: 430, h: 270 },
    label: [54, 70],
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
    slug: "co-khi-che-tao-may",
    box: { x: 490, y: 40, w: 270, h: 200 },
    label: [504, 70],
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
    slug: "tu-dien-bang-dien",
    box: { x: 490, y: 250, w: 158, h: 90 },
    label: [502, 278],
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
    slug: "thiet-bi-khac",
    box: { x: 656, y: 250, w: 104, h: 90 },
    label: [666, 278],
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
    slug: "bang-tai-cong-nghiep",
    box: { x: 130, y: 356, w: 630, h: 86 },
    label: [144, 384],
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
    const c = getCategory(z.slug);
    return c ? [{ ...z, name: c.name, n: products.filter((p) => p.category === z.slug).length }] : [];
  });

  return (
    <figure className="plan">
      <svg viewBox="0 -12 800 492" className={`${lettering.className} block w-full`} role="group" aria-label="Mặt bằng xưởng, mỗi khu là một nhóm thiết bị">
        <defs>
          <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" className="hatch-line" />
          </pattern>
        </defs>

        {/* Kích thước tổng (mm) và tường xưởng, chừa cửa ra vào ở góc dưới trái. */}
        <g className="dim" aria-hidden>
          <line x1="20" y1="10" x2="780" y2="10" />
          <line x1="20" y1="4" x2="20" y2="16" />
          <line x1="780" y1="4" x2="780" y2="16" />
          <text x="400" y="4" textAnchor="middle">38 000</text>
        </g>
        <g className="ln wall" aria-hidden style={{ "--d": "0s" } as React.CSSProperties}>
          <path d="M110 460 H780 V20 H20 V460 H50" pathLength={1} />
        </g>
        <path d="M50 460 A60 60 0 0 1 110 400" className="door" aria-hidden />

        {items.map((z, i) => (
          <Link key={z.slug} href={`/${z.slug}`} className="zone" aria-label={`${z.name}, ${z.n} sản phẩm`}>
            <rect className="hit" x={z.box.x} y={z.box.y} width={z.box.w} height={z.box.h} />
            <g className="ln" aria-hidden style={{ "--d": `${0.25 + i * 0.18}s` } as React.CSSProperties}>
              {z.draw}
            </g>
            <g className={z.small ? "zlabel sm" : "zlabel"} aria-hidden>
              <text className="zname" x={z.label[0]} y={z.label[1]}>{z.name}</text>
              <text className="zcount" x={(z.count ?? [z.label[0]])[0]} y={(z.count ?? [0, z.label[1] + 20])[1]} textAnchor={z.count?.[2] ?? "start"}>
                {z.n} sản phẩm
              </text>
            </g>
            <g className="callout" aria-hidden>
              <circle cx={z.box.x + z.box.w / 2} cy={z.box.y + z.box.h / 2} r="26" />
              <text x={z.box.x + z.box.w / 2} y={z.box.y + z.box.h / 2 + 11} textAnchor="middle">{i + 1}</text>
            </g>
          </Link>
        ))}
      </svg>

      {/* Màn hình nhỏ: chữ trên bản vẽ quá bé nên dùng số chú dẫn + bảng chú thích. */}
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
        const extra = categories.filter((c) => !zones.some((z) => z.slug === c.slug));
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
      <figcaption className="mt-3 text-sm text-steel">Chọn một khu trên mặt bằng xưởng để xem thiết bị.</figcaption>
    </figure>
  );
}
