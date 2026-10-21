import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLead } from "./lead.ts";

const fd = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.set(k, v);
  return f;
};

test("order: hợp lệ, chuẩn hóa số điện thoại", () => {
  const { data, errors } = parseLead(fd({ kind: "order", name: "Nguyễn Văn A", phone: "098.6666.839" }));
  assert.deepEqual(errors, {});
  assert.equal(data.phone, "0986666839");
});

test("order: thiếu tên, sai số", () => {
  const { errors } = parseLead(fd({ kind: "order", name: " ", phone: "12345" }));
  assert.ok(errors.name && errors.phone);
});

test("contact: cần email và nội dung, không cần số điện thoại", () => {
  assert.deepEqual(parseLead(fd({ kind: "contact", name: "An", email: "a@b.vn", message: "Báo giá" })).errors, {});
  const { errors } = parseLead(fd({ kind: "contact", name: "An", email: "ab", message: "" }));
  assert.ok(errors.email && errors.message && !errors.phone);
});
