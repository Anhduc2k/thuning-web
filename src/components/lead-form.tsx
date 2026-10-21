"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions";
import type { LeadKind, LeadState } from "@/lib/lead";

const fields: Record<LeadKind, { name: string; label: string; type?: string; area?: boolean; required?: boolean }[]> = {
  order: [
    { name: "name", label: "Họ tên", required: true },
    { name: "phone", label: "Số điện thoại", type: "tel", required: true },
    { name: "address", label: "Đơn vị / địa chỉ giao hàng" },
    { name: "message", label: "Ghi chú (số lượng, cấu hình…)", area: true },
  ],
  contact: [
    { name: "name", label: "Họ tên", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Số điện thoại", type: "tel" },
    { name: "subject", label: "Tiêu đề" },
    { name: "message", label: "Nội dung", area: true, required: true },
  ],
};

export function LeadForm({ kind, product, submitLabel, dark = false }: { kind: LeadKind; product?: string; submitLabel: string; dark?: boolean }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, {});

  if (state.ok) {
    return <p role="status" className={`border-l-4 border-green-600 p-4 ${dark ? "bg-white/10 text-white" : "bg-green-50"}`}>{state.message}</p>;
  }

  const input = `w-full rounded-md border px-3 py-2.5 text-[15px] focus:outline-none ${dark ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white" : "border-line bg-white focus:border-ink"}`;

  return (
    <form action={action} className="grid gap-3" noValidate>
      <input type="hidden" name="kind" value={kind} />
      {product && <input type="hidden" name="product" value={product} />}
      {fields[kind].map((f) => {
        const err = state.errors?.[f.name];
        const id = `${kind}-${f.name}`;
        return (
          <div key={f.name}>
            <label htmlFor={id} className={`mb-1 block text-sm font-medium ${dark ? "text-white/80" : ""}`}>
              {f.label}{f.required && <span className="text-brand"> *</span>}
            </label>
            {f.area ? (
              <textarea id={id} name={f.name} rows={4} className={input} aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} />
            ) : (
              <input id={id} name={f.name} type={f.type ?? "text"} className={input} aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} autoComplete={f.name === "name" ? "name" : f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined} />
            )}
            {err && <p id={`${id}-err`} className={`mt-1 text-sm ${dark ? "text-signal" : "text-brand"}`}>{err}</p>}
          </div>
        );
      })}
      <button disabled={pending} className="mt-1 h-11 rounded-md bg-brand px-6 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
        {pending ? "Đang gửi…" : submitLabel}
      </button>
    </form>
  );
}
