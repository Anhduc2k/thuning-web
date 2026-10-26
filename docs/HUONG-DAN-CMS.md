# Hướng dẫn quản trị nội dung (CMS)

Trang quản trị: **https://thuning.edu.vn/admin**

Ở đây bạn sửa được: sản phẩm, bài viết (tin tức), danh mục, thông tin công ty và các trang chính sách. Không cần biết lập trình.

Cách hoạt động, nói ngắn gọn: mỗi lần bấm **Lưu**, nội dung được ghi vào kho mã nguồn (GitHub) của website. Máy chủ thấy có thay đổi sẽ tự dựng lại website, khoảng **1–2 phút** sau trang mới hiện ra cho khách.

---

## 1. Đăng nhập

Mở https://thuning.edu.vn/admin bằng **Chrome** hoặc **Edge** (máy tính).

Giao diện tự chuyển sang tiếng Việt. Nếu hiện thông báo tiếng Anh "Sveltia CMS is now available in English", bấm **Later** để giữ tiếng Việt. Đổi ngôn ngữ sau này: bấm nút tài khoản góc trên bên phải → Cài đặt.

Có hai cách đăng nhập, người quản trị kỹ thuật sẽ cho bạn biết dùng cách nào:

### Cách A – Mã truy cập (dùng được ngay)

1. Người quản trị kỹ thuật tạo cho bạn một **mã truy cập GitHub** (một chuỗi dài bắt đầu bằng `github_pat_…`).
2. Ở trang /admin bấm **Đăng nhập bằng mã truy cập**, dán mã vào, bấm **Đăng nhập**.
3. Trình duyệt sẽ nhớ, lần sau không phải nhập lại. **Không gửi mã này cho ai** – ai có mã là sửa được website.

### Cách B – Nút "Đăng nhập bằng GitHub"

Chỉ dùng được khi người quản trị kỹ thuật đã cài dịch vụ đăng nhập riêng (xem mục 9). Bấm nút, đăng nhập tài khoản GitHub được cấp quyền là xong.

---

## 2. Sản phẩm

Menu bên trái → **Sản phẩm**.

### Thêm sản phẩm

1. Bấm **Tạo mới**.
2. Điền các ô có dấu `*` (bắt buộc):
   - **Tên sản phẩm** – ví dụ "Đồng hồ đo điện năng 3 pha". Đường dẫn trên web được tạo tự động từ tên, bỏ dấu: `/bang-tai-cong-nghiep/dong-ho-do-dien-nang-3-pha`. **Đường dẫn chỉ tạo một lần**, sửa tên sau này không đổi đường dẫn. Vì vậy hãy gõ đúng tên ngay từ đầu.
   - **Mã sản phẩm** – ví dụ THA-120. Không được trùng mã sản phẩm khác.
   - **Danh mục**, **Danh mục con** (nếu có). Danh mục con phải thuộc đúng danh mục đã chọn.
   - **Ngày đăng** – mặc định hôm nay. Sản phẩm mới hơn hiện trước.
3. Các ô không bắt buộc:
   - **Gắn nhãn Mới / Nổi bật / Bán chạy** – quyết định sản phẩm có hiện ở trang chủ không.
   - **Ảnh sản phẩm** – xem mục 4. Ảnh đầu tiên là ảnh đại diện; kéo biểu tượng ⠿ để đổi thứ tự.
   - **Mô tả ngắn** – 1–2 câu, hiện ngay dưới tên và là đoạn mô tả trên Google.
   - **Mô tả chi tiết** – nội dung mục "Mô tả sản phẩm". Có thanh công cụ in đậm, gạch đầu dòng, tiêu đề, chèn ảnh… Để trống thì website tự hiện đoạn giới thiệu chung của danh mục.
   - **Thông số kỹ thuật** – bấm **Thêm thông số**, điền *Tên thông số* (Điện áp) và *Giá trị* (220V/50Hz). Các dòng này nối vào cuối bảng "Thông số chung".
   - **Sản phẩm liên quan** – chọn các sản phẩm muốn hiện ở mục "Sản phẩm tương tự". Để trống thì website tự chọn sản phẩm cùng danh mục.
   - **Bài viết liên quan** – chọn bài viết sẽ hiện ở mục "Bài viết liên quan" trên trang sản phẩm.
