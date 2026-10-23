export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  topic: string;
  excerpt: string;
  body: string[];
  image?: string;
};

// Bài viết mẫu. Thay bằng nội dung thật hoặc nối với CMS.
export const posts: Post[] = [
  {
    slug: "thiet-bi-thuc-hanh-dien-thong-minh-thay-doi-gio-hoc-nghe",
    title: "Thiết bị thực hành điện thông minh thay đổi giờ học nghề như thế nào",
    date: "2026-09-18",
    topic: "Đào tạo nghề",
    excerpt:
      "Khi bàn thực hành ghi lại từng thao tác đấu nối, giáo viên biết ngay học viên sai ở đâu thay vì chờ đến lúc chấm bài.",
    body: [
      "Giờ thực hành điện truyền thống thường diễn ra theo một nhịp quen thuộc: giáo viên làm mẫu, học viên đấu nối, rồi giáo viên đi từng bàn kiểm tra. Với lớp 30 học viên, phần lớn thời gian của giáo viên dành cho việc đi kiểm tra chứ không phải giải thích.",
      "Bàn thực hành thông minh đặt cảm biến tại các điểm đấu nối và gửi trạng thái về máy tính của giáo viên. Mạch nào đấu sai, thiếu dây hay chưa cấp nguồn đều hiển thị trên màn hình tổng, nên giáo viên đến đúng bàn cần hỗ trợ.",
      "Hệ thống cũng khóa nguồn khi phát hiện đấu nối nguy hiểm, giúp học viên mới làm quen với điện công nghiệp được thử sai mà không gây chập cháy.",
      "Dữ liệu từng buổi được lưu lại, nên nhà trường có căn cứ để đánh giá kỹ năng của từng học viên thay vì chỉ dựa vào bài kiểm tra cuối khóa.",
    ],
  },
  {
    slug: "phong-thuc-hanh-thong-minh-gom-nhung-thanh-phan-nao",
    title: "Phòng thực hành thông minh gồm những thành phần nào",
    date: "2026-08-27",
    topic: "Giải pháp",
    excerpt:
      "Một phòng thực hành thông minh không chỉ là bàn thiết bị: còn có bàn giáo viên, mạng kết nối và phần mềm quản lý buổi học.",
    body: [
      "Thành phần đầu tiên là bàn thực hành của học viên, nơi gắn các module thiết bị thật như aptomat, contactor, PLC, biến tần hay cảm biến, tùy theo nghề đào tạo.",
      "Thành phần thứ hai là bàn điều khiển giáo viên. Từ đây giáo viên cấp hoặc cắt nguồn từng bàn, giao bài và theo dõi trạng thái thực hành của cả lớp.",
      "Thứ ba là hạ tầng kết nối giữa các bàn, thường là mạng công nghiệp có dây để ổn định trong môi trường xưởng.",
      "Cuối cùng là phần mềm: quản lý bài thực hành, lưu kết quả và xuất báo cáo. Khi lựa chọn, nhà trường nên hỏi rõ phần mềm có cập nhật được bài mới hay không, để phòng thực hành không bị lạc hậu sau vài năm.",
    ],
  },
  {
    slug: "thiet-bi-dao-tao-thuc-hanh-thong-minh-dung-cho-nganh-nao",
    title: "Thiết bị đào tạo thực hành thông minh dùng cho những ngành nào",
    date: "2026-08-05",
    topic: "Đào tạo nghề",
    excerpt:
      "Điện công nghiệp, điện dân dụng, tự động hóa và điện lạnh là các nghề hưởng lợi rõ nhất từ thiết bị thực hành có kết nối.",
    body: [
      "Các nghề có thao tác đấu nối và vận hành thiết bị điện là nhóm phù hợp nhất: điện công nghiệp, điện dân dụng, điện lạnh, cơ điện tử và tự động hóa.",
      "Với nghề tự động hóa, học viên lập trình PLC và quan sát ngay tác động lên mô hình băng tải, cánh tay robot hay trạm phân loại sản phẩm.",
      "Các nghề cơ khí và ô tô dùng mô hình cắt bổ, mô hình tháo lắp để hiểu cấu tạo trước khi làm việc trên máy thật.",
      "Nhà trường nên bắt đầu từ nghề có số học viên đông nhất, sau đó mở rộng dần để tận dụng chung bàn giáo viên và phần mềm quản lý.",
    ],
  },
  {
    slug: "huong-dan-ket-noi-bo-thuc-hanh-plc-voi-phan-mem-iot",
    title: "Hướng dẫn kết nối bộ thực hành PLC với phần mềm giám sát IoT",
    date: "2026-07-14",
    topic: "Hướng dẫn",
    excerpt:
      "Các bước cơ bản để bộ thực hành PLC gửi dữ liệu lên phần mềm giám sát, lấy ví dụ bài điều khiển đèn giao thông.",
    body: [
      "Bước 1: Đặt địa chỉ IP cho PLC và máy tính cùng một dải mạng, kiểm tra kết nối bằng lệnh ping trước khi mở phần mềm lập trình.",
      "Bước 2: Viết chương trình điều khiển đèn giao thông với ba trạng thái xanh, vàng, đỏ và các bộ định thời tương ứng. Khai báo các biến cần giám sát vào vùng nhớ có thể đọc từ bên ngoài.",
      "Bước 3: Trên phần mềm giám sát, tạo kết nối tới PLC theo giao thức được hỗ trợ, ánh xạ các biến đèn và thời gian còn lại lên giao diện.",
      "Bước 4: Chạy chương trình và đối chiếu trạng thái đèn trên mô hình với giao diện giám sát. Khi đã ổn định, học viên có thể thêm nút điều khiển từ xa hoặc ghi lịch sử chu kỳ đèn.",
    ],
  },
  {
    slug: "vi-sao-truong-nghe-can-dau-tu-thiet-bi-theo-chuan-4-0",
    title: "Vì sao trường nghề cần đầu tư thiết bị theo hướng 4.0",
    date: "2026-06-20",
    topic: "Đào tạo nghề",
    excerpt:
      "Doanh nghiệp tuyển kỹ thuật viên biết làm việc với PLC, robot và dữ liệu. Thiết bị đào tạo cần đi trước nhu cầu đó một bước.",
    body: [
      "Nhà máy hiện nay dùng ngày càng nhiều dây chuyền tự động, robot và hệ thống giám sát từ xa. Kỹ thuật viên mới ra trường cần làm quen với các thiết bị này ngay từ khi học.",
      "Thiết bị theo hướng 4.0 không nhất thiết đắt đỏ. Một trạm phân loại sản phẩm nhỏ có PLC, cảm biến và camera đã đủ để học viên thực hành trọn một quy trình tự động.",
      "Điều quan trọng là thiết bị dùng linh kiện công nghiệp phổ biến, để kỹ năng học được chuyển thẳng sang công việc thực tế.",
    ],
  },
  {
    slug: "chon-bang-tai-cho-day-chuyen-thuc-pham",
    title: "Chọn băng tải cho dây chuyền thực phẩm: PVC, lưới inox hay xích nhựa",
    date: "2026-05-30",
    topic: "Băng tải",
    excerpt:
      "Mỗi loại dây băng hợp với một kiểu sản phẩm và chế độ vệ sinh khác nhau. So sánh nhanh để chọn đúng ngay từ đầu.",
    body: [
      "Băng tải PVC phù hợp với sản phẩm đã đóng gói hoặc khô, bề mặt phẳng, dễ lau chùi và chi phí thấp nhất trong ba loại.",
      "Băng tải lưới inox chịu được nhiệt độ cao và nước, phù hợp với công đoạn rửa, hấp, chiên hoặc làm nguội. Lưới thoáng giúp nước chảy qua nhanh.",
      "Băng tải xích nhựa dạng module dễ tháo từng mắt để vệ sinh hoặc thay thế, chạy được đoạn cong và thường dùng cho chai, lon, khay.",
      "Khi gửi yêu cầu báo giá, hãy cung cấp kích thước và khối lượng sản phẩm, năng suất mong muốn và điều kiện vệ sinh của xưởng để chọn được loại băng phù hợp.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (d: string) => d.split("-").reverse().join("/");
