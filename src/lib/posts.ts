import type { L, Locale } from "./i18n";

export type Post = {
  slug: string;
  title: L;
  date: string; // YYYY-MM-DD
  topic: L;
  excerpt: L;
  body: L<string[]>;
  image?: string;
};

// Bài viết mẫu. Thay bằng nội dung thật hoặc nối với CMS.
export const posts: Post[] = [
  {
    slug: "thiet-bi-thuc-hanh-dien-thong-minh-thay-doi-gio-hoc-nghe",
    date: "2026-09-18",
    title: { vi: "Thiết bị thực hành điện thông minh thay đổi giờ học nghề như thế nào", en: "How smart electrical training benches are changing vocational lessons" },
    topic: { vi: "Đào tạo nghề", en: "Vocational training" },
    excerpt: {
      vi: "Khi bàn thực hành ghi lại từng thao tác đấu nối, giáo viên biết ngay học viên sai ở đâu thay vì chờ đến lúc chấm bài.",
      en: "When the training bench records every wiring step, the teacher sees straight away where a student went wrong instead of waiting until marking.",
    },
    body: {
      vi: [
        "Giờ thực hành điện truyền thống thường diễn ra theo một nhịp quen thuộc: giáo viên làm mẫu, học viên đấu nối, rồi giáo viên đi từng bàn kiểm tra. Với lớp 30 học viên, phần lớn thời gian của giáo viên dành cho việc đi kiểm tra chứ không phải giải thích.",
        "Bàn thực hành thông minh đặt cảm biến tại các điểm đấu nối và gửi trạng thái về máy tính của giáo viên. Mạch nào đấu sai, thiếu dây hay chưa cấp nguồn đều hiển thị trên màn hình tổng, nên giáo viên đến đúng bàn cần hỗ trợ.",
        "Hệ thống cũng khóa nguồn khi phát hiện đấu nối nguy hiểm, giúp học viên mới làm quen với điện công nghiệp được thử sai mà không gây chập cháy.",
        "Dữ liệu từng buổi được lưu lại, nên nhà trường có căn cứ để đánh giá kỹ năng của từng học viên thay vì chỉ dựa vào bài kiểm tra cuối khóa.",
      ],
      en: [
        "A traditional electrical practice session follows a familiar rhythm: the teacher demonstrates, the students wire up, then the teacher goes from bench to bench to check. With a class of 30 students, most of the teacher's time goes into checking rather than explaining.",
        "A smart training bench places sensors at the wiring points and sends their status to the teacher's computer. Any circuit that is miswired, missing a wire or not yet powered shows up on the overview screen, so the teacher goes straight to the bench that needs help.",
        "The system also cuts the power when it detects dangerous wiring, so students new to industrial electrics can learn by trial and error without causing short circuits or fires.",
        "Data from each session is stored, giving the school a basis for assessing each student's skills instead of relying only on the end-of-course test.",
      ],
    },
  },
  {
    slug: "phong-thuc-hanh-thong-minh-gom-nhung-thanh-phan-nao",
    date: "2026-08-27",
    title: { vi: "Phòng thực hành thông minh gồm những thành phần nào", en: "What makes up a smart training lab" },
    topic: { vi: "Giải pháp", en: "Solutions" },
    excerpt: {
      vi: "Một phòng thực hành thông minh không chỉ là bàn thiết bị: còn có bàn giáo viên, mạng kết nối và phần mềm quản lý buổi học.",
      en: "A smart training lab is more than equipment benches: it also needs a teacher desk, a network and software to manage the lessons.",
    },
    body: {
      vi: [
        "Thành phần đầu tiên là bàn thực hành của học viên, nơi gắn các module thiết bị thật như aptomat, contactor, PLC, biến tần hay cảm biến, tùy theo nghề đào tạo.",
        "Thành phần thứ hai là bàn điều khiển giáo viên. Từ đây giáo viên cấp hoặc cắt nguồn từng bàn, giao bài và theo dõi trạng thái thực hành của cả lớp.",
        "Thứ ba là hạ tầng kết nối giữa các bàn, thường là mạng công nghiệp có dây để ổn định trong môi trường xưởng.",
        "Cuối cùng là phần mềm: quản lý bài thực hành, lưu kết quả và xuất báo cáo. Khi lựa chọn, nhà trường nên hỏi rõ phần mềm có cập nhật được bài mới hay không, để phòng thực hành không bị lạc hậu sau vài năm.",
      ],
      en: [
        "The first component is the students' training bench, where real equipment modules are mounted, such as circuit breakers, contactors, PLCs, variable frequency drives or sensors, depending on the trade being taught.",
        "The second component is the teacher control desk. From here the teacher switches power to each bench on or off, assigns exercises and monitors the practice status of the whole class.",
        "Third is the network connecting the benches, usually a wired industrial network for stability in a workshop environment.",
        "Last comes the software: managing exercises, storing results and exporting reports. When choosing, schools should ask whether the software can be updated with new exercises, so the lab does not become outdated after a few years.",
      ],
    },
  },
  {
    slug: "thiet-bi-dao-tao-thuc-hanh-thong-minh-dung-cho-nganh-nao",
    date: "2026-08-05",
    title: { vi: "Thiết bị đào tạo thực hành thông minh dùng cho những ngành nào", en: "Which trades benefit from smart training equipment" },
    topic: { vi: "Đào tạo nghề", en: "Vocational training" },
    excerpt: {
      vi: "Điện công nghiệp, điện dân dụng, tự động hóa và điện lạnh là các nghề hưởng lợi rõ nhất từ thiết bị thực hành có kết nối.",
      en: "Industrial electrics, residential electrics, automation and refrigeration are the trades that benefit most clearly from connected training equipment.",
    },
    body: {
      vi: [
        "Các nghề có thao tác đấu nối và vận hành thiết bị điện là nhóm phù hợp nhất: điện công nghiệp, điện dân dụng, điện lạnh, cơ điện tử và tự động hóa.",
        "Với nghề tự động hóa, học viên lập trình PLC và quan sát ngay tác động lên mô hình băng tải, cánh tay robot hay trạm phân loại sản phẩm.",
        "Các nghề cơ khí và ô tô dùng mô hình cắt bổ, mô hình tháo lắp để hiểu cấu tạo trước khi làm việc trên máy thật.",
        "Nhà trường nên bắt đầu từ nghề có số học viên đông nhất, sau đó mở rộng dần để tận dụng chung bàn giáo viên và phần mềm quản lý.",
      ],
      en: [
        "Trades that involve wiring and operating electrical equipment are the best fit: industrial electrics, residential electrics, refrigeration, mechatronics and automation.",
        "In automation, students program a PLC and immediately see the effect on a conveyor model, a robot arm or a product sorting station.",
        "Mechanical and automotive trades use cutaway models and assembly models to understand how things are built before working on real machines.",
        "Schools should start with the trade that has the most students, then expand gradually so the teacher desk and management software can be shared.",
      ],
    },
  },
  {
    slug: "huong-dan-ket-noi-bo-thuc-hanh-plc-voi-phan-mem-iot",
    date: "2026-07-14",
    title: { vi: "Hướng dẫn kết nối bộ thực hành PLC với phần mềm giám sát IoT", en: "Connecting a PLC training kit to IoT monitoring software" },
    topic: { vi: "Hướng dẫn", en: "Guides" },
    excerpt: {
      vi: "Các bước cơ bản để bộ thực hành PLC gửi dữ liệu lên phần mềm giám sát, lấy ví dụ bài điều khiển đèn giao thông.",
      en: "The basic steps for getting a PLC training kit to send data to monitoring software, using a traffic light control exercise as an example.",
    },
    body: {
      vi: [
        "Bước 1: Đặt địa chỉ IP cho PLC và máy tính cùng một dải mạng, kiểm tra kết nối bằng lệnh ping trước khi mở phần mềm lập trình.",
        "Bước 2: Viết chương trình điều khiển đèn giao thông với ba trạng thái xanh, vàng, đỏ và các bộ định thời tương ứng. Khai báo các biến cần giám sát vào vùng nhớ có thể đọc từ bên ngoài.",
        "Bước 3: Trên phần mềm giám sát, tạo kết nối tới PLC theo giao thức được hỗ trợ, ánh xạ các biến đèn và thời gian còn lại lên giao diện.",
        "Bước 4: Chạy chương trình và đối chiếu trạng thái đèn trên mô hình với giao diện giám sát. Khi đã ổn định, học viên có thể thêm nút điều khiển từ xa hoặc ghi lịch sử chu kỳ đèn.",
      ],
      en: [
        "Step 1: Give the PLC and the computer IP addresses in the same subnet, and check the connection with ping before opening the programming software.",
        "Step 2: Write a traffic light control program with three states, green, amber and red, and the matching timers. Declare the variables to be monitored in a memory area that can be read externally.",
        "Step 3: In the monitoring software, create a connection to the PLC over a supported protocol, and map the light variables and the remaining time onto the interface.",
        "Step 4: Run the program and compare the light states on the model with the monitoring interface. Once it runs reliably, students can add remote control buttons or log the history of light cycles.",
      ],
    },
  },
  {
    slug: "vi-sao-truong-nghe-can-dau-tu-thiet-bi-theo-chuan-4-0",
    date: "2026-06-20",
    title: { vi: "Vì sao trường nghề cần đầu tư thiết bị theo hướng 4.0", en: "Why vocational schools should invest in Industry 4.0 equipment" },
    topic: { vi: "Đào tạo nghề", en: "Vocational training" },
    excerpt: {
      vi: "Doanh nghiệp tuyển kỹ thuật viên biết làm việc với PLC, robot và dữ liệu. Thiết bị đào tạo cần đi trước nhu cầu đó một bước.",
      en: "Companies are hiring technicians who can work with PLCs, robots and data. Training equipment needs to stay one step ahead of that demand.",
    },
    body: {
      vi: [
        "Nhà máy hiện nay dùng ngày càng nhiều dây chuyền tự động, robot và hệ thống giám sát từ xa. Kỹ thuật viên mới ra trường cần làm quen với các thiết bị này ngay từ khi học.",
        "Thiết bị theo hướng 4.0 không nhất thiết đắt đỏ. Một trạm phân loại sản phẩm nhỏ có PLC, cảm biến và camera đã đủ để học viên thực hành trọn một quy trình tự động.",
        "Điều quan trọng là thiết bị dùng linh kiện công nghiệp phổ biến, để kỹ năng học được chuyển thẳng sang công việc thực tế.",
      ],
      en: [
        "Today's factories use more and more automated lines, robots and remote monitoring systems. New technicians need to get familiar with this equipment while they are still studying.",
        "Industry 4.0 equipment does not have to be expensive. A small product sorting station with a PLC, sensors and a camera is enough for students to practise a complete automated process.",
        "What matters is that the equipment uses common industrial components, so the skills learned carry straight over to real work.",
      ],
    },
  },
  {
    slug: "chon-bang-tai-cho-day-chuyen-thuc-pham",
    date: "2026-05-30",
    title: { vi: "Chọn băng tải cho dây chuyền thực phẩm: PVC, lưới inox hay xích nhựa", en: "Choosing a conveyor for food lines: PVC, stainless mesh or plastic chain" },
    topic: { vi: "Băng tải", en: "Conveyors" },
    excerpt: {
      vi: "Mỗi loại dây băng hợp với một kiểu sản phẩm và chế độ vệ sinh khác nhau. So sánh nhanh để chọn đúng ngay từ đầu.",
      en: "Each type of belt suits a different kind of product and cleaning regime. A quick comparison to choose the right one from the start.",
    },
    body: {
      vi: [
        "Băng tải PVC phù hợp với sản phẩm đã đóng gói hoặc khô, bề mặt phẳng, dễ lau chùi và chi phí thấp nhất trong ba loại.",
        "Băng tải lưới inox chịu được nhiệt độ cao và nước, phù hợp với công đoạn rửa, hấp, chiên hoặc làm nguội. Lưới thoáng giúp nước chảy qua nhanh.",
        "Băng tải xích nhựa dạng module dễ tháo từng mắt để vệ sinh hoặc thay thế, chạy được đoạn cong và thường dùng cho chai, lon, khay.",
        "Khi gửi yêu cầu báo giá, hãy cung cấp kích thước và khối lượng sản phẩm, năng suất mong muốn và điều kiện vệ sinh của xưởng để chọn được loại băng phù hợp.",
      ],
      en: [
        "PVC belt conveyors suit packaged or dry products. The flat surface is easy to wipe clean, and they are the cheapest of the three types.",
        "Stainless steel mesh conveyors withstand high temperatures and water, making them suitable for washing, steaming, frying or cooling stages. The open mesh lets water drain through quickly.",
        "Modular plastic chain conveyors let you remove individual links for cleaning or replacement, can run around curves and are commonly used for bottles, cans and trays.",
        "When requesting a quote, give the size and weight of the product, the throughput you need and the cleaning conditions in your plant, so the right type of belt can be chosen.",
      ],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// vi: dd/mm/yyyy; en: "Sep 18, 2026" (UTC để không lệch ngày theo múi giờ máy chủ).
export const formatDate = (d: string, l: Locale) =>
  l === "en" ? new Date(d).toLocaleDateString("en-US", { dateStyle: "medium", timeZone: "UTC" }) : d.split("-").reverse().join("/");
