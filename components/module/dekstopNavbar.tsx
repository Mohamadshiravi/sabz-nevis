"use client";

import { useTypedSelector } from "@/redux/typedHooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoBookmark, GoHeart } from "react-icons/go";
import { TiHome } from "react-icons/ti";

export default function DesktopNavbar() {
  const regex = /^\/me\/settings(\/.*)?$/;
  const path = usePathname();

  const username = useTypedSelector((state) => state.user?.data?.username);

  return (
    <div className="w-full lg:block hidden border-l border-zinc-200 dark:bg-dark-color-800 dark:border-zinc-800 bg-white">
      <nav className="flex-col flex justify-between h-screen pb-24 pt-14 px-8 fixed top-16">
        <ul className="flex flex-col gap-8">
          <Link
            href={"/home"}
            className={`${
              path === "/home" && "text-my-green-600"
            } flex items-center gap-3 text-base hover:text-my-green-600 transition`}
          >
            <TiHome className="text-2xl" />
            <span className="text-nowrap">صفحه اصلی</span>
          </Link>
          <Link
            href={`/@${username}/profile`}
            className={`${
              path === "/podcasts" && "text-my-green-600"
            } flex items-center gap-3 text-base hover:text-my-green-600 transition`}
          >
            <FaRegUser className="text-2xl" />
            <span className="text-nowrap">پروفایل شما</span>
          </Link>
          <Link
            href={"/me/likes"}
            className={`${
              path === "/me/likes" && "text-my-green-600"
            } flex items-center gap-3 text-base hover:text-my-green-600 transition`}
          >
            <GoHeart className="text-2xl" />
            <span className="text-nowrap"> لایک شده ها</span>
          </Link>
          <Link
            href={"/me/lists"}
            className={`${
              path === "/me/lists" && "text-my-green-600"
            } flex items-center gap-3 text-base hover:text-my-green-600 transition`}
          >
            <GoBookmark className="text-2xl" />
            <span className="text-nowrap">لیست ها</span>
          </Link>
          <Link
            href={"/me/settings"}
            className={`${regex.test(path) && "text-my-green-600"}
             flex items-center gap-3 text-base hover:text-my-green-600 transition`}
          >
            <FiSettings className="text-2xl" />
            <span className="text-nowrap">تنظیمات</span>
          </Link>
        </ul>
        <Link
          href={"/post/create"}
          className="bg-my-green-600 text-nowrap w-full rounded-full px-8 text-sm text-white py-1.5 vazir-bold"
        >
          نوشتن پست
        </Link>
      </nav>
    </div>
  );
}
