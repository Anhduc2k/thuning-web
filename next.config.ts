import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
