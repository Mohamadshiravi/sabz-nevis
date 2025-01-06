"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeadphones } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoBookmark } from "react-icons/go";
import { IoBarChartOutline } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

export default function DesktopNavbar() {
  const regex = /^\/me\/settings(\/.*)?$/;
  const path = usePathname();
  return (
    <div className="w-full lg:block hidden border-l border-zinc-200 dark:bg-darkColor-800 dark:border-zinc-800 bg-white">
      <nav className="flex-col flex justify-between h-screen pb-24 pt-14 px-8 fixed top-16">
        <ul className="flex flex-col gap-8">
          <Link
            href={"/"}
            className={`${
              path === "/" && "text-virgoolBlue"
            } flex items-center gap-3 text-base hover:text-virgoolBlue transition`}
          >
            <TiHome className="text-2xl" />
            <span className="text-nowrap">صفحه اصلی</span>
          </Link>
          <Link
            href={"/podcasts"}
            className={`${
              path === "/podcasts" && "text-virgoolBlue"
            } flex items-center gap-3 text-base hover:text-virgoolBlue transition`}
          >
            <FaHeadphones className="text-2xl" />
            <span className="text-nowrap">پادکست ها</span>
          </Link>
          <li className="flex items-center gap-3 text-base hover:text-virgoolBlue transition">
            <IoBarChartOutline className="text-2xl" />
            <span className="text-nowrap">امار بازدید</span>
          </li>
          <Link
            href={"/me/lists"}
            className={`${
              path === "/me/lists" && "text-virgoolBlue"
            } flex items-center gap-3 text-base hover:text-virgoolBlue transition`}
          >
            <GoBookmark className="text-2xl" />
            <span className="text-nowrap">لیست ها</span>
          </Link>
          <Link
            href={"/me/settings"}
            className={`${regex.test(path) && "text-virgoolBlue"}
             flex items-center gap-3 text-base hover:text-virgoolBlue transition`}
          >
            <FiSettings className="text-2xl" />
            <span className="text-nowrap">حساب کاربری</span>
          </Link>
        </ul>
        <button className="bg-virgoolBlue text-nowrap w-full rounded-full px-8 text-sm text-white py-1.5 vazir-bold">
          نوشتن پست
        </button>
      </nav>
    </div>
  );
}
