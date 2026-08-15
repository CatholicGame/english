"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import logo from "@/assets/logo/logo.png";

export function LoginScreen() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center bg-bg px-4 lg:max-w-[880px] lg:flex-row lg:items-center lg:gap-16 lg:border-x-2 lg:border-[color:var(--color-divider)] lg:px-8">
      <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
        <Image
          src={logo}
          alt="PhrasalUp"
          width={220}
          height={220}
          className="h-36 w-36 rounded-full lg:h-52 lg:w-52"
          priority
        />
        <h1 className="mt-4 text-[30px] lg:text-[40px]">PhrasalUp</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-600 lg:mt-4 lg:max-w-[440px] lg:text-[15px]">
          Đăng nhập với Google để đồng bộ tiến độ học tập giữa các thiết bị. Dữ liệu được lưu ẩn trong Google Drive
          của riêng bạn, không hiển thị trong danh sách file Drive thông thường.
        </p>
      </div>
      <div className="lg:w-[320px] lg:flex-none">
        <a href={`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`} className="btn btn-primary mt-6 w-full px-4 py-3 lg:mt-0">
          Đăng nhập với Google
        </a>
      </div>
    </div>
  );
}
