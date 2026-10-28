// Không import alias ở file này để chạy được bằng `npm test`.
export type LeadKind = "order" | "contact";
// values: trả lại những gì khách đã nhập, vì React xoá trắng form sau mỗi lần gửi.
export type LeadState = { ok?: boolean; message?: string; errors?: Record<string, string>; values?: Record<string, string> };

const str = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export function parseLead(fd: FormData) {
  const kind: LeadKind = fd.get("kind") === "contact" ? "contact" : "order";
  const data = {
    kind,
    name: str(fd.get("name"), 100),
    phone: str(fd.get("phone"), 20).replace(/[\s.\-]/g, ""),
    email: str(fd.get("email"), 120),
    address: str(fd.get("address"), 200),
    subject: str(fd.get("subject"), 150),
    message: str(fd.get("message"), 2000),
    product: str(fd.get("product"), 200),
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Nhập họ tên của bạn.";
  if (kind === "order" && !/^(0|\+84)\d{9}$/.test(data.phone))
    errors.phone = "Số điện thoại gồm 10 số, ví dụ 0986666839.";
  if (kind === "contact" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Email chưa đúng định dạng.";
  if (kind === "contact" && data.message.length < 5) errors.message = "Nhập nội dung cần trao đổi.";
  return { data, errors };
}