4. Bấm **Lưu**.

### Sửa sản phẩm

Bấm vào sản phẩm trong danh sách → sửa → **Lưu**. Ô tìm kiếm phía trên giúp tìm nhanh theo tên.

### Xóa sản phẩm

Tích ô vuông đầu dòng sản phẩm → **Xóa** → xác nhận. Đường dẫn cũ của sản phẩm sẽ không còn.
Lưu ý: nếu sản phẩm đó đang được chọn trong "Sản phẩm liên quan" của sản phẩm hoặc bài viết khác, phải bỏ chọn ở đó trước, nếu không website sẽ không cập nhật (xem mục 7).

---

## 3. Bài viết (Tin tức)

Menu bên trái → **Bài viết**. Thêm / sửa / xóa giống sản phẩm.

- **Tiêu đề** – đường dẫn tạo tự động từ tiêu đề lúc tạo, sau đó không đổi.
- **Ngày đăng**, **Chủ đề** (ví dụ "Đào tạo nghề", "Hướng dẫn").
- **Ảnh bìa** – không bắt buộc. Hiện đầu bài và trong danh sách tin tức.
- **Tóm tắt** – 1–2 câu, hiện ở danh sách bài và trên Google.
- **Nội dung** – mỗi đoạn cách nhau một dòng trống. Dùng nút định dạng (mũi tên cạnh "Đoạn văn") để tạo **Tiêu đề 2**, **Tiêu đề 3** chia mục; có in đậm, danh sách, liên kết, chèn ảnh.
- **Sản phẩm liên quan** – hiện cuối bài thành lưới sản phẩm.

---

## 4. Ảnh

- Tải ảnh ngay trong ô ảnh: **Duyệt tệp** → **Tải lên** → chọn ảnh trên máy → **Chèn**. Ảnh đã tải trước đó cũng hiện trong cửa sổ này để chọn lại.
- Hệ thống tự đổi tên file sang không dấu và tự chuyển ảnh sang định dạng WebP, thu nhỏ tối đa 1600px cho nhẹ. Ảnh tối đa 15 MB.
- Khuyến nghị:
  - **Ảnh sản phẩm**: ảnh vuông, nền trắng hoặc sáng, rộng 1200–1600px, JPG hoặc PNG. Thiết bị nằm giữa ảnh.
  - **Ảnh bìa bài viết**: ảnh ngang tỉ lệ 16:9, rộng khoảng 1600px.
- Không dán link ảnh từ website khác – chỉ dùng ảnh tải lên.

---

## 5. Danh mục

Menu bên trái → **Danh mục**. Mỗi danh mục gồm: đường dẫn, tên, biểu tượng, đoạn giới thiệu, các điểm nổi bật và danh sách danh mục con.

- Sửa **tên**, **giới thiệu**, **điểm nổi bật**, **biểu tượng** thoải mái.
- **Đường dẫn** (của danh mục và danh mục con): phần địa chỉ trang, dạng chữ thường không dấu nối bằng gạch ngang, ví dụ `bang-tai-xich`. **Sửa được**: địa chỉ của danh mục và mọi sản phẩm trong nó tự đổi theo, link cũ tự chuyển sang link mới. Mỗi danh mục còn có ô **Mã** tự sinh, không đổi; sản phẩm gắn với danh mục qua mã này nên đổi tên hay đường dẫn đều không làm mất sản phẩm.
- Thứ tự danh mục trong danh sách = thứ tự trên menu website.
- Xóa một danh mục còn sản phẩm → website sẽ không cập nhật cho đến khi chuyển hết sản phẩm sang danh mục khác.
- Menu đầu trang tự lấy danh mục theo đúng thứ tự trong CMS: thêm mới thì tự hiện, đổi tên thì đổi theo, xóa thì tự ẩn. Trên máy tính, các danh mục nằm trong bảng **Sản phẩm** thả xuống (kèm danh mục con); trên điện thoại nằm trong menu ☰. Danh mục mới cũng hiện ở cây danh mục, chân trang và ngay dưới bản vẽ mặt bằng ở trang chủ.

---

## 6. Cài đặt: thông tin công ty và chính sách

Menu bên trái → **Cài đặt**:

