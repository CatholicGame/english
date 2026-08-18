"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS, TRIAL_DAYS } from "@/lib/subscription-store";
import { detectBrowserLang, type AiLang } from "@/lib/ai-lang-prefs";

function LangToggle({ lang, setLang }: { lang: AiLang; setLang: (l: AiLang) => void }) {
  return (
    <div className="flex justify-end gap-1">
      {(["vi", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
          style={{
            background: lang === l ? "var(--color-accent)" : "var(--color-surface)",
            color: lang === l ? "#fff" : "var(--color-text)",
            border: lang === l ? "none" : "1px solid var(--color-divider)",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function TermsContent() {
  const [lang, setLang] = useState<AiLang>(() => detectBrowserLang());

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 text-[14px] leading-relaxed">
      <LangToggle lang={lang} setLang={setLang} />

      {lang === "vi" ? (
        <>
          <h1 className="mt-2 text-[22px] font-extrabold">Điều khoản dịch vụ</h1>
          <p className="mt-1 text-[12px] text-neutral-600">Cập nhật lần cuối: 17/08/2026</p>

          <p className="mt-4">
            Khi sử dụng Vocabulary Builder Pro, bạn đồng ý với các điều khoản dưới đây. Xem thêm{" "}
            <Link href="/privacy" className="font-bold text-accent underline">Chính sách quyền riêng tư</Link> về cách
            dữ liệu của bạn được thu thập và lưu trữ.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">1. Dịch vụ</h2>
          <p className="mt-2">
            Vocabulary Builder Pro là ứng dụng học từ vựng, ngữ pháp và kỹ năng tiếng Anh, sử dụng AI để ra bài tập, chấm
            điểm và trò chuyện luyện tập.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">2. Tài khoản</h2>
          <p className="mt-2">
            Bạn cần đăng nhập bằng tài khoản Google để dùng ứng dụng — không có chế độ dùng thử ẩn danh. Bạn chịu trách
            nhiệm bảo mật tài khoản Google của mình.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">3. Dùng thử &amp; thanh toán</h2>
          <ul className="mt-2 list-disc pl-5">
            <li>Mỗi tài khoản mới được dùng thử miễn phí toàn bộ tính năng trong {TRIAL_DAYS} ngày kể từ lần đầu đăng nhập.</li>
            <li>
              Sau khi hết hạn dùng thử, các gói trả phí hiện có:{" "}
              {PRICING_PLANS.map((p, i) => (
                <span key={p.cycle}>
                  {p.label} ({p.priceVnd.toLocaleString("vi-VN")}đ){i < PRICING_PLANS.length - 1 ? ", " : "."}
                </span>
              ))}
            </li>
            <li>Thanh toán được xử lý qua PayOS. Gia hạn trước khi hết hạn sẽ cộng dồn thêm thời gian, không làm mất thời gian còn lại.</li>
            <li>
              Hiện chưa có cơ chế hoàn tiền tự động — nếu có vấn đề về thanh toán (lỗi giao dịch, tính phí nhầm), vui lòng
              liên hệ email bên dưới để được xử lý thủ công.
            </li>
          </ul>

          <h2 className="mt-6 text-[16px] font-extrabold">4. Nội dung do AI tạo ra</h2>
          <p className="mt-2">
            Bài chấm điểm, nhận xét, và nội dung hội thoại do AI tạo ra chỉ mang tính hỗ trợ học tập, có thể không hoàn
            toàn chính xác. Đây không phải nguồn tham khảo chính thức thay thế giáo viên hay tài liệu ngôn ngữ học chuẩn
            (ví dụ: điểm band IELTS do AI chấm chỉ mang tính tham khảo, không phải điểm thi thật).
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">5. Hành vi bị cấm</h2>
          <p className="mt-2">
            Không được cố tình lạm dụng hệ thống (ví dụ: gọi API AI vượt giới hạn cho phép bằng công cụ tự động) hoặc can
            thiệp trái phép vào tài khoản người dùng khác. Vi phạm có thể dẫn đến khoá tài khoản.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">6. Thay đổi điều khoản</h2>
          <p className="mt-2">
            Điều khoản có thể được cập nhật theo thời gian. Phiên bản mới nhất luôn được đăng tại trang này.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">7. Liên hệ</h2>
          <p className="mt-2">
            Mọi thắc mắc về điều khoản dịch vụ, vui lòng liên hệ:{" "}
            <a href="mailto:nguyencongnam506@gmail.com" className="font-bold text-accent underline">
              nguyencongnam506@gmail.com
            </a>
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-2 text-[22px] font-extrabold">Terms of Service</h1>
          <p className="mt-1 text-[12px] text-neutral-600">Last updated: August 17, 2026</p>

          <p className="mt-4">
            By using Vocabulary Builder Pro, you agree to the terms below. See also our{" "}
            <Link href="/privacy" className="font-bold text-accent underline">Privacy Policy</Link> for how your data
            is collected and stored.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">1. Service</h2>
          <p className="mt-2">
            Vocabulary Builder Pro is an app for learning vocabulary, grammar, and English skills, using AI to
            generate exercises, score answers, and hold practice conversations.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">2. Account</h2>
          <p className="mt-2">
            You need to sign in with a Google account to use the app — there is no anonymous/guest mode. You are
            responsible for keeping your Google account secure.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">3. Trial &amp; payment</h2>
          <ul className="mt-2 list-disc pl-5">
            <li>Every new account gets a free trial of every feature for {TRIAL_DAYS} days from first sign-in.</li>
            <li>
              After the trial ends, the available paid plans are:{" "}
              {PRICING_PLANS.map((p, i) => (
                <span key={p.cycle}>
                  {p.months} month{p.months > 1 ? "s" : ""} ({p.priceVnd.toLocaleString("en-US")} VND)
                  {i < PRICING_PLANS.length - 1 ? ", " : "."}
                </span>
              ))}
            </li>
            <li>Payments are processed via PayOS. Renewing before expiry stacks additional time on top — it never discards time you already have left.</li>
            <li>
              There is currently no automatic refund mechanism — if you run into a payment issue (failed transaction,
              incorrect charge), please contact the email below for manual resolution.
            </li>
          </ul>

          <h2 className="mt-6 text-[16px] font-extrabold">4. AI-generated content</h2>
          <p className="mt-2">
            Scoring, feedback, and conversation content generated by AI is for learning support only and may not be
            fully accurate. It is not an official reference and does not replace a teacher or a standard linguistic
            source (e.g. an AI-scored IELTS band is only a rough estimate, not an official exam score).
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">5. Prohibited conduct</h2>
          <p className="mt-2">
            You may not deliberately abuse the system (e.g. calling the AI API beyond the allowed limit using
            automated tools) or interfere with another user&apos;s account without authorization. Violations may
            result in account suspension.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">6. Changes to these terms</h2>
          <p className="mt-2">
            These terms may be updated over time. The latest version is always published on this page.
          </p>

          <h2 className="mt-6 text-[16px] font-extrabold">7. Contact</h2>
          <p className="mt-2">
            For any questions about these terms, please contact:{" "}
            <a href="mailto:nguyencongnam506@gmail.com" className="font-bold text-accent underline">
              nguyencongnam506@gmail.com
            </a>
          </p>
        </>
      )}
    </div>
  );
}
