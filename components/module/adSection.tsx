"use client";

import { useTypedSelector } from "@/redux/typedHooks";
import Image from "next/image";

export default function ADSection() {
  const userData = useTypedSelector((state) => state.user);
  return (
    <div
      id={`${userData.theme === "light" ? "fullShadow" : "noId"}`}
      className="flex flex-col gap-4 py-4 rounded-xs dark:border dark:border-zinc-800"
    >
      <div className="flex items-center gap-2 px-4">
        <span className="rounded-lg bg-zinc-200 p-2">
          <Image
            width={800}
            height={800}
            alt="logo"
            src="/images/sabz-logo.png"
            className="w-[35px]"
          />
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-xs vazir-bold">سبز نویس</span>
          <span className="text-xs text-zinc-400">تبلیغات</span>
        </div>
      </div>
      <p className="px-4 text-sm">
        میتونی این صفحه رو برای تبلیغات برند خودت داشته باشی !
      </p>
      <div className="w-full sm:h-[400px] h-[300px] flex items-center justify-center bg-my-green-600 text-white text-4xl vazir-bold">
        <h2>محل تبلیغ شما</h2>
      </div>
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 px-4">
        <p className="text-my-green-600 text-sm pl-4 sm:text-right text-center">
          با خرید رپورتاژ آگهی از سبزنویس مطلب شما در سبزنویس منتشر می‌شود و
          بک‌لینک فالو ارزشمند آن، اعتبار و ترافیک وب‌سایت‌تان را افزایش می‌دهد
        </p>
        <button className="border-2 hover:bg-my-green-600 hover:text-white transition border-my-green-600 text-my-green-600 px-6 vazir-bold text-nowrap text-xs rounded-full h-[40px]">
          خرید رپوتاژ اگهی
        </button>
      </div>
    </div>
  );
}
