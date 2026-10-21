"use server";

import { parseLead, type LeadState } from "@/lib/lead";

export async function submitLead(_prev: LeadState, fd: FormData): Promise<LeadState> {
  const { data, errors } = parseLead(fd);
  if (Object.keys(errors).length) return { errors };
  // ponytail: chỉ ghi log server. Nối email (Resend/SMTP), Google Sheets hoặc CRM tại đây.
  console.log("[lead]", JSON.stringify(data));
  return {
    ok: true,
    message:
      data.kind === "order"
        ? "Đã gửi yêu cầu. Chúng tôi sẽ gọi lại cho bạn trong giờ làm việc."
        : "Đã gửi tin nhắn. Chúng tôi sẽ trả lời qua email sớm nhất.",
  };
}
