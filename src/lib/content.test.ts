import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkPolicies, loadContent } from "./content.ts";

const categories = JSON.parse(readFileSync(join(process.cwd(), "content/categories.json"), "utf8"));
const product = { name: "Bộ thực hành PLC", model: "TH-1", category: "bang-tai-cong-nghiep", sub: "bang-tai-pvc", date: "2026-01-02" };
const post = { title: "Bài", date: "2026-01-02", topic: "Tin", excerpt: "Tóm tắt", body: "Đoạn 1\n\nĐoạn 2" };

// Tạo thư mục dự án tạm với vài file nội dung, trả về hàm load.
function site(products: Record<string, object>, posts: Record<string, object> = { bai: post }, cats = categories) {
  const root = mkdtempSync(join(tmpdir(), "content-"));
  for (const [dir, files] of Object.entries({ products, posts })) {
    mkdirSync(join(root, "content", dir), { recursive: true });
    for (const [slug, data] of Object.entries(files)) writeFileSync(join(root, "content", dir, `${slug}.json`), JSON.stringify(data));
  }
  mkdirSync(join(root, "public/uploads"), { recursive: true });
  writeFileSync(join(root, "public/uploads/a.jpg"), "");
  return () => loadContent(cats, root);
}

test("nội dung thật trong content/ hợp lệ", () => {
  const { products, posts } = loadContent(categories);
  assert.ok(products.length > 0 && posts.length > 0); // số lượng đổi theo CMS, chỉ cần tải được không lỗi
});

test("hợp lệ: trường tùy chọn, ảnh, liên kết", () => {
  const { products, posts } = site(
    { "san-pham": { ...product, images: ["/uploads/a.jpg"], specs: [{ label: "Điện áp", value: "220V" }], relatedPosts: ["bai"], summary: "" } },
    { bai: { ...post, image: "/uploads/a.jpg", relatedProducts: ["san-pham"] } },
  )();
  assert.equal(products[0].summary, undefined);
  assert.deepEqual(products[0].specs, [{ label: "Điện áp", value: "220V" }]);
  assert.deepEqual(posts[0].relatedProducts, ["san-pham"]);
});

const bad: [string, () => unknown, RegExp][] = [
  ["tên file có dấu/chữ hoa", site({ "Đồng-hồ": product }), /tên file phải không dấu/],
  ["slug sản phẩm trùng danh mục con", site({ "bang-tai-pvc": product }), /trùng đường dẫn danh mục con/],
  ["liên kết sản phẩm không tồn tại", site({ sp: { ...product, relatedProducts: ["khong-co"] } }), /"relatedProducts" trỏ tới sản phẩm không tồn tại/],
  ["liên kết bài viết không tồn tại", site({ sp: { ...product, relatedPosts: ["khong-co"] } }), /"relatedPosts" trỏ tới bài viết/],
  ["bài viết trỏ sản phẩm không tồn tại", site({ sp: product }, { bai: { ...post, relatedProducts: ["x"] } }), /posts\/bai\.json: trường "relatedProducts"/],
  ["ngày sai định dạng", site({ sp: { ...product, date: "02/01/2026" } }), /"date" "02\/01\/2026" phải là ngày có thật, dạng YYYY-MM-DD/],
  ["thiếu trường bắt buộc", site({ sp: { ...product, name: "" } }), /sp\.json: trường "name" đang để trống/],
  ["trùng mã sản phẩm", site({ a: product, b: product }), /"model" "TH-1" trùng/],
  ["ảnh ngoài /uploads", site({ sp: { ...product, images: ["https://x.vn/a.jpg"] } }), /phải là ảnh tải lên/],
  ["ảnh không tồn tại", site({ sp: { ...product, images: ["/uploads/khong-co.jpg"] } }), /không thấy file/],
];
for (const [name, load, msg] of bad) test(`từ chối: ${name}`, () => assert.throws(load, msg));

test("từ chối: ngày không có thật, tự liên kết, danh sách rỗng", () => {
  assert.throws(site({ a: { ...product, date: "2026-02-30" } }), /ngày có thật/);
  assert.throws(site({ a: { ...product, relatedProducts: ["a"] } }), /chính sản phẩm này/);
  assert.throws(site({ a: product }, {}), /ít nhất 1 bài viết/);
  assert.throws(site({}), /ít nhất 1 sản phẩm/);
});

test("chính sách: slug, trùng, trống", () => {
  const ok = { slug: "bao-mat", title: "Bảo mật", body: "Nội dung" };
  checkPolicies([ok]);
  assert.throws(() => checkPolicies([]), /ít nhất 1/);
  assert.throws(() => checkPolicies([{ ...ok, slug: "Bảo mật" }]), /không dấu/);
  assert.throws(() => checkPolicies([ok, ok]), /bị trùng/);
  assert.throws(() => checkPolicies([{ ...ok, body: " " }]), /"body" đang để trống/);
});

test("danh mục / danh mục con bị xóa trong CMS: không dừng build", () => {
  const { products } = site({
    a: { ...product, category: "khong-co" },
    b: { ...product, model: "TH-2", sub: "khong-co" },
    c: { ...product, model: "TH-3", relatedProducts: ["a", "b"] },
  })();
  assert.deepEqual(products.map((p) => p.slug).sort(), ["b", "c"]); // a tạm ẩn
  assert.equal(products.find((p) => p.slug === "b")!.sub, undefined); // b hiện thẳng dưới danh mục
  assert.deepEqual(products.find((p) => p.slug === "c")!.relatedProducts, ["b"]); // bỏ liên kết tới sản phẩm đang ẩn
});

test("đổi đường dẫn danh mục: sản phẩm tra theo id, nhận đường dẫn mới", () => {
  const cats = [{ id: "cu", slug: "moi", name: "Mới", icon: "box", intro: "x", highlights: [], subs: [{ id: "con-cu", slug: "con-moi", name: "Con" }] }];
  const { products } = site({ sp: { ...product, category: "cu", sub: "con-cu" } }, { bai: post }, cats)();
  assert.equal(products[0].category, "moi");
  assert.equal(products[0].sub, "con-moi");
  assert.throws(site({ sp: product }, { bai: post }, [...cats, { ...cats[0], slug: "khac" }]), /"id" "cu" bị trùng/);
});
