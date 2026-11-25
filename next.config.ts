import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Cho phép mở bản dev qua IP mạng LAN (mặc định Next chặn JS/HMR khi không phải localhost).
  allowedDevOrigins: ["192.168.51.7"],
  partialPrefetching: true,
  // Trang quản trị CMS là file tĩnh public/admin/index.html; cho /admin mở thẳng nó (không thì rơi vào route [category] → 404).
  outputFileTracingExcludes: { "*": ["./public/**"] },
  rewrites: async () => [{ source: "/admin", destination: "/admin/index.html" }],
  // Sản phẩm biến tần từng có đường dẫn "bang-tai-…" (đổi 2026-11): giữ link cũ bằng 301.
  // Đổi đường dẫn danh mục / danh mục con thì src/proxy.ts tự lo, chỉ đổi tên file sản phẩm mới cần thêm vào đây.
  redirects: async () =>
    Object.entries({
      "bang-tai-cao-su-gan-vau": "bien-tan-easypower-ep800-1-5kw",
      "bang-tai-con-lan-cong-nghiep": "bien-tan-easypower-ep800-2-2kw",
      "bang-tai-luoi-inox-cho-day-chuyen-san-xuat": "bien-tan-easypower-ep800-4kw",
      "bang-tai-pvc-ban-thao-tac": "bien-tan-easypower-ep800-11kw",
      "bang-tai-xich-nhua-dang-luoi": "bien-tan-easypower-ep800-55kw",
    }).flatMap(([from, to]) =>
      ["bang-tai-cong-nghiep", "bien-tan-easypower"].map((cat) => ({
        source: `/${cat}/${from}`,
        destination: `/bien-tan-easypower/${to}`,
        statusCode: 301 as const,
      })),
    ),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
