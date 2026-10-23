// Không import alias ở file này để chạy được bằng `npm test`.
export type LeadKind = "order" | "contact";
export type LeadState = { ok?: boolean; message?: string; errors?: Record<string, string> };

// Thông báo theo ngôn ngữ trang: form gửi kèm trường ẩn `locale` (Server Action không đọc được lang()).
const vi = {
  name: "Nhập họ tên của bạn.",
  phone: "Số điện thoại gồm 10 số, ví dụ 0986666839.",
  email: "Email chưa đúng định dạng.",
  message: "Nhập nội dung cần trao đổi.",
  order: "Đã gửi yêu cầu. Chúng tôi sẽ gọi lại cho bạn trong giờ làm việc.",
  contact: "Đã gửi tin nhắn. Chúng tôi sẽ trả lời qua email sớm nhất.",
};
const en: typeof vi = {
  name: "Please enter your name.",
  phone: "Phone number must have 10 digits, e.g. 0986666839.",
  email: "Please enter a valid email address.",
  message: "Please enter your message.",
  order: "Request sent. We will call you back during business hours.",
  contact: "Message sent. We will reply by email as soon as possible.",
};

const str = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export function parseLead(fd: FormData) {
  const kind: LeadKind = fd.get("kind") === "contact" ? "contact" : "order";
  const locale = fd.get("locale") === "en" ? "en" : "vi";
  const data = {
    kind,
    locale,
    name: str(fd.get("name"), 100),
    phone: str(fd.get("phone"), 20).replace(/[\s.\-]/g, ""),
    email: str(fd.get("email"), 120),
    address: str(fd.get("address"), 200),
    subject: str(fd.get("subject"), 150),
    message: str(fd.get("message"), 2000),
    product: str(fd.get("product"), 200),
  };
  const m = locale === "en" ? en : vi;
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = m.name;
  if (kind === "order" && !/^(0|\+84)\d{9}$/.test(data.phone)) errors.phone = m.phone;
  if (kind === "contact" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = m.email;
  if (kind === "contact" && data.message.length < 5) errors.message = m.message;
  return { data, errors, sent: m[kind] };
}
