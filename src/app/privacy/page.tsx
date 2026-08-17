import Link from "next/link";

export const metadata = {
  title: "Chính sách quyền riêng tư — Vocabulary Builder Pro",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 text-[14px] leading-relaxed">
      <h1 className="text-[22px] font-extrabold">Chính sách quyền riêng tư</h1>
      <p className="mt-1 text-[12px] text-neutral-600">Cập nhật lần cuối: 17/08/2026</p>

      <p className="mt-4">
        Vocabulary Builder Pro (&ldquo;chúng tôi&rdquo;) là ứng dụng học từ vựng &amp; luyện kỹ năng tiếng Anh bằng AI. Trang này
        giải thích dữ liệu nào được thu thập, lưu ở đâu, và bạn có quyền gì đối với dữ liệu của mình.
      </p>

      <h2 className="mt-6 text-[16px] font-extrabold">1. Thông tin chúng tôi thu thập</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>
          <strong>Thông tin tài khoản Google:</strong> email, tên hiển thị, ảnh đại diện — lấy khi bạn đăng nhập bằng
          Google. Chúng tôi không có và không thể xem mật khẩu Google của bạn.
        </li>
        <li>
          <strong>Nội dung học tập bạn tạo ra:</strong> tiến độ ôn tập, từ điển cá nhân, ghi chú, lịch sử hội thoại
          với AI, ngữ pháp đã lưu.
        </li>
        <li>
          <strong>Dữ liệu sử dụng ẩn danh:</strong> qua Firebase Analytics (Google) — trang đã xem, hành động
          đăng nhập/đăng xuất, để chúng tôi hiểu tính năng nào hữu ích và cải thiện sản phẩm.
        </li>
        <li>
          <strong>Trạng thái gói dùng thử/thanh toán:</strong> ngày bắt đầu dùng thử, hạn sử dụng, gói đã mua (không
          bao gồm số thẻ hay thông tin ngân hàng).
        </li>
      </ul>

      <h2 className="mt-6 text-[16px] font-extrabold">2. Dữ liệu được lưu ở đâu</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>
          Nội dung học tập của bạn (tiến độ, từ điển, ghi chú, hội thoại AI...) được lưu trong{" "}
          <strong>Google Drive của chính bạn</strong>, trong một khu vực đặc biệt gọi là &ldquo;Application Data folder&rdquo;.
          Đây là khu vực <strong>chỉ ứng dụng đã tạo ra nó mới đọc/ghi được</strong> — nó không hiện trong giao diện
          Drive thông thường của bạn, và các ứng dụng khác (kể cả Google Drive trên máy tính/điện thoại của bạn khi
          bạn tự mở lên xem) không nhìn thấy được. Đây là cơ chế bảo mật chuẩn của Google (drive.appdata scope), không
          phải chúng tôi cố tình giấu dữ liệu khỏi bạn.
        </li>
        <li>
          Trạng thái gói dùng thử/thanh toán được lưu trên Firestore (Google Cloud) thuộc quản lý của chúng tôi —
          tách riêng khỏi Drive cá nhân của bạn, vì hệ thống thanh toán cần đọc/ghi được dữ liệu này ngay cả khi bạn
          không đăng nhập.
        </li>
      </ul>

      <h2 className="mt-6 text-[16px] font-extrabold">3. Chia sẻ với bên thứ ba</h2>
      <p className="mt-2">Chúng tôi không bán dữ liệu của bạn. Dữ liệu chỉ được gửi tới các bên xử lý cần thiết để vận hành dịch vụ:</p>
      <ul className="mt-2 list-disc pl-5">
        <li>
          <strong>DeepSeek (nhà cung cấp AI):</strong> câu trả lời/bài viết bạn nộp trong các bài luyện tập được gửi
          đến DeepSeek để chấm điểm và tạo phản hồi. Việc xử lý dữ liệu này tuân theo chính sách riêng của DeepSeek.
        </li>
        <li>
          <strong>PayOS (cổng thanh toán):</strong> khi bạn mua gói, thông tin thanh toán được PayOS xử lý trực tiếp
          — chúng tôi chỉ nhận lại kết quả giao dịch thành công/thất bại, không lưu thông tin thẻ.
        </li>
        <li>
          <strong>Google (Đăng nhập, Drive, Firebase Analytics):</strong> hạ tầng xác thực, lưu trữ và thống kê sử
          dụng.
        </li>
      </ul>

      <h2 className="mt-6 text-[16px] font-extrabold">4. Quyền của bạn</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>
          Thu hồi quyền truy cập của ứng dụng vào tài khoản Google của bạn bất kỳ lúc nào tại{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent underline"
          >
            myaccount.google.com/permissions
          </a>
          .
        </li>
        <li>Yêu cầu xoá dữ liệu tài khoản (bao gồm dữ liệu thanh toán trên Firestore) bằng cách liên hệ bên dưới.</li>
      </ul>

      <h2 className="mt-6 text-[16px] font-extrabold">5. Liên hệ</h2>
      <p className="mt-2">
        Mọi câu hỏi về quyền riêng tư, vui lòng liên hệ:{" "}
        <a href="mailto:nguyencongnam506@gmail.com" className="font-bold text-accent underline">
          nguyencongnam506@gmail.com
        </a>
      </p>

      <p className="mt-8 text-[12px] text-neutral-600">
        Xem thêm <Link href="/terms" className="font-bold text-accent underline">Điều khoản dịch vụ</Link>.
      </p>
    </div>
  );
}