- **Thông tin công ty**: tên, địa chỉ, số điện thoại, email, Facebook, YouTube, Zalo, tài khoản ngân hàng, địa điểm bản đồ. Sửa ở đây là đổi trên toàn website (đầu trang, chân trang, trang Liên hệ…). Khi đổi số điện thoại, nhớ sửa luôn ô **Zalo** (link dạng `https://zalo.me/<số>`), vì đó là ô riêng.
  - *Số điện thoại (để gọi)* chỉ gồm chữ số, ví dụ `0986666839`; *Số điện thoại (hiển thị)* là cách viết cho dễ đọc, ví dụ `098.6666.839`.
  - *Địa chỉ website*: chỉ sửa khi đổi tên miền.
- **Chính sách**: các trang ở chân trang (Hướng dẫn mua hàng, Bảo mật thông tin…). Sửa tiêu đề và nội dung; đoạn đầu tiên dùng làm mô tả trên Google. Không sửa đường dẫn của chính sách đã có.

---

## 7. Sau khi bấm Lưu

1. Góc dưới hiện "Đã lưu bài viết".
2. Đợi khoảng **1–2 phút**, tải lại trang trên website để xem.

**Đợi quá 5 phút mà website chưa đổi?** Rất có thể nội dung vừa lưu có lỗi và website **từ chối cập nhật** – bản cũ vẫn chạy bình thường, khách không thấy lỗi. Các lỗi hay gặp:

- Sản phẩm/bài viết đang chọn "liên quan" tới một mục đã bị xóa.
- Danh mục con không thuộc danh mục đã chọn.
- Mã sản phẩm trùng với sản phẩm khác.
- Đường dẫn sản phẩm trùng với đường dẫn một danh mục con cùng danh mục.
- (Không còn gây lỗi) Xóa danh mục con: sản phẩm của nó tự hiện thẳng dưới danh mục cha. Xóa cả danh mục: sản phẩm của nó tạm ẩn khỏi website cho tới khi được chọn danh mục khác.

Kiểm tra lại các ô trên ở mục vừa sửa, sửa rồi Lưu lại. Nếu không tìm ra, báo người quản trị kỹ thuật kèm tên mục vừa sửa – họ xem được thông báo lỗi ghi rõ file và ô bị sai (ví dụ `content/products/abc.json: trường "sub" ... không thuộc danh mục ...`).

---

## 8. Chạy thử trên máy (không ảnh hưởng website thật)

Dành cho người có mã nguồn trên máy:

1. Mở Terminal trong thư mục dự án, chạy `npm run dev`.
2. Mở **Chrome**: http://localhost:3000/admin
3. Bấm **Làm việc với kho mã nguồn cục bộ** (Work with Local Repository) → chọn thư mục dự án → cho phép Chrome đọc/ghi.
4. Sửa và Lưu như bình thường: CMS ghi thẳng vào file trên máy, chưa lên GitHub. Tải lại trang website ở localhost:3000 để xem. Muốn đưa lên website thật thì commit và push như thường lệ.

---

## 9. Phần dành cho lập trình viên

### Cấu trúc nội dung

| File | Nội dung | Ai đọc |
| --- | --- | --- |
| `content/products/<slug>.json` | 1 sản phẩm/file; tên file = slug = URL `/<category>/<slug>` | `src/lib/products.ts` (server, `node:fs`) |
| `content/posts/<slug>.json` | 1 bài/file; `body` là Markdown | `src/lib/posts.ts` |
| `content/categories.json` | mảng danh mục `{slug, name, icon, intro, highlights[], subs[{slug,name,icon?}]}` | `src/lib/catalog.ts` (import JSON tĩnh – file này chạy cả ở client, **không được dùng fs**) |
| `content/site.json`, `content/policies.json` | thông tin công ty; mảng chính sách `{slug,title,body}` | `src/lib/site.ts` (import tĩnh) |
| `public/uploads/` | ảnh tải lên từ CMS (`/uploads/...`) | |
| `public/admin/index.html`, `public/admin/config.yml` | Sveltia CMS (bản ghim `@sveltia/cms@0.247.0` trên unpkg) và cấu hình | `/admin` (rewrite trong `next.config.ts`) |

