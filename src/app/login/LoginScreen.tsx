"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { Modal } from "@/components/Modal";
import { trackEvent } from "@/lib/firebase-client";

const FEATURES = [
  {
    emoji: "🧩",
    title: "Collocations & Phrasal Verbs",
    body: "Không học vẹt: AI tự soạn quiz ngữ cảnh riêng cho từng từ (và giảng vì sao các đáp án khác sai), vào vai bạn trò chuyện để bạn luyện dùng từ trong hội thoại thật, rồi chấm từng câu bạn viết/dịch kèm sửa lỗi tức thì. 7 chế độ ôn tập ngắt quãng lo phần ghi nhớ lâu dài.",
  },
  {
    emoji: "📖",
    title: "Cambridge Vocabulary for IELTS Advanced",
    body: "Không phải danh sách từ suông — mỗi unit bám sát giáo trình Cambridge. AI chấm điểm band IELTS thật cho bài nói & bài viết của bạn, kèm nhận xét chi tiết như giám khảo, và đóng vai đối tác hội thoại để luyện phản xạ như thi thật.",
  },
  {
    emoji: "🎧",
    title: "Listen A Minute",
    body: "Hàng trăm bài nghe 1 phút theo chủ đề để luyện phản xạ mỗi ngày. Nghe xong, AI bắt chuyện ngay về chính chủ đề đó — vừa luyện nói vừa được AI nhận xét cách diễn đạt của bạn tại chỗ.",
  },
  {
    emoji: "💬",
    title: "Idiom",
    body: "Mảnh ghép cuối của bộ ba collocation – phrasal verb – idiom để nói tự nhiên như người bản ngữ. AI sẽ ra quiz, trò chuyện và chấm cách dùng idiom đúng ngữ cảnh — y hệt trải nghiệm bạn đã quen ở các module trên.",
    badge: "Sắp ra mắt",
  },
  {
    emoji: "🔍",
    title: "Tra cứu & Ngữ pháp tức thì",
    body: "Đang đọc mà gặp từ lạ hay câu ngữ pháp rối? Bôi đen ngay tại chỗ, ở bất cứ đâu trong app — AI giải nghĩa hoặc phân tích cấu trúc câu tức thì, bằng đúng ngôn ngữ bạn chọn trong Cài đặt.",
  },
  {
    emoji: "🔥",
    title: "Streak & XP",
    body: "Mỗi lần AI chấm bài — quiz, hội thoại, bài viết — bạn nhận XP ngay lập tức. Chuỗi ngày học được giữ vững nhờ động lực thật từ kết quả AI chấm, không phải điểm ảo vô nghĩa.",
  },
];

export function LoginScreen() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/";
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center bg-bg px-4 lg:max-w-[880px] lg:flex-row lg:items-center lg:gap-16 lg:border-x-2 lg:border-[color:var(--color-divider)] lg:px-8">
      <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
        <Image
          src={logo}
          alt="Vocabulary Builder Pro"
          width={220}
          height={220}
          className="h-36 w-36 rounded-full lg:h-52 lg:w-52"
          priority
        />
        <h1 className="mt-4 text-[30px] lg:text-[40px]">Vocabulary Builder Pro</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-600 lg:mt-4 lg:max-w-[440px] lg:text-[15px]">
          Đăng nhập với Google để đồng bộ tiến độ học tập an toàn giữa các thiết bị.
        </p>
        <button
          className="btn btn-ghost mt-3 px-0 text-[13px] font-bold text-accent-800"
          onClick={() => setShowFeatures(true)}
        >
          ✨ Xem tính năng nổi bật
        </button>
      </div>
      <div className="lg:w-[320px] lg:flex-none">
        <a
          href={`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`}
          onClick={() => trackEvent("login", { method: "google" })}
          className="btn btn-primary mt-6 w-full px-4 py-3 lg:mt-0"
        >
          Đăng nhập với Google
        </a>
        <p className="mt-3 text-center text-[11px] text-neutral-500 lg:text-left">
          Bằng việc đăng nhập, bạn đồng ý với{" "}
          <Link href="/terms" className="underline">Điều khoản dịch vụ</Link> và{" "}
          <Link href="/privacy" className="underline">Chính sách quyền riêng tư</Link>.
        </p>
      </div>
      {showFeatures && (
        <Modal onClose={() => setShowFeatures(false)} contentClassName="lg:max-w-[720px]">
          <h2 className="mb-1 text-[20px] font-extrabold">Vì sao chọn Vocabulary Builder Pro?</h2>
          <p className="mb-4 text-[13px] leading-relaxed text-neutral-600">
            Không chỉ học từ — luyện dùng từ thật với AI: ra quiz riêng cho bạn, trò chuyện, chấm bài tức thì. Xây vốn
            từ giao tiếp lẫn học thuật, hướng tới IELTS band 6.5–9, nhớ lâu chứ không học vẹt.
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="divider-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">{f.emoji}</span>
                  <span className="text-[14px] font-extrabold">{f.title}</span>
                  {f.badge && <span className="label-xs text-accent">{f.badge}</span>}
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">{f.body}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
