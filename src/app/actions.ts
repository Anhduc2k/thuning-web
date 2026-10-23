"use server";

import { parseLead, type LeadState } from "@/lib/lead";

export async function submitLead(_prev: LeadState, fd: FormData): Promise<LeadState> {
  const { data, errors, sent } = parseLead(fd);
  if (Object.keys(errors).length) return { errors };
  // ponytail: chỉ ghi log server. Nối email (Resend/SMTP), Google Sheets hoặc CRM tại đây.
  console.log("[lead]", JSON.stringify(data));
  return { ok: true, message: sent };
}
