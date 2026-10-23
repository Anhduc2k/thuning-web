import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Không tìm thấy trang</h1>
      <p className="mt-3 max-w-xl text-steel">Trang có thể đã đổi địa chỉ. Tìm thiết bị ở ô tìm kiếm phía trên hoặc gọi {site.phoneDisplay}.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-md bg-brand px-6 font-semibold text-white hover:bg-brand-dark">Về trang chủ</Link>
    </div>
  );
}
