"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNavbar() {
  const path = usePathname();
  return (
    <div className="no-scrollbar select-none w-full overflow-x-scroll overflow-y-hidden flex items-center gap-3 border-b border-zinc-200 mt-14">
      <Link
        href={"/me/settings"}
        className={`${
          path === "/me/settings"
            ? "text-virgoolText-800 vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-virgoolText-800"
            : "text-virgoolText-600 hover:text-virgoolText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        درباره شما
      </Link>
      <Link
        href={"/me/settings/account"}
        className={`${
          path === "/me/settings/account"
            ? "text-virgoolText-800 vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-virgoolText-800"
            : "text-virgoolText-600 hover:text-virgoolText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        حساب کاربری
      </Link>
      <Link
        href={"/me/settings/notifications"}
        className={`${
          path === "/me/settings/notifications"
            ? "text-virgoolText-800 vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-virgoolText-800"
            : "text-virgoolText-600 hover:text-virgoolText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        اطلاعیه ها
      </Link>
      <Link
        href={"/me/settings/advanced"}
        className={`${
          path === "/me/settings/advanced"
            ? "text-virgoolText-800 vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-virgoolText-800"
            : "text-virgoolText-600 hover:text-virgoolText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        تنظیمات پیشرفته
      </Link>
    </div>
  );
}
