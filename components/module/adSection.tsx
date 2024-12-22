import Image from "next/image";

export default function ADSection() {
  return (
    <div id="fullShadow" className="flex flex-col gap-4 py-4 rounded-sm">
      <div className="flex items-center gap-2 px-4">
        <span className="rounded-lg bg-zinc-100 p-2">
          <img src="/images/logo.webp" className="w-[33px]" />
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-xs vazir-bold">ویرگول</span>
          <span className="text-xs text-zinc-400">تبلیغات</span>
        </div>
      </div>
      <p className="px-4 text-sm">
        همین حالا به صفحه خرید این بسته سر بزنید و برند خود را به‌صورت حرفه‌ای
        معرفی کنید!
      </p>
      <Image
        src={"/images/e3ad0f50-96c8-11ef-9ef8-b11a08b24d5a.webp"}
        width={2000}
        height={2000}
        alt="ad"
      />
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 px-4">
        <p className="text-virgoolBlue text-sm pl-4 sm:text-right text-center">
          با خرید رپورتاژ آگهی از ویرگول، مطلب شما در ویرگول منتشر می‌شود و
          بک‌لینک فالو ارزشمند آن، اعتبار و ترافیک وب‌سایت‌تان را افزایش می‌دهد
        </p>
        <button className="border-2 hover:bg-virgoolBlue hover:text-white transition border-virgoolBlue text-virgoolBlue px-6 vazir-bold text-nowrap text-xs rounded-full h-[40px]">
          خرید رپوتاژ اگهی
        </button>
      </div>
    </div>
  );
}
