"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNavbar() {
  const path = usePathname();
  return (
    <div className="no-scrollbar select-none w-full overflow-x-scroll overflow-y-hidden flex items-center gap-3 border-b border-zinc-200 dark:border-b-zinc-700 mt-14">
      <Link
        href={"/me/settings"}
        className={`${
          path === "/me/settings"
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        درباره شما
      </Link>
      <Link
        href={"/me/settings/account"}
        className={`${
          path === "/me/settings/account"
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        حساب کاربری
      </Link>
      <Link
        href={"/me/settings/advanced"}
        className={`${
          path === "/me/settings/advanced"
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        شخصی سازی
      </Link>
    </div>
  );
}