Trường tùy chọn CMS để trống được ghi là `""` hoặc `[]`; code coi như không có.

### Kiểm tra khi build

`loadContent()` trong `src/lib/content.ts` chạy khi build (gọi qua `getContent()` trong `products.ts`, đọc một lần khi build, đọc lại mỗi request khi dev). Sai thì ném `Error` tiếng Việt nêu file + trường, build dừng → bản deploy trước vẫn chạy. Kiểm tra:

- tên file dạng `^[a-z0-9]+(-[a-z0-9]+)*$`; JSON đọc được;
- trường bắt buộc có và đúng kiểu; `date` dạng `YYYY-MM-DD`;
- `category` tồn tại, `sub` thuộc category, slug sản phẩm ≠ slug danh mục con cùng category (trùng route);
- `model` không trùng; `relatedProducts`/`relatedPosts` trỏ tới mục tồn tại;
- ảnh bắt đầu bằng `/uploads/` và file có trong `public/`;
- slug danh mục hợp lệ, không trùng nhau, không trùng route tĩnh (`tin-tuc`, `lien-he`, `admin`…).

Test: `npm test` (`node --test src/lib/*.test.ts`, cần Node ≥ 23 để chạy TypeScript trực tiếp) – `src/lib/content.test.ts`.

### Thêm một trường mới (ví dụ "Bảo hành" cho sản phẩm)

1. `public/admin/config.yml`: thêm vào `fields` của collection `products`, ví dụ `- { name: warranty, label: Bảo hành, widget: string, required: false }`.
2. `src/lib/catalog.ts`: thêm `warranty?: string` vào type `Product`.
3. `src/lib/content.ts` (`loadContent`): thêm `warranty: str(where, o, "warranty", false)` vào object sản phẩm trả về (trường không khai báo ở đây sẽ bị bỏ qua).
4. Hiển thị trong `src/app/[category]/[slug]/page.tsx`.
5. `npx tsc --noEmit && npm test && npx next build`.

Tên trường trong CMS (`name`) phải trùng với khóa trong JSON. Tra tùy chọn widget tại https://sveltiacms.app/en/docs (đúng phiên bản đang ghim).

### Đăng nhập cho khách hàng

Mặc định nút "Sign In with GitHub" dùng dịch vụ OAuth của Netlify – không dùng. Hai cách:

**(a) Personal Access Token – không cần máy chủ.** Tạo fine-grained token tại https://github.com/settings/personal-access-tokens/new: *Repository access* → chỉ repo `Anhduc2k/thuning-web`; *Permissions* → **Contents: Read and write** (Metadata: Read tự bật); đặt hạn dùng. Gửi token cho khách qua kênh riêng; khách dán vào "Đăng nhập bằng mã truy cập". Thu hồi = xóa token trên GitHub. Mọi commit sẽ mang tên chủ token.

**(b) Cloudflare Worker `sveltia-cms-auth` – để khách dùng tài khoản GitHub của họ** (khách cần là collaborator có quyền ghi repo):

1. Deploy https://github.com/sveltia/sveltia-cms-auth (nút "Deploy to Cloudflare Workers" trong README hoặc `wrangler deploy`). URL dạng `https://sveltia-cms-auth.<subdomain>.workers.dev`.
2. Tạo GitHub OAuth App tại https://github.com/settings/applications/new, *Authorization callback URL* = `<URL Worker>/callback`; tạo Client Secret.
3. Trong Cloudflare → Worker → Settings → Variables: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (chọn Encrypt), `ALLOWED_DOMAINS=thuning.edu.vn`.
4. Trong `public/admin/config.yml` bỏ dấu `#` ở dòng `base_url:` dưới `backend`, điền URL Worker, commit.

### Lỗi "trùng đường dẫn" khi lưu sản phẩm
Đường dẫn của sản phẩm được tạo **một lần** từ tên lúc tạo mới, sau đó không đổi (đổi tên sau này không làm hỏng link cũ). Nếu website báo sản phẩm *trùng đường dẫn danh mục con* hoặc trùng một sản phẩm khác: xóa sản phẩm vừa tạo rồi tạo lại với tên khác đi một chút (ví dụ thêm mã model vào cuối tên), sau đó có thể đổi lại tên hiển thị như ý.
