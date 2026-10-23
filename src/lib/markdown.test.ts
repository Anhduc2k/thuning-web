import { test } from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "./markdown.ts";

test("markdown: giữ định dạng thường", () => {
  const h = renderMarkdown("## Tiêu đề\n\n- **đậm** [link](https://a.vn) [tel](tel:0986) ![ảnh](/uploads/a.webp)");
  assert.match(h, /<h2>Tiêu đề<\/h2>/);
  assert.match(h, /<strong>đậm<\/strong>/);
  assert.match(h, /href="https:\/\/a.vn"/);
  assert.match(h, /href="tel:0986"/);
  assert.match(h, /src="\/uploads\/a.webp"/);
});

test("markdown: HTML thô và link javascript không chạy được", () => {
  const h = renderMarkdown('<script>alert(1)</script>\n\nchữ <img src=x onerror=alert(1)> [x](javascript:alert(1)) [y](jav&#x61;script:alert(1)) ![z](data:text/html,1)');
  // Không còn thẻ/thuộc tính chạy được: chỉ chữ đã escape và link/ảnh trỏ "#".
  assert.doesNotMatch(h, /<script|<img src=x|<img[^>]*onerror|(href|src)="(javascript|data|jav)/i);
  assert.equal((h.match(/href="#"/g) ?? []).length, 2);
  assert.match(h, /&#60;script&#62;/);
});
