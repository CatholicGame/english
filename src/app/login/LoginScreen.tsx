"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/";

  function continueAsGuest() {
    document.cookie = `guest_ok=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(returnTo);
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center bg-bg px-4">
      <h1 className="text-[30px]">English App</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
        Đăng nhập với Google để đồng bộ tiến độ học tập giữa các thiết bị. Dữ liệu được lưu ẩn trong Google Drive
        của riêng bạn, không hiển thị trong danh sách file Drive thông thường.
      </p>
      <a href={`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`} className="btn btn-primary mt-6 w-full px-4 py-3">
        Đăng nhập với Google
      </a>
      <button onClick={continueAsGuest} className="btn btn-secondary mt-3 w-full px-4 py-3">
        Tiếp tục không cần tài khoản
      </button>
    </div>
  );
}
