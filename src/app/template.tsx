import { ViewTransition } from "react";

// Template được dựng lại mỗi lần chuyển trang → ô 1px này "xuất hiện" và báo React chạy hiệu ứng chuyển trang.
// Hiệu ứng đặt trên cả màn hình (::view-transition-*(root) trong globals.css), không đặt trên nội dung trang:
// Next cuộn trang mới lên đầu sau khi trình duyệt chụp hình, nên hình chụp riêng phần nội dung sẽ bị lệch.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViewTransition enter="page" default="none">
        <span aria-hidden className="pointer-events-none fixed left-0 top-0 size-px" />
      </ViewTransition>
      {children}
    </>
  );
}
