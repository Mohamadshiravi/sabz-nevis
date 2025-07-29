"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PostsNavbar() {
  const path = usePathname();
  return (
    <div className="no-scrollbar select-none w-full overflow-x-scroll overflow-y-hidden flex items-center gap-3 border-b border-zinc-200 dark:border-b-zinc-700 mt-14">
      <Link
        href={"/me/posts"}
        className={`${
          path === "/me/posts"
            ? "text-my-text-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:-bottom-px after:left-0 after:h-[2px] after:bg-my-text-800 dark:after:bg-white"
            : "text-my-text-600 dark:text-zinc-200 dark:hover:text-white hover:text-my-text-800 vazir-medium"
        } pb-2 px-4 text-nowrap relative transition`}
      >
        پیش نویس ها
      </Link>
      <Link
        href={"/me/posts/published"}
        className={`${
          path === "/me/posts/published"
            ? "text-my-text-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:-bottom-px after:left-0 after:h-[2px] after:bg-my-text-800 dark:after:bg-white"
            : "text-my-text-600 dark:text-zinc-200 dark:hover:text-white hover:text-my-text-800 vazir-medium"
        } pb-2 px-4 text-nowrap relative transition`}
      >
        منتشر شده ها
      </Link>
    </div>
  );
}
