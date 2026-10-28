# Nhận thông tin form về Google Sheets

Hai form trên website gửi về cùng một Google Sheet, mỗi lần gửi là một dòng mới:

- **Liên hệ** (trang /lien-he)
- **Nhận báo giá** (trang chi tiết sản phẩm)

Nếu Google Sheets lỗi, khách sẽ thấy dòng "Chưa gửi được… gọi <số hotline>". Website không báo "đã gửi" khi thông tin chưa được lưu.

## Bước 1. Tạo Google Sheet và dán Apps Script

1. Tạo một Google Sheet mới, ví dụ đặt tên "Khách hàng từ website".
2. Vào **Tệp → Cài đặt → Múi giờ**, chọn **(GMT+07:00) Bangkok/Hà Nội**. Cột thời gian sẽ hiện đúng giờ Việt Nam.
3. Vào **Tiện ích mở rộng → Apps Script**. Xoá hết code có sẵn, dán đoạn dưới vào.
4. Ở dòng `SECRET`, thay `DOI-THANH-CHUOI-BI-MAT` bằng một chuỗi ngẫu nhiên dài, ví dụ chạy `openssl rand -hex 16` trong Terminal. Ghi chuỗi này lại để dùng ở Bước 3.
5. Bấm **Lưu**.

```js
const SECRET = "DOI-THANH-CHUOI-BI-MAT";
const HEADERS = ["Thời gian", "Loại", "Họ tên", "Số điện thoại", "Email", "Địa chỉ", "Tiêu đề", "Nội dung", "Sản phẩm"];

// Chặn ô bắt đầu bằng = + - @ để nội dung khách gõ không thành công thức trong bảng tính.
const safe = (v) => (/^[=+\-@]/.test(v || "") ? "'" + v : v || "");

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return ContentService.createTextOutput("forbidden");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.appendRow([
    new Date(),
    d.kind === "contact" ? "Liên hệ" : "Báo giá",
    safe(d.name),
    "'" + (d.phone || ""), // giữ số 0 ở đầu
    safe(d.email),
    safe(d.address),
    safe(d.subject),
    safe(d.message),
    safe(d.product),
  ]);
  return ContentService.createTextOutput("ok");
}
```

## Bước 2. Triển khai thành Web app

1. Trong Apps Script, bấm **Triển khai → Tùy chọn triển khai mới**.
2. Ở **Chọn loại**, chọn biểu tượng bánh răng, rồi chọn **Ứng dụng web**.
3. Đặt như sau:
   - **Thực thi với tư cách:** Tôi (tài khoản của bạn).
   - **Người có quyền truy cập:** Bất kỳ ai.
4. Bấm **Triển khai**, rồi **Cấp quyền truy cập** và đăng nhập Google.
   - Nếu hiện "Google chưa xác minh ứng dụng này", bấm **Nâng cao → Đi tới … (không an toàn)**. Đây là script của chính bạn.
5. Copy **URL ứng dụng web**. URL có dạng `https://script.google.com/macros/s/…/exec`.

"Bất kỳ ai" chỉ có nghĩa là website gửi được dữ liệu vào. Không ai xem được Sheet của bạn. Những lần gửi không có đúng chuỗi `SECRET` sẽ bị từ chối.

## Bước 3. Khai báo trên Vercel

1. Vào Vercel → project **thuning-web** → **Settings → Environments**, bấm vào dòng **Production**. Tìm phần **Environment Variables** và bấm **Add**. Nếu không thấy, gõ "Environment Variables" vào ô **Find** ở góc trên bên trái.
2. Thêm 2 biến (bật **Sensitive** nếu có):

   | Tên | Giá trị |
   |---|---|
   | `LEADS_WEBHOOK_URL` | URL `…/exec` ở Bước 2 |
   | `LEADS_SECRET` | Chuỗi bí mật ở Bước 1 (giống hệt trong script) |

3. Vào **Deployments**, bấm **⋯** ở bản mới nhất, chọn **Redeploy**. Biến mới chỉ có hiệu lực sau khi deploy lại.

Không ghi hai giá trị này vào code hoặc file trong repo, vì repo đang để công khai.

## Bước 4. Thử

Gửi thử form ở /lien-he, sau khoảng 1–2 giây Sheet sẽ có dòng mới.

| Website báo | Cách xử lý |
|---|---|
| "Chưa gửi được" | Vào Vercel → **Logs**, tìm dòng `[lead]`. Thông tin khách cũng nằm trong log này. |
| Log có `forbidden` | `LEADS_SECRET` trên Vercel và `SECRET` trong script chưa giống nhau. |
| Log có `401` / `403` / trang HTML | Web app chưa để "Bất kỳ ai", hoặc URL sai. |

**Sửa script sau này:** chọn **Triển khai → Quản lý các bản triển khai → ✏️ → Phiên bản: Phiên bản mới → Triển khai**. URL giữ nguyên.
