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
