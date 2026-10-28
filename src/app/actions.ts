"use server";

import { parseLead, type LeadState } from "@/lib/lead";
import { site } from "@/lib/site";

// Form gửi về Google Sheets qua Apps Script (cách cài: docs/HUONG-DAN-FORM.md).
// LEADS_WEBHOOK_URL, LEADS_SECRET đặt trong Vercel → Settings → Environment Variables, không ghi vào code.
async function saveLead(data: ReturnType<typeof parseLead>["data"]) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    console.log("[lead] chưa đặt LEADS_WEBHOOK_URL, chỉ ghi log:", JSON.stringify(data));
    return process.env.NODE_ENV !== "production"; // máy dev: coi như gửi được; production thiếu cấu hình: báo lỗi cho khách gọi điện
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.LEADS_SECRET, ...data }),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await res.text();
    if (res.ok && text.trim() === "ok") return true;
    console.error("[lead] Google Sheets từ chối:", res.status, text.slice(0, 200), JSON.stringify(data));
  } catch (e) {
    console.error("[lead] không gửi được tới Google Sheets:", e, JSON.stringify(data));
  }
  return false;
}

export async function submitLead(_prev: LeadState, fd: FormData): Promise<LeadState> {
  const { data, errors } = parseLead(fd);
  if (Object.keys(errors).length) return { errors, values: data };
  if (!(await saveLead(data))) {
    // Không báo "đã gửi" khi chưa lưu được, để khách không bị bỏ sót.
    return { message: `Chưa gửi được, bạn vui lòng thử lại hoặc gọi ${site.phoneDisplay}.`, values: data };
  }
  return {
    ok: true,
    message:
      data.kind === "order"
        ? "Đã gửi yêu cầu. Chúng tôi sẽ gọi lại cho bạn trong giờ làm việc."
        : "Đã gửi tin nhắn. Chúng tôi sẽ trả lời qua email sớm nhất.",
  };
}
