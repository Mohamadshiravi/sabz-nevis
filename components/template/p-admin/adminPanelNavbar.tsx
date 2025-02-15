"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPostcard } from "react-icons/bs";
import { FaHome, FaRegComments, FaRegUser } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { MdOutlineDashboard, MdOutlineNewLabel } from "react-icons/md";

export default function AdminPanelNavbar() {
  const path = usePathname();

  return (
    <div className="w-full block z-50">
      <nav className="flex-col flex justify-between h-screen pl-24 pr-6 py-10 fixed lg:top-16 top-0 border-l border-zinc-200 dark:bg-darkColor-800 bg-white dark:border-zinc-800">
        <ul className="flex flex-col gap-8">
          <Link
            href={"/home"}
            className={`flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <FaHome className="text-2xl" />
            <span className="text-nowrap">خانه</span>
          </Link>
          <Link
            href={"/p-admin"}
            className={`${
              path === "/p-admin" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <MdOutlineDashboard className="text-2xl" />
            <span className="text-nowrap">داشبورد</span>
          </Link>
          <Link
            href={`/p-admin/posts`}
            className={`${
              path === "/p-admin/posts" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <BsPostcard className="text-2xl" />
            <span className="text-nowrap">پست ها</span>
          </Link>
          <Link
            href={"/p-admin/lists"}
            className={`${
              path === "/p-admin/lists" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <GoBookmark className="text-2xl" />
            <span className="text-nowrap">لیست ها</span>
          </Link>
          <Link
            href={`/p-admin/users`}
            className={`${
              path === "/p-admin/users" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <FaRegUser className="text-2xl" />
            <span className="text-nowrap">کاربران</span>
          </Link>
          <Link
            href={"/p-admin/comments"}
            className={`${
              path === "/p-admin/comments" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <FaRegComments className="text-2xl" />
            <span className="text-nowrap">کامنت ها</span>
          </Link>
          <Link
            href={"/p-admin/categories"}
            className={`${
              path === "/p-admin/categories" && "text-myGreen-600"
            } flex items-center gap-3 text-base hover:text-myGreen-600 transition`}
          >
            <MdOutlineNewLabel className="text-2xl" />
            <span className="text-nowrap">موضوعات</span>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
